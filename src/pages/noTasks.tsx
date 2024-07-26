import Clipboard from "../assets/Clipboard.png";

export default function NoTasks() {
	return (
		<aside className="flex justify-center items-center w-full flex-col gap-2 pt-12">
			<img src={Clipboard} alt="" />
			<div>
				<p className="text-gray-300 text-base text-center">
					<strong>Você ainda não tem tarefas cadastradas</strong>
				</p>
				<p className="text-gray-300 text-base text-center">
					Crie tarefas e organize seus itens a fazer
				</p>
			</div>
		</aside>
	);
}
