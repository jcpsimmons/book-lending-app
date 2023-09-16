'use client';

import InnerBookList from '@/components/InnerBookList';
import { Database } from '@/types/supabase';
import { Tables } from '@/types/typeHelpers';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const BookSearch = () => {
  const [books, setBooks] = useState<Tables<'books'>[] | null>([]);

  const supabase = createClientComponentClient<Database>();

  // get initial list of first 25 books on page load sorted by title
  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await supabase
        .from('books')
        .select('*')
        .limit(25)
        .order('title');
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const debounced = useDebouncedCallback(async (value) => {
    if (!!value) {
      const { data, error } = await supabase.rpc('search_books', {
        search_text: value,
      });
      console.log('data', data);
      console.log('error', error);
    }
  }, 500);

  const searchBooks = async (e: any) => {
    const { data } = await supabase
      .from('books')
      .select('*')
      .limit(25)
      .order('title')
      .ilike('title', `%${e.target.value}%`)
      .or('author', 'eq', e.target.value);
    setBooks(data);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl mb-6 font-bold">Book Search</h1>
      <div className="flex items-center lg:items-start justify-around w-full flex-col lg:flex-row">
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Lent To</label>
          <input
            placeholder="Type to search for a user"
            className="shadow appearance-none border-2 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            onChange={(e) => debounced(e.target.value)}
          />
        </div>
        {!!books?.length && <InnerBookList books={books} />}
      </div>
    </div>
  );
};

export default BookSearch;
