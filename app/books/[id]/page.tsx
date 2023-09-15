import BookForm from '@/components/BookForm';
import { Database } from '@/types/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function BookPage({
  params: { id: bookId },
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // look up the book by id in supabase
  // if it doesn't exist, redirect to /
  const { data } = await supabase.from('books').select().eq('id', bookId);
  const book = data?.[0];
  if (!book) redirect('/');

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl mb-6 font-bold">Edit Book</h1>
      <BookForm book={book} />
    </div>
  );
}
