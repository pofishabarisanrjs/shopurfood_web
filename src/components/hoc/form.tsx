import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormConfig {
  title?: string;
  initialValues: Record<string, string>;
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: Record<string, string>) => void;
  fields: { name: string; label: string; type?: string }[];
}

const withForm = (config: FormConfig) => {
  return () => (
    <div style={{ maxWidth: "650px", margin: "auto", paddingTop: "20px" }}>
      {/* Title Bar */}
      {config.title && (
        <div
          style={{
            backgroundColor: "#E5E5E5",
            padding: "12px 20px",
            borderBottom: "1px solid #ddd",
            color: "#666",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {config.title}
        </div>
      )}

      {/* Form Container */}
      <div
        style={{
          padding: "30px",
          border: "1px solid #ddd",
          backgroundColor: "#fff",
        }}
      >
        <Formik
          initialValues={config.initialValues}
          validationSchema={config.validationSchema}
          onSubmit={config.onSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {config.fields.map(({ name, label, type = "text" }) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  {/* Label */}
                  <label
                    htmlFor={name}
                    style={{
                      width: "180px",
                      color: "#333",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "right",
                      marginRight: "15px",
                    }}
                  >
                    {label} <span style={{ color: "red" }}>*</span>
                  </label>

                  {/* Input Field */}
                  <div style={{ flex: 1 }}>
                    <Field
                      id={name}
                      name={name}
                      type={type}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px",
                        backgroundColor: "#fff",
                        height: "35px",
                      }}
                    />
                    <ErrorMessage name={name}>
                      {(msg) => (
                        <div
                          style={{
                            color: "red",
                            fontSize: "12px",
                            marginTop: "4px",
                          }}
                        >
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
              ))}

              {/* Submit Button */}
              <div style={{ textAlign: "left", marginLeft: "195px" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#ff5722",
                    color: "white",
                    padding: "8px 20px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default withForm;
