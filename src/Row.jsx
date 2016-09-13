import React, { Component } from 'react';


export default class Row extends Component{
    constructor() {
        super();
        this.state = {
            cell1: '', 
            cell2: '', 
            cell3: '', 
            cell4: '', 
            cell5: '', 
        };
        this.addResponse = this.addResponse.bind(this);
    }

    addResponse(idx, event) {
        const val = Number(event.target.value);
        this.setState({ [`cell${idx}`]: val }, () =>
            this.props.onChange(this.state)
        );
        console.log(idx, event.target.value);
    }

    render() {
        return (
            <tr>
                <td>
                    <span>{this.props.rowNum}</span>
                </td>

                <td>
                    <input 
                        type="number" 
                        value={this.state.cell1}
                        onChange={this.addResponse.bind(this.addResponse, 1)}
                    />
                    <input 
                        type="number" 
                        value={this.state.cell2}
                        onChange={this.addResponse.bind(this.addResponse, 2)}
                    />
                    <input 
                        type="number" 
                        value={this.state.cell3}
                        onChange={this.addResponse.bind(this.addResponse, 3)}
                    />
                    <input 
                        type="number" 
                        value={this.state.cell4}
                        onChange={this.addResponse.bind(this.addResponse, 4)}
                    />
                    <input 
                        type="number" 
                        value={this.state.cell5}
                        onChange={this.addResponse.bind(this.addResponse, 5)}
                    />
                </td>
            </tr>
        )
    }

}
