import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"


import employment from "static/images/category_employment.svg"
import etc from "static/images/category_etc.svg"
import hobby from "static/images/category_hobby.svg"
import language from "static/images/category_language.svg"
import lectureStudy from "static/images/category_lecture_study.svg"
import programming from "static/images/category_programming.svg"

const images = {
	employment,
	etc,
	hobby,
	language,
	"lecture study": lectureStudy,
	programming
}

const Category = styled.div`
	background-image: url(${props => images[props.category] || etc});
	margin-top: ${props => props.marginTop};
	width: ${props => props.width};
	height: ${props => props.height};
	background-size: contain;
	background-repeat: no-repeat;
`

Category.propTypes = {
	category: PropTypes.string.isRequired,
}
Category.defaultProps = {
	width: "128px",
	height: "128px",
	category: "etc",
	marginTop: 0
}

export default Category
