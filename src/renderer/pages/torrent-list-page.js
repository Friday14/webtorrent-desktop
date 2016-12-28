const React = require('react')
// import {GridList, GridTile} from '';

const {GridList, GridTile} = require('material-ui/GridList');
const LinearProgress = require('material-ui/LinearProgress').default
const Navbar = require('../components/navbar')

const {dispatch, dispatcher} = require('../lib/dispatcher');
const request = require('request'),
    cheerio = require("cheerio")
module.exports = class TorrentList extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            page: 0,
            torrentList: []
        }
    }

    componentDidMount() {
        this.torrentParser();
    }

    shouldComponentUpdate(newProps, newState) {
        console.log(this.state.torrentList !== newState.torrentList)
        return this.state.torrentList !== newState.torrentList;
    }

    componentWillMount() {
        document.body.style.height = 'auto';
        // document.body.style.backgroundColor = 'red';
        window.onscroll = () => {
            console.log('scrol')
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
                        (this.state.torrentList) ?
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
                {this.state.torrentListRequest == 'request' ?
                    <div style={{width: '100%', marginBottom: '200px'}}></div> : null}
            </div>
        )
    }

    handleScroll() {

        let torrentListRequest = this.state.torrentListRequest;
            console.log(torrentListRequest)
        if(torrentListRequest == 'success')
            if (document.querySelector('body').offsetHeight - screen.height - 60 < window.scrollY) {
                this.state.page++;
                this.torrentParser(this.state.page)
            }

    }

    hanlderClickToListDownload() {
        this.state.location.go({url: 'torrent-download-list'})
    }

    renderTorrentList() {
        const {torrentList} = this.state
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
        console.log('TORRENT PARSER')
        this.state.torrentListRequest = 'request';
        console.log('load page %s', page)
        let arrayMovies = [];

        var options = {
            host: 'http://www.torrentino.me',
            path: '/movies'
        }
        let params = (page) ? '?page=' + page : '';
        let url = options.host + options.path + params
        request(url, (error, response, body) => {
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
            this.setState({torrentList : [...this.state.torrentList, ...arrayMovies]});
            setTimeout(() => {this.state.torrentListRequest = 'success'}, 100);
            console.log(this.state)
            // dispatch('addTorrentList', arrayMovies);
        });
    }
}
