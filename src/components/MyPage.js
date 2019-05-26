import React from "react"
import styled from "styled-components"

import GroupCard from "components/GroupCard"

import { categories } from "../lib/variables"
import { myPage } from "../lib/api"

const Style = styled.div`
	.line {
		border-top: solid 4px #363636;;
		width: 85px;
		margin: 36px 0;
	}
	h1 {
		font-size: 50px;
	}
	h2 {
		font-size: 36px;
		margin-bottom: 60px;
		margin-top: 80px;
	}
	.groups {
		padding: 40px 60px;
		background-color: rgb(249, 249, 249);
		border-radius: 40px;
		min-height: 500px;
	}
`
class MyPage extends React.Component {
	state = {
		owning_groups: [],
		participating_groups: [],
		pending_groups: [],
	}

	componentDidMount() {
		myPage()
			.then(data => {
				this.setState(data.data)
			})
	}

	render() {
		const { owning_groups, participating_groups, pending_groups} = this.state

		const a = categories.map(x => x.toLowerCase())
			.map((c, i) =>
				<GroupCard group={{
					title: c.toUpperCase(),
					category_name: c,
					deadline: Date.now(),
					capacity: Math.floor(Math.random() * 6) + 3,
					member_cnt: Math.floor(Math.random() * 1) + 2
				}}
									 index={i}
				/>
			)
		return (
			<Style className="page-wrapper animated fadeIn">
				<div className="background-wrapper">
					<div className="container">
						<h1>My Page</h1>

						<div className="line"/>

						<h2>Managing My Groups</h2>
						<div className="groups">
							{
								owning_groups.map((x, i) =>
									<GroupCard key={x.group_id} group={x} index={i}
									/>
								)
							}
						</div>

						<h2>Participating Groups</h2>
						<div className="groups">
							{
								participating_groups.map((x, i) =>
									<GroupCard key={x.group_id} group={x} index={i}
									/>
								)
							}
						</div>

						<h2>Pending Requests</h2>
						<div className="groups">
							{
								pending_groups.map((x, i) =>
									<GroupCard key={x.group_id} group={x} index={i}
									/>
								)
							}
						</div>

					</div>
				</div>
			</Style>
		)
	}
}

export default MyPage
