import classes from './WaterEntry.module.css';
import {
  Text,
  Button,
  Center,
  SegmentedControl,
  rem,
  ActionIcon,
  Flex,
  Group,
} from '@mantine/core';
import {
  IconDroplet,
  IconDropletHalf2Filled,
  IconDropletFilled,
  IconAdjustments,
} from '@tabler/icons-react';
import { IconBottle, IconBucket } from '@tabler/icons-react';
import { useState } from 'react';

export function WaterEntry() {
  const [amountDrank, setAmountDrank] = useState(0);
  const [drinkIcon, setDrinkIcon] = useState(<IconDropletFilled style={styles.droplet} />);
  const headerButtonLabels = [
    {
      value: '250ml',
      label: (
        <Center style={{ gap: 10 }}>
          <IconBucket style={{ width: rem(16), height: rem(16) }} />
          <span>250ml</span>
        </Center>
      ),
    },
    {
      value: '500ml',
      label: (
        <Center style={{ gap: 10 }}>
          <IconBottle style={{ width: rem(16), height: rem(16) }} />
          <span>500ml</span>
        </Center>
      ),
    },
  ];

  const handleDrinkButton = () => {
    setAmountDrank(amountDrank + 1);

    // change icon to full droplet
    setDrinkIcon(<IconDropletFilled style={styles.droplet} />);
    // wait 0.5 second
    setTimeout(() => {
      setDrinkIcon(<IconDropletHalf2Filled style={styles.droplet} />);
    }, 500);

    // wait 1 second
    setTimeout(() => {
      setDrinkIcon(<IconDroplet style={styles.droplet} />);
    }, 1000);
  };

  const hoverDrinkButton = () => {
    // fill droplet
    setDrinkIcon(<IconDropletFilled style={styles.droplet} />);
  };

  return (
    <div>
      <Flex mih={rem(250)} direction="column" justify="space-between" align="center">
        <SegmentedControl radius="xl" size="md" classNames={classes} data={headerButtonLabels} />
        <Text size={rem(32)}>{amountDrank}</Text>
        <ActionIcon
          variant="filled"
          aria-label="drink"
          onClick={handleDrinkButton}
          onMouseEnter={hoverDrinkButton}
          size={rem(128)}
          color="navyBlue.7"
        >
          {drinkIcon}
        </ActionIcon>
      </Flex>
    </div>
  );
}

const styles = {
  droplet: {
    width: rem(64),
    height: rem(64),
  },
};
