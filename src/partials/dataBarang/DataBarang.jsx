import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode";

function DataBarang() {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getRecords = async () => {
      try {
        const response = await axios.get(
          "https://node.himpapoltekba.com/benda"
        );
        const dataWithQrCodes = await Promise.all(
          response.data.data.map(async (item) => {
            const qrCodeDataURL = await QRCode.toDataURL(
              `http://himpapoltekba.com/Detail/${item.id}`
            );
            return { ...item, qrCodeDataURL };
          })
        );
        setRecords(dataWithQrCodes);
      } catch (error) {
        console.error("Failed to fetch records:", error);
      }
    };

    getRecords();
  }, []);

  const filteredRecords = records.filter(
    (record) =>
      record.Nama &&
      record.Nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="col-span-full sm:col-span-16 xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Data Barang
        </h2>
      </header>
      <div className="p-3">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
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
                  <div className="font-semibold text-center">QR Code</div>
                </th>
                {/* <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Aksi</div>
                </th> */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {filteredRecords.map((record, index) => (
                <tr key={record.id}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{index + 1}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{record.Nama}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{record.Jumlah}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex justify-center items-center">
                      <img
                        src={record.qrCodeDataURL}
                        alt="QR Code"
                        className="w-20 h-20"
                      />
                    </div>
                  </td>
                  {/* <td className="p-2 whitespace-nowrap">
                    <div className="text-center">
                      <button
                        onClick={() => handleEdit(record.id)}
                        className="text-blue-500 hover:underline mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="text-red-500 hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DataBarang;
