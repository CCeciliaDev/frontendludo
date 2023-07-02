import { Routes, Route } from "react-router-dom";
import Error from "../services/Error";
import Spaces from "../user/Spaces";

export default function UserRouter() {
  return (
    <Routes>
      <Route index element={<Spaces />} />
      <Route path="spaces" element={<Spaces />} />
      {/* <Route path="logout" element={<Logout />} /> */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
