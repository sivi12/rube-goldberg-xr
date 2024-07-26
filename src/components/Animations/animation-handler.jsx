import { useState } from "react";
import AnimationSpwaner from "../../helpers/animation-spwaner";
import { ObjectSelector } from "../../helpers/object-selcetor";

export function AnimatedModel({
  showObject,
  arduinoButtonPressed,
  model = "",
}) {
  const [animationObjekt, setAnimationObjekt] = useState([]);

  return (
    <>
      {" "}
      <AnimationSpwaner
        model={model}
        animationObjekt={animationObjekt}
        setAnimationObjekt={setAnimationObjekt}
        showObject={showObject}
        arduinoButtonPressed={arduinoButtonPressed}
      />
      <ObjectSelector cubes={animationObjekt} setCubes={setAnimationObjekt} />
    </>
  );
}
