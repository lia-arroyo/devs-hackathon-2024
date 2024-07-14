import io from 'socket.io-client';
import { type Application, feathers, type TransportConnection } from '@feathersjs/feathers';
import type { SocketService } from '@feathersjs/socketio-client';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';
import * as API_ROUTE from './API_ROUTES';
import { WaterIntakeData } from '@/components/Leaderboard/Leaderboard';

const API_URI = 'http://localhost:3030/';

export interface Configuration {
  connection: TransportConnection<ServiceTypes>;
}

export type ClientApplication = Application<ServiceTypes, Configuration>;

/////////////////////////////////////
// DEFINE CUSTOM SERVICE FUNCTIONS //
/////////////////////////////////////
interface UserSocketService extends SocketService {}
interface GroupSocketService extends SocketService {
  joinGroup: (data: { userId: string; gameCode: string }) => Promise<{
    name: string;
    members: string[];
    groupType: string;
    ownerId: string;
    groupCode: string;
    stakes: string;
  }>;
  leaveGroup: (data: { userId: string; gameCode: string }) => Promise<{
    name: string;
    members: string[];
    groupType: string;
    ownerId: string;
    groupCode: string;
    stakes: string;
  }>;
  leaderboard: (data: { groupCode: string }) => Promise<WaterIntakeData[]>;
}

type ServiceTypes = {
  [API_ROUTE.usersPath]: UserSocketService;
  [API_ROUTE.groupsPath]: GroupSocketService;
};
/////////////////////////////////////

export const useFeathers = () => {
  const socket = io(API_URI);
  const app: ClientApplication = feathers();
  const socketClient: TransportConnection<ServiceTypes> = socketio(socket);

  app.configure(socketClient);
  app.configure(authentication());

  _registerServices(app, socketClient);
  return app;
};

function _registerServices(
  app: ClientApplication,
  socketClient: TransportConnection<ServiceTypes>
) {
  app.use(API_ROUTE.usersPath, socketClient.service(API_ROUTE.usersPath), {
    methods: API_ROUTE.userMethods,
  });

  app.use(API_ROUTE.groupsPath, socketClient.service(API_ROUTE.groupsPath), {
    methods: API_ROUTE.groupMethods,
  });
}
