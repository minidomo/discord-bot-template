import { Client, Intents } from 'discord.js';
import { commands } from './commands';
import { token } from './config';
import { logger } from './logger';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }) as Client<true>;

client.once('ready', () => {
    logger.info(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
    if (message.author.bot) return;

    logger.info(`${message.author.tag}: ${message.content}`);
});

client.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if (command) {
        command.execute(interaction);
    }
});

client.login(token);
