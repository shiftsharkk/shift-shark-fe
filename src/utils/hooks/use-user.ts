import { getUser } from '@/api-calls/user';
import { useServiceProviderSignupStore } from '@/stores/serviceProvider-signup.store';
import { useUserStore } from '@/stores/user.store';
import { useEffect, useState } from 'react';

export function useUser() {
  const { user, setUser } = useUserStore();
  const { setBankingDetails, setAdditionalDetails } =
    useServiceProviderSignupStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const { data } = await getUser();
        if (data.user) {
          setUser(data.user);
          if (data.user.bankDetails) {
            setBankingDetails({
              ...data.user.bankDetails,
              confirmAccountNumber: data.user.bankDetails?.accountNumber,
            });
          }
          if (data.user.additionalDetails) {
            const tempAdditionalDetail = {
              ...data.user.additionalDetails,
              aboutMe: data.user.additionalDetails.aboutMe || '',
            };
            setAdditionalDetails(tempAdditionalDetail);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, setUser, isLoading };
}
