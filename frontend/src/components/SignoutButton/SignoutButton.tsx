import { ActionIcon, Button, HoverCard, Text, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FeatherContext } from '@/api/FeatherContext';
import { IconLogout } from '@tabler/icons-react';

export function SignoutButton() {
  const navigate = useNavigate();
  const featherContext = useContext(FeatherContext);
  const theme = useMantineTheme();
  const { colors } = theme;

  async function _onSignout() {
    try {
      await featherContext?.logout();
      navigate('/login');
    } catch {
      console.log('OH NOO, something went wrong');
    }
  }

  return (
    <HoverCard>
      <HoverCard.Target>
        <ActionIcon onClick={_onSignout} variant="transparent" size="lg">
          <IconLogout style={{ width: '128px', height: '128px' }} color={colors.navyBlue[9]} />
        </ActionIcon>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text>Logout</Text>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
