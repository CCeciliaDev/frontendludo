import { Routes, Route } from "react-router-dom";
import About from "../public/pages/About";
import ArticlesDisplay from "../public/pages/ArticlesDisplay";
import ArticleRead from "../public/pages/ArticleRead";
import Consultation from "../public/pages/Consultation";
import Contact from "../public/pages/Contact";
import Home from "../public/pages/Home";
import Layout from "../public/pages/Layout";
import Error from "../services/Error";
import UserLogin from "../public/pages/UserLogin";
import Mentions from "../public/pages/Mentions";
import Places from "../public/pages/Places";

export default function PublicRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="consultation" element={<Consultation />} />
        <Route path="articles" element={<ArticlesDisplay />} />
        <Route path="articles/:id" element={<ArticleRead />} />
        <Route path="infos" element={<Places />} />
        <Route path="contact" element={<Contact />} />
        <Route path="userlogin" element={<UserLogin />} />
        <Route path="mentions-legales" element={<Mentions />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
