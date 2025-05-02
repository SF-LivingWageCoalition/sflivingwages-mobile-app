const en = {
  assistHomeScreen: {
    title: "Assistance Center",
    subtitle: "Choose an option below to get help or learn about your rights",
    getAssistance: "Report Violation",
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
      title: "Minimum Wage Ordinance",
      point1: "Requires $19.18 per hour as of July 1, 2025",
      point2:
        "Covers any employee who works at least two hours in a week for an employer within the boundaries of San Francisco",
    },
    minimumCompensation: {
      title: "Minimum Compensation Ordinance",
      point1: "Requires $19.18 per hour as of July 1, 2025",
      point2:
        "Covers any employee who works at least two hours in a week for an employer within the boundaries of San Francisco",
    },
  },
};

export default en;
export type Translations = typeof en;
