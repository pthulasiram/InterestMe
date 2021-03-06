import React from 'react';
import { Router, Route, IndexRoute, hashHistory, withRouter, IndexRedirect } from 'react-router';
import App from './app';
import Board from './board/board';
import {Provider} from 'react-redux';
import { getBoard } from '../actions/board_actions';
import PinContainer from './pins/pins_container';
import BoardContainer from './boards/board_container'
import PinNewFormContainer from './pins/pin_new_container'
import HomepageContainer from './homepage/homepage_container'
import Home from './home/home'
import UserProfileContainer from './profiles/user_profile_page_container'
import Signup from './session/signup'
import SessionContainer from './session/session_container'
import Profile from './profile/profile'


const Root = ({ store }) => {

  const _redirectIfLoggedIn = (nextState, replace) => {
    let currentUser = window.store.getState().session.currentUser
    if (currentUser) {
      replace('/home')
    }
  }

  const _redirectIfLoggedOut = (nextState, replace) => {
    let currentUser = window.store.getState().session.currentUser
    if (!currentUser) {
      replace('/session')
    }
  }

  return(
      <Provider store={ store }>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRedirect to="/session"/>
          <Route path="session" component={SessionContainer}  onEnter={_redirectIfLoggedIn}/>
          <Route IndexRoute path="home" component={Home}  onEnter={_redirectIfLoggedOut} />
          <Route path="boards/:boardId" component={Board}  onEnter={_redirectIfLoggedOut}/>
          <Route path="user/:userId" component={Profile} onEnter={_redirectIfLoggedOut} />
        </Route>
      </Router>
    </Provider>
  )
}

export default Root;
