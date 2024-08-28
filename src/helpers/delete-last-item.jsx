import { useController } from "@react-three/xr";
import { useButton } from "./buttons";

export default function RemoveLastItem({ items, currentItem }) {
  const leftController = useController("left");

  function getItem() {
    switch (currentItem) {
      case "cubes":
        return { item: items.cubes, setItem: items.setCubes };
      case "ball":
        return { item: items.ball, setItem: items.setBall };
      case "book":
        return { item: items.book, setItem: items.setBook };
      case "pipe":
        return { item: items.pipe, setItem: items.setPipe };
      case "cannon":
        return { item: items.cannon, setItem: items.setCannon };
      case "golfTee":
        return { item: items.golfTee, setItem: items.setGolfTee };
      case "trampoline":
        return { item: items.trampoline, setItem: items.setTrampoline };
      case "arduinoBox":
        return { item: items.arduinoBox, setItem: items.setArduinoBox };
      default:
        return { item: null, setState: () => {} }; // Standardfall, falls currentItem keinen gültigen Wert hat
    }
  }

  useButton(
    leftController,
    "y",
    () => {
      console.log(getItem().item.length);
      if (leftController && getItem().item.length > 0) {
        getItem().setItem(getItem().item.slice(0, -1));
      }
    },
    items
  );
}
