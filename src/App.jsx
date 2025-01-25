import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import * as THREE from 'three';
import Dice from './components/Dice';
import soundFile from './assets/sound/videoplayback.mp3';

const App = () => {
  const [diceFace, setDiceFace] = useState(1);
  const [rollTrigger, setRollTrigger] = useState(false);
  const soundRef = useRef(null);

  const rollDice = () => {
    const randomFace = Math.floor(Math.random() * 6) + 1;
    setDiceFace(randomFace);
    setRollTrigger(true);

    // Phát nhạc khi người dùng nhấn nút
    if (soundRef.current && !soundRef.current.isPlaying) {
      soundRef.current.play();
    }
  };

  const onCanvasCreated = ({ gl }) => {
    const listener = new THREE.AudioListener();

    // Kiểm tra nếu camera tồn tại trước khi thêm listener
    if (gl.camera) {
      gl.camera.add(listener);
    }

    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(soundFile, (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(true); // Lặp lại nhạc
      sound.setVolume(0.2); // Đặt âm lượng
      soundRef.current = sound; // Lưu tham chiếu tới âm thanh
    });
  };

  return (
    <div className="w-full h-full bg-red-500 p-0">
      {/* Nút lắc xúc xắc */}
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

      {/* Canvas 3D */}
      <Canvas
        style={{
          padding: 0,
          margin: 0,
          width: '100vw',
          height: '100vh',
        }}
        shadows
        camera={{ position: [0, 12, 12], fov: 40 }}
        onCreated={onCanvasCreated}
      >
        <hemisphereLight intensity={0.5} color="white" groundColor="black" />
        <Environment
          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/blaubeuren_church_square_2k.hdr"
          ground={{ height: 5, radius: 40, scale: 20 }}
        />
        <Physics>
          <Dice
            face={diceFace}
            rollTrigger={rollTrigger}
            onRollComplete={() => setRollTrigger(false)}
          />
        </Physics>
        <OrbitControls autoRotateSpeed={0} zoomSpeed={0.75} />
      </Canvas>
    </div>
  );
};

export default App;
