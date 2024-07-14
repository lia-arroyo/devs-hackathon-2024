import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { WaterEntry } from './WaterEntry';
import { IconPlus } from '@tabler/icons-react';

interface Iprops {
  setWaterlevel: any;
  closeModal: () => void;
}

export function WaterEntryModal(props: Iprops) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered radius={10}>
        <WaterEntry setWaterlevel={props.setWaterlevel} closeModal={close} />
      </Modal>

      <Button leftSection={<IconPlus size={20} />} variant="gradient" size="sm" onClick={open}>
        Record Drink
      </Button>
    </>
  );
}
