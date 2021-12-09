import React from 'react';
import './App.css';
import InputForm from './components/InputForm/InputForm';
import Select from './components/Select/Select';

class App extends React.Component {
  state = {
    defaultValue: 1,
  }


  selectChangeHandler = e => {
    console.log(e.target.value);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Online Google Library</h1>
          <InputForm />
          <div className="App-selects">
            <Select label="Category:"
                    value={this.state.defaultValue}
                    onChange={this.selectChangeHandler}
                    options={[
                      {text: 'all', value: 1},
                      {text: 'art', value: 2},
                      {text: 'biography', value: 3},
                      {text: 'computers', value: 4},
                      {text: 'history', value: 5},
                      {text: 'medical', value: 6},
                      {text: 'poetry', value: 7},
              ]} />
            <Select label="Sort by:"
                    value={this.state.defaultValue}
                    onChange={this.selectChangeHandler}
                    options={[
                      {text: 'relevance', value: 1},
                      {text: 'newest', value: 2}
            ]} />
          </div>
        </header>

        <main className="App-main">
          {  }
        </main>
      </div>
    )
  }
}

export default App;
