import { Tables } from '@/types/typeHelpers';
import Link from 'next/link';
import InnerBookList from './InnerBookList';
type Props = {
  books: Tables<'books'>[] | null;
  isLent?: boolean;
};

const BookList = async ({ books, isLent }: Props) => {
  const title = isLent ? 'Borrowed Books' : 'My Books';

  return (
    <div className="mb-8 border p-4">
      <div className="w-full text-center mb-2">
        <h2 className="text-2xl">{title}</h2>
      </div>

      <InnerBookList books={books} isLent={isLent} />

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
