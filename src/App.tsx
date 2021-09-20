import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from './components';

function App() {
	return (
		<Canvas>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Box position={[-1.2, 0, 3]} />
			<Box position={[1.2, 0, 3]} />
		</Canvas>
	);
}

export default App;