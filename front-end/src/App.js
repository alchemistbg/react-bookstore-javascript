import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

// import Test from './components/Test';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './components/Home/Home';
import LoginForm from './components/Forms/LoginForm';
import RegisterForm from './components/Forms/RegisterForm';
import Cart from './components/User/Cart';
import Profile from './components/User/Profile';
// import BookList from './components/BookList/BookList';
import BookListView from './components/BookList/BookListView';
import BookDetails from './components/BookDetails/BookDetails';

import About from './components/Static/About';
import Contacts from './components/Static/Contacts';
import NotFound from './components/Static/NotFound';

class App extends Component {

	render() {
		return (
			document.title = "Reactive Bookstore",
			<div className='site-container'>
				<Router>
					<Header />
					<main className='site-main'>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/login" component={LoginForm} />
							<Route path="/register" component={RegisterForm} />
							<Route path="/cart" component={Cart} />
							<Route path="/profile" component={Profile} />

							<Route exact path="/books" render={(props) => <BookListView {...props} />} />
							<Route exact path="/books/:id" component={BookDetails} />
							<Route exact path="/books/genres/:id" render={(props) => <BookListView {...props} />} />
							<Route path="/about" component={About} />
							<Route path="/contacts" component={Contacts} />
							<Route path="/not-found" component={NotFound} />
							{/* <Redirect to="/not-found" /> */}
						</Switch>
					</main>
					<Footer />
				</Router>
			</div >
		);
	}
}

export default App;