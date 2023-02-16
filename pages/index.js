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
          <label htmlFor="animal-category">Animal:</label>
          <select
            id="animal-category"
            name="animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          >
            <option value=""></option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
          </select>
  
          <label htmlFor="color-category">Color:</label>
          <select
            id="color-category"
            name="color"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
          >
            <option value=""></option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </select>
  
          <label htmlFor="personality-category">Personality:</label>
          <select
            id="personality-category"
            name="personality"
            value={personalityInput}
            onChange={(e) => setPersonalityInput(e.target.value)}
          >
            <option value=""></option>
            <option value="friendly">Friendly</option>
            <option value="playful">Playful</option>
            <option value="mischievous">Mischievous</option>
          </select>
  
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
  }  
