import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";
import LoginForm from "./LogingForm";

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<Suspense fallback={<LoaderIcon />}>
				<LoginForm />
			</Suspense>
		</div>
	);
}
