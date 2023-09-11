import randomColor from 'randomcolor';
import { useState } from 'react';

export default function App() {
  const [color, setColor] = useState(
    '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
  );

  const [lightness, setLightness] = useState('light');

  const [randomColorCode, setRandomColorCode] = useState(
    getNewRandomColorCode(),
  );

  function getNewRandomColorCode() {
    return randomColor({
      luminosity: lightness,
      hue: color,
    });

    // '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
  }

  return (
    <div>
      <h1>React Random Color Generator</h1>
      <div style={{ backgroundColor: randomColorCode }}>
        Generated Color: {randomColorCode}
      </div>
      <br />
      <label htmlFor="random-generate-button">Random Color: </label>
      <button
        onClick={() => setRandomColorCode(getNewRandomColorCode())}
        id="random-generate-button"
      >
        Generate
      </button>
      <br />
      <br />
      <label htmlFor="color-picker-hue">Change hue: </label>
      <input
        onInput={(event) => {
          const selectedColor = event.target.value;
          setRandomColorCode(selectedColor);
          setColor(selectedColor);
        }}
        value={randomColorCode}
        type="color"
        id="color-picker-hue"
      />
      <br />
      <label htmlFor="lighness">Choose Lighness:</label>
      <select
        name="lighness"
        id="lighness"
        onInput={(event) => {
          setLightness(event.target.value);
          setRandomColorCode(getNewRandomColorCode());
        }}
      >
        <option value="bright">Bright</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
