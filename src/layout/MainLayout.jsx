import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// import TrustedOrgs from "../components/TrustedOrgs";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <TrustedOrgs></TrustedOrgs> */}
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;


// flex flex-col min-h-screen