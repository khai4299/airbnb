import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, name, password } = body;

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await prisma.user.create({
			data: {
				email,
				name,
				hashedPassword,
			},
		});
		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		if ((error as PrismaClientKnownRequestError).code === "P2002") {
			return NextResponse.json(
				{
					error: "Email already exist, please use another email address",
				},
				{ status: 500 }
			);
		}
	}
}
