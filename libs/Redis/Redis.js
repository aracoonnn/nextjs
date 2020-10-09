import redis from "redis";
import url from "url";
const port = Number(process.env.REDIS_PORT);
const { hostname, auth } = url.parse(process.env.REDIS_URL ?? "");
const client = redis.createClient({ port, host: hostname ?? undefined });
if (auth) {
  client.auth(auth.split(":")[1]);
}
client.on("connect", () => {
  console.log("redis is connected");
});
client.on("error", (err) => {
  console.log("there was an error", err);
});
client.on("exit", () => {
  client.quit();
});
export default client;
