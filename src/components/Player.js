import { useState } from "react";

import Box from '@mui/material/Box';

function Player({ colorsArr, player, toggleLock }) {
  const [playerColor, setplayerColor] = useState("Select");

  const handleChange = (e) => {
    setplayerColor(e.target.value);
  };

  const playerStyle = {
    border: "1px solid " + player.col,
    boxShadow: "0 0 15px " + player.col,
  };

  return (
    <Box
      className="player"
      style={player.lock ? playerStyle : { boxShadow: "0 0 15px White" }}
    >
      <Box>
        <img
          src={require("../images/blank-profile-picture-973460__340.webp")}
          alt="User Profile"
        />
      </Box>
      {player.lock ? (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100px', padding: '10px'}}>
          <h1>LOCKED</h1>
        </Box>
      ) : (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100px', padding: '10px'}}>
          <select
            name="colors"
            id="colors"
            playercolor={playerColor}
            onChange={handleChange}
          >
            <option key="Select" value="Select">Select</option>
            {colorsArr.map((col) => (<option key={col} value={col}>{col}</option>))}
          </select>
          <button
            className="lock-btn"
            onClick={() => toggleLock(player.id, playerColor)}
          >
            LOCK
          </button>
        </Box>
      )}
    </Box>
  );
}

export default Player;
