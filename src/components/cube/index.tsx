import * as THREE from 'three';
import * as React from 'react';

interface CubeProps {
	ref?: React.Ref<React.ReactNode>;
	position?: THREE.Vector3;
	args?: [width?: number, height?: number, depth?: number];
}

const Cube = ({ ref, position, args }: CubeProps) => (
	<mesh ref={ref} position={position} castShadow>
		<boxGeometry attach="geometry" args={args} />
		<meshStandardMaterial attach="material" color="orange" />
	</mesh>
);

export default Cube;

