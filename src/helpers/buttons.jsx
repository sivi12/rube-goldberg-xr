import { useState, useEffect } from "react";

export function useButton(controller, button, handler) {
  useEffect(() => {
    let interval = setInterval(() => {
      if (
        controller &&
        controller.inputSource &&
        controller.inputSource.gamepad
      ) {
        const aButton = controller.inputSource.gamepad.buttons[4];
        const bButton = controller.inputSource.gamepad.buttons[5];
        if ((button === "a" || button === "x") && aButton.pressed) {
          console.log("a pressed");

          if (handler) {
            handler();
          }
        }
        if ((button === "b" || button === "y") && bButton.pressed) {
          console.log("b pressed");

          if (handler) {
            handler();
          }
        }
      }
    }, 200); // Überprüfe alle 100ms

    return () => clearInterval(interval);
  }, [controller]);
}
