# Sử dụng Node.js runtime làm hình ảnh gốc
FROM node:20-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép các file package.json và bun.lockb (nếu có)
COPY package*.json ./

# Cài đặt các phụ thuộc bằng bun
RUN npm install

# Sao chép phần còn lại của ứng dụng
COPY . .

RUN npm rebuild bcrypt --build-from-source

COPY .env .

# Build ứng dụng
RUN npm run build

# Tiết lộ cổng để truy cập vào ứng dụng
EXPOSE 9999

# Khởi động ứng dụng
CMD ["npm", "start"]

# # Sử dụng image Nginx làm base
# FROM nginx

# # Copy file index.html vào thư mục /usr/share/nginx/html
# COPY index.html /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]