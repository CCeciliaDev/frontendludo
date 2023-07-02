import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <Header className="header" />
      <Outlet className="outlet" />
      <Footer className="footer" />
    </div>
  );
}
