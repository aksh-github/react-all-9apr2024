import React, { useEffect, useState } from "react";
import { isFormValid, loadUI, setGlobalUIJson, validate } from "./utils";

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
  const { field, fns, state } = props;
  const { handleChange, validate, setError } = fns;

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
            defaultValue={state?.value}
            onBlur={(e) => {
              // console.log(validate(e.target.name, e.target.value));
              setError(field.name, validate(field.name, e.target.value));
            }}
            onChange={handleChange}
          />
          <ErrorMessage
            name={field.name}
            // error={formState?.[field.name]?.error}
            error={state?.error}
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
            id={field.id || field.name}
            name={field.name}
            required={field.required}
            defaultValue={state?.value}
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
          <ErrorMessage
            name={field.name}
            // error={formState?.[field.name]?.error}
            error={state?.error}
          />
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
            defaultValue={state?.value}
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
            error={state?.error}
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
            defaultValue={state?.value}
            onBlur={(e) => {
              // console.log(validate(e.target.name, e.target.value));
              setError(field.name, validate(field.name, e.target.value));
            }}
            onChange={handleChange}
          ></textarea>
          <ErrorMessage
            name={field.name}
            // error={formState?.[field.name]?.error}
            error={state?.error}
          />
        </div>
      );
    default:
      return null;
  }
};

const JsonForm = ({ setIsFormValid, setRequestObj }) => {
  const [uiJson, setUiJson] = React.useState(null);
  const [formState, setFormState] = React.useState(null);

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

  useEffect(() => {
    if (uiJson) {
      setFormState(
        uiJson.form.fields.reduce((acc, field) => {
          acc[field.name] = {
            value: formState?.[field.name]?.value || field.value || "",
            error: formState?.[field.name]?.error || field.error || "",
          };
          return acc;
        }, {}),
      );

      setGlobalUIJson(uiJson);
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
      const err = validate(name, value);
      const newState = {
        ...prevState,
        [name]: {
          value,
          error: err,
        },
      };

      if (name === "selectUsecase") {
        // modify the form json based on the selected use case

        setUiJson((prevUiJson) => {
          return {
            ...prevUiJson,
            form: {
              ...prevUiJson.form,
              fields: uiJson.form.fields
                // .filter((field, idx) => idx === 0)
                .filter((field) => field.name === "selectUsecase")
                .concat(uiJson.form.more[value]?.fields || []),
              id: "configForm" + Date.now(), // update form id to force re-render
            },
          };
        });
      }

      // if no save button, then need to have setTimeout
      setTimeout(() => {
        // console.log("newState", newState);

        const isValid = isFormValid(newState);
        let reqObj = {};

        if (isValid) {
          const { fields } = uiJson.form;
          Object.keys(fields).forEach((idx) => {
            // console.log("field", idx, fields[idx]);

            if (fields[idx].requestObjName)
              reqObj[fields[idx].requestObjName] =
                newState[fields[idx].name].value;
          });

          console.log("Form is valid now... Request Object", reqObj);
          // setRequestObj(reqObj);
        }
        // setIsFormValid(isValid);
      }, 0);

      return newState;
    });
  };

  const setError = (id, error) => {
    let newState;

    setFormState((prevState) => {
      newState = {
        ...prevState,
        [id]: {
          value: prevState[id].value,
          error,
        },
      };

      setTimeout(() => {
        // setIsFormValid(isFormValid(newState));
        console.log(isFormValid(newState));
      }, 0);

      return newState;
    });
  };

  return (
    <div>
      <h1>Json Based Form</h1>
      <p>JsonForm valid: {isFormValid(formState) ? "true" : "false"}</p>
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
              // value={formState[field.name]?.value}
              // error={formState[field.name]?.error}
              state={formState[field.name] || field}
            />
          ))}
        </form>
      )}
    </div>
  );
};

export default JsonForm;
