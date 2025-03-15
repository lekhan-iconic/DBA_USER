import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Navigate,Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BSucess from "./pages/BSucess";
import DBTasks from "./pages/DBTasks";
import Performance from "./pages/Performance";
import Security from "./pages/Security";
import Settings from "./pages/Settings";
import BFailed from "./pages/BFailed";
import LSSucess from "./pages/LSSucess";
import LSFailed from "./pages/LSFailed";
import ProtectedRoute from "./components/ProtectedRoute"
import ISucess from "./pages/ISucess";
import IFailed from "./pages/IFailed";
import ASucess from "./pages/ASucess";
import AFailed from "./pages/AFailed";
import DLReport from "./pages/DLReport";
import DBGReport from "./pages/DBGReport";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          {/* protecting the routing */}
          <Route element={<ProtectedRoute />}>
          <Route path="/navbar" element={<Navbar />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
        {/* normal routing */}
          <Route path="/navbar" element={<Navbar />}></Route>
          <Route path="/DBTasks" element={<DBTasks />}></Route>
          <Route path="/performance" element={<Performance />}></Route>
          <Route path="/security" element={<Security />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/backup/success" element={<BSucess />}></Route>
          <Route path="/backup/failed" element={<BFailed />}></Route>
          <Route path="/logshipping/success" element={<LSSucess />}></Route>
          <Route path="/logshipping/failed" element={<LSFailed />}></Route>
          <Route path="/index/success" element={<ISucess />}></Route>
          <Route path="/index/failed" element={<IFailed />}></Route>
          <Route path="/archival/success" element={<ASucess />}></Route>
          <Route path="/archival/failed" element={<AFailed />}></Route>
          <Route path="/deadlock" element={<DLReport />}></Route>
          <Route path="/dbgrowth" element={<DBGReport />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
