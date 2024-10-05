import { BrowserRouter, Route, Routes } from "react-router-dom";
import Policy from "./pages/policy";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up-policy" element={<Policy />} />
      </Routes>
    </BrowserRouter>
  );
};
