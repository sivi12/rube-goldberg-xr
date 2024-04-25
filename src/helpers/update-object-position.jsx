// Funktion zur Aktualisierung der Position eines bestimmten Würfels
export function updatePosition(cubes, index, newPosition) {
  return cubes.map((cube, i) => {
    if (i === index) {
      return {
        ...cube,
        position: newPosition,
      };
    }
    return cube;
  });
}
