import { useStoreContext } from "../context/store-context";
import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./cart";

export function NavBar() {
  const { store, actions } = useStoreContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Biggas Headphones</Link>
      </p>
      <button className="cart-icon" type="button" onClick={actions.toggleCart}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{store.totalQuantities}</span>
      </button>
      {store.showCart && <Cart />}
    </div>
  );
}
