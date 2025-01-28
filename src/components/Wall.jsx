import React, { memo } from "react";
import { useBox } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Import ảnh texture
import tuong from "../assets/test.png";

/* --- Tường với texture --- */
const WallBoxWithTexture = memo(({ position, size }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    args: size,
    position,
  }));

  const texture = useLoader(THREE.TextureLoader, tuong);

  return (
    <mesh ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial transparent opacity={1} map={texture} />
    </mesh>
  );
});


const WallBoxNoTexture = memo(({ position, size }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    args: size,
    position,
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial transparent opacity={0} />
    </mesh>
  );
});


/* --- WallsBox: 4 tường với 1 tường có ảnh --- */
function WallsBoxImpl() {
  return (
    <>
      {/* Tường với ảnh texture */}
      <WallBoxWithTexture position={[0, 5, -10]} size={[20, 10, 1]} />

      {/* Các tường khác chỉ có màu sắc */}
      <WallBoxNoTexture position={[0, 5, 10]} size={[20, 10, 1]} />
      <WallBoxNoTexture position={[-10, 5, 0]} size={[1, 10, 20]} />
      <WallBoxNoTexture position={[10, 5, 0]} size={[1, 10, 20]} />
    </>
  );
}

export default memo(WallsBoxImpl);

