///<reference path="../_typings.ts"/>

module BitbucketNotifier {
    'use strict';

    export class SocketManager {
        static $inject: string[] = ['socketFactory', 'Config'];
        public socket: any;

        private connection: SocketIOClient.Socket;

        constructor(private socketFactory, config: Config) {
            this.connection = io.connect(config.getSocketServerAddress());
            this.socket = socketFactory({
                ioSocket: this.connection
            });
        }
    }
}
