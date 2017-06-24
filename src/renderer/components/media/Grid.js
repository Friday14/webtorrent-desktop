const React = require('react')
const {dispatcher} = require('../../lib/dispatcher');

module.exports = class MediaGrid extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {items} = this.props
        return (
            <div className="row">
                <div className="col-md-9 col-md-offset-1">
                    {
                        items.map((item, key) => {
                            return this.renderItem(item, key)
                        })
                    }
                </div>
            </div>

        )
    }

    getRaitingItemClass(item) {
        if (item.raiting > 5)
            return 'label label-good-raiting';
        else
            return 'label label-bad-raiting';
    }

    renderItem(item, key) {
        let raitingClass = this.getRaitingItemClass(item);

        return (
            <div
                key={'keyTorrent-' + key}
                onClick={dispatcher('torrentDetail', item)}
                className="media-grid-item col-xs-3 col-md-2"
                style={ {cursor: 'pointer'} }
            >


                <img className='img-rounded item-img'
                     src={item.img ? item.img : 'http://image.prntscr.com/image/ec577832719c4c1eb054fc250e73db2a.png'}/>

                <div className='raiting'>
                      <span className={raitingClass}>
                        {item.raiting}
                      </span>
                </div>

                <div className='year'>
                      <span className='label label-success'>
                        {item.year} г.
                      </span>
                </div>
                <div className="toper" style={ {position: 'absolute', top: 0, left: 0} }>
                    <span className="label quality">
                        {item.quality}
                      </span>
                </div>
                <div className="caption" style={{textAlign: 'center'}}>
                    <h6 className="no-margin">
                        <span>{item.name}</span>
                    </h6>
                </div>
            </div>
        )
    }
}