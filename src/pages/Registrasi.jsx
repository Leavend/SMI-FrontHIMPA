/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Registrasi() {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Nomer, setNomer] = useState("");
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };

  const onClick2 = () => {
    console.log(Username, Email, Password, Nomer);

    axios
      .post("https://node.himpapoltekba.com/createUsers", {
        Username,
        Email,
        Password,
        Nomer,
      })
      .then((res) => {
        console.log(Username, Email, Password, Nomer);
        console.log(res.data.data);
        if (res.data.code === 200) {
          // setRecords(res.data.data);
          console.log("oke");
          Swal.fire({
            icon: "success",
            title: "Berhasil Menambahkan User",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Maaf",
            text: "Gagal Menambahkan User",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Maaf",
          text: "Gagal Menambahkan User",
        });
        console.log(err);
      });
    // navigate("/Dashboard");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-[#4C4C4C] p-8 rounded-lg shadow-lg w-96 md:w-1/2">
        <div className="flex justify-center mb-4">
          <div className=" rounded-full h-20 w-20 flex items-center justify-center">
            <MdOutlineAccountCircle className="text-8xl" />
          </div>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="username">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              className="w-full px-3 py-2 text-gray-900 rounded-lg"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full px-3 py-2 text-gray-900 rounded-lg"
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="phone">
              No HP
            </label>
            <input
              onChange={(e) => setNomer(e.target.value)}
              type="text"
              id="phone"
              className="w-full px-3 py-2 text-gray-900 rounded-lg"
              placeholder="No HP"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full px-3 py-2 text-gray-900 rounded-lg"
              placeholder="Email"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-4">
            <div className=" col-span-1">
              <button
                onClick={onClick2}
                type="button"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mt-4"
              >
                Registrasi
              </button>
            </div>
            <div className="col-span-1">
              <button
                onClick={onClick}
                type="button"
                className="w-full bg-gray-300 text-gray-800 py-2 md:mt-4  rounded-lg hover:bg-gray-400 "
              >
                Batal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registrasi;
