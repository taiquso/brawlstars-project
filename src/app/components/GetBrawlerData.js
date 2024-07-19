import Image from "next/image";
import Link from "next/link";

const getBrawler = async () => {
  const res = await fetch(`https://api.brawlify.com/v1/brawlers`, {
    next: { revalidate: 18000 },
  });
  const data = await res.json();
  return data.list;
};

export default async function GetBrawlerData() {
  const brawlers = await getBrawler();

  const commonBrawlers = brawlers.filter(
    (brawler) => brawler.rarity.name === "Common"
  );

  const rareBrawlers = brawlers.filter(
    (brawler) => brawler.rarity.name === "Rare"
  );

  const superRareBrawlers = brawlers.filter(
    (brawler) => brawler.rarity.name === "Super Rare"
  );

  const epicBrawlers = brawlers.filter(
    (brawler) => brawler.rarity.name === "Epic"
  );

  const mythicBrawlers = brawlers.filter(
    (brawler) => brawler.rarity.name === "Mythic"
  );

  const legendaryBrawlers = brawlers.filter(
    (brawler) => brawler.rarity.name === "Legendary"
  );

  return (
    <>
      <div className="mb-5">
        <p className="bg-shelly p-5 text-black text-xl">
          First Brawler ({commonBrawlers.length})
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-12 py-5 gap-4 mx-5">
          {commonBrawlers.map((brawler) => (
            <div className="py-5" key={brawler.id}>
              <div className="">
                <Link
                  href={`/brawlers/${brawler.id}`}
                  className="hover:brightness-75"
                >
                  <Image
                    src={brawler.imageUrl2}
                    alt={brawler.name}
                    width={90}
                    height={90}
                    style={{ borderColor: brawler.rarity.color }}
                    className="border-2"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="bg-rare p-5 text-black text-xl">
          Rare Brawlers ({rareBrawlers.length})
        </p>
        <div className="grid grid-cols-3 lg:grid-cols-12 py-5 gap-4 mx-5">
          {rareBrawlers.map((brawler) => (
            <div className="" key={brawler.id}>
              <div className="">
                <Link
                  href={`/brawlers/${brawler.id}`}
                  className="hover:brightness-75"
                >
                  <Image
                    src={brawler.imageUrl2}
                    alt={brawler.name}
                    width={90}
                    height={90}
                    style={{ borderColor: brawler.rarity.color }}
                    className="border-2"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="bg-superRare p-5 text-black text-xl">
          Super Rare Brawlers ({superRareBrawlers.length})
        </p>
        <div className="grid grid-cols-3 lg:grid-cols-12 py-5 gap-4 mx-5">
          {superRareBrawlers.map((brawler) => (
            <div className="" key={brawler.id}>
              <div className="">
                <Link
                  href={`/brawlers/${brawler.id}`}
                  className="hover:brightness-75"
                >
                  <Image
                    src={brawler.imageUrl2}
                    alt={brawler.name}
                    width={90}
                    height={90}
                    style={{ borderColor: brawler.rarity.color }}
                    className="border-2"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="bg-epic p-5 text-black text-xl">
          Epic Brawlers ({epicBrawlers.length})
        </p>
        <div className="grid grid-cols-3 lg:grid-cols-12 py-5 gap-4 mx-5">
          {epicBrawlers.map((brawler) => (
            <div className="" key={brawler.id}>
              <div className="">
                <Link
                  href={`/brawlers/${brawler.id}`}
                  className="hover:brightness-75"
                >
                  <Image
                    src={brawler.imageUrl2}
                    alt={brawler.name}
                    width={90}
                    height={90}
                    style={{ borderColor: brawler.rarity.color }}
                    className="border-2"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="bg-mythic p-5 text-black text-xl">
          Mythic Brawlers ({mythicBrawlers.length})
        </p>
        <div className="grid grid-cols-3 lg:grid-cols-12 py-5 gap-4 mx-5">
          {mythicBrawlers.map((brawler) => (
            <div className="" key={brawler.id}>
              <div className="">
                <Link
                  href={`/brawlers/${brawler.id}`}
                  className="hover:brightness-75"
                >
                  <Image
                    src={brawler.imageUrl2}
                    alt={brawler.name}
                    width={90}
                    height={90}
                    style={{ borderColor: brawler.rarity.color }}
                    className="border-2"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="bg-legendary p-5 text-black text-xl">
          Legendary Brawlers ({legendaryBrawlers.length})
        </p>
        <div className="grid grid-cols-3 lg:grid-cols-12 py-5 gap-4 mx-5">
          {legendaryBrawlers.map((brawler) => (
            <div className="" key={brawler.id}>
              <div className="">
                <Link
                  href={`/brawlers/${brawler.id}`}
                  className="hover:brightness-75"
                >
                  <Image
                    src={brawler.imageUrl2}
                    alt={brawler.name}
                    width={90}
                    height={90}
                    style={{ borderColor: brawler.rarity.color }}
                    className="border-2"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
