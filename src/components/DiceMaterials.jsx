import React from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

import one from "../assets/dice-six-faces-1.png";
import two from "../assets/inverted-dice-2.png";
import three from "../assets/inverted-dice-3.png";
import four from "../assets/dice-six-faces-4.png";
import five from "../assets/dice-six-faces-5.png";
import six from "../assets/inverted-dice-6.png";

const DiceMaterials = React.memo(() => {
  const [texture1, texture2, texture3, texture4, texture5, texture6] =
    useLoader(THREE.TextureLoader, [one, two, three, four, five, six]);

  return (
    <>
      <meshPhysicalMaterial map={texture1} attach="material-0" />
      <meshPhysicalMaterial map={texture2} attach="material-1" />
      <meshPhysicalMaterial map={texture3} attach="material-2" />
      <meshPhysicalMaterial map={texture4} attach="material-3" />
      <meshPhysicalMaterial map={texture5} attach="material-4" />
      <meshPhysicalMaterial map={texture6} attach="material-5" />
    </>
  );
});

export default DiceMaterials;
