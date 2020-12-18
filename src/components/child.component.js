import React, { Component } from 'react';
import axios from 'axios';
import {parentId} from './parent.component';
import 'bootstrap/dist/css/bootstrap.min.css';

const Child = props => (
    <tr>
      <th scope="row">{props.element.id}</th>
      <td>{props.element.sender}</td>
      <td>{props.element.receiver}</td>
      <td>{props.element.totalAmount}</td>
      <td>{props.element.paidAmount}</td>
    </tr>
)

export default class ChildElements extends Component {
  constructor(props) {
    super(props);
      this.state = {
        elements_parent: [],
        elements_child: [],
        selected_children: []
      }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/parent/')
      .then(response => {
        this.setState({ elements_parent: response.data[0].data })
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:5000/child/')
      .then(response => {
        response.data[0].data.map(c => {
          if(c.parentId === parentId) {
            this.setState({selected_children: this.state.selected_children.concat(c)})
          }
          return;
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  childElements = () => {
    return this.state.selected_children.map(c => {
      this.state.elements_parent.map(p => {
        if(c.parentId === p.id) {
          c.sender = p.sender;
          c.receiver = p.receiver;
          c.totalAmount = p.totalAmount;
        }
        return c;
      })
      return <Child element={c} key={c.id}/>;
    })
  }

  render() {
    return (
      <div className="container">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Sender</th>
              <th scope="col">Receiver</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Paid Amount</th>
            </tr>
          </thead>
          <tbody>
          { this.childElements()}
          </tbody>
        </table>
      </div>
    )
  }
}