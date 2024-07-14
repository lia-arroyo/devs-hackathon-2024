import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { Leaderboard } from './Leaderboard';
import { IconBrandTrello } from '@tabler/icons-react';

export function LeaderboardModal({ code }: { code: string }) {
  const [opened, { open, close }] = useDisclosure(false);
  // const groupCode: string = '49167101';
  // // console.log('GROUP CODE IS HARDCODED!!!!!! TO ' + groupCode);

  // if (code === undefined || code === '') {
  //   code = groupCode;
  // }

  return (
    <>
      <Modal opened={opened} onClose={close} centered radius={10}>
        {/* Modal content */}
        <Leaderboard code={code} />
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
