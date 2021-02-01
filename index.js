/**
 * Module Imports
 */
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./util/musicBoxUtil");

const client = new Client({ disableMentions: "everyone" });

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");



/**
 * Client Events
 */
client.on('message', message => {
  if(message.author.id !== '575342593630797825') return message.reply('Ezt csak a ( [ BOT OWNER ] ) használhatja.')
  if(message.content.startsWith(`${PREFIX}restart`)) {
    channel.send('Resetting...')
    .then(msg => client.destroy())
    .then(() => client.login(TOKEN));
  }
});
client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`${PREFIX}help and ${PREFIX}play`, { type: "LISTENING" });
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {

  //if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
  if(message.author.id === '660233578830888980') return message.reply('Te nem használhatod a botot!')
});
/*

    //  EZEK OLYAN PARANCSOK AMIKET CSAK A ( [ BOT OWNER  ] ) TUD HASZNÁLNI . | PARANCSOK CSAK IDEGLENES HIBA JAVÍTÁSRA JÓK (PL: Ha laggol a bot : API restart  ) | vagy : Nem tolti be a youtube zenéket/Status Code: 429 : Restart Con. to Db. |)

const Call_cmd_functions = {

  function('set_theme') {
    call.function()
  }

  function('eq') {  //  SIMPLE EQ
    call.function()
  }

  function('setserver') {  // Egy szervert adminá teszel és ott leget használni az admin commnadokat. ( [ ONLY ADMIN LEVEL 5 ] )
    call.function()
  }

  function('setbotadmin') {  // adminserveren [1] admin -t ki tudsz nevezni!
    call.function()
  }

  function('restart_api') {  // API restart
    call.function()
  }
  fun
  ction('restart_connection') {  // Restart Con. to Db.
    call.function()
  }

  function('generate_admin_token') { // Admin login token generate ( [ ONLY BOT OWNER ] )
    call.function()
  }
                                      // Generate_admin_token es login_admin = Eggyütes használat | (Loginkód) random generált code | Grant =  access(AdminLevel(5) = AllBotCommand) | és secret commandok.
  function('login_admin') {
    call.function()
  }

  function('removeserver ') {  // Admin server törlés
    call.function()
  }

  function('logout_admin') {  // kijelentkezés az admin mode ból .
    call.function()
  }

  //END

}

*/