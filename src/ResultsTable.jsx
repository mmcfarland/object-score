import React, { Component } from 'react';
import Papa from 'papaparse';
import download from 'downloadjs';
import Score from './Score';

export default class ResultsTable extends Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onDownload = this.onDownload.bind(this);
    }

    onClick(idx) {
        return () => this.props.onSelect(idx);
    }

    onDelete(idx) {
        return () => {
            if (confirm('Are you sure you want to delete this record?')) {
                this.props.onDelete(idx);
            }
        };
    }

    onClear() {
        if (confirm('This will permanantly delete all saved responses, are you sure you want to continue?')) {
            this.props.onClear();
        }
    }

    onDownload() {
        const data = this.props.responses.map(response => {
            const variables = new Score(response.responseSet).asVariables();
            return Object.assign({}, response, variables);
        });
        const csv = Papa.unparse(data);
        download(csv, 'object_score.csv', 'text/csv');
    }

    renderRows(cols, variables, idx) {
        return cols.map(col => <td key={`${col}-${idx}`}>{variables[col]}</td>);
    }

    renderHeaders(cols) {
        return cols.map(col => <th key={col}>{col}</th>);
    }

    render() {
        let varHeaders = [];
        const { responses, isEditing, editingIdx } = this.props;
        const results = responses.map((response, idx) => {
            const variables = new Score(response.responseSet).asVariables();
            const cols = Object.keys(variables).sort();
            const rows = this.renderRows(cols, variables, idx);
            const rowClass = (isEditing && idx === editingIdx) ? 'info' : '';

            if (!varHeaders.length) {
                 varHeaders = this.renderHeaders(cols);
            }
            return (

                <tr key={response.subject} className={rowClass}>
                    <td>
                        <span className="glyphicon glyphicon-remove"
                            onClick={this.onDelete(idx)}
                            title="Delete this response">
                        </span>
                        <span className="glyphicon glyphicon-pencil"
                            onClick={this.onClick(idx)}
                            title="Edit this response">
                        </span>
                    </td>
                    <td>{response.subject}</td>
                    <td>{response.group}</td>
                    {rows}
                </tr>
            );
        });

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <button
                        className="pull-right btn btn-raised btn-info"
                        title="Download As CSV"
                        onClick={this.onDownload}>Download
                    </button>
                    <button
                        className="pull-right btn btn-raised btn-info"
                        title="This will delete ALL saved responses"
                        onClick={this.onClear}>Clear All</button>
                    <h4>Saved Results</h4>
                </div>
                <div className="panel-body">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Actions</th>
                                <th>Subject</th>
                                <th>Group</th>
                                {varHeaders}
                            </tr>
                        </thead>
                        <tbody>
                            {results}
                        </tbody>
                    </table>
                </div>
            </div>
        )


    }
}
