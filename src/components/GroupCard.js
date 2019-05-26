import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import moment from "moment"

import ScrollMagic from "scrollmagic"
import styled from "styled-components"

import Category from "components/Category"

import people from "static/images/people.svg"
import date from "static/images/date.svg"

import { formatDate } from "../lib/utils"

const StyledGroupCard = styled.div`
	display: flex;
	flex-direction: column;
  min-height: 335px;
  border-radius: 40px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  background-color: white;
  padding: 32px;
  margin-bottom: 52px;
  
  @media(min-width: 960px) {
    margin: 0 52px 52px 0;

		:nth-child(3n + 2) {
			margin-left: 26px;
			margin-right: 26px;
		}
		:nth-child(3n) {
			margin-left: 52px;
			margin-right: 0;
		}
  }
  @media(max-width: 960px) {
  	:nth-child(2n+1) {
  		margin-right: 26px;
  	}
  	:nth-child(2n) {
  		margin-left: 26px;
  	}
  }
	.title {
		font-family: Proxima, Spoqa;	
		font-weight: bold;
		font-size: 30px;
		margin-bottom : 32px;
	}
	.body {
		flex: 1;
		display: flex;
		margin-bottom: 10px;
		.info {
			width: 60%;
			margin-top: 130px;
			font-family: Spoqa, Proxima;
			font-weight: regular;
			font-size: 19px;
			height: auto;
			.icons{
				margin-right: 10px;
			}
		}
	}
	
	opacity: 0;
	transform: translateX(-40px);
	transition: all 0.6s ease-out;
	&.visible {
		opacity: 1;
		transform: none;
	}
`

class GroupCard extends React.Component {
	state = { modalOpen: false }
	elem = null
	controller = new ScrollMagic.Controller()

	componentDidMount() {
		const { index } = this.props

		new ScrollMagic.Scene({
			triggerElement: this.elem, // y value not modified, so we can use element as trigger as well
			offset: 200 - (200 - (index % 3) * 80),												 // start a little later
			triggerHook: 0.9,
		})
			.setClassToggle(this.elem, "visible") // add class toggle
			//.addIndicators({name: "digit " + (i+1) }) // add indicators (requires plugin)
			.addTo(this.controller);
	}


	render() {
		const { title, category_name, deadline, capacity, group_id, member_cnt } = this.props.group

		return (
			<StyledGroupCard ref={elem => this.elem = elem }>
				<div className="title">{title}</div>
				<div className="body">
					<div className="info">
						<p>
							<img className="icons" width="20" src={people} />
							{member_cnt} / {capacity} people
						</p>
						<p>
							<img className="icons" width="22" src={date} />
							{moment(deadline).format("YYYY-MM-DD")}
						</p>
					</div>
					<Category category={category_name} width="40%" height="auto"/>
				</div>
				<Link to={`/group/${group_id}`}>
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
		category_name: PropTypes.string.isRequired,
		deatline: PropTypes.number.isRequired,
		capacity: PropTypes.number.isRequired,
		member_cnt: PropTypes.number.isRequired
	})
}

GroupCard.defaultProps = {
	group: {
		title: "Studying MySQL Basics",
		category_name: "employment",
		deatline: Date.now(),
		capacity: 6,
		group_id: 1,
		member_cnt: 1
	}
}


export default GroupCard
