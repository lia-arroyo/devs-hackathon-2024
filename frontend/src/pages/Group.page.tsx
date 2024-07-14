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
import { useParams } from 'react-router-dom';
import { LeaderboardModal } from '@/components/Leaderboard/LeaderboardModal';

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

  const [visibleTextIndex, setVisibleTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisibleTextIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const fetchGroupData = async () => {
      const data = await featherContext?.service('groups').get(groupId as string);
      setGroupData(data);
    };

    const fetchCurrentUser = async () => {
      const user = await featherContext?.authenticate();
      if (user) {
        const realUpdatedUser = await featherContext?.service('users').get(user.user._id);
        setUser(realUpdatedUser);
      }
    };

    fetchGroupData();
    fetchCurrentUser();
  }, [featherContext, groupId]);

  useEffect(() => {
    const fetchWaterLevel = async () => {
      const user = await featherContext?.authenticate();
      const realUpdatedUser = await featherContext?.service('users').get(user?.user._id);
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
        <motion.div
          key={visibleTextIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Text
            size="md"
            color="navyBlue.8"
            style={{ display: visibleTextIndex === 0 ? 'block' : 'none' }}
          >
            Stakes: {groupData.stakes ? groupData.stakes : 'No stakes.'}
          </Text>
          <Text
            size="md"
            color="navyBlue.8"
            style={{ display: visibleTextIndex === 1 ? 'block' : 'none' }}
          >
            You are currently #1
          </Text>
          <Text
            size="md"
            color="navyBlue.8"
            style={{ display: visibleTextIndex === 2 ? 'block' : 'none' }}
          >
            You drank {user?.waterIntake}ml of water today.
          </Text>
        </motion.div>
        <Group mt={10}>
          <WaterEntryModal setWaterlevel={setPercentage} />
          <LeaderboardModal code={groupData.groupCode} />
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
