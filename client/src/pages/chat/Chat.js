import React from "react";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Chat from "../../components/Chat";

export default function TypographyPage() {
  var classes = useStyles();

  return (
    <>
      <Chat />
    </>
  );
}
