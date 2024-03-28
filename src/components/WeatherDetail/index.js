import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import List from "./list";
import Week from "./week";

import { CaretLeft } from "@phosphor-icons/react";

import clearDay from "../../images/icons/Weather=Clear, Moment=Day.png";
import clearNight from "../../images/icons/Weather=Clear, Moment=Night.png";
import cloudyDay from "../../images/icons/Weather=Cloudy, Moment=Day.png";
import cloudyNight from "../../images/icons/Weather=Cloudy, Moment=Night.png";
import fewCloudsDay from "../../images/icons/Weather=Few clouds, Moment=Day.png";
import fewCloudsNight from "../../images/icons/Weather=Few clouds, Moment=Night.png";
import rainDay from "../../images/icons/Weather=Rain, Moment=Day.png";
import rainNight from "../../images/icons/Weather=Rain, Moment=Night.png";
import stormDay from "../../images/icons/Weather=Storm, Moment=Day.png";
import stormNight from "../../images/icons/Weather=Storm, Moment=Night.png";

const apiKey = process.env.REACT_APP_API_KEY;

function WeatherDetail() {
  const { lat, lon } = useParams();

  const [loading, setLoading] = useState(true);

  const [errorStatus, setErrorStatus] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const [data, setData] = useState([]);
  const [weather, setWeather] = useState({});
  const [main, setMain] = useState({});
  const [wind, setWind] = useState(0);
  const [rain, setRain] = useState(0);
  const [uv, setUv] = useState(0);

  const [coord, setCoord] = useState([]);

  const [hours, setHours] = useState("");
  const [hava, setHava] = useState("");

  const [icon, setIcon] = useState("");
  const [background, setBackground] = useState("");

  useEffect(() => {
    // İsimdeki boşlukları kontrol edelim ve ilk kelimeyi alalım
    // const cityNameArray = cityName.split(" ");
    // const city = cityNameArray[0];

    const d = new Date();
    const h = d.getHours();
    h < 7 || h > 18 ? setHours("Night") : setHours("Day");

    axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
      .then((res) => {
        setData(res.data);
        setWeather(res.data.weather[0]);
        setMain(res.data.main);
        setWind(res.data.wind.speed);
        setCoord(res.data.coord);
      })
      .catch((error) => {
        setErrorMessage(error.response.statusText);
        setErrorStatus(error.response.status);
      })
      .finally(() => setLoading(false));
  }, [lat, lon]);

  const dynamicIcon = useCallback(() => {
    if (hours === "Day" && hava === "Clear") {
      setIcon(clearDay);
      setBackground("bg-clearDay");
    }
    if (hours === "Night" && hava === "Clear") {
      setIcon(clearNight);
      setBackground("bg-clearNight");
    }

    if (hours === "Day" && hava === "Cloudy") {
      setIcon(cloudyDay);
      setBackground("bg-cloudyDay");
    }
    if (hours === "Night" && hava === "Cloudy") {
      setIcon(cloudyNight);
      setBackground("bg-cloudyNight");
    }

    if (hours === "Day" && hava === "Few clouds") {
      setIcon(fewCloudsDay);
      setBackground("bg-fewCloudsDay");
    }
    if (hours === "Night" && hava === "Few clouds") {
      setIcon(fewCloudsNight);
      setBackground("bg-fewCloudsNight");
    }

    if (hours === "Day" && hava === "Clouds") {
      setIcon(fewCloudsDay);
      setBackground("bg-fewCloudsDay");
    }
    if (hours === "Night" && hava === "Clouds") {
      setIcon(fewCloudsNight);
      setBackground("bg-fewCloudsNight");
    }

    if (hours === "Day" && hava === "Rain") {
      setIcon(rainDay);
      setBackground("bg-rainDay");
    }
    if (hours === "Night" && hava === "Rain") {
      setIcon(rainNight);
      setBackground("bg-rainNight");
    }

    if (hours === "Day" && hava === "Snow") {
      setIcon(rainDay);
      setBackground("bg-rainDay");
    }
    if (hours === "Night" && hava === "Snow") {
      setIcon(rainNight);
      setBackground("bg-rainNight");
    }

    if (hours === "Day" && hava === "Storm") {
      setIcon(stormDay);
      setBackground("bg-stormDay");
    }
    if (hours === "Night" && hava === "Storm") {
      setIcon(stormNight);
      setBackground("bg-stormNight");
    }
  }, [hava, hours]);

  const getFormattedDate = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const today = new Date();
    const dayOfWeek = days[today.getDay()];
    const month = months[today.getMonth()];
    const dayOfMonth = today.getDate();
    const year = today.getFullYear();

    return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
  };

  useEffect(() => {
    dynamicIcon();
    setRain(0);
    data.rain && data.rain["1h"] && setRain(data.rain["1h"] * 100);
    data.rain && data.rain["3h"] && setRain(data.rain["3h"] * 100);
  }, [hava, hours, data.rain, dynamicIcon]);

  useEffect(() => {
    setHava(weather.main);
  }, [weather]);

  useEffect(() => {
    if (coord.lat !== undefined && coord.lon !== undefined) {
      axios(
        `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${coord.lat}&lon=${coord.lon}`
      ).then((uvRes) => setUv(uvRes.data.value));
    }
  }, [coord]);

  return (
    <div className="w-full flex flex-col justify-center items-center text-white p-2">
      {loading && <div className="w-full h-screen flex items-center justify-center text-gray-300 text-xs">Loading...</div>}
      {errorStatus && (
        <div className="w-full max-w-[359px] h-screen flex flex-col items-center justify-center">
          <div className="flex w-full justify-start items-center m-1 font-medium py-1 px-2 rounded-md text-red-500 bg-red-50 border border-red-200 ">
            <div slot="avatar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-info w-5 h-5 mx-2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div className="text-xl font-normal  max-w-full flex-initial">
              <div className="py-2">
                {errorMessage} ({errorStatus})
                <div className="text-sm font-base">
                  You should go back and try again. <br />
                </div>
              </div>
            </div>
          </div>
          <Link
            className="p-3 w-full text-[#7692C9] flex items-center gap-2 mt-1"
            to="/"
          >
            <CaretLeft /> Go Back
          </Link>
        </div>
      )}
      {!loading && !errorStatus && (
        <div>
          <div className="w-full max-w-[359px] p-3 rounded-lg bg-[#16161F] mb-2">
            <div className={`w-full h-[328px] rounded-lg ${background}`}>
              <div className="w-full h-full flex flex-col items-start justify-between">
                <div className="flex flex-col font-Nunito p-5">
                  <h1 className="font-bold text-base leading-6">{data.name}</h1>
                  <span className="text-xs font-normal leading-4">
                    {getFormattedDate()}
                  </span>
                </div>
                <div className="w-full flex items-end justify-between">
                  <div className="m-4">
                    <div className="font-extrabold text-5xl font-Nunito mb-2">
                      {Math.trunc(main.temp)}ºc
                    </div>
                    <div className="font-bold text-base font-Nunito">
                      {Math.trunc(main.temp_min)}ºc /{" "}
                      {Math.trunc(main.temp_max)}ºc
                    </div>
                    <div className="font-normal text-sm font-Nunito">
                      {weather.main}
                    </div>
                  </div>
                  {hava !== undefined && icon !== undefined && (
                    <div>
                      <img
                        src={icon}
                        className="w-[160px] h-[160px]"
                        alt={hava + " " + hours}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <List main={main} wind={wind} rain={rain} uv={uv} />
          <Week lat={lat} lon={lon} dynamicIcon={dynamicIcon} />
        </div>
      )}
    </div>
  );
}

export default WeatherDetail;
