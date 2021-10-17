import React from "react";

// styles
import { styles } from "./styles";

// components
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import Stack from '@mui/material/Stack';

class Template extends React.Component {
  state = {
    templates: [],
    editing: false
  }

  componentDidMount() {
    axios.get(`/api/contents`)
        .then(res => {
            const templates = res.data;
            this.setState({ templates });
        });
  }

  render() {
    const { classes } = this.props;

    return (
      <>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Button sx={{ mb: 20 }}  variant="contained">Add content template</Button>
      </Stack>
      <Grid container spacing={2}>
        {this.state.templates.map(template =>
          <Grid item xs={6}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                { this.state.editing ? (
                  <textarea>
                    editing
                  </textarea>
                ) : (
                  <div>
                    <Typography variant="h3"
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {template.key}
                    </Typography>
                    <Typography>{template.text}</Typography>
                  </div>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => this.setState({editing: true})}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}        
      </Grid>
      </>
    );
  }
}


export default withStyles(styles, { withTheme: true })(Template);
