import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListStuff from '../pages/ListStuff';
import ListStuffAdmin from '../pages/ListStuffAdmin';
import AddStuff from '../pages/AddStuff';
import EditStuff from '../pages/EditStuff';
import Policy from '../pages/Policy';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
// import ManageDatabase from '../pages/ManageDatabase';
import { ROLE } from '../../api/role/Role';
import PlanningTabs from '../pages/PlanningTabs';
import SpendingPage from '../pages/SpendingPage';
import EditSpending from '../pages/EditSpending';
import EditPlanning from '../pages/EditPlanning';
import MyProfile from '../pages/MyProfile';
import EditMyProfile from '../pages/EditMyProfile';
import AdminDeleteUser from '../pages/AdimDeleteUser';
import Activities from '../pages/Activities';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            {/* <Route path="/policy" component={Policy}/> */}
            <ProtectedRoute path="/list" component={ListStuff}/>
            <ProtectedRoute path="/Edit-My-Profile" component={EditMyProfile}/>
            <ProtectedRoute path="/activities/:_id" component={Activities}/>
            <ProtectedRoute path="/planning-tabs" component={PlanningTabs}/>
            <ProtectedRoute path="/My-Profile" component={MyProfile}/>
            <ProtectedRoute path="/spending" component={SpendingPage}/>
            <ProtectedRoute path="/planning-item/:_id" component={EditPlanning}/>
            <ProtectedRoute path="/spending-item/:_id" component={EditSpending}/>
            <ProtectedRoute path="/add" component={AddStuff}/>
            <ProtectedRoute path="/edit/:_id" component={EditStuff}/>
            <ProtectedRoute path="/policy" component={Policy}/>
            <AdminProtectedRoute path="/admin" component={ListStuffAdmin}/>
            <AdminProtectedRoute path="/admin-delete-user" component={AdminDeleteUser}/>

            {/* <AdminProtectedRoute path="/manage-database" component={ManageDatabase}/> */}
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN);
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
