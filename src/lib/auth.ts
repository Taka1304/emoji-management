export async function login(password: string): Promise<boolean> {
	try {
		const response = await fetch("/api/auth", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ password }),
		});

		if (!response.ok) {
			return false;
		}

		return true;
	} catch {
		return false;
	}
}

export async function logout(): Promise<void> {
	await fetch("/api/auth/logout", {
		method: "POST",
	});
}
