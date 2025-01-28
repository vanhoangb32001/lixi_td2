import React, { useMemo } from "react";
import { usePlane } from "@react-three/cannon";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import nennha from "../assets/nennha.png";




export default function Floor() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  const texture = useMemo(() => new TextureLoader().load(nennha), []);

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[20, 20]} /> {/* Giảm kích thước sàn */}
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

