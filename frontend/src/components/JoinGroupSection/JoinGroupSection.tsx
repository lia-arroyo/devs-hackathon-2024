import { Button, Center, Container, Input, Text } from '@mantine/core';
import {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {FeatherContext} from "@/api/FeatherContext";
import {CheckLogin} from "@/components/CheckLogin/CheckLogin";

const JoinGroupSection = () => {
  const [groupCode, setGroupCode] = useState<String>();
  const navigate = useNavigate();
  const featherContext = useContext(FeatherContext);
  const placeholderText = 'Enter group code here';

  async function _onJoinGroup() {
      if (groupCode) {
            try {
                const user = await featherContext?.authenticate();
                console.log(user)
                const result = await featherContext?.service('groups').joinGroup({
                    userId: user?.user._id, // It cries in typescript. Booo hooo hooo
                    groupCode: groupCode,
                })
                console.log("Success joined")
                console.log(result) // This contained the group updated
                // todo: Perhaps redirect
            } catch (error) {
                console.log(error);
                console.log("Error joining group");
            }
      }
  }

  return (
    <Container style={{ margin: 0, padding: 0 }}>
      <Text size="xl" ta="center">
        Join Group
      </Text>
      <Center>
        <Input
          type="Number"
          placeholder={placeholderText}
          value={groupCode ?? ''}
          onChange={(e) => setGroupCode(e.target.value)}
        />
        <Button variant="filled" onClick={()=>{_onJoinGroup()}}>Join</Button>
      </Center>
    </Container>
  );
};

export default JoinGroupSection;
