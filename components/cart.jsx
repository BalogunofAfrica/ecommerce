import { useStoreContext } from "../context/store-context";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { urlFor } from "../lib/client";
import Link from "next/link";
import { getStripe } from "../lib/get-stripe";

export function Cart() {
  const cartRef = useRef(null);
  const { store, actions } = useStoreContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(store.cartItems),
    });

    if (!response.ok) return;
    const data = await response.json();
    console.log("🚀 ~ file: cart.jsx:32 ~ handleCheckout ~ data:", data);

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({
      sessionId: data.id,
    });
  };

  return (
    <div onClick={actions.toggleCart} className="cart-wrapper" ref={cartRef}>
      <div className="cart-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="cart-heading"
          onClick={actions.toggleCart}
        >
          <AiOutlineLeft />
          <span className="heading">Your cart</span>
          <span className="cart-num-items">
            ({store.totalQuantities} items)
          </span>
        </button>
        {store.cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={actions.toggleCart}
                className="btn"
              >
                Continue shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {store.cartItems.length >= 1 &&
            store.cartItems.map((item, index) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  alt="product"
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            actions.toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            actions.toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => actions.onRemove(item._id)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {store.cartItems.length > 0 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal</h3>
              <h3>${store.totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
