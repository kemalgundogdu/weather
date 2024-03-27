import React from "react";
import logo from "../../images/logo.png";
import Search from "../Search";

function Home() {
  return (
    <div className="p-8 w-full h-full bg-[url('images/background.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="w-full flex items-center justify-center">
        <a href="/">
          <img src={logo} alt="weather" />
        </a>
      </div>
      <div className="mt-[192px]">
        <Search />
      </div>
    </div>
  );
}

export default Home;
