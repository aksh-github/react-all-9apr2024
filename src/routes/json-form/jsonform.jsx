import React, { useEffect, useState } from "react";
import { loadUI, validate } from "./utils";

const ErrorMessage = ({ name, error }) => {
  return (
    <>
      <div className="col-sm-2"></div>
      <p id={name + "Error"} className="message-invalid danger col-sm-10">
        {/* {error ? (
<Icon name="exclamation-triangle" className="sl-icon_color_error" />
) : null}
{" " + (error || "")} */}
        {error}
      </p>
    </>
  );
};

const Field = (props) => {
  // console.log("field", field);
  const { field, fns, value, error } = props;
  const { handleChange, validate, setError, submit } = fns;

  switch (field.type) {
    case "text":
    case "email":
    case "password":
      return (
        <div className="mb-3" key={field.name}>
          <label htmlFor={field.name} className="form-label">
            {field.label}
          </label>
          <input
            type={field.type}
            className={"col-sm-10 " + field.className}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            defaultValue={value}
            onBlur={(e) => {
              // console.log(validate(e.target.name, e.target.value));
              setError(field.name, validate(field.name, e.target.value));
            }}
            onChange={handleChange}
          />
          <ErrorMessage
            name={field.name}
            // error={formState?.[field.name]?.error}
            error={error}
          />
        </div>
      );
    case "select":
      return (
        <div className="mb-3" key={field.name}>
          <label htmlFor={field.name} className="form-label">
            {field.label}
          </label>
          <select
            aria-label={field.label}
            className={"col-sm-101 " + field.className}
            id={field.name}
            name={field.name}
            required={field.required}
            defaultValue={value}
            onBlur={(e) => {
              // console.log(validate(e.target.name, e.target.value));
              setError(field.name, validate(field.name, e.target.value));
            }}
            onChange={(e) => {
              handleChange({
                target: { name: field.name, value: e.target.value },
              });
            }}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ErrorMessage name={field.name} error={error} />
        </div>
      );
    case "checkbox":
      return (
        <div className="form-check mb-3" key={field.name}>
          <input
            type="checkbox"
            className={field.className}
            id={field.name}
            name={field.name}
            required={field.required}
            defaultValue={value}
            onBlur={(e) => {
              // console.log(validate(e.target.name, e.target.value));
              setError(field.name, validate(field.name, e.target.value));
            }}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor={field.name}>
            {field.label}
          </label>
          <ErrorMessage
            name={field.name}
            // error={formState?.[field.name]?.error}
            error={error}
          />
        </div>
      );
    case "textarea":
      return (
        <div className="mb-3" key={field.name}>
          <label htmlFor={field.name} className="form-label">
            {field.label}
          </label>
          <textarea
            className={"col-sm-10 " + field.className}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            rows={field.rows}
            defaultValue={value}
            onBlur={(e) => {
              // console.log(validate(e.target.name, e.target.value));
              setError(field.name, validate(field.name, e.target.value));
            }}
            onChange={handleChange}
          ></textarea>
          <ErrorMessage
            name={field.name}
            // error={formState?.[field.name]?.error}
            error={error}
          />
        </div>
      );
    case "submit":
    case "button":
      return (
        <button
          type={field.type}
          id={field.name}
          className={field.className}
          key={field.name || "submit"}
          name={field.name}
          onClick={submit}
        >
          {field.label || "Submit"}
        </button>
      );
    default:
      return null;
  }
};

const JsonForm = () => {
  const [uiJson, setUiJson] = React.useState(null);

  useEffect(() => {
    loadUI("/form.json?t=" + Date.now())
      .then((data) => {
        console.log("UI JSON loaded successfully", data);
        setUiJson(data);
      })
      .catch((error) => {
        console.error("Error loading UI JSON:", error);
      });
  }, []);

  const [formState, setFormState] = useState(null);

  useEffect(() => {
    if (uiJson) {
      setFormState(
        uiJson.form.fields.reduce((acc, field) => {
          acc[field.name] = {
            value: field.value || "",
            error: field.error || "",
          };
          return acc;
        }, {}),
      );
    }
  }, [uiJson]);

  const [formValid, setFormValid] = useState(false);

  const validateForm = () => {
    // console.log("validateForm", formState);
    // const errors = {};
    let isValid = true;

    for (const fieldName in formState) {
      const field = formState[fieldName];
      const { value } = field;
      const error = validate(fieldName, value);
      if (error) {
        // errors[fieldName] = error;
        isValid = false;

        setFormValid(false);
        // break; // Stop on first error

        setFormState((prevState) => {
          // console.log("prevState", prevState);

          return {
            ...prevState,
            [fieldName]: {
              value: prevState[fieldName].value,
              error,
            },
          };
        });
      } else {
        setFormState((prevState) => {
          // console.log("prevState", prevState);

          return {
            ...prevState,
            [fieldName]: {
              value: prevState[fieldName].value,
              error: "",
            },
          };
        });
      }
    }

    // console.log("errors", errors);

    if (isValid) {
      setFormValid(true);
    }

    // return { isValid, errors };
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("formState", formState);
    // validateForm();
    const isValid = validateForm();
    // console.log("isValid", isValid);
    if (isValid) {
      // Submit the form
      console.log("Form submitted successfully");
    } else {
      console.log("Form submission failed");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => {
      // console.log("prevState", prevState);

      const err = validate(name, value);

      // validateForm();

      // console.log("err", err, formState);

      if (err) {
        setFormValid(false);
      }

      return {
        ...prevState,
        [name]: {
          value,
          error: err,
        },
      };
    });
  };

  const setError = (id, error) => {
    setFormState((prevState) => {
      // console.log("prevState", prevState);

      if (error) {
        setFormValid(false);
      }

      return {
        ...prevState,
        [id]: {
          value: prevState[id].value,
          error,
        },
      };
    });
  };

  return (
    <div>
      <h1>Json Based Form</h1>
      <p>JsonForm valid: {formValid ? "true" : "false"}</p>
      {uiJson && formState && (
        <form id={uiJson.form.id} className={uiJson.form.className}>
          {uiJson.form.fields.map((field, idx) => (
            <Field
              key={field.name + idx}
              field={field}
              fns={{
                handleChange,
                validate,
                setError,
                submit: handleSubmit,
              }}
              value={formState[field.name]?.value}
              error={formState[field.name]?.error}
            />
          ))}
        </form>
      )}
    </div>
  );
};

export default JsonForm;
