import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  name,
  options, // Add options for select
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
    >
      {label}
    </label>
    {type === "select" ? (
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm dark:bg-gray-900 dark:text-gray-200"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        placeholder={placeholder}
        className="mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm dark:bg-gray-900 dark:text-gray-200"
      />
    )}
  </div>
);

function FormEditBarang() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [record, setRecord] = useState({
    Nama: "",
    Kode: "",
    Jumlah: "",
    Kondisi: "",
  });
  const [loading, setLoading] = useState(true);
  const kondisiOptions = ["Bagus", "Rusak", "Perlu Diperbaiki"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://node.himpapoltekba.com/BendaId/${id}`
        );
        if (res.data && res.data.data) {
          setRecord(res.data.data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No data found.",
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://node.himpapoltekba.com/updateBenda/${id}`,
        record
      );
      if (res.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Successfully updated the item.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/Kelola");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update the item.",
        });
      }
    } catch (err) {
      console.error("Error updating data:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update the item.",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `https://node.himpapoltekba.com/deleteBenda/${id}`
      );
      if (res.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Successfully deleted the item.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/Kelola");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete the item.",
        });
      }
    } catch (err) {
      console.error("Error deleting data:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete the item.",
      });
    }
  };

  const handleDetail = () => {
    navigate(`/Detail/${id}`);
  };

  const handleBack = () => {
    navigate("/kelola");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col col-span-full sm:col-span-16 xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Edit Barang
          </h2>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Kembali
          </button>
        </header>
        <div className="mb-5">
          <form onSubmit={handleFormSubmit}>
            <InputField
              id="nama"
              label="Nama Barang"
              name="Nama"
              type="text"
              value={record.Nama}
              onChange={handleInputChange}
              placeholder="Nama Barang"
            />
            <InputField
              id="kode"
              label="Kode Barang"
              name="Kode"
              type="text"
              value={record.Kode}
              onChange={handleInputChange}
              placeholder="Kode Barang"
            />
            <InputField
              id="jumlah"
              label="Jumlah Barang"
              name="Jumlah"
              type="number"
              value={record.Jumlah}
              onChange={handleInputChange}
              placeholder="Jumlah Barang"
              min={0}
            />
            <InputField
              id="kondisi"
              label="Kondisi Barang"
              name="Kondisi"
              type="select"
              value={record.Kondisi}
              onChange={handleInputChange}
              options={kondisiOptions}
            />
            <div className="w-full flex justify-around mt-8">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDetail}
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                QR Code
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormEditBarang;
