import {Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {FeatherContext} from "@/api/FeatherContext";

export function SignoutButton() {
  const navigate = useNavigate();
  const featherContext = useContext(FeatherContext);

  async function _onSignout() {
    try {
      await featherContext?.logout();
      navigate('/login');
    } catch {
      console.log('OH NOO, something went wrong');
    }
  }

  return (
    <Button
      variant="filled"
      color="red"
      onClick={() => _onSignout()}
    >
      Sign out
    </Button>
  );
}
