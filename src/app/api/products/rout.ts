import { NextResponse } from "next/server"; //Utilizado para criar respostas HTTP personalizadas no Next.js.
import { PrismaClient } from "@prisma/client"; //O cliente do Prisma, que permite interagir com o banco de dados.

const prisma = new PrismaClient();

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
