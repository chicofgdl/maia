import { NextResponse } from "next/server"; //Utilizado para criar respostas HTTP personalizadas no Next.js.
import { PrismaClient } from "@prisma/client"; //O cliente do Prisma, que permite interagir com o banco de dados.

const prisma = new PrismaClient();

// Adiciona o Dataset no Banco
export async function POST(req: Request) {
  try {
    const { name, description, fileUrl } = await req.json(); /* Extrai o corpo da requisição e converte para JSON. 
    Os campos de `const` são extraídos da requisição */

    // Validação básica, falta o !fileUrl
    if (!name || !description) {
      return NextResponse.json(
        { error: "Nome e descrição são obrigatórios" },
        { status: 400 }
      );
    }
    
    // Confere se o nome do dataset já existe no Banco.
    const existingDataset = await prisma.dataset.findUnique({
      where: { name },
    });

    if (existingDataset) {
      return new Response(JSON.stringify({ error: "Este nome já existe" }), { status: 400 });
    }

    const dataset = await prisma.dataset.create({ /* Cria um novo dataset no Banco.
    Os dados fornecidos (name, description, fileUrl) são passados para ele. */
      data: { name, description, fileUrl },
    });

    console.log("Novo dataset criado:", dataset);
    return NextResponse.json(dataset, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar dataset:", error);
    return NextResponse.json({ error: "Erro ao criar dataset" }, { status: 500 });
  }
}

// Busca um Dataset específico
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url); // Extrai os query parameters
    const id = searchParams.get("id"); // Obtém o valor do parâmetro id

    if (!id) { // Verifica se o ID foi fornecido
      return NextResponse.json(
        { error: "ID do dataset é obrigatório" },
        { status: 400 }
      );
    }

    const dataset = await prisma.dataset.findUnique({ // Busca o dataset no banco de dados
      where: { id: parseInt(id) },
    });

    if (!dataset) {
      return NextResponse.json(
        { error: "Dataset não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(dataset);
  } catch (error) {
    console.error("Erro ao buscar dataset:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dataset" },
      { status: 500 }
    );
  }
}

// Atualiza o Dataset
export async function PUT(req: Request) {
  try {
    const { id, name, description, fileUrl } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID do dataset é obrigatório" },
        { status: 400 }
      );
    }

    // Verifica se o dataset existe
    const existingDataset = await prisma.dataset.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingDataset) {
      return NextResponse.json(
        { error: "Dataset não encontrado" },
        { status: 404 }
      );
    }

    // Verifica se o nome foi alterado e se é diferente do nome atual.
    if (name && name !== existingDataset.name) {
      const datasetWithSameName = await prisma.dataset.findUnique({
        where: { name },
      });

      if (datasetWithSameName) {
        return NextResponse.json(
          { error: "Este nome já existe" },
          { status: 400 }
        );
      }
    }

    const updatedDataset = await prisma.dataset.update({
      where: { id: parseInt(id) },
      data: { name, description, fileUrl },
    });

    return NextResponse.json(updatedDataset);
    
    // Caso ID Inválido ou Violação de Constraint Unique
  } catch (error) {
    console.error("Erro ao atualizar dataset:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar dataset" },
      { status: 500 }
    );
  }
}

// Deletar o Database
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID do dataset é obrigatório" },
        { status: 400 }
      );
    }

    // Verifica se o dataset existe
    const existingDataset = await prisma.dataset.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingDataset) {
      return NextResponse.json(
        { error: "Dataset não encontrado" },
        { status: 404 }
      );
    }

    await prisma.dataset.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Dataset excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir dataset:", error);
    return NextResponse.json(
      { error: "Erro ao excluir dataset" },
      { status: 500 }
    );
  }
}