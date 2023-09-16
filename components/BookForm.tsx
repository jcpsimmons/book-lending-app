'use client';
import { Database } from '@/types/supabase';
import { Tables } from '@/types/typeHelpers';
import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Button from './Button';

type Props = {
  book: Tables<'books'> & { lent_to?: { name: string; id: string } };
  usersPublic?: Tables<'users_public'>[];
  user: User;
};

const BookForm = ({ book, user }: Props) => {
  const [title, setTitle] = useState(book?.title ?? '');
  const [author, setAuthor] = useState(book?.author ?? '');
  const [lentToId, setLentToId] = useState<string | null>(
    book?.lent_to?.id ?? null
  );
  const [lentToName, setLentToName] = useState(book?.lent_to?.name ?? null);

  const [usersPublic, setUsersPublic] = useState<
    Tables<'users_public'>[] | null
  >(null);

  const debounced = useDebouncedCallback(async () => {
    if (!!lentToName) {
      const { data } = await supabase
        .from('users_public')
        .select('id, name')
        .ilike('name', `%${lentToName}%`);
      setUsersPublic(data);
    }
  }, 500);

  const supabase = createClientComponentClient<Database>();

  const handleDelete = async () => {
    // show an alert to confirm deletion
    const confirm = window.confirm(
      'Are you sure you want to delete this book? This action is permanent.'
    );

    if (!confirm || !book) return;
    const { error } = await supabase.from('books').delete().eq('id', book.id);
    console.log('error', error);
  };

  const handleUpsert = async (e: any) => {
    e.preventDefault();
    console.log('user.id', user?.id);
    if (!!title && !!author) {
      const newBook = {
        title,
        author,
        user_id: user.id,
        ...(!!lentToId && { lent_to: lentToId }),
        ...(book?.id && { id: book?.id }),
      };

      await supabase.from('books').upsert(newBook);
      window.location.href = '/';
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
              value={lentToName}
              placeholder="Type to search for a user"
              className={`shadow appearance-none border-2 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-black ${
                !!lentToId ? 'border-green-400' : ''
              }`}
              onChange={(e) => {
                setLentToName(e.target.value);
                setLentToId(null);
                debounced();
              }}
            />

            {!!usersPublic?.length && (
              <ul className="list-none">
                {usersPublic?.map((lendUser) => (
                  <li
                    onClick={() => {
                      setLentToName(lendUser.name);
                      setLentToId(lendUser.id);
                      setUsersPublic(null);
                    }}
                    key={lendUser.id}
                    className={`border hover:scale-105 transform transition-all cursor-pointer`}
                  >
                    <p className={`p-2`}>{lendUser.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="flex items-center align-center justify-center mt-8">
          {!!book && (
            <Button
              className="border-red-500 mr-4 text-red-500"
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          )}

          <Button onClick={handleUpsert}>Save</Button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
