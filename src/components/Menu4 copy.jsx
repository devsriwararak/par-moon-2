import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

function Menu4() {
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  const Token = localStorage.getItem("token");

  

  const fetchData = async () => {
    if (!searchCustomer && !searchDate) {
      try {
        const response = await axios.get(
          "https://bankcash1.herokuapp.com/search-report/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        console.log(response.data);
        setListData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setListData("");
      }
    } else if (searchCustomer) {
      try {
        const response = await axios.get(
          `https://bankcash1.herokuapp.com/search-report/?customer_name=${searchCustomer}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        console.log(response.data);
        setListData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setListData("");
      }
    } else if (searchDate) {
      let date = new Date(searchDate);

      let newFormat = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      try {
        const response = await axios.get(
          `https://bankcash1.herokuapp.com/search-report/?date=${newFormat}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        console.log(response.data);
        setListData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setListData("");
      }
      // eslint-disable-next-line no-dupe-else-if
    } else if (searchCustomer && searchDate) {
      let date = new Date(searchDate);

      let newFormat = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      console.log(newFormat);

      try {
        const response = await axios.get(
          `https://bankcash1.herokuapp.com/search-report/?customer_name=${searchCustomer}&date=${newFormat}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        console.log(response.data);
        setListData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setListData("");
      }
    }
  };

  const fetchExcel = async () => {
    if (!searchCustomer && !searchDate) {
      try {
        const response = await axios.get(
          "https://bankcash1.herokuapp.com/download-reports/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    } else if (searchCustomer) {
      try {
        const response = await axios.get(
          `https://bankcash1.herokuapp.com/download-reports/?customer_name=${searchCustomer}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    } else if (searchDate) {
      let date = new Date(searchDate);

      let newFormat = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      try {
        const response = await axios.get(
          `https://bankcash1.herokuapp.com/download-reports/?date=${newFormat}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
      // eslint-disable-next-line no-dupe-else-if
    } else if (searchCustomer && searchDate) {
      let date = new Date(searchDate);

      let newFormat = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      console.log(newFormat);

      try {
        const response = await axios.get(
          `https://bankcash1.herokuapp.com/download-reports/?customer_name=${searchCustomer}&date=${newFormat}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" flex flex-col  bg-gray-200 h-screen ms-2 ">
      <div className="flex justify-between item-center text-white bg-red-400 px-5 py-3 ">
        <h1 className=" text-center">สร้างหัวข้อการประมูล</h1>
        <div className="flex items-center justify-center text-center">
          <button
            onClick={handleLogout}
            className=" w-20  flex-col justify-center text-center align-middle rounded-lg  font-bold hover:text-black"
          >
            <BiLogOut className="w-20  text-2xl  text-center justify-center" />
          </button>
        </div>
      </div>
      <div className=" bg-white rounded-lg my-5 mx-5 ">
        {/* Content here will take full width on small screens, and half width on larger screens */}
        <div className=" w-full  px-3  flex flex-col sm:flex-col md:flex-row py-3  justify-center align-middle text-center ">
          {/* Content here will take full width on small screens, and half width on larger screens */}
          <input
            className="w-full px-3  text-center sm:text-left py-2 mt-2 h-[70%] leading-tight bg-gray-100  border rounded-lg shadow-md appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="ค้นหาจากผู้ประมูล"
            onChange={(e) => {
              setSearchCustomer(e.target.value);
            }}
          />
          <input
            className="w-full px-3  text-center sm:text-left py-2 mt-2 h-[70%] leading-tight bg-gray-100  border rounded-lg shadow-md appearance-none focus:outline-none focus:shadow-outline"
            type="date"
            onChange={(e) => {
              setSearchDate(e.target.value);
            }}
          />
          <button
            className=" flex w-38 sm:ms-5 my-3  px-10 py-1  justify-center text-center items-center  shadow-lg  text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            onClick={fetchData}
          >
            <span className=" flex text-center justify-center text-xs sm:text-lg">
              บันทึก
            </span>
          </button>
          <button
            className=" flex w-38 sm:ms-5 my-3  px-10 py-1  lg:ms-60 justify-center text-center items-center  shadow-lg  text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            onClick={fetchExcel}
          >
            <span className=" flex text-center justify-center text-xs sm:text-lg">
              Excel
            </span>
          </button>
        </div>

        <div className="w-full  flex justify-center items-center px-2 mb-5  ">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="align-middle overflow-x-auto inline-block min-w-full shadow overflow-y-auto sm:rounded-lg border-b border-gray-200 max-h-96">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b font-bold  border-gray-200 bg-indigo-300 text-center  leading-4  uppercase tracking-wider">
                      #
                    </th>
                    <th className="w-1/6 px-6 py-3 border-b font-bold border-gray-200   bg-indigo-300  text-center  leading-4  uppercase tracking-wider">
                      วันที่
                    </th>
                    <th className="w-1/6 px-6 py-3 border-b font-bold border-gray-200   bg-indigo-300  text-center leading-4   uppercase tracking-wider">
                      ชื่อผู้ประมูล
                    </th>
                    <th className="w-1/5 px-6 py-3 border-b font-bold border-gray-200   bg-indigo-300  text-center leading-4   uppercase tracking-wider">
                      หัวข้อประมูล
                    </th>
                    <th className="px-6 py-3 border-b font-bold border-gray-200   bg-indigo-300  text-center text-lg leading-4   uppercase tracking-wider">
                      ของแถม
                    </th>
                    <th className="w-1/1 px-6 py-3 border-b font-bold border-gray-200   bg-indigo-300  text-center text-lg leading-4   uppercase tracking-wider">
                      ราคา
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
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-50 text-center">
                          {index}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-50 text-center">
                          {data.auction_report_date}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-50 text-center">
                          {data.customer_name}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-50 text-center">
                          {data.auction_report_auctionstarted}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-50 text-center ">
                          {data.auction_report_gift}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-50 text-center ">
                          {data.auction_report_price.toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu4;
