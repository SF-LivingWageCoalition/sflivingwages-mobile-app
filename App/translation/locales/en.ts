const en = {
  assistScreen: {
    title: `We can assist you.`,
    subTitle: "Complete the form below.",
    fullName: "Full Name",
    email: "E-mail",
    phone: "Phone",
    options: "Please select one or more option",
    assistList: {
      wageTheft: "Wage Theft",
      unpaidOvertime: "Unpaid Overtime",
      noBreaks: "No Breaks",
      discrimination: "Discrimination",
    },
    require: "Fields marked with an * are required",
    close: "Close",
    recaptcha: "Recaptcha",
    complete: "Please complete recaptcha before submit",
    review: "Please review your information before you submit",
    submit: "Submit",
    clear: "Clear",
    validation: {
      fullName: "Full name is required",
      userEmail: "Invalid email address",
      userPhone: "Phone number is required",
      userPhoneLength: "Phone number must be at least 10 digits",
      list: "Select at least one situation",
    },
  },
};

export default en;
export type Translations = typeof en;
