import React from "react";
import "@/styles/App.scss";
import { Provider } from "react-redux";
import store from "@/store";
import { AppRouter } from "@/router";

function App() {

	return (
		<Provider store={store}>
			<div className="App">
				<AppRouter />
			</div>
		</Provider>
	);
}

export default App;
