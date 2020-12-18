import React from 'react';
import ChildElements from './components/child.component';
import ParentElements from "./components/parent.component";
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="container">
                <Route path="/" exact component={ParentElements}></Route>
                <Route path="/child/:id" exact component={ChildElements}></Route>
            </div>
        </Router>
    );
}

export default App;