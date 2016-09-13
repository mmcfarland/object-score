import React, { Component } from 'react';
import Row from './Row';

export default class ResponseTable extends Component {
    handleSubmit() {
        console.log('handle');
    }

    handleChange(rowResponses) {
        console.log(rowResponses);
    }

    render() {
        return (
            <div>
                <table className="response">
                  <tbody>
                    <Row onChange={this.handleChange} rowNum={1} />
                    <Row rowNum={2} />
                    <Row rowNum={3} />
                    <Row rowNum={4} />
                    <Row rowNum={5} />
                    <Row rowNum={6} />
                    <Row rowNum={7} />
                  </tbody>
                </table>

                <button onClick={this.handleSubmit}>Submit Response</button>
            </div>
        )
    }

}
