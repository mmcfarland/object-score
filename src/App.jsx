import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './App.css';
import * as actionCreators from './actions';
import ResponseTable from './ResponseTable';
import ResultsTable from './ResultsTable';

class App extends Component {
  render() {
      const { currentResponseSet, currentEntrySubject, currentEntryGroup,
              results, boundActionCreators } = this.props;

      return (
          <div className="App">
              <h2>Object Score Sheet</h2>
              <ResponseTable
                    responseSet={currentResponseSet}
                    group={currentEntryGroup}
                    subject={currentEntrySubject}
                    onSubmit={boundActionCreators.saveCurrentEntry}
                    onSubjectChange={boundActionCreators.setCurrentSubject}
                    onGroupChange={boundActionCreators.setCurrentGroup}
                    onResponseSetChange={boundActionCreators.setCurrentResponse}
                />
                <ResultsTable
                    responses={results}
                    onSelect={boundActionCreators.setCurrentEntry}
                />
          </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        currentResponseSet: state.response.responseSet,
        currentEntryGroup: state.response.group,
        currentEntrySubject: state.response.subject,
        results: state.results.responseEntries,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        boundActionCreators: bindActionCreators(actionCreators, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
