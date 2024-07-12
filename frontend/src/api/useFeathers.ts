import io from 'socket.io-client';
import { type Application, feathers, type TransportConnection } from '@feathersjs/feathers';
import type { SocketService } from '@feathersjs/socketio-client';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';
import * as API_ROUTE from './API_ROUTES';

const API_URI = 'http://localhost:3030/';

export interface Configuration {
    connection: TransportConnection<ServiceTypes>;
}

export type ClientApplication = Application<ServiceTypes, Configuration>;

/////////////////////////////////////
// DEFINE CUSTOM SERVICE FUNCTIONS //
/////////////////////////////////////

type ServiceTypes = {};
/////////////////////////////////////

export const useFeathers = () => {
    const socket = io(API_URI);
    const app: ClientApplication = feathers();
    const socketClient: TransportConnection<ServiceTypes> = socketio(socket);

    app.configure(socketClient);
    app.configure(authentication());

    _registerServices(app, socketClient);
    return app;
}

function _registerServices(
    app: ClientApplication,
    socketClient: TransportConnection<ServiceTypes>
) {
}
