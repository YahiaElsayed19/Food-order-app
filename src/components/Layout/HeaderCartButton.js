import React, { useContext, useEffect, useState } from "react";
import cartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCardButton = (props) => {
    const [buttonIsHighlghted, setButtonIsHighlghted] = useState(false)
    const cartCtx = useContext(cartContext);
    const { items } = cartCtx
    const numOFCartItems = cartCtx.items.reduce(
        (curNumber, item) => curNumber + item.amount,
        0
    );
    const btnClasses = `${classes.button} ${buttonIsHighlghted && classes.bump}`

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return
        }
        setButtonIsHighlghted(true)
        const timer = setTimeout(() => { setButtonIsHighlghted(false) }, 300)
        return () => {
            clearTimeout(timer)
        }
    }
        , [items])
    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon></CartIcon>
            </span>
            <span >Your Cart</span>
            <span className={classes.badge}>{numOFCartItems}</span>
        </button>
    );
};
export default HeaderCardButton;
