import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Modal from "react-modal";
import axios from "axios";
import logout from "../../public/images/icon-logout.svg";
import { Alert, Button } from "@material-tailwind/react";

Modal.setAppElement("#root");

function Menu1() {
  const [inputData, setInputData] = useState("");
  const [listData, setListData] = useState([]);
  const navigate = useNavigate();
  const [editDataId, setEditDataId] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalInput, setModalInput] = useState("");
  const [actionStatus, setActionStatus] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert1, setShowAlert1] = useState(false);

  const Token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://bankcash1.herokuapp.com/Title",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      // console.log(response.data);
      setListData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (data) => {
    setModalData(data);
    setModalInput(data.title_auction_topic);
    setEditDataId(data.auction_topic_id);
    setisModalOpen(true);
  };

  const closeModal = () => {
    setisModalOpen(false);
    setModalData(null);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (isModalOpen) {
      setModalInput(value);
    } else {
      setInputData(value);
    }
  };

  const handleSave = async () => {
    try {
      if (editDataId) {
        if (isModalOpen) {
          const dataIndex = listData.findIndex(
            (data) => data.auction_topic_id === editDataId
          );
          if (dataIndex !== -1) {
            const updatedData = {
              ...listData[dataIndex],
              title_auction_topic: modalInput,
              status_auction_topic: actionStatus,
            };
            // console.log(editDataId);
            const response = await axios.put(
              `https://bankcash1.herokuapp.com/Title/${editDataId}/edit`,
              updatedData,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${Token}`,
                },
              }
            );
            // console.log(updatedData)
            // console.log(response.data);

            const newListData = [...listData];
            newListData[dataIndex] = updatedData;
            setListData(newListData);
            setModalInput("");
            setActionStatus("");
            setisModalOpen(false);
 
          } else {
            console.error("Data not found for editing");
          }
        } else {
          console.error("Missing modal input");
        }
      } else {
        const maxId =
          listData.length > 0
            ? Math.max(...listData.map((data) => data.auction_topic_id))
            : 0;
        const newData = {
          auction_topic_id: maxId + 1,
          title_auction_topic: inputData,
          status_auction_topic: actionStatus,
        };

        const response = await axios.post(
          "https://bankcash1.herokuapp.com/Title",
          newData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        // console.log(response.data);

        setListData((prevlistData) => [...prevlistData, response.data]);
        setInputData("");
        await fetchData();
        setShowAlert1(true);
        setTimeout(() => {
          setShowAlert1(false);
        }, 1500); // เวลาในหน่วยมิลลิวินาที (2000 มิลลิวินาที = 2 วินาที
      }
    } catch (error) {
      console.error(error);
    }

    setEditDataId(null);
    setisModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleStatusChange = (value) => {
    setActionStatus(Number(value));
  };

  return (
    <div className=" flex flex-col  bg-gray-200 h-screen ms-0 ">
      <div className="flex  items-center justify-between item-center text-white bg-red-400 px-5 py-[23px] sm:py-[23px] md:py-[30px] lg:py-[22px] xl:py-[23px] ">
        <div className="flex w-[15%]">
          <h1 className=" text-center lg:text-lg">สร้างหัวข้อการประมูล</h1>
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
            <img src={logout} className=" text-center justify-center" />
          </button>
        </div>
      </div>
      <div className=" bg-white rounded-lg my-5 mx-5">
        <div className="   px-3  flex flex-col md:flex-row py-3  justify-center align-middle text-center ">
          {/* Content here will take full width on small screens, and half width on larger screens */}
          <input
            className="w-full px-3  text-center sm:text-left py-2 md:ms-2   mt-2 md:mt-3 sm:h-[70%]  sm:items-center sm:align-middle   leading-tight bg-gray-200   rounded-lg shadow-md appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="หัวข้อประมูล"
            value={inputData}
            onChange={handleInputChange}
          />
          <div className="w-full flex justify-center items-center md:justify-start">
            <button
              className=" flex  sm:[50%] sm:ms-5 my-3   px-10 py-2  justify-center text-center items-center  shadow-lg  text-green-500 font-semibold  bg-green-300 active:bg-green-300 active:text-white  bg-opacity-30  rounded-lg focus:outline-none focus:shadow-outline "
              onClick={handleSave}
            >
              <span className=" flex text-center justify-center text-xs  sm:text-lg">
                บันทึก
              </span>
            </button>
          </div>
        </div>
        <div className="w-full  p-4  flex justify-center items-center   mt-2 md:mt-0">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="align-middle overflow-x-auto inline-block min-w-full shadow overflow-y-auto sm:rounded-lg border border-gray-200 max-h-96">
              <table className="min-w-full">
                <thead className="sticky top-0">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-indigo-300 text-center font-bold text-sm md:text-base leading-4   uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200   bg-indigo-300  text-center font-bold text-sm md:text-base leading-4   uppercase tracking-wider">
                      หัวข้อประมูล
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200   bg-indigo-300  text-center font-bold text-sm md:text-base leading-4   uppercase tracking-wider">
                      วันเวลา
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200   bg-indigo-300  text-center font-bold text-sm md:text-base leading-4   uppercase tracking-wider">
                      สถานะ
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200   bg-indigo-300  text-center font-bold text-sm md:text-base leading-4   uppercase tracking-wider">
                      แก้ไข
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-200">
                  {listData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        ไม่มีข้อมูล
                      </td>
                    </tr>
                  ) : (
                    listData.map((data, index) => (
                      <tr key={data.auction_topic_id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b text-sm md:text-base  border-gray-50 text-center">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b text-sm md:text-base  border-gray-50 text-center">
                          {data.title_auction_topic}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b text-sm md:text-base  border-gray-50 text-center">
                          {data.create_date_auction_topic}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-no-wrap border-b text-sm md:text-base  border-gray-50 text-center ${
                            data.status_auction_topic === 0
                              ? "text-green-700"
                              : "text-red-500"
                          }`}
                        >
                          {data.status_auction_topic === 0
                            ? "ยังไม่ประมูล"
                            : "ประมูลแล้ว"}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-50 text-center text-xl">
                          <button
                            className="text-2xl text-yellow-500 "
                            onClick={() => handleEdit(data)}
                          >
                            <FaEdit />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Modal"
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
          {modalData && (
            <div className="bg-gray-200   flex flex-col   justify-center items-center align-middle text-center  ">
              <button
                className=" w-full flex justify-end font-bold text-2xl text-red-500"
                onClick={closeModal}
              >
                <BiLogOut className="  text-3xl  text-center justify-center" />
              </button>
              <h2 className=" text-center font-semibold text-xl  mb-5  md-mb-10 ">
                แก้ไขหัวข้อประมูล
              </h2>
              <input
                className="w-[50%] px-3 py-2 text-sm leading-tight text-gray-700 rounded-lg shadow-lg appearance-none focus:outline-none focus:shadow-outline mb-4"
                type="text"
                value={modalInput}
                onChange={handleInputChange}
              />
              <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] sm:px-2 md:px-5  flex flex-col sm:flex-row justify-center items-center sm:justify-between  ">
                <label className="flex items-center space-x-2 mt-3">
                  <input
                    type="radio"
                    name="status"
                    value={0}
                    // checked={modalData.status_auction_topic === 0}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  />
                  <span className="text-green-700">ยังไม่ประมูล</span>
                </label>
                <label className="flex items-center space-x-2 mt-3 sm:">
                  <input
                    type="radio"
                    name="status"
                    value={1}
                    // checked={modalData.status_auction_topic === 1}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  />
                  <span className="text-red-700">ประมูลแล้ว</span>
                </label>
              </div>

              <button
                className="w-[30%] px-4 py-2 mt-7  text-green-500 font-semibold  bg-green-300 active:bg-green-300 active:text-white  bg-opacity-30  rounded-lg focus:outline-none focus:shadow-outline"
                onClick={handleSave}
              >
                บันทึก
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Menu1;
