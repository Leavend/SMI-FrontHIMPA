import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Dashboard2 from "./pages/Dashboard2";
import Peminjaman from "./pages/Peminjaman";
import Pengembalian from "./pages/Pengembalian";
import Data from "./pages/Data";
import DataL from "./pages/DataL";
import Edit from "./pages/Edit";
import Detail from "./pages/Detail";
import Kelola from "./pages/Kelola";
import Laporan from "./pages/Laporan";
import Tambah from "./pages/Tambah";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Dashboard-Admin" element={<Dashboard />} />
        <Route exact path="/Dashboard-User" element={<Dashboard2 />} />
        <Route exact path="/Peminjaman" element={<Peminjaman />} />
        <Route exact path="/Pengembalian" element={<Pengembalian />} />
        <Route exact path="/Data" element={<Data />} />
        <Route exact path="/DataL" element={<DataL />} />
        <Route exact path="/Edit/:id" element={<Edit />} />
        <Route exact path="/Kelola" element={<Kelola />} />
        <Route exact path="/Tambah" element={<Tambah />} />
        <Route exact path="/Laporan" element={<Laporan />} />
        <Route exact path="/Detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
