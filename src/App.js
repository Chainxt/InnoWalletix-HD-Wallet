
import './App.css';
import GenerateWallet from "../src/components/wallet";
import Home from "../src/components/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, redirect, Navigate } from "react-router-dom";
import { useState , useEffect} from 'react'

function App() {
  const [isPasscodeEntered, setIsPasscodeEntered] = useState(false);
  return (
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/wallet" element={<GenerateWallet isPasscodeEntered={isPasscodeEntered} setIsPasscodeEntered={setIsPasscodeEntered}/>}/>
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
  );
}

export default App;
