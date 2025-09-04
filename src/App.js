import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";


// Components and Pages
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import BSucess from "./pages/BSucess";
import DBTasks from "./pages/DBTasks";
import Performance from "./pages/Performance";
import Settings from "./pages/Settings";
import BFailed from "./pages/BFailed";
import LSSucess from "./pages/LSSucess";
import LSFailed from "./pages/LSFailed";
import ProtectedRoute from "./components/ProtectedRoute";
import DatabaseConnect from "./components/DatabaseConnect";
import ISucess from "./pages/ISucess";
import IFailed from "./pages/IFailed";
import ASucess from "./pages/ASucess";
import AFailed from "./pages/AFailed";
import DLReport from "./pages/DLReport";
import DBGReport from "./pages/DBGReport";
import SBlocking from "./pages/SBlocking";
import JDisable from "./pages/JDisable";
import JEnabled from "./pages/JEnabled";
import JFailed from "./pages/JFailed";
import IMonitoring from "./pages/IMonitoring";
import ServerPerformance from "./pages/ServerPerformance";
import LRSessions from "./pages/LRSessions";
import DatabaseLogin from "./components/DatabaseLogin";
import FullDetails from "./components/FullDetails";
import ABSucess from "./pages/ABSucess";
import AISucess from "./pages/AISucess ";
import AASucess from "./pages/AASucess";
import AJSucess from "./pages/AJSucess";
import AJFailed from "./pages/AJFailed";
import AJDisable from "./pages/AJDisable";

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DatabaseLogin />} />
          <Route path="/navbar" element={<Navbar />} />
          
          {/* ProtectedRoute and other routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/Dashboard" element={<DBTasks />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/ServerPerformance" element={<ServerPerformance />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/backup/success" element={<BSucess />} />
            <Route path="/backup/failed" element={<BFailed />} />
            <Route path="/logshipping/success" element={<LSSucess />} />
            <Route path="/logshipping/failed" element={<LSFailed />} />
            <Route path="/index/success" element={<ISucess />} />
            <Route path="/index/failed" element={<IFailed />} />
            <Route path="/archival/success" element={<ASucess />} />
            <Route path="/archival/failed" element={<AFailed />} />
            <Route path="/deadlock" element={<DLReport />} />
            <Route path="/dbgrowth" element={<DBGReport />} />
            <Route path="/SessionBlockings" element={<SBlocking />} />
            <Route path="/JobsDisabled" element={<JDisable />} />
            <Route path="/JobsEnabled" element={<JEnabled />} />
            <Route path="/JobsFailed" element={<JFailed />} />
            <Route path="/IndexMonitoring" element={<IMonitoring />} />
            <Route path="/LongRunSessions" element={<LRSessions />} />
            <Route path="/OverallDetails" element={<FullDetails />} />
            <Route path="/AllBackupDetails" element={<ABSucess />} />
            <Route path="/AllIndexDetails" element={<AISucess />} />
            <Route path="/AllArchivalDetails" element={<AASucess />} />
            <Route path="/AllSuccessJobsDetails" element={<AJSucess />} />
            <Route path="/AllFailedJobsDetails" element={<AJFailed />} />
            <Route path="/AllJobDisabledDetails" element={<AJDisable />} />

          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
