import { CurrentTempChart } from "@/components/current-temp-chart";
import { CurrentTempList } from "@/components/current-temp-list";

export default function Home() {
  return (
    <div className="flex gap-4 p-4">
      <CurrentTempChart />
      <CurrentTempList />
    </div>
  );
}