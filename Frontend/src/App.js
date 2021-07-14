import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import Footer from './components/footer/footer';
import Register from './components/userManagement/register';

function App() {
  return (
    <div>
      <Router>
        <section>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/register" component={Register} />
          </Switch>
        </section>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
