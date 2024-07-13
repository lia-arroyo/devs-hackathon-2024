import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  useMantineTheme,
} from '@mantine/core';
import classes from './AuthForms.module.css';
import { convertToRGBA } from '@/utils/convertToRgba';

export function LoginForm() {
  const theme = useMantineTheme();
  const { colors } = theme;

  const backgrundColor = { backgroundColor: convertToRGBA('#ffffff', 0.3) };
  return (
    <Paper radius="lg" style={backgrundColor} className={classes.container}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Paper p={30} mt={30} className={classes.form}>
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>
      </Paper>
    </Paper>
  );
}
