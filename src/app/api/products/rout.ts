import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, description, fileUrl } = await req.json();

    const dataset = await prisma.dataset.create({
      data: { name, description, fileUrl },
    });

    return NextResponse.json(dataset, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar dataset" }, { status: 500 });
  }
}
