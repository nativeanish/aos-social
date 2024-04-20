import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { ID } from ".";

export const savePost = async (args: string) => {
  console.log(args);
  const messages = await message({
    process: ID,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [
      { name: "Action", value: "add_post" },
      { name: "time", value: new Date().valueOf().toString() },
    ],
    data: args,
  });
  const data = await result({
    process: ID,
    message: messages,
  });
  const _data = JSON.parse(data.Messages[0].Data);
  console.log(_data);
};
