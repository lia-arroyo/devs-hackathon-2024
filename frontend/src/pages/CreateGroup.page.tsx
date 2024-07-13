import classes from './Pages.module.css';
import { CreateGroupForm } from '@/components/CreateGroup/CreateGroupForm';
import BubblyBackground from '@/components/BubbleBackground/BubbleBackground';

const CreateGroupPage = () => {
  return (
    <div className={classes.pageContainer}>
      <BubblyBackground />
      <CreateGroupForm />
    </div>
  );
};

export default CreateGroupPage;
