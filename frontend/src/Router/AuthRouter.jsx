import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Error from "../services/Error";

export default function AuthRouter() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      {/* <Route path="logout" element={<Logout />} /> */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
