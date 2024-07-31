import React, { useState } from "react";

function Banner() {
  const [bannerOpen, setBannerOpen] = useState(true);

  return (
    <>
      {bannerOpen && (
        <div className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-50">
          <div className="bg-blue-800 border border-transparent dark:border-blue-700 text-white text-sm p-3 md:rounded shadow-lg flex justify-between">
            <div className="text-white inline-flex">
              <p className="font-medium">
                Update terbaru: Kami telah menambahkan fitur baru yang
                mempermudah pengalaman Anda.
              </p>
            </div>
            <button
              className="text-white hover:text-gray-300 pl-2 ml-3 border-l border-blue-700"
              onClick={() => setBannerOpen(false)}
            >
              <span className="sr-only">Tutup</span>
              <svg
                className="w-4 h-4 shrink-0 fill-current"
                viewBox="0 0 16 16"
              >
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
