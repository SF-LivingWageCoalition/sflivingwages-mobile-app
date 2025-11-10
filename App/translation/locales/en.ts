import { ok } from "assert";
import simpleJwt from "./simpleJwt.en";
import wooCommerce from "./wooCommerce.en";

const en = {
  assistHomeScreen: {
    title: "Assistance Center",
    subtitle: "Choose an option below to get help or learn about your rights",
    getAssistance: "Report Violation",
    wageRights: "Know Your Wage Rights",
    beReadyForICE: "Be Ready for ICE",
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
    validation: {
      fullName: "Full name is required",
      userEmail: "Invalid email address",
      userPhone: "Phone number is required",
      userPhoneLength: "Phone number must be at least 10 digits",
      list: "Select at least one situation",
    },
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
  beReadyForICEScreen: {
    title: "Be Ready for ICE",
    makeAPlan: {
      title: "Make a Plan",
      point1:
        "Prepare a packet that contains important, emergency information. To find out what you need to include in the packet, go to resources section below.",
      point2:
        "Have someone you trust keep your emergency information in a safe place.",
      point3:
        "Designate a trusted adult to take care of your child. Give that person information on child’s schedule and location of schools and other places they might be.",
      point4:
        "Update all school, childcare, and after school contact information and release forms. Include the names of who may and may not pick up your children.",
      point5:
        "Designate someone who will bring evidence of your ties to the United States to the ICE office.",
      point6:
        "Prepare a financial plan to take care of bills and expenses if necessary.",
      point7: "Talk with your family about the plan.",
      point8:
        "Always carry a phone card. ICE does not provide free calls if you are in detention.",
    },
    whoToCall: {
      title: "Who to Call",
      point1: "La Raza Centro Legal – (415) 575-3500",
      point2:
        "Labor Center for Immigrant Justice (WE RISE SF) – (415) 440-8798",
      point3: "Central American Resource Center – (415) 642-4400",
      point4:
        "San Francisco Legal Immigrant and Education Network- (415)282-6209 *115",
      point5: "Attorney Name & Phone Number",
      point6: "If you need a lawyer, call (415) 282-6209 ext.115",
      point7: "Your Emergency Contact Name & Phone Number",
      point8: "School/Child Care",
      point9: "Employer/Supervisor",
      point10: "Friend with Important Documents",
      point11: "Consulate",
      point12: "Bail Bond Agency",
    },
    ifICEArrives: {
      title: "If ICE Arrives",
      point1:
        "Ask them to slide a search warrant under the door or through a window.",
      point2:
        "Do not open the door unless the warrant has your correct name and address and a judge signed it in the past 10 days.",
      point3:
        "If they force entry, write down names and badge numbers. Tell them “I do not consent to you being in my home.” If they start to search, tell them “I do not consent to your search.”",
      point4:
        "Remain silent and do not talk to an ICE agent. Do not answer any questions, especially about your birthplace, immigration status, or how you entered the United States.",
      point5:
        "Do not lie, show false documents, hand over foreign documents or present an AB 60 license.",
      point6: "Do not sign anything without a lawyer.",
    },
    readyToRecord: {
      title: "Ready to Record",
      point1:
        "If there’s a raid at your home, make a record of what happened to give to your attorney. This is a checklist for what you should record – http://www.immdefense.org/wp-content/uploads/2016/03/home-raid-poster-ENG-2017.pdf.",
      point2: "If you witness an ICE raid, call (415) 200-1548.",
      point3:
        "Know how to use the ICE detainee locator: https://locator.ice.gov. This lists people in detention, who are 18 years or older.",
    },
    ifDetained: {
      title: "If Detained",
      point1: "Demand to make a phone call and speak to a lawyer.",
      point2:
        "Demand to make a phone call to your emergency contact to arrange for caretakers for your children.",
      point3:
        "Demand the right to be told the amount of bail and to call a bail bond agency.",
      point4:
        "ICE will assign you an alien registration number or A number. Write the number down and give it to your emergency contact along with the number of the detention center. They can use it to keep track of you.",
      point5:
        "Contact the person who is responsible for your family and your finances. Let them know that you are in detention.",
      point6:
        "Tell your assigned deportation officer that you need to be released to care for your children, or if they are taken to Child Protective Services, to contact their hotline right away.",
      point7:
        "Have the person who will care for your children pick them up from school or day care, or if picked up by Child Protective Services, to get them within 48 hours. Make sure the caregiver has the signed power of attorney and guardianship paperwork that you completed.",
    },
    resources: {
      title: "Resources",
      point1:
        "Informed Immigrant: Preguntas Frecuentes. Lo Que Todos los Immigrantes Deben Saber, https://www.informedimmigrant.com/es/faq/",
      point2:
        "Immigrant Legal Resource Center: Plan Familiar en Caso de Emergencia, https://www.ilrc.org/resources/step-step-family-preparedness-plan",
      point3:
        "Immigrant Legal Resource Center: Plan de Proteccion Familiar, https://www.ilrc.org/plan-de-proteccion-familiar",
      point4:
        "National Immigration Law Center: Rights, Other Immigration Enforcement, https://www.nilc.org/get-involved/community-education-resources/know-your-rights/othimmenf/",
    },
    emergencyFile: {
      title: "Emergency File",
      point1: "Obtain passports for children under 16",
      point2:
        "You can apply for a passport for a child without parent or guardian present. https://travel.state.gov/content/travel/en/passports/need-passport/under-16.htmlYou can apply for a passport for a child without parent or guardian present. https://travel.state.gov/content/travel/en/passports/need-passport/under-16.html",
      point3: "Make sure someone you trust can get your medical information",
      point4:
        "If you have a health condition and someone will need your records, you should sign a HIPAA release form: https://www.immigrantdefenseproject.org/wp-content/uploads/2016/11/4.-HIPAA_auth_English.pdf",
    },
  },
  whoWeAreHeader: {
    title: "Who We Are",
    body: "The Living Wage Coalition is a low-wage worker advocacy organization fighting for economic justice.",
    buttonText: "View More",
  },
  whoWeAreScreen: {
    title: "Who We Are",
    body: "The Living Wage Coalition is a grassroots movement of low-wage workers and their allies fighting for economic justice.  We believe that everyone who works full time should be able to survive on what they earn and support their families.\n\nThe Living Wage Coalition was initiated in 1998 by labor unions, religious congregations and community organizations to develop a movement led and democratically run by low-wage workers. The founding members of the steering committee were the San Francisco Labor Council, SEIU Local 790 (now Local 1021), SEIU Local 250 (now Local 2015 and United Health Care Workers West), UNITE HERE Local 2, OPEIU Local 3 (now Local 29), Bay Area Organizing Committee, San Franciscans for Tax Justice, People Organized to Win Employment Rights, Coalition for Ethical Welfare Reform and Northern California Coalition Immigrant and Refugee Rights.\n\nAs a result of a grass-roots campaign, San Francisco's Living Wage laws — called the Minimum Compensation Ordinance, passed in 2001, and the Health Care Accountability Ordinance, passed in 2002 — require that our tax dollars and use of public property do not go to businesses that pay poverty wages.\n\nAs a result of a grass-roots campaign, San Francisco's Living Wage laws — called the Minimum Compensation Ordinance, passed in 2001, and the Health Care Accountability Ordinance, passed in 2002 — require that our tax dollars and use of public property do not go to businesses that pay poverty wages.\n\nIn 2008, the Living Wage Coalition successfully campaigned to expand the Minimum Compensation Ordinance to include participants in welfare-to-work programs and single adults in county workfare programs.\n\nIn 2014, San Francisco voters passed amendments to the Minimum Wage Ordinance for stepped increases to $15 per hour in 2018, with annual cost-of-living adjustments afterwards. It is one of the highest minimum wages in the country.\n\nIn 2018, the Living Wage Coalition successfully campaigned for amendments to increase the Minimum Compensation Ordinance to $1.50 per hour above the minimum wage for In-Home-Supportive-Services home health care workers, city-funded non-profit workers, and participants in welfare-to-work programs such as CalWORKs parents and $2 per hour above the minimum wage for airport workers and workers at for-profit city service contractors, with annual cost-of-living adjustments every July 1.",
    committeeTitle: "Coordinating Committee",
    committeeMembers: [
      {
        id: 1,
        name: "Karl Kramer",
        title: "Campaign Co-director",
      },
      {
        id: 2,
        name: "David Frias",
        title: "Campaign Co-director",
      },
      {
        id: 3,
        name: "Julia Toscano",
        title: "Campaign Co-director",
      },
      {
        id: 4,
        name: "Anne Jayne",
        title: "Recording Secretary",
      },
      {
        id: 5,
        name: "Peter Miller",
        title: "Treasurer",
      },
      {
        id: 6,
        name: "Alice Rogoff",
        title: "Member",
      },
      {
        id: 7,
        name: "David Williams",
        title: "Member",
      },
      {
        id: 8,
        name: "Nancy Esteva",
        title: "Member",
      },
      {
        id: 9,
        name: "Peter Miller",
        title: "Member",
      },
      {
        id: 10,
        name: "Rodger Scott",
        title: "Member",
      },
    ],
  },
  donateScreen: {
    title: "Donate",
  },
  eventsScreen: {
    title: "Events",
  },
  eventsDetails: {
    title: "Event Details",
  },
  accountScreen: {
    title: "Account",
    isLoggedIn: "Welcome, you are logged in!",
    isLoggedOut: "You are not logged in.",
    profile: "Profile",
    logoutAlert: {
      title: "Logout",
      message: "Are you sure you want to logout?",
    },
  },
  loginScreen: {
    title: "Login",
  },
  registerScreen: {
    title: "Register",
    registerAlert: {
      title: "Registration successful",
      message: "You may now log in.",
    },
  },
  forgotPasswordScreen: {
    title: "Forgot Password",
    forgotPasswordAlert: {
      title: "Password reset email sent",
      message: "Please check your email to complete your password reset.",
    },
  },
  inputs: {
    emailAddress: "Email Address",
    password: "Password",
  },
  buttons: {
    submit: "Submit",
    clear: "Clear",
    login: "Login",
    register: "Register",
    forgotPassword: "Forgot Password",
    logout: "Logout",
    cancel: "Cancel",
    ok: "OK",
  },
  validation: {
    emailRequired: "Email is required",
    emailInvalid: "Invalid email address",
    passwordRequired: "Password is required",
    passwordTooShort: "Password must be at least 8 characters",
    passwordLowercase: "Password must contain a lowercase letter",
    passwordUppercase: "Password must contain an uppercase letter",
    passwordNumber: "Password must contain a number",
    passwordSpecial: "Password must contain a special character",
    passwordInvalidChars: "Password contains invalid characters",
    passwordNoSpaces: "Password must not contain spaces",
  },
  errors: {
    networkError: "Network error. Please try again later.",
    serverError: "Server error. Please try again later.",
    unexpectedError: "An unknown error occurred. Please try again.",
    loginFailed: "Login failed. Please check your credentials.",
    passwordResetFailed: "Password reset failed. Please try again later.",
    registrationFailed: "Registration failed. Please try again.",
    requestTimedOut:
      "The request timed out. Please check your connection and try again.",
    // Simple JWT Login plugin error code messages (split into a separate file)
    simpleJwt: simpleJwt,
    // WooCommerce REST API string error codes
    woocommerce: wooCommerce,
  },
};

export default en;
export type Translations = typeof en;
