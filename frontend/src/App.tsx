import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { FeatherContext } from '@/api/FeatherContext';
import {useFeathers} from "@/api/useFeathers";

export default function App() {
  return (
    <MantineProvider theme={theme}>
        <FeatherContext.Provider value={useFeathers()}>
            <Router />
        </FeatherContext.Provider>
    </MantineProvider>
  );
}
