import BubblyBackground from '@/components/BubbleBackground/BubbleBackground';
import classes from './Pages.module.css';
import GroupsList from '@/components/GroupsList/GroupsList';
import { Divider, Text } from '@mantine/core';
import JoinGroupSection from '@/components/JoinGroupSection/JoinGroupSection';

const ViewGroupsPage = () => {
  return (
    <div className={classes.pageContainer}>
      <BubblyBackground />
      <GroupsList />
      <Divider my="md" size="sm" c="black" />
      <JoinGroupSection />
    </div>
  );
};

export default ViewGroupsPage;
