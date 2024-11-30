"use client"
import { useGetProfileQuery } from '@/redux/apiSlices/AuthSlices';
import { useRouter, usePathname } from 'next/navigation';

const PrivateProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: profile, isFetching, isLoading, isError } = useGetProfileQuery(undefined);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError || !profile?.data) {
    router.push(`/login?redirect=${pathname}`);
    return null;
  }

  if (profile?.data?.role === 'USER') {
    return children;
  }

  router.push('/login');
  return null;
};

export default PrivateProvider;
