import {
  ApplicationPage,
  CompanyPage,
  FileDetail,
  RecruitmentPage,
  SignInPage,
} from "@/pages";
import { Route, Routes } from "react-router-dom";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<RecruitmentPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/recruitment" element={<RecruitmentPage />} />
      <Route path="/company" element={<CompanyPage />} />
      <Route path="/student" element={<></>} />
      <Route path="/application" element={<ApplicationPage />} />
      <Route path="/file" element={<FileDetail />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default Router;
