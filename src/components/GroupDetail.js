import React, { useState } from "react"

import styled, { css } from "styled-components"
import { getGroupDetail, participate, postComment } from "../lib/api"
import moment from "moment"
import { formatDate } from "../lib/utils"

const SLabel = styled.div`
	display: flex;
	width: ${props => props.width};
	flex-direction: ${props => props.flexDirection};
	margin-bottom: 40px;
	${props => props.flexDirection === "column" ?
		css`
			.tt {
				margin-bottom: 12px;
			}
		`
		:
		css``
	};
	.tt {
		min-width: 200px;
		font-size: 20px;
		font-weight: 300;
		color: #b7b7b7;
		
	}
	.vl {
		font-size: 20px;
		font-weight: bold;
		color: #363636;
	}
`

SLabel.defaultProps = {
	width: "70%",
	flexDirection: "row",
}

const WLabel = ({ title, value, ...others }) => (
	<SLabel {...others} >
		<div className="tt" style={others.ttStyle}>{title}</div>
		<div className="vl" style={others.vlStyle}>{value}</div>
	</SLabel>
)

const Styled = styled.div`
	.background-wrapper {
		background-color: rgb(249, 249, 249);
	}
	.container {
		align-items: center;
	}
	.textarea{
		transition: 0.4s;
		opacity: 0;
		height: 0;
		overflow: hidden;
		visibility: hidden;
		flex: 1;
		display: flex;
		margin: 0;
		.text-write{
			width: 85%;
			height: 0;
			border-radius: 5px;
			background-color: #f9f9f9;
			font-size: 18px;
			font-family: Proxima, Spoqa;
			padding: 10px;
			outline : none;
			resize: none;
		}
		.text-submit{
			width: 10%;
			height: 0;
			border-radius: 10px;
			background-color: #6c63ff;
			outline: none;
			margin-left: 20px;
			font-size: 18px;
			font-family: Proxima, Spoqa;
			font-weight: 300;
			color: white;
			&:hover {
				curosr: pointer;
			}
		}
		
		&.visible {
			margin-top: 12px;
			height: auto;
			opacity: 1;
			visibility: visible;
			.text-write {
				height: 66px;
			}
			.text-submit {
				height: auto;
			}
		}
		
	}
`

const SComment = styled.div`
	width: ${props => `calc(100% - ${props.level * 60})`};
	padding: 16px 0;
	padding-left: ${props => 6 + props.level * 60}px;
	border-bottom: solid 0.8px #c3c3c3;
	&:first-of-type {
		border-top: solid 0.8px #c3c3c3;
	}
	.head {
		display: flex;
		width: 100%;
		margin-bottom: 8px;
	}
	.author {
		color: #6c63ff;
		font-weight: 300;
		font-size: 15px;
		margin-right: 8px;
	}
	.time {
		color: #b7b7b7;
		font-weight: 300;
		font-size: 15px;
	}
	.reply {
		font-size: 8px;
		margin-left: auto;
		&:hover {
			cursor: pointer;
		}
	}
	.text {
		font-size: 18px;
		font-weight: 300;
		color: #363636;
	}
`

const Comment = (props) => {
	const { first_name, last_name, comment_created_at, text, level, group_id, comment_id, fetchData } = props
	const [show, setShow] = useState(false)
	const [comment, setComment] = useState("")

	const topLevel = !level
	return (
		<SComment level={level || 0}>
			<div className="head">
				<div className="author">{last_name} {first_name}</div>
				<div className="time">{formatDate(comment_created_at)}</div>
				{topLevel && <div className="reply" onClick={() => setShow(prev => !prev)}>Reply</div>}
			</div>
			<div className="text">
				{text}
			</div>
			{
				topLevel &&
				<p className={`textarea ${show ? "visible" : ""}`}>
					<textarea className="text-write" placeholder="Write here..." value={comment} onChange={e => setComment(e.target.value)}/>
					<input className="text-submit" type="submit" value="Submit" onClick={() =>
						postComment(group_id, comment_id)(comment)
							.then(() => {
								fetchData()
								setComment("")
							})
					} />
				</p>
			}
		</SComment>
	)
}

class GroupDetail extends React.PureComponent {
	state = {
		group_detail: {},
		owner_info: {},
		comment_info: [],
		comment: ""
	}

	handleChange = ({ target: { name, value }}) => this.setState({ [name]: value })

	componentDidMount() {
		this.fetchData()
	}

	fetchData = () => {
		const { id } = this.props.match.params

		getGroupDetail(id)
			.then(data => {
				this.setState(data.data)
			})
	}
	render() {
		const { id } = this.props.match.params
		const { group, manager, comments } = this.props
		const { group_detail, owner_info, comment_info, user_status } = this.state
		const { group_id, title, desc, category_name, member_cnt, capacity, deadline, workload, tag } = group_detail
		const { first_name, last_name, gender, phone_number, email } = owner_info

		let coms = []
		comment_info.filter(c => !c.parent_comment_id)
			.forEach(comment => {
				coms.push(
					<Comment {...comment} level={0} group_id={group_id} fetchData={this.fetchData}/>
				)
				comment_info.filter(c => c.parent_comment_id === comment.comment_id)
					.forEach(comment => {
						coms.push(
							<Comment {...comment} level={1} group_id={group_id} fetchData={this.fetchData} />
						)
					})
			})

		let button = <button className="button button-purple button-large" onClick={() =>
			participate(group_id)
				.then(this.fetchData)
		}>Join Group</button>
		if (user_status === 1)
			button = <button className="button button-orange button-large" disabled>Pending</button>
		if (user_status === 2)
			button = <button className="button button-purple button-large" disabled>Member</button>
		return (
			<Styled className="page-wrapper animated fadeIn">
				<div className="background-wrapper">
					<div className="container">
						<div className="board-layout">
							<div className="title">Group Details</div>
							<div className="inner-content">
								<WLabel
									title="Title"
									value={title} flexDirection="column"
									vlStyle={{ fontSize: "40px", fontWeight: "400" }}
								/>
								<WLabel
									title="Description" value={desc} flexDirection="column"
									vlStyle={{ fontWeight: "300" }}
								/>
								<WLabel title="Category" value={category_name} />
								<WLabel title="People" value={`${member_cnt} / ${capacity}`} />
								<WLabel title="Deadline" value={moment(deadline).format("YYYY-MM-DD")} />
								<WLabel title="Tag" value={tag} />

								<div className="footer" style={{ justifyContent: "flex-end" }}>
									{button}
								</div>
							</div>

							<div className="title">Group Manager</div>
							<div className="inner-content">
								<WLabel title="Name" value={`${first_name} ${last_name}`} />
								<WLabel title="Gender" value={gender} />
								<WLabel title="Phone Number" value={phone_number} />
								<WLabel title="Email" value={email} />
							</div>
							<div className="title">Comments</div>
							<div className="inner-content">
								{coms}
								<p className="textarea visible">
									<textarea name="comment" className="text-write" placeholder="Write here..." value={this.state.comment} onChange={this.handleChange} />
									<input className="text-submit" type="submit" value="Submit" onClick={() =>
										postComment(group_id)(this.state.comment)
											.then(() => {
												this.fetchData()
												this.setState({ comment: "" })
											})
									}/>
								</p>
							</div>
					</div>
					</div>
				</div>
			</Styled>
		)
	}
}

GroupDetail.defaultProps = {
	group: {
		title: "Studying MySQL Basics",
		description: "This study group was created to study My SQL. We will first study \n" +
			"the basics of databases and then learn how to deal with MySQL\n" +
			"on the basis of this. I think the period is about 4 weeks, and I prefer \n" +
			"the central library as the location for the study group.",
		category: "Programming",
		people: 2,
		limit: 6,
		deadline: new Date(),
		workload: "Tight",
		tag: "#database#mysql#conding"
	},
	manager: {
		name: "Jeongyeon Lee",
		gender: "Male",
		phoneNumber: "01030308419",
		email: "appdler96@kaist.ac.kr"
	},
	comments: [
		{
			author: "Dongjin Jung",
			createdAt: "2019.05.17 15.25",
			text: "Can I participate if I lack a lot of fundamentals?",
			replies: [
				{
					author: "Jeonyeon Lee",
					createdAt: "2019.05.17 15.25",
					text: "Of course! Welcome :)",
				}
			]
		},
		{
			author: "Dongpyeong Seo",
			createdAt: "2019.05.17 15.30",
			text: "It seems to be really interesting. Let's study hard together!",
			replies: []
		}
	]

}
export default GroupDetail
