import React from 'react';
import ReactDOM from 'react-dom';
import {Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Axios from 'axios';
import Add from './Add';
import Update from './Update';
const CancelToken = Axios.CancelToken;
const source = CancelToken.source();

export default class Admin extends React.Component {
  constructor() {
      super();
      this.state = {
        selectedMake:'', selectedModel: '', data: []
      };
      this.getData = this.getData.bind(this);
  }

  componentDidMount() {
      this.getData(this);
  }

  componentWillUnmount(){
    source.cancel('Operation aborted')
  }

  componentDidUpdate() {
    this.getData(this);
  }

  getData(ev){
    Axios.get('/getAll?make=All&model=All', {
        cancelToken:source.token
        }).catch(function(thrown){
            if(Axios.isCancel(thrown)){
                console.log('Request Cancelled', thrown.message);
            }
            else{
                console.log('Error. something happened');
            }
        }).then(function(response){
        ev.setState({data: response.data})});
}

  render() {
      return (
        <div className="container">
          <h1>Add or Update Rental Car List</h1>
          <div className="btn-group btn-group-lg" role="group" aria-label="Table Controls">
            <Add />
            <Button variant="primary"><Link to="/" style={{color: 'white', fontWeight: 'Bold'}}>Logout</Link></Button>
          </div>
          <table>
            <thead>
              <tr>
                <th className='button-col'>ID</th>
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
                this.state.data.map(function(rental, i){
                  return  <tr key={i}>
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