const React = require('react')
// import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
const TableComponent = require('material-ui/Table');
const Table = TableComponent.Table;
const TableBody = TableComponent.TableBody;
const TableRow = TableComponent.TableRow;
const TableRowColumn = TableComponent.TableRowColumn;
const TableHeader = TableComponent.TableHeader;
const TableHeaderColumn = TableComponent.TableHeaderColumn;
const RaisedButton = require('material-ui/RaisedButton').default;
const {dispatch, dispatcher} = require('../lib/dispatcher');

class TableEx extends React.Component {

    render() {
        const styles = {
            column: {
                fontSize: '10px',
                textAlign: 'center',
                whiteSpace: 'pre-line',
                padding: 0
            },
            header: {
                textAlign: 'center',
            }
        }
        const {data} = this.props;
        return <Table>
            <TableHeader displaySelectAll={false}
                         adjustForCheckbox={false}
            >
                <TableRow>
                    <TableHeaderColumn style={styles.header}>Seed/Peer</TableHeaderColumn>
                    <TableHeaderColumn style={styles.header}>Размер</TableHeaderColumn>
                    <TableHeaderColumn style={styles.header}>Размер видео</TableHeaderColumn>
                    <TableHeaderColumn style={styles.header}>Аудио</TableHeaderColumn>
                    <TableHeaderColumn style={styles.header}>Локализация</TableHeaderColumn>
                    <TableHeaderColumn style={styles.header}>Файлы</TableHeaderColumn>
                    <TableHeaderColumn style={styles.header}>Скачать</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {data.map(function (row, key) {
                    return <TableRow style={{fontSize:'17px'}} key={'table-row-' + key}>
                        <TableRowColumn style={styles.column} key={'seed-' + key}>
                        {row.seed} / {row.leech}</TableRowColumn>
                        <TableRowColumn style={styles.column}  key={'size-' + key}>{row.size}</TableRowColumn>
                        <TableRowColumn style={styles.column}  key={'video-' + key}>{row.video}</TableRowColumn>
                        <TableRowColumn style={styles.column}  key={'audio-' + key}>{row.audio}</TableRowColumn>
                        <TableRowColumn style={styles.column}  key={'lang-' + key}>{row.languages}</TableRowColumn>
                         <TableRowColumn style={styles.column}  key={'files-' + key}>
                            {row.files.map((file,fkey) => 
                                <span key={'file' + key + '-' + fkey} className="label label-default">{file.file}</span>)}
                        </TableRowColumn>
                        <TableRowColumn style={styles.column} key={'magnet-' + key}>
                            <label className="label label-success" 
                            onClick={dispatcher('addTorrent',row.magnet)}>
                                Скачать{row.magnet}
                            </label>
                        </TableRowColumn>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    }
}

module.exports = TableEx;