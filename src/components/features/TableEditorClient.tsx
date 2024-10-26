"use client";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import type { Emoji } from "@/types/Emoji";
import { useState } from "react";
import { DataTable } from "./DataTable";
import { EditDialog } from "./EditDialog";

interface TableEditorClientProps {
	initialData: Emoji[];
}

export function TableEditorClient({ initialData }: TableEditorClientProps) {
	const [data, setData] = useState<Emoji[]>(initialData);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<Emoji | null>(null);
	const [editValue, setEditValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { toast } = useToast();

	const handleEdit = (item: Emoji) => {
		setSelectedItem(item);
		setEditValue(item.label);
		setIsOpen(true);
	};

	const handleUpdate = async () => {
		if (!selectedItem) return;

		setIsLoading(true);
		try {
			// Supabaseでの更新処理
			const { data, error } = await supabase
				.from("Emoji")
				.update({ label: editValue })
				.eq("emoji_id", selectedItem.emoji_id)
				.select()
				.single();

			const response = await fetch("/api/emoji", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: selectedItem?.emoji_id,
					emoji: selectedItem?.emoji_name,
					context: editValue,
				}),
			});

			if (!response.ok || error) {
				toast({
					title: "Error!",
					description: "更新に失敗しました",
					variant: "destructive",
				});
			} else {
				toast({
					title: "Success!",
					description: "更新しました",
				});
			}
			setIsOpen(false);
			// ローカルの状態を更新
			setData(
				data.map((item: Emoji) =>
					item.emoji_id === selectedItem?.emoji_id
						? { ...item, editable_field: editValue }
						: item,
				),
			);
		} catch (error) {
			console.error("Error updating:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<DataTable data={data} onEdit={handleEdit} />
			<EditDialog
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				editValue={editValue}
				setEditValue={setEditValue}
				onUpdate={handleUpdate}
				isLoading={isLoading}
			/>
		</>
	);
}
