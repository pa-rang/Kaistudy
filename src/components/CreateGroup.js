import React from "react"
import Swal from 'sweetalert2'
import styled, { css } from "styled-components"
import Calendar from 'react-calendar'
import moment from "moment"

import Input from "components/Input"

import Category from "./Category"
import { categories } from "../lib/variables"
import { createGroup } from "../lib/api"

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
		category_name: "etc",
		onDateFocus: false,
		title: "",
		desc: "",
		capacity: 0,
		deatline: null,
		tag: "",
		workload: "",
	}

	handleSubmit = e => {
		const { history } = this.props
		e.preventDefault()

		const {
			category_name, deadline, title, desc, capacity, tag, workload
		} = this.state

		if (!category_name || !deadline || !title || !capacity || !workload) {
			Swal.fire(
				'Feel All Required Fields',
				'All fields are required. Sibala',
				'warning'
			)
			return
		}

		createGroup({ ...this.state, deadline: moment(deadline).format('YYYY-MM-DD HH:mm:ss') })
			.then(res => {
				console.log(res)
				return Swal.fire(
					'Successfully Created',
					'앞으로 공부 열심히 하세요^^',
					'success'
				)
			})
			.then(res => {
				history.push('/#main')
			})
			.catch(error => {
				return Swal.fire(
					'Request Failed',
					'Please Try Again',
					'error'
				)
			})

	}

	handleChange = ({ target: { name, value }}) => this.setState({ [name]: value })

	onDateChange = deadline => {
		this.setState({ deadline, onDateFocus: false })
	}

	render() {
		const {
			category_name, deadline, title, desc, capacity, tag, workload
		} = this.state

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
									<label><span style={{ color: "blue" }}>*</span> Title <span style={{ color: "#cccccc" }}>(withiin 50 words)</span></label>
									<Input type="text" maxLength={50} name="title" value={title} placeholder={"Title"} onChange={this.handleChange} />
								</ColGroup>

								<ColGroup>
									<label>Description</label>
									<Input type="text" name="desc" value={desc}  onChange={this.handleChange} placeholder={"Description"}/>
								</ColGroup>

								<RowGroup width={"50%"}>
									<label><span style={{ color: "blue" }}>*</span> People</label>
									<Input type="number" name="capacity" placeholder={"Capacity"}  value={capacity} onChange={this.handleChange}/>
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
									<Input
										type="number" name="workload" placeholder={"Workload"}
										value={workload}
										onChange={this.handleChange}
									/>
								</RowGroup>

								<ColGroup>
									<label><span style={{ color: "blue" }}>*</span> Category</label>


									<StyledCats>
										{categories.map(cat =>
											<label key={cat}>
												<input
													type="radio" className="radio" value={cat.toLowerCase()} checked={category_name === cat.toLowerCase()}
													name="category_name"
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
									<Input type="text" name="tag" placeholder={"Tag"} value={tag} onChange={this.handleChange}/>
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
