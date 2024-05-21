import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Home_old from './Routes/Home_old';
import Tv from './Routes/Tv';
import Search from './Routes/Search';
import Header from './Components/Header';
import Main from './Routes/Main';
import Footer from './Components/Footer';
import Login from './Routes/Login';
import Sign from './Routes/SignUp';
import Home from './Routes/Home';
import Series from './Routes/Series';
import Wish from './Routes/Wish';

function App() {

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={["/home/series", "/series/:movieId",]} component={Series}>
        </Route>
        <Route exact path={["/home/wish", "/wish/:movieId",]} component={Wish}>
        </Route>
        <Route exact component={Home}
              path={["/home", "/movies/:movieId", "/home/like"]}>
        </Route>
        <Route exact path="/login" component={Login}>
          {/* <Login /> */}
        </Route>
        <Route exact component={Sign}
               path={["/signup", "/signup/planform", "/signup/registration", "/signup/regform"]}>
          {/* <Sign /> */}
        </Route>
        <Route exact path="/" component={Main}>
          {/* <Main /> */}
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;