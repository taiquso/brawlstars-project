import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { redirect } from "next/navigation";

export default function Profile() {
  redirect("/");
  return (
    <>
      <div className="">
        <NavBar />
        <Footer />
      </div>
    </>
  );
}
