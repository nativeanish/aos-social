import { message, createDataItemSigner, result } from "@permaweb/aoconnect";
import { ID } from ".";
import useAccount from "../../store/useAccount";
import useIntroField from "../../store/Onboard/useIntroField";
import useAlertLoading from "../../store/useAlertLoading";
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
        data: data,
      });
      const _data2 = await result({
        process: ID,
        message: _data,
      });
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
    const _data = JSON.parse(data.Messages[0].Data);
    console.log(_data);
    if (_data.status) {
      useAccount.setState({ account: true });
      useAccount.setState({ img: _data.data.image });
      useAccount.setState({ name: _data.data.name });
      useAccount.setState({ username: _data.data.username });
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
      return _data.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
