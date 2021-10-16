import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { styles } from "./styles";
import { render } from 'ejs';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';

class Chat extends React.Component {
    state = {
        phoneUsers: []
    }
    
    componentDidMount() {
        axios.get(`/api/phoneusers/`)
            .then(res => {
                const phoneUsers = res.data;
                this.setState({ phoneUsers });
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container component={Paper} className={classes.chatSection}>            
                    <Grid item xs={3} className={classes.borderRight500}>
                        <List>
                            {this.state.phoneUsers.map(user =>
                                <ListItem button key={user.name}>
                                    <ListItemIcon>
                                        <Avatar alt={user.name} />
                                    </ListItemIcon>
                                    <ListItemText primary={user.name} />
                                </ListItem>                               
                            )}

                            <ListItem button key="RemySharp">
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                </ListItemIcon>
                                <ListItemText primary="Remy Sharp">Remy Sharp1</ListItemText>
                            </ListItem>
                            <ListItem button key="Alice">
                                <ListItemIcon>
                                    <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                                </ListItemIcon>
                                <ListItemText primary="Alice">Alice</ListItemText>
                            </ListItem>
                            <ListItem button key="CindyBaker">
                                <ListItemIcon>
                                    <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                                </ListItemIcon>
                                <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                            </ListItem>
                        </List>
                    </Grid>

                    <Grid item xs={9}>
                        <List className={classes.messageArea}>
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="2">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align="left" secondary="09:31"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="3">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" secondary="10:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        </List>
                        <Divider />
                        <Grid container style={{padding: '20px'}}>
                            <Grid item xs={11}>
                                <TextField id="outlined-basic-email" label="Send custom reply" fullWidth />
                            </Grid>
                            <Grid item xs={1} align="right">
                                <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Chat);
