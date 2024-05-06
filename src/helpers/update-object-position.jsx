// Funktion zur Aktualisierung der Position eines bestimmten Würfels
export function updatePosition(cubes, index, type, newPosition, newRoation) {
  return cubes.map((cube, i) => {
    if (i === index) {
      return {
        ...cube,
        position: newPosition,
        rotation: newRoation,
        mass: 0,
        type: type,
      };
    }
    return cube;
  });
}

export function updateType(cubes, index, type) {
  console.log("updateType");
  return cubes.map((cube, i) => {
    if (i === index) {
      return {
        ...cube,
        mass: 10,
        type: type,
      };
    }
    return cube;
  });
}
