import * as THREE from 'three';

export const toVector3 = (position: number[]): THREE.Vector3 => new THREE.Vector3(...position);
export const toEuler = (position: number[]): THREE.Euler => new THREE.Euler(...position);

export const dumpObject = (obj: any, lines: string[] = [], isLast = true, prefix: string = '') => {
	const localPrefix = isLast ? '└─' : '├─';
	lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
	const newPrefix = prefix + (isLast ? '  ' : '│ ');
	const lastNdx = obj.children.length - 1;
	obj.children.forEach((child: any, ndx: number) => {
		const isLast = ndx === lastNdx;
		dumpObject(child, lines, isLast, newPrefix);
	});
	return lines;
}

// 참고: https://tympanus.net/codrops/2019/10/14/how-to-create-an-interactive-3d-character-with-three-js/
function getMouseDegrees(x: number, y: number, degreeLimit: number) {
	let dx = 0,
		dy = 0,
		xdiff,
		xPercentage,
		ydiff,
		yPercentage;

	let w = { x: window.innerWidth, y: window.innerHeight };

	// Left (Rotates neck left between 0 and -degreeLimit)

	// 1. If cursor is in the left half of screen
	if (x <= w.x / 2) {
		// 2. Get the difference between middle of screen and cursor position
		xdiff = w.x / 2 - x;
		// 3. Find the percentage of that difference (percentage toward edge of screen)
		xPercentage = (xdiff / (w.x / 2)) * 100;
		// 4. Convert that to a percentage of the maximum rotation we allow for the neck
		dx = ((degreeLimit * xPercentage) / 100) * -1;
	};
	// Right (Rotates neck right between 0 and degreeLimit)
	if (x >= w.x / 2) {
		xdiff = x - w.x / 2;
		xPercentage = (xdiff / (w.x / 2)) * 100;
		dx = (degreeLimit * xPercentage) / 100;
	};
	// Up (Rotates neck up between 0 and -degreeLimit)
	if (y <= w.y / 2) {
		ydiff = w.y / 2 - y;
		yPercentage = (ydiff / (w.y / 2)) * 100;
		// Note that I cut degreeLimit in half when she looks up
		dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
	};

	// Down (Rotates neck down between 0 and degreeLimit)
	if (y >= w.y / 2) {
		ydiff = y - w.y / 2;
		yPercentage = (ydiff / (w.y / 2)) * 100;
		dy = (degreeLimit * yPercentage) / 100;
	};

	return { x: dx, y: dy };
}
export interface mouse { x: number, y: number };
export const getMousePosition = (e: MouseEvent) => ({ x: e.clientX, y: e.clientY });
export const moveJoint = (mouse: mouse, joint: THREE.Bone, degreeLimit: number) => {
	const degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
	joint.rotation.y = THREE.MathUtils.degToRad(degrees.x);
	joint.rotation.x = THREE.MathUtils.degToRad(degrees.y);
};
