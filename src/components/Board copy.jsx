import bgImage from "../assets/images/bg.jpg";
// import lanternLeft2 from "../assets/images/lantern-left-2.png";
import lanternRight2 from "../assets/images/lantern-right-2.png";
import lionright from "../assets/images/lion-right.gif";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function Board() {
  const [data, setData] = useState("");
  const [showTop, setShowTop] = useState([]);
  const [showTopTier, setShowTopTier] = useState([]);
  const [loadStatus, setLoadStatus] = useState(false);
  const [delayRender, setDelayRender] = useState(false);
  

  // console.log(loadStatus);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://bankcash1.herokuapp.com/Show"
  //       );
  //       console.log(response.data);
  //       setLoadStatus(true)
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("เกิดข้อผิดพลาดในการดึกข้อมูล", error);
  //     }
  //     setLoadStatus(false)
  //   };
  //   fetchData();

  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://bankcash1.herokuapp.com/Show/List/Top"
  //       );
  //       console.log(response.data);
  //       setShowTop(response.data);
  //     } catch (error) {
  //       console.error("เกิดข้อผิดพลาดในการดึกข้อมูล", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bankcash1.herokuapp.com/Show"
        );
        const newData = response.data[0];
        setData(newData);
        console.log(newData);
        setLoadStatus(true);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึกข้อมูล", error);
        setLoadStatus(false);
      }
    };

    const interval = setInterval(fetchData, 3000); // 1000 milliseconds = 1 second

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bankcash1.herokuapp.com/Show/List/Top"
        );
        setShowTop(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึกข้อมูล", error);
      }
    };

    const interval = setInterval(fetchData, 3000); // 1000 milliseconds = 1 second

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loadStatus) {
      setData("");
      setShowTop([]);
    }
  }, [loadStatus]);

  useEffect(() => {
    if (data.status_123 == 3) {
      setTimeout(async () => {
        try {
          const response1 = await axios.get('https://bankcash1.herokuapp.com/Show/List/TopTire');
          console.log(response1.data);
        } catch (error) {
          console.error('ไม่สามารถเรียกดูข้อมูล TopTire ได้', error);
          const response2 = await axios.get(`https://bankcash1.herokuapp.com/Show/Report/${data.id_auctionstarted
        }/Detail`);
          setShowTopTier(response2.data);
        }
        setDelayRender(true);
      }, 3000);
    } else {
      setDelayRender(false);
    }
  }, [data.status_123]);

  // useEffect(() => {
  //   if (data.status_123 === 3) {
  //     setTimeout(() => {

  //       setDelayRender(true);
  //     }, 3000);
  //   } else {
  //     setDelayRender(false);
  //   }
  // }, [data.status_123]);



  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //    setCount(count + 1);
  //      }, 3000);
   
  //      return () => {
  //        clearTimeout(timer);
  //      };
   
  //    }, [count]);
  //    console.log(count)

   

  return (
    <div
      // className="flex flex-col h-screen w-screen bg-red-200 "
      className="flex flex-col h-screen w-screen "
      style={{
        // backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full flex justify-between z-10 ">
        <div className=" flex w-[15%] sm:w-[17%] md:w-[13%] lg:w-[10%] xl:w-[10%]  absolute top-0 left-0 z-10  ">
          {/* <img src={lanternRight2} alt="lanternLeft" /> */}
        </div>
        <div className=" flex w-[15%] sm:w-[17%] md:w-[13%] lg:w-[10%] xl:w-[10%]   absolute top-0 right-0  z-20">
          {/* <img
            style={{ transform: "scaleX(-1)" }}
            src={lanternRight2}
            alt="lanternRight"
          /> */}
        </div>

        {delayRender === true ? (
          <div className="flex w-full ">
            <div className=" flex w-[30%] sm:w-[25%] md:w-[25%] lg:w-[18%] xl:w-[15%]  absolute bottom-0 left-[-20px] sm:left-[-20px] md:left-[5px] lg:left-[-5px] xl:left-[5px]  z-10  ">
              {/* <img
                style={{ transform: "scaleX(-1)" }}
                src={lionright}
                alt="lanternLeft"
              /> */}
            </div>
            <div className=" flex w-[30%] sm:w-[25%] md:w-[25%] lg:w-[18%] xl:w-[15%]  absolute bottom-0 right-0  md:right-[5px] lg:right-[-5px] xl:right-[5px]  z-10  ">
              {/* <img 
              src={lionright} 
              alt="lanternLeft" /> */}
            </div>
            {/* <div className=" flex flex-col justify-center items-center w-full   sm:mt-5 lg:mt-0 bg-opacity-40 bg-red-200  transform translate-y-20 mx-16  pb-5  sm:pb-10 md:pb-15 lg:pb-20   rounded-3xl"> */}
            <div className=" flex flex-col justify-center items-center w-full   sm:mt-5 lg:mt-0 bg-opacity-40   transform translate-y-20 mx-16  pb-5  sm:pb-10 md:pb-15 lg:pb-20   rounded-3xl">
              <div className="flex justify-center ">
                {/* <h1 className="text-stroke-white1 text-gradient1 text-2xl sm:text-4xl lg:text-5xl mt-5 text-center font-black ">
                  ขอแสดงความยินดี
                </h1> */}
                <h1 className=" text-2xl sm:text-4xl lg:text-5xl mt-5 text-center font-black ">
                  ขอแสดงความยินดี
                </h1>
              </div>
              {/* <div className="flex w-[90%] justify-center text-center items-center mt-7 sm:w-[70%] md:w-[40%] lg:mt-10 sm:text-2xl lg:text-4xl bg-red-900 rounded-lg border-2 sm:py-1 border-yellow-400 text-white ">
                <h1>{showTop[0].user_auction}</h1>
              </div> */}
              <div className="flex w-[90%] justify-center text-center items-center mt-7 sm:w-[70%] md:w-[40%] lg:mt-10 sm:text-2xl lg:text-4xl  sm:py-1  ">
                <h1>    {showTopTier?.Customer && showTopTier.Customer !== "" ? showTopTier.Customer : ""}
                  </h1>
              </div>
              {/* <div className="flex justify-center  ">
                <h1 className="text-stroke-white2 text-gradient2 text-3xl sm:text-5xl text-center mt-5 sm:mt-10  font-bold">
                  {data && data.auctionstarted_auction_topic
                    ? data.auctionstarted_auction_topic
                    : ""}
                </h1>
            
              </div> */}
              <div className="flex justify-center  ">
                <h1 className=" text-3xl sm:text-5xl text-center mt-5 sm:mt-10  font-bold">
                  {showTopTier && showTopTier?.AuctionTopic
                    ? showTopTier.AuctionTopic
                    : ""}
                </h1>
              
              </div>
              <div className="flex w-[90%] justify-center text-center  mt-3 sm:mt-5 sm:text-lg md:mt-5 lg:text-2xl lg:py-3 font-semibold ">
                {(showTopTier && showTopTier?.Gift) || "ของแถม : ไม่มีรายการ"}
              </div>

              <div >
                <h1 className="   text-xl sm:text-5xl text-center mt-5  font-bold ">
                  มูลค่า{" "}
                  <span>
                    {" "}
                    {/* {showTop[0].auction_result_price.toLocaleString()}{" "} */}
                    {/* ดักค่า undefined */}
                    {showTopTier?.Price?.toLocaleString() && showTopTier?.Price?.toLocaleString() !== "" ? showTopTier?.Price?.toLocaleString() : ""}
                  </span>{" "}
                  บาท{" "}
                </h1>
              </div>
              {/* <div >
                <h1 className=" text-stroke-white text-gradient  text-xl sm:text-5xl text-center mt-5  font-bold ">
                  มูลค่า{" "}
                  <span>
                    {" "}
                    {showTop[0].auction_result_price.toLocaleString()}{" "}
                  </span>{" "}
                  บาท{" "}
                </h1>
              </div> */}
            </div>
          </div>
        ) : (
          <div className="w-full flex">
            {loadStatus && data.auctionstarted_status_B === "1" ? (
              // <div className="bg-white  w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32  shadow-lg shadow-black translate-y-12 rounded-full flex items-center justify-center right-10 absolute z-40">
              <div className=" w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32    translate-y-12 rounded-full flex items-center justify-center right-10 absolute z-40">
                {data.status_123 === 1 && (
                  // <img
                  //   src="/images/no-first.png"
                  //   alt="first"
                  //   style={{ width: "80%", height: "auto" }}
                  // />
                  <h1 className="text-8xl">1</h1>
                )}
                {data.status_123 === 2 && (
                  // <img
                  //   src="/images/no-second.png"
                  //   alt="first"
                  //   style={{ width: "70%", height: "auto" }}
                  // />
                  <h1 className="text-8xl">2</h1>
                )}
                {data.status_123 === 3 && (
                  // <img
                  //   src="/images/no-third.png"
                  //   alt="first"
                  //   style={{ width: "80%", height: "auto" }}
                  // />
                  <h1 className="text-8xl">3</h1>
                )}
              </div>
            ) : (
              <div></div>
            )}

            {loadStatus ? (
              // <div className="w-full pt-10 pb-5   bg-opacity-40 bg-red-200  transform translate-y-20 mx-20  lg:pt-5  sm:pb-3 lg:py-10   rounded-3xl">
              <div className="w-full pt-10 pb-5   bg-opacity-40  transform translate-y-20 mx-20  lg:pt-5  sm:pb-3 lg:py-10   ">
                <div className="flex justify-center ">
                  <h1 className=" text-3xl sm:text-6xl text-center  font-bold">
                    {data && data.auctionstarted_auction_topic
                      ? data.auctionstarted_auction_topic
                      : ""}
                  </h1>
                  
                </div>
                <div className="flex justify-center mt-10 ">
                  {loadStatus ? (
                    <div className="flex w-[90%] justify-center  text-center text-sm   rounded-full px-5 py-1   font-bold  text-red-700  sm:text-xl md:text-2xl">
                      {(data && data.auctionstarted_gift) ||
                        "ของแถม : ไม่มีรายการ"}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                {data.auctionstarted_status_B === "0" ? (
                  <div className="flex w-full justify-center sm:mt-5 text-3xl md:text-5xl py-6   text-center items-center align-middle font-bold">
                    <div className="flex flex-col">
                      <h1 className=" mb-2 sm:mb-10">ขอเชิญร่วมการประมูล</h1>
                      <h1>ของมงคลได้ค่ะ</h1>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center mt-5">
                    {showTop.length > 0 && showTop[0] && (
                      <div className="w-full max-w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%]  mt-3 sm:mt-8 font-bold   sm:text-xl md:text-3xl lg:text-4xl py-4   px-3">
                        {/* <div className="w-full max-w-[80%] md:w-[70%] lg:w-[60%] xl:w-[60%] mt-3 font-bold bg-white text-xl md:text-4xl py-4   px-3"> */}
                        <div className="flex justify-between">
                          <div>
                            <h1>
                              1. <span>{showTop[0].user_auction}</span>
                            </h1>
                          </div>
                          <div>
                            <h1>
                              <span>
                                {showTop[0].auction_result_price.toLocaleString()}
                              </span>{" "}
                              บาท
                            </h1>
                          </div>
                        </div>
                      </div>
                    )}
                    {showTop.length > 1 && showTop[1] && (
                      <div className="w-full max-w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] mt-5 text-sm sm:mt-1 md:mt-5 font-bold sm:text-xl   md:text-2xl lg:text-3xl py-4 md:py-2 lg:py-5 rounded-lg px-3">
                        <div className="flex justify-between">
                          <div>
                            <h1>
                              2. <span>{showTop[1].user_auction}</span>
                            </h1>
                          </div>
                          <div>
                            <h1>
                              <span>
                                {showTop[1].auction_result_price.toLocaleString()}
                              </span>{" "}
                              บาท
                            </h1>
                          </div>
                        </div>
                      </div>
                    )}
                    {showTop.length > 2 && showTop[2] && (
                      <div className="w-full max-w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] mt-5 font-bold text-sm  sm:text-xl md:text-xl lg:text-2xl   md:py-2 lg:py-4 rounded-lg px-3 ">
                        <div className="flex justify-between">
                          <div>
                            <h1>
                              3. <span>{showTop[2].user_auction}</span>
                            </h1>
                          </div>
                          <div>
                            <h1>
                              <span>
                                {showTop[2].auction_result_price.toLocaleString()}
                              </span>{" "}
                              บาท
                            </h1>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Board;
