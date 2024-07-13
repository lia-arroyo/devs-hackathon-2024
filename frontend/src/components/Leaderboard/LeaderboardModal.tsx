import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { Leaderboard } from './Leaderboard';

export function LeaderboardModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const groupCode: string = '49167101';

  return (
    <>
      <Modal opened={opened} onClose={close} title="Leaderboard" centered>
        {/* Modal content */}
        <Leaderboard code={groupCode} />
      </Modal>

      <Button onClick={open}>Leaderboard</Button>
    </>
  );
}
