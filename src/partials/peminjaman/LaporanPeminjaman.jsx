import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LaporanPeminjaman() {
  const [record, setRecord] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getUserById = async () => {
    try {
      const res = await axios.get("https://node.himpapoltekba.com/Barang");
      setRecord(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRecords = record.filter((item) =>
    item.Nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="col-span-full sm:col-span-16 xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
        {/* left header */}
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Laporan Data Peminjaman Barang
        </h2>
      </header>

      <div className="p-3">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari nama peminjam"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm dark:bg-gray-900 dark:text-gray-200"
          />
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">No</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Nama Barang</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Jumlah</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">
                    Tanggal Pinjam
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">
                    Tanggal Kembali
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Nama Peminjam</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {filteredRecords.map((item, index) => (
                <tr key={item.id}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{index + 1}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{item.Benda}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{item.Jumlah}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center text-blue-500">
                      {formatDate(item.Tanggal1)}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center text-blue-500">
                      {formatDate(item.Tanggal2)}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{item.Nama}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div
                      className={`text-left ${
                        item.Status === "Kembali"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.Status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LaporanPeminjaman;
