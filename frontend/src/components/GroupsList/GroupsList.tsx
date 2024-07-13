import { Container, NavLink, Text } from '@mantine/core';
import classes from './GroupsList.module.css';

const GroupsList = () => {
  const groups = [1, 2, 3, 4];

  return (
    <Container className={classes.groupsContainer}>
      <Text size="xl" ta="center">
        Your Accountabuddies
      </Text>
      <div>
        {groups.map((group) => (
          <NavLink
            label={`Group ${group}`}
            style={{
              borderRadius: 5,
              marginTop: 10,
              marginBottom: 10,
              backgroundColor: 'white',   
            }}
            ta="center"
          />
        ))}
      </div>
      <NavLink
        label="+ Create New Group"
        href="/group/create"
        style={{
          borderRadius: 5,
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: 'white',
        }}
        ta="center"
      />
    </Container>
  );
};

export default GroupsList;
