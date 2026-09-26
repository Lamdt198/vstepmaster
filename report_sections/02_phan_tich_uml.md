# CHƯƠNG 2. PHÂN TÍCH HỆ THỐNG VỚI UML

## 2.1. Biểu đồ Ca sử dụng tổng quan (Use Case Diagram)

### 2.1.1. Bối cảnh và Mô tả Tác nhân
Mô hình hóa Ca sử dụng (Use Case Modeling) là phương pháp trực quan hóa yêu cầu chức năng từ góc nhìn của các tác nhân (Actors) tương tác với hệ thống. Trong hệ thống **VSTEP Master**, dựa trên khảo sát nghiệp vụ thực tế, có 3 tác nhân tham gia:

1. **Học viên (Student / Candidate):** Tác nhân chính (Primary Actor), sử dụng hệ thống để thực hiện các hoạt động học tập, luyện tập 4 kỹ năng (Nghe, Đọc, Viết, Nói), thi thử toàn diện 180 phút, tải lên đề thi cá nhân (Custom Test) và học từ vựng qua Flashcards.
2. **Quản trị viên (Administrator):** Tác nhân quản trị (Secondary Actor), chịu trách nhiệm vận hành hệ thống, quản lý ngân hàng đề thi chuẩn, cập nhật danh mục từ vựng và giám sát dữ liệu tài khoản người dùng.
3. **Phân hệ Trí tuệ nhân tạo (AI Engine):** Tác nhân hệ thống ngoài (External System Actor), cung cấp năng lực phân tích ngôn ngữ tự nhiên, đóng vai trò giám khảo ảo tự động chấm điểm và đánh giá chi tiết bài thi tự luận.

### 2.1.2. Biểu đồ Ca sử dụng Tổng quan
Biểu đồ Ca sử dụng tổng quan thể hiện cấu trúc phân rã các gói chức năng và mối quan hệ giữa các tác nhân với các ca sử dụng.

*(Tham chiếu minh họa: **Hình 2.1: Biểu đồ Ca sử dụng tổng quan hệ thống VSTEP Master** - Nguồn tệp: `diagrams/01_use_case_diagram.puml`)*

**Bình luận kiến trúc:**
* Quan hệ **«include»**: Ca sử dụng *"Luyện tập Writing"* và *"Thi thử Mock Test 180 phút"* bắt buộc bao gồm ca sử dụng *"AI Chấm điểm Tự luận"* khi thí sinh thực hiện phần thi tự luận. Phân hệ AI Engine là tác nhân thứ cấp hỗ trợ thực thi ca sử dụng này.
* Quan hệ **«extend»**: Ca sử dụng *"Tra cứu từ điển CEFR"* là điểm mở rộng linh hoạt của ca sử dụng *"Luyện tập Reading"*, cho phép học viên tra nghĩa từ vựng bất kỳ lúc nào ngay trong ngữ cảnh bài đọc mà không làm gián đoạn bài làm.

---

## 2.2. Đặc tả chi tiết các Ca sử dụng cốt lõi (Use Case Specifications)

Để làm cơ sở vững chắc cho quá trình thiết kế hướng đối tượng và cài đặt kiểm thử, 8 Ca sử dụng trọng tâm của hệ thống được đặc tả chi tiết dưới dạng bảng chuẩn hóa theo cấu trúc bài giảng:

### 2.2.1. Ca sử dụng UC-01: Đăng nhập và Xác thực tài khoản
* **Mã Use Case:** `UC-01`
* **Tên Use Case:** Đăng nhập và Xác thực tài khoản (Authentication)
* **Tác nhân chính:** Học viên (Student), Quản trị viên (Administrator)
* **Mục đích:** Xác thực danh tính người dùng bằng tên đăng nhập và mật khẩu thông thường, cấp quyền truy cập các tính năng tương ứng.
* **Tiền điều kiện:** Người dùng đã có tài khoản tồn tại trong hệ thống.
* **Hậu điều kiện:** Người dùng được chuyển hướng vào giao diện chính tương ứng với quyền hạn (`user` hoặc `admin`), thông tin phiên làm việc được lưu giữ.

#### Bảng đặc tả kịch bản UC-01:
| Bước | Tác nhân (Actor) | Phản ứng của Hệ thống (System Response) | Dữ liệu / Trạng thái |
|:---:|:---|:---|:---|
| 1 | Người dùng truy cập trang Đăng nhập và điền thông tin (Username, Password). | Hệ thống lắng nghe sự kiện nhập liệu trên form. | Dữ liệu chuỗi ký tự |
| 2 | Người dùng nhấn nút **"Đăng nhập"**. | Hệ thống khóa nút đăng nhập tạm thời, kiểm tra tính hợp lệ của dữ liệu đầu vào (không được để trống). | Validation Client |
| 3 | - | Hệ thống truy vấn xác thực tài khoản và kiểm tra mật khẩu đã mã hóa. | Payload xác thực |
| 4 | - | Hệ thống xác thực thành công, xác định quyền hạn người dùng (Student hoặc Admin). | Vai trò người dùng |
| 5 | - | Hệ thống lưu thông tin phiên người dùng và chuyển hướng về trang Dashboard. | Phiên đăng nhập hoạt động |

* **Luồng thay thế (Alternate Flows):**
  - **A1 - Đăng nhập tài khoản Admin:** Nếu tài khoản có vai trò `admin`, hệ thống chuyển hướng vào giao diện Quản trị đề thi và người dùng.
* **Luồng ngoại lệ (Exception Flows):**
  - **E1 - Sai tên đăng nhập hoặc mật khẩu:** Hệ thống thông báo lỗi đỏ *"Tên đăng nhập hoặc mật khẩu không chính xác"*, giữ nguyên tên đăng nhập và xóa trống ô mật khẩu để người dùng nhập lại.
  - **E2 - Dữ liệu trống:** Hệ thống hiển thị cảnh báo đỏ ngay dưới trường dữ liệu bị bỏ trống.

---

### 2.2.2. Ca sử dụng UC-02: Luyện tập Kỹ năng Nghe (Listening)
* **Mã Use Case:** `UC-02`
* **Tên Use Case:** Luyện tập Kỹ năng Nghe (Listening Practice)
* **Tác nhân chính:** Học viên
* **Mục đích:** Cung cấp môi trường luyện nghe theo chuẩn đề thi VSTEP (Part 1, Part 2, Part 3), tích hợp trình phát audio và chấm trắc nghiệm tự động.
* **Tiền điều kiện:** Học viên đã đăng nhập và chọn một bài thi Nghe.
* **Hậu điều kiện:** Hệ thống chấm điểm tự động tức thì, hiển thị transcript, đáp án chi tiết và lưu kết quả vào lịch sử.

#### Bảng đặc tả kịch bản UC-02:
| Bước | Tác nhân (Actor) | Phản ứng của Hệ thống (System Response) | Dữ liệu / Trạng thái |
|:---:|:---|:---|:---|
| 1 | Học viên chọn bài luyện Nghe và nhấn "Bắt đầu làm bài". | Hệ thống tải cấu trúc đề thi, danh sách 35 câu hỏi và tài nguyên âm thanh tương ứng. | Cấu trúc đề thi Nghe |
| 2 | Học viên điều khiển trình phát âm thanh (Play/Pause, tua lại, chỉnh âm lượng). | Trình phát âm thanh phát luồng audio trực tuyến mượt mà. | Audio Stream HTML5 |
| 3 | Học viên đọc câu hỏi và click chọn đáp án trắc nghiệm (A, B, C hoặc D). | Hệ thống đánh dấu trực quan câu trả lời đã chọn, cập nhật trạng thái đã làm trên thanh điều hướng câu hỏi. | Danh sách đáp án tạm thời |
| 4 | Học viên kiểm tra lại bài và nhấn nút **"Nộp bài"**. | Hệ thống hiển thị hộp thoại xác nhận nộp bài (thông báo số câu đã làm/chưa làm). | Modal xác nhận |
| 5 | Học viên xác nhận đồng ý nộp bài. | Hệ thống khóa bài thi, kích hoạt chiến lược `ObjectiveScoringStrategy`, đối chiếu đáp án với Answer Key. | Thuật toán so khớp đáp án |
| 6 | - | Hệ thống tính toán điểm số thang 10, hiển thị bảng tổng kết số câu đúng/sai, bật tab xem Transcript toàn văn và giải thích. | Bảng kết quả + Transcript |
| 7 | - | Hệ thống ghi nhận kết quả bài làm vào cơ sở dữ liệu. | Bản ghi `SUBMISSIONS` |

* **Luồng ngoại lệ (Exception Flows):**
  - **E1 - Lỗi tải file âm thanh:** Nếu file audio không tải được do lỗi đường truyền, hệ thống hiển thị thông báo lỗi và cung cấp nút "Tải lại âm thanh".

---

### 2.2.3. Ca sử dụng UC-03: Luyện tập Kỹ năng Đọc (Reading)
* **Mã Use Case:** `UC-03`
* **Tên Use Case:** Luyện tập Kỹ năng Đọc và Tra cứu từ vựng (Reading Practice & Context Dictionary)
* **Tác nhân chính:** Học viên
* **Mục đích:** Cung cấp giao diện đọc song song 2 cột (Passage bên trái, câu hỏi bên phải) cho 4 bài đọc dài (40 câu), hỗ trợ tra từ điển trực tiếp trong ngữ cảnh.
* **Tiền điều kiện:** Học viên đã đăng nhập và truy cập phân hệ Luyện Đọc.
* **Hậu điều kiện:** Chấm điểm trắc nghiệm tức thì, hiển thị giải thích chi tiết cho từng câu hỏi.

#### Bảng đặc tả kịch bản UC-03:
| Bước | Tác nhân (Actor) | Phản ứng của Hệ thống (System Response) | Dữ liệu / Trạng thái |
|:---:|:---|:---|:---|
| 1 | Học viên lựa chọn đề thi Đọc hiểu. | Hệ thống hiển thị giao diện 2 cột: Cột trái chứa nội dung bài đọc (Passage 1-4), Cột phải chứa câu hỏi trắc nghiệm tương ứng. | Giao diện Split-view |
| 2 | Học viên bôi đen một từ/cụm từ mới trong bài đọc và chọn "Tra từ". | Hệ thống hiển thị popover tra nhanh từ điển: định nghĩa tiếng Anh/tiếng Việt, phiên âm IPA, cấp độ CEFR (B1, B2, C1) và ví dụ. | Popover từ điển CEFR |
| 3 | Học viên lựa chọn đáp án trắc nghiệm cho từng câu hỏi. | Hệ thống lưu lựa chọn vào bộ nhớ tạm, đồng bộ trạng thái màu sắc trên ma trận câu hỏi. | State câu trả lời |
| 4 | Học viên nhấn **"Nộp bài"** và xác nhận. | Hệ thống kích hoạt module chấm tự động, so khớp các đáp án đã chọn với `correct_option_id`. | Chấm điểm $<50$ms |
| 5 | - | Hệ thống hiển thị trang kết quả: Điểm số, phần trăm chính xác, highlight các câu đúng (xanh lá) và sai (đỏ), kèm lời giải chi tiết. | Kết quả trực quan |

* **Luồng thay thế (Alternate Flows):**
  - **A1 - Lưu từ vựng vào Flashcards:** Khi tra từ trong popover, học viên bấm "Thêm vào sổ từ vựng", hệ thống tự động tạo một thẻ Flashcard tương ứng trong tài khoản.

---

### 2.2.4. Ca sử dụng UC-04: Luyện tập Kỹ năng Viết và AI Chấm điểm Tự động
* **Mã Use Case:** `UC-04`
* **Tên Use Case:** Luyện tập Viết với AI Chấm điểm (AI-Powered Writing Practice)
* **Tác nhân chính:** Học viên, Phân hệ AI Engine (Tác nhân ngoài)
* **Mục đích:** Cung cấp môi trường viết luận Task 1 (Thư điện tử $\ge 120$ từ) và Task 2 (Luận học thuật $\ge 250$ từ), đếm từ tự động, gửi tới AI Engine để chấm điểm và sửa lỗi chi tiết theo chuẩn VSTEP/CEFR.
* **Tiền điều kiện:** Học viên đã đăng nhập và truy cập phân hệ Luyện Viết.
* **Hậu điều kiện:** Nhận kết quả đánh giá toàn diện gồm điểm số thang 10, xếp bậc B1/B2/C1, nhận xét 4 tiêu chí, danh sách lỗi ngữ pháp và bài mẫu nâng cao.

#### Bảng đặc tả kịch bản UC-04:
| Bước | Tác nhân (Actor) | Phản ứng của Hệ thống (System Response) | Dữ liệu / Trạng thái |
|:---:|:---|:---|:---|
| 1 | Học viên chọn đề bài Viết (Task 1 hoặc Task 2). | Hệ thống hiển thị đề bài, yêu cầu độ dài, tiêu chí chấm và khung soạn thảo văn bản. | Đề bài Viết |
| 2 | Học viên gõ nội dung bài viết vào trình soạn thảo. | Bộ đếm từ thời gian thực (Real-time Word Counter) cập nhật liên tục số lượng từ đã gõ và cảnh báo độ dài tối thiểu. | Bộ đếm từ ngữ cảnh |
| 3 | Học viên hoàn tất bài viết và nhấn nút **"AI Chấm điểm"**. | Hệ thống khóa ô soạn thảo, hiển thị thanh tiến trình xử lý (Spinner / Shimmer effect), ngăn chặn người dùng bấm gửi liên tục. | Khóa trạng thái form |
| 4 | - | Hệ thống tiền xử lý: kiểm tra độ dài bài viết ($\ge 30$ từ), đóng gói Payload bài viết kèm Rubric VSTEP. | Payload chuẩn hóa |
| 5 | - | Hệ thống gọi qua lớp `AIAdapter` để gửi yêu cầu phân tích tới Phân hệ AI Engine. | Yêu cầu phân tích AI |
| 6 | - | Phân hệ AI Engine phân tích ngữ pháp, từ vựng, tính liên kết, hoàn thành yêu cầu đề bài; trả về kết quả cấu trúc JSON. | Chuỗi JSON kết quả |
| 7 | - | Hệ thống bóc tách JSON, hiển thị Thẻ điểm tổng thể (Score Card), Bậc CEFR, Biểu đồ thanh 4 tiêu chí, Danh sách lỗi kèm gợi ý sửa và Bài mẫu tham khảo. | Giao diện Bảng điểm AI |
| 8 | - | Hệ thống tự động ghi bản ghi vào bảng `SUBMISSIONS` và `AI_EVALUATION_RESULTS`. | Lưu trữ cơ sở dữ liệu |

* **Luồng ngoại lệ (Exception Flows):**
  - **E1 - Bài viết quá ngắn:** Nếu bài viết dưới 30 từ, hệ thống hiển thị thông báo lỗi: *"Bài viết của bạn quá ngắn (dưới 30 từ) để AI có thể đánh giá chính xác. Vui lòng phát triển thêm ý tưởng."* và giữ nguyên bài làm.
  - **E2 - Lỗi kết nối AI:** Nếu dịch vụ AI bị gián đoạn, hệ thống bắt ngoại lệ, hiển thị thông báo thân thiện và cho phép học viên gửi lại.

---

### 2.2.5. Ca sử dụng UC-05: Luyện tập Kỹ năng Nói (Speaking)
* **Mã Use Case:** `UC-05`
* **Tên Use Case:** Luyện tập Kỹ năng Nói (Speaking Practice)
* **Tác nhân chính:** Học viên
* **Mục đích:** Cung cấp môi trường luyện nói theo 3 phần thi VSTEP (Tương tác xã hội, Thảo luận giải pháp, Phát triển chủ đề), hỗ trợ bộ đếm giờ chuẩn bị/trình bày và ghi âm qua micro.
* **Tiền điều kiện:** Học viên đã đăng nhập và cấp quyền truy cập Microphone cho trình duyệt.
* **Hậu điều kiện:** Tệp ghi âm được lưu trữ, hệ thống cung cấp dàn ý gợi ý, từ vựng nâng cao và câu trả lời mẫu tham khảo.

#### Bảng đặc tả kịch bản UC-05:
| Bước | Tác nhân (Actor) | Phản ứng của Hệ thống (System Response) | Dữ liệu / Trạng thái |
|:---:|:---|:---|:---|
| 1 | Học viên chọn phần thi Nói (Part 1, Part 2 hoặc Part 3). | Hệ thống hiển thị câu hỏi, hình ảnh sơ đồ gợi ý (mindmap) và cấu trúc thời gian quy định. | Dữ liệu đề thi Nói |
| 2 | Học viên nhấn "Bắt đầu thời gian chuẩn bị". | Hệ thống kích hoạt đồng hồ đếm ngược thời gian chuẩn bị (1 phút đối với Part 2 & Part 3). | Đồng hồ đếm chuẩn bị |
| 3 | Học viên nhấn nút **"Bắt đầu Ghi âm"** và trình bày bài nói. | Hệ thống yêu cầu quyền Micro (nếu chưa có), kích hoạt `MediaRecorder API`, hiển thị sóng âm thanh động và đếm thời gian nói. | Luồng Audio Blob |
| 4 | Học viên kết thúc bài nói và nhấn **"Dừng ghi âm"**. | Hệ thống dừng ghi âm, hiển thị trình phát audio để học viên nghe lại bài nói của chính mình. | Audio Player |
| 5 | Học viên nhấn "Xem phân tích và bài mẫu". | Hệ thống hiển thị dàn bài phát triển ý, danh mục từ vựng học thuật nên dùng và bài nói mẫu chuẩn C1. | Dữ liệu phản hồi học tập |

* **Luồng ngoại lệ (Exception Flows):**
  - **E1 - Người dùng từ chối quyền Micro:** Hệ thống hiển thị modal hướng dẫn người dùng bật quyền truy cập Microphone trên thanh địa chỉ trình duyệt.

---

### 2.2.6. Ca sử dụng UC-06: Thi thử VSTEP Mock Test toàn diện 180 phút
* **Mã Use Case:** `UC-06`
* **Tên Use Case:** Thi thử VSTEP toàn diện (Comprehensive Mock Test 180m)
* **Tác nhân chính:** Học viên, Phân hệ AI Engine
* **Mục đích:** Mô phỏng phòng thi thật với 4 kỹ năng liên tục trong 180 phút, đồng hồ đếm ngược cưỡng chế, tự động thu bài khi hết giờ và phân nhánh chấm điểm tự động.
* **Tiền điều kiện:** Học viên đã đăng nhập và nhấn bắt đầu thi thử.
* **Hậu điều kiện:** Toàn bộ bài làm được lưu trữ, điểm trắc nghiệm có ngay, bài tự luận được chấm bởi AI, học viên nhận Bảng điểm tổng hợp 4 kỹ năng chuẩn VSTEP.

#### Bảng đặc tả kịch bản UC-06:
| Bước | Tác nhân (Actor) | Phản ứng của Hệ thống (System Response) | Dữ liệu / Trạng thái |
|:---:|:---|:---|:---|
| 1 | Học viên chọn đề thi thử và nhấn **"Bắt đầu thi thử"**. | Hệ thống khởi tạo phiên làm bài thi mới (`test_session`), kích hoạt đồng hồ đếm ngược từ 180:00. | Trạng thái `IN_PROGRESS` |
| 2 | Học viên làm bài lần lượt qua các kỹ năng: Listening (40p) $\to$ Reading (60p) $\to$ Writing (60p) $\to$ Speaking (12p). | Hệ thống liên tục ghi nhận dữ liệu đáp án và bài viết vào Local Storage theo thời gian thực để chống mất dữ liệu. | Tự động lưu tiến độ |
| 3 | Đồng hồ đếm ngược hiển thị cố định trên thanh tiêu đề. | Khi còn 10 phút và 5 phút, hệ thống hiển thị thông báo nhắc nhở thời gian. | Cảnh báo thời gian thi |
| 4 | **Trường hợp A:** Học viên chủ động bấm nút "Nộp bài".<br>**Trường hợp B:** Đồng hồ đếm ngược về 00:00. | Hệ thống lập tức khóa toàn bộ giao diện làm bài, ngăn chặn mọi thao tác chỉnh sửa thêm của thí sinh. | Trạng thái `SUBMITTED` |
| 5 | - | Hệ thống kích hoạt quy trình chấm phân nhánh:<br>a) Phần trắc nghiệm (Nghe, Đọc): chấm ngay qua bộ đáp án chuẩn.<br>b) Phần tự luận (Viết): chuyển trạng thái `AI_EVALUATING`, gọi AI Engine chấm điểm. | Xử lý chấm điểm song song |
| 6 | - | Hệ thống tổng hợp điểm số 4 kỹ năng theo công thức trung bình cộng, xác định bậc chứng chỉ (B1, B2, C1) và hiển thị Bảng điểm điện tử toàn diện. | Trạng thái `COMPLETED` |

* **Luồng ngoại lệ (Exception Flows):**
  - **E1 - Mất kết nối mạng hoặc tắt trình duyệt đột ngột:** Khi học viên mở lại trang web, hệ thống khôi phục nguyên vẹn các đáp án đã chọn và văn bản đã soạn thảo từ bộ nhớ tạm, tiếp tục đếm ngược thời gian tương ứng.

---

### 2.2.7. Ca sử dụng UC-07: Bóc tách Đề thi tùy biến từ file Word và PDF (Custom Test)
* **Mã Use Case:** `UC-07`
* **Tên Use Case:** Bóc tách Đề thi từ tệp Word / PDF (Document Parser)
* **Tác nhân chính:** Học viên
* **Mục đích:** Cho phép người dùng tải lên đề thi có sẵn từ máy tính định dạng `.docx` hoặc `.pdf`, hệ thống tự động bóc tách thành bài thi trắc nghiệm trực tuyến để luyện tập ngay.
* **Tiền điều kiện:** Học viên đã đăng nhập và chuẩn bị sẵn tệp đề thi hợp lệ.
* **Hậu điều kiện:** Đề thi được bóc tách hiển thị trực quan trên giao diện làm bài thi trực tuyến.

#### Bảng đặc tả kịch bản UC-07:
| Bước | Tác nhân (Actor) | Phản ứng của Hệ thống (System Response) | Dữ liệu / Trạng thái |
|:---:|:---|:---|:---|
| 1 | Học viên truy cập phân hệ "Tự tạo đề thi (Custom Test)". | Hệ thống hiển thị khu vực kéo thả tệp tải lên (Drag & Drop Zone), hỗ trợ định dạng `.docx` và `.pdf`. | Giao diện Tải lên tệp |
| 2 | Học viên kéo thả hoặc chọn tệp đề thi từ máy tính. | Hệ thống kiểm tra dung lượng ($\le 15$MB) và phần mở rộng của tệp tải lên. | Kiểm tra định dạng tệp |
| 3 | - | Module `DocumentParser` đọc luồng nhị phân, trích xuất văn bản thô, áp dụng biểu thức chính quy (Regex Pattern Matching) để nhận diện cấu trúc câu hỏi và các phương án A, B, C, D. | Thuật toán bóc tách văn bản |
| 4 | - | Hệ thống hiển thị màn hình xem trước (Preview): thống kê số lượng câu hỏi nhận diện được, cho phép học viên chỉnh sửa hoặc bổ sung đáp án đúng nếu cần. | Màn hình Preview đề thi |
| 5 | Học viên nhấn nút **"Bắt đầu làm bài thi này"**. | Hệ thống khởi tạo bài thi trực tuyến tương tự đề thi chuẩn, cho phép học viên làm bài và chấm điểm tự động. | Bài thi trực tuyến mới |

* **Luồng ngoại lệ (Exception Flows):**
  - **E1 - Tệp không đúng cấu trúc nhận diện:** Nếu tệp không chứa cấu trúc câu hỏi chuẩn (ví dụ tài liệu văn bản thuần túy không có A-B-C-D), hệ thống hiển thị thông báo hướng dẫn cấu trúc chuẩn và cung cấp tệp mẫu (Template).

---

### 2.2.8. Ca sử dụng UC-08: Học Từ vựng Flashcards & Tra cứu Từ điển CEFR
* **Mã Use Case:** `UC-08`
* **Tên Use Case:** Học Từ vựng Flashcards & Tra cứu Từ điển CEFR (Vocabulary Learning)
* **Tác nhân chính:** Học viên
* **Mục đích:** Hỗ trợ học viên củng cố vốn từ vựng học thuật VSTEP theo cấp độ CEFR (B1, B2, C1) thông qua thẻ ghi nhớ Flashcard tương tác 3D và tra cứu từ điển.
* **Tiền điều kiện:** Học viên đã đăng nhập vào hệ thống.
* **Hậu điều kiện:** Tiến độ ghi nhớ từ vựng của học viên được cập nhật vào hồ sơ cá nhân.

#### Bảng đặc tả kịch bản UC-08:
| Bước | Tác nhân (Actor) | Phản ứng của Hệ thống (System Response) | Dữ liệu / Trạng thái |
|:---:|:---|:---|:---|
| 1 | Học viên chọn chủ đề từ vựng và cấp độ CEFR (ví dụ: Academic Vocabulary - B2). | Hệ thống nạp danh sách các thẻ từ vựng thuộc chủ đề đã chọn. | Bộ thẻ từ vựng |
| 2 | Hệ thống hiển thị mặt trước của thẻ Flashcard: Từ tiếng Anh, phiên âm quốc tế IPA, loại từ và nút phát âm thanh mẫu. | Giao diện Thẻ 3D mặt trước |
| 3 | Học viên nhấn vào thẻ (hoặc bấm phím Space). | Hệ thống thực hiện hiệu ứng lật thẻ 3D xoay 180 độ, hiển thị mặt sau: Nghĩa tiếng Việt, câu ví dụ trong ngữ cảnh VSTEP và các từ đồng nghĩa (synonyms). | Giao diện Thẻ 3D mặt sau |
| 4 | Học viên đánh giá mức độ ghi nhớ bằng cách nhấn nút: "Chưa nhớ" (Đỏ) hoặc "Đã thuộc" (Xanh). | Hệ thống ghi nhận trạng thái từ, tự động chuyển sang thẻ tiếp theo và cập nhật thanh tiến trình hoàn thành. | Cập nhật thuật toán lặp |
| 5 | Học viên hoàn thành toàn bộ thẻ trong bộ. | Hệ thống hiển thị bảng thống kê: Số từ đã thuộc, số từ cần ôn lại và điểm thưởng kinh nghiệm. | Bảng tổng kết từ vựng |

---

### 2.2.9. Ca sử dụng UC-09: Quản lý Ngân hàng Đề thi & Phê duyệt Đề bóc tách
* **Mã Use Case:** `UC-09`
* **Tên Use Case:** Quản lý Ngân hàng Đề thi & Phê duyệt Đề bóc tách (Exam Bank & Parsed Exam Moderation)
* **Tác nhân chính:** Quản trị viên (Administrator)
* **Mục đích:** Cho phép Quản trị viên quản lý toàn diện các bộ đề thi chuẩn VSTEP 4 kỹ năng (thêm, sửa, xóa, cấu hình audio và answer key) và thực hiện thẩm định, phê duyệt các đề thi được bóc tách tự động từ tệp Word (.docx) hoặc PDF (.pdf) trước khi phát hành cho học viên.
* **Tiền điều kiện:** Quản trị viên đã đăng nhập thành công với vai trò `ROLE_ADMIN`.
* **Hậu điều kiện:** Bộ đề thi mới hoặc đề thi bóc tách đã được phê duyệt chuyển sang trạng thái `ACTIVE` (hoạt động), sẵn sàng phục vụ học viên luyện tập và thi thử.

#### Bảng đặc tả kịch bản UC-09:
| Bước | Tác nhân (Actor) | Phản ứng của Hệ thống (System Response) | Dữ liệu / Trạng thái |
|:---:|:---|:---|:---|
| 1 | Quản trị viên truy cập mục "Ngân hàng Đề thi & Duyệt đề" trên Admin Portal. | Hệ thống hiển thị bảng danh sách đề thi kèm số liệu thống kê (Tổng số đề, Đề chờ duyệt, Đề đã phát hành). | Danh sách đề thi |
| 2 | Quản trị viên chọn lọc danh sách "Chờ duyệt" và nhấn nút **"Đối soát"** tại một đề thi bóc tách. | Hệ thống mở giao diện Modal Đối soát chi tiết: hiển thị tệp nguồn gốc song song với danh sách câu hỏi, phương án A-B-C-D và đáp án do thuật toán bóc tách tự động nhận diện. | Modal Đối soát đề |
| 3 | Quản trị viên kiểm tra nội dung câu hỏi, chỉnh sửa các lỗi chính tả hoặc điều chỉnh đáp án đúng nếu thuật toán nhận diện sai sót. | Hệ thống cập nhật dữ liệu cấu trúc đề thi theo các trường chỉnh sửa thời gian thực. | Cấu trúc đề chuẩn hóa |
| 4 | Quản trị viên nhấn nút **"Phê duyệt"** (Approve). | Hệ thống cập nhật trạng thái đề thi từ `PENDING` sang `ACTIVE`, tự động ghi nhận vào Ngân hàng Đề thi chung. | Trạng thái `ACTIVE` |
| 5 | - | Hệ thống thông báo phê duyệt thành công, ghi nhận nhật ký thao tác (Audit Log) bao gồm Admin ID, Exam ID và thời gian phê duyệt. | Bản ghi Audit Log |

* **Luồng thay thế (Alternate Flows):**
  - **A1 - Từ chối đề bóc tách (Reject):** Ở bước 4, nếu đề thi chất lượng kém hoặc sai lệch cấu trúc VSTEP không thể khắc phục, Quản trị viên nhấn "Từ chối", nhập lý do từ chối; hệ thống xóa đề khỏi hàng đợi và lưu vết log.
  - **A2 - Thêm đề thi chuẩn mới thủ công:** Quản trị viên bấm "+ Thêm Đề thi Mới", điền thông tin 4 kỹ năng, tải lên file âm thanh MP3, dán Transcript và cấu hình Answer Key; hệ thống lưu trực tiếp vào CSDL.
* **Luồng ngoại lệ (Exception Flows):**
  - **E1 - Mất quyền Admin hoặc hết hạn phiên:** Hệ thống lập tức thu hồi quyền truy cập, hiển thị thông báo yêu cầu đăng nhập lại tài khoản Quản trị viên.

---

### 2.2.10. Ca sử dụng UC-10: Quản trị Người dùng & Cấu hình Tham số AI Engine
* **Mã Use Case:** `UC-10`
* **Tên Use Case:** Quản trị Người dùng & Cấu hình Tham số AI Engine (User Management & AI Configuration)
* **Tác nhân chính:** Quản trị viên (Administrator)
* **Mục đích:** Cung cấp công cụ quản lý tài khoản người dùng, phân quyền RBAC, giám sát nhật ký gian lận thi cử (Anti-cheating) và tinh chỉnh các tham số cốt lõi của mô hình AI Engine chấm điểm tự luận.
* **Tiền điều kiện:** Quản trị viên đã đăng nhập quyền `ROLE_ADMIN`.
* **Hậu điều kiện:** Dữ liệu tài khoản được cập nhật; các tham số cấu hình AI (model, temperature, prompt template, trọng số Rubric) có hiệu lực ngay lập tức cho toàn bộ các lượt nộp bài tiếp theo.

#### Bảng đặc tả kịch bản UC-10:
| Bước | Tác nhân (Actor) | Phản ứng của Hệ thống (System Response) | Dữ liệu / Trạng thái |
|:---:|:---|:---|:---|
| 1 | Quản trị viên truy cập tab "Cấu hình AI & Rubrics" trên giao diện Admin. | Hệ thống nạp thông số hiện hành: Mô hình AI (`gemini-1.5-pro`), Nhiệt độ (`0.2`), Trọng số 4 tiêu chí CEFR (mỗi tiêu chí 25%), Hạn ngạch API đã dùng trong ngày. | Dữ liệu cấu hình AI |
| 2 | Quản trị viên tinh chỉnh các tham số (ví dụ: điều chỉnh System Prompt, thay đổi model sang `gemini-1.5-flash` khi hệ thống quá tải). | Hệ thống kiểm tra tính hợp lệ của tham số đầu vào (tổng trọng số Rubric phải đủ 100%, nhiệt độ trong khoảng 0.0 - 1.0). | Client Validation |
| 3 | Quản trị viên nhấn **"Kiểm tra Kết nối API"** (Test Connection). | Hệ thống gửi request thử nghiệm mẫu tới dịch vụ AI ngoài; hiển thị trạng thái kết nối và độ trễ phản hồi (Latency: 1.85s). | Trạng thái kết nối AI |
| 4 | Quản trị viên nhấn **"Lưu Cấu hình AI"**. | Hệ thống đồng bộ thông số mới vào bộ nhớ đệm (Cache) và cơ sở dữ liệu hệ thống, áp dụng tức thì cho các lượt chấm tiếp theo. | Đồng bộ Cấu hình |
| 5 | Quản trị viên chuyển sang tab "Quản lý Người dùng & Giám sát". | Hệ thống hiển thị danh sách 12,450 tài khoản, phân loại vai trò (`ROLE_STUDENT`, `ROLE_ADMIN`) và nhật ký cảnh báo gian lận thi cử (chuyển tab, sao chép văn bản). | Bảng quản lý người dùng |
| 6 | Quản trị viên chọn một tài khoản vi phạm và nhấn **"Khóa tài khoản"**. | Hệ thống khóa quyền đăng nhập của người dùng đó, hủy phiên làm việc hiện tại và cập nhật trạng thái `IS_LOCKED = TRUE`. | Trạng thái tài khoản |

* **Luồng thay thế (Alternate Flows):**
  - **A1 - Mở khóa tài khoản (Unlock):** Quản trị viên chọn tài khoản đang bị khóa, xác nhận mở khóa; hệ thống phục hồi trạng thái hoạt động bình thường cho học viên.
* **Luồng ngoại lệ (Exception Flows):**
  - **E1 - Lỗi kết nối Google Gemini API:** Nếu API Key sai hoặc dịch vụ AI bị gián đoạn khi kiểm tra kết nối, hệ thống thông báo mã lỗi HTTP chi tiết và giữ nguyên cấu hình an toàn cũ.

---

## 2.3. Biểu đồ Hoạt động (Activity Diagram)

Biểu đồ hoạt động mô hình hóa quy trình động của nghiệp vụ **Thi thử VSTEP toàn diện 180 phút** và cơ chế phân nhánh chấm điểm tự động.

*(Tham chiếu minh họa: **Hình 2.2: Biểu đồ Hoạt động quy trình thi thử và chấm điểm tự động** - Nguồn tệp: `diagrams/02_activity_flow_mock_test.puml`)*

### Phân tích chi tiết luồng hoạt động:
1. **Khởi tạo và Phân nhánh song song (Fork):**
   - Khi thí sinh bắt đầu bài thi, hệ thống kích hoạt thanh rẽ nhánh song song (Fork Node).
   - Nhánh 1: Đồng hồ đếm ngược (Exam Timer) chạy ngầm độc lập với chu kỳ giảm 1 giây, liên tục kiểm tra điều kiện thời gian.
   - Nhánh 2: Thí sinh làm bài thi, tương tác với các câu hỏi trắc nghiệm và khung soạn thảo bài viết.
2. **Hội tụ (Join) và Thu bài:**
   - Khi xảy ra 1 trong 2 sự kiện: Thí sinh nhấn "Nộp bài" HOẶC Đồng hồ đếm về "00:00", luồng điều khiển hội tụ tại thanh Join Node. Hệ thống thực thi thao tác khóa đề thi ngay lập tức.
3. **Phân loại và Xử lý chấm điểm chuyên biệt (Decision Node):**
   - **Đối với phần thi Trắc nghiệm (Listening & Reading):** Hệ thống nạp danh sách đáp án thí sinh đã chọn, chuyển tới module so khớp `ObjectiveScoringStrategy`. Tốc độ chấm diễn ra gần như tức thì ($<50$ms).
   - **Đối với phần thi Tự luận (Writing & Speaking):** Hệ thống đóng gói nội dung bài viết và tiêu chí Rubric VSTEP gửi tới `AIAdapter`. Dịch vụ AI phân tích và trả về điểm số cùng nhận xét sửa lỗi.
4. **Tổng hợp kết quả:**
   - Hệ thống tính điểm trung bình cộng 4 kỹ năng trên thang 10, xác định bậc năng lực tương ứng theo chuẩn B1-B2-C1 của Bộ GD&ĐT, lưu kết quả vĩnh viễn và hiển thị bảng điểm trực quan cho thí sinh.

---

## 2.4. Biểu đồ Tuần tự (Sequence Diagram)

Biểu đồ tuần tự biểu diễn tương tác theo trình tự thời gian giữa các đối tượng trong hệ thống cho quy trình phức tạp nhất: **Học viên nộp bài Tự luận để AI Chấm điểm**.

*(Tham chiếu minh họa: **Hình 2.3: Biểu đồ Tuần tự quy trình AI Chấm điểm Tự luận** - Nguồn tệp: `diagrams/03_sequence_ai_scoring.puml`)*

### Phân tích chi tiết các thông điệp trao đổi (Messages):
1. `Candidate -> WritingUI: submitEssay(content, promptId)`: Học viên nhấn nút gửi bài luận trên giao diện.
2. `WritingUI -> WritingUI: validateWordCount(content)`: Giao diện kiểm tra độ dài bài viết. Nếu dưới 30 từ, thông báo lỗi ngay tại Client mà không gửi request lên Server nhằm tối ưu tài nguyên mạng.
3. `WritingUI -> AIScoringService: requestEvaluation(essayPayload)`: Gọi Service điều phối nghiệp vụ chấm tự luận.
4. `AIScoringService -> AIAdapter: generateEvaluation(prompt, essay)`: Sử dụng Adapter Pattern để chuẩn hóa dữ liệu trước khi gửi sang dịch vụ AI ngoài.
5. `AIAdapter -> AIEngine: POST /analyze (Payload + VSTEP Rubric)`: Gửi HTTP Request kèm quy tắc chấm điểm VSTEP sang dịch vụ AI Engine.
6. `AIEngine --> AIAdapter: Return Raw JSON Result`: AI Engine trả về kết quả phân tích thô dưới định dạng JSON.
7. `AIAdapter -> AIAdapter: parseAndValidateResponse(json)`: Bóc tách các trường dữ liệu: `overall_score`, `cefr_band`, `criteria_scores`, `grammar_errors`, `improved_sample`.
8. `AIAdapter --> AIScoringService: Return AIEvaluationResult`: Trả về đối tượng thực thể kết quả chuẩn hóa cho Application Service.
9. `AIScoringService -> Database: saveResult(submissionId, result)`: Lưu vết kết quả vào cơ sở dữ liệu để phục vụ tra cứu sau này.
10. `AIScoringService --> WritingUI: displayScoreCard(result)`: Trả kết quả về giao diện người dùng.
11. `WritingUI --> Candidate: Render Visual Feedback`: Hiển thị Thẻ điểm, lỗi sai ngữ pháp và bài mẫu nâng cao cho thí sinh.

---

## 2.5. Biểu đồ Máy trạng thái (State Machine Diagram)

Biểu đồ máy trạng thái biểu diễn vòng đời hoàn chỉnh của một phiên làm bài thi (`Exam Session / Submission`) từ khi khởi tạo đến khi lưu trữ.

*(Tham chiếu minh họa: **Hình 2.4: Biểu đồ Máy trạng thái vòng đời phiên làm bài thi** - Nguồn tệp: `diagrams/04_state_machine_exam.puml`)*

### Phân tích các trạng thái và điều kiện chuyển dịch (Transitions):
* **Trạng thái 1: `NOT_STARTED` (Chưa bắt đầu):** Bài thi đã được nạp cấu trúc câu hỏi từ ngân hàng đề, sẵn sàng cho thí sinh bắt đầu.
  - *Sự kiện chuyển dịch:* Thí sinh bấm "Bắt đầu làm bài" $\to$ Chuyển sang `IN_PROGRESS`.
* **Trạng thái 2: `IN_PROGRESS` (Đang làm bài):** Thí sinh tương tác với câu hỏi trắc nghiệm, gõ văn bản bài viết. Đồng hồ đếm ngược hoạt động. Trạng thái con `AUTO_SAVING` liên tục lưu tạm dữ liệu bài làm vào bộ nhớ cục bộ sau mỗi thao tác.
  - *Sự kiện chuyển dịch:* Thí sinh bấm "Nộp bài" HOẶC Hết giờ làm bài (Timeout) $\to$ Chuyển sang `SUBMITTED`.
* **Trạng thái 3: `SUBMITTED` (Đã thu bài):** Toàn bộ giao diện làm bài bị khóa cứng, ngăn chặn mọi sửa đổi. Hệ thống tiến hành phân tách các phần thi.
  - *Sự kiện chuyển dịch:* Kích hoạt ngay lập tức bộ so khớp đáp án trắc nghiệm $\to$ Chuyển sang `OBJECTIVE_SCORED`.
* **Trạng thái 4: `OBJECTIVE_SCORED` (Đã có điểm trắc nghiệm):** Điểm kỹ năng Nghe và Đọc đã được tính toán xong ($<50$ms).
  - *Sự kiện chuyển dịch:* Phát hiện có bài viết tự luận cần chấm $\to$ Gửi dữ liệu sang AI, chuyển sang `AI_EVALUATING`.
* **Trạng thái 5: `AI_EVALUATING` (AI đang chấm tự luận):** Hệ thống hiển thị thanh trạng thái đang phân tích ngôn ngữ.
  - *Sự kiện chuyển dịch:* AI Engine hoàn tất phân tích và trả kết quả hợp lệ $\to$ Chuyển sang `COMPLETED`.
* **Trạng thái 6: `COMPLETED` (Hoàn tất toàn diện):** Hệ thống tổng hợp toàn bộ điểm số 4 kỹ năng, quy đổi bậc CEFR, hoàn tất hiển thị kết quả cho học viên.
  - *Sự kiện chuyển dịch:* Sau khi hiển thị kết quả và người dùng rời trang $\to$ Chuyển sang `ARCHIVED`.
* **Trạng thái 7: `ARCHIVED` (Lưu trữ lịch sử):** Dữ liệu bài thi được đóng băng vĩnh viễn trong CSDL, phục vụ học viên xem lại lịch sử ôn tập.
