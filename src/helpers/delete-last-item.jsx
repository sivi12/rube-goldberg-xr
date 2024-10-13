import { useController } from "@react-three/xr";
import { useButton } from "./buttons";

export default function RemoveLastItem({ items, currentItem }) {
  const leftController = useController("left");

  function getItem() {
    const foundItem = items.find((obj) => obj.name === currentItem);
    return foundItem
      ? { item: foundItem.item, setItem: foundItem.setItem }
      : { item: null, setItem: () => {} };
  }

  useButton(
    leftController,
    "y",
    () => {
      if (leftController && getItem().item?.length > 0) {
        getItem().setItem(getItem().item.slice(0, -1));
      }
    },
    items
  );
}
