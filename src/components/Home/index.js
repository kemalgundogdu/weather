import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import Search from "../Search";

import { Link } from "react-router-dom";

function Home() {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, []);

  return (
    <div className="p-8 w-full h-full bg-[url('images/background.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="w-full flex items-center justify-center">
        <Link to="/">
          <img src={logo} alt="weather" />
        </Link>
      </div>
      <div className="mt-[192px]">
        <Search />
      </div>
      {lat !== undefined && lon !== undefined && (
        <div className="w-full mt-3">
          <Link
            className="text-[#7692C9] text-xs flex w-full justify-center items-center gap-2"
            to={`${lat}/${lon}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c97676] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c97676]"></span>
            </span>
            <span>Current Location</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
