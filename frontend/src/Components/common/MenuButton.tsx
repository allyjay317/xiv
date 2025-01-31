import { useMemo, useState } from "react";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

type TButton = {
  type: "button";
};

type TIconButton = {
  type: "icon";
  img: string;
  color: string;
};

export function MenuButton({
  label,
  style,
  state,
  menuItems,
  direction = "up",
  width = "100px",
  menuWidth = "100px",
  config = { type: "button" },
}: {
  label: string;
  style?: React.CSSProperties;
  state?: "default" | "disabled";
  menuItems: Array<{
    label: string | React.ReactNode;
    onClick: VoidFunction;
  }>;
  direction?: "up" | "down" | "left" | "right";
  width?: string;
  menuWidth?: string;
  config?: TButton | TIconButton;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const menuStyles: React.CSSProperties = useMemo(() => {
    switch (direction) {
      case "down":
        return {
          bottom: -48 * menuItems.length,
        };
      case "left":
        return {
          left: `-${menuWidth}`,
          top: 0,
        };
      case "right":
        return {
          right: `-${menuWidth}`,
          top: 0,
        };
      case "up":
        return {
          top: -48 * menuItems.length,
          flexDirection: "column-reverse",
        };
    }
  }, [direction]);

  const Component = useMemo(() => {
    switch (config.type) {
      case "button":
        return (
          <Button
            label={label}
            onClick={() => setIsOpen(!isOpen)}
            state={state}
            width={width}
            style={style}
          />
        );
      case "icon":
        return (
          <IconButton
            label="User Menu"
            color={config.color}
            src={config.img}
            onClick={() => setIsOpen(!isOpen)}
          />
        );
    }
  }, [config.type, isOpen, state, width, style, label, setIsOpen]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {Component}
      {isOpen && (
        <>
          <div
            style={{
              position: "absolute",
              backgroundColor: "white",
              width: menuWidth,
              zIndex: "200",
              display: "flex",
              flexDirection: "column",
              ...menuStyles,
            }}
            color="white"
          >
            {menuItems.map((mi) => {
              if (typeof mi.label === "string") {
                return (
                  <Button
                    label={mi.label}
                    onClick={mi.onClick}
                    width={menuWidth}
                  />
                );
              } else {
                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      mi.onClick();
                    }}
                  >
                    {mi.label}
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
}
