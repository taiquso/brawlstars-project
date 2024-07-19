"use client";

import Image from "next/image";
import BrawlLogo from "../assets/braw-logotest.svg";
import MenuButton from "../assets/menu-button.svg";
import { useState, useEffect } from "react";
import "./navbar.css";

export default function NavBar() {
  const [navBar, setNavBar] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setNavBar(true);
    }

    const handleResize = () => {
      setNavBar(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="bg-secondaryDark flex py-2 justify-between items-center px-5">
        <a href="/" className="flex items-center">
          <Image src={BrawlLogo} alt="alt" width={70} height={70} />
        </a>
        <div className={`navbar-menu ${navBar ? "open" : ""}`}>
          <ul className="flex justify-evenly items-center py-4 text-lg text-greyText w-full">
            <li className="">
              <a href="/" className="focus:text-white">
                Profile
              </a>
            </li>
            <li className="">
              <a href="/brawlers" className="focus:text-white">
                Brawlers
              </a>
            </li>
            <li className="">
              <a href="/maps" className="focus:text-white">
                Maps
              </a>
            </li>
            <li className="">
              <a href="/maps" className="focus:text-white">
                Ranking
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center lg:hidden">
          <Image
            src={MenuButton}
            alt="alt"
            width={40}
            height={40}
            onClick={() => setNavBar((prevState) => !prevState)}
          />
        </div>
      </nav>
    </>
  );
}
