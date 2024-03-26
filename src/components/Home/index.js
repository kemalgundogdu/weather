import React from "react";
import logo from "../../images/logo.png";
import Search from "../Search";

function Home() {
  return (
    <div>
      <div className="w-full flex items-center justify-center py-10">
        <a href="/">
          <img src={logo} alt="weather" />
        </a>
      </div>
      <div className="mt-40">
        <Search />
      </div>
    </div>
  );
}

export default Home;
