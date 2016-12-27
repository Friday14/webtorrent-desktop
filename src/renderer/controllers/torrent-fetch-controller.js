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
    constructor(state) {
        this.state = state
    }

    getMetaData(torrentLink) {
        var options = {
            host: 'http://www.torrentino.me',
            path: torrentLink
        };
        let meta = [];
        let magnet;
        let url = options.host + options.path;
        //'audio', 'video', 'languages', 'size' magnet
        request(url, function (error, response, body) {
            let $ = cheerio.load(body);
            $(".plate.list-start").find('tr').map((key, item) => {
                let elem = $(item);
                if (magnet = elem.find('.download a').attr('data-default')) {

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
                            files: files.files
                        };
                    });
                }

            });
            console.log(meta);
            dispatch('torrentFetchMetaDataSuccess', meta);
            // dispatch('addTorrentList', arrayMovies);
        });
    }
}
//                dispatch('torrentFetchMetaDataSuccess', meta);
