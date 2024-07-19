"use client";

import Link from "next/link";
import Image from "next/image";
import profileIdImage1 from "/src/app/assets/IMG_0893.PNG";
import profileIdImage2 from "/src/app/assets/IMG_0894.PNG";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileID = e.target.profileID.value;
    router.push(`/profile/${profileID}`);
  };

  return (
    <>
      <section className="flex flex-col items-center mx-5 md:mx-32 xl:mx-[30%] pb-[30px] lg:pb-[50px]">
        <h1 className="text-3xl md:text-4xl xl:text-5xl text-center pt-[30px] lg:pt-[50px]">
          Welcome to BrawlGuide. The best brawl stars guide and profile finder !
        </h1>
        <p className=" text-md lg:text-lg pt-6 text-center text-greyText">
          In BrawlGuide you can look for any player&apos;s profile statistics by
          entering their profile ID just below. You can also look at any brawler
          in the game and today&apos;s active maps alongside the upcoming maps.
          Enjoy !
        </p>
        <div className="flex gap-5 my-5">
          <Link
            href="/maps"
            className="bg-white rounded-lg p-2 text-secondaryDark hover:brightness-75 lg:text-lg"
          >
            See today&apos;s maps
          </Link>
          <Link
            href="/ranking"
            className="bg-white rounded-lg bg-opacity-20 text-white p-2 hover:brightness-75 lg:text-lg"
          >
            See the ranking
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mb-5 flex flex-col gap-5 max-w-[600px] items-center justify-center w-full"
        >
          <div className="flex items-center w-full">
            <p className="border border-slate-200 rounded-s-lg py-3 px-3 bg-slate-200 text-black lg:text-lg">
              #
            </p>
            <input
              type="text"
              name="profileID"
              placeholder="Profile ID"
              className="w-full border border-slate-200 rounded-e-lg py-3 px-5 outline-none	bg-transparent lg:text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 rounded-lg py-3 hover:brightness-75 transition ease-in-out duration-300 lg:text-lg"
          >
            Search Profile
          </button>
        </form>
      </section>
      <div className="flex flex-col xl:flex-row items-center justify-center gap-5 pb-12 mx-5">
        <Image src={profileIdImage1} alt="alt" width={550} height={400} />
        <Image src={profileIdImage2} alt="alt" width={550} height={400} />
      </div>
    </>
  );
}
