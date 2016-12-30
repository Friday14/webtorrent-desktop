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
        super(props);
        this.state = {
            page: 0,
            torrentList: [],
        }
    }

    componentDidMount() {
        this.torrentParser();
    }

    shouldComponentUpdate(newProps, newState) {
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
            <div key="push">
                <div key="menu" className="col-md-2">
                    <Navbar/>
                </div>
                <div key="cont" className="col-md-10">
                    {
                        (this.state.torrentList.length !== 0) ?
                            <div className="col-md-12">{this.renderTorrentList()} </div>
                            :
                            <LinearProgress/>
                    }
                </div>
            </div>
        )
        return (
            <div key="main" className='torrent-list'>
                {contents}

            </div>
        )
    }

    handleScroll() {

        let torrentListRequest = this.state.torrentListRequest;
        if (torrentListRequest == 'success')
            if (document.querySelector('body').offsetHeight - screen.height - 60 < window.scrollY) {
                this.state.page++;
                this.torrentParser(this.state.page)
            }

    }

    hanlderClickToListDownload() {
        this.state.location.go({url: 'torrent-download-list'})
    }

    cellRenderer () {
        let box = [];
         this.state.torrentList.map(function (item) {
            box[box.length] = <GridTile
                onClick={dispatcher('torrentDetail', item)}
                title={item.name}
                subtitle={item.name}>
                <img src={item.img}/>
            </GridTile>
        });
         return box;
    }

    renderTorrentList() {
        const {torrentList} = this.state
        return (<GridList
            cellHeight={190}
            cols={4}>
            {torrentList.map(function (item) {

                return <GridTile
                    onClick={dispatcher('torrentDetail', item)}
                    key={Math.random() * 100}
                    title={item.name}
                    subtitle={item.name}>
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
                let elem = $(item);
                if (elem.find('.name').text())
                {
                    arrayMovies[arrayMovies.length] = {
                        name: elem.find('.name').text(),
                        img: elem.find('img').attr('src'),
                        link: elem.find('a').attr('href'),
                    };}
            });
            console.log(arrayMovies)
            this.setState({torrentList: [...this.state.torrentList, ...arrayMovies]});

            setTimeout(() => {
                this.state.torrentListRequest = 'success'
            }, 300);
        });
    }
}
