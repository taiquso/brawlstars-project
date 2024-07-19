import GetBrawlerInfo from "../../components/GetBrawlerInfo";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function BrawlerInfoPage({ params }) {
  const { id } = params;

  return (
    <>
      <NavBar />
      <GetBrawlerInfo id={id} />
      <Footer />
    </>
  );
}
