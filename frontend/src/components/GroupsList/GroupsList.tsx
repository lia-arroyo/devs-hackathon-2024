import { Button, Container, NavLink, Text, Title } from '@mantine/core';
import classes from './GroupsList.module.css';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const GroupsList = () => {
  const groups = [1, 2, 3, 4];
  const navigate = useNavigate();

  return (
    <Container className={classes.groupsContainer}>
      <Title order={4} ta="center" my={6} c="navyBlue.9">
        Your Accountabuddies
      </Title>
      <div className={classes.groupList}>
        {groups.map((group) => (
          <Button variant="outline" fullWidth className={classes.listItem} size="md">
            Group {group}
          </Button>
        ))}
        <Button
          variant="outline"
          fullWidth
          className={classes.listItem}
          size="md"
          leftSection={<IconPlus size={20} />}
          onClick={() => {
            navigate('/group/create');
          }}
        >
          Create New Group
        </Button>
      </div>
    </Container>
  );
};

export default GroupsList;
