'use client';

import { usePathname, useRouter } from 'next/navigation';
import Button from './Button';

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === '/') return null;

  return <Button onClick={() => router.back()}>Back</Button>;
};

export default BackButton;
