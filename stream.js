const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
require("dotenv").config();

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
});

const abi = {
  inputs: [{ internalType: "address", name: "", type: "address" }],
  name: "balanceOf",
  outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  stateMutability: "view",
  type: "function",
};

const triggerFrom = {
  contractAddress: "$contract",
  functionAbi: abi,
  inputs: ["$from"],
  type: "erc20transfer",
};

const triggerTo = {
  contractAddress: "$contract",
  functionAbi: abi,
  inputs: ["$to"],
  type: "erc20transfer",
};


const triggers = [triggerFrom, triggerTo];

async function streams() {
  const newStream = await Moralis.Streams.add({
    chains: [EvmChain.SEPOLIA],
    description: "Listen for USDC Transfers",
    tag: "transfers",
    includeContractLogs: true,
    includeNativeTxs: false,
    webhookUrl: "https://6f51-83-6-174-22.ngrok-free.app/webhook",
  });

  const { id } = newStream.toJSON();

  const address = "0xa3EA94756a6d1f6Bc4727a38fe5F7aa4d568D52E";
  await Moralis.Streams.addAddress({ address, id });
  await Moralis.Streams.update({
    id: id,
    chains: [EvmChain.SEPOLIA],
    triggers: triggers,
});



  console.log("Stream created...");
}

streams();
