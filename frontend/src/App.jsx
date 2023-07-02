import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRouter from "./Router/PublicRouter";
import AdminRouter from "./Router/AdminRouter";
import AuthRouter from "./Router/AuthRouter";
import UserRouter from "./Router/UserRouter";
import AuthGuard from "./services/AuthGuard";
import UserGuard from "./services/UserGuard";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PublicRouter />} />
          <Route
            path="/admin/*"
            element={<AuthGuard element={<AdminRouter />} />}
          />
          <Route path="/auth/*" element={<AuthRouter />} />
          <Route
            path="/user/*"
            element={<UserGuard element={<UserRouter />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
