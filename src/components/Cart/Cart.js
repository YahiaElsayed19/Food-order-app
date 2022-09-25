import React, { useContext, useState } from "react";
import cartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setdidSubmit] = useState(false);

    const cartCtx = useContext(cartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };
    const orderHandler = () => {
        setIsCheckout(true);
    };
    const submitOrderHandler = async (userdata) => {
        setIsSubmitting(true);
        const respone = await fetch(
            "https://food-order-app-9a0fc-default-rtdb.firebaseio.com/orders.json",
            {
                method: "POST",
                body: JSON.stringify({
                    user: userdata,
                    orderdItems: cartCtx.items,
                }),
            }
        );
        setIsSubmitting(false);
        setdidSubmit(true);
        cartCtx.clearCart()
    };
    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );
    const modalActions = (
        <div className={classes.actions}>
            <button onClick={props.onClose} className={classes["button--alt"]}>
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );
    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {!isCheckout && modalActions}
            {isCheckout && (
                <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
            )}
        </React.Fragment>
    );
    const isSubmittingModalContent = <p>Sending order data...</p>;
    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully send the Order! </p>
            <div className={classes.actions}>
                <button onClick={props.onClose} className={classes["button"]}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onClick={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    );
};
export default Cart;
