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
  em,
} from '@mantine/core';
import classes from './AuthForms.module.css';
import { convertToRGBA } from '@/utils/convertToRgba';
import { FeatherContext } from '@/api/FeatherContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { color } from 'framer-motion';

export function LoginForm() {
  const backgroundColor = { backgroundColor: convertToRGBA('#ffffff', 0.4) };

  // Featherjs
  const navigate = useNavigate();
  const featherContext = useContext(FeatherContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await featherContext?.reAuthenticate();
        navigate('/');
      } catch {}
    };
    checkAuth();
  }, [navigate, featherContext]);

  async function _onSignin() {
    try {
      await featherContext?.authenticate({
        strategy: 'local',
        email: email,
        password: password,
      });
      navigate('/');
    } catch {
      console.log('OH NOO, wrong password');
    }
  }

  return (
    <Paper radius="lg" style={backgroundColor} className={classes.container}>
      <Title ta="center" order={2} c="navyBlue.9">
        Welcome back!
      </Title>

      <Paper mt={10} className={classes.form}>
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
          classNames={{ label: classes.label }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          required
          mt="md"
          onChange={(event) => setPassword(event.currentTarget.value)}
          classNames={{ label: classes.label }}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" size="xs" />
          <Anchor component="button" size="xs">
            Forgot password?
          </Anchor>
        </Group>
        <Button
          fullWidth
          mt="xl"
          onClick={() => {
            _onSignin();
          }}
        >
          Sign in
        </Button>
        <Text size="xs" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor
            size="xs"
            component="button"
            onClick={() => {
              navigate('/signup');
            }}
          >
            Create account
          </Anchor>
        </Text>
      </Paper>
    </Paper>
  );
}
