import { createContext, useContext, useReducer, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const useStoreContext = () => {
  return useContext(Context);
};

const initialState = {
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
};
export function StateContext({ children }) {
  const [store, setStore] = useReducer(
    (current, update) => ({
      ...current,
      ...update,
    }),
    initialState
  );

  let foundProduct;
  let index;

  const actions = {
    resetStore: () => setStore(initialState),
    onRemove: (id) => {
      foundProduct = store.cartItems.find((item) => item._id === id);
      setStore({
        cartItems: store.cartItems.filter((item) => item._id !== id),
        totalPrice:
          store.totalPrice - foundProduct.price * foundProduct.quantity,
        totalQuantities: store.totalQuantities - foundProduct.quantity,
      });
    },

    toggleCart: (value) => {
      setStore({
        showCart: typeof value !== "boolean" ? !store.showCart : value,
      });
    },
    toggleCartItemQuantity: (id, value) => {
      foundProduct = store.cartItems.find((item) => item._id === id);
      index = store.cartItems.findIndex((item) => item._id === id);

      if (value === "inc") {
        setStore({
          cartItems: store.cartItems.map((item) => {
            if (item._id === id) {
              return { ...item, quantity: foundProduct.quantity + 1 };
            }

            return item;
          }),
          totalPrice: store.totalPrice + foundProduct.price,
          totalQuantities: store.totalQuantities + 1,
        });
      } else if (value === "dec") {
        if (foundProduct.quantity > 1) {
          setStore({
            cartItems: store.cartItems.map((item) => {
              if (item._id === id) {
                return { ...item, quantity: foundProduct.quantity - 1 };
              }

              return item;
            }),
            totalPrice: store.totalPrice - foundProduct.price,
            totalQuantities: store.totalQuantities - 1,
          });
        }
      }
    },
    decQty: () => {
      setStore({
        qty: store.qty - 1 < 1 ? 1 : store.qty - 1,
      });
    },
    incQty: () => {
      setStore({
        qty: store.qty + 1,
      });
    },
    onAdd: (product, quantity) => {
      const isProductInCart = store.cartItems.find(
        (item) => item._id === product._id
      );

      const cartItems = isProductInCart
        ? store.cartItems.map((item) => {
            if (item._id === product._id)
              return {
                ...item,
                quantity: item.quantity + quantity,
              };

            return item;
          })
        : [
            ...store.cartItems,
            {
              ...product,
              quantity,
            },
          ];

      setStore({
        totalPrice: store.totalPrice + product.price * quantity,
        totalQuantities: store.totalQuantities + quantity,
        cartItems,
      });
      toast.success(`${quantity} ${product.name} added to cart.`);
    },
  };

  return (
    <Context.Provider
      value={{
        store,
        actions,
      }}
    >
      {children}
    </Context.Provider>
  );
}
