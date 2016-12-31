

const React = require('react')
const List = require('material-ui/List').List
const ListItem = require('material-ui/List').ListItem
const ActionInfo = require('material-ui/svg-icons/action/info').default
const {dispatch, dispatcher} = require('../lib/dispatcher');
const TorrentFetchController = new require('../controllers/torrent-fetch-controller')
const fetchTorrent = new TorrentFetchController()
console.log(fetchTorrent)
module.exports = class NavBar extends React.Component {
    constructor(props){
        super(props)
    }

    componentWillMount()
    {
        this.setState({
            searchResult: null
        });
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
            <div>
             <input ref='findInput' className='find' type='text' placeholder='Поиск'/>
             <button onClick={this.searchHandler.bind(this)} className='find btn btn-default'>Найти</button> 
             { this.state.searchResult ? this.state.searchResult.map((item) => {
                return <div onClick={dispatcher('torrentDetail', item)}>{item.name}</div>
             }) : null
            }
            </div> 
        </List>
    </div>
    }

    searchHandler(e){
        e.preventDefault();
        console.log(this)
        let search =  this.refs.findInput.value;
        fetchTorrent.fetchFindTorrent(search, (result) => {
            this.setState({searchResult: result})
        });

    }
}