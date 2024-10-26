import { NextResponse } from "next/server";
import { z } from "zod";

// 入力データのバリデーションスキーマ
const updateEmojiSchema = z.object({
	id: z.string().min(1, "IDは必須です"),
	emoji: z.string().min(1, "絵文字は必須です"),
	context: z.string().min(1, "コンテキストは必須です"),
});

export async function POST(req: Request) {
	try {
		// リクエストボディの取得とパース
		const body = await req.json();

		// バリデーション
		const validatedData = updateEmojiSchema.safeParse(body);
		if (!validatedData.success) {
			return NextResponse.json(
				{
					message: "無効なリクエストデータです",
					errors: validatedData.error.flatten().fieldErrors,
				},
				{ status: 400 },
			);
		}

		const { id, emoji, context } = validatedData.data;

		// Vectorize の更新
		const res = await fetch(`${process.env.API_ENDPOINT}/add-emoji`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: id,
				emoji: emoji,
				context: context,
			}),
		});

		if (!res.ok) {
			return NextResponse.json(
				{ message: "Vectorize の更新に失敗しました" },
				{ status: 500 },
			);
		}

		// 成功レスポンス
		return NextResponse.json({
			message: "更新が完了しました",
		});
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json(
			{ message: "サーバーエラーが発生しました" },
			{ status: 500 },
		);
	}
}
