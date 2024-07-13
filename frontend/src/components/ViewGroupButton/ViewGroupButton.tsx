import { ActionIcon, useMantineTheme } from '@mantine/core';
import { IconUsersGroup } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const ViewGroupButton = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { colors } = theme;
  return (
    <ActionIcon
      onClick={() => {
        navigate('/');
      }}
      variant="transparent"
      size="lg"
    >
      <IconUsersGroup style={{ width: '128px', height: '128px' }} color={colors.navyBlue[9]} />
    </ActionIcon>
  );
};

export default ViewGroupButton;
