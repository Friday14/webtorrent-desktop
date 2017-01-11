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
                    <div>
                        {this.props.state.torrentDetail.meta && this.props.state.torrentDetail.meta[0]?
                            this.props.state.torrentDetail.meta[0].descr :
                            null}
                    </div>
                    <div>
                        {this.props.state.torrentDetail.meta && this.props.state.torrentDetail.meta[0].trailer?
                            <video width="500px" src={this.props.state.torrentDetail.meta[0].trailer} controls></video>:
                            null}
                    </div>

            </div>
                <div className="col-md-10">
                    {this.renderTableInfo()}
                </div>
        </div>

        </div>
    }

    renderTableInfo() {
        if (!this.props.state.torrentDetail.meta)
            return <CircularProgress/>
        return   <TableEx data={this.props.state.torrentDetail.meta}/>

    }

}
