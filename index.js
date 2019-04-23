/*https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.1/redux.min.js*/

//Modelling Insurance Company scenario - using just Redux

console.clear();

//People dropping off a form and form itself (Action Creators, when called return an action object)
const createPolicy = (name, amount) => {
  return {
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  }
}

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name
    }
  }
}

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  }
}

//Reducers (Company Departments - claims, accounting, policy depts)
const claimsHistory = (oldListOfClaims = [], action) => {
  if(action.type === 'CREATE_CLAIM'){
    //we care about this action (form is relevant to department)
    return [...oldListOfClaims, action.payload]; //new array
  }
  
  //we dont care about this form (not relevant to department)
  return oldListOfClaims;
}

const accounting = (bagOfMoney = 100, action) => {
  if(action.type === 'CREATE_CLAIM'){
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === 'CREATE_POLICY'){
    return bagOfMoney + action.payload.amount;
  }
  
  return bagOfMoney;
}

const policies = (listOfPolicies = [], action) => {
  if(action.type === 'CREATE_POLICY'){
     return [...listOfPolicies, action.payload.name];
  }else if(action.type === 'DELETE_POLICY'){
    //filter returns new array which in this case will not contain name passed in
    return listOfPolicies.filter(name => name !== action.payload.name);
  }
  
  return listOfPolicies;
}


//Begin using Redux here - destructure out createStore and combineReducers methods
//console.log(Redux);

const { createStore, combineReducers } = Redux;

//wire together all reducers (combination of Departments)
const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

//create our store (contains all of our reducers and all of the state of the application)
const store = createStore(ourDepartments);

//create some policies
const action1 = createPolicy('Daniel', 10);
const action2 = createPolicy('Jim', 15);
const action3 = createPolicy('Joan', 25);

//create some claims
const action4 = createClaim('Joan', 70);
const action5 = createClaim('Jim', 30);

//delete a policy
const action6 = deletePolicy('Daniel');

//dispatch the actions 
store.dispatch(action1);
store.dispatch(action2);
store.dispatch(action3);
store.dispatch(action4);
store.dispatch(action5);
store.dispatch(action6);

//view the state
console.log(store.getState());
