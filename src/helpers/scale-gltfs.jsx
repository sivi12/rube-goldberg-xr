import { useGLTF } from "@react-three/drei";
import { useState } from "react";

export function ScaleGltfs({ setScaledAlready }) {
  const { nodes } = useGLTF("/Models/pipe.glb");
  const { nodes: partyCannonNodes, materials } = useGLTF(
    "/Models/party_cannon.glb"
  );
  const { nodes: golfTeeNodes } = useGLTF("/Models/golf_tee.glb");

  const geometry =
    nodes.SM_TrackModularHalfPipe_LOW_M_TrackModularHalfPipe_LOW_0.geometry.scale(
      0.005,
      0.005,
      0.005
    );

  const geometry2 = partyCannonNodes.Object_4.geometry.scale(0.2, 0.2, 0.2);
  const geometry3 = partyCannonNodes.Object_5.geometry.scale(0.2, 0.2, 0.2);

  const geometry4 = golfTeeNodes.Object_2.geometry.scale(0.07, 0.05, 0.07);
  setScaledAlready(false);
}
