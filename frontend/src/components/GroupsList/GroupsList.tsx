import { Button, Container, NavLink, Text, Title } from '@mantine/core';
import classes from './GroupsList.module.css';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FeatherContext } from '@/api/FeatherContext';
import { Id } from '@feathersjs/feathers';

const GroupsList = () => {
  const [groups, setGroups] = useState<String[]>([]);
  const [user, setUser] = useState<any>(null);
  const featherContext = useContext(FeatherContext);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    const user = await featherContext?.authenticate();
    if (user) {
      setUser(user.user);
    }
  };

  const fetchGroupData = async (id: Id) => {
    const data = await featherContext?.service('groups').get(id);
    return data;
  };

  const handleGroupClick = (groupData) => {
    navigate(`/group/${groupData._id}`);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      if (user) {
        console.log(user);
        const userGroups = user.groups;
        let groupsData: any[] = [];

        if (userGroups) {
          await Promise.all(
            userGroups?.map(async (groupId: Id) => {
              const data = await fetchGroupData(groupId);
              groupsData = [...groupsData, data];
            })
          );
          setGroups(groupsData);
        }
      }
    };

    fetchGroups();
  }, [user]);

  console.log(user);
  console.log(groups);

  return (
    <Container className={classes.groupsContainer}>
      <Title order={4} ta="center" my={6} c="navyBlue.9">
        Your Accountabuddies
      </Title>
      <div className={classes.groupList}>
        {groups.map((group) => (
          <Button
            variant="outline"
            fullWidth
            className={classes.listItem}
            size="md"
            onClick={() => {
              handleGroupClick(group);
            }}
          >
            {group.name}
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
