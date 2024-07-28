import { io } from 'socket.io-client';

export const socket = io('192.168.1.99:3000'); //	use the IP address of your machine