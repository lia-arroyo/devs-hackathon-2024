import {
  Anchor,
  Button,
  Checkbox,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Select,
  Text,
  TextInput,
  Title,
  rem,
  useMantineTheme,
} from '@mantine/core';
import classes from '@/components/AuthForms/AuthForms.module.css';
import { convertToRGBA } from '@/utils/convertToRgba';
import { useContext, useState } from 'react';
import { FeatherContext } from '@/api/FeatherContext';
import { useNavigate } from 'react-router-dom';

export function CreateGroupForm() {
  // Styling
  const theme = useMantineTheme();
  const { colors } = theme;
  const backgrundColor = { backgroundColor: convertToRGBA('#ffffff', 0.3) };
  const navigate = useNavigate();

  // Featherjs
  const featherContext = useContext(FeatherContext);
  const [groupName, setGroupName] = useState('');
  const [accountabilityType, setAccountabilityType] = useState<string | null>('');
  const [stake, setStake] = useState('');

  // data
  const accountabilityData = [
    { value: 'water', label: 'Water Drinking' },
    { value: 'steps', label: 'Steps Amount', disabled: true },
    { value: 'gym', label: 'Gym', disabled: true },
    { value: 'meditation', label: 'Meditation', disabled: true },
  ];

  return (
    <Paper radius="lg" style={backgrundColor} className={classes.container}>
      <Paper p={30} className={classes.form}>
        <Flex justify="space-between" align="space-between" direction="column">
          <Title ta="center" className={classes.title}>
            Create Group
          </Title>
          <Flex gap={rem(16)} justify="space-between" align="space-between" direction="column">
            <TextInput
              label="Group Name"
              placeholder="Team Hydrators..."
              value={groupName}
              onChange={(event) => setGroupName(event.currentTarget.value)}
              required
            />
            <Select
              label="Accountability Type"
              placeholder="Select Type"
              data={accountabilityData}
              value={accountabilityType}
              allowDeselect={false}
              onChange={setAccountabilityType}
              required
            />
            <TextInput
              label="Group Stakes"
              placeholder="Group Stakes (optional)"
              value={stake}
              onChange={(event) => setStake(event.currentTarget.value)}
            />
          </Flex>
          <Button fullWidth mt="xl">
            Create Group
          </Button>
        </Flex>
      </Paper>
    </Paper>
  );
}
