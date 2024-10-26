import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

interface EditDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	editValue: string;
	setEditValue: (value: string) => void;
	onUpdate: () => Promise<void>;
	isLoading: boolean;
}

export function EditDialog({
	isOpen,
	onOpenChange,
	editValue,
	setEditValue,
	onUpdate,
	isLoading,
}: EditDialogProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>データの編集</DialogTitle>
				</DialogHeader>
				<div className="p-4">
					<Input
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						placeholder="新しい値を入力"
					/>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						キャンセル
					</Button>
					<Button onClick={onUpdate} disabled={isLoading}>
						{isLoading ? "更新中..." : "更新"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
