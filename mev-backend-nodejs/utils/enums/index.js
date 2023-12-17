const activityType = {
  Deposit: "deposit",
  WithDraw: "withdraw",
  StartBot: "botStarted",
  StopBot: "botStopped",
};

const networkChain = {
  Ethereum: "ethereum",
  ArbitrumOne: "arbitrum",
};

const licenseType = {
  SixMonth: "6Month",
  Year: "Yearly",
};

const botActivityType = {
  botStarted: "botStarted",
  botStopped: "botStopped",
  scanningMempool: "scanningMempool",
  sandwichTransaction: "sandwichTransactionSuccessfull",
  sandwichTransactionFailed: "sandwichTransactionFailed",
  sandwichTransactionSuccessfull: "sandwichTransactionSuccessfull",
};

const botActivityMessages = {
  BotStarted: "Bot started",
  BotStopped: "Bot stopped",
  ScanningMemePool: "Scanning the Mempool",
  SandwichTransaction: "Sandwich transaction successfull",
  SandwichTransactionFailed: "Sandwich transaction failed",
  SandwichTransactionSuccessfull: "Sandwich transaction successfull",
};

const freeTierStatus = {
  Active: "active",
  Expired: "expired",
};

const licenseStatus = {
  Active: "active",
  Expired: "expired",
};

const botActivityMessage = {
  Started: "Started the BOT",
  Stopped: "Stopped the BOT",
};

const transactionStatus = {
  Pending: "pending",
  Failed: "failed",
  Completed: "completed",
};

const DepositMessage = (amount) => {
  return `Deposited ${amount}Eth`;
};

const WithDrawMessage = (amount) => {
  return `Withdrawn ${amount}Eth`;
};

module.exports = {
  freeTierStatus,
  activityType,
  DepositMessage,
  WithDrawMessage,
  botActivityMessage,
  transactionStatus,
  networkChain,
  licenseStatus,
  botActivityMessages,
  botActivityType,
  licenseType,
};
