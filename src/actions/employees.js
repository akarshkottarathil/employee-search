import axios from 'axios' 

export const fetchAllSubordinates = (name) => {
  return async function(dispatch, getState) {
    const allSubordinates = await fetchSubordinates(name, dispatch, getState)

    dispatch(setEmployeeSubordinates(name, allSubordinates))
  }
}

export const setEmployeeSubordinates = (name, subordinates) => {
  return {
    type: 'SET_EMPLOYEE_SUBORDINATES',
    payload: { name, subordinates }
  }
}

export const setEmployeeDirectSubordinates = (name, directSubordinates) => {
  return {
    type: 'SET_EMPLOYEE_DIRECT_SUBORDINATES',
    payload: { name, directSubordinates }
  }
}

const fetchSubordinates = async (name, dispatch, getState) => {
  const currentState = getState()
  
  let response, directSubordinates
  const currentUserDirectSubordinates = currentState[name] && currentState[name].directSubordinates

  if (currentUserDirectSubordinates) {
    directSubordinates = currentUserDirectSubordinates
  } else {
    response = await axios.get('http://api.additivasia.io/api/v1/assignment/employees/' + name)
    directSubordinates = response.data[1] ? response.data[1]['direct-subordinates'] : []

    dispatch(setEmployeeDirectSubordinates(name, directSubordinates))
  }
  if (directSubordinates.length === 0) return []

  let subordinates = await Promise.all(directSubordinates.map(employee => fetchSubordinates(employee, dispatch, getState)))
  subordinates = subordinates.reduce((acc, curr) => [...acc, ...curr], [])

  return [...directSubordinates, ...subordinates]
}