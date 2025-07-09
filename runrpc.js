import { Client } from "@xhayper/discord-rpc";
import { ActivityType } from 'discord-api-types/v10';

const client = new Client({
    clientId: "1392526007621259335"
});

client.on("ready", () => {
    client.user?.setActivity({
      type: ActivityType.Playing,
      name: "hdsRPC",
      state: "Hello, world!",
      largeImageKey: "hds"
    });
});

// HDS stuff
const socket = new WebSocket('ws://localhost:3476');

socket.addEventListener("message", (event) => {
  client.user?.setActivity({
      state: "Heartrate: "+event.data.split(":")[1],
      largeImageKey: "hds"
  });
});

socket.addEventListener("error", (event) => {
  console.log("WebSocket error: ", event);
});

client.login();