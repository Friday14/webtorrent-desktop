const React = require('react')
const prettyBytes = require('prettier-bytes')

const Checkbox = require('material-ui/Checkbox').default
const CircularProgress = require('material-ui/CircularProgress').default

const TorrentSummary = require('../lib/torrent-summary');
const TorrentPlayer = require('../lib/torrent-player');
const {dispatch, dispatcher} = require('../lib/dispatcher');
const Navbar = require('../components/navbar')
const TableEx = require('../components/table-view-meta')
module.exports = class TorrentDetailPage extends React.Component {

    componentWillMount() {
        dispatch('torrentFetchMetaDataRequest', this.props.state.torrentDetail.link)
    }

    render() {
        return <div>
            <div className="col-md-2">
                <Navbar/>
            </div>
            <div className="col-md-10">
                <div className="col-md-3"><img src={this.props.state.torrentDetail.img} alt=""/></div>
                <div className="col-md-9">
                    <h1>{this.props.state.torrentDetail.name}</h1>
            </div>
        </div>
            <div className="col-md-10 col-lg-offset-2">
                {this.renderTableInfo()}
            </div>
        </div>
    }

    renderTableInfo() {
        if (!this.props.state.torrentDetail.meta)
            return <CircularProgress/>
             return   <TableEx data={this.props.state.torrentDetail.meta}/>

        let table = [];
      return (
            <table className="table table-responsive">
                <thead>
                <tr>
                    <th>Сиды/Пиры</th>
                    <th>Файлы</th>
                    <th>Размер</th>
                    <th>Звук</th>
                </tr>
                </thead>
                <tbody>

                {this.props.state.torrentDetail.meta.map(function (column, key) {
                    if (column.magnet != null) {
                        return (
                            <tr key={key} onClick={dispatcher('addTorrent', column.magnet)}>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>{column.size}</td>
                                <td>{column.languages}</td>
                            </tr>
                        )
                    }
                })}
                </tbody>
            </table>);
    }
}
