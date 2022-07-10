import { Client, Intents } from 'discord.js';
import { commands } from './commands';
import { token } from './config';
import { CustomId, logger } from './util';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }) as Client<true>;

client.once('ready', () => {
    logger.info(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
    if (message.author.bot) return;

    logger.info(`${message.author.tag}: ${message.content}`);
});

client.on('interactionCreate', interaction => {
    if (!interaction.guild) return;

    if (interaction.isCommand()) {
        const command = commands.get(interaction.commandName) as BotTypes.Command;
        if (command.isPermitted(interaction)) {
            command.execute(interaction, CustomId.createUnique());
        }
    }
});

client.login(token);
