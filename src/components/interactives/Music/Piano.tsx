"use client"

import React, { useState } from 'react';
import Key from './Key';

const Piano = () => {
  const [octave, setOctave] = useState(4);

  const [waveType, setWaveType] = useState<'sine' | 'square' | 'triangle' | 'sawtooth'>('sine');

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
        waveType={waveType}
      />);
  });

  const increaseOctave = () => {
    setOctave((prevOctave) => prevOctave + 1);
  };

  const decreaseOctave = () => {
    setOctave((prevOctave) => prevOctave - 1);
  };

  const SoundWaveTypeSelector = () => {
    return (
      <div className='flex flex-col p-2'>
        <label htmlFor="waveType">Sound Wave Type:</label>
        <select
          className='border border-gray-300 rounded-md p-1 mt-2'
          id="waveType"
          value={waveType}
          onChange={(e) => setWaveType(e.target.value as 'sine' | 'square' | 'triangle' | 'sawtooth')}
        >
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
          <option value="sawtooth">Sawtooth</option>
        </select>
      </div>
    );
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
        <SoundWaveTypeSelector />
    </>
  );
};

export default Piano;
