import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./Page/Index";
import OnBoard from "./Page/Onboard";
import Home from "./Page/Home";
import Loading from "./Components/Template/Loading";
import User from "./Page/User";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <I_App />
            </>
          }
        />
        <Route path="/onboard" element={<OnBoard />} />
        <Route path="/home" element={<H_App />} />
        <Route path="/@/:username" element={<U_App />} />
      </Routes>
      <Loading />
    </Router>
  );
}

export default App;
function I_App() {
  return (
    <div className="flex min-h-screen min-w-screen antialiased  bg-[#06141D]">
      <div className="container mx-auto flex w-full flex-col items-center ">
        <Index />
      </div>
    </div>
  );
}

function H_App() {
  return (
    <div className="flex min-h-screen min-w-screen antialiased  bg-[#06141D]">
      <div className="container mx-auto flex w-full flex-col items-center ">
        <Home />
      </div>
    </div>
  );
}

function U_App() {
  return (
    <div className="flex min-h-screen min-w-screen antialiased  bg-[#06141D]">
      <div className="container mx-auto flex w-full flex-col items-center ">
        <User />
      </div>
    </div>
  );
}
