// import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useContext } from "react";
import { DisableButtonsContext } from "../App";
import Menu1 from "../components/Menu1";
import Menu2 from "../components/Menu2";
import Menu3 from "./Menu3";
import Menu4 from "../components/Menu4";
import logo from "../../dist/images/project-logo.png";
import menu1Logo from "../../dist/images/icon-info.svg";

function Admin() {
  // const navigate = useNavigate()
  // const location = useLocation()

  const [menuModal1, setMenuDal1] = useState(false);
  const [menuModal2, setMenuDal2] = useState(false);
  const [menuModal3, setMenuDal3] = useState(true);
  const [menuModal4, setMenuDal4] = useState(false);

  // const disableButtonsFromContext = useContext(DisableButtonsContext);
  // const [disableButtons, setDisableButtons ] = useState(disableButtonsFromContext);
  const { disableButtons, setDisableButtons } = useContext(
    DisableButtonsContext
  );
  // const [disableButtons, setDisableButtons ] = useState(true);

  // console.log(disableButtons)

  //   useEffect(() => {
  //     setDisableButtons(disableButtonsFromContext);
  // }, [disableButtonsFromContext]);

  // checkActive for Outlet ----------------------------------------------------------------

  // const checkActive =(path) => {
  //   return location.pathname === path ? " bg-white text-black py-2" : "text-white py-2"
  // }
  // ----------------------------------------------------------------------------------------

  // checkActive for modal ---------------------------------------------------------------

  const checkActive = (path) => {
    switch (path) {
      case "/admin/menu1":
        return menuModal1
          ? " bg-purple-300 border-none  shadow-lg text-red-500  py-2"
          : "text-red-500 py-2   border-none rounded-full shadow-lg text-black  bg-blue-600";
      // case "/admin/menu2":
      //   return menuModal2 ? " bg-white text-black py-2" : "text-white py-2"
      case "/admin/menu3":
        return menuModal3
          ? " bg-gray-500 border-none rounded-full shadow-lg  py-2"
          : "text-white py-2   border-none rounded-full shadow-lg text-black  bg-blue-600";
      case "/admin/menu4":
        return menuModal4
          ? " bg-gray-500 border-none rounded-full shadow-lg py-2"
          : "text-white py-2   border-none rounded-full shadow-lg text-black  bg-blue-600";
      default:
        return "text-white py-2";
    }
  };
  // --------------------------------------------------------------------------------------

  const openMenu1Modal = () => {
    if (!disableButtons) {
      checkActive();
      setMenuDal1(true);
      setMenuDal2(false);
      setMenuDal3(false);
      setMenuDal4(false);
    }
  };
  // const openMenu2Modal = () => {
  //   checkActive()
  //   setMenuDal1(false)
  //   setMenuDal2(false)
  //   setMenuDal3(false)
  //   setMenuDal4(false)
  //   setMenuDal2(true)
  // }
  const openMenu3Modal = () => {
    checkActive();
    setMenuDal1(false);
    setMenuDal2(false);
    setMenuDal4(false);
    setMenuDal3(true);
  };
  const openMenu4Modal = () => {
    if (!disableButtons) {
      checkActive();
      setMenuDal1(false);
      setMenuDal2(false);
      setMenuDal3(false);
      setMenuDal4(true);
    }
  };

  return (
    <div className="flex h-screen ">
      <div className="w-1/6  flex-grow-0  justify-end  shadow-gray-600 shadow-lg    overflow-auto  ">
        <div className="flex  font-bold  text-md bg-gray-300">
          <div className="w-1/3 flex  items-center">
            <img className="w-[75%]" src={logo} alt="logo" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className=" flex ">ศาลเจ้าปึงเถ่า-กงม่า</h1>
            <h1 className=" flex ">ขอนแก่น</h1>
          </div>
        </div>
        <nav>
          <div
            // onClick={() => navigate("/admin/menu1")}
            onClick={() => openMenu1Modal()}
            className={`     flex items-center  mt-10   ${
              disableButtons ? "cursor-no-drop" : "cursor-pointer"
            }`}
          >
            {/* <span className={`w-full flex justify-center text-center text-sm font-normal  hover:text-red-800 ${checkActive("/admin/menu1")}`}>
                    สร้างหัวข้อประมูล
                  </span> */}

            <span
              className={`w-full flex border-none  hover:text-white ${checkActive(
                "/admin/menu1"
              )}`}
            >
              <img className="mx-5 flex " src={menu1Logo} />
              หัวข้อประมูล
            </span>
          </div>
          {/* <div 
                    // onClick={() => navigate("/admin/menu2")} 
                    onClick={() => openMenu2Modal()} 
                    className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex items-center  mt-5 transition-colors duration-200 justify-start cursor-pointer "
                >
                  <span className={`w-full flex justify-center text-center text-sm font-normal  hover:text-red-800 ${checkActive("/admin/menu2")}`}>
                    ของแถม
                  </span>
                </div> */}
          <div
            // onClick={() => navigate("/admin/menu3")}
            onClick={() => openMenu3Modal()}
            className=" bg-blue-800 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex items-center  mt-5 transition-colors duration-200  cursor-pointer"
          >
            <span
              className={`w-full flex justify-center text-center text-white  font-normal  hover:text-white ${checkActive(
                "/admin/menu3"
              )}`}
            >
              เริ่มการประมูล
            </span>
          </div>

          <div
            // onClick={() => navigate("/admin/menu4")}
            onClick={() => openMenu4Modal()}
            className={`text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex items-center  mt-5 transition-colors duration-200 justify-start  ${
              disableButtons ? "cursor-no-drop" : "cursor-pointer"
            }`}
          >
            <span
              className={`w-full flex justify-center text-white text-center font-normal  hover:text-white ${checkActive(
                "/admin/menu4"
              )}`}
            >
              รายงาน
            </span>
          </div>
          {/* Add more menus as needed */}
        </nav>
      </div>
      <div className=" flex-grow overflow-auto ">
        {/* outlet-------------------------------------------- */}
        {/* <Outlet/> */}

        {/* modal---------------------------------------------- */}
        {menuModal1 && <Menu1 />}
        {menuModal2 && <Menu2 />}
        {menuModal3 && <Menu3 />}
        {menuModal4 && <Menu4 />}
      </div>
    </div>
  );
}

export default Admin;
