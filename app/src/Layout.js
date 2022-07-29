import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import injectContext from './store/appContext';
import Home from './views/Home';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Profile from './views/Profile';
import Register from './views/Register';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
            <ToastContainer />
        </BrowserRouter>
    )
}

export default injectContext(Layout);