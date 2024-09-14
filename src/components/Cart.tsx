import { useState } from "react"
import { Outlet, Link } from "react-router-dom";


const Cart = (props) => {
	// const [cart, updateCart] = useState([props.cartContents]);
	return (
		<div
			style={{
				border: "1px solid rgba(0, 0, 0, 0.1)",
				padding: "1rem",
				marginBottom: "1.5rem",
				borderRadius: "4px",
			}}>
			<h4>Course Cart</h4>

			{props.sharedState.length === 0 && <p>Your cart is currently empty!</p>}
			{props.sharedState.map((items) =>
				<p>{items}</p>
			)}
			<Link to = "/checkout" state={props}><button onClick={checkOut}>Check out Cart</button></Link>
		</div>
	)
}

function checkOut() {

}



export default Cart
