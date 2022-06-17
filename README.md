# Đồ án cuối kì môn Lập trình trên thiết bị di động
### Thông tin về đề tài:
- Tên đề tài: Phần mềm bán hàng (bán đồ ăn)
- App: Server Web Dashboard, ClientApp, ShipperApp
###### Các chức năng chính trong đề tài:
- Client
  - Đăng nhập
  - Đăng ký
  - Đặt hàng
  - Thanh toán
  - Xem chi tiết đơn hàng
  - Cập nhập thông tin
  - Đa ngôn ngữ
- Server
  - Đăng kí nhà hàng mới
  - Đăng nhặp nhà hàng cũ
  - Thêm món ăn
  - Xóa món ăn (nhớ xóa món ăn mới tạo)
  - Xem các đơn đặt hàng (xóa phải load lại bên user và chuyển vào mục order history)
  - Chấp nhận đơn hàng
- Shipper
	- Đăng nhập, đăng ký 
	- Danh sách các đơn cần ship
	- Shipper di chuyển và theo dõi shipper bên client
	- Cập nhật quảng đường tới nhà hàng, client trên google maps liên tục
	- Thể hiện các trạng thái đơn hàng: ACCEPT, READY-FOR-PICKUP, COMPLETE
	- Hoàn thành đơn hàng
	- Tính năng chỉ đường đi
	- Đăng xuất
### Thông tin nhóm:
###### Lớp
- SE346.M22.PMCL
###### Giảng viên hướng dẫn:
- Nguyễn Tấn Toàn
###### Thành viên trong nhóm 5
- Vũ Quang Huy 20521419
- Vũ Quốc Hùng 20521378
- Nguyễn Quốc Huy 20521404
- Huỳnh Minh Chí 20521130
- Võ Huỳnh Việt 16521436
### Link github:
- Link của ServerApp: https://github.com/Numb246/UberServer.git
- Link của ClientApp: https://github.com/Numb246/UberApp.git
- Link của ShipperApp: https://github.com/Numb246/UberAppShipper.git
### Link tải app:
- Tải các file APK [tại đây](https://drive.google.com/drive/folders/1DBVGRXw9NlZ3tqFwEVwtfdjsYBBONAd5?usp=sharing)
### Hướng dẫn cài đặt:
- Cài đặt các file apk của ứng dụng
  - Uber App: Dùng cho user để đặt hàng
  - Uber App Shipper: Dùng cho shipper để nhận đơn hàng
- Lưu ý:
  - Do chi phí duy trì google cloud (dùng cho tính năng google khá lớn) nên nếu tính năng google map không hoạt động (do hết hạn trial) vui lòng liên hệ với team qua email: 20521378@gm.uit.edu.vn
  - Tài khoản aws (Amazon Web Services) để chạy uber_app_shipper là: 
TK: 20521419@gm.uit.edu.vn
MK: Huy_24062002
  B1: Đăng nhập tài khoản aws trên trình duyệt
  B2: Chọn AWS Amplify
  B3: Chọn project Uber3
  B4: Launch Studio
  B5: Lấy mã local setup instructions (góc trái trên)
  B6: Chạy mã đã lấy trong project
