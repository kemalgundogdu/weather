import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import List from "./list";

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

function WeatherDetail() {
  const apiKey = process.env.REACT_APP_API_KEY;
  let { name } = useParams();

  const [data, setData] = useState([]);
  const [weather, setWeather] = useState({});
  const [main, setMain] = useState({});
  const [wind, setWind] = useState();
  const [rain, setRain] = useState();

  const [hours, setHours] = useState("");

  const [hava, setHava] = useState("");

  const [icon, setIcon] = useState("");
  const [background, setBackground] = useState("");

  const dynamicIcon = () => {
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
  };

  useEffect(() => {
    // isimde boşluk varsa şehrin ilk kelimesini alarak sorgu yapıyoruz
    // ikinci kelime 'Merkez' olabiliyor bu durumda sorgu da boşluk karakteri olduğu için response dönmüyor
    name = name.split(" ");
    name = name[0];

    const d = new Date();
    const h = d.getHours();
    h < 7 || h > 18 ? setHours("Night") : setHours("Day");

    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`
    ).then((res) => {
      setData(res.data);
      setWeather(res.data.weather[0]);
      setMain(res.data.main);
      setWind(res.data.wind.speed);
    });
  }, []);

  useEffect(() => {
    dynamicIcon();
    setRain(0)
    data.rain && setRain(data.rain["1h"] * 100);
  }, [hava, hours]);

  useEffect(() => {
    setHava(weather.main);
    console.log(data);
  }, [weather]);

  return (
    <div className="w-full flex flex-col justify-center text-white">
      <div className="w-full max-w-[500px] p-3 rounded-lg bg-[#16161F] mb-2">
        <div className={`w-full h-[355px] rounded-lg ${background}`}>
          <div className="w-full h-full flex flex-col items-start justify-between p-5">
            <div className="flex flex-col font-Nunito">
              <h1 className="font-bold text-base leading-6">{data.name}</h1>
              <span className="text-xs font-normal leading-4">
                Monday, May 15, 2023
              </span>
            </div>
            <div className="w-full flex items-center -mb-5 justify-between">
              <div>
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
              <div>
                <img
                  src={icon}
                  className="w-[160px] h-[160px]"
                  alt={hava + " " + hours}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[500px] p-3 rounded-lg bg-[#16161F]">
        <List main={main} wind={wind} rain={rain} />
      </div>
    </div>
  );
}

export default WeatherDetail;
