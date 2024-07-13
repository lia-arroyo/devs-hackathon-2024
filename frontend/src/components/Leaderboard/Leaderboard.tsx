import cx from 'clsx';
import { useState } from 'react';
import { Table, ScrollArea } from '@mantine/core';
import classes from './Leaderboard.module.css';
import { IconDroplet } from '@tabler/icons-react';
import { IconDropletHalf2 } from '@tabler/icons-react';
import { IconDropletHalf2Filled } from '@tabler/icons-react';
import { IconDropletFilled } from '@tabler/icons-react';
import { IconDropletExclamation } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { Flex, Center } from '@mantine/core';

const data = [
  {
    position: 1,
    name: 'Jolin Chen',
    cupsDrank: 421,
  },
  {
    position: 2,
    name: 'Water boy',
    cupsDrank: 267,
  },
  {
    position: 3,
    name: 'Job Santos',
    cupsDrank: 69,
  },
  {
    position: 4,
    name: 'Lia Arroyo',
    cupsDrank: 10,
  },
  {
    position: 5,
    name: 'Frank Situ',
    cupsDrank: 0,
  },
  {
    position: 6,
    name: 'Manav Santos',
    cupsDrank: 0,
  },
  {
    position: 7,
    name: 'Yang Qian',
    cupsDrank: 0,
  },
];

export function Leaderboard() {
  const [scrolled, setScrolled] = useState(false);

  const totalCups = data.reduce((total, row) => total + row.cupsDrank, 0);
  const maxCups = data.reduce((max, row) => (row.cupsDrank > max ? row.cupsDrank : max), 0);
  const halfCups = data.reduce(
    (half, row) => (row.cupsDrank === maxCups / 2 ? row.cupsDrank : half),
    maxCups / 2
  );
  const minCups = data.reduce((min, row) => (row.cupsDrank < min ? row.cupsDrank : min), Infinity);

  const GetWaterIcon = (cupsDrank: number) => {
    // if the user drank the most cups
    if (cupsDrank === maxCups) return <IconDropletFilled stroke={2} style={styles.waterIcon} />;

    if (cupsDrank > halfCups && cupsDrank < maxCups)
      return <IconDropletHalf2Filled stroke={2} style={styles.waterIcon} />;

    // if the user drank half the cups
    if (cupsDrank === halfCups) return <IconDropletHalf2 stroke={2} style={styles.waterIcon} />;

    if (cupsDrank > minCups && cupsDrank < halfCups)
      return <IconDroplet stroke={2} style={styles.waterIcon} />;

    // if the user didn't drink any cups
    if (cupsDrank === minCups || cupsDrank === 0)
      return <IconDropletExclamation stroke={2} style={styles.waterIcon} />;
  };

  const rows = data.map((row) => (
    <Table.Tr key={row.position}>
      <Table.Td>#{row.position}</Table.Td>
      <Table.Td>
        <Center>{row.name}</Center>
      </Table.Td>
      <Table.Td>
        {/* <div style={{ width: rem(76) }}> */}
        <Flex justify="flex-end" align="flex-end">
          <Center inline>
            {row.cupsDrank}
            {GetWaterIcon(row.cupsDrank)}
          </Center>
        </Flex>
        {/* </div> */}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700} striped>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>Position</Table.Th>
            <Table.Th>
              <Center>Name</Center>
            </Table.Th>
            <Table.Th>
              <Flex justify="flex-end" align="flex-end">
                Cups Drank
              </Flex>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

const styles = {
  waterIcon: {
    width: rem(16),
    height: rem(16),
  },
};
