const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
require("dotenv").config();

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
});

async function streams() {
  const newStream = await Moralis.Streams.add({
    chains: [EvmChain.SEPOLIA],
    description: "Listen for USDC Transfers",
    tag: "transfers",
    includeContractLogs: true,
    includeNativeTxs: false,
    webhookUrl: "https://5168-83-6-174-22.ngrok-free.app/webhook",

  });

  const { id } = newStream.toJSON();

  const address = "0xa3EA94756a6d1f6Bc4727a38fe5F7aa4d568D52E";
  await Moralis.Streams.addAddress({ address, id });
//   const tokenAddressUSDC = "0xfff9976782d46cc05630d1f6ebab18b2324d6b14";
//   await Moralis.Streams.addAddress({ address: tokenAddressUSDC, id });

  console.log("Stream created...");
}

streams();
