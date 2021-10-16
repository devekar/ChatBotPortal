import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiYoutube as YoutubeIcon
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Conversations from "../../pages/conversations";
import Content from "../../pages/content";
import Rules from "../../pages/rules";
import Members from "../../pages/members";


// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/chat" component={Conversations} />
              <Route path="/app/content" component={Content} />
              <Route path="/app/rules" component={Rules} />
              <Route path="/app/members" component={Members} />
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <div>
                <Link
                  color={'primary'}
                  href={''}
                  target={'_blank'}
                  className={classes.link}
                >
                  TurnTheBus
                </Link>
                <Link
                  color={'primary'}
                  href={''}
                  target={'_blank'}
                  className={classes.link}
                >
                  About Us
                </Link>
              </div>
              <div>
                <Link
                  href={''}
                  target={'_blank'}
                >
                  <IconButton aria-label="facebook">
                    <Icon
                      path={FacebookIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={''}
                  target={'_blank'}
                >
                  <IconButton aria-label="youtube">
                    <Icon
                      path={YoutubeIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
              </div>
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
