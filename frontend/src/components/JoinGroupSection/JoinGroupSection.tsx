import { Button, Center, Container, Input, Text } from '@mantine/core';
import { useState } from 'react';

const JoinGroupSection = () => {
  const [groupCode, setGroupCode] = useState<String>();
  const placeholderText = 'Enter group code here';
  return (
    <Container style={{ margin: 0, padding: 0 }}>
      <Text size="xl" ta="center">
        Join Group
      </Text>
      <Center>
        <Input
          type="Number"
          placeholder={placeholderText}
          value={groupCode ?? ''}
          onChange={(e) => setGroupCode(e.target.value)}
        />
        <Button variant="filled">Join</Button>
      </Center>
    </Container>
  );
};

export default JoinGroupSection;
