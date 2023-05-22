import * as THREE from "three";

// parents are passed in function to move shapes with parent object

export const getRandomTransformInCube = (parent = new THREE.Object3D()) => {
  const dummy = new THREE.Object3D();

  parent.add(dummy);

  // random position
  dummy.position.x = (Math.random() - 0.5) * 100;
  dummy.position.y = (Math.random() - 0.5) * 100;
  dummy.position.z = (Math.random() - 0.5) * 100;

  // random rotation
  dummy.rotation.x = Math.random() * Math.PI;
  dummy.rotation.y = Math.random() * Math.PI;

  // random scale
  const randomScale = Math.max(0.2, Math.random());
  dummy.scale.set(randomScale, randomScale, randomScale);

  dummy.updateMatrixWorld();
  parent.add(dummy);

  return dummy;
};

export const getRandomTransformInSphere = (parent = new THREE.Object3D()) => {
  const dummy = new THREE.Object3D();

  parent.add(dummy);

  // random position
  const r = (Math.random() - 0.5) * 30;
  const theta = (Math.random() - 0.5) * 2.0 * Math.PI;
  const phi = (Math.random() - 0.5) * Math.PI;
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);
  const sinPhi = Math.sin(phi);
  const cosPhi = Math.cos(phi);
  const x = r * sinPhi * cosTheta;
  const y = r * sinPhi * sinTheta;
  const z = r * cosPhi;

  dummy.position.set(x, y, z);

  // random rotation
  dummy.rotation.x = Math.random() * Math.PI;
  dummy.rotation.y = Math.random() * Math.PI;

  // random scale
  const randomScale = Math.max(0.2, Math.random());
  dummy.scale.set(randomScale, randomScale, randomScale);

  dummy.updateMatrixWorld();
  parent.add(dummy);

  return dummy;
};

export const getRandomTransformInCone = (parent = new THREE.Object3D()) => {
  const dummy = new THREE.Object3D();

  parent.add(dummy);

  // random position
  const height = 100;
  const radius = Math.random() * (height / 2);

  const theta = Math.random() * 2 * Math.PI; // Random angle
  const randomHeight = Math.random() * height; // Random value between 0 and 1

  const r = radius * (randomHeight / height); // Radius at current height

  const x = r * Math.cos(theta);
  const y = -randomHeight + height / 2;
  const z = r * Math.sin(theta);

  dummy.position.set(x, y, z);

  // random rotation
  dummy.rotation.x = Math.random() * Math.PI;
  dummy.rotation.y = Math.random() * Math.PI;

  // random scale
  const randomScale = Math.max(0.2, Math.random());
  dummy.scale.set(randomScale, randomScale, randomScale);

  dummy.updateMatrixWorld();
  parent.add(dummy);

  return dummy;
};

export const getRandomTransformInTorus = (parent = new THREE.Object3D()) => {
  const dummy = new THREE.Object3D();

  parent.add(dummy);

  // random position
  const theta = 2 * Math.PI * Math.random(); // Angle in the major circle
  const phi = 2 * Math.PI * Math.random(); // Angle in the minor circle

  const majorRadius = 20;
  const minorRadius = Math.random() * 5;

  // Convert polar coordinates to Cartesian coordinates
  const x = (majorRadius + minorRadius * Math.cos(theta)) * Math.cos(phi);
  const y = (majorRadius + minorRadius * Math.cos(theta)) * Math.sin(phi);
  const z = minorRadius * Math.sin(theta);

  dummy.position.set(x, y, z);

  // random rotation
  dummy.rotation.x = Math.random() * Math.PI;
  dummy.rotation.y = Math.random() * Math.PI;

  // random scale
  const randomScale = Math.max(0.2, Math.random());
  dummy.scale.set(randomScale, randomScale, randomScale);

  dummy.updateMatrixWorld();
  parent.add(dummy);

  return dummy;
};
