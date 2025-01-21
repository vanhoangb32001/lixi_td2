import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Sparkles, Shadow, ContactShadows, Billboard, Environment, BakeShadows, OrbitControls } from '@react-three/drei'
import { LayerMaterial, Depth } from 'lamina'
import Dice from './components/Dice'
import React, { useState } from 'react';


const App = () => {
  const [diceFace, setDiceFace] = useState(1);

  // Hàm để thay đổi mặt xúc xắc ngẫu nhiên từ 1 đến 6
  const rollDice = () => {
    const randomFace = Math.floor(Math.random() * 6) + 1;
    setDiceFace(randomFace);
  };
  
  return (
    <>
    <button
    onClick={rollDice}
    style={{
      position: 'absolute',
      top: 20,
      left: 20,
      padding: '10px 20px',
      fontSize: '16px',
      zIndex: 1,
      cursor: 'pointer',
      borderRadius: '5px',
      border: '1px solid #ccc',
      backgroundColor: '#f5f5f5',
    }}
  >
    Lắc lì xì
  </button>
    <Canvas style={{
      width: '100vw',
      height: '100vh',
      padding:0,
      margin:0,
    }} camera={{ position: [0, 12, 12], fov: 30 }}>
      <hemisphereLight intensity={0.5} color="white" groundColor="black" />
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/blaubeuren_church_square_2k.hdr"
        ground={{ height: 5, radius: 40, scale: 20 }}
      />
      {/* <Sphere color="white" amount={50} emissive="green" glow="lightgreen" position={[1, 1, -1]} />
      <Sphere color="white" amount={30} emissive="purple" glow="#ff90f0" size={0.5} position={[-1.5, 0.5, -2]} />
      <Sphere color="lightpink" amount={20} emissive="orange" glow="#ff9f50" size={0.25} position={[-1, 0.25, 1]} /> */}
      <Dice face={diceFace} /> 
      <OrbitControls autoRotateSpeed={0.85} zoomSpeed={0.75} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.55} />
    </Canvas>
    </>
  )

}

const Sphere = ({ size = 1, amount = 50, color = 'white', emissive, glow, ...props }) => (
  <mesh {...props}>
<sphereGeometry args={[size, 16, 16]} />
    <meshPhysicalMaterial roughness={0} color={color} emissive={emissive || color} envMapIntensity={0.2} />
    <Glow scale={size * 1.2} near={-25} color={glow || emissive || color} />
    <Sparkles count={amount} scale={size * 2} size={6} speed={0.4} />
    <Shadow rotation={[-Math.PI / 2, 0, 0]} scale={size * 1.5} position={[0, -size, 0]} color="black" opacity={1} />
  </mesh>
)

const Glow = ({ color, scale = 0.5, near = -2, far = 1.4 }) => (
  <Billboard>
    <mesh>
      <circleGeometry args={[2 * scale, 16]} />
      <LayerMaterial
        transparent
        depthWrite={false}
        blending={THREE.CustomBlending}
        blendEquation={THREE.AddEquation}
        blendSrc={THREE.SrcAlphaFactor}
        blendDst={THREE.DstAlphaFactor}>
        <Depth colorA={color} colorB="black" alpha={1} mode="normal" near={near * scale} far={far * scale} origin={[0, 0, 0]} />
        <Depth colorA={color} colorB="black" alpha={0.5} mode="add" near={-40 * scale} far={far * 1.2 * scale} origin={[0, 0, 0]} />
        <Depth colorA={color} colorB="black" alpha={1} mode="add" near={-15 * scale} far={far * 0.7 * scale} origin={[0, 0, 0]} />
        <Depth colorA={color} colorB="black" alpha={1} mode="add" near={-10 * scale} far={far * 0.68 * scale} origin={[0, 0, 0]} />
      </LayerMaterial>
    </mesh>
  </Billboard>
)


export default App;