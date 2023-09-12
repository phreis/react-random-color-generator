import randomColor from 'randomcolor';
import { useState } from 'react';
import { keyframes } from 'styled-components';

function ColoredBox(props) {
  return (
    <div
      style={{
        backgroundColor: props.randomColorCode,
        width: `${props.size * 20}px`,
        height: `${props.size * 10}px`,
        transition: 'background-color 1000ms linear',
      }}
    >
      Generated Color: {props.randomColorCode}
    </div>
  );
}

function ControlPanel(props) {
  const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
  return (
    <div
      style={{
        border: 'solid 2px',
        padding: '10px',
        width: '200px',
        height: 'auto',
        /*         animation: `${spin} 2s linear infinite`, */
      }}
    >
      <label htmlFor="color-picker-hue">Hue </label>
      <input
        onInput={(event) => {
          const selectedColor = event.target.value;
          props.setRandomColorCode(
            props.getNewRandomColorCode(selectedColor, props.lightness),
          );
          props.setColor(selectedColor);
        }}
        value={props.color}
        type="color"
        id="color-picker-hue"
      />
      <br />
      <label htmlFor="lighness">Lighness </label>
      <select
        name="lighness"
        id="lighness"
        onInput={(event) => {
          const selectedLightness = event.target.value;
          props.setRandomColorCode(
            props.getNewRandomColorCode(props.color, selectedLightness),
          );
          props.setLightness(selectedLightness);
        }}
      >
        <option value="bright">Bright</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <br />
      <div>
        <label htmlFor="Size">Size </label>
        <input
          type="range"
          id="size"
          name="size"
          min="1"
          max="20"
          onInput={(event) => props.setSize(event.target.value)}
          value={props.size}
        />
      </div>
      <br />
      <br />
      <button
        onClick={() =>
          props.setRandomColorCode(
            props.getNewRandomColorCode(props.color, props.lightness),
          )
        }
        id="random-generate-button"
      >
        Generate
      </button>
    </div>
  );
}

export default function App() {
  const [color, setColor] = useState(
    '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
  );

  const [lightness, setLightness] = useState('light');

  const [randomColorCode, setRandomColorCode] = useState(
    getNewRandomColorCode(color, lightness),
  );

  const [size, setSize] = useState(10);

  function getNewRandomColorCode(hue, luminosity) {
    return randomColor({
      luminosity: luminosity,
      hue: hue,
    });
  }
  return (
    <div>
      <h1>React Random Color Generator</h1>
      <br />
      <ControlPanel
        setRandomColorCode={setRandomColorCode}
        getNewRandomColorCode={getNewRandomColorCode}
        color={color}
        setColor={setColor}
        lightness={lightness}
        setLightness={setLightness}
        size={size}
        setSize={setSize}
      />
      <br />
      <ColoredBox randomColorCode={randomColorCode} size={size} />
    </div>
  );
}
