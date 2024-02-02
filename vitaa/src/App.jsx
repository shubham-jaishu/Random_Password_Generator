import { useState, useCallback, useEffect, useRef } from "react";
import backgroundImage from "../src/img/img1.jpg";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 21);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div style={{ backgroundImage: `url(${backgroundImage})` }} className="absolute w-full h-screen bg-cover hover:bg-fixed overflow-hidden backdrop-blur-lg">
        <div className="relative z-10 w-full max-w-xl mx-auto shadow-md rounded-lg items-center px-4 py-7 my-60 bg-gradient-to-r from-gray-600	to-black">
          <h1 className="text-white text-center my-1 items-center text-2xl ">
            Password Genenerator
          </h1>

          <div className="flex shadow rounded-lg overflow-hidden mb-2 h-9 text-xl">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-3 px-3"
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="outline-none bg-blue-600 text-white px-3 shrink-0 hover:bg-green-600"
              onClick={copyToClipboard}
            >
              Copy
            </button>
          </div>

          <div className="flex gap-9 justify-center items-center text-white">
            <div className="flex text-xl py-1">
              <input
                type="range"
                min={6}
                max={15}
                value={length}
                className="cursor-pointer py-1.9"
                onChange={(sattu) => {
                  setlength(sattu.target.value);
                }}
              />
              <label>Length: {length}</label>
            </div>

            <div className="flex items-center gap-x-1 text-xl">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>

            <div className="flex items-center gap-x-1 text-xl">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
