# React CRUD – Quản lý người dùng

## Kiểm thử
- Hiển thị danh sách người dùng từ API https://jsonplaceholder.typicode.com/users
- Tìm kiếm theo name hoặc username.
- Thêm, sửa, xóa người dùng; kiểm tra nút Hủy.
- Kiểm tra link đã deploy trên thiết bị khác.

## Cấu trúc
App quản lý kw, newUser. SearchForm và AddUser gửi dữ liệu lên App qua callback props. ResultTable nhận keyword, user, onAdded và quản lý danh sách. UserForm được tái sử dụng trong AddUser và ResultTable.

Lưu ý: Thao tác CRUD chỉ thay đổi React State theo yêu cầu bài tập; tải lại trang sẽ lấy lại dữ liệu ban đầu. Không cần npm hoặc backend riêng. Không mở index.html trực tiếp bằng file://; hãy sử dụng Live Server hoặc hosting HTTP(S).
