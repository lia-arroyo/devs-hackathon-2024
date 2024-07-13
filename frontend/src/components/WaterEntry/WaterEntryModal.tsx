import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { WaterEntry } from './WaterEntry';

export function WaterEntryModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Water Entry" centered>
        <WaterEntry />
      </Modal>

      <Button onClick={open}>Water Entry</Button>
    </>
  );
}
