#  E-Learning Management System API

A complete RESTful API for managing online courses, students, and enrollments with 15 endpoints.

## API Endpoints (15 Total)

###  Students (6 endpoints)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/students` | Create student |
| GET | `/api/v1/students` | Get all students |
| GET | `/api/v1/students/{id}` | Get single student |
| GET | `/api/v1/students/search?q={query}` | Search students |
| PUT | `/api/v1/students/{id}` | Update student |
| DELETE | `/api/v1/students/{id}` | Delete student |

###  Courses (6 endpoints)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/courses` | Create course |
| GET | `/api/v1/courses` | Get all courses |
| GET | `/api/v1/courses/{id}` | Get single course |
| GET | `/api/v1/courses/search?q={query}` | Search courses |
| PUT | `/api/v1/courses/{id}` | Update course |
| DELETE | `/api/v1/courses/{id}` | Delete course |

### Enrollments (3 endpoints)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/enrollments` | Create enrollment |
| GET | `/api/v1/enrollments` | Get all enrollments |
| DELETE | `/api/v1/enrollments/{id}` | Delete enrollment |

## Technologies
- Node.js & Express.js
- MongoDB with Mongoose
- Swagger/OpenAPI 3.0
- Helmet.js & CORS
- Deployable on Vercel


