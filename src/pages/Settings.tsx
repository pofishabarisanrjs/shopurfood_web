import React from "react";
import * as Yup from "yup";
import withForm from "../components/hoc/form";

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Please Enter Current Password"),
  newPassword: Yup.string().required("Please Enter New Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please Enter Confirm Password"),
});

const ChangePasswordForm = withForm({
  title: "Change Password",
  initialValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  validationSchema,
  onSubmit: (values) => console.log("Form Submitted:", values),
  fields: [
    { name: "currentPassword", label: "Current Password", type: "password" },
    { name: "newPassword", label: "New Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
  ],
});

export default ChangePasswordForm;
