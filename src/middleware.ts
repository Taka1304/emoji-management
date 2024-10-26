import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

async function verifyToken(token: string) {
	try {
		const { payload } = await jwtVerify(token, secretKey);
		return payload;
	} catch {
		return null;
	}
}

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	if (path.startsWith("/admin")) {
		const token = request.cookies.get("session_token")?.value;

		if (!token) {
			const loginUrl = new URL("/login", request.url);
			loginUrl.searchParams.set("from", path);
			return NextResponse.redirect(loginUrl);
		}

		const payload = await verifyToken(token);
		if (!payload) {
			const loginUrl = new URL("/login", request.url);
			loginUrl.searchParams.set("from", path);
			return NextResponse.redirect(loginUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};
