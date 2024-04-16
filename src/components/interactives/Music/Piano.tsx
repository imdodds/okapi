"use client"

import React, { useState } from 'react';

import Key from './Key';

const Piano = () => {

  const [octave, setOctave] = useState(4);

  const notes = [
    `C${octave}`,
    `C#${octave}`,
    `D${octave}`,
    `D#${octave}`,
    `E${octave}`,
    `F${octave}`,
    `F#${octave}`,
    `G${octave}`,
    `G#${octave}`,
    `A${octave}`,
    `A#${octave}`,
    `B${octave}`,
    `C${octave + 1}`,
    `C#${octave + 1}`,
    `D${octave + 1}`,
    `D#${octave + 1}`,
    `E${octave + 1}`
  ];

  const keys = notes.map((note, index) => {
    return (
      <Key
        key={index}
        note={`${note}`}
        octave={octave}
      />);
  });

  const increaseOctave = () => {
    setOctave((prevOctave) => prevOctave + 1);
  };

  const decreaseOctave = () => {
    setOctave((prevOctave) => prevOctave - 1);
  };

  return (
    <>
      <div className='flex flex-row'>
        {keys}
      </div>
      <div className='flex flex-col'>
        <div className='mt-2'>Octave: {octave}</div>
        <button
          className='mt-2 border border-gray-300 rounded-md p-1'
          onClick={decreaseOctave}>
          Octave -
        </button>
        <button
          className='mt-2 border border-gray-300 rounded-md p-1'
          onClick={increaseOctave}>
          Octave +
        </button>
      </div>
    </>
  );
};

export default Piano;
