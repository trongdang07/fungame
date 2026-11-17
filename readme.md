# ĐÊM CHÁY PHỐ – Pick a Card

> Game rút bài tương tác dành cho một nhóm người chơi trên cùng một điện thoại.

## Tổng quan

Game gồm 4 bộ bài:

- **DEEP** – Câu hỏi sâu sắc về cảm xúc, suy nghĩ và bản thân.
- **FRIEND** – Câu hỏi về tình bạn, kỷ niệm và các mối quan hệ.
- **FUNNY** – Câu hỏi hài hước và tình huống vui nhộn.
- **CHALLENGE** – Những thử thách thú vị.

Bộ dữ liệu mặc định có 60 lá bài, gồm 15 lá cho mỗi chủ đề.

## Cách chơi

1. Mở `index.html`; game tự động xáo bộ bài.
2. Chạm vào bộ bài hoặc nút **Rút một lá**.
3. Chạm vào lá bài để lật và xem câu hỏi hoặc thử thách.
4. Trả lời hoặc thực hiện thử thách.
5. Bấm **Lá tiếp theo** để chuyển lượt.
6. Khi hết bài, bấm **Xáo lại** để bắt đầu vòng mới.

Lá đã rút không lặp lại trong cùng một ván. Nếu bỏ qua, nhóm có thể tự thống nhất hình phạt.

## Tính năng

- **📖 Luật chơi**: mở hướng dẫn nhanh ngay trong game.
- Hiệu ứng xáo và lật bài.
- Hỗ trợ câu hỏi dạng chữ và ảnh mặt trước.
- Không lặp lại lá bài trong cùng một ván.
- Xuất/nhập bộ bài bằng JSON.

## Cài đặt bộ bài

Mở `setup.html` hoặc bấm **⚙ Cài đặt** để thêm ảnh, nhập câu hỏi, sửa, đổi chủ đề, xóa lá bài và khôi phục 60 lá mẫu.

Ảnh mặt sau được cố định trong thư mục `img`:

```text
img/deep.jpg
img/funny.jpg
img/friends.jpg
img/challenge.jpg
```

## Lưu dữ liệu

Game **không cần Firebase**. Dữ liệu được lưu trong IndexedDB của trình duyệt trên thiết bị hiện tại. Dùng chức năng **Xuất JSON** để sao lưu hoặc chuyển bộ bài sang thiết bị khác.

## Chạy và triển khai

Đây là website HTML/CSS/JavaScript thuần. Có thể mở `index.html` trực tiếp hoặc triển khai toàn bộ thư mục lên GitHub Pages.

```text
index.html   Màn hình chơi
setup.html   Cài đặt và quản lý bộ bài
store.js     Lưu trữ bằng IndexedDB
style.css    Kiểu giao diện dùng chung
img/         Ảnh mặt sau các bộ bài
```
