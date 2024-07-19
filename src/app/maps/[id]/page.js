import GetMapsInfo from "../../components/GetMapsInfo";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function mapInfo({ params }) {
  const { id } = params;
  return (
    <>
      <NavBar />
      <GetMapsInfo id={id} />
      <Footer />
    </>
  );
}
