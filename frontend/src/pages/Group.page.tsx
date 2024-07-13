import { BackgroundImage, Button, Flex, Group, Select, Text, Title } from '@mantine/core';
import classes from './Pages.module.css';
import bg from '../assets/background.png';
import { useState } from 'react';
import { IconBrandTrello } from '@tabler/icons-react';
import { WaterEntryModal } from '@/components/WaterEntry/WaterEntryModal';

const GroupPage = () => {
  const data = ["Jolin's", "Lia's"];
  const [value, setValue] = useState<string | string>();
  return (
    <div className={classes.pageContainer}>
      <BackgroundImage src={bg} className={classes.background}>
        <Text size="sm" color="navyBlue.8">
          Group Name
        </Text>
        <Title order={2} c="navyBlue.8">
          #321543
        </Title>
        <div>
          <Text size="md" color="navyBlue.8">
            You are currently#1
          </Text>
        </div>
        <Group mt={10}>
          <WaterEntryModal />
          <Button leftSection={<IconBrandTrello size={20} />} variant="gradient" size="sm">
            Leaderboard
          </Button>
        </Group>
      </BackgroundImage>
    </div>
  );
};

export default GroupPage;
