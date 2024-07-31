import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const DetailBarang = () => {
  const { id } = useParams();
  const [record, setRecord] = useState({
    Nama: "",
    Kode: "",
    Jumlah: "",
    Kondisi: "",
  }); // Single record state
  const navigate = useNavigate();

  const getUserById = async () => {
    try {
      const res = await axios.get(
        `https://node.himpapoltekba.com/BendaId/${id}`
      );
      setRecord(res.data.data);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch data. Please try again later.",
      });
    }
  };

  useEffect(() => {
    getUserById();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="col-span-full sm:col-span-16 xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
        {/* left header */}
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Detail Barang
        </h2>
        {/* right header */}
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Kembali
        </button>
      </header>

      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Detail</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Value</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              <tr>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left font-semibold">Nama Barang</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left">{record.Nama}</div>
                </td>
              </tr>
              <tr>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left font-semibold">Kode Barang</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left">{record.Kode}</div>
                </td>
              </tr>
              <tr>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left font-semibold">Jumlah</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left">{record.Jumlah}</div>
                </td>
              </tr>
              <tr>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left font-semibold">Kondisi</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left">{record.Kondisi}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailBarang;
