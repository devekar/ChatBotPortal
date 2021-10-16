import React from "react";
import {useState} from "react";

// styles
import useStyles from "./styles";

// components
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function Template(props) {
  var classes = useStyles();

  const [editing, setEditing] = useState(false);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        { editing ? (
          <textarea>
            editing
          </textarea>
        ) : (
          <div>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography>Name: 'RAAM'</Typography>
            <Typography>Blood group: 'AB+'</Typography>
            <Typography>"Patient Ram is having bloodgroup AB+"</Typography>
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setEditing(true)}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
