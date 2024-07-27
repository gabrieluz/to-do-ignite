import { useTasks } from "../../service/tasks";

function Count({ label }: { label: number | string }) {
	return (
		<span className="bg-gray-400 rounded-full px-2 py-[2px] text-gray-200 font-bold text-xs ">
			{label}
		</span>
	);
}

export default function TasksDescriptions() {
	const { tasks } = useTasks();
	return (
		<div className="flex justify-between gap-2 flex-wrap">
			<div className="flex gap-2">
				<p className="text-blue font-bold text-sm">Tarefas Criadas</p>
				<Count label={tasks.length} />
			</div>
			<div className="flex gap-2">
				<p className="text-purple font-bold text-sm">Concluídas</p>
				<Count
					label={`${tasks.filter(task => task.status === "completed").length}/${
						tasks.length
					}`}
				/>
			</div>
		</div>
	);
}
