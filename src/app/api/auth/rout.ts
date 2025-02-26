// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const prisma = new PrismaClient();
// const JWT_SECRET = process.env.JWT_SECRET || "seuSegredoAqui";

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     // Buscar usuário pelo email
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
//     }

//     // Validar senha
//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
//     }

//     // Gerar token JWT
//     const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    
//     return NextResponse.json({ token }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Erro ao efetuar login" }, { status: 500 });
//   }
// }
