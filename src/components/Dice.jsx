import React, { useEffect } from 'react';
import { useSpring, a } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import one from '../assets/dice-six-faces-1.png';
import two from '../assets/inverted-dice-2.png';
import three from '../assets/inverted-dice-3.png';
import four from '../assets/dice-six-faces-4.png';
import five from '../assets/dice-six-faces-5.png';
import six from '../assets/inverted-dice-6.png';

function Dice({ face, rollTrigger, onRollComplete }) {
  const texture1 = useLoader(THREE.TextureLoader, one);
  const texture2 = useLoader(THREE.TextureLoader, two);
  const texture3 = useLoader(THREE.TextureLoader, three);
  const texture4 = useLoader(THREE.TextureLoader, four);
  const texture5 = useLoader(THREE.TextureLoader, five);
  const texture6 = useLoader(THREE.TextureLoader, six);

  const rotations = {
    1: [0, 0, 0],
    2: [Math.PI / 2, 0, 0],
    3: [0, 0, Math.PI / 2],
    4: [0, 0, -Math.PI / 2],
    5: [-Math.PI / 2, 0, 0],
    6: [Math.PI, 0, 0],
  };

  // Animation logic
  const { position, rotation } = useSpring({
    position: rollTrigger ? [0, 5, 0] : [0, 0, 0],
    rotation: rollTrigger
      ? [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
      : rotations[face],
    config: { mass: 1, tension: 120, friction: 14 },
    onRest: () => {
      if (rollTrigger) {
        onRollComplete();
      }
    },
  });

  return (
    <a.mesh position={position} rotation={rotation}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture1} attach="material-0" />
      <meshStandardMaterial map={texture2} attach="material-1" />
      <meshStandardMaterial map={texture3} attach="material-2" />
      <meshStandardMaterial map={texture4} attach="material-3" />
      <meshStandardMaterial map={texture5} attach="material-4" />
      <meshStandardMaterial map={texture6} attach="material-5" />
    </a.mesh>
  );
}

export default Dice;
