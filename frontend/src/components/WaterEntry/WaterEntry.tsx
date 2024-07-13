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

  const handleDrinkUp = () => {
    setAmountDrank(amountDrank + 1);

    // change icon to full droplet
    setDrinkIcon(<IconDroplet style={styles.droplet} />);

    // wait 0.5 second
    setTimeout(() => {
      setDrinkIcon(<IconDropletHalf2Filled style={styles.droplet} />);
    }, 500);

    // wait 1 second
    setTimeout(() => {
      setDrinkIcon(<IconDropletFilled style={styles.droplet} />);
    }, 1000);
  };

  const handleDrinkDown = () => {
    setAmountDrank(amountDrank - 1);

    // wait 0.5 second
    setTimeout(() => {
      setDrinkIcon(<IconDropletFilled style={styles.droplet} />);
    }, 500);

    // wait 1 second
    setTimeout(() => {
      setDrinkIcon(<IconDropletHalf2Filled style={styles.droplet} />);
    }, 1000);

    // wait 1 second
    setTimeout(() => {
      setDrinkIcon(<IconDroplet style={styles.droplet} />);
    }, 1500);
  };

  return (
    <div>
      <Flex mih={rem(250)} direction="column" justify="space-between" align="center">
        <SegmentedControl radius="xl" size="md" classNames={classes} data={headerButtonLabels} />
        <Center>
          <Text size={rem(32)}>{amountDrank}</Text>
          {drinkIcon}
        </Center>
        <Center
          style={{
            width: '25%',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <ActionIcon
            variant="filled"
            aria-label="drink"
            onClick={handleDrinkDown}
            size={rem(40)}
            color="navyBlue.7"
            disabled={amountDrank == 0}
          >
            -
          </ActionIcon>
          <ActionIcon
            variant="filled"
            aria-label="drink"
            onClick={handleDrinkUp}
            size={rem(40)}
            color="navyBlue.7"
          >
            +
          </ActionIcon>
        </Center>
        <Button>Confirm</Button>
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
