import { Center, Container, NavLink, Text } from '@mantine/core';

const GroupsList = () => {
  const groups = [1, 2, 3, 4];

  return (
    <Container>
      <Text size="xl">Your Accountabuddies</Text>
      {groups.map((group) => (
        <NavLink label={`Group ${group}`} />
      ))}
      <NavLink label="Create New Group" leftSection={'+'} href="/group/create" />
    </Container>
  );
};

export default GroupsList;
