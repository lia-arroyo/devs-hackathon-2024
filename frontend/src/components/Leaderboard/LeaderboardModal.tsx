import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { Leaderboard } from './Leaderboard';
import { IconBrandTrello } from '@tabler/icons-react';

export function LeaderboardModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const groupCode: string = '49167101';
  console.log('GROUP CODE IS HARDCODED!!!!!! TO ' + groupCode);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Leaderboard" centered>
        {/* Modal content */}
        <Leaderboard code={groupCode} />
      </Modal>

      <Button
        onClick={open}
        leftSection={<IconBrandTrello size={20} />}
        variant="gradient"
        size="sm"
      >
        Leaderboard
      </Button>
    </>
  );
}
