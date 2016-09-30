import React, { Component } from 'react';

export default class ResultsTable extends Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    onClick(idx) {
        return () => this.props.onSelect(idx);
    }

    render() {
        const results = this.props.responses.map((response, idx) => {
            return (
                <tr
                    onClick={this.onClick(idx)}
                    key={response.subject}
                >

                    <td>{response.subject}</td>
                    <td>{response.group}</td>
                    <td>{response.responseSet}</td>
                </tr>
            );
        });

        return (
            <table>
                <tbody>
                    {results}
                </tbody>
            </table>
        )


    }
}
