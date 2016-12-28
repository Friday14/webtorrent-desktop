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
                {data.map(function (row) {
                    return <TableRow style={{fontSize:'17px'}} key={row.seed + row.size}>
                        <TableRowColumn style={styles.column} key="1ta">{row.seed} / {row.leech}</TableRowColumn>
                        <TableRowColumn style={styles.column} key="1tb">{row.size}</TableRowColumn>
                        <TableRowColumn style={styles.column} key="1tc">{row.video}</TableRowColumn>
                        <TableRowColumn style={styles.column} key="1tf">{row.audio}</TableRowColumn>
                        <TableRowColumn style={styles.column} key="1th">{row.languages}</TableRowColumn>
                         <TableRowColumn style={styles.column} key="15t">
                            {row.files.map((file) => <span key={file.size} className="label label-default">{file.file}</span>)}
                        </TableRowColumn>
                        <TableRowColumn style={styles.column} key="1tsdh">
                            <label className="label label-success" onClick={dispatcher('addTorrent',row.magnet)}>
                                Скачать
                            </label>
                        </TableRowColumn>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    }
}

module.exports = TableEx;