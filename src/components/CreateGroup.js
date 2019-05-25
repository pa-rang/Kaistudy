import React from "react"

import styled, { css } from "styled-components"

import Input from "components/Input"

import Category from "./Category"
import { categories } from "../lib/variables"

const StyledWrapper = styled.div`
	background-color: rgb(249, 249, 249);
	.container {
		align-items: center;
	}
	
	.page-content {
		.title {
			font-family: Proxima;
			font-size: 30px;
			margin-bottom: 15px;
			margin-top: 75px;
			
		}
		width: 1000px;
		max-width: 100%;
		.inner-content {
			padding: 80px 60px;
			background-color: white;
			min-height: 500px;
			
			.footer {
				display: flex;
				justify-content: center;
				width: 100%:
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
		width: 100%;
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
	
	label {
		width: 17%;
		margin-right: 13%;
	}
`

class CreateGroup extends React.PureComponent {
	state = { category: "etc" }

	handleSubmit = e => {
		e.preventDefault()
		alert("submit")
	}

	handleChange = ({ target: { name, value }}) => this.setState({ [name]: value })


	render() {
		const { category } = this.state

		return (
			<StyledWrapper className="page-wrapper">
				<div className="container">
					<div className="page-content">
						<div className="title">
							Create New Group
						</div>
						<form onSubmit={this.handleSubmit} className="inner-content">
							<ColGroup>
								<label>Title <span style={{ color: "#cccccc" }}>(withiin 30 words)</span></label>
								<Input type="text" maxLength={30} name="title" placeholder={"Input Title"}/>
							</ColGroup>

							<ColGroup>
								<label>Description</label>
								<Input type="text" name="description" placeholder={"Input Description"}/>
							</ColGroup>

							<RowGroup width={"25%"}>
								<label>People</label>
								<Input type="number" name="peopel" placeholder={"Input People"}/>
							</RowGroup>

							<RowGroup width={"25%"}>
								<label>Deadline</label>
								<Input type="number" name="peopel" placeholder={"Input People"}/>
							</RowGroup>

							<RowGroup width={"25%"}>
								<label>Workload</label>
								<Input type="number" name="peopel" placeholder={"Input People"}/>
							</RowGroup>

							<ColGroup>
								<label>Category</label>


								<StyledCats>
									{categories.map(cat =>
										<label key={cat}>
											<input
												type="radio" className="radio" value={cat.toLowerCase()} checked={category === cat.toLowerCase()}
												name="category"
												onChange={this.handleChange}
											/>
											{cat}
											<Category category={cat.toLowerCase()} />
										</label>
									)}
								</StyledCats>
							</ColGroup>

							<ColGroup>
								<label>Tag</label>
								<Input type="text" name="tag" placeholder={"Input Tag"}/>
							</ColGroup>

							<div className="footer">
								<button type="submit" className="button button-orange">
									Create Group
								</button>
							</div>
						</form>

					</div>
				</div>
			</StyledWrapper>
		)
	}
}

export default CreateGroup
