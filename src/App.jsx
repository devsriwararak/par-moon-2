import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Board from "./components/Board";
import Admin from "./components/Admin";
import Menu3 from "./components/Menu3"
import Menu1 from "./components/Menu1";
// import Menu2 from './components/Menu2'
import Menu4 from "./components/Menu4";

export const DisableButtonsContext = createContext();
// export const SelectedButtonContext = createContext();

function App() {
  const [disableButtons, setDisableButtons] = useState(false);
  // const [buttonValue, setButtonValue] = useState("");

  return (
    <DisableButtonsContext.Provider
      value={{ disableButtons, setDisableButtons }}
    >
      {/* <SelectedButtonContext.Provider value={{ buttonValue, setButtonValue }}> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/board" element={<Board  />} />
          
            <Route path="/admin" element={<Admin />}>

              <Route path="menu1" element={<Menu1 />} />
              <Route path="menu3" element={<Menu3 />} />
              {/* <Route path="menu2" element={<Menu2/>} /> */}
              <Route path="menu4" element={<Menu4 />} />

            </Route>
          </Routes>
        </BrowserRouter>
      {/* </SelectedButtonContext.Provider> */}
    </DisableButtonsContext.Provider>
  );
}

export default App;
