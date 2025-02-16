# The Apartment Visitor and Room Management System

## Description
The Apartment Visitor and Room Management System is a web-based platform that enables apartment administrators to manage visitor logs and room allocations efficiently. The system provides functionalities for visitor check-in/check-out, room assignment, and resident tracking. It is built using **HTML, CSS, and Node.js (Express.js)** for backend operations, with **MySQL** as the database for data storage.

## Features
- User-friendly interface for managing visitors and room allocations
- CRUD (Create, Read, Update, Delete) operations for visitors and rooms
- Secure visitor check-in and check-out system
- Resident and visitor tracking with timestamps
- Responsive design using CSS
- Backend powered by Node.js and Express.js
- MySQL database for storing visitor and room data

## Tech Stack
- **Frontend**: HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/installer/)

### Steps to Set Up Locally

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/Apartment-Visitor-Management.git
   cd Apartment-Visitor-Management
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up MySQL Database**
   - Create a MySQL database:
     ```sql
     CREATE DATABASE apartment_management;
     ```
   - Import the provided database schema (if available)
   - Update the `.env` file with database credentials:
     ```env
     PORT=5000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=apartment_management
     ```

4. **Run Database Migrations (if using Sequelize)**
   ```sh
   npx sequelize-cli db:migrate
   ```

5. **Run the application**
   ```sh
   npm start
   ```

6. Open your browser and visit: `http://localhost:5000`

## Project Structure
```
Apartment-Visitor-Management/
│── public/          # Static assets (CSS, JS, images)
│── views/           # HTML templates (if using EJS or Pug)
│── routes/          # Express routes for handling requests
│── models/          # MySQL models (Sequelize ORM)
│── config/          # Database connection settings
│── server.js        # Main server file
│── package.json     # Project metadata and dependencies
│── .env             # Environment variables
```

## API Endpoints
| Method | Endpoint           | Description                |
|--------|-------------------|----------------------------|
| GET    | `/`               | Home page                  |
| GET    | `/visitors`       | List all visitors          |
| GET    | `/visitor/:id`    | View a single visitor      |
| POST   | `/visitor`        | Register a new visitor     |
| PUT    | `/visitor/:id`    | Update visitor details     |
| DELETE | `/visitor/:id`    | Remove a visitor           |
| GET    | `/rooms`          | List all rooms             |
| POST   | `/room`           | Add a new room             |
| PUT    | `/room/:id`       | Update room details        |
| DELETE | `/room/:id`       | Delete a room              |

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

## License
This project is licensed under the **MIT License**.

## Contact
For questions, reach out at **your_email@example.com** or visit [GitHub](https://github.com/yourusername/).

