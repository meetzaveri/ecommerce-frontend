import React from 'react';
import UserForm from '../../components/form/userform';
import { withFormik } from 'formik';
import * as Yup from 'yup';

export default withFormik({
  mapPropsToValues: props => ({
    email: props.user.email,
    username: props.user.username,
    gender: props.user.gender,
    province: props.user.province,
    phone: props.user.phone,
    roles: props.user.roles
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    username: Yup.string()
      .min(3)
      .required('This man needs a username'),
    gender: Yup.string(),
    province: Yup.string().required('Please select a province'),
    phone: Yup.number('Enter valid phone number')
      .min(10)
      .required('Please fill up phone number'),
    roles: Yup.array().required('Please select atleast one or more than one')
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    setTimeout(() => {
      // submit them do the server. do whatever you like!
      // alert(JSON.stringify(values, null, 2));
      props.onSubmitForm(values);
      setSubmitting(false);
    }, 1000);
  }
})(UserForm);
