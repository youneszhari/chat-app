Here’s a comprehensive **`README.md`** guide for your project. It includes instructions for setting up and running the **Laravel backend**, **Spring Boot backend**, **Middleware**, and **React frontend**. You can copy and paste this into a `README.md` file in your project repository.

---

# **Chat Application**

A full-stack chat application built with **Laravel (PHP)**, **Spring Boot (Java)**, **Middleware (Java)**, and **React.js (TypeScript)**. The app allows users to register, log in, send messages, and view conversations in real-time.

---

## **Table of Contents**
1. [Features](#features)
2. [Technologies](#technologies)
3. [Project Structure](#project-structure)
4. [Setup and Installation](#setup-and-installation)
   - [Laravel Backend](#laravel-backend)
   - [Spring Boot Backend](#spring-boot-backend)
   - [Middleware](#middleware)
   - [React Frontend](#react-frontend)
5. [Running the Application](#running-the-application)
6. [API Endpoints](#api-endpoints)
7. [Troubleshooting](#troubleshooting)

---

## **Features**
- **User Authentication**: Register, log in, and log out.
- **Chat Interface**: Send and receive messages in real-time.
- **Group Management**: Create groups and add/remove users.
- **Message History**: View past conversations.
- **Real-Time Updates**: Messages are updated in real-time using polling.

---

## **Technologies**
- **Frontend**: React.js (TypeScript), Tailwind CSS, shadcn UI
- **Backend 1 (User Management)**: Laravel (PHP), MySQL
- **Backend 2 (Message Management)**: Spring Boot (Java), MySQL
- **Middleware**: Java (JAX-RS)
- **Tools**: XAMPP (for Laravel), IntelliJ IDEA (for Spring Boot and Middleware), Node.js (for React)

---

## **Project Structure**
```
chat-app/
├── frontend/               # React frontend
├── backend-laravel/        # Laravel backend (User Management)
├── backend-springboot/     # Spring Boot backend (Message Management)
├── middleware/             # Middleware (Java)
```

---

## **Setup and Installation**

### **1. Laravel Backend**
#### **Prerequisites**
- PHP >= 8.0
- Composer
- MySQL
- XAMPP (optional)

#### **Steps**
1. Navigate to the `backend-laravel` directory:
   ```bash
   cd backend-laravel
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
3. Create a `.env` file and configure the database:
   ```bash
   cp .env.example .env
   ```
   Update the following in `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=chat-app
   DB_USERNAME=root
   DB_PASSWORD=
   ```
4. Generate an application key:
   ```bash
   php artisan key:generate
   ```
5. Run migrations to create the database tables:
   ```bash
   php artisan migrate
   ```
6. Start the Laravel development server:
   ```bash
   php artisan serve --port=8082
   ```
   The backend will be available at `http://localhost:8000`.

---

### **2. Spring Boot Backend**
#### **Prerequisites**
- Java >= 17
- Maven
- MySQL

#### **Steps**
1. Navigate to the `backend-springboot` directory:
   ```bash
   cd backend-springboot
   ```
2. Configure the database in `application.properties`:
   ```properties
   server.port=8081
   spring.datasource.url=jdbc:mysql://localhost:3306/chat-app
   spring.datasource.username=root
   spring.datasource.password=
   spring.jpa.hibernate.ddl-auto=update
   ```
3. Build and run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The backend will be available at `http://localhost:8081`.

---

### **3. Middleware**
#### **Prerequisites**
- Java >= 17
- Maven

#### **Steps**
1. Navigate to the `middleware` directory:
   ```bash
   cd middleware
   ```
2. Build and run the middleware:
   ```bash
   mvn clean install
   ```
   then
   ```
   mvn exec:java
   ```
   or 
   copy the file chat-app-middleware.war located in the **target** folder, and paste it in **webapps** in your tomcat server folder.
   then execute it from tomcat manager:
   ```
   http://localhost:8080/manager/html
   ```
   The middleware will be available at `http://localhost:8080`.

---

### **4. React Frontend**
#### **Prerequisites**
- Node.js >= 16
- npm or yarn

#### **Steps**
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

---

## **Running the Application**
1. Start the **Laravel backend**:
   ```bash
   php artisan serve --port=8082
   ```
2. Start the **Spring Boot backend**:
   ```bash
   mvn spring-boot:run or launch it from intellij
   ```
3. Start the **Middleware**:
   ```bash
   mvn exec:java
   ```
4. Start the **React frontend**:
   ```bash
   npm run dev
   ```
5. Open the application in your browser:
   - Frontend: `http://localhost:5173`
   - Laravel API: `http://localhost:8000/api`
   - Spring Boot API: `http://localhost:8081/api`
   - Middleware: `http://localhost:8080`

---

## **API Endpoints**
### **Laravel Backend**
- **Register**: `POST /api/register`
- **Login**: `POST /api/login`
- **Get Users**: `GET /api/getUsers`
- **Send Message**: `POST /api/sendMessage`
- **Get Messages**: `GET /api/getMessages`

### **Spring Boot Backend**
- **Send Message**: `POST /api/sendMessage`
- **Get Messages**: `GET /api/getMessages`

---

## **Troubleshooting**
1. **404 Errors**:
   - Ensure all services (Laravel, Spring Boot, Middleware) are running.
   - Verify the API endpoints in the frontend code.

2. **Database Issues**:
   - Check the database credentials in `.env` (Laravel) and `application.properties` (Spring Boot).
   - Run migrations in Laravel: `php artisan migrate`.

3. **CORS Issues**:
   - Configure CORS in Laravel and Spring Boot to allow requests from the frontend.

4. **Real-Time Updates Not Working**:
   - Ensure the polling interval in the React frontend is set correctly.

---

## **Contributing**
Feel free to contribute to this project by opening issues or submitting pull requests.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Let me know if you need further assistance! 😊