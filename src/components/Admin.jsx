// import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useContext } from "react";
import { DisableButtonsContext } from "../App";
import Menu1 from "../components/Menu1";
import Menu2 from "../components/Menu2";
import Menu3 from "./Menu3";
import Menu4 from "../components/Menu4";
import logo from "../../public/images/project-logo.png";
import menu1Logo from "../../public/images/icon-info.svg";
import menu3Logo from "../../public/images/icon-monitor.svg";
import menu4Logo from "../../public/images/icon-list.svg";



function Admin() {
  const [menuModal1, setMenuDal1] = useState(false);
  const [menuModal2, setMenuDal2] = useState(false);
  const [menuModal3, setMenuDal3] = useState(true);
  const [menuModal4, setMenuDal4] = useState(false);

  const { disableButtons } = useContext(DisableButtonsContext);

  const checkActive = (path) => {
    switch (path) {
      case "/admin/menu1":
        return menuModal1
          ? " bg-purple-300 border-none  shadow-lg text-red-500   py-2"
          : "  bg-white border-none  shadow-lg shadow-white    py-2  ";
      // case "/admin/menu2":
      //   return menuModal2 ? " bg-white text-black py-2" : "text-white py-2"
      case "/admin/menu3":
        return menuModal3
          ? " bg-purple-300 border-none  shadow-lg text-red-500  py-2 "
          : " bg-white border-none  shadow-lg shadow-white    py-2 ";
      case "/admin/menu4":
        return menuModal4
          ? " bg-purple-300 border-none font-bold shadow-lg text-red-500  py-2"
          : " bg-white border-none  shadow-lg shadow-white    py-2 ";
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
      <div className="w-[30%] md:w-[300px] lg:w-[220px]    flex flex-col   shadow-gray-600 shadow-lg    ">
        <div className="flex flex-col md:flex-row justify-center md:justify-around align-middle items-center text-center  font-bold p-2  bg-gray-200">
          <div className=" w-[70%] sm:w-1/3 md:w-[25%] lg:w-[30%] flex justify-start md:justify-center text-center align-middle  items-center py-1">
            <img className="flex bg-cover w-4/5"   src={logo} alt="logo" />
          </div>
          <div className=" sm:flex-col hidden sm:flex justify-center items-center m-auto  text-center">
            <h1 className=" flex justify-center text-sm  ">ศาลเจ้าปึงเถ่า-กงม่า </h1>
            <h1 className=" flex  text-sm">ขอนแก่น</h1>
          </div>
        </div>
        <nav>
          <div
            onClick={() => openMenu1Modal()}
            className={`flex flex-col md:flex-row justify-center sm:justify-start text-center items-center  mt-10   ${
              disableButtons ? "cursor-no-drop" : "cursor-pointer"
            }${checkActive("/admin/menu1")}`}
          >
            <div>
              <img className="flex sm:mx-5 mb-5 md:mb-0 md:py-2 text-center  items-center justify-center " src={menu1Logo} />
            </div>
            <div >หัวข้อประมูล</div>
          </div>
          <div
            onClick={() => openMenu3Modal()}
            className={`  flex flex-col md:flex-row justify-center sm:justify-start text-center  items-center mt-2   ${
              disableButtons ? "cursor-no-drop" : "cursor-pointer"
            }${checkActive("/admin/menu3")}`}
          >
            <div>
              <img className="sm:mx-5 mb-3 md:mb-0 md:py-2 text-center  " src={menu3Logo} />
            </div>
            <div>เริ่มการประมูล</div>
          </div>

          <div
            onClick={() => openMenu4Modal()}
            className={` flex flex-col md:flex-row justify-center sm:justify-start text-center  items-center  mt-2  ${
              disableButtons ? "cursor-no-drop" : "cursor-pointer"
            }${checkActive("/admin/menu4")}`}
          >
            <div>
              <img className="sm:mx-5  mb-3 md:mb-0 md:py-2 text-center  " src={menu4Logo} />
            </div>
            <div>รายงาน</div>
          </div>
          {/* Add more menus as needed */}
        </nav>
      </div>
      <div className="w-[70%] sm:w-[70%] md:w-[70%] lg:w-[85%] ">
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
