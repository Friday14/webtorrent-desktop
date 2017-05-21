const cheerio = require('cheerio');

module.exports = class TorrentinoParser {

    constructor(htmlTorrontino) {
        typePage = 'detail'
        this.htmlText = htmlTorrontino;
        this.htmlDom = cheerio.load(htmlTorrontino);
        this.type = typePage;
    }

    getYear() {
        if (this.type == 'detail') {
            let $ = this.htmlDom;
            return $('.section.numbers').find('[itemprop="copyrightYear"]').text()
        }
    }

    getProducers() {
        if (this.type == 'detail') {
            let $ = this.htmlDom;
            return $('.section.numbers').find('[itemprop="producer"]').text().split(',').map( (item) => {
                return item.trim()
            })
        }
    }

    getActors() {
        if (this.type == 'detail') {
            let $ = this.htmlDom;
            return $('.section.numbers').find('[itemprop="actor"]').text().split(',').map( (item) => {
                return item.trim()
            })
        }
    }

    getDuration() {
        if (this.type == 'detail') {
            let $ = this.htmlDom;
            return $('.section.numbers').find('[itemprop="duration"]').text()
        }
    }
};