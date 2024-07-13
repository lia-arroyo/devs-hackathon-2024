import classes from './Pages.module.css';
import {SignupForm} from "@/components/AuthForms/SignupForm";
import BubblyBackground from "@/components/BubbleBackground/BubbleBackground";

const SignupPage = () => {
  return <div className={classes.pageContainer}>
    <BubblyBackground />
    <SignupForm/>
  </div>;
};

export default SignupPage;
