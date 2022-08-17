const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const App = () => {
  const [volume, setVolume] = React.useState(1);
  const [power, setPower] = React.useState(true);

  const display = React.useRef();

  const getIdPad = (idPad) => {
    display.current.innerHTML = idPad;
  };

  return (
    <div className="drum-machine">
      <div className="pad">
        {bankOne.map((clip) => (
          <Pad
            key={clip.id}
            clip={clip}
            volume={volume}
            power={power}
            getIdPad={getIdPad}
          />
        ))}
      </div>
      <div className="control">
        <div>
          <input
            className="input-switch"
            type="checkbox"
            id="switch"
            defaultChecked={power}
            onChange={() => setPower(!power)}
          />
          <label className="label-switch" htmlFor="switch">
            Toggle
          </label>
        </div>
        <div className="volume">
          <input
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            type="range"
            step="0.01"
            max="1"
            min="0"
          ></input>
        </div>
        <div className="display" id="display">
          <h2 ref={display}></h2>
        </div>
      </div>
    </div>
  );
};

const Pad = ({ clip, volume, power, getIdPad }) => {
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [clip.keyTrigger]);

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  };

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
  };

  return (
    <div
      className="drum-pad"
      onClick={() => {
        if (power) {
          playSound();
          getIdPad(clip.id);
        }
      }}
    >
      <audio id={clip.keyTrigger} src={clip.url} className="clip" />
      {clip.keyTrigger}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
