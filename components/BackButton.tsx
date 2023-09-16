'use client';

import { usePathname, useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === '/') return null;

  return (
    <button
      className="border-4 py-1 px-4  hover:scale-105 transform transition-all cursor-pointer"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
};

export default BackButton;
