'use client';
import { Database } from '@/types/supabase';
import { Tables } from '@/types/typeHelpers';
import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  book?: Tables<'books'>;
  usersPublic?: Tables<'users_public'>[];
  user: User;
};

const BookForm = ({ book, user }: Props) => {
  const [title, setTitle] = useState(book?.title ?? '');
  const [author, setAuthor] = useState(book?.author ?? '');
  const [lentTo, setLentTo] = useState(book?.lent_to ?? '');
  const [query, setQuery] = useState('');
  const debounced = useDebouncedCallback(async (value) => {
    setQuery(value);
    if (!!value) {
      const { data, error } = await supabase
        .from('users_public')
        .select('id, name')
        .ilike('name', `%${value}%`);
      console.log('data', data);
      console.log('error', error);
    }
  }, 500);

  const supabase = createClientComponentClient<Database>();

  const handleDelete = async () => {
    // delete the book
    // redirect to /
  };

  const handleUpsert = async (e: any) => {
    e.preventDefault();
    console.log('user.id', user.id);
    if (!!title && !!author) {
      const newBook = {
        title,
        author,
        user_id: user.id,
        ...(!!lentTo && { lent_to: lentTo }),
        ...(book?.id && { id: book?.id }),
      };
      console.log('newBook', newBook);

      const { data, error } = await supabase.from('books').upsert(newBook);
      console.log('data', data);
      console.log('error', error);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form className="border-4 px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Title</label>
          <input
            value={title}
            className="shadow appearance-none border-2 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block  text-sm font-bold mb-2">Author</label>
          <input
            value={author}
            className="shadow appearance-none border-2 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {!!book && (
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Lent To</label>
            <input
              placeholder="Type to search for a user"
              className="shadow appearance-none border-2 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
              onChange={(e) => debounced(e.target.value)}
            />
          </div>
        )}
        <div className="flex items-center align-center justify-center mt-8">
          {!!book && (
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
              Delete
            </button>
          )}

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
            onClick={handleUpsert}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
