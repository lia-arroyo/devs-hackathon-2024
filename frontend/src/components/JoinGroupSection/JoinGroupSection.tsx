import { ActionIcon, Center, Container, Group, Input, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';

const JoinGroupSection = () => {
  const [groupCode, setGroupCode] = useState<string>();
  const placeholderText = 'Enter group code here';
  return (
    <Container style={{ margin: 0, padding: 0 }}>
      <Title order={4} ta="center" my={6}>
        Join Group
      </Title>
      <Center>
        <Group>
          <Input
            type="number"
            variant="filled"
            placeholder={placeholderText}
            value={groupCode ?? ''}
            onChange={(e) => setGroupCode(e.target.value)}
          />
          <ActionIcon variant="filled" size={36} color="skyBlue.7">
            <IconArrowRight />
          </ActionIcon>
        </Group>
      </Center>
    </Container>
  );
};

export default JoinGroupSection;
