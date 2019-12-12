import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

import Header from './components/Navigation/Header';
import Footer from './components/Navigation/Footer';

import BookList from './components/BookList';
import BookDetails from './components/BookDetails';

import About from './components/About';
import Contacts from './components/Contacts';
import LoginForm from './components/Forms/LoginForm';
import RegisterForm from './components/Forms/RegisterForm';
import NotFound from './components/NotFound';

class App extends Component {

	render() {
		return (
			document.title = "Reactive Bookstore",
			<div className='site-container'>
				<Router>
					<Header />
					<main className='site-main'>
						<Switch>
							<Route exact path="/" component={BookList} />
							<Route path="/about" component={About} />
							<Route path="/contacts" component={Contacts} />
							<Route path="/login" component={LoginForm} />
							<Route path="/register" component={RegisterForm} />
							<Route path="/books/:id" component={BookDetails} />

							<Route path="/not-found" component={NotFound} />
							<Redirect to="/not-found" />
						</Switch>
					</main>
					<Footer />
				</Router>
			</div >
		);
	}
}

export default App;