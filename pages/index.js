import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";


export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [personalityInput, setPersonalityInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput, color: colorInput, personality: personalityInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      //setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="main">
      <Head>
        <title>Bedtime story</title>
        <link rel="icon" href="/storybook.svg" />
      </Head>
  
      <main className={styles.main}>
        <img src="/storybook.svg" className={styles.icon} />
        <h1>Tell me a story</h1>

        <form className="app" onSubmit={onSubmit}>
          <label htmlFor="animal-category">About :</label>
          <select
            id="character"
            name="character"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          >
            <option value=""></option>
            <option value="boy">Boy</option>
            <option value="girl">Girl</option>
            <option value="animal">Animal</option>
          </select>
  
          <label htmlFor="color-category">Age:</label>
          <select
            id="age"
            name="age"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
          >
            <option value=""></option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
          </select>
  
          <label htmlFor="genre">Story Genre:</label>
          <select
            id="genre"
            name="genre"
            value={personalityInput}
            onChange={(e) => setPersonalityInput(e.target.value)}
          >
            <option value=""></option>
            <option value="adventure">Adventure</option>
            <option value="fantasy">Fantasy</option>
            <option value="detective">Detective</option>
          </select>
  
          <input type="submit" value="Let's start" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
  }  
