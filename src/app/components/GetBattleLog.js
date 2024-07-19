import Image from "next/image";

export default async function GetBattleLog({ profileID }) {
  const API_KEY = process.env.API_KEY;
  let battleLog = null;
  const res = await fetch(
    `https://api.brawlstars.com/v1/players/%23${profileID}/battlelog`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      next: { revalidate: 18000 },
    }
  );
  battleLog = await res.json();
  battleLog = battleLog.items;

  if (!battleLog) {
    return (
      <div className="p-5">
        <h1 className="text-3xl text-center">Battle Log</h1>
        <h2 className="text-red-500 text-center pt-5 text-xl">
          {"Battle data not found"}
        </h2>
      </div>
    );
  }

  let profileBrawlers = [];

  battleLog.map((battle) => {
    if (battle.battle.players) {
      battle.battle.players.map((player) => {
        if (battle.battle.mode === "duels") {
          if (player.tag.split("#")[1] == profileID) {
            if (battle.battle.mode == "duels") {
              player.brawlers.map((brawler) => {
                profileBrawlers.push(brawler.id);
              });
            } else {
              profileBrawlers.push(player.brawler.id);
            }
          }
        }
      });
    }
    if (battle.battle.teams) {
      battle.battle.teams.map((team) => {
        team.map((player) => {
          if (player.tag.split("#")[1] == profileID) {
            profileBrawlers.push(player.brawler.id);
          }
        });
      });
    }
  });

  const resImg = await fetch(`https://api.brawlify.com/v1/brawlers`, {
    next: { revalidate: 18000 },
  });
  const brawlersData = await resImg.json();
  const brawlers = brawlersData.list;

  const brawlerIcon = profileBrawlers.map((id) => {
    const brawler = brawlers.find((b) => b.id === id);
    return brawler
      ? { imageUrl3: brawler.imageUrl3, name: brawler.name }
      : null;
  });

  let battleLogInfo = [];

  const getBattleLogInfo = battleLog.map((battle) => {
    if (battle.battle.players) {
      if (battle.battle.mode === "duels") {
        battleLogInfo.push(battle.battle.result);
      } else {
        battleLogInfo.push(battle.battle.trophyChange);
      }
    }
    if (battle.battle.teams) {
      if (battle.battle.result) {
        battleLogInfo.push(battle.battle.result);
      } else {
        battleLogInfo.push(battle.battle.trophyChange);
      }
    }
  });

  const getColor = (result) => {
    if (typeof result === "string") {
      return result === "victory" ? "#77DD77" : "#DD7777";
    } else {
      return result > 0 ? "#77DD77" : "#DD7777";
    }
  };

  return (
    <>
      <h1 className="text-2xl text-center pb-5">Battle Log</h1>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-12 grid-rows-* gap-5 mb-5 mx-5">
        {brawlerIcon.length > 0 ? (
          brawlerIcon.map((brawler, index) => (
            <div
              className="flex justify-center border border-white border-opacity-20 rounded-lg p-5"
              key={`${brawler.name}-${index}`}
              style={{ backgroundColor: getColor(battleLogInfo[index]) }}
            >
              <Image src={brawler.imageUrl3} alt="alt" width={45} height={45} />
            </div>
          ))
        ) : (
          <p className="col-start-6 col-end-7 text-center">
            No battle available
          </p>
        )}
      </div>
    </>
  );
}
