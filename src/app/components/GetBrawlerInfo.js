import Image from "next/image";
import Link from "next/link";

export default async function GetBrawlerInfo({ id }) {
  let brawler = null;
  if (id !== "Not available") {
    const res = await fetch(`https://api.brawlify.com/v1/brawlers/${id}`, {
      next: { revalidate: 18000 },
    });
    brawler = await res.json();
  }

  let brawlerStats = null;
  const res = await fetch(`https://api.brawlify.com/v1/events`, {
    next: { revalidate: 18000 },
  });
  brawlerStats = await res.json();
  brawlerStats = brawlerStats.active;

  return (
    <>
      <div className="p-5">
        {brawler && (
          <>
            <div className="flex gap-5">
              <Image
                src={brawler.imageUrl}
                alt={brawler.name}
                width={80}
                height={80}
              />
              <div className="flex flex-col">
                <h1 className="text-3xl text-center">{brawler.name}</h1>
                <h2 className="" style={{ color: brawler.rarity.color }}>
                  {brawler.rarity.name}
                </h2>
              </div>
            </div>
            <p className="text-greyText pt-3 text-lg pb-7">
              {brawler.description}
            </p>

            <div className="flex flex-col gap-8">
              <h1 className="text-2xl">Star Powers</h1>
              <div className="grid grid-cols-1 grid-rows-* lg:grid-cols-2 gap-8">
                {brawler.starPowers.map((power) => (
                  <div className="" key={power.id}>
                    <div className="flex flex-col  gap-3 bg-secondaryDark p-5 rounded-lg h-full border border-white border-opacity-20">
                      <div className="flex flex-col gap-3">
                        <Image
                          src={power.imageUrl}
                          alt={power.name}
                          width={50}
                          height={50}
                        />
                        <p className="text-xl text-starPower">{power.name}</p>
                      </div>
                      <p className="text-greyText">{power.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl">Gadgets</h2>
              <div className="grid grid-cols-1 grid-rows-* lg:grid-cols-2 gap-8">
                {brawler.gadgets.map((gadget) => (
                  <div className="" key={gadget.id}>
                    <div className="flex flex-col  gap-3 bg-secondaryDark p-5 rounded-lg h-full border border-white border-opacity-20">
                      <div className="flex flex-col gap-3">
                        <Image
                          src={gadget.imageUrl}
                          alt={gadget.name}
                          width={50}
                          height={50}
                        />
                        <p className="text-xl text-gadget">{gadget.name}</p>
                      </div>
                      <p className="text-greyText">{gadget.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="text-2xl py-8">Stats for active maps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-* gap-5">
              {brawlerStats.map((map) => (
                <div className="" key={map.id}>
                  {map.map.stats.map((stat) => (
                    <div className="" key={stat.id}>
                      {stat.brawler == id && (
                        <Link
                          href={`/maps/${map.map.id}`}
                          className="hover:brightness-75"
                        >
                          <div className="bg-secondaryDark p-5 border border-white border-opacity-20 rounded-lg h-[150px]">
                            <div className="flex gap-2 items-center">
                              <p
                                className="text-xl"
                                style={{ color: map.map.gameMode.color }}
                              >
                                {map.map.name}
                              </p>
                              <Image
                                src={map.map.gameMode.imageUrl}
                                alt="alt"
                                width={30}
                                height={30}
                              />
                            </div>
                            <p className="text-green-400">
                              Win Rate : {stat.winRate}%
                            </p>
                            <p className="text-sky-400">
                              Usage : {stat.useRate}%
                            </p>
                            <p className="text-greyText">
                              Reliability : &nbsp;
                              {stat.useRate <= 1.9
                                ? "low"
                                : stat.useRate > 1.9 && stat.useRate < 3.5
                                ? "medium"
                                : "high"}
                            </p>
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
