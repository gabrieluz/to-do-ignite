/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useEffect, useState } from "react";

import Plus from "../assets/plus.svg";

import NoTasks from "../pages/noTasks";
import Task from "../components/task";

export interface ITask {
	title: string;
	status: "completed" | "pending";
}

function Count({ label }: { label: number | string }) {
	return (
		<span className="bg-gray-400 rounded-full px-2 py-[2px] text-gray-200 font-bold text-xs ">
			{label}
		</span>
	);
}

export default function Content() {
	const [tasks, setTasks] = useState<Array<ITask>>([
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
		{ title: "Teste", status: "pending" },
	]);
	const [newTask, setNewTask] = useState<string>("");

	const createTask = useCallback(() => {
		if (newTask) {
			setTasks([
				...tasks,
				{
					title: newTask,
					status: "pending",
				},
			]);
		} else alert("Adicione um titulo antes para criar");
	}, [newTask, tasks]);

	const handleTaskStatus = (id: number) => {
		setTasks(
			tasks.map((item, index) =>
				index === id
					? {
							...item,
							status: item.status === "completed" ? "pending" : "completed",
					  }
					: item
			)
		);
	};

	const deleteTask = (id: number) => {
		const newTasks = tasks.filter((_, index) => index !== id);
		setTasks(newTasks);
	};

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Enter" && newTask.trim() !== "") {
				createTask();
			}
		},
		[newTask, createTask]
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [newTask, createTask, handleKeyDown]);
	return (
		<section className="flex justify-center px-10 h-full">
			<article className="w-full sm:w-1/2 h-full">
				<section className="flex gap-2 w-full items-center justify-center bottom-7 relative">
					<div className="w-full">
						<input
							onChange={e => setNewTask(e.target.value)}
							placeholder="Adicionar tarefa"
							className="p-4 bg-gray-500 rounded-lg border border-gray-700 w-full active:border-purple-dark placeholder:text-gray-300 text-gray-100"
						/>
					</div>
					<button
						onClick={createTask}
						type="submit"
						className="flex flex-2 items-center min-w-fit gap-2 p-4 bg-blue-dark hover:bg-blue text-gray-100 rounded-lg"
					>
						<p>Criar</p> <img src={Plus} />
					</button>
				</section>
				<section className="flex flex-col gap-6 h-task-content overflow-hidden">
					<div className="flex justify-between gap-2 flex-wrap">
						<div className="flex gap-2">
							<p className="text-blue font-bold text-sm">Tarefas Criadas</p>
							<Count label={tasks.length} />
						</div>
						<div className="flex gap-2">
							<p className="text-purple font-bold text-sm">
								Concluídas{" "}
								<Count
									label={`${
										tasks.filter(task => task.status === "completed").length
									}/${tasks.length}`}
								/>
							</p>
						</div>
					</div>
					{!tasks.length ? (
						<NoTasks />
					) : (
						<div className="flex flex-col gap-3 overflow-y-auto scroll-auto pb-6">
							{tasks.map((item, index) => (
								<Task
									key={index}
									title={item.title}
									status={item.status}
									handleStatus={() => handleTaskStatus(index)}
									deleteTask={() => deleteTask(index)}
								/>
							))}
						</div>
					)}
				</section>
			</article>
		</section>
	);
}
