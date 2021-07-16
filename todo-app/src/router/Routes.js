import React from 'react';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import {
    Switch,
} from "react-router-dom";
//components
import TodoList from '../pages/todo/TodoList'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Profile from '../pages/profile/Profile'
import Logout from '../pages/auth/Logout'

const requireLogin = (to, from, next) => {
    const loggedIn = (JSON.parse(JSON.parse(localStorage.getItem('persist:root')).account).token)
    if (to.meta.auth) {
        if (loggedIn === "") {
            next.redirect('/login');
        } else {
            next();
        }
    } else {
        if (loggedIn !== "") {
            next.redirect('/');
        } else {
            next();
        }
    }
};

function routes() {
    return (
        <div>
            <GuardProvider guards={[requireLogin]}>
                <Switch>
                    <GuardedRoute exact path="/login">
                        <Login />
                    </GuardedRoute>
                    <GuardedRoute exact path="/register">
                        <Register />
                    </GuardedRoute>
                    <GuardedRoute exact path="/" meta={{ auth: true }}>
                        <TodoList />
                    </GuardedRoute>
                    <GuardedRoute exact path="/profile" meta={{ auth: true }}>
                        <Profile />
                    </GuardedRoute>
                    <GuardedRoute exact path="/logout" meta={{ auth: true }}>
                        <Logout />
                    </GuardedRoute>
                </Switch>
            </GuardProvider>
        </div >
    );
}

export default routes;