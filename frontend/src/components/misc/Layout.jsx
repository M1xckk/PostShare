import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import FooterCentered from "./FooterCentered";

const Layout = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1, paddingBottom: "2rem" }}>
        <Outlet />
      </main>
      <FooterCentered />
    </div>
  );
};

export default Layout;
