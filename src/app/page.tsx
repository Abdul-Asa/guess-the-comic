import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <hgroup>
        <h1 className="text-center text-5xl font-bold m-6">Hello</h1>
        <p className="text-center text-xl opacity-60 m-6">Testing</p>
      </hgroup>
      <Link href="/play-game">Play game</Link>
    </main>
  );
}
