import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Search() {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [search, setSearch] = useState([]);

  const searchChange = (e) => {
    setTimeout(() => {
      if (e.target.value === "") {
        setSearch([]);
        return
      }
      axios(
        `https://api.openweathermap.org/geo/1.0/direct?q=${e.target.value}, TR&limit=3&appid=${apiKey}`
      ).then((res) => {
        if (res.data.length === 0) {
          setSearch([]);
        } else if (res.data.length === 1 && res.data.length > 2) {
          setSearch([res.data[1]]);
        } else {
          setSearch([res.data[0]]);
        }
      });
    }, 500);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full text-white px-5">
      <h1 className="text-[20px] font-bold font-Nunito">
        Welcome to <span className="text-[#8FB2F5]">TypeWeather</span>
      </h1>
      <p className="text-sm text-[#BFBFD4] font-Nunito whitespace-nowrap text-center">
        Choose a location to see the weather forecast
      </p>
      <input
        onChange={searchChange}
        className="h-[56px] max-w-[311px] w-full px-5 rounded-lg bg-[#1E1E29] placeholder:font-Nunito placeholder:text-[#7F7F98] placeholder:text-base mt-[32px] outline-none text-[#a6a6c5]"
        placeholder="Search location"
      />

      <div className="mt-2 max-w-[311px] w-full">
        {search[0] !== undefined &&
          search.map((data, i) => (
            <Link
              key={i}
              to={data.name}
              className="mb-0.5 outline-none h-[54px] w-full px-5 rounded-lg bg-[#3b3b54] font-Nunito text-base flex items-center text-[#FAFAFA]"
            >
              {data.name}, {data.country}
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Search;
