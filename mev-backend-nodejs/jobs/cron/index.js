const cron = require("node-cron");

const spammingBotMessage = require("./spammingBotMessage");
const expiringUserLicense = require("./expiringUserLicense");
const expiringUserFreeTier = require("./expiringUserFreeTier");
const callingSandwichTransaction = require("./callingSandwichFunction");
const callingArbSandwichTransaction = require("./callingArbSandwichFunction");

module.exports = function () {
  cron.schedule("*/5 * * * *", async () => spammingBotMessage(), {
    scheduled: true,
  });
  cron.schedule("0 * * * *", async () => expiringUserLicense(), {
    scheduled: true,
  });
  cron.schedule("0 * * * *", async () => expiringUserFreeTier(), {
    scheduled: true,
  });
  cron.schedule("*/5 * * * *", async () => callingSandwichTransaction(), {
    scheduled: true,
  });
  cron.schedule("*/5 * * * *", async () => callingArbSandwichTransaction(), {
    scheduled: true,
  });
};
