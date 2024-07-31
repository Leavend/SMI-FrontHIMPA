import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Input Component
const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      placeholder={placeholder}
      className="mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm dark:bg-gray-900 dark:text-gray-200"
    />
  </div>
);

// Select Component
const SelectField = ({ id, label, options, value, onChange }) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
    >
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm dark:bg-gray-900 dark:text-gray-200"
    >
      <option value="">Kondisi</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

function FormTambahBarang() {
  const [Nama, setNama] = useState("");
  const [Kode, setKode] = useState("");
  const [Jumlah, setJumlah] = useState("");
  const [Kondisi, setKondisi] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Options for 'Kondisi' dropdown
  const kondisiOptions = ["Bagus", "Rusak", "Perlu Diperbaiki"];

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!Nama || !Kode || !Jumlah || !Kondisi) {
      Swal.fire({
        icon: "warning",
        title: "Data tidak lengkap",
        text: "Harap lengkapi semua field yang diperlukan.",
      });
      return;
    }

    try {
      const res = await axios.post(
        "https://node.himpapoltekba.com/createBenda",
        {
          Nama,
          Kode,
          Jumlah,
          Kondisi,
        }
      );

      if (res.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Barang",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/Kelola");
      } else {
        Swal.fire({
          icon: "error",
          title: "Maaf",
          text: "Gagal Menambahkan Barang",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Maaf",
        text: "Gagal Menambahkan Barang",
      });
      console.error("Failed to submit form:", err);
    }
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-16 xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Form Tambah Barang
          </h2>
        </header>
        <div className="mb-5">
          <form onSubmit={handleFormSubmit}>
            <InputField
              id="nama"
              label="Nama Barang"
              value={Nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama Barang"
            />
            <InputField
              id="kode"
              label="Kode Barang"
              value={Kode}
              onChange={(e) => setKode(e.target.value)}
              placeholder="Kode Barang"
            />
            <InputField
              id="jumlah"
              label="Jumlah Barang"
              type="number"
              value={Jumlah}
              onChange={(e) => setJumlah(e.target.value)}
              placeholder="Jumlah Barang"
              min={0}
            />
            <SelectField
              id="kondisi"
              label="Kondisi Barang"
              options={kondisiOptions}
              value={Kondisi}
              onChange={(e) => setKondisi(e.target.value)}
            />
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Tambahkan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormTambahBarang;
