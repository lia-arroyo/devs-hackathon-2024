import { BackgroundImage, Button, Group, Text, Title, useMantineTheme } from '@mantine/core';
import classes from './Pages.module.css';
import bg from '../assets/background.png';
import { useContext, useEffect, useState } from 'react';
import { WaterEntryModal } from '@/components/WaterEntry/WaterEntryModal';
import { IconBrandTrello } from '@tabler/icons-react';
import { convertToRGBA } from '@/utils/convertToRgba';
import { motion } from 'framer-motion';
import { CheckLogin } from '@/components/CheckLogin/CheckLogin';
import { FeatherContext } from '@/api/FeatherContext';
import { l } from 'vite/dist/node/types.d-aGj9QkWt';
import { useParams } from 'react-router-dom';

const GroupPage = () => {
  const data = ["Jolin's", "Lia's"];
  const [value, setValue] = useState<string | string>();

  const theme = useMantineTheme();
  const { colors } = theme;
  const waterColor = { backgroundColor: convertToRGBA(colors.skyBlue[9], 0.8) };

  const [percentage, setPercentage] = useState('100%');
  const featherContext = useContext(FeatherContext);

  const { id: groupId } = useParams();
  const [groupData, setGroupData] = useState({});
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      const data = await featherContext?.service('groups').get(groupId as string);
      setGroupData(data);
    };

    const fetchCurrentUser = async () => {
      const user = await featherContext?.authenticate();
      if (user) {
        setUser(user.user);
      }
    };

    fetchGroupData();
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchWaterLevel = async () => {
      const user = await featherContext?.authenticate();
      const realUpdatedUser = await featherContext?.service("users").get(user?.user._id);
      const waterIntake = realUpdatedUser?.waterIntake;
      let percentage = '';
      if (waterIntake >= 2000) {
        percentage = '100%';
      } else {
        percentage = `${(waterIntake / 2000) * 100}%`;
      }
      setPercentage(percentage);
    };

    fetchWaterLevel();
  }, [featherContext]);

  return (
    <div className={classes.pageContainer} style={{ backgroundColor: colors.skyBlue[1] }}>
      <CheckLogin />
      <BackgroundImage src={bg} className={classes.background}>
        <Text size="sm" color="navyBlue.8">
          {groupData.name}
        </Text>
        <Title order={2} c="navyBlue.8">
          #{groupData.groupCode}
        </Title>
        <Text size="sm" color="navyBlue.8">
          Stakes: {groupData.stakes ? groupData.stakes : 'No stakes.'}
        </Text>
        <div>
          <Text size="md" color="navyBlue.8">
            You are currently #1. You drank {user?.waterIntake}ml of water today.
          </Text>
        </div>
        <Group mt={10}>
          <WaterEntryModal setWaterlevel={setPercentage}/>
          <Button leftSection={<IconBrandTrello size={20} />} variant="gradient" size="sm">
            Leaderboard
          </Button>
        </Group>
        <div className={classes.waveContainer}>
          <motion.div
            style={waterColor}
            className={classes.pageContainer}
            initial={{ y: 0 }} // Initial position based on yPos
            animate={{ y: percentage, opacity: 1 }} // Animation when component loads or yPos changes
            transition={{ type: 'spring', damping: 6, stiffness: 20, duration: 4 }}
          >
            <div className={classes.waveBackground} />
          </motion.div>
        </div>
      </BackgroundImage>
    </div>
  );
};

export default GroupPage;
