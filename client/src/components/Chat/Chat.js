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
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';

class Chat extends React.Component {
    state = {
        phoneUsers: [],
        messages: [{text: "Click on a conversation on the left"}]
    }
    
    componentDidMount() {
        axios.get(`/api/phoneusers`)
            .then(res => {
                const phoneUsers = res.data;
                this.setState({ phoneUsers });
            });
        this.scrollToBottom()
    }

    getMessages(user) {
        axios.get(`/api/messages`, { params: { user: user } })
        .then(res => {
            const messages = res.data.map(message => {
                var createdAt = new Date(message.createdAt);
                message.createdTime = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                return message;
            });
            this.setState({ messages });
        });
    }

    componentDidUpdate () {
        this.scrollToBottom()
    }

    messagesEndRef = React.createRef()

    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    render() {
        const { classes } = this.props;
        const secondaryColor = {
            color: "blue"
        };

        return (
            <div>
                <Grid container component={Paper} className={classes.chatSection}>            
                    <Grid item xs={3} className={classes.borderRight500}>
                        <List>
                            {this.state.phoneUsers.map(phoneUser =>
                                <ListItem button key={phoneUser.name} onClick={()=>{this.getMessages(phoneUser._id)}}>
                                    <ListItemIcon>
                                        <Avatar alt={phoneUser.name} />
                                    </ListItemIcon>
                                    <ListItemText primary={phoneUser.name} />
                                </ListItem>                               
                            )}
                        </List>
                    </Grid>

                    <Grid item xs={9}>
                        <List className={classes.messageArea}>
                            {this.state.messages.map((message, index) =>
                                <ListItem key={index}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            {
                                                message.reply ? 
                                                <ListItemText align="right" primary={message.text} primaryTypographyProps={{ style: secondaryColor }} />
                                                :
                                                <ListItemText align="left" primary={message.text} />
                                            }
                                        </Grid>
                                        <Grid item xs={12}>
                                            {
                                                message.reply ? 
                                                <ListItemText align="right" secondary={message.createdTime} secondaryTypographyProps={{ style: secondaryColor }}  />
                                                :
                                                <ListItemText align="left" secondary={message.createdTime} />
                                            }                                            
                                        </Grid>
                                    </Grid>
                                </ListItem>            
                            )}
                            <div ref={this.messagesEndRef} />
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
