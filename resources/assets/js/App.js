import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import io from 'socket.io-client';
import env from './env';

export default class App extends Component {
    constructor(props) {
        super(props);

        const socket = io(env);
        socket.on('test:something-happened', function(msg){
            alert(msg);
        });
    }

    render() {
        return (
            <div>
                <AppBar
                    title="KRATOS Restopoly"
                />

                <div>
                    <Tabs>
                        <Tab label="Games">
                            <h2>Spiele</h2>
                        </Tab>
                        <Tab label="User">
                            <h2>User</h2>
                        </Tab>
                    </Tabs>
                </div>

            </div>
        );
    }
}
