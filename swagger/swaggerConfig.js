// swagger/swaggerConfig.js - PROFESSIONAL VERSION
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '🎓 E-Learning Management System API',
      version: '1.0.0',
      description: `

This is a REST API for managing online learning platforms, students, courses, and enrollments.

#### What This API Offers :
- Create, read, update, and delete student accounts
- Course catalog with search functionality  
- Get up-to-date information on courses and enrollments
- Track student enrollments and course progress

#### Who Should Use This API :
- Universities and colleges
- Corporate training platforms
- Online course marketplaces
- Educational institutions

#### Security
- Input validation on all endpoints
- CORS enabled for cross-origin requests
- Security headers with Helmet.js
- Rate limiting ready

####  Technologies used :
- Node.js & Express.js
- MongoDB with Mongoose ODM
- Swagger for API documentation
- Deployable on Vercel, AWS, Heroku

#### Support
For API support, contact: **itel3Runners@elearning.com**
      `,
            contact: {
        name: 'API Support',
        email: 'itel3Runners@elearning.com'
      },
      license: {
        name: 'MIT License',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    externalDocs: {
      description: '📖 View Project on GitHub',
      url: 'https://github.com/AmDreaith/E_learning_API' 
    },
    
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: '🚀 Local Development Server'
      },
      {
        url: 'https://elearning-api-final.vercel.app/api/v1',
        description: '🌐 Production Server (Vercel)'
      },
    ],

    tags: [
      {
        name: '👨‍🎓 Students',
        description: 'Everything about Students - Create, read, update, delete, and search student records'
      },
      {
        name: '📚 Courses',
        description: 'Course management - Create courses, manage catalog, search courses by various criteria'
      },
      {
        name: '✅ Enrollments',
        description: 'Student enrollments - Track course enrollments, progress, and completion status'
      },
      {
        name: '📊 Analytics',
        description: 'Platform analytics and reports'
      }
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key',
          description: 'API key for authenticated requests'
        },
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token for user authentication'
        }
      },
      schemas: {
        // Student Schema
        Student: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
              description: 'Unique student identifier'
            },
            name: {
              type: 'string',
              example: 'John Alexander Doe',
              minLength: 2,
              maxLength: 100,
              description: 'Full name of the student'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@university.edu',
              description: 'Primary email address (must be unique)'
            },
            phone: {
              type: 'string',
              example: '+1 (555) 123-4567',
              pattern: '^[\\d\\s\\-\\+\\(\\)]+$',
              description: 'Contact phone number with country code'
            },
            enrolledCourses: {
              type: 'array',
              items: {
                type: 'string',
                format: 'objectId'
              },
              description: 'Array of enrolled course IDs',
              example: ['64a1b2c3d4e5f67890123456', '64b2c3d4e5f6789012345678']
            },
            enrollmentCount: {
              type: 'integer',
              example: 3,
              minimum: 0,
              description: 'Total number of courses enrolled'
            },
            isActive: {
              type: 'boolean',
              example: true,
              default: true,
              description: 'Account status - active/inactive'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-15T10:30:00Z',
              description: 'Account creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-20T14:45:00Z',
              description: 'Last update timestamp'
            }
          },
          example: {
            _id: '64a1b2c3d4e5f67890123456',
            name: 'John Alexander Doe',
            email: 'john.doe@university.edu',
            phone: '+1 (555) 123-4567',
            enrolledCourses: ['64c3d4e5f67890123456789', '64d4e5f678901234567890a'],
            enrollmentCount: 2,
            isActive: true,
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-20T14:45:00Z'
          }
        },
        
        // Course Schema
        Course: {
          type: 'object',
          required: ['title', 'description', 'instructor', 'duration', 'price'],
          properties: {
            _id: {
              type: 'string',
              example: '64c3d4e5f67890123456789',
              description: 'Unique course identifier'
            },
            title: {
              type: 'string',
              example: 'Advanced JavaScript: Modern Patterns and Best Practices',
              minLength: 5,
              maxLength: 200,
              description: 'Course title'
            },
            description: {
              type: 'string',
              example: 'Master modern JavaScript patterns, async programming, and performance optimization techniques used by top tech companies.',
              maxLength: 2000,
              description: 'Detailed course description'
            },
            instructor: {
              type: 'string',
              example: 'Dr. Sarah Johnson, PhD',
              description: 'Instructor name and qualifications'
            },
            duration: {
              type: 'integer',
              example: 60,
              minimum: 1,
              maximum: 500,
              description: 'Course duration in hours'
            },
            price: {
              type: 'number',
              example: 299.99,
              minimum: 0,
              maximum: 10000,
              description: 'Course price in USD'
            },
            category: {
              type: 'string',
              enum: ['Programming', 'Design', 'Business', 'Marketing', 'Personal Development', 'Technology', 'Other'],
              default: 'Other',
              example: 'Programming',
              description: 'Course category'
            },
            level: {
              type: 'string',
              enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
              default: 'Beginner',
              example: 'Intermediate',
              description: 'Difficulty level'
            },
            rating: {
              type: 'number',
              example: 4.7,
              minimum: 0,
              maximum: 5,
              description: 'Average student rating'
            },
            enrollmentCount: {
              type: 'integer',
              example: 1250,
              minimum: 0,
              description: 'Total number of enrolled students'
            },
            isActive: {
              type: 'boolean',
              default: true,
              example: true,
              description: 'Course availability status'
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              example: ['javascript', 'web-development', 'async-programming', 'es6'],
              description: 'Searchable tags'
            },
            learningObjectives: {
              type: 'array',
              items: { type: 'string' },
              example: [
                'Master modern JavaScript syntax (ES6+)',
                'Understand async/await patterns',
                'Implement design patterns',
                'Optimize application performance'
              ],
              description: 'What students will learn'
            },
            prerequisites: {
              type: 'array',
              items: { type: 'string' },
              example: ['Basic JavaScript knowledge', 'HTML & CSS fundamentals'],
              description: 'Required knowledge before taking course'
            }
          },
          example: {
            _id: '64c3d4e5f67890123456789',
            title: 'Advanced JavaScript: Modern Patterns',
            description: 'Master modern JavaScript patterns...',
            instructor: 'Dr. Sarah Johnson, PhD',
            duration: 60,
            price: 299.99,
            category: 'Programming',
            level: 'Intermediate',
            rating: 4.7,
            enrollmentCount: 1250,
            isActive: true,
            tags: ['javascript', 'web-development'],
            learningObjectives: ['Master ES6+', 'Understand async patterns'],
            prerequisites: ['Basic JavaScript']
          }
        },
        
        // Enrollment Schema
        Enrollment: {
          type: 'object',
          required: ['student', 'course'],
          properties: {
            _id: {
              type: 'string',
              example: '64e5f678901234567890abcd',
              description: 'Unique enrollment ID'
            },
            student: {
              type: 'string',
              format: 'objectId',
              example: '64a1b2c3d4e5f67890123456',
              description: 'Reference to Student document'
            },
            course: {
              type: 'string',
              format: 'objectId',
              example: '64c3d4e5f67890123456789',
              description: 'Reference to Course document'
            },
            enrollmentDate: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-20T09:15:00Z',
              description: 'Date and time of enrollment'
            },
            progress: {
              type: 'number',
              example: 65,
              minimum: 0,
              maximum: 100,
              default: 0,
              description: 'Course completion percentage'
            },
            status: {
              type: 'string',
              enum: ['active', 'completed', 'dropped', 'paused'],
              default: 'active',
              example: 'active',
              description: 'Enrollment status'
            },
            lastAccessed: {
              type: 'string',
              format: 'date-time',
              example: '2024-02-01T14:30:00Z',
              description: 'Last course access timestamp'
            },
            completionDate: {
              type: 'string',
              format: 'date-time',
              example: '2024-03-15T16:45:00Z',
              description: 'Course completion date (if completed)'
            },
            grade: {
              type: 'string',
              enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', 'Incomplete'],
              example: 'A',
              description: 'Final grade (if completed)'
            },
            certificateIssued: {
              type: 'boolean',
              example: false,
              default: false,
              description: 'Whether certificate was issued'
            }
          },
          example: {
            _id: '64e5f678901234567890abcd',
            student: '64a1b2c3d4e5f67890123456',
            course: '64c3d4e5f67890123456789',
            enrollmentDate: '2024-01-20T09:15:00Z',
            progress: 65,
            status: 'active',
            lastAccessed: '2024-02-01T14:30:00Z',
            completionDate: null,
            grade: null,
            certificateIssued: false
          }
        },
        
        // Error Response Schema
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
              description: 'Request success status'
            },
            error: {
              type: 'string',
              example: 'Validation failed',
              description: 'Error message summary'
            },
            code: {
              type: 'string',
              example: 'VALIDATION_ERROR',
              description: 'Error code for programmatic handling'
            },
            details: {
              type: 'array',
              items: { type: 'string' },
              example: ['Email is required', 'Invalid email format'],
              description: 'Detailed error messages'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-20T14:30:00Z',
              description: 'When error occurred'
            },
            requestId: {
              type: 'string',
              example: 'req_abc123xyz456',
              description: 'Unique request identifier for support'
            }
          }
        },
        
        // Success Response Schema
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
              description: 'Request success status'
            },
            message: {
              type: 'string',
              example: 'Student created successfully',
              description: 'Success message'
            },
            data: {
              type: 'object',
              description: 'Response data'
            },
            meta: {
              type: 'object',
              properties: {
                count: { type: 'integer', example: 1 },
                page: { type: 'integer', example: 1 },
                limit: { type: 'integer', example: 10 },
                totalPages: { type: 'integer', example: 5 },
                total: { type: 'integer', example: 50 }
              }
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-20T14:30:00Z'
            }
          }
        }
      },
      responses: {
        // Predefined responses
        BadRequest: {
          description: '❌ Bad Request - Invalid input parameters',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        Unauthorized: {
          description: '🔐 Unauthorized - Authentication required',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        Forbidden: {
          description: '🚫 Forbidden - Insufficient permissions',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        NotFound: {
          description: '🔍 Not Found - Resource does not exist',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        Conflict: {
          description: '⚡ Conflict - Resource already exists',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        ServerError: {
          description: '💥 Server Error - Internal server issue',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        }
      },
      parameters: {
        // Common parameters
        IdParam: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Resource identifier (MongoDB ObjectId)',
          example: '507f1f77bcf86cd799439011'
        },
        PageParam: {
          name: 'page',
          in: 'query',
          schema: { type: 'integer', default: 1, minimum: 1 },
          description: 'Page number for pagination',
          example: 1
        },
        LimitParam: {
          name: 'limit',
          in: 'query',
          schema: { type: 'integer', default: 10, minimum: 1, maximum: 100 },
          description: 'Number of items per page',
          example: 10
        },
        SearchQueryParam: {
          name: 'q',
          in: 'query',
          required: true,
          schema: { type: 'string' },
          description: 'Search query string',
          example: 'javascript'
        },
        SortParam: {
          name: 'sort',
          in: 'query',
          schema: { type: 'string', default: 'createdAt', enum: ['createdAt', 'updatedAt', 'name', 'price', 'rating'] },
          description: 'Field to sort by',
          example: 'createdAt'
        },
        OrderParam: {
          name: 'order',
          in: 'query',
          schema: { type: 'string', default: 'desc', enum: ['asc', 'desc'] },
          description: 'Sort order',
          example: 'desc'
        }
      }
    },
    paths: {} // We'll fill this below
  },
  apis: ['./routes/*.js']
};

// Generate base spec
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Now manually add all 15 endpoints with rich documentation
swaggerSpec.paths = {
  // ===================== STUDENTS ENDPOINTS =====================
  '/students': {
    get: {
      tags: ['👨‍🎓 Students'],
      summary: '📋 Get All Students',
      description: 'Retrieve a paginated list of all active students with optional filtering and sorting.',
      operationId: 'getAllStudents',
      parameters: [
        { $ref: '#/components/parameters/PageParam' },
        { $ref: '#/components/parameters/LimitParam' },
        { $ref: '#/components/parameters/SortParam' },
        { $ref: '#/components/parameters/OrderParam' },
        {
          name: 'isActive',
          in: 'query',
          schema: { type: 'boolean' },
          description: 'Filter by active status',
          example: true
        }
      ],
      responses: {
        200: {
          description: '✅ Success - List of students retrieved',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Students retrieved successfully' },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Student' }
                  },
                  meta: {
                    type: 'object',
                    properties: {
                      count: { type: 'integer', example: 10 },
                      page: { type: 'integer', example: 1 },
                      limit: { type: 'integer', example: 10 },
                      total: { type: 'integer', example: 150 },
                      totalPages: { type: 'integer', example: 15 }
                    }
                  }
                }
              },
              examples: {
                success: {
                  summary: 'Successful response',
                  value: {
                    success: true,
                    message: 'Students retrieved successfully',
                    data: [
                      {
                        _id: '64a1b2c3d4e5f67890123456',
                        name: 'John Doe',
                        email: 'john@example.com',
                        phone: '+1234567890',
                        enrolledCourses: [],
                        enrollmentCount: 0,
                        isActive: true,
                        createdAt: '2024-01-15T10:30:00Z',
                        updatedAt: '2024-01-15T10:30:00Z'
                      }
                    ],
                    meta: {
                      count: 1,
                      page: 1,
                      limit: 10,
                      total: 150,
                      totalPages: 15
                    }
                  }
                }
              }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        500: { $ref: '#/components/responses/ServerError' }
      }
    },
    post: {
      tags: ['👨‍🎓 Students'],
      summary: '➕ Create New Student',
      description: 'Register a new student in the system. Email must be unique.',
      operationId: 'createStudent',
      requestBody: {
        required: true,
        description: 'Student registration data',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'email'],
              properties: {
                name: {
                  type: 'string',
                  example: 'Jane Smith',
                  description: 'Student full name'
                },
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'jane.smith@university.edu',
                  description: 'Unique email address'
                },
                phone: {
                  type: 'string',
                  example: '+1 (555) 987-6543',
                  description: 'Contact phone number'
                }
              }
            },
            examples: {
              basic: {
                summary: 'Basic registration',
                value: {
                  name: 'Jane Smith',
                  email: 'jane.smith@university.edu',
                  phone: '+1 (555) 987-6543'
                }
              },
              minimal: {
                summary: 'Minimal required fields',
                value: {
                  name: 'John Doe',
                  email: 'john@example.com'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: '🎉 Created - Student successfully registered',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SuccessResponse' },
              examples: {
                created: {
                  summary: 'Student created',
                  value: {
                    success: true,
                    message: 'Student created successfully',
                    data: {
                      _id: '64a1b2c3d4e5f67890123456',
                      name: 'Jane Smith',
                      email: 'jane.smith@university.edu',
                      phone: '+1 (555) 987-6543',
                      isActive: true,
                      createdAt: '2024-01-20T14:30:00Z'
                    }
                  }
                }
              }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        409: {
          description: '⚠️ Conflict - Email already exists',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
              example: {
                success: false,
                error: 'Email already registered',
                code: 'EMAIL_EXISTS',
                details: ['Please use a different email address']
              }
            }
          }
        }
      }
    }
  },
  
  '/students/search': {
    get: {
      tags: ['👨‍🎓 Students'],
      summary: '🔍 Search Students',
      description: 'Search students by name, email, or phone number with fuzzy matching.',
      operationId: 'searchStudents',
      parameters: [
        {
          name: 'q',
          in: 'query',
          required: true,
          schema: { type: 'string' },
          description: 'Search term (supports partial matches)',
          example: 'john'
        },
        {
          name: 'field',
          in: 'query',
          schema: {
            type: 'string',
            enum: ['name', 'email', 'phone', 'all'],
            default: 'all'
          },
          description: 'Specific field to search in',
          example: 'name'
        }
      ],
      responses: {
        200: {
          description: '✅ Success - Search results',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Search completed' },
                  query: { type: 'string', example: 'john' },
                  count: { type: 'integer', example: 3 },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Student' }
                  }
                }
              }
            }
          }
        },
        400: {
          description: '❌ Bad Request - Missing search query',
          content: {
            'application/json': {
              example: {
                success: false,
                error: 'Search query is required',
                code: 'SEARCH_QUERY_REQUIRED'
              }
            }
          }
        }
      }
    }
  },
  
  '/students/{id}': {
    get: {
      tags: ['👨‍🎓 Students'],
      summary: '📄 Get Student by ID',
      description: 'Retrieve detailed information about a specific student including enrolled courses.',
      operationId: 'getStudentById',
      parameters: [{ $ref: '#/components/parameters/IdParam' }],
      responses: {
        200: {
          description: '✅ Success - Student details',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SuccessResponse' }
            }
          }
        },
        404: { $ref: '#/components/responses/NotFound' }
      }
    },
    put: {
      tags: ['👨‍🎓 Students'],
      summary: '✏️ Update Student',
      description: 'Update student information. All fields are optional - only provided fields will be updated.',
      operationId: 'updateStudent',
      parameters: [{ $ref: '#/components/parameters/IdParam' }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string', example: 'Updated Name' },
                email: { type: 'string', format: 'email', example: 'updated@example.com' },
                phone: { type: 'string', example: '+9876543210' },
                isActive: { type: 'boolean', example: true }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: '✅ Success - Student updated',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SuccessResponse' }
            }
          }
        },
        404: { $ref: '#/components/responses/NotFound' },
        400: { $ref: '#/components/responses/BadRequest' }
      }
    },
    delete: {
      tags: ['👨‍🎓 Students'],
      summary: '🗑️ Delete Student',
      description: 'Permanently delete a student record. This action cannot be undone.',
      operationId: 'deleteStudent',
      parameters: [{ $ref: '#/components/parameters/IdParam' }],
      responses: {
        200: {
          description: '✅ Success - Student deleted',
          content: {
            'application/json': {
              example: {
                success: true,
                message: 'Student deleted successfully',
                data: {}
              }
            }
          }
        },
        404: { $ref: '#/components/responses/NotFound' }
      }
    }
  },
  
  // ===================== COURSES ENDPOINTS =====================
  '/courses': {
    get: {
      tags: ['📚 Courses'],
      summary: '📋 Get All Courses',
      description: 'Retrieve paginated list of courses with filtering by category, level, and price range.',
      operationId: 'getAllCourses',
      parameters: [
        { $ref: '#/components/parameters/PageParam' },
        { $ref: '#/components/parameters/LimitParam' },
        {
          name: 'category',
          in: 'query',
          schema: {
            type: 'string',
            enum: ['Programming', 'Design', 'Business', 'Marketing', 'Personal Development', 'Technology', 'Other']
          },
          description: 'Filter by category'
        },
        {
          name: 'level',
          in: 'query',
          schema: {
            type: 'string',
            enum: ['Beginner', 'Intermediate', 'Advanced']
          },
          description: 'Filter by difficulty level'
        },
        {
          name: 'minPrice',
          in: 'query',
          schema: { type: 'number', minimum: 0 },
          description: 'Minimum price filter'
        },
        {
          name: 'maxPrice',
          in: 'query',
          schema: { type: 'number', minimum: 0 },
          description: 'Maximum price filter'
        }
      ],
      responses: {
        200: {
          description: '✅ Success - List of courses',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Courses retrieved successfully' },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Course' }
                  },
                  meta: {
                    type: 'object',
                    properties: {
                      count: { type: 'integer', example: 8 },
                      page: { type: 'integer', example: 1 },
                      limit: { type: 'integer', example: 10 },
                      total: { type: 'integer', example: 85 },
                      totalPages: { type: 'integer', example: 9 }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['📚 Courses'],
      summary: '➕ Create New Course',
      description: 'Add a new course to the catalog. All fields are validated for business rules.',
      operationId: 'createCourse',
      requestBody: {
        required: true,
        description: 'Course creation data',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Course' },
            examples: {
              programmingCourse: {
                summary: 'Programming course example',
                value: {
                  title: 'Full Stack Web Development',
                  description: 'Learn to build modern web applications with React, Node.js, and MongoDB',
                  instructor: 'Alex Johnson, Senior Developer at Google',
                  duration: 80,
                  price: 399.99,
                  category: 'Programming',
                  level: 'Intermediate',
                  tags: ['javascript', 'react', 'nodejs', 'mongodb', 'webdev'],
                  learningObjectives: [
                    'Build full-stack applications',
                    'Understand REST API design',
                    'Implement user authentication',
                    'Deploy applications to cloud'
                  ]
                }
              },
              businessCourse: {
                summary: 'Business course example',
                value: {
                  title: 'Digital Marketing Strategy',
                  description: 'Master digital marketing techniques for business growth',
                  instructor: 'Maria Garcia, Marketing Director',
                  duration: 40,
                  price: 199.99,
                  category: 'Marketing',
                  level: 'Beginner',
                  tags: ['marketing', 'business', 'strategy', 'digital']
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: '🎉 Created - Course added to catalog',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SuccessResponse' }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' }
      }
    }
  },
  
  '/courses/search': {
    get: {
      tags: ['📚 Courses'],
      summary: '🔍 Search Courses',
      description: 'Advanced course search across title, description, instructor, and tags.',
      operationId: 'searchCourses',
      parameters: [
        {
          name: 'q',
          in: 'query',
          required: true,
          schema: { type: 'string' },
          description: 'Search keywords',
          example: 'javascript web development'
        },
        {
          name: 'sortBy',
          in: 'query',
          schema: {
            type: 'string',
            enum: ['relevance', 'price', 'rating', 'enrollmentCount', 'newest'],
            default: 'relevance'
          },
          description: 'Sort search results'
        }
      ],
      responses: {
        200: {
          description: '✅ Success - Search results',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Search completed' },
                  query: { type: 'string', example: 'javascript' },
                  count: { type: 'integer', example: 5 },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Course' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  
  '/courses/{id}': {
    get: {
      tags: ['📚 Courses'],
      summary: '📄 Get Course by ID',
      description: 'Get complete course details including enrollment statistics.',
      operationId: 'getCourseById',
      parameters: [{ $ref: '#/components/parameters/IdParam' }],
      responses: {
        200: {
          description: '✅ Success - Course details',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SuccessResponse' }
            }
          }
        },
        404: { $ref: '#/components/responses/NotFound' }
      }
    },
    put: {
      tags: ['📚 Courses'],
      summary: '✏️ Update Course',
      description: 'Update course information. Useful for price updates, content changes, or status updates.',
      operationId: 'updateCourse',
      parameters: [{ $ref: '#/components/parameters/IdParam' }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string', example: 'Updated Course Title' },
                description: { type: 'string', example: 'Updated description' },
                price: { type: 'number', example: 249.99 },
                isActive: { type: 'boolean', example: true }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: '✅ Success - Course updated',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SuccessResponse' }
            }
          }
        },
        404: { $ref: '#/components/responses/NotFound' },
        400: { $ref: '#/components/responses/BadRequest' }
      }
    },
    delete: {
      tags: ['📚 Courses'],
      summary: '🗑️ Delete Course',
      description: 'Remove a course from the catalog. Existing enrollments will be marked as inactive.',
      operationId: 'deleteCourse',
      parameters: [{ $ref: '#/components/parameters/IdParam' }],
      responses: {
        200: {
          description: '✅ Success - Course deleted',
          content: {
            'application/json': {
              example: {
                success: true,
                message: 'Course deleted successfully',
                data: {}
              }
            }
          }
        },
        404: { $ref: '#/components/responses/NotFound' }
      }
    }
  },
  
  // ===================== ENROLLMENTS ENDPOINTS =====================
  '/enrollments': {
    get: {
      tags: ['✅ Enrollments'],
      summary: '📋 Get All Enrollments',
      description: 'Retrieve all enrollments with student and course details. Supports filtering by status.',
      operationId: 'getAllEnrollments',
      parameters: [
        { $ref: '#/components/parameters/PageParam' },
        { $ref: '#/components/parameters/LimitParam' },
        {
          name: 'status',
          in: 'query',
          schema: {
            type: 'string',
            enum: ['active', 'completed', 'dropped', 'all'],
            default: 'all'
          },
          description: 'Filter by enrollment status'
        },
        {
          name: 'studentId',
          in: 'query',
          schema: { type: 'string' },
          description: 'Filter by specific student'
        },
        {
          name: 'courseId',
          in: 'query',
          schema: { type: 'string' },
          description: 'Filter by specific course'
        }
      ],
      responses: {
        200: {
          description: '✅ Success - List of enrollments',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Enrollments retrieved successfully' },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Enrollment' }
                  },                                   
                  meta: {
                    type: 'object',
                    properties: {
                      count: { type: 'integer', example: 20 },
                      page: { type: 'integer', example: 1 },
                      limit: { type: 'integer', example: 10 },
                      total: { type: 'integer', example: 200 },
                      totalPages: { type: 'integer', example: 20 }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['✅ Enrollments'],
      summary: '➕ Enroll Student in Course',
      description: 'Create a new enrollment record for a student in a specific course.',
      operationId: 'createEnrollment',
      requestBody: {
        required: true,
        description: 'Enrollment data',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['student', 'course'],
              properties: {
                student: {
                  type: 'string',
                  example: '64a1b2c3d4e5f67890123456',
                  description: 'Student ObjectId'
                },
                course: {
                  type: 'string',
                  example: '64c3d4e5f67890123456789',
                  description: 'Course ObjectId'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: '🎉 Created - Student enrolled successfully'
          , 
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SuccessResponse' }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' }
      }
    }
  }
};

module.exports = swaggerSpec;
