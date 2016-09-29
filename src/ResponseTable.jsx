import React, { Component } from 'react';
import { clone } from 'lodash';
import Row from './Row';

export default class ResponseTable extends Component {
    constructor() {
        super();

        this.handleResponse = this.handleResponse.bind(this);
    }


    handleResponse([row, idx, response]) {
        const { responseSet, onResponseSetChange } = this.props
        const newResponses = clone(responseSet);
        newResponses[row][idx] = response;
        onResponseSetChange(newResponses);
    }

    render() {
        const { responseSet, subject, group, onGroupChange, onSubjectChange,
                onSubmit } = this.props;

        const rows = responseSet.map((responseLine, idx) => {
            return (
                <Row
                    responses={responseLine}
                    key={`row-${idx}`}
                    onChange={this.handleResponse}
                    rowNum={idx}
                />
            )
        });

        return (
            <div>
                <label>Subject ID:</label>
                <input type="text"
                    onChange={onSubjectChange}
                    value={subject}
                    placeholder="Responder Identifier"
                    required
                />
                <label>Group:</label>
                <select onChange={onGroupChange} value={group}>
                    <option value="X">Select One</option>
                    <option value="AD">AD</option>
                    <option value="VD">VD</option>
                    <option value="H">H</option>
                </select>

                <table className="response">
                  <tbody>
                      {rows}
                  </tbody>
                </table>

                <button onClick={onSubmit}>Submit Response</button>
            </div>
        )
    }

}
