import classes from './Pages.module.css';
import { CreateGroupForm } from '@/components/CreateGroup/CreateGroupForm';
import BubblyBackground from '@/components/BubbleBackground/BubbleBackground';
import { BackButton } from '@/components/Navigation/BackButton';
import { rem } from '@mantine/core';
import { CheckLogin } from '@/components/CheckLogin/CheckLogin';

const CreateGroupPage = () => {
  return (
    <div className={classes.pageContainer}>
      <CheckLogin />
      <div style={{ position: 'absolute', top: rem(16), left: rem(16) }}>
        <BackButton />
      </div>
      <BubblyBackground />
      <CreateGroupForm />
    </div>
  );
};

export default CreateGroupPage;
