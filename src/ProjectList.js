import React, { Component } from 'react';

// ui
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';



class ProjectList extends Component
{
	constructor(props)
	{
		super(props);
		this.state = { items: [] };
		this.getProjects(this.props.username);
	}


	async getProjects(username)
	{
		var uri 			= 'https://api.github.com/search/repositories?q=user:'+username+'&sort=stars&order=desc&client_id=20eb65ae4aacca8a9262&client_secret=b191d329132554efb055148f0b9c0c0814fbdeb9';
		let response   		= await fetch(uri);
		let responseJson  	= await response.json();
		this.setState({ items: responseJson.items });
	}


	createListItem(item)
	{ 
		return ( 
			<a href={item.name}>
				<ListItem className="list-item">
					<div className="txt-overflow">
						<span className="stars">
							<ActionGrade />
							{item.stargazers_count}
						</span>
						{item.name}
					</div>
				</ListItem>
			</a>
		) 
	}


	render()
	{
		return(

			<aside className="project-list">
				<h1>Projects</h1>
				<List className="list">
					{this.state.items.map(this.createListItem)}
				</List>
			</aside>

		);
	}
}



export default ProjectList;