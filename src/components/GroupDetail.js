import React from "react"

import styled, { css } from "styled-components"

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
		flex: 1;
		display: flex;
		margin-top: 30px;
		.text-write{
			width: 85%;
			height: 66px;
			border-radius: 5px;
			background-color: #f9f9f9;
			font-size: 18px;
			font-family: Proxima, Spoqa;
			padding: 10px;
			outline : none;
			resize: none;
		}
		.text-submit{
			width 10%;
			height: auto;
			border-radius: 10px;
			background-color: #6c63ff;
			outline: none;
			margin-left: 20px;
			font-size: 18px;
			font-family: Proxima, Spoqa;
			font-weight: light;
			color: white;
		}
	}
`

const SComment = styled.div`
	width: 100%;
	padding: 16px 0;
	padding-left: ${props => 6 + props.level * 60}px;
	border-bottom: solid 0.8px #c3c3c3;
	&:first-of-type {
		border-top: solid 0.8px #c3c3c3;
	}
	.head {
		display: flex;
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
	.text {
		font-size: 18px;
		font-weight: 300;
		color: #363636;
	}
`

const Comment = (props) => {
	const { author, createdAt, text, level} = props
	return (
		<SComment level={level || 0}>
			<div className="head">
				<div className="author">{author}</div>
				<div className="time">{createdAt}</div>
			</div>
			<div className="text">
				{text}
			</div>
		</SComment>
	)
}

class GroupDetail extends React.PureComponent {
	render() {
		const { id } = this.props.match.params
		const { group, manager, comments } = this.props
		const { title, description, category, people, limit, deadline, workload, tag } = group
		const { name, gender, phoneNumber, email } = manager

		let coms = []
		comments.forEach(comment => {
			coms.push(
				<Comment {...comment} level={0} />
			)
			comment.replies.forEach(comment => {
				coms.push(
					<Comment {...comment} level={1} />
				)
			})
		})

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
									title="Description" value={description} flexDirection="column"
									vlStyle={{ fontWeight: "300" }}
								/>
								<WLabel title="Category" value={category} />
								<WLabel title="People" value={`${people} / ${limit}`} />
								<WLabel title="Deadline" value={deadline.toLocaleString()} />
								<WLabel title="Tag" value={tag} />

								<div className="footer" style={{ justifyContent: "flex-end" }}>
									<button className="button button-purple button-large">Join Group</button>
								</div>
							</div>

							<div className="title">Group Manager</div>
							<div className="inner-content">
								<WLabel title="Name" value={name} />
								<WLabel title="Gender" value={gender} />
								<WLabel title="Phone Number" value={phoneNumber} />
								<WLabel title="Email" value={email} />
							</div>
							<div className="title">Comments</div>
							<div className="inner-content">
								{coms}
								<p className="textarea">
									<textarea className="text-write" placeholder="Write here..."></textarea>
									<input className="text-submit" type="submit" value="Submit"></input>
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
