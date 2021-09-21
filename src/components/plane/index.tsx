import * as THREE from 'three';
import * as React from 'react';

interface PlaneProps {
	ref?: React.Ref<React.ReactNode>;
	position?: THREE.Vector3;
	rotation?: THREE.Euler;
	args?: [width?: number, height?: number];
}

const Plane = ({ ref, position, rotation, args }: PlaneProps) => (
	<mesh ref={ref} receiveShadow position={position} rotation={rotation}>
		<boxBufferGeometry attach="geometry" args={args} />
		<meshPhongMaterial attach="material" color="white" depthWrite />
	</mesh>
);

export default Plane;

