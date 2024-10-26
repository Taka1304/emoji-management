import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	// 現在のパスを取得
	const path = request.nextUrl.pathname;

	// /admin/* へのアクセスをチェック
	if (path.startsWith("/admin")) {
		// 認証トークンの確認
		const authToken = request.cookies.get("auth_token");
		const isAuthorized =
			authToken?.value === process.env.NEXT_PUBLIC_AUTH_TOKEN;

		// 認証されていない場合、ログインページへリダイレクト
		if (!isAuthorized) {
			const loginUrl = new URL("/login", request.url);
			return NextResponse.redirect(loginUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/admin/:path*",
};
