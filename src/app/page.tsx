import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between items-center p-24">
      <h1 className="text-center text-5xl font-bold m-6">GUESS THE MANHWA</h1>
      <Link href="/play-game" className="group transition duration-300">
        Play Game
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
      </Link>
      <footer>
        <h2>Made with ❤️ by Shehu</h2>
      </footer>
    </main>
  );
}
