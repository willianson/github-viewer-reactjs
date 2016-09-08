import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'; injectTapEventPlugin();

// ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import './assets/css/App.css';

// views
import ProjectList from './ProjectList';
import Home from './Home';
import Details from './Details';



class App extends Component
{
	constructor(props)
	{
		super(props);
		this.state = { openDrawer: false, username: 'globocom', currentProject: location.pathname.replace('/', '') };
	}


	handleToggle 	= () => this.setState({openDrawer: !this.state.openDrawer});
	handleClose 	= () => this.setState({openDrawer: false});


	render()
	{
		return (

			<MuiThemeProvider>
				<div className="App">

					<Drawer docked={false} width={280} open={this.state.openDrawer} onRequestChange={(openDrawer) => this.setState({openDrawer})}>
						<ProjectList username={this.state.username} currentProject={this.state.currentProject} />
					</Drawer>


					<AppBar className="AppBar" title="Github Viewer" onLeftIconButtonTouchTap={this.handleToggle}/>
					

					<Router history={browserHistory}>
						<Route path='/' component={Home} />
						<Route path='/:details' component={Details} />
					</Router>
				
				</div>
			</MuiThemeProvider>

		);
	}
}



export default App;