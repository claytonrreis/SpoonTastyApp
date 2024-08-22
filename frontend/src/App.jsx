import { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="main"></div>
      <Footer />
    </div>
  );
}

export default App;
