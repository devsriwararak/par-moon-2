import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DisableButtonsContext } from "../App";
import { AiOutlinePlusCircle, AiOutlineDelete } from "react-icons/ai";
import logout from "../../public/images/icon-logout.svg";
import { BiLogOut } from "react-icons/bi";
import { PDFViewer } from "@react-pdf/renderer";
import Certificate from "./Certificate";
import { Alert, Button } from "@material-tailwind/react";

import Modal from "react-modal";
import axios from "axios";
import "../App.css";

// naii
import io from 'socket.io-client'
let socket = io.connect("https://socket-api-1-752301fd194d.herokuapp.com/");
  // API
  import { api } from "../api/api";



Modal.setAppElement("#root");

function Menu3() {

  const navigate = useNavigate();
  const [listDataTitle, setListDataTitle] = useState([]);
  const { setDisableButtons } = useContext(DisableButtonsContext);
  const [buttonValue, setButtonValue] = useState();
  const [inputName, setInputName] = useState("");
  const [chooseCustomer, setChooseCustomer] = useState("");
  const [chooseCustomerId, setChooseCustomerId] = useState("");
  const [inputLabel, setInputLabel] = useState("0");
  const [inputGive, setInputGive] = useState("");
  const [saveGive, setSaveGive] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [giveList, setGiveList] = useState([]);
  const [showGive, setShowGive] = useState([]);
  const [selectedButton, setSelectedButton] = useState("0");
  const [selectedAuction, setSelectedAuction] = useState("");
  const [inputPrice, setInputPrice] = useState(0);
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [id_auctionstarted, setid_auctionstarted] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSmallScreen2, setIsSmallScreen2] = useState(false);
  const [isSmallScreen3, setIsSmallScreen3] = useState(true);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [modalIsOpen3, setModalIsOpen3] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [modalIsOpen4, setModalIsOpen4] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const [showAlert1, setShowAlert1] = useState(false);

  const Token = localStorage.getItem("token");

  const [editIndex, setEditIndex] = useState(null);
  const [reportData, setReportData] = useState({});


  const fetchDataTitleChoose = async () => {
    try {
      const responseTitle = await axios.get(
        `${api}/Title/Choose`,
        // "https://bankcash1.herokuapp.com/Title/Choose",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      console.log(responseTitle.data);
      setListDataTitle(responseTitle.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    fetchDataTitleChoose();

    const fetchCustomerList = async () => {
      try {
        const response = await axios.get(
          `${api}/Customer`,
          // "https://bankcash1.herokuapp.com/Customer",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        setCustomerList(response.data);
        setFilteredCustomerList(response.data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    };
    fetchCustomerList();
  }, []);

  useEffect(() => {
    if (searchText === "") {
      setFilteredCustomerList(customerList);
    } else {
      const filteredList = customerList.filter((customer) =>
        customer.customer_name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCustomerList(filteredList);
    }
  }, [searchText, customerList]);

  useEffect(() => {
    if (modalIsOpen) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [modalIsOpen]);

  useEffect(() => {
    if (modalIsOpen2) {
      setShowModal2(true);
    } else {
      setShowModal2(false);
    }
  }, [modalIsOpen2]);

  useEffect(() => {
    if (modalIsOpen3) {
      setShowModal3(true);
    } else {
      setShowModal3(false);
    }
  }, [modalIsOpen3]);

  useEffect(() => {
    if (modalIsOpen4) {
      setShowModal4(true);
    } else {
      setShowModal4(false);
    }
  }, [modalIsOpen4]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize2 = () => {
      // setIsSmallScreen2(window.innerWidth < 640);
      setIsSmallScreen2(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize2);

    return () => {
      window.removeEventListener("resize", handleResize2);
    };
  }, []);

  useEffect(() => {
    const handleResize3 = () => {
      setIsSmallScreen3(window.innerWidth < 300 || window.innerWidth > 767);
    };

    window.addEventListener("resize", handleResize3);

    return () => {
      window.removeEventListener("resize", handleResize3);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAddCustomer = async () => {
    if (inputName.trim() !== "") {
      const newCustomer = {
        // id: Date.now(),
        customer_name: inputName.trim(),
      };
      try {
        // console.log(newCustomer);
        const response = await axios.post(
          `${api}/Customer`,
          // "https://bankcash1.herokuapp.com/Customer",
          newCustomer,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );

        // console.log("ส่งข้อมูลสำเร็จ", response.data);
        setCustomerList((prevCustomerList) => [
          ...prevCustomerList,
          response.data,
        ]);
        // console.log(customerList);
        setInputName("");
        closeModal3();
        closeModal4();
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
      }
    }
  };

  const handleSelectOption = async (selectedOption) => {
    // console.log(selectedOption);
    setSelectedAuction(selectedOption);

    const dataToSend = {
      auctionstarted_auction_topic: Number(selectedOption),
      auctionstarted_status_A: "1",
      auctionstarted_status_B: "0",
    };
    try {
      const response = await axios.post(
        `${api}/Show`,
        // "https://bankcash1.herokuapp.com/Show",
        dataToSend,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      await socket.emit("display_1");
      // console.log(response.data);
      localStorage.setItem(
        "id_auctionstarted",
        response.data.id_auctionstarted
      );
      setid_auctionstarted(response.data.id_auctionstarted);
      setIsSelectDisabled(true);
      // setDisableButtons(true);
      setDisableButtons(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    const dataToSend = {
      user_auction: chooseCustomerId,
      auction_result_price: Number(inputPrice),
      auction_result_auctionstarted: id_auctionstarted,
    };
    // console.log(dataToSend);

    try {
      const response = await axios.post(
        `${api}/Show/List`,
        // "https://bankcash1.herokuapp.com/Show/List",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      await socket.emit('display_3')

      const dataToSendUpdateB = {
        status_Id: id_auctionstarted,
        status_B: "1",
      };
      try {
        const response = await axios.put(
          `${api}/Show`,
          // "https://bankcash1.herokuapp.com/Show",
          dataToSendUpdateB,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        // console.log(response.data);
        setChooseCustomer("");
        setInputPrice(0);
        setShowAlert1(true)
        setTimeout(() => {
          setShowAlert1(false);
        }, 1500); // เวลาในหน่วยมิลลิวินาที (2000 มิลลิวินาที = 2 วินาที
      } catch (error) {
        console.error(error);
      }
      // console.log("ส่งข้อมูลสำเร็จ", response.data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
    }
  };

  const handleChooseCustomer = (data) => {
    setChooseCustomer(data.customer_name);
    setChooseCustomerId(data.id);
  };

  const handleAddGive = () => {
    const existingGive = giveList.find((data) => data.id === editIndex);

    if (existingGive) {
      const updatedGiveList = giveList.map((data) =>
        data.id === existingGive.id ? { ...data, name: inputGive } : data
      );

      setGiveList(updatedGiveList);
    } else {
      const newGive = { id: giveList.length + 1, name: inputGive };
      setGiveList([...giveList, newGive]);
    }

    setInputGive("");
    setEditIndex(null);
  };

  const handleEditGive = (id) => {
    const giveToEdit = giveList.find((data) => data.id === id);
    setInputGive(giveToEdit.name);
    setEditIndex(id);
  };

  const handleDeleteGive = (id) => {
    const newGiveList = giveList.filter((data) => data.id !== id);
    setGiveList(newGiveList);
  };

  const formattedGiveList = giveList.map((data) => data.name);
  const newData = `ฉลากออมสิน จำนวน ${inputLabel} ใบ, ${formattedGiveList.join(
    ", "
  )}`;

  const handleSaveGive = async () => {
    const sendData = newData;
    // setGiveList([]);
    setSaveGive([sendData]);
    // setInputLabel("0");
    // console.log(sendData);
    try {
      const response = await axios.post(
        `${api}/AddGift`,
        // "https://bankcash1.herokuapp.com/AddGift",
        {
          show_Id: id_auctionstarted,
          gift_Name: sendData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      setShowAlert1(true);
      setTimeout(() => {
        setShowAlert1(false);
      }, 1000); // เวลาในหน่วยมิลลิวินาที (2000 มิลลิวินาที = 2 วินาที
      console.log("ส่งของแถมสำเร็จ", response.data);
      await socket.emit('display_2')
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
    }
  };

  const handleEndAuction = async () => {
    // console.log(id_auctionstarted);
    try {
      const response = await axios.delete(
        `${api}/End`,
        // "https://bankcash1.herokuapp.com/End",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
          data: {
            show_Id: id_auctionstarted,
          },
        }
      );
      console.log("ลบห้องประมูลสำเร็จ", response.data);
      await socket.emit('display_4')
      setListDataTitle([]);
      fetchDataTitleChoose();
      setIsSelectDisabled(false);
      setDisableButtons(false);
      setSaveGive([]);
      setGiveList([]);
      setInputLabel("0");
      localStorage.removeItem("id_auctionstarted");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
    }
  };

  const openModal = () => {
    if (!modalIsOpen) {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    if (modalIsOpen) {
      setModalIsOpen(false);
    }
  };

  const openModal2 = () => {
    setModalIsOpen2(true);
  };

  const closeModal2 = () => {
    if (modalIsOpen2) {
      setModalIsOpen2(false);
    }
  };
  const openModal3 = () => {
    setModalIsOpen3(true);
  };

  const closeModal3 = () => {
    if (modalIsOpen3) {
      setModalIsOpen3(false);
    }
  };
  const openModal4 = () => {
    setModalIsOpen4(true);
  };

  const closeModal4 = () => {
    if (modalIsOpen4) {
      setModalIsOpen4(false);
    }
  };

  const handleButtonValue = (e) => {
    // console.log(e);
    setButtonValue(e);

    const sendButtonValue = async () => {
      try {
        const response = await axios.post(
          `${api}/AddCount`,
          // "https://bankcash1.herokuapp.com/AddCount",
          {
            show_Id: id_auctionstarted,
            status_123: Number(e),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        await socket.emit(`number_${e}`)

        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (e != null) {
      sendButtonValue();
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      const response = await axios.get(
        `${api}/Show/Report/${id_auctionstarted}/Detail`,
        // `https://bankcash1.herokuapp.com/Show/Report/${id_auctionstarted}/Detail`,
        {
          headers: {
            Authorization: `Token ${Token}`,
            "Content-Type": "application/json",
          },
          maxBodyLength: Infinity,
        }
      );
      setReportData(response.data);
      openModal2();
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(reportData);

  return (
    <div className=" flex flex-col  bg-gray-200 h-screen m-0  ">
      {/* Header bar */}
      <div className="flex  items-center justify-between item-center text-white bg-red-400 px-5 py-[23px] sm:py-[23px] md:py-[30px] lg:py-[22px] xl:py-[23px] ">
        <div className="flex w-[15%]">
        <h1 className=" text-center lg:text-lg">เริ่มการประมูล</h1>
        </div>
        <div className="flex w-[30%] items-center align-bottom  text-end">
        {showAlert1 && (
                      <Alert
                        open={open}
                        onClose={() => setShowAlert1(false)}
                        className=" flex bg-red-50 bg-opacity-25 text-end text-green-600 font-semibold  justify-center align-middle items-center my-0 py-0  text-lg "
                        animate={{
                          mount: { y: 0 },
                          unmount: { y: 100 },
                        }}
                      >
                        \\ --- บันทึกสำเร็จ --- //
                      </Alert>
                    )}

        </div>

        <div className="flex w-[10%] items-center justify-center text-center">
          <button
            onClick={handleLogout}
            className="flex justify-center  text-center align-middle rounded-lg  font-bold hover:text-black"
          >
            <img src={logout} className="  text-center  justify-center" />
          </button>
        </div>
      </div>
      <div className=" bg-white rounded-lg my-5 mx-5">
        {/* Content */}
        <div className="   mx-2 flex-col">
          <div className="w-full flex ">
            <div className="flex w-full  flex-col">
              <div className=" flex-col justify-center text-center items-center">
                <div className="flex justify-center  lg:ms-72 ">
                  {/* <h1 className="mb-3 text-lg  flex text-center font-bold">
                    เลือกหัวข้อการประมูล :
                  </h1> */}
                </div>
                <div className="flex justify-center mt-3 md:mt-5  ">
                  <select
                    className="flex w-full md:w-[70%] lg:w-[40%] xl:w-[40%] py-2  border rounded-lg  text-center  bg-gray-200"
                    onChange={(e) => handleSelectOption(e.target.value)}
                    disabled={isSelectDisabled}
                  >
                    <option value="">-- เลือกหัวข้อการประมูล --</option>
                    {listDataTitle.map((option) => (
                      <option
                        key={option.auction_topic_id}
                        value={option.auction_topic_id}
                      >
                        {option.title_auction_topic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* สร้างของแถม */}
              <div className="w-full  flex md:mt-3  ">
                <div className="w-full mt-3 flex flex-col md:flex-row justify-center md:justify-start md:ms-3  align-middle items-center">
                  <div className="md:text-sm lg:text-base">
                    <h1>ฉลากออมสิน</h1>
                  </div>
                  <div className="flex w-[40%] md:w-[10%] justify-center  mt-3 md:mt-0 md:ms-3 ">
                    <input
                      type="text"
                      name="label"
                      value={inputLabel}
                      className=" w-full text-center md:text-end border rounded-lg  bg-gray-200  px-2 py-1 leading-tight text-gray-700  shadow-md appearance-none focus:outline-none focus:shadow-outline"
                      onChange={(e) => setInputLabel(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center mt-3 md:mt-0 md:ms-3 ">
                    <h1 className="flex">ใบ</h1>
                  </div>
                  <div className=" mt-3 sm:mt-5 md:mt-0 md:ms-3 ">
                    <button
                      className=" py-2 px-3 md:text-sm text-sm lg:text-base  text-sky-500 font-semibold  bg-sky-300 active:bg-sky-300 active:text-white  bg-opacity-30  rounded-lg focus:outline-none focus:shadow-outline"
                      onClick={openModal}
                    >
                      เพิ่มของแถม
                    </button>
                  </div>
                  <div className=" sm:mt-5 md:mt-0 md:ms-3 ">
                    <button
                      className=" mb-3 sm:mb-0 py-2 px-2 sm:px-3 md:text-sm lg:text-base  mt-3 sm:mt-0 text-sm  text-green-500 font-semibold  bg-green-300 active:bg-green-300 active:text-white  bg-opacity-30  rounded-lg focus:outline-none focus:shadow-outline"
                      onClick={handleSaveGive}
                    >
                      บันทึกของแถม
                    </button>

                    
                  </div>
                <div>

                </div>

                  {/* แสดงรายละเอียดของแถม */}
                </div>
              </div>
            </div>
          </div>
          <div className=" sm:mt-4 w-full font-semibold flex justify-center  text-center   text-pink-600 ">
            {newData}
          </div>
          {showModal && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Giveway Modal"
              style={{
                content: {
                  width: "50%",
                  height: "90%",
                  // position:"fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  backgroundColor: "rgb(229 231 235)",
                },
                overlay: {
                  display: "flex",
                  justifyContent: "center",
                  backdropFilter: "blur(2px)",
                },
              }}
            >
              <div className="flex flex-col   justify-center items-center align-middle text-center">
                {/* <button
                  className=" w-full flex justify-end font-semibold text-2xl text-red-500"
                  onClick={closeModal}
                >
                  <img
                    src={logout}
                    alt=""
                    className="   text-center justify-center"
                  />
                </button> */}
                <button
                  className=" w-full flex justify-end font-bold text-2xl text-red-500"
                  onClick={closeModal}
                >
                  <BiLogOut className="  text-3xl  text-center justify-center" />
                </button>
                <h2 className="text-lg font-semibold ">เพิ่มของแถม</h2>
                <div className="flex md:w-[80%] lg:w-[50%]">
                  <input
                    type="text"
                    className=" w-full border rounded-lg bg-gray-50 mt-3 mb-3 px-2 py-1 leading-tight text-gray-700  shadow-md appearance-none focus:outline-none focus:shadow-outline"
                    // value={inputGive}
                    value={inputGive}
                    onChange={(e) => setInputGive(e.target.value)}
                  />
                </div>

                <div className="flex w-[50%] sm:w-[40%] md:w-[30%] lg:w-[25%]">
                  <button
                    className=" flex justify-center w-full py-2 px-4 text-sm shadow-lg   text-sky-500 font-semibold  bg-sky-300 active:bg-sky-300 active:text-white  bg-opacity-30  rounded-lg focus:outline-none focus:shadow-outline"
                    onClick={handleAddGive}
                    // onClick={handleAddOrUpdate}
                  >
                    <p className="flex text-center"> บันทึก </p>
                  </button>
                </div>
              </div>

              <div className="w-full mt-5  overflow-x-auto  max-h-72 flex-col justify-center ">
                <div className=" w-full flex justify-center items-center align-middle">
                  <table className="w-[80%]  bg-white ">
                    <thead className="sticky top-0">
                      <tr>
                        <th className=" px-6 py-3 border-b border-gray-200 bg-indigo-300 text-center font-semibold text-sm leading-4  tracking-wider">
                          ของแถม
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200  bg-indigo-300  text-center text-sm leading-4 font-semibold   tracking-wider">
                          แก้ไข
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200  bg-indigo-300  text-center text-sm leading-4 font-semibold   tracking-wider">
                          ลบ
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {giveList.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            ไม่มีข้อมูล
                          </td>
                        </tr>
                      ) : (
                        giveList.map((data) => (
                          <tr key={data.id}>
                            <td className="whitespace-no-wrap border-b border-gray-200 text-center py-2">
                              {data.name}
                            </td>
                            <td className="whitespace-no-wrap border-b border-gray-200 text-center text-xl">
                              {/* ปุ่มแก้ไขของแถม */}

                              <button
                                className=" bg-yellow-200 p-1 rounded"
                                onClick={() => handleEditGive(data.id)}
                              >
                                <AiOutlinePlusCircle className=" text-yellow-700 text-2xl" />
                              </button>
                            </td>
                            <td className="whitespace-no-wrap border-b border-gray-200 text-center text-xl">
                              {/* ปุ่มแก้ไขของแถม */}

                              <button
                                className=" bg-red-200 p-1 rounded"
                                onClick={() => handleDeleteGive(data.id)}
                              >
                                <AiOutlineDelete className=" text-red-700 text-2xl" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Modal>
          )}
          <hr className="my-2  border-black" /> {/* เส้นคั่น */}
          {/* เพิ่มรายชื่อประมูล */}
          <div className="w-full  flex justify-center sm:justify-between ">
            <div className="w-full md:w-1/2 ">
              <div className="flex flex-row mt-2 ms-2 sm:ms-3">
                <h1 className=" text-sm font-semibold text-left lg:text-base">
                  ผู้ประมูล :
                  <span className=" ms-3 sm:ms-3 lg:ms-3 mt-3 font-bold text-sm lg:text-base ">
                    {chooseCustomer}
                  </span>
                </h1>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-normal align-middle mt-5">
                <div className="flex  justify-center lg:justify-start   sm:w-[70%] md:w-[120px] lg:w-[90px]">
                  <h1 className="flex text-sm lg:text-base  justify-center lg:justify-start lg:ms-3  ">
                    จำนวนเงิน
                  </h1>
                </div>
                <div className="w-[50%] sm:w-[50%] md:w-[50%] mt-3 sm:ms-1 lg:mt-0  lg:w-[30%] flex justify-center sm:justify-start md:justify-start md:ms-2 lg:ms-0  lg:mr-2">
                  <input
                    type="number"
                    min="0"
                    value={inputPrice}
                    onChange={(e) => setInputPrice(e.target.value)}
                    className=" w-full justify-center lg:justify-start items-center lg:py-2  text-center lg:text-end  border rounded-lg bg-gray-200  px-2 py-1 leading-tight text-gray-700 shadow-md appearance-none focus:outline-none focus:shadow-outline "
                  />
                </div>
                {/* <div className="flex mt-3 justify-center text-sm ">บาท</div> */}
                <div className="flex mt-3 lg:mt-0 w-[40%] sm:w-[40%] lg:w-[30%] items-center justify-center ">
                  <button
                    className=" flex w-full py-1 lg:py-2 lg:mt-1   text-green-500 font-semibold  bg-green-300  active:bg-green-300 active:text-white bg-opacity-30  rounded-lg focus:outline-none focus:shadow-outline"
                    onClick={handleSave}
                  >
                    <h1 className="w-full flex justify-center text-sm lg:text-base">
                      {" "}
                      บันทึก  
                    </h1>
                  </button>
                </div>
              </div>

              {!isSmallScreen3 && (
                <div className="flex-col  w-full mt-10  justify-center items-center">
                  <div className="w-full flex-col justify-center">
                    <div className="flex justify-center">
                      <input
                        type="text"
                        placeholder="ใส่ชื่อที่ต้องการค้นหา"
                        className="w-[70%] border rounded-lg bg-gray-200 text-center  px-2 py-1 leading-tight text-gray-700  shadow-md appearance-none focus:outline-none focus:shadow-outline"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>

                    <div className="flex  justify-center lg:justify-start  w-full">
                      <button
                        className=" w-[110px] py-2  ms-2   mt-3 lg:mt-0  text-sm  md:ms-7  text-sky-500 font-semibold  bg-sky-300 active:bg-sky-300 active:text-white  bg-opacity-30  rounded-lg focus:outline-none focus:shadow-outline"
                        // onClick={handleAddCustomer}
                        onClick={openModal4}
                      >
                        เพิ่มรายชื่อ
                      </button>
                    </div>

                    {setShowModal4 && (
                      <Modal
                        isOpen={modalIsOpen4}
                        onRequestClose={closeModal4}
                        contentLabel="Giveway Modal"
                        style={{
                          content: {
                            width: "50%",
                            height: "50%",
                            // position:"fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                            backgroundColor: "rgb(229 231 235)",
                          },
                          overlay: {
                            display: "flex",
                            justifyContent: "center",
                            backdropFilter: "blur(2px)",
                          },
                        }}
                      >
                        <div className="flex flex-col mt-5  justify-center items-center align-middle text-center">
                          <button
                            className=" w-full flex justify-end font-semibold text-2xl text-red-500"
                            onClick={closeModal4}
                          >
                            <BiLogOut className="  text-3xl  text-center justify-center" />
                          </button>
                          <h2 className="text-lg font-semibold ">
                            เพิ่มรายชื่อ
                          </h2>
                          <input
                            type="text"
                            className=" w-full md:w-full border rounded-lg bg-gray-100 mt-3  px-2 py-1 leading-tight text-gray-700  shadow-md appearance-none focus:outline-none focus:shadow-outline"
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
                          />

                          <div className="flex  justify-center lg:justify-start  w-full">
                            <button
                              className=" w-[110px] py-2  ms-2   mt-5 lg:mt-0  text-sm  md:ms-7  text-sky-500 font-semibold  bg-sky-300 active:bg-sky-300 active:text-white  bg-opacity-30  rounded-lg focus:outline-none focus:shadow-outline"
                              onClick={handleAddCustomer}
                            >
                              เพิ่มชื่อใหม่
                            </button>
                          </div>
                        </div>
                      </Modal>
                    )}

                    <div className="w-full   overflow-x-auto max-h-48 flex-col rounded-lg justify-center ">
                      <div className=" w-full flex mt-3 justify-center items-center align-middle">
                        <table className="w-full  bg-white ">
                          <thead className="sticky top-0">
                            <tr>
                              <th className=" px-6 py-3 border-b border-gray-200 bg-indigo-300 text-center font-semibold text-sm leading-4  tracking-wider">
                                รายชื่อผู้ร่วมประมูล
                              </th>
                              <th className="px-6 py-3 border-b border-gray-200  bg-indigo-300  text-center text-sm leading-4 font-semibold  tracking-wider">
                                เลือก
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {filteredCustomerList.length === 0 ? (
                              <tr>
                                <td colSpan="5" className="text-center py-4">
                                  ไม่มีข้อมูล
                                </td>
                              </tr>
                            ) : (
                              filteredCustomerList.map((data, index) => (
                                <tr key={index} className="hover:bg-blue-300">
                                  <td className="whitespace-no-wrap border-b border-gray-200 text-center py-2">
                                    {data.customer_name}
                                  </td>
                                  <td className="whitespace-no-wrap border-b border-gray-200 text-center text-xl">
                                    <button
                                      className=" bg-green-600 p-1 rounded"
                                      onClick={() => handleChooseCustomer(data)}
                                    >
                                      <AiOutlinePlusCircle className=" text-green-100" />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="w-full  mt-10 flex-col justify-center   ">
                <div className="flex flex-col lg:flex-row justify-center  items-center">
                  <button
                    className=" flex  px-3 py-4 mx-5 lg:mt-2  bg-gray-600  hover:bg-gray-800 p-1 rounded-full text-white  font-semibold "
                    onClick={() => handleButtonValue(0)}
                  >
                    <div>รีเซ็ท</div>
                  </button>
                  <button
                    className="flex px-5 py-3 mx-5 mt-3  bg-green-600  hover:bg-green-800 p-1 rounded-full text-white  font-semibold text-lg"
                    onClick={() => handleButtonValue(1)}
                  >
                    1<span className="text-green-600">.</span>
                  </button>
                  <button
                    className=" flex px-5 py-3 mx-5 mt-3 bg-yellow-600  hover:bg-yellow-800 p-1 rounded-full text-white  font-semibold text-lg"
                    onClick={() => handleButtonValue(2)}
                  >
                    <div>2</div>
                  </button>
                  <button
                    className=" flex px-5 py-3 mx-5 mt-3 bg-red-600  hover:bg-red-800 p-1 rounded-full text-white  font-semibold text-lg"
                    onClick={() => handleButtonValue(3)}
                  >
                    <div>3</div>
                  </button>
                </div>
              </div>
            </div>

            {!isSmallScreen2 && (
              <div className="w-1/2 ms-3 sm:ms-0">
                <div className="flex-col  w-full  justify-center items-center">
                  <div className="w-full flex-col  justify-center">
                    <div className=" flex flex-col lg:flex-row lg:mt-3 lg:justify-center">
                      <div className="flex justify-center items-center align-middle mt-3 lg:mt-0   ">
                        <input
                          type="text"
                          placeholder="ใส่ชื่อที่ต้องการค้นหา"
                          className="flex w-[90%] border rounded-lg bg-gray-200 text-center sm:mt-5 md:mt-5 lg:mt-0 lg:py-2 px-2 py-1 leading-tight text-gray-700  shadow-md appearance-none focus:outline-none focus:shadow-outline"
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                      </div>

                      <div className="flex  justify-center lg:justify-start  w-full lg:w-[30%]">
                        <button
                          className=" w-[110px] lg:w-full py-2  ms-2   mt-3 lg:mt-0 lg:ms-0 text-sm  md:ms-7  text-sky-500 font-semibold  bg-sky-300 active:bg-sky-300 active:text-white  bg-opacity-30  rounded-lg focus:outline-none focus:shadow-outline"
                          // onClick={handleAddCustomer}
                          onClick={openModal3}
                        >
                          เพิ่มรายชื่อ
                        </button>
                      </div>

                      {showModal3 && (
                        <Modal
                          isOpen={modalIsOpen3}
                          onRequestClose={closeModal3}
                          contentLabel="Giveway Modal"
                          style={{
                            content: {
                              width: "50%",
                              height: "50%",
                              // position:"fixed",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                              backgroundColor: "rgb(229 231 235)",
                            },
                            overlay: {
                              display: "flex",
                              justifyContent: "center",
                              backdropFilter: "blur(2px)",
                            },
                          }}
                        >
                          <div className="flex flex-col   justify-center items-center align-middle text-center">
                            <button
                              className=" w-full flex justify-end font-semibold text-2xl text-red-500"
                              onClick={closeModal3}
                            >
                              <BiLogOut className="  text-3xl  text-center justify-center" />
                            </button>
                            <h2 className="text-lg font-semibold ">
                              เพิ่มรายชื่อ
                            </h2>
                            <input
                              type="text"
                              className=" w-full md:w-full lg:w-[50%] border rounded-lg bg-gray-100 mt-3  px-2 py-1 leading-tight text-gray-700  shadow-md appearance-none focus:outline-none focus:shadow-outline"
                              value={inputName}
                              onChange={(e) => setInputName(e.target.value)}
                            />

                            <div className="flex  justify-center lg:mt-5   w-full">
                              <button
                                className=" w-[110px] py-2  ms-2 lg:ms-0  mt-5 lg:mt-0  text-sm  md:ms-7  text-sky-500 font-semibold  bg-sky-300 active:bg-sky-300 active:text-white bg-opacity-30  rounded-lg focus:outline-none focus:shadow-outline"
                                onClick={handleAddCustomer}
                              >
                                เพิ่มชื่อใหม่
                              </button>
                            </div>
                          </div>
                        </Modal>
                      )}
                    </div>

                    <div className="w-full mt-3  overflow-x-auto  max-h-96 sm:max-h-96  md:max-h-72 lg:max-h-48 flex-col rounded-lg justify-center ">
                      <div className=" w-full flex justify-center items-center align-middle">
                        <table className="w-full  bg-white  ">
                          <thead className="sticky top-0 ">
                            <tr>
                              <th className=" px-6 py-3 border-b border-gray-200 bg-indigo-300 text-center font-semibold text-sm leading-4  tracking-wider">
                                รายชื่อผู้ร่วมประมูล
                              </th>
                              <th className="px-6 py-3 border-b border-gray-200  bg-indigo-300  text-center text-sm leading-4 font-semibold   tracking-wider">
                                เลือก
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {filteredCustomerList.length === 0 ? (
                              <tr>
                                <td colSpan="5" className="text-center py-4">
                                  ไม่มีข้อมูล
                                </td>
                              </tr>
                            ) : (
                              filteredCustomerList.map((data, index) => (
                                <tr key={index} className="hover:bg-blue-300">
                                  <td className="whitespace-no-wrap border-b border-gray-200 text-center py-2">
                                    {data.customer_name}
                                  </td>
                                  <td className="whitespace-no-wrap border-b border-gray-200 text-center text-xl">
                                    <button
                                      className=" bg-green-600 p-1 rounded"
                                      onClick={() => handleChooseCustomer(data)}
                                    >
                                      <AiOutlinePlusCircle className=" text-green-100" />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* <h1 className="mb-2 text-sm text-center  font-bold">
       แสดงรายชื่อผู้ร่วมประมูล :
     </h1> */}
                </div>
              </div>
            )}
          </div>
          <hr className="my-3  border-black" /> {/* เส้นคั่น */}
          <div className="w-full flex justify-center mb-5 space-x-5   ">
            <div className="flex w-1/2 ">
              <button
                className="w-full text-sm font-semibold px-4 py-2 lg:mx-10 xl:mx-15 text-amber-500 bg-amber-300 bg-opacity-50 rounded-lg  focus:outline-none focus:shadow-outline"
                onClick={handleGenerateCertificate}
              >
                ออกเกียรติบัตร
              </button>
            </div>
            <div className="flex w-1/2  ">
              <button
                onClick={handleEndAuction}
                className="w-full text-sm font-semibold px-4 py-2 lg:mx-10 xl:mx-15  text-red-500 bg-red-300 bg-opacity-50 rounded-lg  focus:outline-none focus:shadow-outline"
              >
                จบประมูล
              </button>
            </div>
          </div>
          {showModal2 && (
            <Modal
              isOpen={modalIsOpen2}
              onRequestClose={closeModal2}
              contentLabel="Giveway Modal"
              style={{
                content: {
                  width: "90%",
                  height: "90%",
                  // position:"fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  backgroundColor: "rgb(229 231 235)",
                },
                overlay: {
                  display: "flex",
                  justifyContent: "center",
                  backdropFilter: "blur(2px)",
                },
              }}
            >
              <div className="w-full h-full flex flex-col   justify-center items-center align-middle text-center">
                <button
                  className=" w-full flex justify-end font-semibold  text-red-500 mb-3"
                  onClick={closeModal2}
                >
                  <BiLogOut className="  text-2xl  text-center justify-center" />
                </button>

                <div className="w-full h-full">
                  <PDFViewer width="100%" height="500px">
                    {reportData && <Certificate reportData={reportData} />}
                  </PDFViewer>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu3;
