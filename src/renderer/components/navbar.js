

const React = require('React')
const List = require('material-ui/List').List
const ListItem = require('material-ui/List').ListItem
const ActionInfo = require('material-ui/svg-icons/action/info').default
const ListExampleFolder = () => (
    <div style={{position:'fixed'}}>
        <List>
            <ListItem
                rightIcon={<ActionInfo />}
                primaryText="Фильмы"
                secondaryText="Jan 9, 2014"
            />
            <ListItem
                rightIcon={<ActionInfo />}
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
);

module.exports = ListExampleFolder;