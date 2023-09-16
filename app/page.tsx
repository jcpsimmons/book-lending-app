import BookList from '@/components/BookList';
import { Database } from '@/types/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <h1>Please log in to continue.</h1>;
  }

  const { data: myBooks } = await supabase
    .from('books')
    .select()
    .filter('user_id', 'eq', user.id)
    .order('title');

  console.log('data', user.id);
  const { data: borrowedBooks } = await supabase
    .from('books')
    .select()
    .filter('lent_to', 'eq', user.id)
    .order('title');

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl mb-6 font-bold">Bookshelf</h1>
      <div className="flex items-center lg:items-start justify-around w-full flex-col lg:flex-row">
        <BookList books={myBooks} />
        <BookList isLent books={borrowedBooks} />
      </div>
    </div>
  );
}
