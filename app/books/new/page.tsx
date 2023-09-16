import BookForm from '@/components/BookForm';
import { Database } from '@/types/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function BookPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');
  console.log('user', user);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl mb-6 font-bold">Add Book</h1>
      <BookForm user={user} />
    </div>
  );
}
