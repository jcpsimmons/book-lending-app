'use client';

import { Database } from '@/types/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

type Props = {
  userId: string;
};

const UpdateUsernameWarn = ({ userId }: Props) => {
  const [username, setUsername] = useState('');
  const supabase = createClientComponentClient<Database>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await supabase.from('users_public').insert([
      {
        id: userId,
        name: username,
      },
    ]);
    window.location.replace('/');
  };

  return (
    <div className="w-full max-w-md border-4 p-6 mb-8">
      <h2 className="text-4xl mb-6 font-bold">Add Name</h2>
      <p className="mb-6">
        Please add your full name to your account, e.g. Violet Petunia
      </p>
      <input
        className="shadow appearance-none border-2 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="flex justify-center mt-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default UpdateUsernameWarn;
