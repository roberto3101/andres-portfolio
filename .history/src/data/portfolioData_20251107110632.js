export const personalInfo = {
  name: "Andres Alvaro Sanchez Trujillo",
  title: "Desarrollador Full Stack Junior",
  subtitle: "Estudiante de Computación e Informática - 5to Ciclo",
  email: "andresalvaro.st@gmail.com",
  phone: "+51 924087168",
  location: "San Martin de Porres, Lima, Perú",
  age: 26,
  linkedin: "https://www.linkedin.com/in/andres-sanchez-trujillo-62412b238",
  github: "https://github.com/AndresSanchezT",
  description: "Soy estudiante del 5to ciclo de la carrera de Computación e Informática con fuertes habilidades en análisis, resolución de problemas, comunicación asertiva y documentación. Me adapto rápidamente a nuevos entornos y cambios, y tengo un profundo interés en el desarrollo y la ingeniería de software. Mi motivación principal es aprender, colaborar en proyectos de gran impacto y destacar en cada función para convertirme en un profesional altamente capacitado."
};

export const education = [
  {
    institution: "Cibertec",
    degree: "Computación e Informática",
    location: "Perú - Independencia",
    period: "2023 - Presente",
    status: "5to Ciclo"
  },
  {
    institution: "Escuela de Empresarios ZEGEL IPAE",
    degree: "Administración de Empresas",
    location: "Perú",
    period: "Sep 2021 - Ene 2022",
    status: "Incompleta"
  },
  {
    institution: "I.E Christian Barnard",
    degree: "Educación Secundaria",
    location: "Perú",
    period: "2014 - 2015",
    status: "Completa"
  }
];

export const skills = {
  backend: ["Java", "Spring Boot", "Docker", "Kubernetes", "ASP.NET"],
  frontend: ["Angular 21", "CSS", "JavaScript", "Bootstrap"],
  database: ["MySQL", "SQL Server", "MongoDB", "ADO.NET"],
  methodologies: ["RUP", "AUP", "UML", "Clean Code"],
  tools: ["GIT", "GITHUB"]
};

export const projects = [
  {
    id: 1,
    title: "Sistema Web de Reservas de Hoteles",
    description: "Sistema web de reservas con arquitectura MVC, permitiendo registrar y gestionar hoteles, clientes, departamentos, habitaciones y reservas.",
    technologies: ["Spring Boot", "JPA/Hibernate", "MySQL", "Bootstrap", "AJAX"],
    features: [
      "Arquitectura MVC",
      "Sistema de ingreso y autorización por roles (administrador, recepcionista, cliente)",
      "Control de sesiones y restricción de vistas/endpoints",
      "Base de datos relacional con procedimientos almacenados",
      "Relaciones @OneToMany, @ManyToOne y @ManyToMany",
      "CRUDs, consultas y reportes",
      "Disponibilidad de habitaciones",
      "Listado de hoteles por departamento"
    ]
  },
  {
    id: 2,
    title: "Sistema Web de Venta de Ropa",
    description: "Aplicación web de venta de ropa con carrito de compras, control de stock, gestión de clientes y proceso de pago con emisión de boletas.",
    technologies: ["Java", "Servlets", "JSP/JSTL", "MySQL"],
    features: [
      "Carrito de compras",
      "Control de stock",
      "Sistema de ingreso por roles (administrador, cliente)",
      "Autorización por permisos para CRUDs",
      "Gestión de stock",
      "Visualización de ventas",
      "Sesiones y filtros para autenticación/autorización",
      "Vistas dinámicas con JSP",
      "Cálculos automáticos del carrito",
      "Verificación de stock en tiempo de compra"
    ]
  },
  {
    id: 3,
    title: "Sistema Web de Venta de Productos Tecnológicos",
    description: "Sistema con arquitectura en 4 capas (Presentación, Negocio, Datos, Entidades).",
    technologies: ["ASP.NET", "ADO.NET", "SQL Server"],
    features: [
      "Arquitectura en 4 capas",
      "Dashboard para administradores",
      "Vista Tienda para clientes",
      "Login y carrito de compras",
      "CRUDs de productos, usuarios y ventas",
      "Acceso a datos mediante ADO.NET",
      "Validación de stock",
      "Cálculo automático de precios",
      "Actualización dinámica de boleta de pago"
    ]
  }
];

export const softSkills = [
  {
    title: "Liderazgo",
    description: "Capacidad de guiar y motivar equipos hacia el cumplimiento de objetivos."
  },
  {
    title: "Compromiso",
    description: "Alto sentido de responsabilidad y dedicación en cada proyecto."
  },
  {
    title: "Trabajo en equipo",
    description: "Disfruto colaborar, compartir conocimientos y aportar al éxito colectivo."
  },
  {
    title: "Comunicación efectiva",
    description: "Expresar ideas técnicas y no técnicas de manera clara y comprensible."
  },
  {
    title: "Resolución de problemas",
    description: "Enfoque analítico y creativo para superar desafíos."
  }
];

export const interests = ["Música", "Fútbol"];