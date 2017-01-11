const electron = require('electron')

const {dispatch} = require('../lib/dispatcher')
const {TorrentKeyNotFoundError} = require('../lib/errors')
const sound = require('../lib/sound')
const TorrentSummary = require('../lib/torrent-summary')
const request = require('request');
const cheerio = require('cheerio');
const ipcRenderer = electron.ipcRenderer


// Controls the torrent list: creating, adding, deleting, & manipulating torrents
module.exports = class TorrentFetchController {
    constructor() {
        //this.state = state
        this.url = 'http://www.torrentino.me';
    }

    getMetaData(torrentLink) {
        var options = {
            host: 'http://www.torrentino.me',
            path: torrentLink
        };
        let meta = [];
        let descr = '';
        let trailer = '';
        let url = options.host + options.path;

        request(url, function (error, response, body) {
            let $ = cheerio.load(body);
            let start = body.substring(body.indexOf('var fotoOptions ='));
            let fotoAndVideoScript = start.substring(0,start.indexOf('</script>'));
            eval(fotoAndVideoScript)
            console.log(fotoOptions)
            $(".plate.list-start").find('tr').map((key, item) => {
                let elem = $(item);
                let magnet;
                if (magnet = elem.find('.download a').attr('data-default')) {
                    
                    let content = $('.plate.head-plate .specialty')
                    let content_delete = $(content).find('.section.numbers').text() 
                    let descr = content.text().substring(content_delete.length)

                    let urlGetFilesList = elem.find('td.consistence a').attr('data-route');
                    let files = [];

                    request(urlGetFilesList, function (err, res, body) {
                        files = JSON.parse(body)


                        meta[meta.length] = {
                            video: elem.find('td.video').text(),
                            audio: elem.find('td.audio').text(),
                            languages: elem.find('td.languages').text(),
                            size: elem.find('td.size').text(),
                            seed: elem.find('td.seed-leech .seed').text(),
                            leech: elem.find('td.seed-leech .leech').text(),
                            magnet: magnet,
                            descr: descr,
                            trailer: fotoOptions.data[0].video,
                            files: files.files
                        };
                    });
                }


            });

            dispatch('torrentFetchMetaDataSuccess', meta);
            // dispatch('addTorrentList', arrayMovies);
        });
    }


    fetchFindTorrent(findValue, callback){
        let url = this.url;
        url = url + '/search?search=' + encodeURI(findValue); 
        console.log('url find', url)
        let arrayMovies = [];
        request(url, function (error, response, body) {
            let $ = cheerio.load(body);
          
            $('.tab.tab0.open .search-block').find('.tile').map((key, item) => {
                let elem = $(item);
                if (elem.find('.name').text())
                {
                    arrayMovies[arrayMovies.length] = {
                        name: elem.find('.name').text(),
                        img: elem.find('img').attr('src'),
                        link: elem.find('a').attr('href'),
                    };
                }
            });
            // dispatch('setResultSearch', arrayMovies)
            return callback(arrayMovies);
        })
    }
}

