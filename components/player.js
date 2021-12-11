import { useContext } from 'react';
import PlayerContext from './playerContext';

export default function Player({songPath}) {
  const { player, startPlaying } = useContext(PlayerContext);

  return (
    <div>
      <button onClick={() => {
        startPlaying(songPath)
      }}>Yes</button>
      <button
        onClick={() => {
          player.current.pause();
        }}
      >
        Pause
      </button>
      <button
        onClick={() => {
          player.current.continue();
        }}
      >
        Continue
      </button>
    </div>
  );
}
