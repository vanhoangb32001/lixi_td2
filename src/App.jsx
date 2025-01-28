import React, { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Modal from "react-modal";
import { Wheel } from "react-custom-roulette";
import Confetti from "react-confetti";
import { Loader } from "@react-three/drei";

import Floor from "./components/Floor";
import Dice from "./components/Dice";
import WallsBox from "./components/Wall";
import CustomButton from "./components/CustomButton";
import Altar from "./components/Altar";

import backgroundModal from "./assets/nentet.jpg";

Modal.setAppElement("#root");

export default function App() {
  const diceRef = useRef();
  const [resultFace, setResultFace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [isAltar, setIsAltar] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);
  const [data, setData] = useState([]); // Mảng dữ liệu cho vòng xoay
  const [inputValue, setInputValue] = useState(""); // Giá trị khung nhập liệu
  const colors = [
    "#FF5733",
    "#33FF57",
    "#5733FF",
    "#FFC300",
    "#DAF7A6", // Rực rỡ
    "#FF33F6",
    "#33FFF6",
    "#F6FF33",
    "#33A1FF",
    "#FF9D33", // Sặc sỡ
    "#FF5733",
    "#33FF99",
    "#A933FF",
    "#FF3333",
    "#75FF33", // Đậm
    "#3366FF",
    "#FF33A1",
    "#9D33FF",
    "#33FFDA",
    "#FFD733", // Tươi sáng
    "#FFAA33",
    "#33D7FF",
    "#33FFA6",
    "#A6FF33",
    "#FF33CC", // Sống động
    "#FF8333",
    "#33FF83",
    "#8333FF",
    "#33AAFF",
    "#FF3383", // Phong phú
  ];

  // Hàm lắc xúc xắc
  const handleRoll = () => {
    setResultFace(null);
    diceRef.current?.throwDice();
  };

  // Hàm mở modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleOpenAltar = () => {
    setIsAltar(!isAltar);
  };
  const handleOpenLight = () => {
    setIsLight(!isLight);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSpinning(false); // Reset trạng thái quay
  };

  // Hàm quay vòng xoay
  const handleSpin = () => {
    if (data.length === 0) {
      alert("Hãy thêm ít nhất một lựa chọn vào vòng xoay!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    setPrizeNumber(randomIndex);
    setSpinning(true);
  };

  // Hàm đóng modal kết quả
  const handleCloseResultModal = () => {
    setIsResultModalOpen(false);
  };

  const handleInputChange = (e) => {
    const lines = e.target.value
      .split("\n") // Tách từng dòng
      .map((line) => line.trim()) // Xóa khoảng trắng đầu/cuối
      .filter((line) => line); // Loại bỏ các dòng trống

    const newData = lines.map((line, index) => ({
      option: line,
      style: {
        backgroundColor: colors[index % colors.length], // Lấy màu từ mảng colors
      },
    }));

    setInputValue(e.target.value); // Cập nhật giá trị textarea
    setData(newData); // Cập nhật mảng `data`
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="absolute z-50 top-5 left-5 flex gap-4">
        <CustomButton onClick={handleRoll}>Lắc Xúc Xắc</CustomButton>
        <CustomButton onClick={handleOpenModal}>Mở Vòng Xoay</CustomButton>
        <CustomButton onClick={handleOpenAltar}>Đồ chơi</CustomButton>
        <CustomButton onClick={handleOpenLight}>Mở đèn</CustomButton>
      </div>

      {/* Modal chứa vòng xoay */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 md:p-8 rounded-xl shadow-2xl w-[95%] max-w-[900px] flex flex-col md:flex-row border border-gray-200"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        style={{
          content: {
            backgroundImage: `url(${backgroundModal})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "1rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          },
        }}
      >
        {/* Vòng xoay bên trái */}
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-center text-2xl text-white  font-bold mb-4 animate-sparkle">
            Vòng quay may mắn
          </h2>

          {data.length > 0 ? (
            <Wheel
              mustStartSpinning={spinning}
              prizeNumber={prizeNumber}
              data={data}
              onStopSpinning={() => {
                // alert(`Chúc mừng: ${data[prizeNumber]?.option}!`);
                setSpinning(false);
                setIsResultModalOpen(true);
              }}
              textColors={["#fff", "#fff"]}
              outerBorderColor="white"
              outerBorderWidth={10}
              innerBorderWidth={5}
              innerBorderColor="white"
              innerRadius={20}
              radiusLineColor="white"
              radiusLineWidth={5}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center">
              <Wheel
                mustStartSpinning={true} // Bắt đầu quay tự do
                prizeNumber={0} // Không cần chọn mục trúng thưởng
                data={[
                  {
                    option: "",
                    style: { backgroundColor: "#FF5733", color: "#FFFFFF" },
                  },
                ]}
                backgroundColors={["#FF5733"]}
                textColors={["#ffffff"]}
                outerBorderColor="white" // Vàng ánh kim
                outerBorderWidth={10} // Đường viền ngoài lớn
                spinDuration={1} // Thời gian quay dài hơn
                innerRadius={0} // Bán kính bên trong
                onStopSpinning={() => {}}
              />
            </div>
          )}

          {/* Nút quay */}
          <button
            onClick={handleSpin}
            className="mt-4 px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 rounded-lg shadow-lg hover:scale-110 transition-transform relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500 blur-lg opacity-50"></span>
            <span className="relative z-10">Quay</span>
          </button>

          {/* Nút đóng ở góc phải */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-red-500 focus:outline-none animate-sparkle"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Khung nhập liệu bên phải */}
        <div className="flex-1 flex flex-col ml-6 bg-none">
          <div className="w-full">
            <h2 className="text-center text-2xl text-white  font-bold mb-4 animate-sparkle">
              Danh sách
            </h2>
          </div>
          <textarea
            value={inputValue}
            onChange={handleInputChange} // Thêm sự kiện onChange
            placeholder="Nhập các thành viên nhé"
            className="border border-white placeholder-gray-300 text-black h-full bg-white rounded w-full p-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </Modal>
      {/* Confetti toàn màn hình */}
      {isResultModalOpen && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      {/* Modal kết quả */}
      <Modal
        isOpen={isResultModalOpen}
        onRequestClose={handleCloseResultModal}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-[95%] max-w-[500px] flex flex-col items-center border border-gray-200"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl  sm:text-2xl font-bold text-red-600 mb-4 text-center">
          Chúc mừng sẽ lên thớt !!!
        </h2>
        <p className="text-2xl mb-4 sm:text-lg font-semibold text-blue-600 text-center break-words">
          {data[prizeNumber]?.option}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
          {/* Nút Đóng */}
          <CustomButton
            onClick={handleCloseResultModal}
            className="w-full sm:w-auto"
          >
            Đóng
          </CustomButton>

          {/* Nút Xóa */}
          <CustomButton
            onClick={() => {
              setData((prevData) => {
                const updatedData = prevData.filter(
                  (_, index) => index !== prizeNumber
                );
                const updatedInputValue = updatedData
                  .map((item) => item.option)
                  .join("\n");
                setInputValue(updatedInputValue); // Đồng bộ với textarea
                setPrizeNumber(null);
                return updatedData;
              });
              setIsResultModalOpen(false);
            }}
            className="w-full sm:w-auto"
          >
            Xóa tên
          </CustomButton>
        </div>
      </Modal>

      <Canvas
        camera={{ position: [0, 12, 12], fov: 40 }}
        style={{ width: "100%", height: "100%", background: "black" }}
        dpr={[1, 1.5]}
        shadows
        frameloop="demand"
      >
        {/* <Suspense fallback={<Loader />}> */}
        <ambientLight intensity={0.8} />
        {/* Ánh sáng điểm để làm nổi bật */}
        {isLight && (
          <>
            <directionalLight
              position={[5, 10, 5]} // Vị trí ánh sáng
              intensity={1} // Cường độ ánh sáng
              color="#ffffff" // Màu sắc ánh sáng
              castShadow // Cho phép tạo bóng
            />
          </>
        )}

        <Physics>
          <Floor />
          <WallsBox />
          {/* Thêm bàn thờ */}
          {isAltar && (
            <>
              {/* Thêm bàn thờ */}
              <Altar position={[0, 0, -8]} scale={1.5} />
            </>
          )}
          <Dice ref={diceRef} onRollComplete={setResultFace} />
        </Physics>

        <OrbitControls />
        {/* </Suspense> */}
      </Canvas>
    </div>
  );
}
