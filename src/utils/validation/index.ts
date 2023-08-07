import * as yup from "yup";

const commonMessage = "This field is required !";
const emailRequiredError = "Email id is required !";
const emailError = "Enter a valid email address !";
const addNameError = "Enter a valid name !";
const ageError = "Enter only numbers !";

const nameExp = /^[A-Za-z]( ?[A-Za-z] ?)*$/;
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const nameValidation = yup
  .string()
  .required(commonMessage)
  .matches(nameExp, addNameError);

const emailValidation = yup
  .string()
  .required(emailRequiredError)
  .matches(emailRegExp, emailError);

export const addEditEmployeeSchema = yup.object().shape({
  // id: yup.string(),
  employeeName: nameValidation,
  email: emailValidation,
  age: yup
    .number()
    .required(commonMessage)
    .typeError(ageError)
    .positive()
    .integer()
    .min(18, "Min age is 18")
    .max(60, "Max age is 60"),
  city: yup.string().required(commonMessage),
});
