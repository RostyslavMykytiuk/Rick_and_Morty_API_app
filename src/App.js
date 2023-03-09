import { Routes, Route } from "react-router-dom";
import HeroDetails from "./components/HeroDetails/HeroDetails";
import HeroesList from "./components/HeroesList/HeroesList";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HeroesList/>}/>
        <Route path="/:id" element={<HeroDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
