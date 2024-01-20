import { Divider } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div>
      <Divider />
      <p
        style={{
          textAlign: "right",
          marginRight: "1rem",
        }}
      >
        &copy; 2023 TheoryMusic
      </p>
    </div>
  );
};

export default Footer;
