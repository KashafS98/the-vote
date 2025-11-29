import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Waiting from "./pages/waiting";
import Game from "./pages/game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* 👈 Renders at /app/ */}
        <Route path="/waiting" element={<Waiting />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
