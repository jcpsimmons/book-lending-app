'use client';
import { Tables } from '@/types/typeHelpers';
import { useState } from 'react';

type Props = { book: Tables<'books'> };

const BookForm = ({ book }: Props) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [lentTo, setLentTo] = useState(book.lent_to);
  const [foundUsers, setFoundUsers] = useState<Tables<'users'>[] | null>(null);

  const handleDelete = async () => {
    // delete the book
    // redirect to /
  };

  const handleUpsert = async () => {
    // save the book
    // redirect to /
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

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Lent To</label>
          <input
            value={lentTo ?? ''}
            placeholder="Type to search for a user"
            className="shadow appearance-none border-2 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mt-8">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
            Delete
          </button>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
