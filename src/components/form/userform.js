import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import { Field } from 'formik';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

const provinceData = [
  { label: 'Hawaii', value: 'Hawaii' },
  { label: 'South Dakota', value: 'South Dakota' },
  { label: 'Orange County', value: 'Orange County' },
  { label: 'New York', value: 'New York' }
];

function Checkbox(props) {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label>
          <input
            type="checkbox"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  value => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
          {props.value}
        </label>
      )}
    </Field>
  );
}

const UserForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;

  const _handleSelect = selectChoice => {
    setFieldValue('province', selectChoice.value);
  };

  return (
    <form className="p-5" onSubmit={handleSubmit}>
      <h1>Signup form!</h1>
      <div className="form-group">
        <label> Email</label>
        <input
          name="email"
          type="text"
          className={`form-control ${errors.email &&
            touched.email &&
            'is-invalid'}`}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email &&
          touched.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
      </div>

      <div className="form-group">
        <label> Username</label>
        <input
          name="username"
          type="text"
          className={`form-control ${errors.username &&
            touched.username &&
            'is-invalid'}`}
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.username &&
          touched.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
      </div>

      <div className="form-group">
        <label> Phone </label>
        <input
          name="phone"
          type="text"
          className={`form-control ${errors.phone &&
            touched.phone &&
            'is-invalid'}`}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.phone &&
          touched.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
      </div>

      <div className="form-group">
        <label>Select Gender : </label>
      </div>
      <div className="form-group">
        <label>Male</label>
        <input
          name="gender"
          type="radio"
          className={` ${errors.gender && touched.gender && 'is-invalid'}`}
          checked={values.gender === 'male'}
          value="male"
          onChange={() => {
            setFieldValue('gender', 'male');
          }}
          onBlur={handleBlur}
        />
        {errors.gender &&
          touched.gender && (
            <div className="invalid-feedback">{errors.gender}</div>
          )}

        <label>Female</label>
        <input
          name="gender"
          type="radio"
          className={` ${errors.gender && touched.gender && 'is-invalid'}`}
          checked={values.gender === 'female'}
          value="female"
          onChange={() => {
            setFieldValue('gender', 'female');
          }}
          onBlur={handleBlur}
        />
        {errors.gender &&
          touched.gender && (
            <div className="invalid-feedback">{errors.gender}</div>
          )}
      </div>

      <div className="form-group">
        <label> Select role : </label>
        <Checkbox name="roles" value="admin" />
        <Checkbox name="roles" value="customer" />
        <Checkbox name="roles" value="stakeholder" />

        {errors.roles &&
          touched.roles && (
            <div className="invalid-feedback">{errors.roles}</div>
          )}
      </div>

      <div className="form-group">
        <label>Select province</label>
        <VirtualizedSelect
          name="province"
          value={values.province}
          options={provinceData}
          onChange={_handleSelect}
        />
        {errors.province &&
          touched.province && (
            <div className="invalid-feedback">{errors.province}</div>
          )}
      </div>

      <button
        type="submit"
        className="btn btn-outline-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'WAIT PLIZ' : 'CLICK ME'}
      </button>
    </form>
  );
};

export default UserForm;
