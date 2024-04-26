import { useEffect, useState } from "react";
import "./forms.css";
import FormInput from "./compo/FormInput";

const _inputs = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Enter Username",
    errorMessage:
      "Username should be 3-16 characters and shouldn't include any special character!",
    label: "Username",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
    validateNow: true,
  },
  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Enter Email",
    errorMessage: "It should be a valid email address!",
    pattern: "^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$",
    label: "Email",
    required: true,
  },
  {
    id: 3,
    name: "birthday",
    type: "date",
    placeholder: "Enter Birthday",
    label: "Birthday",
    required: true,
    pattern: "2024-01-01",
  },
  {
    id: 4,
    name: "password",
    type: "password",
    placeholder: "Enter Password",
    errorMessage:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    label: "Password",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    // pattern: "aksh",
    required: true,
  },
  {
    id: 5,
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    errorMessage: "Passwords don't match!",
    label: "Confirm Password",
    // pattern: "aksh",
    required: true,
  },
];

const FormsExample = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const [inputs, setInputs] = useState(_inputs);

  const passValid = (text) => values.password === text;

  const handleSubmit = (e) => {
    e.preventDefault();

    setInputs(() =>
      inputs.map((input) => {
        return {
          ...input,
          validateNow: true,
        };
      }),
    );

    alert(JSON.stringify(values));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="form-example ">
        <form onSubmit={handleSubmit} noValidate={true}>
          <h1>Register</h1>
          {inputs.map((input) => (
            <FormInput
              classes={{
                wrapper: "formInput",
                input: "",
                error: "error",
                errorText: "errorText",
              }}
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
              onBlur={(e) => {
                // console.log(e.target);
                setInputs(() =>
                  inputs.map((input) => {
                    if (input.id === 5) {
                      return {
                        ...input,
                        pattern: `^${values.password}$`,
                      };
                    } else return input;
                  }),
                );
              }}
            />
          ))}
          <button>Submit</button>
        </form>
      </div>
      <div className="form-example ">
        <form onSubmit={handleSubmit} noValidate={true}>
          <h1>Register</h1>
          {inputs.map((input) => (
            <FormInput
              classes={{
                wrapper: "formInput",
                input: "",
                error: "error",
                errorText: "errorText",
              }}
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
              onBlur={(e) => {
                // console.log(e.target);
                setInputs(() =>
                  inputs.map((input) => {
                    if (input.id === 5) {
                      return {
                        ...input,
                        pattern: `^${values.password}$`,
                      };
                    } else return input;
                  }),
                );
              }}
            />
          ))}
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default FormsExample;
