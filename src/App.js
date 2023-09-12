/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import randomColor from 'randomcolor';
import { useState } from 'react';

const coloredBoxStyles = (color, size, showAnimation) => css`
  @keyframes example {
    0% {
      left: 0px;
      top: 0px;
    }
    25% {
      left: 200px;
      top: 0px;
    }
    50% {
      left: 200px;
      top: 200px;
    }
    75% {
      left: 0px;
      top: 200px;
    }
    100% {
      left: 0px;
      top: 0px;
    }
  }
  background-color: ${color};
  width: ${size * 20}px;
  height: ${size * 10}px;
  position: relative;
  transition: background-color 1000ms linear;
  animation-name: example;
  animation-duration: 4s;
  animation-iteration-count: ${showAnimation ? 'infinite' : 0};
`;

function ColoredBox(props) {
  return (
    <div css={coloredBoxStyles(props.color, props.size, props.showAnimation)}>
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
          props.changeBoxColor(selectedColor, props.lightness);
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
          props.changeBoxColor(props.color, selectedLightness);
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
      <div>
        <label htmlFor="Animation">animate </label>
        <input
          type="checkbox"
          id="animation"
          name="animation"
          onChange={(event) => {
            props.setShowAnimation(event.target.checked);
          }}
          value={props.showAnimation}
        />
      </div>
      <br />
      <br />
      <button
        onClick={() => props.changeBoxColor(props.color, props.lightness)}
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

  const [boxColor, setBoxColor] = useState(color);

  const [showAnimation, setShowAnimation] = useState(true);

  function changeBoxColor(colorIn, lightnessIn) {
    setColor(colorIn);
    setLightness(lightnessIn);
    setBoxColor(getNewRandomColorCode(colorIn, lightnessIn));
  }

  return (
    <div>
      <h1>React Random Color Generator</h1>
      <br />
      <ControlPanel
        changeBoxColor={changeBoxColor}
        color={color}
        lightness={lightness}
        size={size}
        setSize={setSize}
        showAnimation={showAnimation}
        setShowAnimation={setShowAnimation}
      />
      <br />
      <ColoredBox color={boxColor} size={size} showAnimation={showAnimation} />
    </div>
  );
}
