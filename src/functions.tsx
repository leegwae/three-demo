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