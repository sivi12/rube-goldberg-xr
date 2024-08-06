import { useController, useXREvent } from "@react-three/xr";
import { MarkerManModel } from "../components/Animations/marker-man-model";

function AnimationSpwaner({
  model,
  showObject,
  animationObjekt,
  setAnimationObjekt,
  arduinoButtonPressed,
}) {
  const rightController = useController("right");
  useXREvent(
    "selectstart",
    () => {
      if (rightController && rightController.controller) {
        const position = rightController.controller.position.toArray();
        const rotation = rightController.controller.rotation.toArray();

        // const rotationZ = rightController.controller.rotation.toArray()[2];
        // const rotation = [Math.PI / 2, 0, rotation[2]];

        if (
          model != "" &&
          showObject === "startAnimation" &&
          animationObjekt.length < 3
        ) {
          setAnimationObjekt((prevObjects) => [
            ...prevObjects,
            { position, rotation },
          ]);
        }
      }
    },
    { handedness: "right" }
  );

  const handleReff = () => {
    if (animationObjekt) {
      animationObjekt.map((objekt) => console.log("hello", objekt));
    }
  };

  if (model === "markerMan") {
    return (
      <>
        {animationObjekt.map((objekt, index) => (
          <MarkerManModel
            key={index}
            position={objekt.position}
            rotation={objekt.rotation}
            arduinoButtonPressed={arduinoButtonPressed}
            onRef={(ref) => (objekt.api = ref)}
          />
        ))}
      </>
    );
  }
}

export default AnimationSpwaner;
