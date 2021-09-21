import * as THREE from 'three';
import * as React from 'react';

interface PlaneProps {
	position?: THREE.Vector3;
	rotation?: THREE.Euler;
	args?: [width?: number, height?: number];
}

const Plane = React.forwardRef<React.ReactNode, PlaneProps>(({ position, rotation, args }, ref) => {
	return (
		<mesh ref={ref} receiveShadow position={position} rotation={rotation}>
			<boxBufferGeometry attach="geometry" args={args} />
			<meshPhongMaterial attach="material" color="white" depthWrite />
		</mesh>
	);
});

export default Plane;

