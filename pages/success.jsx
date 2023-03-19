import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useStoreContext } from "../context/store-context";
import { runFireworks } from "../lib/utils";

export default function Success() {
  const { actions } = useStoreContext();

  useEffect(() => {
    localStorage.clear();
    actions.resetStore();

    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your purchase!</h2>
        <p className="email-msg">Check your email inbox for your receipt</p>
        <p className="description">
          If you have any questions, please email
          <a
            target="_blank"
            rel="noreferrer"
            className="email"
            href="mailto:darkbubblelinks.k@gmail.com"
          >
            darkbubblelinks.k@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn">
            Continue shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
