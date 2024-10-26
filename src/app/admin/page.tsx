"use client";

import { TableEditorClient } from "@/components/features/TableEditorClient";
import { TableSkeleton } from "@/components/features/TableSkeleton";
import { supabase } from "@/lib/supabase";
import type { Emoji } from "@/types/Emoji";
import { useEffect, useState } from "react";

function TableEditor() {
	const [tableData, setTableData] = useState<Emoji[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const { data: tableData, error } = await supabase
				.from("Emoji")
				.select("*")
				.order("emoji_id", { ascending: true });

			if (error) {
				console.error("Error fetching data:", error);
			} else {
				setTableData(tableData);
			}

			setIsLoading(false);
		};

		fetchData();
	}, []);

	return (
		<div className="p-4">
			{isLoading ? (
				<TableSkeleton />
			) : (
				<TableEditorClient initialData={tableData} />
			)}
		</div>
	);
}

export default TableEditor;
