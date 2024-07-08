import { useState, useEffect } from "react";

export function useButton(controller, button, handler, ...args) {
  useEffect(() => {
    let interval = setInterval(() => {
      if (
        controller &&
        controller.inputSource &&
        controller.inputSource.gamepad
      ) {
        const a_xButton = controller.inputSource.gamepad.buttons[4]; //a wenn der rechte und x wenn linke Controller benutzt wird
        const b_yButton = controller.inputSource.gamepad.buttons[5]; //b wenn der rechte und y wenn linke Controller benutzt wird
        if ((button === "a" || button === "x") && a_xButton.pressed) {
          console.log("a or x pressed");

          if (handler) {
            handler(...args);
          }
        }
        if ((button === "b" || button === "y") && b_yButton.pressed) {
          console.log("b or y pressed");

          if (handler) {
            handler(...args);
          }
        }
      }
    }, 240);

    return () => clearInterval(interval);
  }, [controller, button, handler, args]);
}
