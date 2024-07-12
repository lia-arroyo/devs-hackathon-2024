import { createContext } from 'react';
import { ClientApplication } from '@/api/useFeathers';
export const FeatherContext = createContext<ClientApplication | null>(null);
