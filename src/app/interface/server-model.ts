import { ServerStatus } from './../enum/server-status.enum';


export interface ServerModel {
    id: number;
    serverIpAddress: string;
    serverName: string;
    serverLocation: string;
    serverStatus: ServerStatus
}
