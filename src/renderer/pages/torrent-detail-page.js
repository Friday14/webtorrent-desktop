const React = require('react')
const prettyBytes = require('prettier-bytes')

const Checkbox = require('material-ui/Checkbox').default
const LinearProgress = require('material-ui/LinearProgress').default

const TorrentSummary = require('../lib/torrent-summary');
const TorrentPlayer = require('../lib/torrent-player');
const {dispatch, dispatcher} = require('../lib/dispatcher');
// const {torrentParser} = require('../controllers/torrent-list-controller')

module.exports = class TorrentDetailPage extends React.Component {

    componentWillMount(){
        dispatch('torrentFetchMetaDataRequest', this.props.state.torrentDetail.link)
    }

    render() {
        return <div>
            <img src={this.props.state.torrentDetail.img} alt=""/>
            {this.props.state.torrentDetail.name}
            {this.renderMetaData()}
            </div>
    }

    renderMetaData(){
        if(!this.props.state.torrentDetail.meta)
            return <div>Загрузка</div>
        return <div>
            <ul>
                {this.props.state.torrentDetail.meta.map(function (column) {
                    if(column.magnet != null) {
                        return <li key={column.magnet} onClick={dispatcher('addTorrent',column.magnet)}>
                            {column.languages} [{column.size}]
                            Скачать</li>
                    }
                })}
            </ul>
        </div>
    }
}
