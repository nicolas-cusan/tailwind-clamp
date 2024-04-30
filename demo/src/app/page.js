import Image from 'next/image';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto clamp-[px,20,80]">
      <header className="py-10 text-md font-bold border-b border-b-stone-300">
        Tailwind CSS Clamp Demo
      </header>

      <div className="py-10">
        <h1 className="text-xl font-black">Clamp Demo</h1>
      </div>
    </main>
  );
}
