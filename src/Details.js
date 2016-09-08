import React, { Component } from 'react';

// ui
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';



class Details extends Component
{
	constructor(props) {
		super(props);
		this.state = { currentProject: this.props.params['details'], details: '', commits: [] };
		this.getProject( this.props.params['details'] );
	}


	async getProject(project)
	{
		var uri 			= 'https://api.github.com/repos/globocom/'+project;
		let response 		= await fetch(uri);
		let responseJson  	= await response.json();
		this.setState({ details: responseJson });
		console.log(this.state)

		this.getCommits( responseJson.owner.login, project );
	}


	async getCommits(username, project, page)
	{
		var uri 			= 'https://api.github.com/repos/'+username+'/'+project+'/commits';
		let response 		= await fetch( uri, {"sort":"newest", "order":"desc", "page":1, "per_page":20} );
		let responseJson  	= await response.json();
		this.setState({ commits: responseJson });
	}


	createListItem(item)
	{ 
		return ( 
			<article className="flex flex-row">
				<div className="sha flex-1 txt-overflow" title={item.sha}>
					<code>{item.sha}</code>
				</div>
				<div className="info flex-6">
					<p className="message">{item.commit.message}</p>
					<p className="author">{item.commit.author.name}</p>
				</div>
			</article>
		) 
	}


	render()
	{
		return(

			<main className="details flex flex-column">

				<Paper className="Paper" zDepth={1}>
					<h1>{this.state.details.name}</h1>
					<p>{this.state.details.description}</p>

					<div className="flex flex-row">
						<div ta-center className="flex-1 item">
							<span className="material-icons">star</span>
							<p>
								<strong fz-36>{this.state.details.stargazers_count}</strong><br/>Stars
							</p>
						</div>
						<div ta-center className="flex-1 item">
							<span className="material-icons">call_split</span>
							<p>
								<strong fz-36>{this.state.details.forks}</strong><br/>Forks
							</p>
						</div>
					</div>
				</Paper>


				<Paper className="Paper commits" zDepth={1}>
					<h1>Commits</h1>
					{this.state.commits.map(this.createListItem)}
				</Paper>

				
				<p className="see-more">
					<FlatButton label="LOAD MORE" />
				</p>

			</main>

		);
	}
}



export default Details;