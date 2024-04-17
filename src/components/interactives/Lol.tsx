"use client"

import React, { useState } from 'react';
import axios from 'axios';

interface Joke {
  joke: string;
  type: string;
}

const Lol: React.FC = () => {
  const [joke, setJoke] = useState<Joke>({ joke: '', type: '' });

  const fetchJoke = async () => {
    try {
      const response = await axios.get<Joke>('https://v2.jokeapi.dev/joke/any?type=single&blacklist=racist');
      setJoke(response.data);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Random Joke</h2>
      <div className="mb-4">
        <p className="text-md">{joke.joke}</p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={fetchJoke}
      >
        Tell me a joke!
      </button>
    </div>
  );
};

export default Lol;