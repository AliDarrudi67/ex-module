# ---------- مرحله 1: ساخت پروژه Angular ----------
FROM node:20-alpine AS builder

# ست کردن مسیر کاری
WORKDIR /app

# فقط package* را کپی کن
COPY package*.json ./

# نصب وابستگی‌ها
RUN npm install --legacy-peer-deps
RUN npm install react react-dom --save --force


# کپی کل پروژه
COPY . .

# بیلد گرفتن
RUN npm run build --prod


# ---------- مرحله 2: اجرای خروجی با NGINX ----------
FROM nginx:alpine

# پاک کردن فایل‌های پیش‌فرض NGINX
RUN rm -rf /usr/share/nginx/html/*

# کپی خروجی Angular به NGINX
COPY --from=builder /app/dist/my-angular18-project/browser /usr/share/nginx/html/
# کپی فایل default.conf به کانتینر
COPY default.conf /etc/nginx/conf.d/default.conf

# اکسپوز پورت 80
EXPOSE 80

# اجرای سرور
CMD ["nginx", "-g", "daemon off;"]
