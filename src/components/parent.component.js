import React, { Component } from 'react';
import axios from 'axios';

const Parent = props => (
    <tr>
      <td>{props.element.id}</td>
      <td>{props.element.sender}</td>
      <td>{props.element.receiver}</td>
      <td>{props.element.totalAmount}</td>
      <td>{props.element.paidAmount}</td>
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
            p.paidAmount = Math.floor(p.paidAmount + c.paidAmount)/2
          } else {
            p.paidAmount = c.paidAmount
          }
        }
      })
      return <Parent element={p} key={p.id}/>;
    })
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Total Amount</th>
              <th>Paid Amount</th>
            </tr>
          </thead>
          <tbody>
          { this.parentElements()}
          </tbody>
        </table>
      </div>
    )
  }
}
