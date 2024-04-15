import { RecruitmentPage, SignInPage } from "@/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecruitmentPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route path="/company" element={<></>} />
        <Route path="/student" element={<></>} />
        <Route path="/application" element={<></>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
