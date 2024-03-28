import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import List from "./list";
import Week from "./week";

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
  const { name: cityName } = useParams(); // "name" değişkenini "cityName" olarak yeniden adlandıralım

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
    const cityNameArray = cityName.split(" ");
    const city = cityNameArray[0];

    const d = new Date();
    const h = d.getHours();
    h < 7 || h > 18 ? setHours("Night") : setHours("Day");

    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    ).then((res) => {
      setData(res.data);
      setWeather(res.data.weather[0]);
      setMain(res.data.main);
      setWind(res.data.wind.speed);
      setCoord(res.data.coord);
    });
  }, [cityName]); 

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
                  {Math.trunc(main.temp_min)}ºc / {Math.trunc(main.temp_max)}ºc
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
      <Week city={cityName} dynamicIcon={dynamicIcon} />
    </div>
  );
}

export default WeatherDetail;
