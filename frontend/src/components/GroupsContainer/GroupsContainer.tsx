import { Container, Divider } from '@mantine/core';
import GroupsList from '../GroupsList/GroupsList';
import JoinGroupSection from '../JoinGroupSection/JoinGroupSection';
import classes from './GroupsContainer.module.css';
import { convertToRGBA } from '@/utils/convertToRgba';

const GroupsContainer = () => {
  const backgroundColor = { backgroundColor: convertToRGBA('#ffffff', 0.3) };

  return (
    <Container style={backgroundColor} className={classes.groupsContainer}>
      <GroupsList />
      <Divider my="md" size="sm" color="navyBlue.6" />
      <JoinGroupSection />
    </Container>
  );
};

export default GroupsContainer;
