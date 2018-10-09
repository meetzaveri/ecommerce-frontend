import React, { Component } from 'react';
import Userform from './form';

const imaginaryUser = {
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
    return <Userform user={imaginaryUser} onSubmitForm={this.onSubmitForm} />;
  }
}

export default UserformContainer;
