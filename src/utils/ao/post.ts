import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { ID } from ".";
import usePostStore from "../../store/usePostStore";
import { get } from "./user";
import useUserPost from "../../store/useUserPost";

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
  await result({
    process: ID,
    message: messages,
  });
  await getPost();
  return true;
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
  console.log(id);
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
  console.log(data);
  const _data = JSON.parse(data.Messages[0].Data);
  if (_data.status) {
    await getPost();
  }
};

export const comment_async = async (id: string, text: string) => {
  console.log(id);
  console.log(text);
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
    return true;
  }
};

export const get_post_username = async (username: string) => {
  try {
    const messages = await message({
      process: ID,
      signer: createDataItemSigner(window.arweaveWallet),
      tags: [
        { name: "Action", value: "get_post_username" },
        { name: "username", value: username },
      ],
    });
    const data = await result({
      process: ID,
      message: messages,
    });
    const _data = JSON.parse(data.Messages[0].Data);
    console.log(_data);
    if (_data.status) {
      console.log(_data.data);
      useUserPost.setState({ posts: _data.data });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
