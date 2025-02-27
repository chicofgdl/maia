import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    // Validação básica
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nome, e-mail e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url); // Obtém os parâmetros da URL
    const email = searchParams.get("email"); // Pega o e-mail se for passado na URL

    if (email) {
      // Busca um usuário pelo e-mail (único)
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { error: "Usuário não encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json(user); // Retorna o usuário específico
    }

    // Caso não tenha e-mail na URL, retorna todos os usuários
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url); // Obtém os parâmetros da URL
    const email = searchParams.get("email"); // Captura o e-mail do usuário

    if (!email) {
      return NextResponse.json(
        { error: "O e-mail é obrigatório para atualizar um usuário" },
        { status: 400 }
      );
    }

    // Busca o usuário no banco pelo e-mail
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Obtém os novos dados do corpo da requisição
    const { name, password, role } = await req.json();
    const updates: any = {}; // Objeto para armazenar os campos a serem atualizados

    // Atualiza apenas os campos que foram enviados na requisição
    if (name) updates.name = name;
    if (role) updates.role = role;
    if (password) {
      updates.password = await bcrypt.hash(password, 10); // Gera um hash seguro da nova senha
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "Nenhum dado válido foi enviado para atualização" },
        { status: 400 }
      );
    }

    // Atualiza o usuário no banco de dados
    const updatedUser = await prisma.user.update({
      where: { email },
      data: updates,
      select: { id: true, name: true, email: true, role: true }, // Evita retornar a senha
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url); // Obtém os parâmetros da URL
    const email = searchParams.get("email"); // Captura o e-mail do usuário

    if (!email) {
      return NextResponse.json(
        { error: "O e-mail é obrigatório para deletar um usuário" },
        { status: 400 }
      );
    }

    // Verifica se o usuário existe antes de deletar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Deleta o usuário do banco de dados
    await prisma.user.delete({
      where: { email },
    });

    return NextResponse.json(
      { message: "Usuário deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar usuário" },
      { status: 500 }
    );
  }
}