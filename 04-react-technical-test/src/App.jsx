import { useState, useEffect } from "react";

const TO_GET_FACT = "https://catfact.ninja/fact";
const TO_GET_CAT_IMG_API = "https://cataas.com/cat/says/hello";

function App() {
  const [fact, setFact] = useState("");
  const [catImg, setCatImg] = useState("");

  useEffect(() => {
    fetch(TO_GET_FACT)
      .then((res) => res.json())
      .then((data) => setFact(data.fact))
      .catch((err) => console.log(err));
  }, []);

  let firstWord = fact.split(" ", 1);
  const newUrl = `https://cataas.com/cat/says/${firstWord}`;

  useEffect(() => {
    fetch(newUrl)
      .then((res) => setCatImg(res.url))
      .catch((err) => console.log(err));
  }, [fact]);

  return (
    <div>
      <h1>Cat Facts</h1>
      <p>{fact}</p>
      <img src={catImg} alt="cat" />
    </div>
  );
}

export default App;
