import { Header } from "@/components";
import { Footer } from "@jobis/ui";
import Router from "./router";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <>
      {!location.pathname.includes("signin") && <Header />}
      <Router />
      {!location.pathname.includes("signin") && <Footer />}
    </>
  );
}

export default App;
