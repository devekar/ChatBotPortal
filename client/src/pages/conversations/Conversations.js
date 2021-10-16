import React from "react";

// styles
import useStyles from "./styles";

// components
import Chat from "../../components/Chat";

export default function ChatPage() {
  var classes = useStyles();

  return (
    <>
      <Chat />
    </>
  );
}
