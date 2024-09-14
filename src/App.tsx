import Courses from "./components/Courses"
import CheckOut from "./components/checkOut";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
						<Route index element={<Courses />} />
						<Route path="checkout" element={<CheckOut />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
