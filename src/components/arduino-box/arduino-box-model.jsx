import React, { useEffect, useState } from "react";
import { MarkerManModel } from "./Marker-Man/marker-man-model";
import ConnectToArduino from "../../helpers/connectToArduino";
import { useButton } from "../../helpers/buttons";
import { useController } from "@react-three/xr";
import { useBox } from "@react-three/cannon";
import { ButtonModel } from "./Button";

function ArduinoBoxModel({ startGame, position, rotation, onRef, size }) {
  const [currentAnimation, setCurrentAnimation] = useState("sittingIdle");
  const ref = React.useRef();

  //Collison-box for the Arduino-box
  const [boxRef, boxApi] = useBox(() => ({
    type: "Static",
    args: size,
    position: [position],
    rotation: [0, rotation[1], 0],
  }));

  useEffect(() => {
    boxApi.position.set(position[0], position[1] - 0.07, position[2]);
    boxApi.rotation.set(0, rotation[1], 0);
  }, [position, boxApi.position, boxApi]);

  useEffect(() => {
    onRef(ref);
  }, [ref, onRef]);

  useEffect(() => {
    //später ändern dass nur wenn startgame==flase dann
    if (!startGame) {
      setCurrentAnimation("sittingIdle");
    }
  }, [startGame]);

  // const rightController = useController("right");
  // useButton(rightController, "a", () => {
  //   setCurrentAnimation(true);
  // });

  return (
    <>
      <group position={position} rotation={[0, rotation[1], 0]}>
        <mesh ref={ref} position={[0, -0.07, 0]}>
          <boxGeometry args={size} />
          <meshStandardMaterial color="red" transparent={true} opacity={0.3} />
        </mesh>

        <MarkerManModel
          currentAnimation={currentAnimation}
          startGame={startGame}
        />

        <ButtonModel
          position={position}
          rotation={rotation}
          setCurrentAnimation={setCurrentAnimation}
          startGame={startGame}
        />
        <ConnectToArduino
          currentAnimation={currentAnimation}
          setCurrentAnimation={setCurrentAnimation}
          startGame={startGame}
        />
      </group>
    </>
  );
}

export default ArduinoBoxModel;
