import { useSearchParams } from 'react-router-dom';

import AuthBlock from '../templates/auth-block';

const Login = () => {
  const [searchParams] = useSearchParams();

  const intent = (searchParams.get('intent') ?? 'login') as
    | 'login'
    | 'register';

  return <AuthBlock type={intent} />;
};

export default Login;
