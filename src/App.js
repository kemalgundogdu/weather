import Home from "./components/Home";
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
          <Route path=":name" element={<WeatherDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
