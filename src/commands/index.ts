import * as ping from './ping';

export const commands: Map<string, BotTypes.Command> = new Map();
commands
    .set(ping.data.name, ping);
