import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import { Flex, Box } from '@react-three/flex';

function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/car.gltf');
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    Object.keys(actions).forEach((action) => {
      if ({}.hasOwnProperty.call(actions, action)) {
        actions[action].play();
      }
    });
  });

  useFrame(() => {
    mixer.update(0.005);
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        name="car"
        position={[0.22, 1.23, 0.07]}
        rotation={[0.38, 0, 0.03]}
      >
        <mesh
          material={materials.car_main}
          geometry={nodes.car_object.geometry}
        />
        <mesh
          material={materials.car_secondary_color}
          geometry={nodes.car_object_1.geometry}
        />
        <mesh
          material={materials.car_metal}
          geometry={nodes.car_object_2.geometry}
        />
        <mesh
          material={materials.car_windows}
          geometry={nodes.car_object_3.geometry}
        />
        <mesh
          material={materials.car_license}
          geometry={nodes.car_object_4.geometry}
        />
        <mesh
          material={materials.luggage_brown}
          geometry={nodes.car_object_5.geometry}
        />
        <mesh
          material={materials.luggage_blue}
          geometry={nodes.car_object_6.geometry}
        />
        <mesh
          material={materials.luggage_yellow}
          geometry={nodes.car_object_7.geometry}
        />
        <mesh
          material={materials.car_head_lights}
          geometry={nodes.car_object_8.geometry}
        />
        <mesh
          material={materials.car_back_lights}
          geometry={nodes.car_object_9.geometry}
        />
        <mesh
          material={materials.car_indicators}
          geometry={nodes.car_object_10.geometry}
        />
        <mesh
          material={materials.car_rope}
          geometry={nodes.car_object_11.geometry}
        />
        <mesh
          material={materials.car_black}
          geometry={nodes.car_object_12.geometry}
        />
        <mesh
          material={materials.car_rust}
          geometry={nodes.car_object_13.geometry}
        />
        <group
          name="nozzle_back_left"
          position={[0.72, -0.45, -0.98]}
          rotation={[0.54, 0.08, -1.42]}
        >
          <mesh
            material={materials.car_main}
            geometry={nodes.nozzle_back_left_object.geometry}
          />
          <mesh
            material={materials.car_metal}
            geometry={nodes.nozzle_back_left_object_1.geometry}
          />
          <mesh
            material={materials.default}
            geometry={nodes.nozzle_back_left_object_2.geometry}
          />
          <mesh
            material={materials.car_burned}
            geometry={nodes.nozzle_back_left_object_3.geometry}
          />
          <mesh
            name="fire_back_left"
            material={materials.fire}
            geometry={nodes.fire_back_left.geometry}
            position={[0.25, -0.01, 0]}
          />
        </group>
        <group
          name="nozzle_back_right"
          position={[-0.59, -0.45, -0.98]}
          rotation={[-2.83, -0.09, -1.5]}
        >
          <mesh
            material={materials.car_main}
            geometry={nodes.nozzle_back_right_object.geometry}
          />
          <mesh
            material={materials.car_metal}
            geometry={nodes.nozzle_back_right_object_1.geometry}
          />
          <mesh
            material={materials.default}
            geometry={nodes.nozzle_back_right_object_2.geometry}
          />
          <mesh
            material={materials.car_burned}
            geometry={nodes.nozzle_back_right_object_3.geometry}
          />
          <mesh
            name="fire_back_right"
            material={materials.fire}
            geometry={nodes.fire_back_right.geometry}
            position={[-0.27, 0.01, 0]}
          />
        </group>
        <group
          name="nozzle_front_left"
          position={[0.7, -0.41, 1.15]}
          rotation={[0.5, 0.19, -1.42]}
        >
          <mesh
            material={materials.car_main}
            geometry={nodes.nozzle_front_left_object.geometry}
          />
          <mesh
            material={materials.car_metal}
            geometry={nodes.nozzle_front_left_object_1.geometry}
          />
          <mesh
            material={materials.default}
            geometry={nodes.nozzle_front_left_object_2.geometry}
          />
          <mesh
            material={materials.car_rust}
            geometry={nodes.nozzle_front_left_object_3.geometry}
          />
          <mesh
            material={materials.car_burned}
            geometry={nodes.nozzle_front_left_object_4.geometry}
          />
          <mesh
            name="fire_front_left"
            material={materials.fire}
            geometry={nodes.fire_front_left.geometry}
            position={[0.25, 0.01, 0.02]}
          />
        </group>
        <group
          name="nozzle_front_right"
          position={[-0.58, -0.41, 1.15]}
          rotation={[-2.82, -0.02, -1.26]}
        >
          <mesh
            material={materials.car_main}
            geometry={nodes.nozzle_front_right_object.geometry}
          />
          <mesh
            material={materials.car_metal}
            geometry={nodes.nozzle_front_right_object_1.geometry}
          />
          <mesh
            material={materials.default}
            geometry={nodes.nozzle_front_right_object_2.geometry}
          />
          <mesh
            material={materials.car_burned}
            geometry={nodes.nozzle_front_right_object_3.geometry}
          />
          <mesh
            name="fire_front_right"
            material={materials.fire}
            geometry={nodes.fire_front_right.geometry}
            position={[-0.25, -0.01, -0.02]}
          />
        </group>
      </group>
    </group>
  );
}

function Car() {
  return (
    <div className="model">
      <Canvas camera={{ position: [4, 1.6, 1] }}>
        <ambientLight intensity={0.1} />
        <pointLight intensity="1" position={[10, 10, 10]} />
        <pointLight intensity="1" position={[-10, 10, 10]} />
        <Suspense fallback={null}>
          <Flex justifyContent="center" alignContent="center">
            <Box centerAnchor>
              <Model />
            </Box>
          </Flex>
        </Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

export default Car;
