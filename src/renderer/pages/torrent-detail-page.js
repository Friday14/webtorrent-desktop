const React = require('react');
const prettyBytes = require('prettier-bytes');

const Checkbox = require('material-ui/Checkbox').default;
const CircularProgress = require('material-ui/CircularProgress').default;

const TorrentSummary = require('../lib/torrent-summary');
const TorrentPlayer = require('../lib/torrent-player');
const {dispatch, dispatcher} = require('../lib/dispatcher');
const Navbar = require('../components/navbar');
const TableEx = require('../components/table-view-meta');
module.exports = class TorrentDetailPage extends React.Component {

    componentWillMount() {
        dispatch('torrentFetchMetaDataRequest', this.props.state.torrent.link)
        console.log('this.props.state', this.props.state)
    }

    render() {
        return <div>
            <div className="col-md-2">
                <Navbar/>
            </div>
            { this.props.state.meta.request == true ?
                <div className="col-md-10">
                    <div className="col-md-3"><img src={this.props.state.torrent.img} alt=""/></div>
                    <div className="col-md-9">
                        <h1>{this.props.state.torrent.name}</h1>
                        {/*<h2>{this.props.state.meta.movie.nameEng}</h2>*/}

                        <div className="col-md-9">
                            {this.props.state.meta.movie.descr}
                        </div>
                        <div className="col-md-9">
                            {this.props.state.meta.movie.trailer ?
                                <video width="100%" src={this.props.state.meta.movie.trailer} controls></video>
                                : null
                            }
                        </div>
                        <br/>
                        <div className="col-md-9">
                            <table className="movie-detail-info">
                                <tr>
                                    <td>Длительность</td>
                                    <td>Продюсеры</td>
                                    <td>Актеры</td>
                                </tr>
                                <tr>
                                    <td>{this.props.state.meta.movie.duration}</td>
                                    <td>{this.props.state.meta.movie.producers.map((item) =>
                                        <span className="label">{item}</span>)}</td>
                                    <td>{this.props.state.meta.movie.actors.map((item) =>
                                        <span className="label">{item}</span>)}</td>
                                </tr>
                            </table>
                        </div>

                    </div>
                    <div className="col-md-10">
                        {this.renderTableInfo()}
                    </div>
                </div>
                : null
            }
        </div>
    }

    renderTableInfo() {
        if (!this.props.state.meta.torrent)
            return <CircularProgress/>
        return <TableEx data={this.props.state.meta.torrent}/>

    }

}
