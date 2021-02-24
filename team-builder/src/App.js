import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import schema from './validation/schema';
import * as Yup from 'yup';
import axios from 'axios';
import {v4} from 'uuid';

const initialValues = {name: '', email: '', password: '', title: ''}
const initialErrors = {name: '', email: '', password: '', title: ''}

function App() {

  const[formValues, setFormValues] = useState(initialValues);
  const[formErrors, setFormErrors] = useState(initialErrors);
  
  const [disables, setDisabled] = useState(true);
  const [submitee, setNewSubmitee] = useState ([]); 
  
  const newSumbitionForm = (event) => {
    const newSubmitee = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      title: formValues.title.trim(),
      terms: formValues.terms,
      id: v4()
    }
    postNewSubmitee(newSubmitee)
}
  const postNewSubmitee = (newSubmitee) => {
    axios
    .post(`https://reqres.in/api/users`, newSubmitee)
    .then((response) => {
      setNewSubmitee([res.data, ...submitee])
      setFormValues(initialValues)
    })
    
    .catch((error) =>{ 
      console.log(error)
    })
  }
  const onChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({...formErrors,[name]: "",})
      })
      .catch((err) => {
        setFormErrors({...formErrors,[name]: err.errors[0],
        })
      })
    setFormValues({...formValues, [name]: value,})
  }
    useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="App">
   <Form
   values={formValues}
   onChange={onChange}
   newSumbitionForm={newSumbitionForm}
   disabled={disabled}
   errors={formErrors}/>
    </div>
  );
}

export default App;
