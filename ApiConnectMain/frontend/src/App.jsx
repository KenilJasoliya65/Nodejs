import { useState } from "react";
import "./App.css";

function App() {
  const [h1Data, setH1Data] = useState("");

  fetch("http://localhost:8000/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setH1Data(data.msg);
    });

  return (
    <>
      <h1>{h1Data}</h1>
    </>
  );
}

export default App;
