const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const axios = require('axios');

const DISCORD_TOKEN = 'YOUR_TOKEN';
const CLIENT_ID = 'CLIENT_ID';
const APPLICATION_ID = 'YOUR_APP_ID;  // User ID

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
    console.log('Bot is ready!');

    try {
        const emojiData = await axios.get(`https://discord.com/api/v9/applications/${APPLICATION_ID}/emojis`, {
            headers: {
                Authorization: `Bot ${DISCORD_TOKEN}`
            }
        });

        const emojis = emojiData.data.items;
        const commands = emojis.map(emoji => {
            const emojiFormat = emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;

            return {
                name: emoji.name.toLowerCase(),
                description: `Responds with "${emoji.name} Emoji"`,
                integration_types: [0, 1],
                contexts: [0, 1, 2]
            };
        });

        const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

        console.log('Started refreshing global application (/) commands.');

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );

        console.log('Successfully reloaded global application (/) commands.');
    } catch (error) {
        console.error('Error fetching or creating commands:', error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    try {
        const emojiData = await axios.get(`https://discord.com/api/v9/applications/${APPLICATION_ID}/emojis`, {
            headers: {
                Authorization: `Bot ${DISCORD_TOKEN}`
            }
        });

        const emojis = emojiData.data.items;
        const emoji = emojis.find(e => e.name.toLowerCase() === commandName);

        if (emoji) {
            const emojiFormat = emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;
            await interaction.reply(emojiFormat);
        } else {
            await interaction.reply('Emoji not found.');
        }
    } catch (error) {
        console.error('Error responding with emoji:', error);
        await interaction.reply('Error fetching emoji.');
    }
});

client.login(DISCORD_TOKEN);
