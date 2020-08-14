import React from 'react';
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import Taskform  from './Components/Task/Taskform'

import axios from 'axios';



class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false 
    }
  }
  // handle page reloading, if the user is logged in, continue to login
  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.setState(() => ({ 
        isAuthenticated: true 
      }))
    }
  }

  handleAuthentication = (boolean) => {
    this.setState(() => ({
      isAuthenticated: boolean
    }))
  }

  render() {
    return(
      <BrowserRouter>
      
        <div className="container">
          
          <div className="pt-5">
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              <ul className="navbar-nav mr-auto">
                {this.state.isAuthenticated ? (
                  <div className="navitems1">
                    {/* <li className="nav-item"> <Link to="/requestform/view">Form</Link></li>
                    <li className="nav-item ml-5"> <Link to ="/requestform/pending">Pending</Link></li>
                    <li className="nav-item ml-5"><Link to="/requestform/approved">Approved</Link></li>
                    <li className="nav-item ml-5"><Link to="/requestform/rejected">Rejected</Link></li>
                    <li className="nav-item ml-5"> <Link to ="/requestform/for-approval">Request for Approval</Link></li> */}
                  {/* <div className=" navitems1 logout"> */}
                   
                    <li className="nav-item ml-4"><Link to="/users/logout" >Logout</Link></li>
                    <li className="nav-item ml-4"><Link to="/taskform/create">Create </Link></li>
                  </div>
                  // </div>

                  ) : (
                  <div className="navitems1">
                    <li className="nav-item"><Link to="/users/register">Register</Link></li>
                    <li className="nav-item ml-5"><Link to="/users/login">Login</Link></li>
                  </div>
                )}
              </ul>
            </nav>

          </div>
          <Switch>
          <Route path="/users/register" component={ Register } />
          <Route path="/users/login" render={(props) => {
              return <Login {...props} handleAuthentication={this.handleAuthentication} />
          }} />
          
          <Route path="/taskform/create" component={Taskform}/>
          
          <Route path="/users/logout" render={(props) => {
              axios.delete('http://localhost:3005/users/logout', {
                headers: {
                  'x-auth': localStorage.getItem('token')
                }
                })
                .then(response => {
                  props.history.push('/users/login')
                  this.setState(() => ({
                    isAuthenticated: false
                  }))
                  localStorage.removeItem('token')
                })
              }} />
        </Switch>
        </div>
      </BrowserRouter>  
    )
  }
}

export default App;