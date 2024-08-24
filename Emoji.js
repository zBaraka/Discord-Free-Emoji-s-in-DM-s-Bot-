const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const DISCORD_TOKEN = 'YOUR_DISCORD_TOKEN';
const CLIENT_ID = 'YOUR_CLIENT_ID';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    // Define emoji commands: Map command names to corresponding emoji strings
    // Add your custom emojis to the bot's dashboard, and update this map with their IDs.
    // Ensure the command names match the keys in this object and do not use capital letters.
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

    // If the command name matches one in the emojiCommands, reply with the corresponding emoji
    if (emojiCommands[commandName]) {
        await interaction.reply(emojiCommands[commandName]);
    }
});

// Define the commands: Update the names and descriptions to match the ones used in emojiCommands
// Ensure the command names are lowercase and match those in the emojiCommands object
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
    },  // Add more commands and emojis as needed
];

// Initialize REST API for Discord and register global commands
const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing global application (/) commands.');

        // Register commands globally. This will replace any existing global commands.
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),  // Global command registration
            { body: commands },
        );

        console.log('Successfully reloaded global application (/) commands.');
    } catch (error) {
        console.error('Error reloading commands:', error);
    }
})();

// Log in to Discord with your bot token
client.login(DISCORD_TOKEN);
