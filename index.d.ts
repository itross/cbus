declare class CommandBus {
    registerHandler<T = unknown, R = unknown>(command: string, handler: (data: T) => Promise<R>): CommandBus
    hasHandler(command: string): boolean
    send<T = unknown, R = unknown>(command: string, data: T): Promise<R>
}

export = CommandBus
