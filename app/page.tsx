import { TempAreaChart } from "@/components/temp-area-chart";
import { TempLineChart } from "@/components/temp-line-chart";

export default function Home() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <main className="flex flex-col gap-8">
        <TempLineChart />
        <TempAreaChart />
      </main>
    </div>
  );
}
