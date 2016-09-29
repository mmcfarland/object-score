import React, { Component } from 'react';


export default class Row extends Component{
    constructor(props) {
        super(props);
        this.addResponse = this.addResponse.bind(this);
    }

    addResponse(idx, event) {
        const val = Number(event.target.value);
        this.props.onChange([this.props.rowNum, idx, val])
    }

    render() {
        const response = this.props.responses;
        const inputs = response.map((cell, idx) =>
            <input
                key={`cell-${idx}`}
                value={cell || ''}
                onChange={this.addResponse.bind(this.addResponse, idx)}
                type="number"
                min="0"
                max="99"
                required
            />
        );
        return (
            <tr>
                <td>
                    <span>{this.props.rowNum + 1}:</span>
                </td>

                <td>
                    {inputs}
                </td>
            </tr>
        )
    }
}
