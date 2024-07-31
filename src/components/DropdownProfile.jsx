import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function DropdownProfile() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        dropdownOpen &&
        !trigger.current.contains(target) &&
        !dropdown.current.contains(target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    const keyHandler = ({ key }) => {
      if (key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, []);

  const handleSignOut = () => {
    Swal.fire({
      title: "Apakah anda yakin untuk keluar?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Berhasil keluar!", "", "success").then(() => {
          navigate("/");
        });
      }
    });
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="flex items-center truncate">
          <button
            onClick={handleSignOut}
            className="w-full text-left block px-4 py-2 text-sm text-green-700 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-700"
          >
            Sign Out
          </button>
        </div>
      </button>
    </div>
  );
}

export default DropdownProfile;
