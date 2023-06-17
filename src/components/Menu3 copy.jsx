import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DisableButtonsContext } from "../App";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
// import jsPDF from "jspdf";
// import { font } from "./NotoSerifThai-Regular-normal";
import { PDFViewer } from "@react-pdf/renderer";
import Certificate from "./Certificate";

import Modal from "react-modal";
import axios from "axios";
import "../App.css";
import bgImage2 from "../assets/images/decorative-lanterns2.png";

Modal.setAppElement("#root");

function Menu3() {
  const navigate = useNavigate();
  const [listDataTitle, setListDataTitle] = useState([]);
  const { setDisableButtons } = useContext(DisableButtonsContext);
  // const { setButtonValue} = useContext(SelectedButtonContext);
  const [buttonValue, setButtonValue] = useState();

  const [inputName, setInputName] = useState("");
  const [chooseCustomer, setChooseCustomer] = useState("");
  const [chooseCustomerId, setChooseCustomerId] = useState("");
  const [inputLabel, setInputLabel] = useState("0");
  const [inputGive, setInputGive] = useState("");
  const [saveGive, setSaveGive] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [giveList, setGiveList] = useState([]);
  const [selectedButton, setSelectedButton] = useState("0");
  const [selectedAuction, setSelectedAuction] = useState("");
  const [inputPrice, setInputPrice] = useState(0);
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [id_auctionstarted, setid_auctionstarted] = useState("");
  const [id_auctionstarted, setid_auctionstarted] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSmallScreen2, setIsSmallScreen2] = useState(false);
  const [isSmallScreen3, setIsSmallScreen3] = useState(true);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);

  // const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const Token = localStorage.getItem("token");

  const [editIndex, setEditIndex] = useState(null);
  const [reportData, setReportData] = useState({});

  const fetchDataTitleChoose = async () => {
    try {
      const responseTitle = await axios.get(
        // "https://bankcash1.herokuapp.com/Title",
        "https://bankcash1.herokuapp.com/Title/Choose",
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

  // useEffect(() => {
  //   window.onbeforeunload = (e) => {
  //     // Cancel the event
  //     e.preventDefault();
  //     // Chrome requires returnValue to be set
  //     e.returnValue = '';
  //     // Remove the token here
  //     localStorage.removeItem('token');
  //   };

  //   return () => {
  //     window.onbeforeunload = null;
  //   };
  // }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      return "แน่ใจหรือไม่ว่าคุณต้องการรีเฟรชหน้านี้? ข้อมูลที่ยังไม่ได้บันทึกอาจหาย.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  //   useEffect(() => {
  //     // Prompt confirmation when reload page is triggered
  //     window.onbeforeunload = () => { return "" };

  //     // Unmount the window.onbeforeunload event
  //     return () => { window.onbeforeunload = null };
  // }, []);

  useEffect(() => {
    fetchDataTitleChoose();

    const fetchCustomerList = async () => {
      try {
        const response = await axios.get(
          "https://bankcash1.herokuapp.com/Customer",
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
      setIsSmallScreen2(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize2);

    return () => {
      window.removeEventListener("resize", handleResize2);
    };
  }, []);

  useEffect(() => {
    const handleResize3 = () => {
      setIsSmallScreen3(window.innerWidth < 300 || window.innerWidth > 639);
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
          "https://bankcash1.herokuapp.com/Customer",
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
        "https://bankcash1.herokuapp.com/Show",
        dataToSend,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      console.log(response.data);
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
        "https://bankcash1.herokuapp.com/Show/List",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );

      const dataToSendUpdateB = {
        status_Id: id_auctionstarted,
        status_B: "1",
      };
      try {
        const response = await axios.put(
          "https://bankcash1.herokuapp.com/Show",
          dataToSendUpdateB,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        console.log(response.data);
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

  const formattedGiveList = giveList.map((data) => data.name);
  const newData = `ฉลากออมสิน จำนวน ${inputLabel} ใบ, ${formattedGiveList.join(
    ", "
  )}`;
  const handleSaveGive = async () => {
    const sendData = newData;
    setInputLabel("0");
    setGiveList([]);
    setSaveGive([sendData]);
    // console.log(sendData);
    try {
      const response = await axios.post(
        "https://bankcash1.herokuapp.com/AddGift",
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
      console.log("ส่งของแถมสำเร็จ", response.data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
    }
  };

  const handleEndAuction = async () => {
    // console.log(id_auctionstarted);
    try {
      const response = await axios.delete(
        "https://bankcash1.herokuapp.com/End",
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
      setListDataTitle([]);
      fetchDataTitleChoose();
      setIsSelectDisabled(false);
      setDisableButtons(false);
      setSaveGive([]);
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

  const handleButtonValue = (e) => {
    // console.log(e);
    setButtonValue(e);

    const sendButtonValue = async () => {
      try {
        const response = await axios.post(
          "https://bankcash1.herokuapp.com/AddCount",
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
        // `https://bankcash1.herokuapp.com/Show/Report/${id_auctionstarted}/Detail`,
        `https://bankcash1.herokuapp.com/Show/Report/341/Detail`,
        {
          headers: {
            Authorization: `Token ${Token}`,
            "Content-Type": "application/json",
          },
          maxBodyLength: Infinity,
        }
      );
      setReportData(response.data)
      openModal2()
    } catch (error) {
      console.log(error);
    }
  };
  console.log(reportData);

  return (
    <div className=" flex flex-col  bg-gray-200 h-screen  ms-2 ">
      {/* Header bar */}
      <div className="flex justify-between item-center text-white bg-red-400 px-5 py-3 ">
        <h1 className=" text-center">เริ่มการประมูล</h1>
        <div className="flex items-center justify-center text-center">
          <button
            onClick={handleLogout}
            className=" w-20  flex-col justify-center text-center align-middle rounded-lg  font-semibold hover:text-black"
          >
            <BiLogOut className="w-20  text-2xl  text-center justify-center" />
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
                <div className="flex justify-center">
                  <select
                    className=" w-full sm:w-[70%] md:w-[70%] lg:w-[60%] lg:ms-72 border rounded-lg px-2 py-1 text-center  bg-gray-100"
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
              <div className="w-full  flex ">
                <div className="w-full mt-3 flex flex-col sm:flex-row  align-middle items-center">
                  <div className="">
                    <h1>ฉลากออมสิน</h1>
                  </div>
                  <div className="mx-3 my-3 w-[30%] sm:w-[10%] md:w-[20%] ">
                    <input
                      type="text"
                      name="label"
                      value={inputLabel}
                      className=" w-full text-right border rounded-lg  bg-gray-100  px-2 py-1 leading-tight text-gray-700  shadow-md appearance-none focus:outline-none focus:shadow-outline"
                      onChange={(e) => setInputLabel(e.target.value)}
                    />
                  </div>
                  <div>
                    <h1>ใบ</h1>
                  </div>
                  <div className="ml-3">
                    <button
                      className=" py-2 px-3 md:text-xs text-sm lg:text-base  text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                      onClick={openModal}
                    >
                      เพิ่มของแถม
                    </button>
                  </div>
                  <div className="ml-3">
                    <button
                      className=" py-2 px-2 sm:px-3 md:text-xs lg:text-base  mt-3 sm:mt-0 text-sm  text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                      onClick={handleSaveGive}
                    >
                      บันทึกของแถม
                    </button>
                  </div>

                  {/* แสดงรายละเอียดของแถม */}
                </div>
              </div>
            </div>
            {!isSmallScreen && (
              <div className="flex w-1/2  ">
                <div
                  className="flex w-full justify-end "
                  style={{
                    backgroundImage: `url(${bgImage2})`,
                    backgroundSize: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className=" w-full font-semibold flex justify-center    text-pink-600 ">
            {/* {saveGive} */}
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
                <button
                  className=" w-full flex justify-end font-semibold text-2xl text-red-500"
                  onClick={closeModal}
                >
                  <BiLogOut className="  text-3xl  text-center justify-center" />
                </button>
                <h2 className="text-lg font-semibold ">เพิ่มของแถม</h2>
                <input
                  type="text"
                  className=" w-[50%] border rounded-lg bg-gray-50 mt-3 mb-3 px-2 py-1 leading-tight text-gray-700  shadow-md appearance-none focus:outline-none focus:shadow-outline"
                  // value={inputGive}
                  value={inputGive}
                  onChange={(e) => setInputGive(e.target.value)}
                />

                <button
                  className="w-full sm:w-[20%] py-2 px-4 text-sm text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                  onClick={handleAddGive}
                  // onClick={handleAddOrUpdate}
                >
                  บันทึก
                </button>
              </div>

              <div className="w-full mt-5  overflow-x-auto  max-h-72 flex-col justify-center ">
                <div className=" w-full flex justify-center items-center align-middle">
                  <table className="w-[80%]  bg-white ">
                    <thead>
                      <tr>
                        <th className=" px-6 py-3 border-b border-gray-200 bg-indigo-300 text-center font-semibold text-sm leading-4  tracking-wider">
                          รายชื่อของแถม
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200  bg-indigo-300  text-center text-sm leading-4 font-semibold   tracking-wider">
                          แก้ไข
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
                                className=" bg-yellow-300 p-1 rounded"
                                onClick={() => handleEditGive(data.id)}
                              >
                                <AiOutlinePlusCircle className=" text-yellow-800" />
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
            <div className="w-full sm:w-1/2">
              <div className="w-full sm:w-auto justify-center flex mr-2   ">
                <h1 className="w-full flex justify-center sm:justify-start md:justify-start text-sm font-semibold">
                  เพิ่มรายชื่อ :
                </h1>
              </div>
              <div className="flex flex-col lg:flex-row w-full justify-center  sm:w-[90%] md:w-[90%] lg:w-full ">
                <div className="w-full">
                  <input
                    type="text"
                    className=" w-full md:w-full border rounded-lg bg-gray-100  px-2 py-1 leading-tight text-gray-700  shadow-md appearance-none focus:outline-none focus:shadow-outline"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                  />
                </div>
                <div className="flex  justify-center lg:justify-start  w-full">
                  <button
                    className=" w-[110px] py-2  ms-2   mt-3 lg:mt-0  text-sm  md:ms-7  text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                    onClick={handleAddCustomer}
                  >
                    เพิ่มชื่อใหม่
                  </button>
                </div>
              </div>
              <h1 className="mt-2  font-semibold text-left">
                เลือก :
                <span className="ms-3 font-normal text-lg ">
                  {chooseCustomer}
                </span>
              </h1>
              <div className="w-full flex flex-col sm:flex-row md:flex-row lg:flex-row justify-left align-middle  items-center">
                <div className="flex my-3  sm:w-[70%] md:w-[120px] lg:w-[90px]">
                  <h1 className="flex justify-center  md:justify-start  text-center font-semibold   ">
                    ราคา :{" "}
                  </h1>
                </div>
                <div className="w-full sm:w-full sm:ms-1 md:w-[70%] lg:w-[57%] flex justify-center sm:justify-start md:justify-start md:ms-2 lg:mr-2">
                  <input
                    type="number"
                    min="0"
                    onChange={(e) => setInputPrice(e.target.value)}
                    className=" w-[60%] sm:w-full md:w-full sm:text-right justify-center items-center text-center  border rounded-lg bg-gray-100  px-2 py-1 leading-tight text-gray-700 shadow-md appearance-none focus:outline-none focus:shadow-outline "
                  />
                </div>
                <div className="font-semibold lg:mr-2 sm:ms-2 md:ms-3 ">
                  บาท
                </div>
                <div className="flex sm:justify-start sm:w-[100%] md:w-full md:justify-start">
                  <button
                    className=" py-1  px-9 sm:px-0 md:px-0 md:ms-3 lg:ms-6 xl:ms-8 ms-1 sm:w-full md:w-[60%] lg:w-[114px]  text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                    onClick={handleSave}
                  >
                    บันทึก
                  </button>
                </div>

                {!isSmallScreen3 && (
                  <div className="flex-col  w-full mt-5  justify-center items-center">
                    <div className="w-full flex-col justify-center">
                      <div className="flex justify-center">
                        <input
                          type="text"
                          placeholder="ใส่ชื่อที่ต้องการค้นหา"
                          className="w-full border rounded-lg bg-gray-100 text-center  px-2 py-1 leading-tight text-gray-700  shadow-md appearance-none focus:outline-none focus:shadow-outline"
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                      </div>
                      <div className="w-full mt-3  overflow-x-auto max-h-48 flex-col rounded-lg justify-center ">
                        <div className=" w-full flex mt-3 justify-center items-center align-middle">
                          <table className="w-full  bg-white ">
                            <thead>
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
                                  <tr key={index}>
                                    <td className="whitespace-no-wrap border-b border-gray-200 text-center py-2">
                                      {data.customer_name}
                                    </td>
                                    <td className="whitespace-no-wrap border-b border-gray-200 text-center text-xl">
                                      <button
                                        className=" bg-green-600 p-1 rounded"
                                        onClick={() =>
                                          handleChooseCustomer(data)
                                        }
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
                )}
              </div>
              <div className="w-full  mt-10 flex-col justify-around items-center text-center">
                {/* <button
                  className=" px-5 py-3 mx-5  mt-3 bg-gray-600  hover:bg-gray-800 p-1 rounded-full text-white  font-semibold text-lg"
                  onClick={() => handleButtonValue(0)}
                >
                  0
                </button> */}
                <button
                  className=" px-5 py-3 mx-5 mt-3 bg-green-600  hover:bg-green-800 p-1 rounded-full text-white  font-semibold text-lg"
                  onClick={() => handleButtonValue(1)}
                >
                  1<span className="text-green-600">.</span>
                </button>
                <button
                  className=" px-5 py-3 mx-5 mt-3 bg-yellow-600  hover:bg-yellow-800 p-1 rounded-full text-white  font-semibold text-lg"
                  onClick={() => handleButtonValue(2)}
                >
                  2
                </button>
                <button
                  className=" px-5 py-3 mx-5 mt-3 bg-red-600  hover:bg-red-800 p-1 rounded-full text-white  font-semibold text-lg"
                  onClick={() => handleButtonValue(3)}
                >
                  3
                </button>
              </div>
            </div>
            {!isSmallScreen2 && (
              <div className="w-1/2 ms-3 sm:ms-0">
                <div className="flex-col  w-full  justify-center items-center">
                  <div className="w-full flex-col justify-center">
                    <div className="flex justify-center">
                      <input
                        type="text"
                        placeholder="ใส่ชื่อที่ต้องการค้นหา"
                        className="w-[70%] border rounded-lg bg-gray-100 text-center sm:mt-5 md:mt-5  px-2 py-1 leading-tight text-gray-700  shadow-md appearance-none focus:outline-none focus:shadow-outline"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>
                    <div className="w-full mt-3  overflow-x-auto  max-h-96 sm:max-h-96  md:max-h-72 lg:max-h-48 flex-col rounded-lg justify-center ">
                      <div className=" w-full flex justify-center items-center align-middle">
                        <table className="w-full  bg-white ">
                          <thead>
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
                                <tr key={index}>
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
          <hr className="my-5  border-black" /> {/* เส้นคั่น */}
          <div className="w-full sm:ms-5 flex  justify-around ">
            {/* <button className="w-full py-1 mx-5 font-semibold  text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline">
              แสดงคนชนะประมูล
            </button> */}
            <button
              className="w-full py-1 mx-5 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline"
              onClick={handleGenerateCertificate}
            >
              ออกเกียรติบัตร
            </button>

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
            <button
              onClick={handleEndAuction}
              className="w-full py-1 mx-5 font-semibold  text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline"
            >
              จบประมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu3;
