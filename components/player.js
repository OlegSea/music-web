import { useContext, useEffect, useState } from 'react';
import { fetchData } from '../libs/rq';
import PlayerContext from './playerContext';
import Image from 'next/image';
import ua from '../public/images/unknownalbum.jpg';

export default function Player({}) {
  const {
    currentSong,
    isPaused,
    pausePlay,
    seek,
    timeElapsed,
    nextSong,
    prevSong,
    shuffle,
    loopOverStatus,
    setLoopOverStatus,
    isShuffled,
  } = useContext(PlayerContext);

  const loopOverButton = () => {
    if (loopOverStatus === 0) {
      return (
        <svg
          onClick={() => {
            setLoopOverStatus((loopOverStatus + 1) % 3);
          }}
          xmlns='http://www.w3.org/2000/svg'
          width='48'
          height='48'
          viewBox='0 0 24 24'
        >
          <path d='M18.5 8h-2.5v2h2.5c1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5h-13c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5h2.5v3l6-4-6-4v3h-2.5c-3.037 0-5.5 2.463-5.5 5.5s2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5s-2.463-5.5-5.5-5.5z' />
        </svg>
      );
    } else if (loopOverStatus === 1) {
      return (
        <svg
          onClick={() => {
            setLoopOverStatus((loopOverStatus + 1) % 3);
          }}
          xmlns='http://www.w3.org/2000/svg'
          width='48'
          height='48'
          viewBox='0 0 24 24'
        >
          <path d='M2 12c0 .999.381 1.902.989 2.604l-1.098.732-.587.392c-.814-1.025-1.304-2.318-1.304-3.728 0-3.313 2.687-6 6-6h9v-3l6 4-6 4v-3h-9c-2.206 0-4 1.794-4 4zm20.696-3.728l-.587.392-1.098.732c.608.702.989 1.605.989 2.604 0 2.206-1.795 4-4 4h-9v-3l-6 4 6 4v-3h9c3.313 0 6-2.687 6-6 0-1.41-.489-2.703-1.304-3.728z' />
        </svg>
      );
    } else {
      return (
        <svg
          onClick={() => {
            setLoopOverStatus((loopOverStatus + 1) % 3);
          }}
          xmlns='http://www.w3.org/2000/svg'
          width='48'
          height='48'
          viewBox='0 0 24 24'
        >
          <path d='M6.09 18h-.09c-3.313 0-6-2.687-6-6s2.687-6 6-6h2v-3l6 4-6 4v-3h-2c-2.206 0-4 1.794-4 4s1.794 4 4 4h.09c-.055.326-.09.658-.09 1s.035.674.09 1zm11.91-12h-2v2h2c2.206 0 4 1.794 4 4s-1.794 4-4 4h-.09c.055.326.09.658.09 1s-.035.674-.09 1h.09c3.313 0 6-2.687 6-6s-2.687-6-6-6zm-6 7c-2.209 0-4 1.791-4 3.999 0 2.209 1.791 4.001 4 4.001s4-1.792 4-4.001c0-2.208-1.791-3.999-4-3.999zm1.016 6.188h-1.055v-3.109c-.022 0-.884.413-.904.423l-.179-.936 1.241-.574h.896v4.196z' />
        </svg>
      );
    }
  };

  return (
    <div className='player'>
      <div className='song-pic'>
        <Image src={ua} height={100} width={100} alt='Your Name' />
      </div>
      <p className='song-album song-info'>{currentSong['song_name'] ? currentSong['album_name'] : '...'}</p>
      <p className='song-name song-info'>
        {currentSong['song_name'] ? currentSong['song_name'] : 'No song selected...'}
      </p>
      <p className='song-artist song-info'>{currentSong['song_name'] ? currentSong['artist_name'] : '...'}</p>
      <div className='player-controls'>
        <div className='player-controls-buttons'>
          <svg onClick={shuffle} xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
            <path d='M2 7h-2v-2h2c3.49 0 5.48 1.221 6.822 2.854-.41.654-.754 1.312-1.055 1.939-1.087-1.643-2.633-2.793-5.767-2.793zm16 10c-3.084 0-4.604-1.147-5.679-2.786-.302.627-.647 1.284-1.06 1.937 1.327 1.629 3.291 2.849 6.739 2.849v3l6-4-6-4v3zm0-10v3l6-4-6-4v3c-5.834 0-7.436 3.482-8.85 6.556-1.343 2.921-2.504 5.444-7.15 5.444h-2v2h2c5.928 0 7.543-3.511 8.968-6.609 1.331-2.893 2.479-5.391 7.032-5.391z' />
          </svg>
          <svg
            onClick={prevSong}
            xmlns='http://www.w3.org/2000/svg'
            className='previous-button'
            width='48'
            height='48'
            viewBox='0 0 24 24'
          >
            <path d='M10 12v3.518l-6.031-3.518 6.031-3.518v3.518zm12 3.518l-6.031-3.518 6.031-3.518v7.036zm-22-3.518l12 7v-14l-12 7zm12 0l12 7v-14l-12 7z' />
          </svg>
          {isPaused ? (
            <svg
              className='play-pause-button'
              onClick={pausePlay}
              xmlns='http://www.w3.org/2000/svg'
              width='48'
              height='48'
              viewBox='0 0 24 24'
            >
              <path d='M4 3.532l14.113 8.468-14.113 8.468v-16.936zm-2-3.532v24l20-12-20-12z' />
            </svg>
          ) : (
            <svg
              onClick={pausePlay}
              className='play-pause-button'
              xmlns='http://www.w3.org/2000/svg'
              width='48'
              height='48'
              viewBox='0 0 24 24'
            >
              <path d='M18 2v20h-2v-20h2zm-10 0v20h-2v-20h2zm12-2h-6v24h6v-24zm-10 0h-6v24h6v-24z' />
            </svg>
          )}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='next-button'
            onClick={nextSong}
            width='48'
            height='48'
            viewBox='0 0 24 24'
          >
            <path d='M14 8.482l6.031 3.518-6.031 3.518v-7.036zm-12 0l6.031 3.518-6.031 3.518v-7.036zm10-3.482v14l12-7-12-7zm-12 0v14l12-7-12-7z' />
          </svg>
          {loopOverButton()}
        </div>
        <div>
          <p className='time-elapsed'>
            {Math.round(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}
          </p>
          <input
            type='range'
            className='length-bar'
            name='length'
            id='bruh'
            max={currentSong['length']}
            value={timeElapsed}
            step={1}
            onChange={(event) => seek(parseInt(event.target.value))}
          />
          <p className='song-length'>
            {currentSong['length']
              ? `${Math.round(currentSong['length'] / 60)}:${String(currentSong['length'] % 60).padStart(2, '0')}`
              : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
