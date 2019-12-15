import React, { useEffect } from 'react'
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';

import * as actions from '../actions/employees'

import './Overview.css'

const Overview = props => {
  const { search } = props.location
  const params = new URLSearchParams(search)

  const employeeName = params.get('name')

  if (!employeeName) props.history.push({ pathname: '/' }) // redirect to home page if the query param is not available
  
  const { fetchAllSubordinates } = props
  useEffect(() => {
    fetchAllSubordinates(employeeName)
  }, [employeeName])

  return (
    <div id="overview-page">
      <div>
        <h1 className="mb-2">Employee Overview</h1>
        <div className="mb-1">
          <p className="mb-1">Subordinates of employee: <span className="capitalize"><b>{ employeeName }</b></span></p>
          <small>Direct employee names are cached so that multiple api calls will not be triggered for the same user</small>
        </div>
        <ul>
          { props.subordinates && props.subordinates.length ? props.subordinates.map((subordinate, index) => {
            return(
            <Link 
              key={ 'subordinate' + index }
              to={{
                pathname: 'overview',
                search: 'name=' + subordinate
              }} 
            >
              <li>
                { subordinate }
              </li>
            </Link>
            )
          }) : <li key="no-subordinates">No subordinates found!</li> }
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => { 
  const { search } = ownProps.location
  const params = new URLSearchParams(search)
  const employeeName = params.get('name')

  return {
    subordinates: state[employeeName] && state[employeeName].subordinates
  } 
}

export default connect(mapStateToProps, actions)(withRouter(Overview))