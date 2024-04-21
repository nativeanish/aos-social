import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { ID } from ".";
import usePostStore from "../../store/usePostStore";
import { get } from "./user";

export const savePost = async (args: string) => {
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
  //   const _data = JSON.parse(data.Messages[0].Data);
  await getPost();
};

export const getPost = async () => {
  const messages = await message({
    process: ID,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [{ name: "Action", value: "get_post" }],
  });
  const data = await result({
    process: ID,
    message: messages,
  });
  const _data = JSON.parse(data.Messages[0].Data);
  console.log(_data);
  if (_data.status) {
    usePostStore.setState({ posts: _data.data });
  }
  return _data;
};

export const add_description = async (text: string) => {
  const messages = await message({
    process: ID,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [
      { name: "Action", value: "update" },
      { name: "description", value: text },
    ],
  });
  const data = await result({
    process: ID,
    message: messages,
  });
  const _data = JSON.parse(data.Messages[0].Data);
  if (_data.status) {
    await get();
  }
};

export const like_async = async (id: string) => {
  const messages = await message({
    process: ID,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [
      { name: "Action", value: "like" },
      { name: "id", value: id },
    ],
  });
  const data = await result({
    process: ID,
    message: messages,
  });
  const _data = JSON.parse(data.Messages[0].Data);
  if (_data.status) {
    await getPost();
  }
};

export const comment_async = async (id: string, text: string) => {
  console.log(id);
  const messages = await message({
    process: ID,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [
      { name: "Action", value: "comment" },
      { name: "id", value: id },
    ],
    data: text,
  });
  const data = await result({
    process: ID,
    message: messages,
  });
  console.log(data);
  const _data = JSON.parse(data.Messages[0].Data);
  if (_data.status) {
    await getPost();
  }
};
