
import './App.css';
import GenerateWallet from "../src/components/wallet";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'

function App() {
  const [isPasscodeEntered, setIsPasscodeEntered] = useState(false);
  return (
    <div>
      <GenerateWallet isPasscodeEntered={isPasscodeEntered} setIsPasscodeEntered={setIsPasscodeEntered}/>
    </div>
  );
}

export default App;
