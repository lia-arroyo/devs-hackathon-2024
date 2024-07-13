import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { WaterEntry } from './WaterEntry';
import { IconPlus } from '@tabler/icons-react';

export function WaterEntryModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Record Water Entry" centered>
        <WaterEntry />
      </Modal>

      <Button leftSection={<IconPlus size={20} />} variant="gradient" size="sm" onClick={open}>
        Record Drink
      </Button>
    </>
  );
}
