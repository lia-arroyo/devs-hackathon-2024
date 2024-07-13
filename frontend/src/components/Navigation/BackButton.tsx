import { ActionIcon } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export function BackButton() {
  const navigation = useNavigate();

  const handleBackButton = () => {
    navigation(-1);
  };

  return (
    <ActionIcon variant="filled" aria-label="Settings" onClick={handleBackButton}>
      <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}
