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
      point1:
        "For-profit businesses are required to pay at least $20.96 per hour; non-profit organizations are required to pay at least $20.25 per hour; public entities (i.e. IHSS) are required to pay at least $22.00 per hour",
      point2:
        "12 paid days off per year for sick leave, vacation or personal necessity; and 10 unpaid days off for sick leave or illness of family member",
      point3: "This list covers:",
      subPoint1:
        "an employee who works for a contractor or any subcontractor that has more than five employees and has contracts with the City and County of San Francisco that are cumulatively $25,000 or more",
      subPoint2:
        "participants in a Welfare-to-Work program that requires a public assistance recipient to work in exchange for their grant",
      subPoint3:
        "an employee who works 10 hours or more in a two-week pay period on any lease or concession at an airport exceeding 29 days in a year or any sublease or service contract with that lease",
      point4:
        "The law takes effect when the contract or lease is renewed or modified",
    },
    sickLeave: {
      title: "Sick Leave Ordinance",
      point1:
        "Covers anyone employed within the City, including part-time and temporary workers who work 56 hours or more within a year, and participants in a Welfare-to-Work program that requires a public assistance recipient to work in exchange for their grant",
      point2:
        "Beginning on the first day of employment, one hour of sick leave accrues for every 30 hours worked, up to 40 hours at businesses with less than 10 employees and 72 hours for businesses with 10 employees or more, and carries over from year to year",
      point3:
        "Time may be taken off work for illness, injury, medical condition, need for medical diagnosis or treatment, or other medical reason of the employee or their spouse, registered domestic partner or designated person, child, parent, legal guardian or ward, sibling, grandparent, or grandchild, whether biological, adopted, step-related, foster care, or a child of a domestic partner or child of a person standing in loco parentis",
      point4:
        "An employer may require reasonable notification of an absence from work or reasonable measures to verify or document the use of sick leave",
    },
    healthCareSecurity: {
      title: "Health Care Security Ordinance",
      point1:
        "Covers anyone who works in the City for 90 days or more in a year for an employer, and works at least 8 hours per week in the City (managerial, supervisory and confidential employees who earn more than $60.29 per hour are exempt)",
      point2:
        "Requires that an employer with 100 or more employees must make health care expenditures of at least $3.85 per hour worked; an employer with 20 or more employees, or nonprofits of 50 or more employees, must make health care expenditures of at least $2.56 per hour, up to 172 hours in a month, for providing health services by:",
      subPoint1: "a) contributions to a health savings account",
      subPoint2:
        "b) reimbursement to employees for expenses of health care services",
      subPoint3:
        "c) payments to a third party for providing health care services, such as purchasing health insurance coverage",
      subPoint4: "d) the direct delivery of health care services",
      subPoint5:
        "e) payments to the City to be used to fund membership in a Health Access Program, “Healthy San Francisco,” for San Francisco residents or to establish reimbursement accounts for both residents and non-residents",
      point3:
        "The Health Access Program provides health care through SF General Hospital, the Department of Public Health’s clinics and community nonprofit agencies, and is open to uninsured San Francisco residents, regardless of employment status.",
      point4:
        "an employer’s health care program that requires contributions by an employee does not meet the required health care expenditure if the employee declines to participate.",
    },
    healthCareAccountability: {
      title: "Health Care Accountability Ordinance",
      point1:
        "Requires that an employer provide one of the following no later than the first of the month which begins 30 days from the start of employment:",
      subPoint1: "1) offer health benefits that meet minimum standards",
      subPoint2:
        "2) pay $6.75 per hour per employee to the City up to $270 per week, at the airport $10.95 per hour up to $438 per week, or if the employee does not live in San Francisco (and does not work on City property), pay the employee $6.75 per hour up to $270 per week",
      point2:
        "Covers employees of a contractor or subcontractor, a City property tenant or subtenant or their service contract or subcontract on a lease for use of City property for more than 29 consecutive days, that cumulatively have more than 20 employees (more than 50 for non-profits) in all the entities that they own or control, and the contract is $25,000 or more ($50,000 or more for non-profits) or have cumulative contracts for $75,000 or more with the City and County of San Francisco",
      point3:
        "Covers employees who work on a City contract or property for 20 or more hours per week, for 130 days or more per year",
    },
    protectionsForWorkers: {
      title: "Protections for Workers Ordinance",
      point1:
        "It is against the law for an employer to retaliate, threaten or discriminate against a worker for asserting their rights under these laws or informing other workers of their rights. If an employer takes adverse action against an employee, it is considered a rebuttable presumption that the action was in retaliation.",
      point2:
        "If an employer is found to be in violation of the law, penalties include:",
      subPoint1: "a court order for reinstatement of any fired worker",
      subPoint2:
        "paying with interest and penalties any back wages, sick leave or health care expenditures",
      subPoint3: "paying a fine for each day in violation",
      subPoint4: "terminating a contract or lease",
      subPoint5:
        "being barred from entering into contracts or leases with the City for three years",
      subPoint6:
        "revoking or suspending registration certificates, permits or licenses",
      point3:
        "A worker has the right to report a violation to the Office of Labor Standards Enforcement which keeps the worker’s identity confidential.",
    },
  },
};

export default en;
export type Translations = typeof en;
