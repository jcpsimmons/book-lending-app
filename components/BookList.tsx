import { Tables } from '@/types/typeHelpers';
import Link from 'next/link';
type Props = {
  books: Tables<'books'>[] | null;
  isLent?: boolean;
};

const BookList = async ({ books, isLent }: Props) => {
  const title = isLent ? 'Borrowed Books' : 'My Books';
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
    <div className="mb-6">
      <div className="w-full text-center mb-2">
        <h2 className="text-2xl">{title}</h2>
      </div>
      {books?.length ? (
        <div className="mt-4">
          <ul className="list-none border-4">
            {books.map((book: any) => (
              <Link href={`/books/${book.id}`} key={book.id}>
                <li
                  key={book.id}
                  className="border-b hover:scale-105 transform transition-all cursor-pointer"
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
        <h3>{emptyText}</h3>
      )}
    </div>
  );
};
export default BookList;
