import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Home from '../Home/Home';
import LoginForm from '../Forms/LoginForm';
import RegisterForm from '../Forms/RegisterForm';
import Cart from '../User/Cart';
import Profile from '../User/Profile';
// import BookList from './components/BookList/BookList';
import BookListView from '../BookList/BookListView';
import BookDetails from '../BookDetails/BookDetails';

import About from '../Static/About';
import Contacts from '../Static/Contacts';
import NotFound from '../Static/NotFound';

import { AuthProvider } from '../../context/authContext/AuthContext';
import { authReducer, initialAuthState } from '../../reducers/authReducer';

import { CartProvider } from '../../context/cartContext/CartContext';
import { cartReducer, initialCartState } from '../../reducers/cartReducer';

function App() {
	const useAuthState = useReducer(authReducer, initialAuthState);
	const useCartState = useReducer(cartReducer, initialCartState);

	return (
		document.title = "Reactive Bookstore",
		<AuthProvider value={useAuthState}>
			<div>
				<div className='site-container'>
					<Router>
						<CartProvider value={useCartState}>
							<Header />
							<main className='site-main'>
								<Switch>
									<Route exact path="/" component={Home} />
									<Route path="/login" component={LoginForm} />
									<Route path="/logout" >
										<Redirect to="/" />
									</Route>
									<Route path="/register" component={RegisterForm} />
									<Route path="/profile" component={Profile} />
									<Route exact path="/books" render={(props) => <BookListView {...props} />} />

									<Route exact path="/books/:id" component={BookDetails} />
									<Route path="/cart" component={Cart} />

									<Route exact path="/books/genres/:id" render={(props) => <BookListView {...props} />} />
									<Route path="/about" component={About} />
									<Route path="/contacts" component={Contacts} />
									<Route path="/not-found" component={NotFound} />
									{/* <Redirect to="/not-found" /> */}
								</Switch>
							</main>
							<Footer />
						</CartProvider>
					</Router>
				</div >
				{/* ); */}
			</div>
		</AuthProvider>
	)
}

export default App;

// class App extends Component {
// 	render() {

// 	}
// }

// export default App;