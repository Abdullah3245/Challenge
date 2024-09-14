import Nav from "./Nav"
import courses from "../data/courses.json"
import React, { useState } from "react"
import Cart from "./Cart"

const Courses = () => {
	const initialCartState = courses.map(() => false) // Initialize cart state for each course
	const [cartContents, updateCart] = useState([])
	const [search, setSearch] = useState('');
	const [cart, setCart] = useState(initialCartState)
	const initialDescriptionVisible = courses.map(() => false); // Initialize description visibility state for each course
	const [descriptionVisible, setDescriptionVisible] = useState(initialDescriptionVisible);

	const handleToggleCartClick = (courseIndex: number, dept: string, number: number) => {
		const updatedCart = [...cart]
		updatedCart[courseIndex] = !updatedCart[courseIndex] // Toggle the state

		if (cartContents.length === 7) {
			alert("Cannot add more courses");
		}
		if (updatedCart[courseIndex] && cartContents.length < 8) {
			updateCart(cartContents => {
				//adding course to array
				return [...cartContents, `${dept} ${number}`];
			})
		} else {
			updateCart(cartContents =>
				//removing course from array
				cartContents.filter((course) => course !== `${dept} ${number}`)
			);
		}

		setCart(updatedCart)
		// if (!updatedCart[courseIndex]) {
		// 	alert("Removed from Cart")
		// }
		console.log(cartContents);
	}

	//displaying the course when they are clicked
	const displayDescription = (courseIndex: number) => {
		const updatedDescriptionVisible = [...descriptionVisible];
		updatedDescriptionVisible[courseIndex] = !updatedDescriptionVisible[courseIndex];
		setDescriptionVisible(updatedDescriptionVisible);
	}

	//getting the input value from form and updating the search variable
	function handleChange(event) {
		setSearch(event.target.value);
	}

	return (
		<>
			<div
				style={{
					width: "100%",
					boxSizing: "border-box",
					padding: "0 calc(1rem + 10%)",
				}}></div>
			<Nav />
			<form>
				<label>Search Course </label>
				<input
					placeholder="CIS 110"
					onChange={handleChange}
					value={search}>
				</input>
			</form>
			{courses //filtering courses based on the search result
				.filter((item) => {
					const searchTerm = search.toLowerCase();
					return searchTerm === '' ||
						searchTerm.includes(item.number.toString()) ||
						searchTerm.includes(item.title.toLowerCase()) ||
						item.description.toLowerCase().includes(searchTerm);
				})
				.map(
					(
						{
							dept,
							number,
							title,
							description,
							prereqs,
							"cross-listed": crossListed,
						},
						index
					) => (
						<div key={`${dept}-${number}`}>
							<br />
							<b>
								<div className="description" onClick={() => displayDescription(index)}>
									{dept} {number}: {title}
								</div>
							</b>
							<br />
							{descriptionVisible[index] && description}
							{prereqs && prereqs.length > 0 && (
								<>
									<br />
									<i>
										{" "}
										Prerequisites:{" "}
										{Array.isArray(prereqs) ? prereqs.join(", ") : prereqs}{" "}
									</i>
								</>
							)}
							{crossListed && crossListed.length > 0 && (
								<>
									<br />
									Cross-listed: {crossListed.join(", ")}
								</>
							)}
							<div>
								{descriptionVisible[index] && (
									<button onClick={() => handleToggleCartClick(index, dept, number)}>
										{cart[index] ? "Remove from Cart" : "Add to Cart"}
									</button>
								)}


							</div>
						</div>
					)
				)}
			<Cart sharedState={cartContents}></Cart>
		</>
	)
}

export default Courses
