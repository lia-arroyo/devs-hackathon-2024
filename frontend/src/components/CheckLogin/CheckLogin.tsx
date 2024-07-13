import { useContext, useEffect } from 'react';
import { FeatherContext } from '@/api/FeatherContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';
import classes from './CheckLogin.module.css';
import { SignoutButton } from '../SignoutButton/SignoutButton';

export function CheckLogin() {
  const navigate = useNavigate();
  const featherContext = useContext(FeatherContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await featherContext?.reAuthenticate();
      } catch {
        console.log('Not logged in');
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate, featherContext]);

  return (
    <div className={classes.logout}>
      <SignoutButton />
    </div>
  );
}
