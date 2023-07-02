import { Routes, Route } from "react-router-dom";
import AdminLayout from "../admin/pages/AdminLayout";
import Adminpage from "../admin/pages/Adminpage";
import ReadTheme from "../admin/pages/ReadTheme";
import CreateTheme from "../admin/pages/CreateTheme";
import UpdateTheme from "../admin/pages/UpdateTheme";
import DeleteTheme from "../admin/pages/DeleteTheme";
import ReadArticle from "../admin/pages/ReadArticle";
import CreateArticle from "../admin/pages/CreateArticle";
import UpdateArticle from "../admin/pages/UpdateArticle";
import DeleteArticle from "../admin/pages/DeleteArticle";
import ReadArticleArchived from "../admin/pages/ReadArticleArchived";
import UpdateArticleArchived from "../admin/pages/UpdateArticleArchived";
import DeleteArticleArchived from "../admin/pages/DeleteArticleArchived";
import ReadThDoc from "../admin/pages/ReadThDoc";
import CreateThDoc from "../admin/pages/CreateThDoc";
import UpdateThDoc from "../admin/pages/UpdateThDoc";
import DeleteThDoc from "../admin/pages/DeleteThDoc";
import ReadDocu from "../admin/pages/ReadDocu";
import CreateDocu from "../admin/pages/CreateDocu";
import UpdateDocu from "../admin/pages/UpdateDocu";
import DeleteDocu from "../admin/pages/DeleteDocu";
import ReadPassW from "../admin/pages/ReadPassW";
import CreatePassW from "../admin/pages/CreatePassW";
import UpdatePassW from "../admin/pages/UpdatePassW";
import DeletePassW from "../admin/pages/DeletePassW";
import UpdateWelcome from "../admin/pages/UpdateWelcome";
import UpdateAbout from "../admin/pages/UpdateAbout";
import UpdateConsult from "../admin/pages/UpdateConsult";
import UpdatePlace from "../admin/pages/UpdatePlace";
import CreatePlace from "../admin/pages/CreatePlace";
import UpdatePrice from "../admin/pages/UpdatePrice";
import UpdateContact from "../admin/pages/UpdateContact";
import Error from "../services/Error";

export default function AdminRouter() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Adminpage />} />

        <Route path="reTheme" element={<ReadTheme />} />
        <Route path="crTheme" element={<CreateTheme />} />
        <Route path="upTheme" element={<UpdateTheme />} />
        <Route path="deTheme" element={<DeleteTheme />} />

        <Route path="reArticle" element={<ReadArticle />} />
        <Route path="crArticle" element={<CreateArticle />} />
        <Route path="upArticle" element={<UpdateArticle />} />
        <Route path="deArticle" element={<DeleteArticle />} />

        <Route path="reArticleArchi" element={<ReadArticleArchived />} />
        <Route path="upArticleArchi" element={<UpdateArticleArchived />} />
        <Route path="deArticleArchi" element={<DeleteArticleArchived />} />

        <Route path="reThDoc" element={<ReadThDoc />} />
        <Route path="crThDoc" element={<CreateThDoc />} />
        <Route path="upThDoc" element={<UpdateThDoc />} />
        <Route path="deThDoc" element={<DeleteThDoc />} />

        <Route path="reDocu" element={<ReadDocu />} />
        <Route path="crDocu" element={<CreateDocu />} />
        <Route path="upDocu" element={<UpdateDocu />} />
        <Route path="deDocu" element={<DeleteDocu />} />

        <Route path="rePassW" element={<ReadPassW />} />
        <Route path="crPassW" element={<CreatePassW />} />
        <Route path="upPassW" element={<UpdatePassW />} />
        <Route path="dePassW" element={<DeletePassW />} />

        <Route path="upWelcome" element={<UpdateWelcome />} />
        <Route path="upAbout" element={<UpdateAbout />} />
        <Route path="upConsult" element={<UpdateConsult />} />
        <Route path="upPlace" element={<UpdatePlace />} />
        <Route path="crPlace" element={<CreatePlace />} />
        <Route path="upPrices" element={<UpdatePrice />} />
        <Route path="upContact" element={<UpdateContact />} />

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
