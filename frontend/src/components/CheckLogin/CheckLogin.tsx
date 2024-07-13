import { useContext, useEffect } from 'react';
import { FeatherContext } from '@/api/FeatherContext';
import { useLocation, useNavigate } from 'react-router-dom';

export function CheckLogin() {
  const navigate = useNavigate();
  const featherContext = useContext(FeatherContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await featherContext?.reAuthenticate();
      } catch {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate, featherContext]);

  return <></>;
}
