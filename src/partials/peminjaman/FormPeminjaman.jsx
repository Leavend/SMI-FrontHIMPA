import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
      className="block font-bold text-lg text-gray-800 dark:text-gray-100"
    >
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm dark:bg-gray-900 dark:text-gray-200"
    >
      <option value="">Pilih</option>
      {options.map((option) => (
        <option key={option.id} value={option.Nama}>
          {option.Nama}
        </option>
      ))}
    </select>
  </div>
);

function FormPeminjaman() {
  const [Nama, setNama] = useState("");
  const [Benda, setBenda] = useState("");
  const [Ttl, setTtl] = useState("");
  const [Nomer, setNomer] = useState("");
  const [Email, setEmail] = useState("");
  const [Jumlah, setJumlah] = useState("");
  const [Tanggal1, setTanggal1] = useState("");
  const [Tanggal2, setTanggal2] = useState("");
  const [fileList, setFileList] = useState(null);
  const [records, setRecords] = useState([]);

  const fetchRecords = useCallback(async () => {
    try {
      const res = await axios.get("https://node.himpapoltekba.com/benda");
      setRecords(res.data.data);
    } catch (err) {
      console.error("Failed to fetch records:", err);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleFileChange = (e) => {
    setFileList(e.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      !Nama ||
      !Benda ||
      !Jumlah ||
      !Nomer ||
      !Email ||
      !Tanggal1 ||
      !Tanggal2
    ) {
      Swal.fire({
        icon: "warning",
        title: "Data tidak lengkap",
        text: "Harap lengkapi semua field yang diperlukan.",
      });
      return;
    }

    const formData = new FormData();
    if (fileList) {
      formData.append("files", fileList);
    }
    formData.append("Nama", Nama);
    formData.append("Benda", Benda);
    formData.append("TTL", Ttl);
    formData.append("Nomer", Nomer);
    formData.append("Email", Email);
    formData.append("Jumlah", Jumlah);
    formData.append("Tanggal1", Tanggal1);
    formData.append("Tanggal2", Tanggal2);
    formData.append("Status", "Dipinjam");

    try {
      const res = await axios.post(
        "https://node.himpapoltekba.com/createBarang",
        formData
      );
      if (res.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Meminjam Barang",
          showConfirmButton: false,
          timer: 1500,
        });

        const message = `Saya ${Nama} ingin melakukan peminjaman ${Benda} dengan jumlah ${Jumlah}. Email: ${Email}, No HP: ${Nomer}, Tanggal Peminjaman: ${Tanggal1}, Tanggal Pengembalian: ${Tanggal2}. Sekian, terima kasih.`;

        console.log(message);
        handleSend(message);

        // Clear the form fields
        setNama("");
        setBenda("");
        setTtl("");
        setNomer("");
        setEmail("");
        setJumlah("");
        setTanggal1("");
        setTanggal2("");
        setFileList(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Maaf",
          text: "Gagal Meminjam Barang",
        });
      }
    } catch (err) {
      console.error("Failed to submit form:", err);
    }
  };

  const handleSend = (message) => {
    const url = `https://wa.me/+6281350035897?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-16 xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Form Peminjaman
          </h2>
        </header>
        <div className="mb-5">
          <form onSubmit={handleFormSubmit}>
            <InputField
              id="name"
              label="Nama"
              value={Nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama Lengkap"
            />
            <SelectField
              id="item"
              label="Nama Barang"
              options={records}
              value={Benda}
              onChange={(e) => setBenda(e.target.value)}
            />
            <InputField
              id="alamat"
              label="Alamat"
              value={Ttl}
              onChange={(e) => setTtl(e.target.value)}
              placeholder="Alamat"
            />
            <InputField
              id="nohp"
              label="NoHP"
              value={Nomer}
              onChange={(e) => setNomer(e.target.value)}
              placeholder="NO HP"
            />
            <InputField
              id="email"
              label="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <InputField
              id="amount"
              label="Jumlah Barang"
              type="number"
              value={Jumlah}
              onChange={(e) => setJumlah(e.target.value)}
              placeholder="Jumlah yang ingin dipinjam"
              min={0}
            />
            <InputField
              id="identity"
              label="Nomor Identitas (KTP/SIM/Passport)"
              type="file"
              onChange={handleFileChange}
            />
            <InputField
              id="date"
              label="Tanggal Peminjaman"
              type="date"
              value={Tanggal1}
              onChange={(e) => setTanggal1(e.target.value)}
            />
            <InputField
              id="date2"
              label="Tanggal Pengembalian"
              type="date"
              value={Tanggal2}
              onChange={(e) => setTanggal2(e.target.value)}
            />
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Ajukan Peminjaman
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormPeminjaman;
