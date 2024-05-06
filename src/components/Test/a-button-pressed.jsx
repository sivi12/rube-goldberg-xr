import { useState, useEffect } from "react";

export function useAButton(controller, handler) {
  useEffect(() => {
    let interval = setInterval(() => {
      if (
        controller &&
        controller.inputSource &&
        controller.inputSource.gamepad
      ) {
        const aButton = controller.inputSource.gamepad.buttons[4];
        if (aButton.pressed) {
          console.log("pressed");

          if (handler) {
            handler();
          }
        }
      }
    }, 200); // Überprüfe alle 100ms

    return () => clearInterval(interval);
  }, [controller]);
}
