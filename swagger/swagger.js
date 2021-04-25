const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BootCamp Express API Documentation",
      version: "1.0.0",
      description:
        "This is sample application that use for manage the Bootcamps.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Rasika Gayan",
        email: "rasikagayan90@gmail.com",
      },
    },
    servers: [
      {
        url:
          "http://ec2-54-254-152-51.ap-southeast-1.compute.amazonaws.com/bootcamp/api/v1",
      },
    ],
    tags: [
      {
        name: "Auth",
        description:
          "User authentication and authorization management API endpoints",
      },
      {
        name: "Bootcamps",
        description: "Bootcamp management API endpoints",
      },
      {
        name: "Courses",
        description: "Courses management API endpoints",
      },
      {
        name: "Reviews",
        description: "Reviews management API endpoints",
      },
      {
        name: "Subscribes",
        description: "Subscribes management API endpoints",
      },
      {
        name: "Users",
        description: "User Management API endpoints",
      },
    ],
    paths: {
      "/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Create a new user",
          responses: {},
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    name: {
                      type: "string",
                      description: "user name",
                    },
                    email: {
                      type: "string",
                      description: "user email",
                    },
                    password: {
                      type: "string",
                      description: "user password",
                    },
                    role: {
                      type: "string",
                      description: "user role",
                    },
                  },
                },
              },
            },
            description:
              "Send a user object to save it as a new user for the system",
            required: true,
          },
        },
      },
      "/auth/login": {
        post: {
          responses: {},
          tags: ["Auth"],
          summary: "Get the JWT token to login to system",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    email: {
                      type: "string",
                      description: "user email",
                    },
                    password: {
                      type: "string",
                      description: "user password",
                    },
                  },
                },
              },
            },
            description:
              "Access to system you need to get a JWT token. Request a token by sending email and password",
            required: true,
          },
        },
      },
      "/auth/logout": {
        get: {
          responses: {},
          tags: ["Auth"],
          summary: "Logout user and expire JWT token",
          description: "Logout user and expire JWT token",
        },
      },
      "/auth/me": {
        get: {
          responses: {},
          tags: ["Auth"],
          summary: "Get current logged in user",
          description: "Get current logged in user",
        },
      },
      "/auth/confirmemail": {
        get: {
          responses: {},
          tags: ["Auth"],
          summary: "Confirm user email.",
        },
      },
      "/auth/updatedetails": {
        put: {
          responses: {},
          tags: ["Auth"],
          summary: "Update user details",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    name: {
                      type: "string",
                      description: "user name",
                    },
                    email: {
                      type: "string",
                      description: "user email",
                    },
                  },
                },
              },
            },
            required: true,
          },
        },
      },
      "/auth/updatepassword": {
        put: {
          responses: {},
          tags: ["Auth"],
          summary: "Update user password",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    newPassword: {
                      type: "string",
                      description: "user name",
                    },
                  },
                },
              },
            },
            required: true,
          },
        },
      },
      "/auth/forgotpassword": {
        post: {
          responses: {},
          tags: ["Auth"],
          summary: "reset forget password by email link redirection",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    email: {
                      type: "string",
                      description: "user name",
                    },
                  },
                },
              },
            },
            required: true,
          },
        },
      },
      "/auth/resetpassword/{resettoken}": {
        put: {
          responses: {},
          tags: ["Auth"],
          summary: "password reset token submit",
          parameters: [
            {
              name: "resettoken",
              in: "path",
              description: "reset token",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    password: {
                      type: "string",
                      description: "user name",
                    },
                  },
                },
              },
            },
            required: true,
          },
        },
      },
      "/bootcamps": {
        get: {
          tags: ["Bootcamps"],
          summary: "Get all bootcamps",
          produces: ["application/json", "application/xml"],
          responses: {},
        },
        post: {
          responses: {},
          tags: ["Bootcamps"],
          summary: "Create a bootcamp",
          security: {
            bearerAuth: {
              type: "http",
              schema: "bearer",
              bearerFormat: "JWT",
            },
          },
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "description", "address", "careers"],
                  properties: {
                    name: {
                      type: "string",
                      description: "Bootcamp name",
                    },
                    description: {
                      type: "string",
                      description: "Bootcamp description",
                    },
                    address: {
                      type: "string",
                      description: "Bootcamp address",
                    },
                    careers: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            description:
              "Send a user object to save it as a new user for the system",
            required: true,
          },
          responses: {},
        },
      },
      "/bootcamps/{id}": {
        get: {
          responses: {},
          tags: ["Bootcamps"],
          summary: "Get bootcamp by id",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "bootcamp id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
        },
        put: {
          responses: {},
          tags: ["Bootcamps"],
          summary: "Update bootcamp by id",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "bootcamp id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "description", "address", "careers"],
                  properties: {
                    name: {
                      type: "string",
                      description: "Bootcamp name",
                    },
                    description: {
                      type: "string",
                      description: "Bootcamp description",
                    },
                    address: {
                      type: "string",
                      description: "Bootcamp address",
                    },
                    careers: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            description:
              "Send a user object to save it as a new user for the system",
            required: true,
          },
        },
        delete: {
          responses: {},
          tags: ["Bootcamps"],
          summary: "Get bootcamp by id",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "bootcamp id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
        },
      },
      "/bootcamps/{bootcampId}/courses": {
        get: {
          responses: {},
          tags: ["Bootcamps"],
          summary: "Get bootcamp courses by bootcamp id",
          parameters: [
            {
              name: "bootcampId",
              in: "path",
              description: "bootcamp id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
        },
        post: {
          responses: {},
          tags: ["Bootcamps"],
          summary: "Add course to a bootcamp",
          parameters: [
            {
              name: "bootcampId",
              in: "path",
              description: "bootcamp id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: [
                    "title",
                    "description",
                    "weeks",
                    "tuition",
                    "minimumSkill",
                  ],
                  properties: {
                    title: {
                      type: "string",
                      description: "Course title",
                    },
                    description: {
                      type: "string",
                      description: "Course description",
                    },
                    weeks: {
                      type: "string",
                      description: "Course duration in weeks",
                    },
                    tuition: {
                      type: "number",
                      description: "Course tuition cost",
                    },
                    minimumSkill: {
                      type: "string",
                      description: "minimum skill level",
                      enum: ["beginner", "intermediate", "advanced"],
                    },
                  },
                },
              },
            },
            description:
              "Send a user object to save it as a new user for the system",
            required: true,
          },
        },
      },
      "/bootcamps/{bootcampId}/reviews": {
        get: {
          responses: {},
          tags: ["Bootcamps"],
          summary: "Get all reviews for a bootcamp",
          parameters: [
            {
              name: "bootcampId",
              in: "path",
              description: "bootcamp id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
        },
        post: {
          responses: {},
          tags: ["Bootcamps"],
          summary: "Add review for a bootcamp",
          parameters: [
            {
              name: "bootcampId",
              in: "path",
              description: "bootcamp id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title", "text", "rating"],
                  properties: {
                    title: {
                      type: "string",
                      description: "Bootcamp name",
                    },
                    text: {
                      type: "string",
                      description: "Bootcamp description",
                    },
                    rating: {
                      type: "number",
                      description: "Bootcamp address",
                    },
                  },
                },
              },
            },
            description:
              "Send a user object to save it as a new user for the system",
            required: true,
          },
        },
      },
      "/bootcamps/{bootcampId}/subscribes": {
        post: {
          responses: {},
          tags: ["Bootcamps"],
          summary:
            "Subscribe a bootcamp. First, you need to subscribe a bootcamp to review it",
          parameters: [
            {
              name: "bootcampId",
              in: "path",
              description: "bootcamp id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
        },
      },
      "/courses/{id}": {
        get: {
          responses: {},
          tags: ["Courses"],
          summary: "Get a course by course id",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "course id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
        },
        put: {
          responses: {},
          tags: ["Courses"],
          summary: "Update a course by course id",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "course id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: [
                    "title",
                    "description",
                    "weeks",
                    "tuition",
                    "minimumSkill",
                  ],
                  properties: {
                    title: {
                      type: "string",
                      description: "Course title",
                    },
                    description: {
                      type: "string",
                      description: "Course description",
                    },
                    weeks: {
                      type: "string",
                      description: "Course duration in weeks",
                    },
                    tuition: {
                      type: "number",
                      description: "Course tuition cost",
                    },
                    minimumSkill: {
                      type: "string",
                      description: "minimum skill level",
                      enum: ["beginner", "intermediate", "advanced"],
                    },
                  },
                },
              },
            },
            description:
              "Send a user object to save it as a new user for the system",
            required: true,
          },
        },
        delete: {
          responses: {},
          tags: ["Courses"],
          summary: "Delete a course by course id",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "course id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
        },
      },
      "/review/{id}": {
        get: {
          responses: {},
          tags: ["Reviews"],
          summary: "Get a review by review id",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "review id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
        },
        put: {
          responses: {},
          tags: ["Reviews"],
          summary: "Update review",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "review id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title", "text", "rating"],
                  properties: {
                    title: {
                      type: "string",
                      description: "Bootcamp name",
                    },
                    text: {
                      type: "string",
                      description: "Bootcamp description",
                    },
                    rating: {
                      type: "number",
                      description: "Bootcamp address",
                    },
                  },
                },
              },
            },
            description:
              "Send a user object to save it as a new user for the system",
            required: true,
          },
        },
        delete: {
          responses: {},
          tags: ["Reviews"],
          summary: "Delete a review by review id",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "review id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
        },
      },
      "/subscribes": {
        get: {
          responses: {},
          tags: ["Subscribes"],
          summary: "Get all subscribed bootcamps by logged in user",
        },
      },
      "subscriber/{id}": {
        delete: {
          responses: {},
          tags: ["Subscribes"],
          summary: "Delete a subscribe by it's id",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "subscribe id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
        },
      },
      "/users": {
        get: {
          responses: {},
          tags: ["Users"],
          description: "Get all application users. Need to be in Admin role.",
        },
        post: {
          responses: {},
          tags: ["Users"],
          description: "Create a user by admin.",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    name: {
                      type: "string",
                      description: "user name",
                    },
                    email: {
                      type: "string",
                      description: "user email",
                    },
                    password: {
                      type: "string",
                      description: "user password",
                    },
                    role: {
                      type: "string",
                      description: "user role",
                    },
                  },
                },
              },
            },
            description:
              "Send a user object to save it as a new user for the system",
            required: true,
          },
        },
      },
      "/users/{id}": {
        get: {
          responses: {},
          tags: ["Users"],
          summary: "Get a user by user id",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "user id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
        },
        put: {
          responses: {},
          tags: ["Users"],
          summary: "Update a user by user id",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "user id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    name: {
                      type: "string",
                      description: "user name",
                    },
                    email: {
                      type: "string",
                      description: "user email",
                    },
                    password: {
                      type: "string",
                      description: "user password",
                    },
                    role: {
                      type: "string",
                      description: "user role",
                    },
                  },
                },
              },
            },
            required: true,
          },
        },
        delete: {
          responses: {},
          tags: ["Users"],
          summary: "Delete user by user id",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "user id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        schema: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: {
    bearerAuth: [
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2E1MTRiNWQyYzEyYzc0NDliZTA0MyIsImlhdCI6MTYxNzQ0Nzk0NiwiZXhwIjoxNjIwMDM5OTQ2fQ.JexOe4JKyyEre-Jh2l_s4GBvgEtMb2n5RbWN4o2MTe4",
    ],
  },
  apis: [],
};

module.exports = options;
