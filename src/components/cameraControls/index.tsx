import React, { useRef } from 'react';
import * as THREE from 'three';
import { useThree, useFrame, RootState } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// control camera
interface CameraControlsProps { target: THREE.Vector3 }
const CameraControls = ({ target }: CameraControlsProps) => {
	// get reference of OribinControls
	const controls = useRef<any>();			// type 찾기

	// get camera and renderer
	const { camera, gl: {domElement} } = useThree<RootState>();

	// set position of target
	const targetClone = target.clone();
	targetClone.add(new THREE.Vector3(0, 0.5, 0));

	// this hook will excute on every rendered frame
	useFrame(() => controls.current.update());
	
	return (
		<OrbitControls
			ref={controls}
			args={[camera, domElement]}
			enablePan={false}
			enableZoom={false}
			target={targetClone}
		/>
	);	
};

export default CameraControls;
