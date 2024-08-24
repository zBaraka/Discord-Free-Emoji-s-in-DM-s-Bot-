const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const DISCORD_TOKEN = 'YOUR_DISCORD_TOKEN';
const CLIENT_ID = 'YOUR_CLIENT_ID';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log('Bot ist bereit!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    // add emojis in your bot's dashboard 
    // replace example and also replace the command name with the emoji id.
    const emojiCommands = {
        'command1': '<example1>', 
        'command2': '<:example2>',
        'command3': '<:example3>',
        'command4': '<:example4>',
        'command5': '<:example5>',
        'command6': '<:example6>',
        'command7': '<:example7>',
        'command8': '<:example8>',
    };

    if (emojiCommands[commandName]) {
        await interaction.reply(emojiCommands[commandName]);
    }
});

// rename the command after you added the emoji to the same one as in the list above 
// Do not use capitalized letters

const commands = [
    {
        name: 'command1',
        description: 'Responds with "Example1 Emoji"',
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },
    {
        name: 'command2',
        description: 'Responds with "Example2 Emoji"',
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },
    {
        name: 'command3',
        description: 'Responds with "Example3 Emoji"',
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },
    {
        name: 'command4',
        description: 'Responds with "Example4 Emoji"',
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },
    {
        name: 'command5',
        description: 'Responds with "Example5 Emoji"',
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },
    {
        name: 'command6',
        description: 'Responds with "Example6 Emoji"',
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },
    {
        name: 'command7',
        description: 'Responds with "Example7 Emoji"',
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },
    {
        name: 'command8',
        description: 'Responds with "Example8 Emoji"',
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },  // you can add more emojis to your liking
];

const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing global application (/) commands.');

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),  // Global commands
            { body: commands },
        );

        console.log('Successfully reloaded global application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.login(DISCORD_TOKEN);
