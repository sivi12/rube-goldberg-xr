import { useController } from "@react-three/xr";
import { useButton } from "./buttons";

export default function RemoveLastItem({ items, setItems }) {
  const leftController = useController("left");

  useButton(
    leftController,
    "y",
    () => {
      console.log(items.length);
      if (leftController && items.length > 0) {
        setItems(items.slice(0, -1));
      }
    },
    items,
    setItems
  );
}
