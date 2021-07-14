import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import Footer from './components/footer/footer';
import Register from './components/userManagement/register';
import Login from './components/userManagement/login';

function App() {
  return (
    <div>
      <Router>
        <section>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/register" component={Register} />
            <Route path="/login" component={ Login } />
          </Switch>
        </section>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
