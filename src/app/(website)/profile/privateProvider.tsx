"use client"
import { useGetProfileQuery } from '@/redux/apiSlices/AuthSlices';
import { useRouter } from 'next/navigation';



const PrivateProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();  
  const { data: profile, isFetching, isLoading, isError } = useGetProfileQuery(undefined); 
  
  console.log(profile);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError || !profile?.data) {
    router.push('/login');
    return null; 
  }

  if (profile?.data?.role === 'USER') {
    return children; 
  }

  router.push('/login');

  return null;  
};

export default PrivateProvider;