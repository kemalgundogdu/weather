import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

// Hava durumu ikonları
import clearDay from "../../images/icons/Weather=Clear, Moment=Day.png";
import cloudyDay from "../../images/icons/Weather=Cloudy, Moment=Day.png";
import fewCloudsDay from "../../images/icons/Weather=Few clouds, Moment=Day.png";
import rainDay from "../../images/icons/Weather=Rain, Moment=Day.png";
import stormDay from "../../images/icons/Weather=Storm, Moment=Day.png";

const apiKey = process.env.REACT_APP_API_KEY;

function Week({ city }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    ).then((res) => {
      const dailyData = res.data.list.reduce((acc, item) => {
        const date = new Date(item.dt_txt);
        const day = date.getDate();

        if (!acc[day]) {
          acc[day] = {
            temp_max: item.main.temp,
            temp_min: item.main.temp,
            dt: item.dt,
            weather: item.weather[0].main,
          };
        } else {
          acc[day].temp_max = Math.max(acc[day].temp_max, item.main.temp);
          acc[day].temp_min = Math.min(acc[day].temp_min, item.main.temp);
        }

        return acc;
      }, {});

      const dailyList = Object.values(dailyData).sort((a, b) => a.dt - b.dt);

      setList(dailyList.slice(0, 5));
    });
  }, [city]);

  const dynamicIcon = useCallback((e) => {
    switch (e) {
      case "Clear":
        return clearDay;
      case "Clouds":
        return cloudyDay;
      case "Rain":
        return rainDay;
      case "Few clouds":
        return fewCloudsDay;
      case "Snow":
        return rainDay;
      case "Storm":
        return stormDay;
      default:
        return clearDay;
    }
  }, []);

  const getDayOfWeek = (unixTimestamp) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(unixTimestamp * 1000);
    const dayOfWeek = days[date.getDay()];
    return dayOfWeek;
  };

  return (
    <div className="w-full max-w-[359px] mt-2 p-3 rounded-lg bg-[#16161F]">
      <div className="flex items-center justify-center gap-0">
        {list.map((item, i) => (
          <div
            key={i}
            className="w-[67px] flex flex-col items-center justify-center"
          >
            <h3 className="text-[#BFBFD4] font-Nunito mt-[14px] mx-[19px] font-bold text-sm">
              {getDayOfWeek(item.dt)}
            </h3>
            <img
              src={dynamicIcon(item.weather)}
              className="w-[56px] h-[56px] mx-[5.5px my-1]"
              alt="Weather Icon"
            />
            <span className="block font-Nunito text-sm font-bold text-[#FAFAFA] leading-[19.6px]">
              {Math.trunc(item.temp_max)}ºc
            </span>
            <span className="block font-Nunito text-sm font-bold text-[#7F7F98] leading-[19.6px]">
              {Math.trunc(item.temp_min)}ºc
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Week;
