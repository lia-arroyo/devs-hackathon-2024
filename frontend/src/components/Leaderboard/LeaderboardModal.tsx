import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { Leaderboard } from './Leaderboard';

export function LeaderboardModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Leaderboard" centered>
        {/* Modal content */}
        <Leaderboard />
      </Modal>

      <Button onClick={open}>Leaderboard</Button>
    </>
  );
}
