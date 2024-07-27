import CheckCompleted from "../../assets/checkCompleted.svg";
import CheckPending from "../../assets/checkPending.svg";

import { PenLine, Trash2 } from "lucide-react";

import { ITask } from "../../pages/Content";
import { useTasks } from "../../service/tasks";

interface ITaskComponent extends ITask {
	id: number;
}

export default function Task({ id, title, status }: ITaskComponent) {
	const {
		isEdit,
		taskID,
		taskTitle,
		updateStatusTask,
		handleToUpdateTask,
		deleteTask,
	} = useTasks();

	return (
		<div
			className={`${
				isEdit && taskID === id && "relative z-[1] "
			} p-4 bg-gray-500 border max-w-full h-full border-gray-400 rounded-md flex gap-3 justify-between items-start transition-opacity`}
		>
			<button
				className="flex-1"
				onClick={() => !isEdit && updateStatusTask(id)}
			>
				<div className="flex gap-3 items-start">
					{!isEdit ? (
						<>
							{status === "completed" ? (
								<img src={CheckCompleted} />
							) : (
								<img src={CheckPending} />
							)}
						</>
					) : (
						<></>
					)}
					<p
						className={`font-normal text-sm text-left ${
							status === "completed"
								? "line-through text-gray-300"
								: "text-gray-100 "
						}`}
					>
						{isEdit && taskID === id ? taskTitle : title}
					</p>
				</div>
			</button>
			{!isEdit && (
				<div className="flex gap-2">
					{status === "pending" && (
						<button
							className=" p-1 rounded text-gray-300 hover:text-blue hover:bg-gray-400"
							onClick={() => handleToUpdateTask(id)}
						>
							<PenLine size={16} />
						</button>
					)}
					<button
						className=" p-1 rounded text-gray-300 hover:text-danger hover:bg-gray-400"
						onClick={() => deleteTask(id)}
					>
						<Trash2 size={16} />
					</button>
				</div>
			)}
		</div>
	);
}
