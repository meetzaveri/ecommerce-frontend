import React, { Component } from 'react';
import Userform from './form';

// Can use simple formik instead of withFormik HOC with help of <Formik> component
const userModel = {
  email: '',
  username: '',
  gender: 'male',
  province: '',
  phone: '',
  roles: []
};

class UserformContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSubmitForm = finalFormState => {
    console.log('finalFormState', finalFormState);
  };
  render() {
    return <Userform user={userModel} onSubmitForm={this.onSubmitForm} />;
  }
}

export default UserformContainer;
