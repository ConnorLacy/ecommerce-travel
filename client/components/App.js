import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add'


export default class App extends React.Component {
  constructor() {
      super();
      this.state = {
        selectedMake:'', selectedModel: '', data: []
      };
      this.getData = this.getData.bind(this);
  }

  componentDidMount() {
      this.getData(this, '');
  }

  componentDidUpdate(nextProps) {
    this.getData(this, '');
  }

  getData(ev, model){
      axios.get('/getAll?make=All&model=All')
        .then(function(response) {
          ev.setState({data: response.data});
        });
  }

  render() {
      return (
        <div>
          <Add />
          <table>
            <thead>
              <tr>
                <th></th>
                <th className='button-col'>Year</th>
                <th className='button-col'>Make</th>
                <th className='button-col'>Model</th>
                <th className='desc-col'>Description</th>
                <th className='button-col'>Amount</th>
                <th className='button-col'>Available?</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map(function(exp){
                  return  <tr>
                    <td className='counterCell'></td>
                    <td className='button-col'>{exp.year}</td>
                    <td className='button-col'>{exp.make}</td>
                    <td className='button-col'>{exp.model}</td>
                    <td className='desc-col'>{exp.description}</td>
                    <td className='button-col'>{exp.amount}</td>
                    <td className='button-col'>{exp.available}</td>
                    </tr>
                })
              }
              </tbody>
          </table>
        </div>
      );
    }
}