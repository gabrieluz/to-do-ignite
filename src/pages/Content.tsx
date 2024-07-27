import NoTasks from "../pages/noTasks";
import Task from "../components/task/task";
import { useTasks } from "../service/tasks";
import TaskInput from "../components/task/input";
import TasksDescriptions from "../components/task/description";

export interface ITask {
	title: string;
	status: "completed" | "pending";
}

function TaskEdit() {
	const { isEdit, handleToUpdateTask } = useTasks();
	return (
		<>
			{isEdit && (
				<div
					onClick={() => handleToUpdateTask(null)}
					className="h-screen w-screen bg-edit-gray absolute z-[1] top-0 right-0"
				/>
			)}
		</>
	);
}

export default function Content() {
	const { tasks } = useTasks();

	return (
		<section className="flex justify-center px-10 h-full">
			<TaskEdit />
			<article className="w-full sm:w-1/2 h-full">
				<TaskInput />
				<section className="flex flex-col gap-6 h-task-content overflow-hidden">
					<TasksDescriptions />
					{!tasks.length ? (
						<NoTasks />
					) : (
						<div className="flex flex-col gap-3 overflow-y-auto scroll-auto pb-6">
							{tasks.map((item, index) => (
								<Task
									key={index}
									id={index}
									title={item.title}
									status={item.status}
								/>
							))}
						</div>
					)}
				</section>
			</article>
		</section>
	);
}
