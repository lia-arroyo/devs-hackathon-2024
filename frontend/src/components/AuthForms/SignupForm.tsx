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
    useMantineTheme
} from "@mantine/core";
import classes from "@/components/AuthForms/AuthForms.module.css";
import {convertToRGBA} from "@/utils/convertToRgba";

export function SignupForm() {
    const theme = useMantineTheme();
    const {colors} = theme;

    const backgrundColor = { backgroundColor: convertToRGBA('#ffffff', 0.3) };

    return (
        <Paper radius="lg" style={backgrundColor} className={classes.container}>
            <Title ta="center" className={classes.title}>
                Register here!
            </Title>

            <Paper p={30} mt={30} className={classes.form}>
                <TextInput label="Email" placeholder="you@mantine.dev" required />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                <Button fullWidth mt="xl">
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
    )
}
