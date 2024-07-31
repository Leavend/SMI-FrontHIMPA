import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

// Input Component
const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  readOnly = false,
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
      readOnly={readOnly}
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

const FormPengembalian = () => {
  const [nama, setNama] = useState("");
  const [benda, setBenda] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nomer, setNomer] = useState("");
  const [email, setEmail] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [tanggalPengembalian, setTanggalPengembalian] = useState("");
  const [buktiPengembalian, setBuktiPengembalian] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          "https://node.himpapoltekba.com/benda"
        );
        setRecords(response.data.data);
      } catch (error) {
        console.error("Failed to fetch records:", error);
      }
    };

    fetchRecords();
  }, []);

  const handleFileChange = (event) => {
    setBuktiPengembalian(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      !nama ||
      !benda ||
      !jumlah ||
      !nomer ||
      !email ||
      !tanggalPengembalian
    ) {
      Swal.fire({
        icon: "warning",
        title: "Data tidak lengkap",
        text: "Harap lengkapi semua field yang diperlukan.",
      });
      return;
    }

    const formData = new FormData();
    if (buktiPengembalian) {
      formData.append("files", buktiPengembalian);
    }
    formData.append("Nama", nama);
    formData.append("Benda", benda);
    formData.append("Alamat", alamat);
    formData.append("Nomer", nomer);
    formData.append("Email", email);
    formData.append("Jumlah", jumlah);
    formData.append("TanggalPengembalian", tanggalPengembalian);
    formData.append("StatusPengembalian", "Dikembalikan");

    try {
      const response = await axios.post(
        "https://node.himpapoltekba.com/returnBarang",
        formData
      );
      if (response.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengembalikan Barang",
          showConfirmButton: false,
          timer: 1500,
        });

        const message = `Saya ${nama} ingin mengembalikan ${benda} dengan jumlah ${jumlah}. Email: ${email}, No HP: ${nomer}, Tanggal Pengembalian: ${tanggalPengembalian}. Sekian, terima kasih.`;

        handleSend(message);

        // Clear the form fields
        setNama("");
        setBenda("");
        setAlamat("");
        setNomer("");
        setEmail("");
        setJumlah("");
        setTanggalPengembalian("");
        setBuktiPengembalian(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Maaf",
          text: "Gagal Mengembalikan Barang",
        });
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
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
            Form Pengembalian
          </h2>
        </header>
        <div className="mb-5">
          <form onSubmit={handleFormSubmit}>
            <InputField
              id="name"
              label="Nama Lengkap"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama Lengkap"
            />
            <SelectField
              id="item"
              label="Nama Barang"
              options={records}
              value={benda}
              onChange={(e) => setBenda(e.target.value)}
            />
            <InputField
              id="alamat"
              label="Alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Alamat"
            />
            <InputField
              id="nohp"
              label="NO HP"
              value={nomer}
              onChange={(e) => setNomer(e.target.value)}
              placeholder="NO HP"
            />
            <InputField
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <InputField
              id="amount"
              label="Jumlah Barang"
              type="number"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
              placeholder="Jumlah yang dikembalikan"
              min={0}
            />
            <InputField
              id="proof"
              label="Bukti Pengembalian"
              type="file"
              onChange={handleFileChange}
            />
            <InputField
              id="returnDate"
              label="Tanggal Pengembalian"
              type="date"
              value={tanggalPengembalian}
              onChange={(e) => setTanggalPengembalian(e.target.value)}
            />
            <InputField
              id="returnStatus"
              label="Status Pengembalian"
              value="Dikembalikan"
              readOnly
            />
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Ajukan Pengembalian
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPengembalian;
