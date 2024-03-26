import React from "react";
import {
  ThermometerSimple,
  CloudRain,
  Wind,
  Drop,
  SunDim,
} from "@phosphor-icons/react";

function List({ main, wind, rain }) {
  return (
    <div>
      <div className="flex items-center justify-between h-[56px] border-b-[1px] border-b-[#1C1C27] gap-3">
        <div>
          <ThermometerSimple size={24} fill="#3B3B54" />
        </div>
        <div className="w-full font-Nunito font-bold text-sm text-[#BFBFD4]">
          Thermal sensation
        </div>
        <div className="font-Nunito font-bold text-base text-[#FAFAFA]">
          {Math.trunc(main.feels_like)}ºc
        </div>
      </div>
      <div className="flex items-center justify-between h-[56px] border-b-[1px] border-b-[#1C1C27] gap-3">
        <div>
          <CloudRain size={24} fill="#3B3B54" />
        </div>
        <div className="w-full font-Nunito font-bold text-sm text-[#BFBFD4]">
          Probability of rain
        </div>
        <div className="font-Nunito font-bold text-base text-[#FAFAFA]">{Math.trunc(rain)}%</div>
      </div>
      <div className="flex items-center justify-between h-[56px] border-b-[1px] border-b-[#1C1C27] gap-3">
        <div>
          <Wind size={24} fill="#3B3B54" />
        </div>
        <div className="w-full font-Nunito font-bold text-sm text-[#BFBFD4]">
          Wind speed
        </div>
        <div className="font-Nunito font-bold text-base text-[#FAFAFA] whitespace-nowrap">
          {Math.trunc(wind)} km/h
        </div>
      </div>
      <div className="flex items-center justify-between h-[56px] border-b-[1px] border-b-[#1C1C27] gap-3">
        <div>
          <Drop size={24} fill="#3B3B54" />
        </div>
        <div className="w-full font-Nunito font-bold text-sm text-[#BFBFD4]">
          Air humidity
        </div>
        <div className="font-Nunito font-bold text-base text-[#FAFAFA]">
          {main.humidity}%
        </div>
      </div>
      <div className="flex items-center justify-between h-[56px] border-b-[1px] border-b-[#1C1C27] gap-3">
        <div>
          <SunDim size={24} fill="#3B3B54" />
        </div>
        <div className="w-full font-Nunito font-bold text-sm text-[#BFBFD4]">
          UV Index
        </div>
        <div className="font-Nunito font-bold text-base text-[#FAFAFA]">5</div>
      </div>
    </div>
  );
}

export default List;
