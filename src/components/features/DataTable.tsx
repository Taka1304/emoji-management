import type { Emoji } from "@/types/Emoji";
import { Edit2 } from "lucide-react";
import { Button } from "../ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

interface DataTableProps {
	data: Emoji[];
	onEdit: (item: Emoji) => void;
}

export function DataTable({ data, onEdit }: DataTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>編集可能フィールド</TableHead>
					<TableHead className="w-24">操作</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item) => (
					<TableRow key={item.emoji_id}>
						<TableCell>{item.emoji_id}</TableCell>
						<TableCell>{item.label}</TableCell>
						<TableCell>
							<Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
								<Edit2 className="h-4 w-4" />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
