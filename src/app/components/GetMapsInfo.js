import Image from "next/image";
import Link from "next/link";
import "/src/app/maps/style.css";

export default async function GetMapsInfo({ id }) {
  let map = null;

  const res = await fetch(`https://api.brawlify.com/v1/maps/${id}`, {
    next: { revalidate: 18000 },
  });
  map = await res.json();

  const getBrawlerIcons = async () => {
    return Promise.all(
      map.stats.map(async (stat) => {
        try {
          const res = await fetch(
            `https://api.brawlify.com/v1/brawlers/${stat.brawler}`,
            { next: { revalidate: 18000 } }
          );
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          return [data.imageUrl, data.name];
        } catch (error) {
          console.error(
            `Error fetching brawler data for ${stat.brawler}:`,
            error
          );
          return [null, stat.brawler];
        }
      })
    );
  };

  const brawlerInfo = await getBrawlerIcons();

  return (
    <>
      <div className="flex flex-col items-center gap-2 pb-3">
        <Image
          src={map.environment.imageUrl}
          alt="alt"
          width={10000000}
          height={80}
          style={{ height: "60px" }}
          className="md:hidden"
        />
        <h1 className="text-3xl pt-5">{map.name}</h1>
      </div>
      <div className="flex justify-center gap-2">
        <h2 className="text-xl" style={{ color: map.gameMode.color }}>
          {map.gameMode.name}
        </h2>
        <Image src={map.gameMode.imageUrl} alt="alt" width={30} height={30} />
      </div>
      <div className="flex justify-center mx-2">
        <Image
          src={map.imageUrl}
          alt="alt"
          loading="eager"
          width={360}
          height={100}
          className="border border-white border-opacity-20 p-2 rounded-lg"
        />
      </div>
      <h3 className="text-2xl pt-5 text-center">Brawlers&apos; stats</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-10 grid-rows-* gap-5 py-8 mx-5">
        {brawlerInfo.map((brawler, index) => (
          <div
            className="flex flex-col items-center bg-secondaryDark rounded-lg p-2 border border-white border-opacity-20"
            key={index}
          >
            {brawler[0] && (
              <Link href={`/brawlers/${map.stats[index].brawler}`}>
                <Image
                  src={brawler[0]}
                  alt={brawler[1]}
                  width={80}
                  height={80}
                />
              </Link>
            )}
            <p className="">{brawler[1]}</p>
            <div className="flex flex-col">
              <p className="text-sm text-green-400">
                Win Rate: {map.stats[index].winRate}%
              </p>
              <progress
                value={map.stats[index].winRate}
                max="100"
                className="win w-[110px]"
              ></progress>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-sky-400">
                Usage: {map.stats[index].useRate}%
              </p>
              <progress
                value={map.stats[index].useRate}
                max="100"
                className="use w-[110px]"
              ></progress>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
