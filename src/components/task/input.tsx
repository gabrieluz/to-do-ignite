import { useCallback, useEffect } from "react";
import { useTasks } from "../../service/tasks";
import { CirclePlus, PenLine } from "lucide-react";

export default function TaskInput() {
	const { isEdit, taskTitle, createTask, updateTitleTask, onChangeTaskTitle } =
		useTasks();

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Enter") {
				if (isEdit) updateTitleTask();
				else createTask();
			}
		},
		[updateTitleTask, createTask, isEdit]
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [createTask, handleKeyDown]);

	return (
		<section
			className={`${
				isEdit && "z-[1] "
			} flex gap-2 w-full items-center justify-center bottom-7 relative`}
		>
			<div className="w-full">
				<input
					onChange={e => {
						const value = e.target.value;

						onChangeTaskTitle(value);
					}}
					value={taskTitle}
					placeholder="Adicionar tarefa"
					className="p-4 bg-gray-500 rounded-lg border border-gray-700 w-full active:border-purple-dark placeholder:text-gray-300 text-gray-100"
				/>
			</div>
			<button
				onClick={() => (isEdit ? updateTitleTask() : createTask())}
				type="submit"
				className="flex flex-2 items-center min-w-fit gap-2 p-4 text-gray-100 bg-blue-dark hover:bg-blue rounded-lg"
			>
				<p className="text-gray-100">{isEdit ? "Atualizar" : "Criar"}</p>
				{isEdit ? <PenLine size={16} /> : <CirclePlus size={16} />}
			</button>
		</section>
	);
}
