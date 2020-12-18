import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChildElements from './child.component';
import 'bootstrap/dist/css/bootstrap.min.css';

const Parent = props => (
  <tr>
    <th scope="row">{props.element.id}</th>
    <td>{props.element.sender}</td>
    <td>{props.element.receiver}</td>
    <td>{props.element.totalAmount}</td>
    <td>
      <Link to={"/child/"+ props.element.id}>{props.element.paidAmount/2}</Link>
    </td>
  </tr>
)

export default class ParentElements extends Component {
  constructor(props) {
    super(props);
      this.state = {
        elements_parent: [],
        elements_child: []
      };
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
        this.setState({ elements_child: response.data[0].data })
        console.log(response.data[0].data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  parentElements() {
    return this.state.elements_parent.map(p => {
      this.state.elements_child.map(c => {
        if(c.parentId === p.id) {
          if(p.paidAmount !== 0) {
            p.paidAmount = p.paidAmount + c.paidAmount
          } else {
            p.paidAmount = c.paidAmount
          }
        }
        return p.paidAmount;
      })
      return <Parent element={p} key={p.id}/>;
    })
  }

  render() {
    return (
      <div className="Container">
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Sender</th>
              <th scope="col">Receiver</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Total Paid Amount</th>
            </tr>
          </thead>
          <tbody>
          { this.parentElements()}
          </tbody>
        </table>
        <Router>
          <Switch>
            <Route path="/:id" children={<ChildElements />} />
          </Switch>
        </Router>
      </div>
    )
  }
}
