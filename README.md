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

4. **Create Database:**

   - RUN `CREATE DATABASE webscraping;`

### RabbitMQ

1. **Download RabbitMQ:**

   - brew install rabbitmq

2. **Start RabbitMQ:**

   - brew services start rabbitmq

3. **Download rabbitmq-delayed-message-exchange plugin:**

   Binary builds are distributed [via GitHub releases](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases). As with all 3rd party plugins, the `.ez` file must be placed into a [node's plugins directory](https://rabbitmq.com/plugins.html#plugin-directories) and be readable by the effective user of the RabbitMQ process.

   To find out what the plugins directory is, use:

   ```bash
   rabbitmq-plugins directories -s
   ```

4. **Copy the `.ez` file into the RabbitMQ plugins directory:**

   ```bash
   cp /path/to/downloaded/rabbitmq_delayed_message_exchange.ez /path/to/rabbitmq/plugins/directory
   ```

   example: If you downloaded .ez file inside Downloads folder:

   - go to your terminal
   - cd ~/Downloads
   - cp rabbitmq_delayed_message_exchange-3.12.0.ez /opt/homebrew/opt/rabbitmq/plugins

5. **Enabling the Plugin:**
   Run the following command:

   ```bash
   rabbitmq-plugins enable rabbitmq_delayed_message_exchange
   ```

6. **Restart Rabbitmq Services:**

   ```bash
   brew services restart rabbitmq
   ```

7. **Check RabbitMQ Plugins List:**
   ```bash
   rabbitmq-plugins list
   ```

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

4. **DROP DATABASE if you already have the same DATABASE name (optional):**

   ```bash
   npm run db:drop
   ```

4. **Run Database Migration:**

   ```bash
   npm run db:create
   npm run db:migrate
   ```

5. **Run Backend Server:**

   ```bash
   npm run dev
   ```

6. **Run RabbitMQ Service:**
   - Open a new terminal inside the `server` folder and run:
     ```bash
     node src/queues/consumer.js
     ```
     
7. **Test Backend Server (Optional):**

   ```bash
   npm run test
   ```

Congratulations! The Web Scraping Application is now up and running. Explore the client and server components for web scraping functionalities.
