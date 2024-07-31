/* eslint-disable no-unused-vars */
import logo from "../img/logo.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Home() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/Registrasi");
  };
  const handleLogin = () => {
    console.log(Username, Password);

    axios
      .post("https://node.himpapoltekba.com/getUser", {
        Username,
        Password,
      })
      .then((res) => {
        console.log(Username, Password);
        console.log(res.data.code);
        if (res.data.code === 200) {
          // setRecords(res.data.data);
          console.log("oke");
          // const Role = res.data.data[0].role;
          console.log(res.data.data);
          Swal.fire({
            icon: "success",
            title: "Berhasil Menemukan User",
            showConfirmButton: false,
            timer: 1500,
          });
          if (Username == "admin" && Password == "admin123") {
            navigate("/Dashboard-Admin");
          } else {
            navigate("/Dashboard-User");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Maaf",
            text: "Gagal Menemukan User",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Maaf",
          text: "Gagal Menemukan User",
        });
        console.log(err);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#4C4C4C]">
      <div className="bg-[#0A0A14] p-8 rounded-lg shadow-lg w-96 md:w-1/2 md:p-12">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="h-20 w-20" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-4">
            <div className=" col-span-1">
              <button
                onClick={handleLogin}
                type="button"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mt-4"
              >
                Login
              </button>
            </div>
            <div className="col-span-1">
              <button
                onClick={handleRegister}
                type="button"
                className="w-full bg-gray-300 text-gray-800 py-2 md:mt-4  rounded-lg hover:bg-gray-400 "
              >
                Registrasi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
