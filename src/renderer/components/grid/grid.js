const React = require('react')
const Item = require('./item');

module.exports = class Grid extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount(){
        console.info(this.props)
    }

    render(){
        console.log('render grid')
        return (
            <div>test</div>
        )
    }
}