import { useState } from "react";
import { ItemSpawner } from "../../helpers/item-spwaner";
import { ItemSelector } from "../../helpers/item-selcetor";
import RemoveLastItem from "../../helpers/delete-last-item";
import { CannonModel } from "./cannon-model";
import CannonBall from "./cannon-ball";

export default function Cannon({ onRef, position, rotation, startGame }) {
  return (
    <>
      <CannonModel
        onRef={onRef}
        position={position}
        rotation={rotation}
        startGame={startGame}
      />
      {
        <CannonBall
          position={position}
          rotation={rotation}
          startGame={startGame}
        />
      }
    </>
  );
}
