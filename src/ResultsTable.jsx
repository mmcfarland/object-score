import React, { Component } from 'react';
import Score from './Score';

export default class ResultsTable extends Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onClick(idx) {
        return () => this.props.onSelect(idx);
    }

    onDelete(idx) {
        return () => this.props.onRemove(idx);
    }

    render() {
        const results = this.props.responses.map((response, idx) => {
            const score = new Score(response.responseSet).asVariables();
            console.log(score);
            return (
                <tr key={response.subject}>
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
                    <td></td>
                </tr>
            );
        });

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <button className="pull-right btn btn-raised btn-info"
                        title="Download As CSV">Download</button>
                    <button className="pull-right btn btn-raised btn-info"
                        title="This will delete ALL saved responses">Clear All</button>
                    <h4>Saved Results</h4>
                </div>
                <div className="panel-body">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Actions</th>
                                <th>Subject</th>
                                <th>Group</th>
                                <th>SPSS</th>
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
