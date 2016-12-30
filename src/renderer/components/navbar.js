

const React = require('react')
const List = require('material-ui/List').List
const ListItem = require('material-ui/List').ListItem
const ActionInfo = require('material-ui/svg-icons/action/info').default
const {dispatch, dispatcher} = require('../lib/dispatcher');
module.exports = class NavBar extends React.Component {
    constructor(props){
        super(props)
        console.log(this)
    }
    render() {
        return <div style={{position:'fixed'}}>
        <List>
            <ListItem
                rightIcon={<ActionInfo />}
                primaryText="Фильмы"
                onClick={dispatcher('goMoviePage')}
                secondaryText="Jan 9, 2014"
            />
            <ListItem
                rightIcon={<ActionInfo />}
                onClick={dispatcher('goDownloadPage')}
                primaryText="Загрузки"
                secondaryText="Jan 17, 2014"
            />
            <ListItem
                rightIcon={<ActionInfo />}
                primaryText="..."
                secondaryText="Jan 28, 2014"
            />
        </List>
    </div>
}
}