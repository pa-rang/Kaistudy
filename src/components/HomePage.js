import React, { PureComponent } from "react"

import { categories } from "../lib/variables"

import GroupCard from "./GroupCard"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { Link } from "react-router-dom"

class HomePage extends PureComponent {
	componentDidMount() {
		if (this.props.location.hash === "#main") {
			const $anchor = document.getElementById('main');
			const offsetTop = $anchor.getBoundingClientRect().top + window.pageYOffset;
			window.scroll({
				top: offsetTop - 100,
				behavior: 'smooth'
			})


		}
	}
	render() {
		return (
			<div className="page-wrapper" id="homepage">
				<div className="container">
					<section className="home-section">
						<div className="home-text">
							Create a group and study together
						</div>
						<div className="description-text">
							KAI’Study will help organizers to easily create and promote study groups,<br/>
							and help participants to easily find and join study groups they’re interested in.
						</div>
						<div className="home-buttons">
							<AnchorLink offset="150px" href='#main'>
								<button className="button button-purple button-large">
									Join Group
								</button>
							</AnchorLink>

							<Link to="/create-group">
								<button className="button button-orange button-large">
									Create Group
								</button>
							</Link>
						</div>
					</section>

					<section id="main">
						<div className="categories">
							<span style={{ fontWeight: "bold" }}>CATEGORIES</span>

							<div className="cat-list">
								{["All", ...categories].map((c, i) =>
									<React.Fragment>
										<div className="cat">{c}</div>
										{i === categories.length - 1 || <div className="bar"/>}
									</React.Fragment>
								)}
							</div>
						</div>

						<div className="groups">
							{
								categories.map((x, i) =>
									<GroupCard key={i} group={{
										title: "Studying MySQL Basics",
										category: x.toLowerCase(),
										dueDate: Date.now(),
										limit: 6,
										count: 2,
										id: i,
									}}/>
								)
							}
						</div>

					</section>
				</div>
			</div>
		)
	}
}

export default HomePage
