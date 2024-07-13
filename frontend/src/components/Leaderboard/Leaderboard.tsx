import cx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { Table, ScrollArea } from '@mantine/core';
import classes from './Leaderboard.module.css';
import { IconDroplet } from '@tabler/icons-react';
import { IconDropletHalf2 } from '@tabler/icons-react';
import { IconDropletHalf2Filled } from '@tabler/icons-react';
import { IconDropletFilled } from '@tabler/icons-react';
import { IconDropletExclamation } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { Flex, Center } from '@mantine/core';
import { groupsPath } from '@/api/API_ROUTES';
import { FeatherContext } from '@/api/FeatherContext';

export interface WaterIntakeData {
  userId: string;
  name: string;
  waterIntake: number;
  position?: number;
}

export function Leaderboard({ code }: { code: string }) {
  // Featherjs
  const featherContext = useContext(FeatherContext);
  const retrieveLeaderboard = async () => {
    const res = await featherContext?.service(groupsPath).leaderboard({ groupCode: code });
    // console.log('aha');
    // console.log(res);
    return res;
  };
  const [scrolled, setScrolled] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<WaterIntakeData[]>([]);

  // const data: WaterIntakeData[] = [];

  useEffect(() => {
    console.log('fetching leaderboard');
    retrieveLeaderboard().then((res) => {
      // // sort the data by waterIntake
      // const sortedData = res?.waterIntakes.sort((a, b) => b.waterIntake - a.waterIntake);
      // // add position
      res?.forEach((row, i) => (row.position = i + 1));

      // console.log(res);
      //setLeaderboardData(res?.waterIntakes);
      //console.log('res', res?.waterIntakes);

      setLeaderboardData(res || []);
    });
  }, []);

  const totalCups = leaderboardData?.reduce((total, row) => total + row?.waterIntake, 0);
  const maxCups = leaderboardData?.reduce(
    (max, row) => (row.waterIntake > max ? row.waterIntake : max),
    0
  );
  const halfCups = leaderboardData?.reduce(
    (half, row) => (row.waterIntake === maxCups ?? 1 / 2 ? row.waterIntake : half),
    maxCups ?? 1 / 2
  );
  const minCups = leaderboardData?.reduce(
    (min, row) => (row.waterIntake < min ? row.waterIntake : min),
    Infinity
  );

  const GetWaterIcon = (waterIntake: number) => {
    // if the user drank the most cups
    if (waterIntake === maxCups) return <IconDropletFilled stroke={2} style={styles.waterIcon} />;

    if (waterIntake > (halfCups ?? 0) && waterIntake < maxCups)
      return <IconDropletHalf2Filled stroke={2} style={styles.waterIcon} />;

    // if the user drank half the cups
    if (waterIntake === halfCups) return <IconDropletHalf2 stroke={2} style={styles.waterIcon} />;

    if (waterIntake > minCups && waterIntake < halfCups)
      return <IconDroplet stroke={2} style={styles.waterIcon} />;

    // if the user didn't drink any cups
    if (waterIntake === minCups || waterIntake === 0)
      return <IconDropletExclamation stroke={2} style={styles.waterIcon} />;
  };

  const rows = leaderboardData?.map((row) => (
    <Table.Tr key={row.position}>
      <Table.Td>#{row.position}</Table.Td>
      <Table.Td>
        <Center>{row.name}</Center>
      </Table.Td>
      <Table.Td>
        {/* <div style={{ width: rem(76) }}> */}
        <Flex justify="flex-end" align="flex-end">
          <Center inline>
            {row.waterIntake}
            {GetWaterIcon(row.waterIntake)}
          </Center>
        </Flex>
        {/* </div> */}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={rem(300)} striped>
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
