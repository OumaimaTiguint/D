import React, { Component } from 'react';
import axios from 'axios';

const Parent = props => (
    <tr>
      <td>{props.parent.id}</td>
      <td>{props.parent.sender}</td>
      <td>{props.parent.receiver}</td>
      <td>{props.parent.totalAmount}</td>
    </tr>
)

export default class ParentElements extends Component {
  constructor(props) {
    super(props);
      this.state = {elements: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/parent/')
      .then(response => {
        this.setState({ elements: response.data })
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  parentElements() {
    return this.state.elements.map(e => {
      return <Parent element={e} key={e.id}/>;
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
            </tr>
          </thead>
          <tbody>
            { this.parentElements() }
          </tbody>
        </table>
      </div>
    )
  }
}
