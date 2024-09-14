import React from "react";
import { useLocation } from "react-router-dom";

function CheckOut() {
    const location = useLocation();
    const cartContents = location.state.sharedState; // This accesses the shared state

    return (
        <>
            <h1>Checkout</h1>
            {cartContents.length === 0 && <p>Your cart is empty!</p>}
            {cartContents.map((items, index) => (
                <p key={index}>{items}</p>
            ))}
        </>
    );
}

export default CheckOut;
