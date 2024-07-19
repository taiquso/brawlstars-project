import Image from "next/image";
import Link from "next/link";
import RefreshButton from "./RefreshButton";

export default async function GetPlayerData({ profileID }) {
  const API_KEY = process.env.API_KEY;

  let player = null;
  let error = null;
  let lastUpdated = null;

  try {
    const res = await fetch(
      `https://api.brawlstars.com/v1/players/%23${profileID}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        next: { revalidate: 18000 },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    lastUpdated = new Date(res.headers.get("date"));

    player = await res.json();
  } catch (e) {
    console.error("Error fetching player data:", e);
    error = "Error fetching player data";
  }

  if (!player || !player.brawlers) {
    return (
      <div className="p-5">
        <h1 className="text-3xl text-center">Player Stats</h1>
        <h2 className="text-red-500 text-center pt-5 text-xl">
          {"Player data not found"}
        </h2>
      </div>
    );
  }

  const brawlers = player.brawlers.sort((a, b) => b.trophies - a.trophies);

  let playerIcon = null;

  const resIcon = await fetch(`https://api.brawlify.com/v1/icons`, {
    next: { revalidate: 18000 },
  });
  playerIcon = await resIcon.json();
  playerIcon = playerIcon.player;

  function getTimeSinceUpdate(time) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - time) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24 && diffInHours === 1) {
      return `${diffInHours} hour ago`;
    } else if (diffInHours < 24 && diffInHours > 1) {
      return `${diffInHours} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }

  const getBrawlerIcon = brawlers.map(async (brawler) => {
    const resBrawl = await fetch(
      `https://api.brawlify.com/v1/brawlers/${brawler.id}`,
      {
        next: { revalidate: 18000 },
      }
    );
    const data = await resBrawl.json();
    return data.imageUrl;
  });
  const brawlerIcon = await Promise.all(getBrawlerIcon);

  const getBrawlerColor = brawlers.map(async (brawler) => {
    const resBrawl = await fetch(
      `https://api.brawlify.com/v1/brawlers/${brawler.id}`,
      { next: { revalidate: 18000 } }
    );
    const data = await resBrawl.json();
    return data.rarity.color;
  });
  const brawlerColor = await Promise.all(getBrawlerColor);

  const getStarPower = async () => {
    const res = await fetch(`https://api.brawlify.com/v1/brawlers`, {
      next: { revalidate: 18000 },
    });
    const data = await res.json();
    const brawlerList = data.list;

    return brawlers.map((brawler) => {
      return brawler.starPowers.map((star) => {
        const matchingBrawler = brawlerList.find((b) => b.id === brawler.id);
        if (matchingBrawler) {
          const matchingStarPower = matchingBrawler.starPowers.find(
            (s) => s.id === star.id
          );
          return matchingStarPower ? matchingStarPower.imageUrl : null;
        }
        return null;
      });
    });
  };

  const starPowerIcon = await getStarPower();

  const getGadget = async () => {
    const res = await fetch(`https://api.brawlify.com/v1/brawlers`, {
      next: { revalidate: 18000 },
    });
    const data = await res.json();
    const brawlerList = data.list;

    return brawlers.map((brawler) => {
      return brawler.gadgets.map((gadget) => {
        const matchingBrawler = brawlerList.find((b) => b.id === brawler.id);
        if (matchingBrawler) {
          const matchingGadget = matchingBrawler.gadgets.find(
            (g) => g.id === gadget.id
          );
          return matchingGadget ? matchingGadget.imageUrl : null;
        }
        return null;
      });
    });
  };

  const gagdetIcon = await getGadget();

  let brawlerCount = null;
  const resBrCount = await fetch(`https://api.brawlify.com/v1/brawlers`, {
    next: { revalidate: 18000 },
  });
  brawlerCount = await resBrCount.json();
  brawlerCount = brawlerCount.list;

  return (
    <>
      <div className="p-5">
        <h1 className="text-3xl text-center">Player Stats</h1>
        {error ? (
          <h2 className="text-red-500 text-center pt-5 text-xl">{error}</h2>
        ) : (
          <div className="flex flex-col gap-3 pt-5">
            <Image
              src={playerIcon[`${player.icon.id}`].imageUrl}
              alt="alt"
              width={80}
              height={80}
            />
            <p className="text-gray-400 text-sm">
              (Last updated: {getTimeSinceUpdate(lastUpdated)})
            </p>
            <RefreshButton />
            <p
              className="text-3xl"
              style={{ color: "#" + player.nameColor.split("0xff")[1] }}
            >
              {player.name}
            </p>
            <p className="text-sm">{player.tag}</p>
            <div className="grid grid-cols-1 grid-rows-* lg:grid-cols-2 gap-3">
              <div className="flex gap-2 bg-secondaryDark p-2 items-center">
                <Image
                  src="https://cdn-old.brawlify.com/icon/trophy.png"
                  alt="alt"
                  width={30}
                  height={30}
                />
                <p className="text-yellow-300 text-lg">
                  Current Trophies : {player.trophies}
                </p>
              </div>

              <div className="flex gap-2 bg-secondaryDark p-2 items-center">
                <Image
                  src="https://cdn-old.brawlify.com/icon/trophy.png"
                  alt="alt"
                  width={30}
                  height={30}
                />
                <p className="text-yellow-300 text-lg">
                  Highest Trophies : {player.highestTrophies}
                </p>
              </div>

              <div className="flex gap-2 bg-secondaryDark p-2 items-center">
                <Image
                  src="https://cdn-old.brawlify.com/icon/Info.png"
                  alt="alt"
                  width={30}
                  height={30}
                />
                <p className="text-cyan-500 text-lg">
                  Level : {player.expLevel}
                </p>
              </div>

              <div className="flex gap-2 bg-secondaryDark p-2 items-center">
                <Image
                  src="https://cdn-old.brawlify.com/icon/NoClub.png"
                  alt="alt"
                  width={30}
                  height={30}
                />
                <p className="text-lg">Club : {player.club.name}</p>
              </div>

              <div className="flex gap-2 bg-secondaryDark p-2 items-center">
                <Image
                  src="https://cdn-old.brawlify.com/icon/3v3.png"
                  alt="alt"
                  width={30}
                  height={30}
                />
                <p className="text-[#cc0066] text-lg">
                  3vs3 Victories : {player["3vs3Victories"]}
                </p>
              </div>
              <div className="flex gap-2 bg-secondaryDark p-2 items-center">
                <Image
                  src="https://cdn-old.brawlify.com/gamemode/Showdown.png"
                  alt="alt"
                  width={30}
                  height={30}
                />
                <p className="text-[#339900] text-lg">
                  Duo Victories : {player.duoVictories}
                </p>
              </div>
              <div className="flex gap-2 bg-secondaryDark p-2 items-center">
                <Image
                  src="https://cdn-old.brawlify.com/gamemode/Showdown.png"
                  alt="alt"
                  width={30}
                  height={30}
                />
                <p className="text-[#339900] text-lg">
                  Solo Victories : {player.soloVictories}
                </p>
              </div>
              <div className="flex gap-2 bg-secondaryDark p-2 items-center">
                <Image
                  src="https://cdn-old.brawlify.com/gamemode/Robo-Rumble.png"
                  alt="alt"
                  width={30}
                  height={30}
                />
                <p className="text-red-600 text-lg">
                  Best Robot Rumble Time : {player.bestRoboRumbleTime}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="">
          <div className="flex flex-col items-center py-5">
            <h3 className="text-2xl">Brawlers</h3>
            <p className="text-greyText">
              ({brawlers.length}/{brawlerCount.length})
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-2 grid-rows-* gap-5">
            {brawlers.map((brawler, index) => (
              <div
                className="bg-secondaryDark p-5 rounded-lg flex flex-col gap-3 h-[325px] border-2 border-white border-opacity-20"
                key={brawler.id}
              >
                <div className="flex justify-between items-center">
                  <div className="">
                    <Link href={`/brawlerInfo?id=${brawler.id}`}>
                      <Image
                        src={brawlerIcon[index]}
                        alt="alt"
                        width={60}
                        height={60}
                      />
                    </Link>
                    <p
                      className="text-xl"
                      style={{ color: brawlerColor[index] }}
                    >
                      {brawler.name}
                    </p>
                  </div>
                  <Image
                    src={`https://cdn-old.brawlify.com/rank/${brawler.rank}.png`}
                    alt="alt"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="flex items-center">
                  <Image
                    src="https://static.wikia.nocookie.net/brawlstars/images/e/e1/Experience.png/revision/latest/scale-to-width-down/30?cb=20200818153443"
                    alt="alt"
                    width={40}
                    height={40}
                  />
                  <p
                    className={`relative ${
                      brawler.power > 9 ? "-left-7" : "-left-6"
                    } `}
                  >
                    {brawler.power}
                  </p>
                  <p className="text-[#5AB9EF]">Power Level</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Image
                    src="https://cdn-old.brawlify.com/icon/trophy.png"
                    alt="alt"
                    width={30}
                    height={30}
                  />
                  <p className="text-yellow-300 text-lg flex items-center gap-2">
                    {brawler.trophies}
                    <span className="text-greyText text-sm">
                      (Highest : {brawler.highestTrophies})
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="flex gap-2">
                    {brawler.starPowers.map((star, starIndex) => (
                      <div className="" key={star.id}>
                        <Image
                          src={starPowerIcon[index][starIndex]}
                          alt="alt"
                          width={40}
                          height={40}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {brawler.gadgets.map((gadget, gadgetIndex) => (
                      <div className="" key={gadget.id}>
                        <Image
                          src={gagdetIcon[index][gadgetIndex]}
                          alt="alt"
                          width={40}
                          height={40}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {brawler.gears && (
                  <div className="flex items-center gap-2">
                    {brawler.gears.map((gear) => (
                      <div className="" key={gear.id}>
                        {gear.id < 62000004 && (
                          <Image
                            src={`https://cdn-fankit.brawlify.com/gear_superrare_${
                              gear.name === "HEALTH"
                                ? "shield"
                                : gear.name.toLowerCase()
                            }.png`}
                            alt="alt"
                            width={30}
                            height={30}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
