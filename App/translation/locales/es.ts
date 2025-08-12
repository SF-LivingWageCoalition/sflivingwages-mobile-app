import type { Translations } from "./en";

const es: Translations = {
  assistHomeScreen: {
    title: "Centro de Asistencia",
    subtitle:
      "Elija una opción a continuación para obtener ayuda o conocer sus derechos",
    getAssistance: "Denunciar una Infracción",
    wageRights: "Conozca Sus Derechos Salariales",
    beReadyForICE: "Esté Listo para ICE",
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
    validation: {
      fullName: "Se requiere nombre completo",
      userEmail: "Dirección de correo electrónico no válida",
      userPhone: "Se requiere número de teléfono",
      userPhoneLength: "El número de teléfono debe tener al menos 10 dígitos",
      list: "Seleccione al menos una situación",
    },
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
      title: "Ordenanza de Compensación Mínima",
      point1:
        "Las empresas con fines de lucro deben pagar al menos $20.96 por hora; las organizaciones sin fines de lucro deben pagar al menos $20.25 por hora; las entidades públicas (por ejemplo, IHSS) deben pagar al menos $22.00 por hora.",
      point2:
        "12 días pagados al año por enfermedad, vacaciones o necesidad personal; y 10 días no pagados por enfermedad o enfermedad de un familiar.",
      point3: "Esta lista cubre:",
      subPoint1:
        "un empleado que trabaja para un contratista o cualquier subcontratista que tenga más de cinco empleados y tenga contratos con la Ciudad y el Condado de San Francisco que sumen $25,000 o más",
      subPoint2:
        "participantes en un programa de Bienestar al Trabajo que requiere que un beneficiario de asistencia pública trabaje a cambio de su subsidio",
      subPoint3:
        "un empleado que trabaja 10 horas o más en un período de pago de dos semanas en cualquier arrendamiento o concesión en un aeropuerto que exceda los 29 días en un año o cualquier subarrendamiento o contrato de servicio con ese arrendamiento.",
      point4:
        "La ley entra en vigor cuando el contrato o arrendamiento se renueva o modifica.",
    },
    sickLeave: {
      title: "Ordenanza de Descanso por Enfermedad",
      point1:
        "Cubre a cualquier persona empleada dentro de la Ciudad, incluyendo trabajadores a tiempo parcial y temporales que trabajan 56 horas o más dentro de un año, y participantes en un programa de Bienestar al Trabajo que requiere que un beneficiario de asistencia pública trabaje a cambio de su subsidio",
      point2:
        "Comienza el primer día de la contratación, una hora de descanso por enfermedad se acumula por cada 30 horas trabajadas, hasta 40 horas en empresas con menos de 10 empleados y 72 horas para empresas con 10 empleados o más, y se lleva a cabo de año en año",
      point3:
        "El tiempo puede ser tomado de trabajo por enfermedad, lesión, condición médica, necesidad de diagnóstico o tratamiento médico, o cualquier otra razón médica de la persona o su pareja, compañero registrado, persona designada, hijo, padre, tutor legal o ward, hermano, abuelo, o nieto, sea biológico, adoptado, familiar, tutor legal o niño de una persona que está en loco parentis",
      point4:
        "Un empleador puede requerir una notificación razonable de una ausencia de trabajo o medidas razonables para verificar o documentar el uso de descanso por enfermedad",
    },
    healthCareSecurity: {
      title: "Ordenanza de Seguridad en Salud",
      point1:
        "Cubre a cualquier persona que trabaje en la Ciudad por 90 días o más en un año para un empleador, y trabaje al menos 8 horas por semana en la Ciudad (empleados gerenciales, supervisores y confidenciales que ganan más de $60.29 por hora son exentos)",
      point2:
        "Requiere que un empleador con 100 o más empleados debe hacer gastos en salud de al menos $3.85 por hora trabajada; un empleador con 20 o más empleados, o no lucrativos de 50 o más empleados, debe hacer gastos en salud de al menos $2.56 por hora, hasta 172 horas en un mes, para proporcionar servicios de salud por:",
      subPoint1: "a) contribuciones a una cuenta de ahorro de salud",
      subPoint2:
        "b) reembolsos a los empleados por gastos de servicios de salud",
      subPoint3:
        "c) pagos a un tercero por servicios de salud, como la adquisición de una cobertura de salud",
      subPoint4: "d) la entrega directa de servicios de salud",
      subPoint5:
        "e) pagos a la Ciudad para ser utilizados para financiar la membresía en un Programa de Acceso a la Salud, “Saludable San Francisco,” para residentes de la Ciudad o para establecer cuentas de reembolso para residentes y no residentes",
      point3:
        "El Programa de Acceso a la Salud proporciona servicios de salud a través del Hospital General de San Francisco, los clínicas y las agencias sin fines de lucro comunitarias de la Departamento de Salud Pública, y está abierto a residentes de la Ciudad de San Francisco no asegurados, sin importar el estado de empleo.",
      point4:
        "Un programa de salud de un empleador que requiere contribuciones por parte de un empleado no cumple con el gasto en salud requerido si el empleado declina participar.",
    },
    healthCareAccountability: {
      title: "Ordenanza de Responsabilidad en Salud",
      point1:
        "Requiere que un empleador proporcione uno de los siguientes no más tarde que el primero de mes que comienza 30 días desde el inicio del empleo:",
      subPoint1:
        "1) ofrecer beneficios de salud que cumplan con estándares mínimos",
      subPoint2:
        "2) pagar $6.75 por hora por empleado a la Ciudad hasta $270 por semana, en el aeropuerto $10.95 por hora hasta $438 por semana, o si el empleado no vive en San Francisco (y no trabaja en la propiedad de la Ciudad), pagar al empleado $6.75 por hora hasta $270 por semana",
      point2:
        "Cubre empleados de un contratista o subcontratista, un inquilino o subinquilino de la propiedad de la Ciudad o su contrato de servicio o subcontrato en una alquiler para el uso de la propiedad de la Ciudad por más de 29 días consecutivos, que cumulativamente tengan más de 20 empleados (más de 50 para no lucrativos) en todas las entidades que poseen o controlan, y el contrato es $25,000 o más ($50,000 o más para no lucrativos) o tener contratos cumulativos por $75,000 o más con la Ciudad y el Condado de San Francisco",
      point3:
        "Cubre empleados que trabajan en un contrato o propiedad de la Ciudad por 20 o más horas por semana, por 130 días o más por año",
    },
    protectionsForWorkers: {
      title: "Protecciones para Trabajadores Ordinance",
      point1:
        "Es ilegal que un empleador retenga, amenace o discrimine a un trabajador por afirmar sus derechos bajo estas leyes o informar a otros trabajadores de sus derechos. Si un empleador toma una acción adversa contra un empleado, se considera una presunción rebuttable que la acción fue en retribución.",
      point2:
        "Si un empleador se encuentra en violación de la ley, las sanciones incluyen:",
      subPoint1:
        "una orden judicial para la reubicación de cualquier trabajador despedido",
      subPoint2:
        "pagar con intereses y multas cualquier salario retroactivo, descanso por enfermedad o gastos de salud",
      subPoint3: "pagar una multa por cada día en violación",
      subPoint4: "terminar un contrato o alquiler",
      subPoint5:
        "ser barajado de contratar o alquilar con la Ciudad por tres años",
      subPoint6:
        "revocar o suspender certificados de registro, permisos o licencias",
      point3:
        "Un trabajador tiene derecho a denunciar una infracción al Oficina de Estándares Laborales que mantiene la identidad del trabajador confidencial.",
    },
  },
  beReadyForICEScreen: {
    title: "Esté Listo para ICE",
    makeAPlan: {
      title: "Hacer un Plan",
      point1:
        "Prepare un paquete que contenga información de emergencia importante. Para averiguar qué debe incluir en el paquete, vaya a la sección de recursos a continuación.",
      point2:
        "Tenga a alguien que confíe en él que mantenga su información de emergencia en un lugar seguro.",
      point3:
        "Designa a un adulto de confianza para cuidar de su hijo. Dale esa persona información sobre el horario del niño y la ubicación de las escuelas y otros lugares en los que puede estar.",
      point4:
        "Actualice toda la información de contacto y los formularios de autorización de escuela, guardería y actividades después de la escuela. Incluya los nombres de quién puede y quién no puede recoger a sus hijos.",
      point5:
        "Designa a alguien que traerá pruebas de sus vínculos con los Estados Unidos a la oficina de ICE.",
      point6:
        "Prepare un plan financiero para atender las facturas y los gastos si es necesario.",
      point7: "Hable con su familia sobre el plan.",
      point8:
        "Siempre lleve una tarjeta telefónica. ICE no proporciona llamadas gratuitas si está en detención.",
    },
    whoToCall: {
      title: "A quién llamar",
      point1: "La Raza Centro Legal – (415) 575-3500",
      point2:
        "Centro de Trabajo para la Justicia de Inmigrantes (WE RISE SF) – (415) 440-8798",
      point3: "Centro de Recursos Centroamericano – (415) 642-4400",
      point4:
        "San Francisco Legal Immigrant and Education Network- (415)282-6209 *115",
      point5: "Nombre del abogado y número de teléfono",
      point6: "Si necesita un abogado, llame al (415) 282-6209 ext.115",
      point7: "Nombre y número de teléfono de contacto de emergencia",
      point8: "Escuela / Guardería",
      point9: "Empleador / Supervisor",
      point10: "Amigo con documentos importantes",
      point11: "Consulado",
      point12: "Agencia de fianza",
    },
    ifICEArrives: {
      title: "Si ICE Llega",
      point1:
        "Pídeles que deslizen una orden de búsqueda por debajo de la puerta o a través de una ventana.",
      point2:
        "No abra la puerta a menos que la orden de búsqueda tenga su nombre y dirección correctos y un juez lo firmó hace 10 días o menos.",
      point3:
        "Si fuerza la entrada, anote los nombres y números de identificación. Dígales “No consento de que estén en mi casa”. Si comienzan a buscar, dígales “No consento de su búsqueda”.",
      point4:
        "Manténgase en silencio y no hable con un agente de ICE. No responda a ninguna pregunta, especialmente sobre su lugar de nacimiento, su estado de inmigración o cómo entró a los Estados Unidos.",
      point5:
        "No mienta, muestre documentos falsos, entregue documentos extranjeros o presente una licencia AB 60.",
      point6: "No firme nada sin un abogado.",
    },
    readyToRecord: {
      title: "Listo para Grabar",
      point1:
        "Si hay un saqueo en su hogar, haga un registro de lo que pasó para dar a su abogado. Esta es una lista de verificación de lo que debe registrar - http://www.immdefense.org/wp-content/uploads/2016/03/home-raid-poster-ENG-2017.pdf.",
      point2: "Si testifica un saqueo de ICE, llame al (415) 200-1548.",
      point3:
        "Conozca cómo usar el localizador de detenidos de ICE: https://locator.ice.gov. Esto enumera a las personas en detención, que son de 18 años o más.",
    },
    ifDetained: {
      title: "Si es detenido",
      point1: "Exige hacer una llamada telefónica y hablar con un abogado.",
      point2:
        "Exige hacer una llamada telefónica a su contacto de emergencia para organizar cuidadores para sus hijos.",
      point3:
        "Exige el derecho de ser informado de la cantidad de fianza y de llamar a una agencia de fianza.",
      point4:
        "ICE le asignará un número de registro extranjero o un número A. Anote el número y dígáselo a su contacto de emergencia, junto con el número del centro de detención. Pueden usarlo para rastrearle.",
      point5:
        "Póngase en contacto con la persona responsable de su familia y sus finanzas. Déjelo saber que está en detención.",
      point6:
        "Si es separado de sus hijos, pídale a su abogado que les dé un poder de abogado y un poder de guardianía. Si no puede pagar, pídale a su abogado que le ayude a obtener un poder de abogado y un poder de guardianía.",
      point7:
        "Dígale a su abogado que necesite ser liberado para cuidar de sus hijos, o si son tomados por los Servicios de Protección Infantil, que contacten su línea directa inmediatamente.",
    },

    resources: {
      title: "Recursos",
      point1:
        "Informed Immigrant: Preguntas Frecuentes. Lo Que Todos los Inmigrantes Deben Saber, https://www.informedimmigrant.com/es/faq/",
      point2:
        "Immigrant Legal Resource Center: Plan Familiar en Caso de Emergencia, https://www.ilrc.org/resources/step-step-family-preparedness-plan",
      point3:
        "Immigrant Legal Resource Center: Plan de Protección Familiar, https://www.ilrc.org/plan-de-proteccion-familiar",
      point4:
        "National Immigration Law Center: Derechos, Otras Aplicaciones de Inmigración, https://www.nilc.org/get-involved/community-education-resources/know-your-rights/othimmenf/",
    },
    emergencyFile: {
      title: "Archivo de Emergencia",
      point1: "Obtenga pasaportes para niños menores de 16 años",
      point2:
        "Puede solicitar un pasaporte para un niño sin que el padre o tutor esté presente. https://travel.state.gov/content/travel/en/passports/need-passport/under-16.htmlPuede solicitar un pasaporte para un niño sin que el padre o tutor esté presente. https://travel.state.gov/content/travel/en/passports/need-passport/under-16.html",
      point3:
        "Asegúrese de que alguien de confianza pueda obtener su información médica",
      point4:
        "Si tiene una condición de salud y alguien necesitará sus registros, debe firmar un formulario de autorización HIPAA: https://www.immigrantdefenseproject.org/wp-content/uploads/2016/11/4.-HIPAA_auth_English.pdf",
    },
  },
  whoWeAreHeader: {
    title: "Quienes Somos",
    body: "La Coalición por un Salario Digno es una organización de defensa de los trabajadores con bajos salarios que lucha por la justicia económica.",
    buttonText: "Ver Más"
  },
  whoWeAreScreen: {
    title: "Quienes Somos",
    body: "La Coalición por un Salario Digno es un movimiento de base de trabajadores con bajos salarios y sus aliados que luchan por la justicia económica. Creemos que toda persona que trabaja a tiempo completo debería poder sobrevivir con sus ingresos y mantener a su familia.\n\nLa Coalición por un Salario Digno fue fundada en 1998 por sindicatos, congregaciones religiosas y organizaciones comunitarias para desarrollar un movimiento liderado y gestionado democráticamente por trabajadores con bajos salarios. Los miembros fundadores del comité directivo fueron el Consejo Laboral de San Francisco, el sindicato SEIU Local 790 (ahora Local 1021), el sindicato SEIU Local 250 (ahora Local 2015 y United Health Care Workers West), el sindicato UNITE HERE Local 2, el sindicato OPEIU Local 3 (ahora Local 29), el Comité Organizador del Área de la Bahía, San Francisconos por la Justicia Fiscal, Personas Organizadas para Ganar Derechos Laborales, la Coalición para la Reforma Ética del Bienestar y la Coalición del Norte de California por los Derechos de los Inmigrantes y Refugiados.\n\nComo resultado de una campaña de base, las leyes de salario digno de San Francisco —llamadas Ordenanza de Compensación Mínima, aprobada en 2001, y Ordenanza de Responsabilidad de Atención Médica, aprobada en 2002— exigen que nuestros dólares de impuestos y el uso de propiedad pública no se destinen a empresas que pagan salarios de pobreza.\n\nComo resultado de una campaña de base, las leyes de salario digno de San Francisco —llamadas Ordenanza de Compensación Mínima, aprobada en 2001, y Ordenanza de Responsabilidad de Atención Médica, aprobada en 2002— exigen que nuestros dólares de impuestos y el uso de propiedad pública no se destinen a empresas que pagan salarios de pobreza.\n\nEn 2008, la Coalición por un Salario Digno realizó una campaña exitosa para ampliar la Ordenanza de Compensación Mínima a fin de incluir a los participantes en programas de transición de asistencia social al trabajo y a los adultos solteros en los programas de trabajo del condado.\n\nEn 2014, los votantes de San Francisco aprobaron enmiendas a la Ordenanza del Salario Mínimo para un aumento escalonado hasta los $15 por hora en 2018, con ajustes anuales posteriores por costo de vida. Es uno de los salarios mínimos más altos del país.\n\nEn 2018, la Coalición por un Salario Digno hizo campaña con éxito a favor de enmiendas para aumentar la Ordenanza de Compensación Mínima a $1,50 por hora por encima del salario mínimo para los trabajadores de atención médica domiciliaria de servicios de apoyo en el hogar, los trabajadores sin fines de lucro financiados por la ciudad y los participantes en programas de transición de la asistencia social al trabajo como CalWORKs para padres, y $2 por hora por encima del salario mínimo para los trabajadores del aeropuerto y los trabajadores de contratistas de servicios de la ciudad con fines de lucro, con ajustes anuales del costo de vida cada 1 de julio.",
    committeeTitle: "Comité Coordinador",
    committeeMembers: [
      {
        id: 1,
        name: "Karl Kramer",
        title: "Codirector de Campaña"
      },
      {
        id: 2,
        name: "David Frias",
        title: "Codirector de Campaña"
      },
      {
        id: 3,
        name: "Anne Jayne",
        title: "Secretario de Actas"
      },
      {
        id: 4,
        name: "Peter Miller",
        title: "Tesorero"
      },
      {
        id: 5,
        name: "Alice Rogoff",
        title: "Miembro"
      },
      {
        id: 6,
        name: "David Williams",
        title: "Miembro"
      },
      {
        id: 7,
        name: "Nancy Esteva",
        title: "Miembro"
      },
      {
        id: 8,
        name: "Peter Miller",
        title: "Miembro"
      },
      {
        id: 9,
        name: "Rodger Scott",
        title: "Miembro"
      }
    ]
  },
  eventsScreen: {
    title: "Eventos"
  }
};

export default es;
