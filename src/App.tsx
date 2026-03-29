import { Route, Routes } from "react-router-dom";
import IndexPage from "@/pages/index";

function App() {
	return (
		<Routes>
			<Route element={<IndexPage />}>
				<Route index element={null} />
				<Route path="component/:componentId" element={null} />
			</Route>
		</Routes>
	);
}

export default App;
