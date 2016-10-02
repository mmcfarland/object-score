import React, { Component } from 'react';
import { clone, cloneDeep } from 'lodash';
import Row from './Row';

export default class ResponseTable extends Component {
    constructor() {
        super();

        this.handleResponse = this.handleResponse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { onSubmit, onClear, responseSet, subject, group } = this.props;
        if (!subject.trim()) {
            alert('Please enter a Subject Id');
        } else if (group === 'X') {
            alert('Please select a Group value');
        } else {

            onSubmit({
                subject,
                group,
                responseSet: clone(responseSet),
            });

            onClear();
        }
    }

    handleResponse([row, idx, response]) {
        const { responseSet, onResponseSetChange } = this.props
        const newResponses = clone(responseSet);
        newResponses[row][idx] = response;
        onResponseSetChange(newResponses);
    }

    render() {
        const { responseSet, subject, group, onGroupChange, onSubjectChange,
                onClear, isEditing } = this.props;

        const rows = cloneDeep(responseSet).map((responseLine, idx) => {
            return (
                <Row
                    responses={responseLine}
                    key={`row-${idx}`}
                    onChange={this.handleResponse}
                    rowNum={idx}
                />
            )
        });

        const saveText = isEditing ? 'Update Response' : 'Submit Response';
        const cancel = isEditing
            ? <button onClick={onClear} className="btn btn-raised btn-warning">Cancel Edit</button>
            : null;

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
                    <option value="VD">VAD</option>
                    <option value="H">HC</option>
                </select>

                <table className="response">
                  <tbody>
                      {rows}
                  </tbody>
                </table>

                <button onClick={this.handleSubmit} className="btn btn-raised btn-info">{saveText}</button>
                {cancel}
            </div>
        )
    }

}
