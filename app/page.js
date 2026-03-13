import { CardDashboard } from "@/components/custom/card_dashboard";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center mx-auto gap-3">
        <CardDashboard title="Anime Finished">
          <p>120</p>
        </CardDashboard>
        <CardDashboard title="Episodes Watched">
          <p>1000</p>
        </CardDashboard>
        <CardDashboard title="Anime Dropped">
          <p>1000</p>
        </CardDashboard>
        <CardDashboard title="Movies Watched">
          <p>1000</p>
        </CardDashboard>
      </div>
    </div>
  );
}
