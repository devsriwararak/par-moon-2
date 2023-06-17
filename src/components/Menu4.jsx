import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import logout from "../../public/images/icon-logout.svg"
import FileSaver from 'file-saver';
import axios from "axios";
import { Alert, Button } from "@material-tailwind/react";

function Menu4() {
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  const Token = localStorage.getItem("token");
  

  const fetchDataAll = async () => {
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
        setSearchCustomer('');
        setSearchDate(null);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setListData("");
        setSearchCustomer('');
        setSearchDate(null);
      }
    
  }
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
        setSearchCustomer('');
        setSearchDate(null);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setListData("");
        setSearchCustomer('');
        setSearchDate(null);
      }
    } else if (searchCustomer && !searchDate) {
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
    } else if (!searchCustomer && searchDate) {
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

  const fetchExcel_2 = async ()=>{

    if (!searchCustomer && !searchDate) {
      location.href="https://bankcash1.herokuapp.com/download-reports/"

    } else if (searchCustomer) {

      location.href=`https://bankcash1.herokuapp.com/download-reports/?customer_name=${searchCustomer}`

    } else if (searchDate) {
      let date = new Date(searchDate);

      let newFormat = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      alert(newFormat)

      location.href=`https://bankcash1.herokuapp.com/download-reports/?date=${newFormat}`

    } else if (searchCustomer && searchDate) {
      let date = new Date(searchDate);

      let newFormat = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      location.href=`https://bankcash1.herokuapp.com/download-reports/?customer_name=${searchCustomer}&date=${newFormat}`


    }

   
  }

  const fetchExcel = async () => {
    if (!searchCustomer && !searchDate) {
      try {
        const response = await axios.get(
          "https://bankcash1.herokuapp.com/download-reports/",
          {
            responseType: 'blob',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        const content = response.headers['content-type'];
        let blob = new Blob([response.data], { type: content });
        FileSaver.saveAs(blob, 'reports.xlsx');
        setShowAlert1(true);
        setTimeout(() => {
          setShowAlert1(false);
        }, 1500); 
      } catch (error) {
        console.error(error);
      }
    } else if (searchCustomer) {
      try {
        const response = await axios.get(
          `https://bankcash1.herokuapp.com/download-reports/?customer_name=${searchCustomer}`,
          {
            responseType: 'blob',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        const content = response.headers['content-type'];
        let blob = new Blob([response.data], { type: content });
        FileSaver.saveAs(blob, 'reports.xlsx');
        setShowAlert1(true);
        setTimeout(() => {
          setShowAlert1(false);
        }, 1500); // เวลาในหน่วยมิลลิวินาที (2000 มิลลิวินาที = 2 วินาที
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
            responseType: 'blob',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        const content = response.headers['content-type'];
        let blob = new Blob([response.data], { type: content });
        FileSaver.saveAs(blob, 'reports.xlsx');
        setShowAlert1(true);
        setTimeout(() => {
          setShowAlert1(false);
        }, 1500); // เวลาในหน่วยมิลลิวินาที (2000 มิลลิวินาที = 2 วินาที
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
  

      try {
        const response = await axios.get(
          `https://bankcash1.herokuapp.com/download-reports/?customer_name=${searchCustomer}&date=${newFormat}`,
          {
            responseType: 'blob',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        const content = response.headers['content-type'];
      let blob = new Blob([response.data], { type: content });
      FileSaver.saveAs(blob, 'reports.xlsx');
      setShowAlert1(true);
      setTimeout(() => {
        setShowAlert1(false);
      }, 1500); // เวลาในหน่วยมิลลิวินาที (2000 มิลลิวินาที = 2 วินาที
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
    <div className=" flex flex-col  bg-gray-200 sm:h-screen m-0   ">
     <div className="flex  items-center justify-between item-center text-white bg-red-400 px-5 py-[23px] sm:py-[23px] md:py-[30px] lg:py-[22px] xl:py-[23px] ">
        <div className="flex w-[15%]">
          <h1 className=" text-center lg:text-lg">รายงาน</h1>
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
              \\ --- ดาวโหลดสำเร็จ --- //
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
      <div className=" bg-white rounded-lg my-5 mx-5  ">
        {/* Content here will take full width on small screens, and half width on larger screens */}

        <div className=" w-full  px-3  flex flex-col sm:flex-col md:flex-col lg:px-5 lg:flex-row py-3 md:py-0 md:mt-5 xl:px-10  justify-center  md:justify-center align-middle text-center ">
          {/* Content here will take full width on small screens, and half width on larger screens */}
          <div className="lg:w-[70%] xl:w-[50%]" >
          <input
            className=" w-[70%] md:w-[50%] lg:w-full   px-3  text-center sm:text-left py-2 mt-2  md:h-[43px]    md:mt-3 lg:mt-6 leading-tight bg-gray-200  border rounded-lg shadow-md appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="ค้นหาจากผู้ประมูล"
            value={searchCustomer}
            onChange={(e) => {
              setSearchCustomer(e.target.value);
            }}
          />
          </div>
          <div className="lg:w-[70%] xl:w-[50%] sm:mt-3 " >
          <input
            className="w-[70%] md:w-[50%] lg:w-full  px-3 lg:px-2 lg:ms-3 text-center sm:text-left py-2 mt-2  md:h-[43px]   md:mt-3 leading-tight bg-gray-200  border rounded-lg shadow-md appearance-none focus:outline-none focus:shadow-outline"
            type="date"
            value={searchDate || ''}
            onChange={(e) => {
              setSearchDate(e.target.value);
            }}
          />
          </div>

          <div className="flex w-full flex-col sm:flex-row sm:mt-5 lg:justify-around lg:mt-3 ">
              
          <div className="w-full  flex justify-center sm:justify-end  lg:w-[30%] xl:w-[30%] lg:ms-5    md:mt-0">
          <button
            className="flex w-[60%] sm:w-[10%] md:w-[50%] lg:w-full my-3  md:ms-0 lg:ms-3 lg:py-2   px-10 md:px-0  py-2  justify-center text-center items-center  shadow-lg  font-semibold   text-sky-500 bg-sky-300  active:bg-sky-300 active:text-white bg-opacity-30 rounded-lg  focus:outline-none focus:shadow-outline"
            onClick={fetchData}
          >
            <span className="w-full flex text-center justify-center  text-xs sm:text-sm lg:text-base">
              ค้นหา
            </span>
          </button>
          </div>
          <div className="w-full flex lg:ms-3  justify-center lg:w-[30%] xl:w-[30%]">
          <button
            className=" flex w-[60%] sm:w-[10%] md:w-[50%] lg:w-full lg:py-3 my-3 md:ms-0   px-10 py-2 md:px-0   justify-center text-center items-center  shadow-lg font-semibold   text-green-500 bg-green-300  active:bg-green-300 active:text-white bg-opacity-30 rounded-lg focus:outline-none focus:shadow-outline"
            onClick={fetchDataAll}
          >
            <span className=" flex text-center justify-center text-xs sm:text-sm lg:text-base">
              ทั้งหมด
            </span>
          </button>

          </div>
          <div className="w-full  flex justify-center lg:ms-3  sm:justify-start  lg:w-[30%] xl:w-[27%]">

          <button
            className=" flex w-[60%] sm:w-[10%] md:w-[50%]  lg:w-full lg:py-3  md:ms-0 my-3   px-10 md:px-0  py-2    justify-center text-center items-center  shadow-lg font-semibold  text-amber-500 bg-amber-300  active:bg-amber-300 active:text-white bg-opacity-30 rounded-lg  focus:outline-none focus:shadow-outline"
            onClick={fetchExcel}
          >
            <span className=" flex text-center justify-center text-xs sm:text-sm lg:text-base">
              Excel
            </span>
          </button>
          </div>
            
          </div>
  
        </div>


        <button  onClick={fetchExcel_2}>sssss</button>

<div className="w-full  p-4  flex justify-center items-center table-wrapper   mt-2">
        {isLoading ? (<p>Loading...</p>) : (
        <div className="align-middle overflow-x-auto inline-block min-w-full shadow overflow-y-auto sm:rounded-lg border border-gray-200   max-h-96 ">
          <table className="min-w-full">
            <thead className="sticky top-0">
              <tr>
                <th className="lg:w-[5%]  px-6 py-3 border-b border-gray-200 bg-indigo-300 font-bold text-center text-sm md:text-xs  xl:text-lg leading-4   uppercase tracking-wider">
                  #
                </th>
                <th className="md:w-[18%] lg:w-[15%]   px-6 py-3 border-b border-gray-200   bg-indigo-300 font-bold  text-center text-xs md:text-sm xl:text-lg leading-4   uppercase tracking-wider">
                  วันที่
                </th>
                <th className="md:w-[18%] lg:w-[20%] px-6 py-3 border-b border-gray-200   bg-indigo-300 font-bold  text-center text-sm md:text-xs xl:text-lg leading-4   uppercase tracking-wider">
                  ชื่อ
                </th>
                <th className="md:w-[18%] lg:w-[20%]   px-6 py-3 border-b border-gray-200   bg-indigo-300  font-bold text-center text-sm md:text-xs xl:text-lg leading-4   uppercase tracking-wider">
                  หัวข้อประมูล
                </th>
                <th className="md:w-[19%] lg:w-[25%]   px-6 py-3 border-b border-gray-200   bg-indigo-300 font-bold  text-center text-sm md:text-xs xl:text-lg leading-4   uppercase tracking-wider">
                  ของแถม
                </th>
                <th className="  px-6 py-3 border-b border-gray-200   bg-indigo-300 font-bold  text-center text-sm md:text-sm xl:text-lg leading-4   uppercase tracking-wider">
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
                listData.map((data,index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-xs  md:text-xs lg:text-base   border-gray-50 text-center">
                      {index+1}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-xs  md:text-xs lg:text-base   border-gray-50 text-center">
                      {data.auction_report_date}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-xs  md:text-xs lg:text-base   border-gray-50 text-center">
                      {data.customer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-xs  md:text-xs lg:text-base   border-gray-50 text-center">
                      {data.auction_report_auctionstarted}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-xs  md:text-xs lg:text-base   border-gray-50 text-center">
                      {data.auction_report_gift}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-xs  md:text-xs lg:text-base   border-gray-50 text-center">
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
