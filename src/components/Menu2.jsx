import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Modal from 'react-modal';
import axios from 'axios';


Modal.setAppElement('#root');


function Menu2() {
  const [inputData, setInputData] = useState("");
  const [listData, setListData] = useState([]);
  const navigate = useNavigate();
  const [editDataId, setEditDataId] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalInput, setModalInput] = useState("");

  
  const handleEdit = (data) => {
    setModalData(data)
    setModalInput(data.title)
    setEditDataId(data.id); 
    setisModalOpen(true)
}


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
    const currentDateTime = new Date();
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const thaiDateTime = currentDateTime.toLocaleString('th-TH', options);
  
    try {
      if (editDataId) {
        if (isModalOpen) {
          const dataIndex = listData.findIndex((data) => data.id === editDataId);
          if (dataIndex !== -1) {
            const updatedData = { ...listData[dataIndex], title: modalInput };
            const response = await axios.put(
              `http://localhost:3001/giveaway/${editDataId}`,
              updatedData
            );
            console.log(response.data);
  
            const newListData = [...listData];
            newListData[dataIndex] = updatedData;
            setListData(newListData);
            setModalInput("");
            setisModalOpen(false);
          } else {
            console.error("Data not found for editing");
          }
        } else {
          console.error("Missing modal input");
        }
      } else {
        const maxId = listData.length > 0 ? Math.max(...listData.map(data => data.id)) : 0;
        const newData = {
          id: maxId + 1,
          title: inputData,
          timestamp: thaiDateTime,
          status: 0
        };
  
        const response = await axios.post('http://localhost:3001/giveaway', newData);
        console.log(response.data);
  
        setListData([...listData, newData]);
        setInputData("");
      }
    } catch (error) {
      console.error(error);
    }
  
    setEditDataId(null);
    setisModalOpen(false);
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/giveaway');
        console.log(response.data);
        setListData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate('/')
}


  return (
    <div className="w-full flex flex-col  bg-gray-200 h-screen  ms-0  ">
     <div className="flex justify-between item-center text-white bg-red-400 px-5 py-3 ">
        <h1 className=" text-center">ของแถม</h1>
        <div className="flex items-center justify-center text-center">
          <button
            onClick={handleLogout}
            className=" w-20  flex-col justify-center text-center align-middle rounded-lg  font-bold hover:text-black"
          >
            <BiLogOut className="w-20  text-2xl  text-center justify-center" />
          </button>
        </div>
      </div>
        <div className=" w-1/2  p-4 flex mt-5 mx-5 justify-start align-middle text-center ">
      {/* Content here will take full width on small screens, and half width on larger screens */}
      <input  className='w-[50%] px-3 py-2 text-sm leading-tight text-gray-700 border rounded-lg shadow-md appearance-none focus:outline-none focus:shadow-outline'
      type="text"
      placeholder='ของแถม'
      value={inputData}
      onChange={handleInputChange}
       />
       <button className="w-[20%]  mx-4 font-bold shadow-lg  text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline"
       onClick={handleSave}>
        <span className=" text-xs sm:text-lg">บันทึก</span>
        </button>
    </div>
    <div className='w-full  p-4  flex justify-center items-center mt-5'>
        <div className='align-middle overflow-x-auto inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
            <table className='min-w-full'>
            <thead>
                    <tr>
                        <th className="px-6 py-3 border-b border-gray-200  bg-indigo-300 text-center text-lg leading-4 font-medium  uppercase tracking-wider">
                            #
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200   bg-indigo-300  text-center text-lg leading-4 font-medium  uppercase tracking-wider">
                            ของแถม
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200   bg-indigo-300  text-center text-lg leading-4 font-medium  uppercase tracking-wider">
                            วันเวลา
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200   bg-indigo-300  text-center text-lg leading-4 font-medium  uppercase tracking-wider">
                            แก้ไข
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
              {listData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    ไม่มีข้อมูล
                  </td>
                </tr>
              ) : (
                listData.map((data) => (
                  <tr key={data.id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                      {data.id}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                      {data.title}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                      {data.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center text-xl">
                      <button onClick={() => handleEdit(data)}>
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            </table>

        </div>

    </div>

    <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Edit Modal"
  className="fixed inset-0 flex items-center justify-center z-50"

>
  {modalData && (
    <div className="bg-red-500 rounded-lg shadow-lg p-10 max-w-sm mx-auto">
      <h2 className=" text-white text-center text-2xl mb-10 underline">แก้ไขของแถม</h2>
      <input
        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-full shadow appearance-none focus:outline-none focus:shadow-outline mb-4"
        type="text"
        value={modalInput}
        onChange={handleInputChange}
      />
      <button
        className="w-full px-4 py-2  text-yellow-200 bg-red-700 font-bold rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline"
        onClick={handleSave}
      >
        บันทึก
      </button>
    </div>
  )}
</Modal>

<div className="flex justify-between item-center text-white bg-red-400 px-5 py-3 h-16 ">
       
       </div>


  </div>
  )
}

export default Menu2