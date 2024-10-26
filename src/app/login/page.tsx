// src/app/login/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const success = await login(password);
			if (success) {
				toast({
					title: "ログイン成功",
					description: "管理画面に移動します",
				});
				const from = searchParams.get("from") || "/admin/table";
				router.push(from);
			} else {
				toast({
					variant: "destructive",
					title: "エラー",
					description: "パスワードが正しくありません",
				});
			}
		} catch (_error) {
			toast({
				variant: "destructive",
				title: "エラー",
				description: "ログイン処理に失敗しました",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl text-center">
						管理画面ログイン
					</CardTitle>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Input
								type="password"
								placeholder="パスワードを入力"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "ログイン中..." : "ログイン"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
