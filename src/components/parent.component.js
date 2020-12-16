import React, { Component } from 'react';
import axios from 'axios';

const Parent = props => (
    <tr>
      <td>{props.element.id}</td>
      <td>{props.element.sender}</td>
      <td>{props.element.receiver}</td>
      <td>{props.element.totalAmount}</td>
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
        this.setState({ elements: response.data[0].data })
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
