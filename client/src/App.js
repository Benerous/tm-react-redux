import React, {Component} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// Components
import SideBar from './components/sidebar';
import Cart from './containers/cart';
import ProductList from './containers/product-list';

// CSS
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {activeComponent: 'product-list'};
    this.changeNavigation = this.changeNavigation.bind(this);
  }

  changeNavigation(prop) {
    this.setState({activeComponent: prop});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Link to='/products'>
              <h1 className="App-title">My simple shop</h1>
            </Link>
          </header>
          <div className="App-wrapper">
            <SideBar changeNavigation={this.changeNavigation} />
            {/* <Route path='/' exact component={} /> */}
            <Route path='/products' component={ProductList} />
            <Route path='/cart' component={Cart} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}