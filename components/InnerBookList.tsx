'use client';
import { Tables } from '@/types/typeHelpers';

type InnerBookListProps = {
  books: Tables<'books'>[] | null;
  handleItemClick: (book: Tables<'books'>) => void;
  isLent?: boolean;
};

const InnerBookList = ({
  books,
  isLent,
  handleItemClick,
}: InnerBookListProps) => {
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
              <li
                onClick={() => handleItemClick(book)}
                key={book.id}
                className={`hover:scale-105 transform transition-all cursor-pointer ${
                  idx != books.length - 1 && 'border-b'
                }`}
              >
                <p
                  className={`px-6 ${!book?.lent_to ? 'py-4' : 'pt-4'}`}
                >{`${book.title} - ${book.author}`}</p>
                {!!book?.lent_to && (
                  <p className="px-6 pb-4 italic text-sm">{`${getLendingText(
                    book.lent_to.name
                  )}`}</p>
                )}
              </li>
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
