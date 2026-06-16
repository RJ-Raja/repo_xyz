# Render Deployment Checklist

## Render settings

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

## Required backend environment variables

```env
NODE_ENV=production
FRONTEND_URL=https://your-vercel-frontend.vercel.app
MONGO_URI=your_mongodb_atlas_uri_with_encoded_password
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRES_IN=7d
OTP_EXPIRES_IN_MINUTES=10
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Optional SMTP environment variables

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_digit_gmail_app_password_without_spaces
SMTP_FROM=Auth App <your_email@gmail.com>
```

SMTP is optional for deployment. If SMTP variables are missing or invalid, the backend should still start after MongoDB connects. OTP email routes return:

```json
{
  "success": false,
  "message": "Email service is not configured. OTP cannot be sent."
}
```

## Why SMTP does not crash startup

The backend creates the Nodemailer transporter only when all SMTP variables are present. It does not call `transporter.verify()` during production startup. Missing SMTP config logs a warning and disables email features, so Render health checks can still pass.

MongoDB is still required. If MongoDB cannot connect, the server stops because the API depends on the database.

## MongoDB password encoding

If your MongoDB password contains special characters such as `@ # $ % : / ? & =`, encode the password before putting it in `MONGO_URI`.

Example:

```text
Original password: my@pass#123
Encoded password:  my%40pass%23123
```

Correct URI format:

```env
MONGO_URI=mongodb+srv://username:encodedPassword@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

## Deployment testing steps

1. Deploy the backend on Render with only the required variables.
2. Open `https://your-render-service.onrender.com/api/health`.
3. Confirm the response includes `"success": true` and `"emailService": "not_configured"` when SMTP is missing.
4. Try register or login. The API should return status `503` with the OTP email message instead of crashing.
5. Add the SMTP variables and redeploy.
6. Open `/api/health` again and confirm `"emailService": "configured"`.
7. Try register or login again and confirm the OTP email is sent.
