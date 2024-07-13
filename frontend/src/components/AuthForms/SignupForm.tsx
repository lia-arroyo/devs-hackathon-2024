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
      <Title ta="center" className={classes.title}>
        Register here!
      </Title>

      <Paper p={30} mt={30} className={classes.form}>
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
        />
        <TextInput
          label="Username"
          placeholder="Name"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          required
          mt="md"
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
          <Anchor size="sm" component="button">
            Login here
          </Anchor>
        </Text>
      </Paper>
    </Paper>
  );
}
