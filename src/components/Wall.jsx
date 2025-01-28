import React, { memo } from "react";
import { useBox } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Import ảnh texture
import tuong from "../assets/test.png";

/* --- Tường với texture --- */
const WallBoxWithTexture = ({ position, size }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    args: size, // Kích thước vật lý: [width, height, depth]
    position,
  }));

  // Load texture bằng useLoader
  const texture = useLoader(THREE.TextureLoader, tuong);

  return (
    <mesh ref={ref}>
      <boxGeometry args={size} />
      {/* Áp dụng texture cho vật liệu */}
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

/* --- Tường không có texture (màu cam) --- */
const WallBoxNoTexture = ({ position, size, color = "orange" }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    args: size,
    position,
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
};

/* --- WallsBox: 4 tường với 1 tường có ảnh --- */
function WallsBoxImpl() {
  return (
    <>
      {/* Tường có ảnh (texture) */}


      {/* Các tường khác chỉ dùng màu */}
      <WallBoxNoTexture position={[0, 5, 10]} size={[20, 10, 1]} />
      <WallBoxWithTexture position={[0, 5, -10]} size={[20, 10, 1]} />
      <WallBoxNoTexture position={[-10, 5, 0]} size={[1, 10, 20]} />
      <WallBoxNoTexture position={[10, 5, 0]} size={[1, 10, 20]} />
    </>
  );
}

/* --- Memo hóa WallsBox để tránh re-render không cần thiết --- */
export default memo(WallsBoxImpl);
