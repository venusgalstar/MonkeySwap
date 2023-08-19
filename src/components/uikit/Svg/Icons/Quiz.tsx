import React from "react";
import { SvgProps, rotation } from "./types";

const Quiz: React.FC<SvgProps> = ({ direction = "right", color = "text", width, getStyles }) => {
  const deg: rotation = {
    left: 180,
    up: 270,
    right: 0,
    down: 90,
  };
  const style = getStyles({
    degree: deg[direction as keyof rotation],
    color,
  });

  return (
    <svg width={width || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" sx={style}>
      <path
        d="M13.4175 15.15C13.6725 15.15 13.89 15.06 14.07 14.88C14.25 14.7 14.34 14.4825 14.34 14.2275C14.34 13.9725 14.25 13.755 14.07 13.575C13.89 13.395 13.6725 13.305 13.4175 13.305C13.1625 13.305 12.945 13.395 12.765 13.575C12.585 13.755 12.495 13.9725 12.495 14.2275C12.495 14.4825 12.585 14.7 12.765 14.88C12.945 15.06 13.1625 15.15 13.4175 15.15ZM12.855 12.315H13.9125C13.9425 11.88 14.0062 11.5575 14.1037 11.3475C14.2012 11.1375 14.445 10.845 14.835 10.47C15.24 10.08 15.5212 9.73875 15.6787 9.44625C15.8362 9.15375 15.915 8.8125 15.915 8.4225C15.915 7.7325 15.6788 7.17 15.2062 6.735C14.7337 6.3 14.115 6.0825 13.35 6.0825C12.78 6.0825 12.27 6.23625 11.82 6.54375C11.37 6.85125 11.04 7.2825 10.83 7.8375L11.8425 8.265C12.0075 7.89 12.2137 7.605 12.4612 7.41C12.7087 7.215 13.005 7.1175 13.35 7.1175C13.8 7.1175 14.1637 7.245 14.4412 7.5C14.7187 7.755 14.8575 8.0775 14.8575 8.4675C14.8575 8.7675 14.79 9.03 14.655 9.255C14.52 9.48 14.28 9.72 13.935 9.975C13.455 10.41 13.155 10.7587 13.035 11.0212C12.915 11.2838 12.855 11.715 12.855 12.315ZM7.05 18.3C6.69 18.3 6.375 18.165 6.105 17.895C5.835 17.625 5.7 17.31 5.7 16.95V4.35C5.7 3.99 5.835 3.675 6.105 3.405C6.375 3.135 6.69 3 7.05 3H19.65C20.01 3 20.325 3.135 20.595 3.405C20.865 3.675 21 3.99 21 4.35V16.95C21 17.31 20.865 17.625 20.595 17.895C20.325 18.165 20.01 18.3 19.65 18.3H7.05ZM4.35 21C3.99 21 3.675 20.865 3.405 20.595C3.135 20.325 3 20.01 3 19.65V5.7H4.35V19.65H18.3V21H4.35Z"
        fill="#4D4040"
      />
    </svg>
  );
};

export default Quiz;
