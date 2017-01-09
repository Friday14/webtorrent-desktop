const React = require('react')
const {dispatcher} = require('../../lib/dispatcher');

module.exports = class MediaGrid extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    const {items} = this.props
      return (
        <div>
          <div className="row">
          {
            items.map((item, key) => {
              return this.renderItem(item, key)
            })
          }
          </div>
        </div>
      )
  }


  renderItem(item, key) {
    // const {item} = this.props
      let raitingClass = ''

        if(item.raiting > 5) 
         raitingClass = 'label label-good-raiting' 
        else
         raitingClass='label label-bad-raiting'
       
       return (
            <div key={'keyTorrent-' + key} className="media-grid-item col-lg-2 col-sm-3">
                <div onClick={dispatcher('torrentDetail', item)}>
                  <div className='item-img'>
                    <img className='img-rounded' src={item.img ? item.img : 'http://image.prntscr.com/image/ec577832719c4c1eb054fc250e73db2a.png'}/>
                    
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
                  </div>
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