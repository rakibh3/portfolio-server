# Course Review

## Installation

Step-by-step instructions on how to install the application.

- Clone the repository:

```
https://github.com/rakibh3/review-with-auth.git
```

- Navigate to the project directory:

```
cd review-with-auth
```

- Install dependencies:

```
npm install
```

### Set up environment variables

Create a .env file in the root directory and add necessary environment variables like database connection strings, DATABASE_URL and PORT

```
DATABASE_URL = your_database_connection_string
PORT = 5000
BCRYPT_SALT_ROUNDS = 12
JWT_ACCESS_SECRET = your_jwt_access_secret
JWT_ACCESS_EXPIRES_IN = 1d
```

## Usage

Instructions on how to use or run the application.

Start the application:

```
npm run start:dev
```
