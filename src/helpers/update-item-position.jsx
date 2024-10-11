// Funktion zur Aktualisierung der Position eines bestimmten Objekts
export function updatePosition(items, index, newPosition, newRoation) {
  return items.map((item, i) => {
    if (i === index) {
      return {
        ...item,
        position: newPosition,
        rotation: newRoation,
        mass: 0,
      };
    }
    return item;
  });
}

export function updateType(items, index, type) {
  console.log("updateType");
  return items.map((item, i) => {
    if (i === index) {
      return {
        ...item,
        mass: 10,
        type: type,
      };
    }
    return item;
  });
}
