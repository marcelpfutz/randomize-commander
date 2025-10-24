import CommanderGenerator from "@/components/CommanderGenerator";  // Ajuste o path se usar src/

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-black">
      <CommanderGenerator />
    </main>
  );
}
