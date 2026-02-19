import { CardTemplate } from "@/components/custom/card_template";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center mx-auto gap-3">
        <CardTemplate title="Anime Finished">
          <p>120</p>
        </CardTemplate>
        <CardTemplate title="Episodes Watched" >
          <p>1000</p>
        </CardTemplate>
        <CardTemplate title="Anime Dropped" >
          <p>1000</p>
        </CardTemplate>
        <CardTemplate title="Movies Watched" >
          <p>1000</p>
        </CardTemplate>
      </div>     
    </div>
  );
}
