import * as THREE from 'three';
import React, { useRef } from 'react';
import { Canvas, useThree, useFrame, RootState } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const CameraControls = () => {
	const controls = useRef<any>();		// type 찾기
	const { camera, gl: {domElement} } = useThree<RootState>();
	useFrame((state) => controls.current.update());

	return (
		<OrbitControls
			ref={controls}
			args={[camera, domElement]}
			enablePan={false}
			enableZoom={false}
			target={[0, 0.5, 0]}
		/>
	);	
};

function App() {
	const boxMesh = useRef<THREE.Mesh>();
	const planeMesh = useRef<THREE.Mesh>();

	return (
		<>
			<Canvas
				gl={{ antialias: true }}
				dpr={window.devicePixelRatio}
				camera={{ position: [-3, 2, 5], fov: 90 }}
				shadows
			>
				<CameraControls />
				<color attach="background" args={[new THREE.Color(0xa0a0a0)]} />
				<fog attach="fog" color={new THREE.Color(0xa0a0a0)} near={10} far={50} />
				<hemisphereLight
					color={0xffffff}
					groundColor={new THREE.Color(0x444444)}
					position={[0, 20, 0]}
				/>
				<directionalLight
					color={0xffffff}
					position={[3, 10, 10]}
					castShadow
					shadow-camera-top={2}
					shadow-camera-bottom={-2}
					shadow-camera-left={-2}
					shadow-camera-right={2}
					shadow-camera-near={0.1}
					shadow-camera-far={40}
				/>
				<mesh ref={boxMesh} castShadow>
					<boxGeometry attach="geometry" args={[1, 1, 1]} />
      				<meshStandardMaterial attach="material" color="orange" />
				</mesh>
				<mesh ref={planeMesh} receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
					<boxBufferGeometry attach="geometry" args={[1000, 1000]}/>
					<meshPhongMaterial attach="material" color="white" depthWrite />	
				</mesh>
			</Canvas>
		</>
	);
}

export default App;