import Logo from "../assets/Logo.svg";

export default function Header() {
	return (
		<header className="bg-gray-700 flex justify-center items-center min-h-[200px]">
			<img src={Logo} alt="to-do ignite logo" />
		</header>
	);
}
