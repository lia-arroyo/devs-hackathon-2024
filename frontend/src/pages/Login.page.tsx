import { LoginForm } from '@/components/AuthForms/LoginForm';
import BubblyBackground from '@/components/BubbleBackground/BubbleBackground';
import classes from './Pages.module.css';

const LoginPage = () => {
  return (
    <div className={classes.pageContainer}>
      <BubblyBackground />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
