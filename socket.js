import { io } from 'socket.io-client';

export const socket = io(process.env.EXPO_PUBLIC_LOCAL_JAMIFY_SOCKET_IO_URL);  //	use the IP address of your machine