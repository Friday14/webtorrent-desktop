const React = require('react')
// import {GridList, GridTile} from '';
const GridComponent = require('material-ui/GridList');
const GridList = GridComponent.GridList;
const GridTile = GridComponent.GridTile;

const LinearProgress = require('material-ui/LinearProgress').default
const Navbar = require('../components/navbar')

const {dispatch, dispatcher} = require('../lib/dispatcher');
const request = require('request'),
    cheerio = require("cheerio")
module.exports = class TorrentList extends React.Component {
    componentDidMount() {
        this.torrentParser();
        this.state = {page: 0}
    }

    componentWillMount() {
        document.body.style.height = 'auto';
        // document.body.style.backgroundColor = 'red';
        window.onscroll = () => {
            this.handleScroll()
        }
    }

    componentWillUnmount() {
        document.body.style.height = '100%';
        window.onscroll = null;
    }

    render() {
        const contents = [];
        contents.push(
            <span onClick={this.hanlderClickToListDownload}>Список загрузок</span>
        );
        contents.push(
            <div>
                <div className="col-md-2">
                    <Navbar/>
                </div>
                <div className="col-md-10">
                    {
                        (this.props.state.torrentList) ?
                            <div className="col-md-12">{this.renderTorrentList()} </div>
                            :
                            <LinearProgress/>
                    }
                </div>
            </div>
        )
        contents.push(<div className="col-md-12 bottom">
            <span className="text">...</span>
        </div>)
        return (
            <div key='torrent-list' className='torrent-list'>
                {contents}
                {this.props.state.torrentListRequest == 'request' ?
                    <div style={{width: '100%', marginBottom: '200px'}}></div> : null}
            </div>
        )
    }

    handleScroll() {

        let torrentListRequest = this.props.state.torrentListRequest;
        if (torrentListRequest == 'success' && document.querySelector('.bottom'))
            if (document.querySelector('body').offsetHeight - screen.height - 60 < window.scrollY) {
                this.state.page++;
                console.log('page', this.state.page)
                this.props.state.torrentListRequest = 'request';
                this.torrentParser(this.state.page)
            }
    }

    hanlderClickToListDownload() {
        this.state.location.go({url: 'torrent-download-list'})
    }

    renderTorrentList() {
        const {torrentList} = this.props.state
        let styles = {
            gridTile: {
                marginTop: '20px'
            }
        };
        return (<GridList
            cellHeight={190}
            cols={5}>
            {torrentList.map(function (item) {
                return <GridTile
                    onClick={dispatcher('torrentDetail', item)}
                    key={Math.random() * 100}
                    title={item.name}
                    subtitle={item.name}
                    style={styles.gridTile}
                >
                    <img src={item.img}/>
                </GridTile>
            })
            }

        </GridList>)
    }


    goToDetailPage() {
        this.state.location.go({url: 'torrent-detail-page'})
    }

    torrentParser(page = null) {
        this.props.state.torrentListRequest = 'request';
        console.log('load page %s', page)
        let arrayMovies = [];

        var options = {
            host: 'http://www.torrentino.me',
            path: '/movies'
        }
        let params = (page) ? '?page=' + page : '';
        let url = options.host + options.path + params
        request(url, function (error, response, body) {
            let $ = cheerio.load(body);
            $(".m-right .plate.showcase .tiles").find('.tile').map((key, item) => {
                let elem = $(item)
                if (elem.find('.name').text())
                    arrayMovies[arrayMovies.length] = {
                        name: elem.find('.name').text(),
                        img: elem.find('img').attr('src'),
                        link: elem.find('a').attr('href'),
                    }
            })
            dispatch('addTorrentList', arrayMovies);
        });
    }
}
