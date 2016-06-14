import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';

export default class App extends Component {
    constructor(props) {
        super(props);
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
