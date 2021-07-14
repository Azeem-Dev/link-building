import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NotFound from "./containers/404/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Home from "./containers/Home/index";
import Login from "./containers/Login";
import LinkSubmission from "./containers/LinkSubmission";
import Category from "./containers/Category";
import AdminPortal from "./containers/AdminPortal";
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/link-submission" component={LinkSubmission} />
          <Route exact path="/category" component={Category} />
          <Route exact path="/portal" component={AdminPortal} />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
