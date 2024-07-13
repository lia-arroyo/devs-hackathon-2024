import {BackgroundImage, Button, Flex, Group, Select, Text, Title, Transition} from '@mantine/core';
import classes from './Pages.module.css';
import bg from '../assets/background.png';
import { useState } from 'react';
import { IconBrandTrello, IconPlus } from '@tabler/icons-react';
import { motion } from "framer-motion"

const GroupPage = () => {
  const data = ["Jolin's", "Lia's"];
  const [value, setValue] = useState<string | string>();

  const [percentage, setPercentage] = useState(0);

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
          <Button leftSection={<IconPlus size={20}/>} variant="gradient" size="sm">
            Record Drink
          </Button>
          <Button leftSection={<IconBrandTrello size={20}/>} variant="gradient" size="sm">
            Leaderboard
          </Button>
          <Button leftSection={<IconBrandTrello size={20}/>} variant="gradient" size="sm" onClick={() => {
            setPercentage(500)
          }}>
            100
          </Button>
          <Button leftSection={<IconBrandTrello size={20}/>} variant="gradient" size="sm" onClick={() => {
            setPercentage(50)
          }}>
            50
          </Button>
          <Button leftSection={<IconBrandTrello size={20}/>} variant="gradient" size="sm" onClick={() => {
            setPercentage(0)
          }}>
            0
          </Button>
        </Group>
        <div className={classes.waveContainer}>
          <motion.div
              className={classes.pageContainer}
              initial={{y: 0}}  // Initial position based on yPos
              animate={{y: percentage, opacity: 1}}  // Animation when component loads or yPos changes
              transition={{ type: 'spring', damping: 6, stiffness: 20, duration: 4 }}
          >
            <div className={classes.waveBackground}/>
          </motion.div>
        </div>
      </BackgroundImage>
    </div>
  );
};

export default GroupPage;
