import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";

import { TrashSimple } from "@phosphor-icons/react";

function Saved() {
  const [city, setCity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allCities = [];
    for (let i = 0; i < localStorage.length; i++) {
      const city = JSON.parse(localStorage.getItem(localStorage.key(i)));
      allCities.push(city);
    }
    setCity(allCities);

    if (allCities.length === 0) {
      navigate("/");
    }
  }, [navigate]);

  const trashCity = (cityToRemove) => {
    localStorage.removeItem(JSON.stringify(cityToRemove));
    setCity(city.filter((cityItem) => cityItem !== cityToRemove));
  };

  return (
    <div className="p-3 w-full flex justify-start flex-col items-center h-full bg-[url('images/background.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="w-full flex items-center justify-center mt-5 mb-10">
        <Link to="/">
          <img src={logo} alt="weather" />
        </Link>
      </div>
      <div className="w-full max-w-[359px] rounded-lg bg-[#16161F] p-3 text-center mb-2">
        <h1 className="text-zinc-300">Saved Locations</h1>
        <p className="text-zinc-500 text-xs leading-4 mt-1">
          It is used for quick access. You can remove any location you want.
        </p>
      </div>
      {city.length === 0 ? (
        <div className="text-center text-yellow-700 text-xs mt-3">
          <div>
            No saved locations yet. <br /> Visit the home page to add some!{" "}
          </div>
          <Link
            to="/"
            className="mt-2 py-3 px-5 rounded-lg bg-[#1C1C27] inline-block text-zinc-300"
          >
            Go Home
          </Link>
        </div>
      ) : (
        city.map((item, i) => (
          <div
            key={i}
            className="w-full max-w-[359px] flex items-center justify-between p-3 bg-[#1C1C27] mb-1 rounded-lg"
          >
            <Link
              to={`../${item.lat}/${item.lon}`}
              className="rounded-lg text-[#BFBFD4] flex-1"
            >
              {item.name}
            </Link>
            <button className="text-[#BFBFD4]" onClick={() => trashCity(item)}>
              <TrashSimple size={18} />
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Saved;
