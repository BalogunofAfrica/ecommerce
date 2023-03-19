import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

export function Footer() {
  return (
    <div className="footer-container">
      <p>2023 Biggas HeadPhones All rights reserved</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
}
