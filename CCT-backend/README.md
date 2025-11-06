# CCT Backend API

A scalable Node.js backend API built with TypeScript, Express, and modern development practices.

## 🚀 Features

- **TypeScript** - Type-safe development
- **Express.js** - Fast, unopinionated web framework
- **Nodemon** - Automatic server restart during development
- **ESLint** - Code linting and formatting
- **Jest** - Testing framework
- **Security** - Helmet, CORS, Rate limiting
- **Scalable Architecture** - Clean folder structure with separation of concerns

## 📁 Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Data models
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── app.ts           # Express app configuration
└── index.ts         # Server entry point
```

## 🛠️ Installation

1. Clone the repository
```bash
git clone <repository-url>
cd CCT-Backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp env.example .env
# Edit .env with your configuration
```

## 🚀 Development

Start the development server with hot reload:
```bash
npm run dev
```

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## 🐳 Docker Deployment

### Quick Start

1. **Create `.env` file** (copy from `env.local` and update values):
   ```bash
   cp env.local .env
   # Edit .env with your production values
   ```

2. **Start the server**:
   ```bash
   docker-compose up -d
   ```

3. **Stop the server**:
   ```bash
   docker-compose stop
   ```

4. **View logs**:
   ```bash
   docker-compose logs -f
   ```

5. **Restart the server**:
   ```bash
   docker-compose restart
   ```

### Using Docker Commands Directly

```bash
# Build image
docker build -t cct-backend .

# Run container
docker run -d --name cct-backend -p 3001:3001 --env-file .env cct-backend

# Stop container
docker stop cct-backend

# Start container
docker start cct-backend
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## 🔍 Linting

Check code style:
```bash
npm run lint
```

Fix code style issues:
```bash
npm run lint:fix
```

## 📚 API Endpoints

### Health Check
- `GET /api/health` - Health check endpoint
- `GET /api/` - Welcome message

### Users
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users (with pagination)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID

## 🔧 Configuration

The application uses environment variables for configuration. See `env.example` for all available options.

### Key Configuration Options

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `API_PREFIX` - API route prefix (default: /api)
- `JWT_SECRET` - JWT secret key
- `RATE_LIMIT_MAX_REQUESTS` - Rate limit max requests per window

## 🏗️ Architecture

### Layers

1. **Controllers** - Handle HTTP requests and responses
2. **Services** - Business logic and data processing
3. **Models** - Data access layer
4. **Middleware** - Request/response processing
5. **Utils** - Helper functions and utilities

### Error Handling

- Global error handler middleware
- Standardized API response format
- Proper HTTP status codes

### Security

- Helmet for security headers
- CORS configuration
- Rate limiting
- Input validation and sanitization

## 📝 API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2023-12-01T10:00:00.000Z"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.