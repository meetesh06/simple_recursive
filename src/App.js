import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.recursive_builder = this.recursive_builder.bind(this);
  }
  state = {
    hierarchy_h: { hierarchy: [] },
    current_selected: {}
  }
  componentDidMount() {
    axios.post('/get-hiereachy', { _id: 'menime' })
      .then( res => {
        console.log(res.data);
        if(!res.data.error) {
          this.setState({ hierarchy_h: res.data.data });
        }
      })
      .catch( err => {
        console.log(err);
      });
  }

  recursive_builder = (current, prev) => {
    const recursive_builder = this.recursive_builder;
    console.log('current', current);
    if(current.children === undefined) return;
    return( <div>
      <p style={{ textAlign: 'left', margin: prev + 10 }}>
        {current.title}
      </p>
      <div>
        {current.children.map((value, index) => {
          return recursive_builder(value, prev + 10);
        })}
      </div>
    </div>);
  }

  render() {
    const hierarchy = this.state.hierarchy_h.hierarchy;
    const recursive_builder = this.recursive_builder;
    return (
      <div className="App">
        <div>

          {
            hierarchy.map( (value, index) => {
              return recursive_builder(value, -10);
            } )
          }
        </div>
      </div>
    );
  }
}

export default App;
