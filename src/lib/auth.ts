export const checkAuth = () => {
	if (typeof window === "undefined") return false;
	return document.cookie.includes(
		`auth_token=${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
	);
};

export const login = (password: string) => {
	if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
		document.cookie = `auth_token=${process.env.NEXT_PUBLIC_AUTH_TOKEN}; path=/; max-age=604800; SameSite=Lax`;
		return true;
	}
	return false;
};

export const logout = () => {
	document.cookie = "auth_token=; path=/; max-age=0";
};
