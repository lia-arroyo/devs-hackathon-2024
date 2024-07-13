import classes from './WaterEntry.module.css';
import { Text, Button, Center, SegmentedControl, rem, ActionIcon } from '@mantine/core';
import {
  IconDroplet,
  IconDropletHalf2Filled,
  IconDropletFilled,
  IconAdjustments,
} from '@tabler/icons-react';
import { IconBottle, IconBucket } from '@tabler/icons-react';
import { hover } from '@testing-library/user-event/dist/types/convenience';
import { useState } from 'react';

export function WaterEntry() {
  const [amountDrank, setAmountDrank] = useState(0);
  const [drinkIcon, setDrinkIcon] = useState(
    <IconDropletFilled style={{ width: rem(16), height: rem(16) }} />
  );
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
    setDrinkIcon(<IconDropletFilled style={{ width: rem(16), height: rem(16) }} />);
    // wait 0.5 second
    setTimeout(() => {
      setDrinkIcon(<IconDropletHalf2Filled style={{ width: rem(16), height: rem(16) }} />);
    }, 500);

    // wait 1 second
    setTimeout(() => {
      setDrinkIcon(<IconDroplet style={{ width: rem(16), height: rem(16) }} />);
    }, 1000);
  };

  const hoverDrinkButton = () => {
    // fill droplet
    setDrinkIcon(<IconDropletFilled style={{ width: rem(16), height: rem(16) }} />);
  };

  return (
    <div>
      <SegmentedControl radius="xl" size="md" classNames={classes} data={headerButtonLabels} />
      <ActionIcon
        variant="filled"
        aria-label="Settings"
        onClick={handleDrinkButton}
        onFocus={hoverDrinkButton}
      >
        {drinkIcon}
      </ActionIcon>
      <Text size="md">{amountDrank}</Text>
    </div>
  );
}
