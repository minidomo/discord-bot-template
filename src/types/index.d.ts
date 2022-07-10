import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
    SlashCommandSubcommandBuilder,
} from '@discordjs/builders';
import { CommandInteraction, ModalSubmitInteraction, MessageEmbed } from 'discord.js';

declare global {
    namespace BotTypes {
        type CustomId = string;
        type Unique = string;

        interface BaseCommand<T> {
            data: T;
            execute: (interaction: CommandInteraction, unique: Unique) => Promise<void>;
            isPermitted: (interaction: CommandInteraction) => boolean;
        }

        type Command = BaseCommand<SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder>;
        type Subcommand = BaseCommand<SlashCommandSubcommandBuilder>;

        // Pages
        interface PagesOptions {
            interaction: CommandInteraction | ModalSubmitInteraction;
            unique: Unique;
            lines: string[];
            itemName: string;
            embed?: MessageEmbed;
            linesPerPage?: number;
            idleTime?: number;
        }

        interface PagesStartOptions {
            page?: number;
            ephemeral?: boolean;
            deferred?: boolean;
        }
    }
}
