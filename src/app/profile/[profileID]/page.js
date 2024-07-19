import NavBar from "../../components/NavBar";
import GetPlayerData from "../../components/GetPlayerData";
import Footer from "../../components/Footer";
import GetBattleLog from "../../components/GetBattleLog";

export default function GetProfile({ params }) {
  const { profileID } = params;

  return (
    <>
      <NavBar />
      <GetPlayerData profileID={profileID} />
      <GetBattleLog profileID={profileID} />
      <Footer />
    </>
  );
}
