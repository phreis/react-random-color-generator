/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import randomColor from 'randomcolor';
import { useState } from 'react';

const coloredBoxStyles = (color, size) => css`
  background-color: ${color};
  width: ${size * 20}px;
  height: ${size * 10}px;
  transition: background-color 1000ms linear;
`;

function ColoredBox(props) {
  return (
    <div css={coloredBoxStyles(props.color, props.size)}>
      Generated Color: {props.color}
    </div>
  );
}

function ControlPanel(props) {
  return (
    <div
      style={{
        border: 'solid 2px',
        padding: '10px',
        width: '200px',
        height: 'auto',
      }}
    >
      <label htmlFor="color-picker-hue">Hue </label>
      <input
        onInput={(event) => {
          const selectedColor = event.target.value;
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
          onInput={(event) => {
            props.setSize(event.target.value);
          }}
          value={props.size}
        />
      </div>
      <br />
      <br />
      <button
        onClick={() =>
          props.setColor(
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

function getNewRandomColorCode(hue, luminosity) {
  return randomColor({
    luminosity: luminosity,
    hue: hue,
  });
}

export default function App() {
  const [color, setColor] = useState(getNewRandomColorCode());

  const [lightness, setLightness] = useState('light');

  const [size, setSize] = useState(10);

  const boxColor = getNewRandomColorCode(color, lightness);

  return (
    <div>
      <h1>React Random Color Generator</h1>
      <br />
      <ControlPanel
        getNewRandomColorCode={getNewRandomColorCode}
        color={color}
        setColor={setColor}
        lightness={lightness}
        setLightness={setLightness}
        size={size}
        setSize={setSize}
      />
      <br />
      <ColoredBox color={boxColor} size={size} />
    </div>
  );
}
