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
  useMantineTheme, em,
} from '@mantine/core';
import classes from './AuthForms.module.css';
import { convertToRGBA } from '@/utils/convertToRgba';
import {FeatherContext} from "@/api/FeatherContext";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export function LoginForm() {
  const theme = useMantineTheme();
  const { colors } = theme;
  const backgrundColor = { backgroundColor: convertToRGBA('#ffffff', 0.3) };

  // Featherjs
  const navigate = useNavigate();
  const featherContext = useContext(FeatherContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


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
      console.log("OH NOO, wrong password")
    }

  }

  return (
    <Paper radius="lg" style={backgrundColor} className={classes.container}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Paper p={30} mt={30} className={classes.form}>
        <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            required
        />
        <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            required mt="md"
            onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={() => {_onSignin()}}>
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
