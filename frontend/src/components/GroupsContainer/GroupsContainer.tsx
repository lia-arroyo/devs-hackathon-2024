import { Container, Divider } from '@mantine/core';
import GroupsList from '../GroupsList/GroupsList';
import JoinGroupSection from '../JoinGroupSection/JoinGroupSection';
import classes from './GroupsContainer.module.css';

const GroupsContainer = () => {
  return (
    <Container className={classes.groupsContainer}>
      <GroupsList />
      <Divider my="md" size="sm" color="navyBlue.6" />
      <JoinGroupSection />
    </Container>
  );
};

export default GroupsContainer;
