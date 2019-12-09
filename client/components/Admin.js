import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';

export default class Admin extends React.Component {
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
        <div className="container">
          <h1>Safe-Travel</h1>
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
                <th className='button-col'>Update</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map(function(rental){
                  return  <tr>
                    <td className='counterCell'></td>
                    <td className='button-col'>{rental.year}</td>
                    <td className='button-col'>{rental.make}</td>
                    <td className='button-col'>{rental.model}</td>
                    <td className='desc-col'>{rental.description}</td>
                    <td className='button-col'>{rental.amount}</td>
                    <td className='button-col'>{rental.available}</td>
                    <td className='button-col'><Update rental={rental}/></td>
                    </tr>
                })
              }
              </tbody>
          </table>
        </div>
      );
    }
}