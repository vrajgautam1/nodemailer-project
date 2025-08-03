# 📄 Project Architecture & Flow

## 🔐 Registration Flow

1. User registers using name, username, email, and company name
2. Server checks if user exists
   - If exists and active → returns error
   - If exists and inactive → prompts OTP verification
3. If new → user record is created (accStatus = "inactive")
4. OTP is generated, sent via email, and stored in Redis (TTL: 2 mins)

## ✅ OTP Verification

1. User submits OTP and email
2. Server checks:
   - Redis for OTP validity
   - If valid → updates accStatus = "active"
   - Sends password via email

## 🔓 Login Flow

1. User sends `cred` (email or username) + password
2. Server checks:
   - If user exists
   - If password matches
   - If accStatus is "active"
   - Generates JWT

## 🛠 Middleware

- JWT Auth Middleware to protect routes
- Validation using Joi for inputs

## 📦 Redis Usage

- Used for storing OTPs temporarily
- Key format: `otp:email`
- TTL: 2 minutes

## 📝 Notes

- OTP expiration handled using `ttl` from Redis
- Swagger docs live at `/api-docs`
