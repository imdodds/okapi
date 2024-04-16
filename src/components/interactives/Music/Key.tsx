"use client"

import { useEffect, useState } from "react";
import * as Tone from "tone";

interface KeyProps {
  note: string;
  octave: number;
}

type KeyToNote = {
  [key: string]: string;
};

const Key = ({ note, octave }: KeyProps) => {

  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const isSharp = note.includes('#');

  const [pressedKeys, setPressedKeys] = useState<{ [key: string]: boolean }>(() => {
    const initialPressedKeys: { [key: string]: boolean } = {};
    const allNotes = [
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
    allNotes.forEach(note => {
      initialPressedKeys[note] = false;
    });
    return initialPressedKeys;
  });

  const KEY_TO_NOTE: KeyToNote = {
    'a': `C${octave}`,
    'w': `C#${octave}`,
    's': `D${octave}`,
    'e': `D#${octave}`,
    'd': `E${octave}`,
    'f': `F${octave}`,
    't': `F#${octave}`,
    'g': `G${octave}`,
    'y': `G#${octave}`,
    'h': `A${octave}`,
    'u': `A#${octave}`,
    'j': `B${octave}`,
    'k': `C${octave + 1}`,
    'o': `C#${octave + 1}`,
    'l': `D${octave + 1}`,
    'p': `D#${octave + 1}`,
    ';': `E${octave + 1}`,
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const pressedKey = KEY_TO_NOTE[e.key.toLowerCase()];
      if (pressedKey === note) {
        setPressedKeys(prevKeys => ({
          ...prevKeys,
          [note]: true, // Set key as pressed
        }));
        playNote(pressedKey);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const releasedKey = KEY_TO_NOTE[e.key.toLowerCase()];
      if (releasedKey === note) {
        setPressedKeys(prevKeys => ({
          ...prevKeys,
          [note]: false, // Set key as released
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [note, octave, KEY_TO_NOTE]);

  const playNote = (note: string) => {
    const frequency = Tone.Frequency(note).toFrequency();
    synth.triggerAttackRelease(frequency, "4n", Tone.now());
  };

  // Add an event listener to resume AudioContext on user gesture
  document.addEventListener('click', () => {
    Tone.start();
  });

  return (
    <>
      {isSharp ? (
        <div
          className={`h-[100px] w-[30px] -ml-3 -mr-3 z-10 flex flex-col justify-end 
          ${pressedKeys[note] ? 'bg-blue-500' : 'bg-black'}`}
        >
          {note}
        </div>
      ) : (
        <div
          className={`h-[150px] w-[40px] border-black border-2 flex flex-col justify-end 
          ${pressedKeys[note] ? 'bg-blue-500' : 'bg-white'}`}
        >
          <div className="text-black text-center font-bold text-xs">{note}</div>
        </div>
      )}
    </>
  );
};

export default Key;
