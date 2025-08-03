# 🛡️ User Auth System (OTP + JWT + Redis + Swagger)

This project is a robust backend system for user registration and login using OTP, built with Node.js, Express, Sequelize, MySQL, Redis, and JWT.

## 📦 Features

- User registration via OTP (One-Time Password)
- OTP stored securely in Redis with TTL
- User login via email or username
- JWT token generation and validation
- Profile update with address
- Swagger documentation

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL (via Sequelize ORM)
- **Auth**: JWT + OTP
- **Cache/OTP Store**: Redis
- **Docs**: Swagger (OpenAPI 3.0)

## 📚 API Endpoints

### 🔐 Auth & Registration

| Method | Endpoint         | Description                              |
|--------|------------------|------------------------------------------|
| POST   | `/register`      | Register a new user & send OTP           |
| POST   | `/verifyOtp`     | Verify OTP and activate user account     |
| POST   | `/requestNewOtp` | Request a new OTP (if old one expired)   |
| POST   | `/login`         | Login with email or username             |

---

### 👤 User Features

| Method | Endpoint       | Description                                      |
|--------|----------------|--------------------------------------------------|
| POST   | `/update/:id`  | Update user profile and address (JWT required)  |


## 🙌 Credits
Built with ❤️ by **Vraj Gautam**
