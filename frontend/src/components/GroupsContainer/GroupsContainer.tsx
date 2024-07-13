import { Container, Divider } from '@mantine/core';
import GroupsList from '../GroupsList/GroupsList';
import JoinGroupSection from '../JoinGroupSection/JoinGroupSection';
import classes from './GroupsContainer.module.css';
import {CheckLogin} from "@/components/CheckLogin/CheckLogin";

const GroupsContainer = () => {
  return (
    <Container className={classes.groupsContainer}>
        <CheckLogin/>
      <GroupsList />
      <Divider my="md" size="sm" color="navyBlue.6" />
      <JoinGroupSection />
    </Container>
  );
};

export default GroupsContainer;
