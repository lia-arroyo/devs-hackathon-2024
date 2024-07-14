import { ActionIcon, Center, Container, Group, Input, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeatherContext } from '@/api/FeatherContext';
import classes from './JoinGroupSection.module.css';

const JoinGroupSection = () => {
  const [groupCode, setGroupCode] = useState<string>();
  const navigate = useNavigate();
  const featherContext = useContext(FeatherContext);
  const placeholderText = 'Enter group code here';

  async function _onJoinGroup() {
    if (groupCode) {
      try {
        const user = await featherContext?.authenticate();
        console.log(user);
        const result = await featherContext?.service('groups').joinGroup({
          userId: user?.user._id, // It cries in typescript. Booo hooo hooo
          groupCode: groupCode,
        });
        console.log('Success joined');
        console.log(result); // This contained the group updated
        // todo: Perhaps redirect
      } catch (error) {
        console.log(error);
        console.log('Error joining group');
      }
    }
  }

  return (
    <Container className={classes.container}>
      <Title order={4} ta="center" my={6} c="navyBlue.9">
        Join Group
      </Title>

      <Center className={classes.inputContainer}>
        <Input
          type="number"
          variant="filled"
          placeholder={placeholderText}
          value={groupCode ?? ''}
          onChange={(e) => setGroupCode(e.target.value)}
          className={classes.input}
        />
        <ActionIcon
          variant="filled"
          size={36}
          color="skyBlue.7"
          onClick={() => {
            _onJoinGroup();
          }}
          className={classes.actionButton}
        >
          <IconArrowRight />
        </ActionIcon>
      </Center>
    </Container>
  );
};

export default JoinGroupSection;
