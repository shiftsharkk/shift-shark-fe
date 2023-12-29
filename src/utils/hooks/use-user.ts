import { getUser } from '@/api-calls/user';
import { useUserStore } from '@/stores/user.store';
import { useEffect, useState } from 'react';

export function useUser() {
  const { user, setUser } = useUserStore();
  const isUserLoggedIn = Boolean(user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await getUser();
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, setUser, isUserLoggedIn, isLoading };
}
