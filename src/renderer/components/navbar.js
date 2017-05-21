const React = require('react')
const {dispatch, dispatcher} = require('../lib/dispatcher');
const TorrentFetchController = new require('../controllers/torrent-fetch-controller')
const fetchTorrent = new TorrentFetchController()
console.log(fetchTorrent)
module.exports = class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.setState({
            searchResult: null,
            links: [
                {
                    name: 'Фильмы',
                    action: () => state.location.go({url: 'home'}),
                    home: true, 
                    children: [
                        {name: 'Израбнное'},
                        {name: 'Комедии'},
                ]
                },
                {name: 'Загрузки', action: () => state.location.go({url: 'torrent-download-list'})},

            ]
        });
    }

    render() {
        return <div style={{position: 'fixed'}}>
        <div className="logo">  Friday Movie </div> 
            <div className="sidebar-category sidebar-category-visible">
                <div className="category-content no-padding">
                    <ul className="navigation navigation-main navigation-accordion">
                        <div>{this.renderNavLink()}</div>
                    </ul>
                </div>

                <input ref="findInput" onChange={this.searchHandler.bind(this)} type="text" placeholder="Поиск" className="form-control"/>
                {this.renderSearchResult(``)}
            </div>
        </div>
    }

    renderNavLink() {
        return this.state.links.map((item) => {
            return <li><span className="navbar-link" onClick={item.action}>{item.name}</span>
                {item.children ? <ul className="navbar-child-link">
                    {item.children.map((childItem) => {
                        return <li>{childItem.name}</li>
                    })
                    }
                </ul> : null}
            </li>

        })
    }

    searchHandler(e) {
        e.preventDefault();
        let search = this.refs.findInput.value;
        fetchTorrent.fetchFindTorrent(search, (result) => {
            this.setState({searchResult: result})
        });
    }

    renderSearchResult()
    {
        if(this.state.searchResult)
        {
            return <div>
            {
                this.state.searchResult.map( (item) => {
                     return <div> 
                        <img src={item.img} className="img-responsive" style={{width:'140px'}}/>
                        
                            <span className="name"> {item.name}</span>
                            <button className="btn btn-primary">Просмотр</button> 
                    </div>
                })
            }
            </div>
        }
    }
}