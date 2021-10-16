import React from "react";
import { Grid } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import Template from "../../components/Template";

export default function ContentPage() {
  var classes = useStyles();

  return (
    <Grid item xs={4}>
      <Template />
    </Grid>
  );
}
