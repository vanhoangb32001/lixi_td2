import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

export default function Altar({ position = [0, 0, 0], scale = 0.5 }) {
  // Tải GLTF file chỉ một lần
  const { scene } = useMemo(() => useGLTF("/models/scene.gltf"), []);

  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
      castShadow={false} // Không tạo bóng
      receiveShadow={false} // Không nhận bóng
    />
  );
}
