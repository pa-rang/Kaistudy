import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import styled from "styled-components"

import employment from "static/images/category_employment.svg"
import etc from "static/images/category_etc.svg"
import hobby from "static/images/category_hobby.svg"
import language from "static/images/category_language.svg"
import lectureStudy from "static/images/category_lecture_study.svg"
import programming from "static/images/category_programming.svg"

import people from "static/images/people.svg"
import date from "static/images/date.svg"

import { formatDate } from "../lib/utils"

const images = {
	employment,
	etc,
	hobby,
	language,
	lectureStudy,
	programming
}


const StyledGroupCard = styled.div`
	display: flex;
	flex-direction: column;
  height: 335px;
  margin: 0 52px 52px 0;
  border-radius: 40px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  background-color: white;
  padding: 32px;
  
  :nth-child(3n + 2) {
  	margin-left: 26px;
  	margin-right: 26px;
  }
  :nth-child(3n) {
  	margin-left: 52px;
  	margin-right: 0;
  }
	.title {
		font-family: Proxima, Spoqa;	
		font-weight: bold;
		font-size: 22px;
		margin-bottom : 32px;
	}
	.body {
		flex: 1;
		display: flex;
		.info {
			width: 50%;
			margin-top: 130px;
			font-family: Spoqa, Proxima;
			font-weight: light;
			font-size: 15px;
			height: auto;
			}
		.category {
			width: 128px;
		}
	}
`

class GroupCard extends React.Component {
	state = { modalOpen: false }


	render() {
		const { title, category, dueDate, limit, count, id } = this.props.group

		const src = images[category]

		return (
			<StyledGroupCard>
				<div className="title">{title}</div>
				<div className="body">
					<div className="info">
						<p><img width="15" src={people} /> {formatDate(dueDate)}</p>
						<p><img width="15" src={date} />{count} / {limit} people</p>
					</div>
					<img src={src} alt="Category" className="category"/>
				</div>
				<Link to={`/group/${id}`}>
					<button className="button button-purple button-large" style={{ width: "100%" }}>
						Detail
					</button>
				</Link>
			</StyledGroupCard>
		)
	}
}


GroupCard.propTypes = {
	group: PropTypes.shape({
		title: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		dueDate: PropTypes.number.isRequired,
		limit: PropTypes.number.isRequired,
		count: PropTypes.number.isRequired,
	})
}

GroupCard.defaultProps = {
	group: {
		title: "Studying MySQL Basics",
		category: "employment",
		dueDate: Date.now(),
		limit: 6,
		count: 2,
		id: 1
	}
}


export default GroupCard
