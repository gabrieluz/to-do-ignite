/// <reference types="vite-plugin-svgr/client" />

import { ITask } from "../App";

import CheckCompleted from "../assets/checkCompleted.svg";
import CheckPending from "../assets/checkPending.svg";
import Trash from "../assets/trash.svg?react";

interface ITaskComponent extends ITask {
	handleStatus: () => void;
	deleteTask: () => void;
}

export default function Task({
	title,
	status,
	handleStatus,
	deleteTask,
}: ITaskComponent) {
	return (
		<div className="p-4 bg-gray-500 border max-w-full border-gray-400 rounded-md flex gap-3 justify-between items-start">
			<button className="flex-1" onClick={handleStatus}>
				<div className="flex gap-3 items-start">
					{status === "completed" ? (
						<img src={CheckCompleted} />
					) : (
						<img src={CheckPending} />
					)}
					<p
						className={`font-normal text-sm text-left ${
							status === "completed"
								? "line-through text-gray-300"
								: "text-gray-100 "
						}`}
					>
						{title}
					</p>
				</div>
			</button>
			<button className="group" onClick={deleteTask}>
				<Trash className="h-[32px] w-[32px] fill-gray-300 group-hover:fill-danger group-hover:bg-gray-400 p-1 rounded" />
			</button>
		</div>
	);
}
