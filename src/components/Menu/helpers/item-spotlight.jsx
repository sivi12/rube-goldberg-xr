import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import { Spotlight } from "../shelf-interface/shelf-3D-models/Spotlight";
import { SpotLight } from "three";

export default function SelectedItemSpolight({ currentItem, refObjects }) {
  const fontUrl = "/Fonts/RobotoSlab.ttf";

  const [position, setPosition] = useState([0, 0, 0]);
  const [lightPosition, setLightPosition] = useState([0, 0, 0]);

  const spotlight = useMemo(() => new SpotLight("#fff"), []);
  useEffect(() => {
    if (currentItem === "domino") {
      setPosition([-0.16, 0.563, 0]);
      setLightPosition([0, -0.1, 0.017]);
    }
    if (currentItem === "book") {
      setPosition([0.16, 0.563, 0]);
      setLightPosition([0, -0.1, 0.017]);
    }
    if (currentItem === "ball") {
      setPosition([-0.16, 0.25, 0]);
      setLightPosition([0, -0.1, 0.017]);
    }
    if (currentItem === "trampoline") {
      setPosition([0.16, 0.25, 0]);
      setLightPosition([0.0, -0.1, 0.017]);
    }
    if (currentItem === "golfTee") {
      setPosition([-0.16, -0.063, 0]);
    }
    if (currentItem === "pipe") {
      setPosition([0.16, -0.063, 0]);
    }

    if (currentItem === "cannon") {
      setPosition([-0.16, -0.38, 0]);
    }
  }, [currentItem]);

  return (
    <>
      <group position={position}>
        {currentItem && <Spotlight />}

        <group>
          <primitive
            object={spotlight}
            position={[-0, 0, 0]}
            intensity={0.15}
            penumbra={1.9}
            distance={0.5}
            angle={0.5}
            color={"#FFF5E1"}
            castShadow
          />
          <primitive object={spotlight.target} position={lightPosition} />
        </group>
        {/* <spotLight
          ref={spotLightRef}
          position={[0.3, 0, -1]}
          angle={0.1}
          penumbra={0.5}
          intensity={10}
          castShadow
        /> */}

        {/* <Text
        position={[0, 0.17, 0]}
        fontSize={0.017}
        color="white"
        font={fontUrl}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
      >
        {`${currentItem} selected`}
      </Text> */}
      </group>
    </>
  );
}
