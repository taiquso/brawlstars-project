import Image from "next/image";
import Link from "next/link";

const getActiveMaps = async () => {
  const res = await fetch(`https://api.brawlify.com/v1/events`, {
    next: { revalidate: 18000 },
  });
  const data = await res.json();
  return data.active;
};

const getUpcomingMaps = async () => {
  const res = await fetch(`https://api.brawlify.com/v1/events`, {
    next: { revalidate: 18000 },
  });
  const data = await res.json();
  return data.upcoming;
};

export default async function GetMapsData() {
  const maps = await getActiveMaps();
  const upcomingMaps = await getUpcomingMaps();

  return (
    <>
      <div className="">
        <h1 className="text-3xl text-center py-5">Active Maps</h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 grid-rows-* gap-5 mx-3 pb-5">
          {maps.map((map) => (
            <Link
              href={`/maps/${map.map.id}`}
              className="flex flex-col items-center pb-8 pt-3 bg-secondaryDark rounded-lg border border-white border-opacity-20 hover:brightness-75"
              key={map.map.id}
            >
              <div className="">
                <h2 className="text-xl text-greyText">{map.map.name}</h2>
                <div
                  className="flex items-center gap-2"
                  style={{ color: map.map.gameMode.color }}
                >
                  <p className="">{map.map.gameMode.name}</p>
                  <Image
                    src={map.map.gameMode.imageUrl}
                    alt="alt"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <Image
                src={map.map.imageUrl}
                alt="alt"
                width={230}
                height={0}
                style={{ height: "auto" }}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="">
        <h2 className="text-3xl text-center py-5">Upcoming Maps</h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 grid-rows-* gap-5 mx-3 pb-5">
          {upcomingMaps.map((map) => (
            <Link
              href={`/mapInfo?id=${map.map.id}`}
              className="flex flex-col items-center pb-8 pt-3 bg-secondaryDark rounded-lg border border-white border-opacity-20 hover:brightness-75"
              key={map.map.id}
            >
              <div className="">
                <h2 className="text-xl text-greyText">{map.map.name}</h2>
                <div
                  className="flex items-center gap-2"
                  style={{ color: map.map.gameMode.color }}
                >
                  <p className="">{map.map.gameMode.name}</p>
                  <Image
                    src={map.map.gameMode.imageUrl}
                    alt="alt"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <Image
                src={map.map.imageUrl}
                alt="alt"
                width={230}
                height={0}
                style={{ height: "auto" }}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
