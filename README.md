# EmployeeApp - Frontend

## 📌 Descripción  
Este proyecto es el frontend de **EmployeeApp**, una aplicación para la gestión de empleados.  
Está desarrollado con **React y Vite**, siguiendo buenas prácticas de desarrollo, manteniendo una estructura modular y reutilizable.  

## 🚀 Tecnologías utilizadas  

### Frontend  
El frontend está desarrollado con **React** y **Vite**, manteniendo una estructura organizada y modular. Se priorizó el uso mínimo de librerías externas para optimizar el rendimiento.  

- **React 18** - Librería para la construcción de interfaces de usuario basada en componentes reutilizables.  
- **Vite** - Herramienta de desarrollo rápida y eficiente para React.  
- **TypeScript** - Tipado estático para mejorar la mantenibilidad y escalabilidad del código.  
- **React Context** - Manejo centralizado del estado global de la aplicación sin necesidad de librerías externas como Redux.  
- **Axios** - Cliente HTTP para el consumo de APIs.  

## 📂 Estructura del Proyecto  
El repositorio sigue una estructura organizada:  
```
/employeeapp-frontend
│── /public         # Recursos estáticos 
│── /src            # Código fuente principal
│   ├── /assets     # Archivos de estilos e imágenes
│   ├── /hooks # Custom Hooks reutilizables 
│   ├── /components # Componentes reutilizables
│   ├── /context    # Implementación de React Context
│   ├── /models     # Definición de tipos y modelos de datos
│   ├── /pages      # Páginas principales
│   ├── /services   # Servicios para consumir API
│   ├── /utils      # Funciones auxiliares
│   ├── App.tsx     # Componente principal
│   ├── main.tsx    # Punto de entrada de la aplicación
│── .env            # Variables de entorno
│── .gitignore      # Archivos ignorados por Git
│── eslint.config.js # Configuración de ESLint
│── tsconfig.json   # Configuración de TypeScript
│── router.tsx      # Configuración de rutas con React Router 
```

## 📥 Instalación y Ejecución  

### 🔧 Requisitos previos  
- **Node.js 16+**  
- **Vite** instalado globalmente 

### 📌 Clonar el repositorio  
```sh
  git clone [https://github.com/tu-repositorio.git](https://github.com/AndrewBabativa/EmployeeManager.git)
```

### ⚙️ Configurar variables de entorno  
Crear un archivo `.env` en la raíz del frontend con la siguiente información:  
```env
VITE_API_URL=http://localhost:3000
```

### 📦 Instalación de dependencias  
```sh
npm install
```

### ▶️ Ejecutar el frontend  
```sh
npm run dev
```

## 🌐 Funcionalidades Implementadas  
- Inicio de sesión y autenticación con JWT.  
- Listado de empleados con paginación.  
- Creación, edición y eliminación de empleados.  
- Consumo de API externa para obtener posiciones de trabajo.  
- Manejo centralizado del estado con React Context.  

## 🛠 Buenas Prácticas Aplicadas  
- Uso de **React Context** para la gestión de estado.  
- Servicios individuales para cada acción, siguiendo **principios de OOP**.    
- Código modular y reutilizable para facilitar mantenimiento.  

## 📸 Capturas de Pantalla  
A continuación, se presentan capturas de pantalla del flujo de la aplicación:  

*Pantalla de inicio de sesión*  
![image](https://github.com/user-attachments/assets/a29acbe9-44a3-45c5-b0ed-71867a98c87e)

*Pantalla de registro de usuario*  
![image](https://github.com/user-attachments/assets/a76c0b7b-d04c-4938-8437-0d40852709b8)
*Registro creado en Mongo*
![image](https://github.com/user-attachments/assets/a529c7a9-22f5-4fa6-bf85-6b3b8f2b4cb0)

*Despues del registro exitoso se redirige a inicio de sesiòn donde si es exitoso debe generar un token en el localstorage para autenticación*  
![image](https://github.com/user-attachments/assets/a647f02e-2190-416e-a7ec-694dd952f2a3)
![image](https://github.com/user-attachments/assets/400f544b-a7c7-4cd0-a1ac-be8c0322c32a)
![image](https://github.com/user-attachments/assets/e1a0c234-64e6-44bd-bc13-b294191c6609)

*Listado de empleados*  
- Para crear nuevos empleados se utiliza el formulario en la parte superior del grid
- Para la edición de un nuevo empleado directamente en la grilla se actuliza en tiempo real en base a lo que se vaya modificando
- Para eliminar un empleado se debe dar clic en el botón eliminar enfrente de cada registro
- Al momento de cerar sesión se borra el token del localstorage y se redirige al inicio de sesión
![image](https://github.com/user-attachments/assets/9d224472-6573-4bec-8061-aac735f39edc)

