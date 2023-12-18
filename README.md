# Web Scraping Application

Welcome to the Web Scraping Application! This application allows you to perform web scraping and analysis with a user-friendly interface.

## Setup Instructions

### PostgreSQL Database

1. **Download and Install PostgreSQL: if you haven't installed on your device**
   - brew install postgresql

2. **Start PostgreSQL Services:**
   - brew services start postgresql

3. **Login to Database:**
   - RUN `psql -d postgres -U username`
     
5. **Create Database:**
   - RUN `CREATE DATABASE webscraping;`

### RabbitMQ

1. **Download RabbitMQ:**
   - brew install rabbitmq

2. **Start RabbitMQ:**
   - brew start services rabbitmq

### Clone the Project

1. **Clone the Project Repository:**
   ```bash
   git clone https://github.com/myat-hsu-mon/web-scrapping-app
   ```

2. **Navigate to Client:**
   ```bash
   cd web-scrapping-app/client
   ```

3. **Install Client Dependencies:**
   ```bash
   npm install
   ```

4. **Run Client:**
   ```bash
   npm run dev
   ```

5. **Run Unit Tests (Optional):**
   ```bash
   npm run test
   ```

6. **Access Client:**
   Open your browser and go to [http://localhost:3000](http://localhost:3000).

### Setup Backend

1. **Navigate to Server:**
   ```bash
   cd web-scrapping-app/server
   ```

2. **Rename Environment File:**
   - Rename `env.development` to `.env` and fill in your environment information.

3. **Install Server Dependencies:**
   ```bash
   npm install
   ```

4. **Run Backend Server:**
   ```bash
   npm run dev
   ```

5. **Run RabbitMQ Service:**
   - Open a new terminal inside the `server` folder and run:
     ```bash
     node src/queues/consumer.js
     ```

Congratulations! The Web Scraping Application is now up and running. Explore the client and server components for web scraping functionalities.
