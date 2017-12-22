const Slack = require("slack-node");
const ARG_ENV = 2;
const WEBHOOK_URI = "https://hooks.slack.com/services/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";

const slackInstance = new Slack();
slackInstance.setWebhook(WEBHOOK_URI);

slackInstance.webhook({
  channel: "#qtum",
  username: "Deploy informer",
  icon_emoji: ":electrode:",
  text: `React/Node.js App: deploy complete on stage: ${ process.argv[ARG_ENV]}`
}, (err, response) => {
// eslint-disable-next-line
  console.log(response);
});
