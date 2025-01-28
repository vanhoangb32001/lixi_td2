import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import DiceMaterials from "./DiceMaterials";
import * as THREE from "three";

function DiceImpl({ onRollComplete }, ref) {
  const [diceRef, api] = useBox(() => ({
    mass: 1,
    position: [0, 3, 0],
    friction: 0.4,
    restitution: 4, // độ nảy
  }));

  // Trạng thái velocity & angularVelocity
  const velocity = useRef([0, 0, 0]);
  const angularVelocity = useRef([0, 0, 0]);
  // Flag đánh dấu "xúc xắc đã dừng"
  const stoppedRef = useRef(false);

  // Subscribe để luôn cập nhật velocity & angularVelocity
  useEffect(() => {
    const unsubVel = api.velocity.subscribe((v) => (velocity.current = v));
    const unsubAng = api.angularVelocity.subscribe(
      (v) => (angularVelocity.current = v)
    );
    return () => {
      unsubVel();
      unsubAng();
    };
  }, [api]);

  // Mỗi frame check xem dice có dừng chưa
  useFrame(() => {
    const [vx, vy, vz] = velocity.current;
    const [avx, avy, avz] = angularVelocity.current;

    const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
    const angularSpeed = Math.sqrt(avx * avx + avy * avy + avz * avz);

    // Ngưỡng để coi như "dừng"
    const isStopped = speed < 0.01 && angularSpeed < 0.01;

    if (isStopped && !stoppedRef.current) {
      stoppedRef.current = true;
      // Lấy mặt trên
      const face = getFaceUp(diceRef.current);
      onRollComplete?.(face);
    } else if (!isStopped) {
      stoppedRef.current = false;
    }
  });

  // Cho component cha gọi "throwDice()"
  useImperativeHandle(ref, () => ({
    throwDice() {
      // Reset
      stoppedRef.current = false;
      // Đặt xúc xắc lên cao
      api.position.set(0, 10, 0);
      // random velocity
      api.velocity.set((Math.random() - 0.5) * 50, 0, (Math.random() - 0.5) * 40);
      // random angularVelocity
      api.angularVelocity.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      );
    },
  }));

  return (
    <mesh ref={diceRef} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <DiceMaterials />
    </mesh>
  );
}

// Hàm tính toán mặt trên local +Y => world direction
function getFaceUp(object3D) {
  const q = object3D.quaternion; // THREE.Quaternion
  const up = new THREE.Vector3(0, 1, 0);
  up.applyQuaternion(q);

  // Mapping ±X,±Y,±Z => số mặt
  const directions = {
    1: new THREE.Vector3(0, 1, 0),  // +Y
    6: new THREE.Vector3(0, -1, 0), // -Y
    2: new THREE.Vector3(1, 0, 0),  // +X
    5: new THREE.Vector3(-1, 0, 0), // -X
    3: new THREE.Vector3(0, 0, 1),  // +Z
    4: new THREE.Vector3(0, 0, -1)  // -Z
  };

  let bestFace = null;
  let maxDot = -Infinity;

  for (const faceNumber in directions) {
    const dir = directions[faceNumber];
    const dot = up.dot(dir); // dot product
    if (dot > maxDot) {
      maxDot = dot;
      bestFace = Number(faceNumber);
    }
  }
  return bestFace;
}

// forwardRef để cha gọi được "throwDice"
export default forwardRef(DiceImpl);
