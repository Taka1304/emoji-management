export function TableSkeleton() {
	return (
		<div className="w-full animate-pulse">
			<div className="h-10 bg-gray-200 rounded mb-4" />
			<div className="space-y-3">
				{[...Array(5)].map((i) => (
					<div key={i} className="h-12 bg-gray-200 rounded" />
				))}
			</div>
		</div>
	);
}
