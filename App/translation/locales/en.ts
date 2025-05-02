const en = {
  assistHomeScreen: {
    title: "Assistance Center",
    subtitle: "Choose an option below to get help or learn about your rights",
    getAssistance: "Get Assistance",
    wageRights: "Know Your Wage Rights",
  },
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
  },
  wageRightsScreen: {
    title: "Know Your Wage Rights",
    minimumWage: {
      title: "Minimum Wage",
      content:
        "Workers are entitled to the federal minimum wage of $7.25 per hour. Many states and cities have higher minimum wages.",
    },
    overtime: {
      title: "Overtime Pay",
      content:
        "Most workers are entitled to overtime pay of 1.5 times their regular rate for hours worked over 40 in a workweek.",
    },
    breaks: {
      title: "Rest Breaks",
      content:
        "Many states require employers to provide rest breaks and meal periods for employees.",
    },
  },
};

export default en;
export type Translations = typeof en;
