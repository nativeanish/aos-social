import { message, createDataItemSigner, result } from "@permaweb/aoconnect";
import { ID } from ".";
import useAccount from "../../store/useAccount";
import useIntroField from "../../store/Onboard/useIntroField";
import useAlertLoading from "../../store/useAlertLoading";
import { convertSVGToBase64 } from "../svg";
import useUser from "../../store/useUser";
export const check_user_exits = async () => {
  const _data = await message({
    process: ID,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [{ name: "Action", value: "check_user_exist" }],
  });
  const data = await result({
    process: ID,
    message: _data,
  });
  console.log(data);
  if (data.Messages[0].Data) {
    const _data = JSON.parse(data.Messages[0].Data);
    console.log(_data);
    if (_data.status) {
      console.log("Sending data");
      useAccount.setState({ account: true });
      return true;
    } else {
      useAccount.setState({ account: false });
      return false;
    }
  } else {
    return false;
  }
};
export const check_username = async (username: string) => {
  const message_id = await message({
    process: ID,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [
      { name: "Action", value: "check_username" },
      { name: "username", value: username },
    ],
  });
  const data = await result({
    process: ID,
    message: message_id,
  });
  const _data = JSON.parse(data.Messages[0].Data);
  if (_data.status) {
    return true;
  } else {
    return false;
  }
};
export const register = async () => {
  const name = useIntroField.getState().name;
  const username = useIntroField.getState().username;
  const data = useIntroField.getState().data;
  if (data?.length && name.length && username.length) {
    useAlertLoading.setState({ show: true });
    useAlertLoading.setState({
      title: "Registering",
    });
    useAlertLoading.setState({
      description: "Registering User",
    });
    try {
      const _data = await message({
        process: ID,
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [
          { name: "Action", value: "register_user" },
          { name: "name", value: name },
          { name: "username", value: username },
        ],
        data: convertSVGToBase64(data),
      });
      const _data2 = await result({
        process: ID,
        message: _data,
      });
      console.log(_data2);
      const _data3 = JSON.parse(_data2.Messages[0].Data);
      console.log(_data3);
      if (_data3.status) {
        useAlertLoading.setState({ show: false });
        return true;
      } else {
        useAlertLoading.setState({ show: false });
        return false;
      }
    } catch (err) {
      console.log(err);
      useAlertLoading.setState({ show: false });
      return false;
    }
  } else {
    return false;
  }
};

export const get = async () => {
  try {
    const messages = await message({
      process: ID,
      signer: createDataItemSigner(window.arweaveWallet),
      tags: [{ name: "Action", value: "get" }],
    });
    const data = await result({
      process: ID,
      message: messages,
    });
    console.log(data);
    const _data = JSON.parse(data.Messages[0].Data);
    console.log(_data);
    if (_data.status) {
      useAccount.setState({ account: true });
      useAccount.setState({ img: String(_data.data.image) });
      useAccount.setState({ name: _data.data.name });
      useAccount.setState({ username: _data.data.username });
      useAccount.setState({
        description:
          _data.data.description === "<empty>" ? "" : _data.data.description,
      });
      useAccount.setState({ follower: _data.data.follower });
      useAccount.setState({ following: _data.data.following });
      console.log(_data.data.notifications);
      useAccount.setState({ notifications: _data.data.notification });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const get_user_by_username = async (username: string) => {
  try {
    const messages = await message({
      process: ID,
      signer: createDataItemSigner(window.arweaveWallet),
      tags: [
        { name: "Action", value: "get_user" },
        { name: "username", value: username },
      ],
    });
    const data = await result({
      process: ID,
      message: messages,
    });
    const _data = JSON.parse(data.Messages[0].Data);
    if (_data.status) {
      useUser.setState({ account: true });
      useUser.setState({ img: String(_data.data.image) });
      useUser.setState({ name: _data.data.name });
      useUser.setState({ username: _data.data.username });
      useUser.setState({
        description:
          _data.data.description === "<empty>" ? "" : _data.data.description,
      });
      useUser.setState({ follower: _data.data.follower });
      useUser.setState({ following: _data.data.following });
      return _data.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const search = async (username: string) => {
  try {
    const messages = await message({
      process: ID,
      signer: createDataItemSigner(window.arweaveWallet),
      tags: [
        { name: "Action", value: "search" },
        { name: "param", value: username },
      ],
    });
    const data = await result({
      process: ID,
      message: messages,
    });
    const _data = JSON.parse(data.Messages[0].Data);
    if (_data.status && _data.data.length) {
      return _data.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const _follow = async (username: string) => {
  try {
    const messages = await message({
      process: ID,
      signer: createDataItemSigner(window.arweaveWallet),
      tags: [
        { name: "Action", value: "follow" },
        { name: "username", value: username },
      ],
    });
    const data = await result({
      process: ID,
      message: messages,
    });
    console.log(data);
    const _data = JSON.parse(data.Messages[0].Data);
    console.log(_data);
    if (_data.status) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
