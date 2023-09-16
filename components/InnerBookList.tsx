import { Tables } from '@/types/typeHelpers';
import Link from 'next/link';

type InnerBookListProps = {
  books: Tables<'books'>[] | null;
  isLent?: boolean;
};

const InnerBookList = ({ books, isLent }: InnerBookListProps) => {
  const emptyText = isLent
    ? "You're not borrowing any books right now."
    : "You haven't added any books yet.";

  const getLendingText = (lentTo: string | null) => {
    if (!lentTo) return '';
    if (isLent) {
      return `Borrowed From: ${lentTo}`;
    }
    return `Lent To: ${lentTo}`;
  };

  return (
    <>
      {!!books?.length ? (
        <div className="mt-4">
          <ul className="list-none border-4 px-2">
            {books.map((book: any, idx) => (
              <Link href={`/books/${book.id}`} key={book.id}>
                <li
                  key={book.id}
                  className={`hover:scale-105 transform transition-all cursor-pointer ${
                    idx != books.length - 1 && 'border-b'
                  }`}
                >
                  <p className="px-6 py-4">{`${book.title} - ${
                    book.author
                  }${getLendingText(book.lent_to)}`}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="w-full flex flex-col justify-center text-center">
            <h3>{emptyText}</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default InnerBookList;
