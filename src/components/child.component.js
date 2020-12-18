import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Child = props => (
    <tr>
      <th scope="row">{props.element.parentId}</th>
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
        elements_child: []
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
        this.setState({ elements_child: response.data[0].data })
        console.log(response.data[0].data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  displayChildren() {
    if(this.state.parentId !== undefined) {
      this.state.elements_child.map(c => {
        if(c.parentId === this.state.parentId) {
          this.setState({children: this.state.children.concat(c)})
        }
      })
    }
  }

  childElements = () => {
    return this.state.elements_child.map(c => {
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