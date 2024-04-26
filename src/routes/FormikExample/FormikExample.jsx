import { Formik, Field, Form } from "formik";
import "./formik.css";
import "./formInput.css";
import { FormInput } from "./FormikFields";

const inputs = [
  {
    id: "firstName",
    name: "firstName",
    placeholder: "Enter name",
  },
  {
    id: "lastName",
    name: "lastName",
    placeholder: "Enter l name",
  },
  {
    id: "email",
    name: "email",
    placeholder: "Enter email",
  },
];

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const FormikExample = () => {
  return (
    <div className="formik-example">
      <h1>Sign Up</h1>
      <div className="container">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
          }}
          validate={validate}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form>
            {inputs.map((input, idx) => {
              return (
                <div key={"k" + idx} className="formInput">
                  <FormInput {...input} />
                </div>
              );
            })}
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default FormikExample;
