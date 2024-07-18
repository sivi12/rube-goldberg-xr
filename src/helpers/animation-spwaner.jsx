import { useController, useXREvent } from "@react-three/xr";
import { DanceModel } from "../Dance";

function AnimationSpwaner({
  model,
  showObject,
  animationObjekt,
  setAnimationObjekt,
}) {
  const rightController = useController("right");
  useXREvent(
    "selectstart",
    () => {
      if (rightController && rightController.controller) {
        const position = rightController.controller.position.toArray();
        //const rotation = rightController.controller.rotation.toArray();

        const rotationZ = rightController.controller.rotation.toArray()[2];
        const rotation = [Math.PI / 2, 0, rotationZ];

        if (
          model === "startAnimation" &&
          showObject === "startAnimation" &&
          animationObjekt.length < 3
        ) {
          // console.log(animationObjekt);
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

  if (model === "startAnimation") {
    // handleReff();
    return (
      <>
        {animationObjekt.map((objekt, index) => (
          <DanceModel
            key={index}
            position={objekt.position}
            rotation={objekt.rotation}
            onRef={(ref) => (objekt.api = ref)}
          />
        ))}
      </>
    );
  }
}

export default AnimationSpwaner;
