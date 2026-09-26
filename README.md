# VSTEP Master - Hệ Thống Khảo Thí & Luyện Thi VSTEP Toàn Diện

Hệ thống luyện thi và khảo thí năng lực tiếng Anh VSTEP 4 kỹ năng (Nghe, Đọc, Viết, Nói) theo chuẩn Bộ Giáo dục & Đào tạo.

---

## 🏗️ Cấu Trúc Mã Nguồn (Architecture)

Dự án được tổ chức theo mô hình Fullstack Clean Architecture:

* **step-app/**: Ứng dụng Frontend (React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Web Speech API, PDF.js, Mammoth.js).
* **step-backend/**: Máy chủ API Backend (C# ASP.NET Core .NET 10, Entity Framework Core, SQLite Database step.db, Dockerfile).

---

## 🚀 Hướng Dẫn Khởi Chạy Cục Bộ (Local Development)

### 1. Khởi chạy Backend C# (.NET 10)
`ash
cd vstep-backend
dotnet restore
dotnet run
`
* **API Service**: http://localhost:5000
* **Swagger OpenAPI Docs**: http://localhost:5000/swagger

### 2. Khởi chạy Frontend React (Vite)
`ash
cd vstep-app
npm install
npm run dev
`
* **Giao diện người dùng**: http://localhost:5173

---

## 🌐 Triển Khai Lên Đám Mây (Cloud Deployment)

* **Backend API**: Triển khai tự động bằng Docker container trên [Render.com](https://render.com) (Root Directory: step-backend).
* **Frontend SPA**: Triển khai trên [Vercel](https://vercel.com) hoặc [Netlify](https://netlify.com) (Root Directory: step-app).
