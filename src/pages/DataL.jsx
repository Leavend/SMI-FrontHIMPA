/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import QRCode from "qrcode";

function DataL() {
  const navigate = useNavigate();

  // State variables
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUserById();
  }, []);

  // Fetch data from API
  const getUserById = async () => {
    await axios
      .get(`https://node.himpapoltekba.com/benda`)
      .then(async (res) => {
        const dataWithQrCodes = await Promise.all(
          res.data.data.map(async (item) => {
            const qrCodeDataURL = await QRCode.toDataURL(
              `http://himpapoltekba.com/Detail/${item.id}`
            );
            return { ...item, qrCodeDataURL };
          })
        );
        setRecords(dataWithQrCodes);
      })
      .catch((err) => console.log(err));
  };

  // Filter records based on search query
  const filteredRecords = records.filter(
    (record) =>
      record.Nama &&
      record.Nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };

  // Navigate functions (unchanged from your original code)
  const onClick = () => {
    navigate("/Peminjaman");
  };

  const onClick2 = () => {
    navigate("/Pengembalian");
  };

  const onClick3 = () => {
    navigate("/Dashboard2");
  };

  const onClick4 = () => {
    Swal.fire({
      title: "Apakah anda yakin untuk keluar?",
      showDenyButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Berhasil keluar!", "", "success");
        navigate("/");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-[#696969] text-black p-8 rounded-lg shadow-md w-11/12 grid grid-cols-3">
        <div className="col-span-1">
          <div className="bg-[#696969] p-8 rounded-lg shadow-lg w-1/2 md:w-2/3 border-2 border-gray-200 ">
            <div className="flex justify-center mb-4">
              <div className=" rounded-full h-20 w-20 flex items-center justify-center">
                <MdOutlineAccountCircle className="text-8xl text-gray-300" />
              </div>
            </div>
            <form>
              <div className="mb-10 -mt-4">
                <h3
                  className="block text-gray-300 mb-1 font-bold text-lg text-center"
                  htmlFor="username"
                >
                  Username
                </h3>
              </div>
              <div className="mb-6" onClick={onClick3}>
                <h3
                  className="block text-gray-300 mb-1 font-bold text-lg cursor-pointer"
                  htmlFor="password"
                >
                  Dashboard
                </h3>
              </div>

              <div className="mb-6" onClick={onClick}>
                <h3
                  className="block text-gray-300 mb-1 font-bold text-lg cursor-pointer"
                  htmlFor="phone"
                >
                  Peminjaman Barang
                </h3>
              </div>
              <div className="mb-6" onClick={onClick2}>
                <h3
                  className="block text-gray-300 mb-1 font-bold text-lg cursor-pointer"
                  htmlFor="email"
                >
                  Pengembalian Barang
                </h3>
              </div>
              <div className="mb-6">
                <h3
                  className="block text-gray-300 mb-1 font-bold text-lg cursor-pointer"
                  htmlFor="email"
                >
                  Data Barang
                </h3>
              </div>
              <button
                type="button"
                onClick={onClick4}
                className="w-full  text-gray-300 py-2 mt-4 font-bold text-lg cursor-pointer"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-6 ml-40 ">Data Barang</h2>
          <div className="flex justify-end pb-10 mb-1 gap-10 flex-col md:flex-row">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-50 p-2 rounded-md bg-white border-none"
            ></input>
          </div>
          <div className=" h-64 -mt-5 overflow-y-auto w-3/4">
            <table className="w-full border-2  bg-white border-black mt-0">
              <thead>
                <tr className="border-2 bg-white border-black">
                  <th className="border-2 text-lg font-semibold  border-black">
                    No
                  </th>
                  <th className="border-2 text-lg font-semibold  border-black">
                    Nama Barang
                  </th>
                  <th className="border-2 text-lg font-semibold  border-black">
                    Jumlah
                  </th>
                  <th className="border-2 text-lg font-semibold  border-black">
                    QR Code
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchQuery
                  ? filteredRecords.map((val, key) => (
                      <tr key={val.id} className="border-2  border-black">
                        <td className="border-2 text-center text-lg font-semibold  border-black">
                          {key + 1}
                        </td>
                        <td className="border-2 text-center text-lg font-semibold  border-black">
                          {val.Nama}
                        </td>
                        <td className="border-2 text-center text-lg font-semibold  border-black">
                          {val.Jumlah}
                        </td>
                        <td className="border-2 text-center text-lg font-semibold  border-black">
                          <img
                            src={val.qrCodeDataURL}
                            alt={`QR Code for ID ${val.id}`}
                          />
                        </td>
                        <td className="border-2 text-lg font-semibold flex mt-8">
                          <button
                            onClick={() => handleEdit(val.id)}
                            className="bg-white md:text-xl border-2    border-black text-black py-1 px-2 w-16  rounded-lg shadow hover:bg-gray-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(val.id)}
                            className="bg-white md:text-xl border-2   border-black text-black py-1 px-2  rounded-lg shadow hover:bg-gray-200"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  : records.map((val, key) => (
                      <tr key={val.id} className="border-2  border-black">
                        <td className="border-2 text-center text-lg font-semibold  border-black">
                          {key + 1}
                        </td>
                        <td className="border-2 text-center text-lg font-semibold  border-black">
                          {val.Nama}
                        </td>
                        <td className="border-2 text-center text-lg font-semibold  border-black">
                          {val.Jumlah}
                        </td>
                        <td className="border-2 text-center text-lg font-semibold  border-black">
                          <img
                            className="ml-20"
                            width="100px"
                            src={val.qrCodeDataURL}
                            alt={`QR Code for ID ${val.id}`}
                          />
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DataL;
