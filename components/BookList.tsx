'use client';

import { Database } from '@/types/supabase';
import { Tables } from '@/types/typeHelpers';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InnerBookList from './InnerBookList';
type Props = {
  books: Tables<'books'>[] | null;
  isLent?: boolean;
};

const BookList = ({ books, isLent }: Props) => {
  const router = useRouter();
  const title = isLent ? 'Borrowed Books' : 'My Books';
  const supabase = createClientComponentClient<Database>();

  const handleItemClick = async (book: Tables<'books'>) => {
    if (isLent) {
      const confirm = window.confirm(
        `Are you sure you want to return ${book.title}?`
      );
      if (confirm) {
        await supabase
          .from('books')
          .update({
            lent_to: null,
          })
          .eq('id', book.id);
        router.refresh();
      }
    } else {
      router.push(`/books/${book.id}`);
    }
  };

  return (
    <div className="mb-8 border p-4">
      <div className="w-full text-center mb-2">
        <h2 className="text-2xl">{title}</h2>
      </div>

      <InnerBookList
        books={books}
        isLent={isLent}
        handleItemClick={handleItemClick}
      />

      <div className="w-full text-center">
        <Link href={isLent ? '/books/search' : '/books/new'}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4">
            {isLent ? 'Find a Book' : 'Add Book'}
          </button>
        </Link>
      </div>
    </div>
  );
};
export default BookList;
