import * as THREE from 'three';
import React, { useRef, ReactFragment, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Cube, Plane, Model } from './components';

// 카메라 설정 관련 상수
const SCREEN_WIDTH: number = window.innerWidth;
const SCREEN_HEIGHT: number = window.innerHeight;
const VIEW_ANGLE: number = 45;
const ASPECT: number = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR: number = 1;
const FAR: number = 10000;

const ORIGIN: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
const CAMERA_POSITION: THREE.Vector3 = new THREE.Vector3(-3, 2, 5);

interface SceneProps { children?: ReactFragment }
const Scene = ({ children }: SceneProps) => (
	<>
		<CameraControls target={ORIGIN} />
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
		{children}
	</>
);

const App = () => {
	const planeMesh = useRef<THREE.Mesh>();

	return (
		<>
			<Canvas
				gl={{ antialias: true }}
				dpr={window.devicePixelRatio}
				camera={
					{
						fov: VIEW_ANGLE,
						aspect: ASPECT,
						near: NEAR,
						far: FAR,
						position: CAMERA_POSITION,
					}
				}
				shadows
			>
				<Scene>
					<Suspense fallback={null}>
						<Model position={new THREE.Vector3(0, -0.5, 0)} />
					</Suspense>
					<Plane
						ref={planeMesh}
						position={new THREE.Vector3(0, -1, 0)}
						rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
						args={[1000, 1000]}
					/>
				</Scene>
			</Canvas>
		</>
	);
};

export default App;