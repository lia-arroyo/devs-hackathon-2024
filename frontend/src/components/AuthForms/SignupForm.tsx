import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import classes from '@/components/AuthForms/AuthForms.module.css';
import { convertToRGBA } from '@/utils/convertToRgba';
import { useContext, useState } from 'react';
import { FeatherContext } from '@/api/FeatherContext';
import { useNavigate } from 'react-router-dom';
import { usersPath } from '@/api/API_ROUTES';

export function SignupForm() {
  // Styling
  const backgrundColor = { backgroundColor: convertToRGBA('#ffffff', 0.4) };
  const navigate = useNavigate();

  // Featherjs
  const featherContext = useContext(FeatherContext);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function _onSignUp() {
    try {
      await featherContext?.service(usersPath).create({
        email: email,
        name: username,
        password: password,
      });
      await featherContext?.authenticate({
        strategy: 'local',
        email: email,
        password: password,
      });
      navigate('/');
    } catch {
      console.log('Error creating');
    }
  }

  return (
    <Paper radius="lg" style={backgrundColor} className={classes.container}>
      <Title ta="center" order={2} c="navyBlue.9">
        Register here!
      </Title>

      <Paper mt={10} className={classes.form}>
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          mt="sm"
          required
          classNames={{ label: classes.label }}
        />
        <TextInput
          label="Username"
          placeholder="Name"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          mt="sm"
          required
          classNames={{ label: classes.label }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          required
          mt="sm"
          classNames={{ label: classes.label }}
        />
        <Button
          fullWidth
          mt="xl"
          onClick={() => {
            _onSignUp();
          }}
        >
          Create account
        </Button>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Anchor
            size="sm"
            component="button"
            onClick={() => {
              navigate('/login');
            }}
          >
            Login here
          </Anchor>
        </Text>
      </Paper>
    </Paper>
  );
}
