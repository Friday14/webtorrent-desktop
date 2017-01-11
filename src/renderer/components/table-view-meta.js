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
        };

        const {data} = this.props;
        return <div>
            <h1>Источники</h1>
            <div className=" meta-table table-responsive" style={{background: 'rgba(0, 151, 167, 0.46)'}}>
                <table className="table bg-info-700">
                    <thead>
                    <tr>
                        <th>Seed/Peer</th>
                        <th>Размер</th>
                        <th>Размер видео</th>
                        <th>Аудио</th>
                        <th>Локализация</th>
                        {/*<th>Файлы</th>*/}
                        <th>Скачать</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, key) => this.renderItem(row, key))}
                    </tbody>
                </table>
            </div>

        </div>
    }

    renderItem(row, key) {
        return <tr>
            <td>{row.seed} / {row.leech}</td>
            <td>{row.size}</td>
            <td>{row.video}</td>
            <td>{row.audio}</td>
            <td>{row.languages}</td>
            {/*
             <td>{row.files.map((file, fkey) =>
             <span key={'file' + key + '-' + fkey}
             className="label label-default">{file.file}</span>)}</td>*/}
            <td><label className="label label-success"
                       onClick={dispatcher('addTorrent', row.magnet)}>
                Скачать
            </label></td>
        </tr>
    }
}

module.exports = TableEx;