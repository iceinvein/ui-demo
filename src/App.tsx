import { Route, Routes } from "react-router-dom";
import IndexPage from "@/pages/index";

function App() {
	return (
		<Routes>
			<Route element={<IndexPage />}>
				<Route index />
				<Route path="component/:componentId" />
			</Route>
		</Routes>
	);
}

export default App;
