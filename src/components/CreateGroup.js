import React from "react"
import Swal from 'sweetalert2'
import styled, { css } from "styled-components"
import Calendar from 'react-calendar'
import moment from "moment"

import Input from "components/Input"

import Category from "./Category"
import { categories } from "../lib/variables"

const StyledWrapper = styled.div`
	.background-wrapper {
		background-color: rgb(249, 249, 249);
	}
	.container {
		align-items: center;
	}
	
	.board-layout {
		.inner-content {
			.footer {
				justify-content: center;
			}
		}
	}
	.calendar-wrapper {
		width: 100%;
		transition: 0.4s;
		height: auto;
	
		&.hide {
			height: 0;
			//visibility: hidden;
			opacity: 0;
			.calendar {
				display: none;
			}
		}
	}
`

const group = css`
	label {
		font-size: 20px;
		font-weight: bold;
		color: #363636;
	}
	input {
		
	}
`

const ColGroup = styled.div`
 	${group};
 	display: flex;
 	flex-direction: column;
	width: ${props => props.width};
	margin-bottom: 40px;
	label {
		width: 100%;
		margin-bottom: 24px;
	}
	input { 
		//width: 100%;
	}
`

const RowGroup = styled.div`
	${group};
 	display: flex;
 	justify-content: space-between;
 	align-items: flex-end;
	width: ${props => props.width};
	margin-bottom: 40px;
	
	label {
		//width: 100%;
		margin-bottom: 20px;
	}
	input { 
		margin-left: 40px;
		//width: 100%;
	}
`

const StyledCats = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 30px;
	
	label {
		width: 17%;
		margin-right: 13%;
		margin-bottom: 30px;
	}
`

class CreateGroup extends React.PureComponent {
	state = {
		category: "etc", date: null, onDateFocus: false
	}

	handleSubmit = e => {
		const { history } = this.props
		e.preventDefault()
		Swal.fire(
			'Good job!',
			'You clicked the button!',
			'success'
		).then(res => {
			history.push('/#main')
		})
	}

	handleChange = ({ target: { name, value }}) => this.setState({ [name]: value })

	onDateChange = date => {
		this.setState({ deadline: date, onDateFocus: false })
	}

	render() {
		const { category, deadline } = this.state

		return (
			<StyledWrapper className="page-wrapper animated fadeIn">
				<div className="background-wrapper">
					<div className="container">
						<div className="board-layout">
							<div className="title">
								Create New Group
							</div>
							<form onSubmit={this.handleSubmit} className="inner-content">
								<ColGroup>
									<label><span style={{ color: "blue" }}>*</span> Title <span style={{ color: "#cccccc" }}>(withiin 30 words)</span></label>
									<Input type="text" maxLength={30} name="title" placeholder={"Title"}/>
								</ColGroup>

								<ColGroup>
									<label>Description</label>
									<Input type="text" name="description" placeholder={"Description"}/>
								</ColGroup>

								<RowGroup width={"50%"}>
									<label><span style={{ color: "blue" }}>*</span> People</label>
									<Input type="number" name="people" placeholder={"People"}/>
								</RowGroup>

								<RowGroup width={"50%"} style={{ flexWrap: "wrap" }}>
									<label><span style={{ color: "blue" }}>*</span> Deadline</label>
									<Input
										type="text" name="deadline" placeholder={"Deadline"}
										onFocus={() => this.setState({ onDateFocus: true })}
										value={deadline ? moment(deadline).format("YYYY-MM-DD") : null}
									/>
									<div className={`calendar-wrapper ${this.state.onDateFocus ? 'show' : "hide"}`}>
										<Calendar
											className={`calendar`}
											onChange={this.onDateChange}
											value={deadline}
										/>
									</div>
								</RowGroup>

								<RowGroup width={"50%"}>
									<label><span style={{ color: "blue" }}>*</span> Workload</label>
									<Input type="number" name="workload" placeholder={"Workload"}/>
								</RowGroup>

								<ColGroup>
									<label><span style={{ color: "blue" }}>*</span> Category</label>


									<StyledCats>
										{categories.map(cat =>
											<label key={cat}>
												<input
													type="radio" className="radio" value={cat.toLowerCase()} checked={category === cat.toLowerCase()}
													name="category"
													onChange={this.handleChange}
												/>
												{cat}
												<Category category={cat.toLowerCase()} marginTop={"20px"}/>
											</label>
										)}
									</StyledCats>
								</ColGroup>

								<ColGroup>
									<label>Tag</label>
									<Input type="text" name="tag" placeholder={"Tag"}/>
								</ColGroup>

								<div className="footer">
									<button type="submit" className="button button-orange">
										Create Group
									</button>
								</div>
							</form>

						</div>
					</div>
				</div>
			</StyledWrapper>
		)
	}
}

export default CreateGroup
