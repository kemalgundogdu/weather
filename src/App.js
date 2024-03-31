import Home from "./components/Home";
import Saved from "./components/Saved";
import WeatherDetail from "./components/WeatherDetail";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="w-full h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          <Route path=":lat/:lon" element={<WeatherDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
