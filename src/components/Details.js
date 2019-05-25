import React, { PureComponent } from "react"


class HomePage extends PureComponent {
	componentDidMount() {
		if (this.props.location.hash === "#main") {
			const $anchor = document.getElementById('main');
			const offsetTop = $anchor.getBoundingClientRect().top + window.pageYOffset;
			window.scroll({
				top: offsetTop - 150,
				behavior: 'smooth'
			})


		}
	}
	render() {
		return (

		)
	}
}

export default Details

//임시로 만든거임 삭제 요망
