'use client';

import InnerBookList from '@/components/InnerBookList';
import { Database } from '@/types/supabase';
import { Tables } from '@/types/typeHelpers';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const BookSearch = () => {
  const [books, setBooks] = useState<Tables<'books'>[] | null>([]);
  const [isLent, setIsLent] = useState(false);

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    fetchBooks();
  }, [isLent]);

  const fetchBooks = async () => {
    // select all book info and get user name from relational table on lent_to
    const { data, error } = await supabase
      .from('books')
      .select(
        `
      *,
      lent_to (
        name,
        id
      )
      `
      )
      .limit(100);
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const debounced = useDebouncedCallback(async (value) => {
    if (!value) {
      fetchBooks();
      return;
    }

    const { data } = await supabase.rpc('search_books', {
      search_text: value,
    });
    setBooks(data);
  }, 500);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl mb-6 font-bold">Book Search</h1>
      <div className="flex items-center justify-around w-full flex-col">
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">
            Search by Title or Author
          </label>
          <input
            placeholder="Great Lent"
            className="shadow appearance-none border-2 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            onChange={(e) => debounced(e.target.value)}
          />

          {/* hide lent books checkbox */}
          <div className="mt-4">
            <input
              type="checkbox"
              id="lent"
              name="lent"
              checked={isLent}
              onChange={() => setIsLent(!isLent)}
            />
            <label htmlFor="lent" className="ml-2 text-sm">
              Show Lent Books
            </label>
          </div>
        </div>
        <div>
          {!!books?.length ? (
            <InnerBookList
              books={books.filter((book) => {
                return isLent ? !!true : !book.lent_to;
              })}
            />
          ) : (
            <h3>No books found - please refine your query.</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
