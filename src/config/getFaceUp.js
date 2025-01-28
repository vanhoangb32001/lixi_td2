function getFaceUp(object3D) {
    // Lấy quaternion (4D) của mesh
    const q = object3D.quaternion; // THREE.Quaternion
  
    // Tạo vector (0,1,0) local +Y
    const up = new THREE.Vector3(0, 1, 0);
    // Chuyển nó sang to world space = q * up
    up.applyQuaternion(q);
  
    // up giờ là hướng "mặt +Y local" đang hướng về đâu trong thế giới
    // Ta coi (±X, ±Y, ±Z) là 6 hướng. Tìm hướng nào "gần" up nhất.
    const directions = {
      1: new THREE.Vector3(0, 1, 0),   // +Y
      6: new THREE.Vector3(0, -1, 0),  // -Y
      2: new THREE.Vector3(1, 0, 0),   // +X
      5: new THREE.Vector3(-1, 0, 0),  // -X
      3: new THREE.Vector3(0, 0, 1),   // +Z
      4: new THREE.Vector3(0, 0, -1)   // -Z
    };
  
    let bestFace = 1;
    let maxDot = -999;
  
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
  