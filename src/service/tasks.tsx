/* eslint-disable no-mixed-spaces-and-tabs */

import { create } from "zustand";

type ITaskStatus = "pending" | "completed";

interface ITask {
	title: string;
	status: ITaskStatus;
}

type State = {
	tasks: Array<ITask>;
	isEdit: boolean;
	taskID: number | null;
	taskTitle: string;
};

type Actions = {
	createTask: () => void;

	handleToUpdateTask: (id: number | null) => void;

	onChangeTaskTitle: (title: string) => void;

	updateStatusTask: (id: number) => void;
	updateTitleTask: () => void;

	deleteTask: (id: number) => void;
};

export const useTasks = create<State & Actions>((set, get) => ({
	tasks: [],
	isEdit: false,
	taskID: null,
	taskTitle: "",
	handleToUpdateTask: id => {
		const taskTitle = get().tasks.filter((_, index) => index === id)[0]?.title;

		set(() => ({
			taskID: id,
			isEdit: !get().isEdit,
			taskTitle: !get().isEdit ? taskTitle : "",
		}));
	},
	createTask: () => {
		const title = get().taskTitle;

		if (title.trim() === "") return alert("Adicione um titulo para a tarefa");

		const newTask: ITask = { title: get().taskTitle, status: "pending" };

		set(e => ({
			tasks: [...e.tasks, newTask],
			taskTitle: "",
		}));
	},
	onChangeTaskTitle: title => {
		set({ taskTitle: title });
	},
	updateStatusTask: id => {
		set(e => ({
			tasks: e.tasks.map((task, index) =>
				index === id
					? {
							...task,
							status: task.status === "completed" ? "pending" : "completed",
					  }
					: task
			),
		}));
	},
	updateTitleTask: () => {
		const taskID = get().taskID;
		const title = get().taskTitle;

		if (title.trim() === "")
			return alert("Adicione um titulo para atualizar a tarefa");

		set(e => ({
			tasks: e.tasks.map((task, index) =>
				index === taskID
					? {
							...task,
							title,
					  }
					: task
			),
			isEdit: false,
			taskTitle: "",
		}));
	},
	deleteTask: id => {
		const newTasks = get().tasks.filter((_, index) => index !== id);
		set({ tasks: newTasks });
	},
}));
