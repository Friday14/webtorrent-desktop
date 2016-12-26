const fs = require('fs')
const path = require('path')
const electron = require('electron')

const {dispatch} = require('../lib/dispatcher')
const {TorrentKeyNotFoundError} = require('../lib/errors')
const sound = require('../lib/sound')
const TorrentSummary = require('../lib/torrent-summary')

const ipcRenderer = electron.ipcRenderer


// Controls the torrent list: creating, adding, deleting, & manipulating torrents
module.exports = class TorrentFetchController {
    constructor(state) {
        this.state = state
    }

    getMetaData(torrentLink) {
        var http = require('http');
        let meta = [];

        var options = {
            host: 'www.torrentino.me',
            path: torrentLink
        }

        var request = http.request(options, function (res) {
            let data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                let DomParser = require('dom-parser');
                let parser = new DomParser();
                let dom = parser.parseFromString(data);
                meta = dom.getElementsByTagName('tr').map(function (raw) {
                    let magnet = raw.getElementsByClassName('download')[0]
                    let link = null;
                    if (magnet)
                       link = (link = magnet.getElementsByTagName('a')[0]) ? link.getAttribute('data-default') : null;

                    let params = ['audio', 'video', 'languages', 'size'];
                    let data = {};
                    params.map(function (param) {
                        let node = raw.getElementsByClassName(param)[0]
                        if (node){
                            data[param]= node.innerHTML;
                        }
                    });

                    data.magnet = link;
                    return data;
                });
                dispatch('torrentFetchMetaDataSuccess', meta);
            });
        });
        request.on('error', function (e) {
            console.log(e.message);
        });
        request.end();
    }
}
