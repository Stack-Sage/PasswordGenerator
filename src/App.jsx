import { useState, useCallback, useRef} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Footer from "./components/Footer";
import { useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);

  const [numbers, setNumbers] = useState(false);

  const [char, setChar] = useState(false);

  const [password, setPassword] = useState("");
  
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) str += "0123456789";
    if (char) str += "!@#$%^&*";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbers, char, setPassword]);

  useEffect(() => {
    passwordGenerator()

  }, [length, numbers,char,passwordGenerator])
  
const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select();

  window.navigator.clipboard.writeText(password)
  


},[password])



  return (
    <>

      <div 
        className=" h-screen  w-screen bg-gradient-to-r from-black
   via-blue-950 to-blue-900 py-10 text-center overflow-hidden"
      >
        <h1 className="text-center text-4xl font-semibold  text-yellow-400 shadow-md hover:shadow-lg hover:shadow-yellow-400 shadow-yellow-500 w-fit mx-auto rounded-2xl p-2 cursor-pointer hover:scale-105 transition-transform  ">
          {" "}
          Password Generator{" "}
        </h1>

        <div className=" mt-40 mx-auto w-fit gap-6 border-transparent hover:shadow-lg shadow-md shadow-yellow-500 transition-transform hover:scale-105 hover:shadow-yellow-400 rounded-md border-2 h-[30vh] lg:p-10 p-6  ">
          <input
            type="text"
            value={password}
            className=" outline-none text-center placeholder:text-yellow-400 text-yellow-400 text-xl shadow-md shadow-yellow-300  rounded-lg bg-blue-950  border-none w-50 h-10 hover:scale-105 "
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button
          onClick={copyPasswordToClipboard}
          
          className=" text-center p-1 text-2xl font-semibold  text-yellow-400  shadow-md shadow-yellow-300 w-fit mx-auto rounded-xl ml-4  cursor-pointer hover:scale-105 transition-transform  ">
            Copy
          </button>

          <div className=" p-8 items-center flex justify-center">
            <label className="  text-yellow-400 text-lg p-2 ">
              Length : {length}{" "}
            </label>

            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>

          <div className="flex text-xl  items-center justify-center gap-4 ">
            <div>
              <label className="  text-yellow-400  p-2 ">Numbers </label>
              <input
                type="checkbox"
                defaultChecked={numbers}
                id="numberInput"
                className="h-4 w-4  "
                onChange={() => {
                  setNumbers((prev) => !prev);
                }}
              />
            </div>

            <div>
              <label className="  text-yellow-400  p-2 ">Characters </label>
              <input
                type="checkbox"
                defaultChecked={char}
                id="charInput"
                className="h-4 w-4   "
                onChange={() => {
                  setChar((prev) => !prev);
                }}
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4   mx-auto w-full " >

        <Footer/>
        </div>
       
      </div>

        
    
    </>
  );
}

export default App;
