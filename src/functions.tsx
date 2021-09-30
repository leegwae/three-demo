import * as THREE from 'three';

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

// ========================== [ manage model ] ========================================
const PREFIX = 'mixamorig';
interface BONES { [boneName:string]: number[] }

/*
	-1번: 기본(십자가)
	1번: 대자
	2번: 손바닥 챱
*/
const POSE: BONES[] = [
	{
		'LeftUpLeg': [0, 0, 20],
		'RightUpLeg': [0, 0, -20],
	},
	{
		'LeftShoulder': [0, 0, 70],
		'RightShoulder': [0, 0, -70],
		'LeftArm': [180, 0, 0],
		'RightArm': [180, 0, 0],
		'LeftForeArm': [0, 0, -40],
		'RightForeArm': [0, 0, 40],
		'LeftUpLeg': [0, 0, 20],
		'RightUpLeg': [0, 0, -20],
	}
];

const moveJoint = (joint: THREE.Bone, degree: THREE.Vector3) => {
	joint.rotation.x = THREE.MathUtils.degToRad(degree.x);
	joint.rotation.y = THREE.MathUtils.degToRad(degree.y);
	joint.rotation.z = THREE.MathUtils.degToRad(degree.z);
};

export const setPose = (idx: number, bones: THREE.Bone[]) => {
	if (idx === -1) {
		bones.forEach(joint => {
			moveJoint(joint, new THREE.Vector3(0, 0, 0));
		});

		return;
	};

	const pose = POSE[idx];
	const names = Object.keys(pose);

	// init rotation of joints
	bones.forEach(joint => {
		const name = joint.name.split(PREFIX)[1];
		const degree = (names.indexOf(name) === -1) ?
			new THREE.Vector3(0, 0, 0) :
			new THREE.Vector3(...pose[name])
	
		moveJoint(joint, degree);
	});
};