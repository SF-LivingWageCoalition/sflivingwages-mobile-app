import { Translations } from "./en";

const es: Translations = {
  assistHomeScreen: {
    title: "Centro de Asistencia",
    subtitle:
      "Elija una opción a continuación para obtener ayuda o conocer sus derechos",
    getAssistance: "Denunciar una Infracción",
    wageRights: "Conozca Sus Derechos Salariales",
  },
  assistScreen: {
    title: `Podemos ayudarte.`,
    subTitle: "Completa el formulario a continuación.",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    phone: "Teléfono",
    options: "Seleccione una o más opciones",
    assistList: {
      wageTheft: "Robo de salario",
      unpaidOvertime: "Horas extras no pagadas",
      noBreaks: "Sin descansos",
      discrimination: "Discriminación",
    },
    require: "Los campos marcados con un * son obligatorios",
    close: "Cerrar",
    recaptcha: "Recaptcha",
    complete: "Por favor completa el recaptcha antes de enviar",
    review: "Por favor revisa tu información antes de enviar",
    submit: "Enviar",
    clear: "Limpiar",
  },
  wageRightsScreen: {
    title: "Conozca Sus Derechos Salariales",
    minimumWage: {
      title: "Salario Mínimo",
      point1:
        "El salario mínimo federal es de $7.25 por hora a partir de 2023.",
      point2:
        "El salario mínimo de San Francisco es de $16.99 por hora a partir del 1 de julio de 2023.",
    },
    minimumCompensation: {
      title: "Pago de Horas Extras",
      point1: "Requires $19.18 per hour as of July 1, 2025",
      point2:
        "Covers any employee who works at least two hours in a week for an employer within the boundaries of San Francisco",
    },
  },
};

export default es;
