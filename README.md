# three-demo

이 레포지토리는 [three.js의 아바타 데모](https://threejs.org/examples/#webgl_animation_skinning_additive_blending)를 react-three-fiber로 구현한 것입니다.



## getting started with yarn

```bash
git clone https://github.com/leegwae/three-demo.git
cd three-demo
yarn install
yarn start
```

go to http://localhost:3000/



## 폴더 구조

```
public
|--XBot.glb : glft model file
src
|--App.tsx : react-three-fiber Canvas JSX Element
|--index.tsx : App을 html에 주입
|--components: 컴포넌트들
	|--cameraControls: 카메라
	|--cube: react-three-fiber getting started cube example
	|--model: public의 glft model을 불러오는 컴포넌트 (gltfjsx를 이용하여 자동 생성)
	|--plane: plane으로 사용하기 위해 만든 오브젝트
|--functions.tsx: model을 다루기 위한 setPose 함수 정의
```



## 사용하고 있는 모델

- [https://threejs.org/examples/#webgl_animation_skinning_additive_blending](https://threejs.org/examples/#webgl_animation_skinning_additive_blending)
- 모델의 `bone` 이름들
  - `mixamorig${부위이름}`
  - 카멜케이스
  - 67개

```jsx
[
    "mixamorigHips",
    "mixamorigSpine",
    "mixamorigSpine1",
    "mixamorigSpine2",
    "mixamorigNeck",
    "mixamorigHead",
    "mixamorigHeadTop_End",
    "mixamorigLeftEye",
    "mixamorigRightEye",
    "mixamorigLeftShoulder",
    "mixamorigLeftArm",
    "mixamorigLeftForeArm",
    "mixamorigLeftHand",
    "mixamorigLeftHandThumb1",
    "mixamorigLeftHandThumb2",
    "mixamorigLeftHandThumb3",
    "mixamorigLeftHandThumb4",
    "mixamorigLeftHandIndex1",
    "mixamorigLeftHandIndex2",
    "mixamorigLeftHandIndex3",
    "mixamorigLeftHandIndex4",
    "mixamorigLeftHandMiddle1",
    "mixamorigLeftHandMiddle2",
    "mixamorigLeftHandMiddle3",
    "mixamorigLeftHandMiddle4",
    "mixamorigLeftHandRing1",
    "mixamorigLeftHandRing2",
    "mixamorigLeftHandRing3",
    "mixamorigLeftHandRing4",
    "mixamorigLeftHandPinky1",
    "mixamorigLeftHandPinky2",
    "mixamorigLeftHandPinky3",
    "mixamorigLeftHandPinky4",
    "mixamorigRightShoulder",
    "mixamorigRightArm",
    "mixamorigRightForeArm",
    "mixamorigRightHand",
    "mixamorigRightHandPinky1",
    "mixamorigRightHandPinky2",
    "mixamorigRightHandPinky3",
    "mixamorigRightHandPinky4",
    "mixamorigRightHandRing1",
    "mixamorigRightHandRing2",
    "mixamorigRightHandRing3",
    "mixamorigRightHandRing4",
    "mixamorigRightHandMiddle1",
    "mixamorigRightHandMiddle2",
    "mixamorigRightHandMiddle3",
    "mixamorigRightHandMiddle4",
    "mixamorigRightHandIndex1",
    "mixamorigRightHandIndex2",
    "mixamorigRightHandIndex3",
    "mixamorigRightHandIndex4",
    "mixamorigRightHandThumb1",
    "mixamorigRightHandThumb2",
    "mixamorigRightHandThumb3",
    "mixamorigRightHandThumb4",
    "mixamorigLeftUpLeg",
    "mixamorigLeftLeg",
    "mixamorigLeftFoot",
    "mixamorigLeftToeBase",
    "mixamorigLeftToe_End",
    "mixamorigRightUpLeg",
    "mixamorigRightLeg",
    "mixamorigRightFoot",
    "mixamorigRightToeBase",
    "mixamorigRightToe_End"
]
```



## 모델의 포즈 설정하기

- `components\model\index.tsx` Line 33: `setPose` 첫번째 인수에 [포즈 인덱스] 참고해서 인덱스 정수값 전달하기
- (10/5) [[Avatar] Display model at main #2](https://github.com/syd03098/21fall-electron-project/pull/2)
  - `src\routes\MainRoutes.tsx` Line 20: `Model`의 `props` `index` 에 [포즈 인덱스] 참고해서 인덱스 정수값 전달하기
  - `src\library\functions.ts`Line 34: `setPose(index, bones)` 와 `POSE` 참고



### 포즈 인덱스

- `POSE` 변수에 저장

  - `-1` : 디폴트

    ![default](https://user-images.githubusercontent.com/57662010/166344661-465788b7-043f-449b-a69b-1bda58a5b480.png)

  - `0` : 대자

    ![0](https://user-images.githubusercontent.com/57662010/166344655-293c00d4-6d3a-4050-ab3d-7cca16582b16.png)

  - `1` : 손바닥 챱

    - 모델 어깨가 좁아서 이상해요

    ![1](https://user-images.githubusercontent.com/57662010/166344660-ae17a70a-907b-461a-a917-ae154874b769.png)



## rotation의 이해

- `src\components\functions.tsx` 참고

```jsx
rotation.x = THREE.MathUtils.degToRad(각도);
```



#### 예시) 왼쪽 다리 돌려보기

```jsx
joint.rotation.x = THREE.MathUtils.degToRad(90);
```

![x](https://user-images.githubusercontent.com/57662010/166344663-71f51e90-9268-4f28-b6b5-8bda2ce61b91.png)

```jsx
joint.rotation.y = THREE.MathUtils.degToRad(90);
```

![y](https://user-images.githubusercontent.com/57662010/166344665-a966a00e-58bb-415d-b9da-09e9e9da8b32.png)

```jsx
joint.rotation.z = THREE.MathUtils.degToRad(90);
```

![z](https://user-images.githubusercontent.com/57662010/166344652-fad17a5b-0f78-4073-b8c7-61f82b148a37.png)

