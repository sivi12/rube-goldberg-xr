// Funktion zur Aktualisierung der Position eines bestimmten Würfels
export function updatePosition(cubes, index, newPosition, newRoation) {
  return cubes.map((cube, i) => {
    if (i === index) {
      return {
        ...cube,
        position: newPosition,
        rotation: newRoation,
        mass: 0,
        type: "Static",
      };
    }
    return cube;
  });
}
