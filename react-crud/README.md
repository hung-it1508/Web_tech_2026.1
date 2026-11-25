# React CRUD – Quản lý người dùng

## Chạy trên máy
1. Giải nén ZIP và mở thư mục chứa index.html bằng VS Code.
2. Cài extension Live Server (Ritwick Dey).
3. Chuột phải index.html → Open with Live Server.
4. Cần kết nối Internet để tải React, Babel và dữ liệu từ JSONPlaceholder.

## Hosting miễn phí bằng GitHub Pages
1. Đăng nhập https://github.com/new và tạo repository Public tên react-crud.
2. Upload index.html, app.jsx, style.css (và README.md nếu muốn) trực tiếp vào thư mục gốc repository, rồi Commit changes.
3. Vào Settings → Pages → Source: Deploy from a branch → main → /(root) → Save.
4. Sau khi triển khai thành công, mở Settings → Pages → Visit site.
   Link dự kiến: https://TEN-TAI-KHOAN.github.io/react-crud/

## Kiểm thử
- Hiển thị danh sách người dùng từ API https://jsonplaceholder.typicode.com/users
- Tìm kiếm theo name hoặc username.
- Thêm, sửa, xóa người dùng; kiểm tra nút Hủy.
- Kiểm tra link đã deploy trên thiết bị khác.

## Cấu trúc
App quản lý kw, newUser. SearchForm và AddUser gửi dữ liệu lên App qua callback props. ResultTable nhận keyword, user, onAdded và quản lý danh sách. UserForm được tái sử dụng trong AddUser và ResultTable.

Lưu ý: Thao tác CRUD chỉ thay đổi React State theo yêu cầu bài tập; tải lại trang sẽ lấy lại dữ liệu ban đầu. Không cần npm hoặc backend riêng. Không mở index.html trực tiếp bằng file://; hãy sử dụng Live Server hoặc hosting HTTP(S).
