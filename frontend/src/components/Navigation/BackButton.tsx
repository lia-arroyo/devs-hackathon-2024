import { ActionIcon, useMantineTheme } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export function BackButton() {
  const navigation = useNavigate();
  const theme = useMantineTheme();
  const { colors } = theme;
  const handleBackButton = () => {
    navigation(-1);
  };

  return (
    <ActionIcon variant="transparent" aria-label="Settings" onClick={handleBackButton}>
      <IconArrowLeft
        style={{ width: '100%', height: '100%' }}
        stroke={1.5}
        color={colors.navyBlue[9]}
      />
    </ActionIcon>
  );
}
