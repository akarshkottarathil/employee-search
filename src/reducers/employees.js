export default function(state = { test: 'tet' }, action) {
  switch (action.type) {
    case 'SET_EMPLOYEE_SUBORDINATES': {
      const { name, subordinates } = action.payload
      return { ...state, [name]: { ...state[name], subordinates: [...new Set(subordinates)] } }
    }

    case 'SET_EMPLOYEE_DIRECT_SUBORDINATES': {
      const { name, directSubordinates } = action.payload
      return { ...state, [name]: { ...state[name], directSubordinates } }
    }
  
    default:
      return state
  }
}