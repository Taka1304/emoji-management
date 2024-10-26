import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function POST(req: Request) {
	try {
		const { password } = await req.json();

		if (password !== process.env.ADMIN_PASSWORD) {
			return NextResponse.json(
				{ message: "パスワードが正しくありません" },
				{ status: 401 },
			);
		}

		// JWTトークンの生成
		const token = await new SignJWT({})
			.setProtectedHeader({ alg: "HS256" })
			.setJti(nanoid())
			.setIssuedAt()
			.setExpirationTime("7d")
			.sign(secretKey);

		// セキュアなCookieの設定
		cookies().set("session_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 7, // 7日間
			path: "/",
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json(
			{ message: "ログイン処理に失敗しました" },
			{ status: 500 },
		);
	}
}
