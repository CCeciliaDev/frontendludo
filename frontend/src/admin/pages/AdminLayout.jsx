import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import SideAdmin from "../components/SideAdmin";
import "../styles/Admin.css";

export default function Layout() {
  return (
    <div className="ALayout">
      <AdminHeader />
      <div id="admin">
        <SideAdmin />
      </div>
      <div id="admin_body">
        <Outlet />
      </div>
    </div>
  );
}
