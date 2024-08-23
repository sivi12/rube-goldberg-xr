// Funktion zur Aktualisierung der Position eines bestimmten Objekts
export function updatePosition(items, index, newPosition, newRoation) {
  return items.map((cube, i) => {
    if (i === index) {
      return {
        ...cube,
        position: newPosition,
        rotation: newRoation,
        mass: 0,
      };
    }
    return cube;
  });
}

export function updateType(items, index, type) {
  console.log("updateType");
  return items.map((cube, i) => {
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
