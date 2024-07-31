import React, { useState } from "react";

import SidebarAdmin from "../partials/SidebarAdmin";
import Header from "../partials/Header";
import LaporanPeminjaman from "../partials/peminjaman/LaporanPeminjaman";

function Laporan() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* SidebarAdmin */}
      <SidebarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Kelola Barang
                </h1>
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-12 gap-12">
              <LaporanPeminjaman />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Laporan;
