# CHƯƠNG 1. GIỚI THIỆU VÀ ĐẶC TẢ BÀI TOÁN

## 1.1. Lý do chọn đề tài và mục tiêu phát triển hệ thống

### 1.1.1. Bối cảnh thực tiễn và tính cấp thiết
Trong xu thế hội nhập quốc tế sâu rộng và chuẩn hóa chất lượng đào tạo đại học, sau đại học tại Việt Nam, Khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam (VSTEP - Vietnamese Standardized Test of English Proficiency) theo Thông tư số 01/2014/TT-BGDĐT của Bộ Giáo dục và Đào tạo đã trở thành một tiêu chuẩn bắt buộc. Các mốc bậc năng lực cốt lõi bao gồm: Bậc 3 (tương đương B1 CEFR) cho chuẩn đầu ra đại học không chuyên ngữ; Bậc 4 (tương đương B2 CEFR) cho chuẩn đầu vào/đầu ra cao học và giáo viên tiếng Anh tiểu học/THCS; Bậc 5 (tương đương C1 CEFR) cho giáo viên tiếng Anh THPT và giảng viên đại học.

Mặc dù nhu cầu thi lấy chứng chỉ VSTEP của hàng trăm ngàn sinh viên, học viên cao học và cán bộ công chức hàng năm là cực kỳ lớn, song quá trình tự ôn luyện 4 kỹ năng độc lập (Nghe - Đọc - Viết - Nói) gặp phải những rào cản kỹ thuật rất nghiêm trọng:
1. **Sự mất cân bằng giữa kiểm tra Trắc nghiệm và Tự luận:** 
   - Với hai kỹ năng trắc nghiệm (Nghe và Đọc), thí sinh có thể giải đề và tự chấm điểm dễ dàng thông qua bộ đáp án cố định (Answer Key).
   - Ngược lại, với hai kỹ năng tự luận (Viết và Nói), thí sinh hoàn toàn không thể tự đánh giá chất lượng bài viết luận (Task 1 thư điện tử, Task 2 bài luận học thuật) cũng như phát âm, ngữ điệu bài nói. Việc thiếu người sửa lỗi khiến học viên liên tục lặp lại các lỗi ngữ pháp cố hữu và hạn hẹp về vốn từ vựng học thuật.
2. **Chi phí và sự khan hiếm của chuyên gia chấm thi:**
   - Việc thuê giáo viên tiếng Anh chấm từng bài luận hoặc nghe từng file ghi âm để nhận xét chi tiết là vô cùng đắt đỏ (trung bình 50.000 - 150.000 VNĐ cho mỗi bài viết). Điều này tạo ra rào cản tài chính lớn đối với đại đa số sinh viên.
3. **Thiếu môi trường mô phỏng áp lực thi trên máy tính:**
   - Kỳ thi VSTEP hiện nay $100\%$ được tổ chức thi trên máy tính tại các trường đại học được Bộ GD&ĐT cấp phép. Thí sinh thường gặp bỡ ngỡ về giao diện thao tác, áp lực đồng hồ đếm ngược 180 phút, cách điều phối thời gian giữa các phần thi và kỹ năng gõ văn bản tiếng Anh trong giới hạn thời gian.
4. **Vấn đề nhập liệu và bóc tách đề thi thủ công:**
   - Hầu hết các đề thi mẫu và tài liệu luyện thi lưu hành dưới dạng tệp văn bản Microsoft Word (`.docx`) hoặc tệp `.pdf`. Việc phải nhập thủ công từng câu hỏi, từng đoạn văn vào hệ thống học tập là rào cản lớn đối với cả giáo viên và người học.

### 1.1.2. Mục tiêu nghiên cứu và sản phẩm kỳ vọng
Xuất phát từ các vấn đề thực tiễn trên, đề tài **"Phân tích và Thiết kế Hệ thống Luyện thi VSTEP 4 kỹ năng tích hợp Trí tuệ nhân tạo chấm điểm tự động (VSTEP Master)"** được định hướng giải quyết triệt để các yêu cầu cốt lõi sau:
* **Mục tiêu 1 - Về mặt hệ thống:** Xây dựng một nền tảng Web Application hiệu năng cao (Single Page Application - SPA), mô phỏng chính xác cấu trúc phòng thi máy tính chuẩn của kỳ thi VSTEP với đầy đủ 4 kỹ năng độc lập.
* **Mục tiêu 2 - Về mặt đánh giá tự động:** 
  - Tự động hóa hoàn toàn việc chấm điểm trắc nghiệm: Học viên nộp bài là nhận kết quả điểm số, số câu đúng/sai, transcript và giải thích chi tiết ngay lập tức ($<50$ms).
  - Ứng dụng Mô hình Ngôn ngữ Lớn (Trí tuệ nhân tạo - AI Engine) để đóng vai trò giám khảo ảo: Tự động phân tích cú pháp, vốn từ vựng học thuật, độ mạch lạc và liên kết của bài viết tự luận; chấm điểm chính xác theo thang 10.0; quy đổi sang bậc CEFR (B1/B2/C1) và đưa ra các đoạn văn sửa mẫu chỉ sau 2-3 giây.
* **Mục tiêu 3 - Về mặt tiện ích mở rộng:** Tích hợp bộ bóc tách thông minh (Document Parser) cho phép người dùng tải trực tiếp tệp đề thi Word (`.docx`) và PDF (`.pdf`) từ máy tính lên để hệ thống tự phân rã thành bài thi trắc nghiệm trực tuyến.
* **Mục tiêu 4 - Về mặt học thuật phần mềm:** Đảm bảo hệ thống được thiết kế theo đúng chuẩn mực của môn **Thiết kế phần mềm nâng cao**: tuân thủ mô hình kiến trúc phân tầng **Clean Architecture**, áp dụng các mẫu thiết kế kinh điển **GoF (Strategy Pattern, Adapter Pattern, Builder Pattern)** và chuẩn hóa cơ sở dữ liệu quan hệ đạt **Dạng chuẩn 3 (3NF)**.

---

## 1.2. Mô tả bài toán nghiệp vụ luyện thi VSTEP thực tế

Hệ thống được thiết kế để vận hành như một nền tảng khảo thí và ôn tập tự động, phục vụ 2 nhóm tác nhân (Actors) chính cùng 1 hệ sinh thái dịch vụ bên ngoài:

### 1.2.1. Tác nhân Học viên (Student / User)
Học viên là đối tượng trực tiếp tham gia quá trình học tập và rèn luyện kỹ năng trên hệ thống:
* **Quản lý định danh:** Học viên đăng ký tài khoản mới bằng tên đăng nhập và mật khẩu, đăng nhập vào hệ thống để duy trì trạng thái phiên làm việc và bảo toàn lịch sử học tập.
* **Luyện tập theo từng kỹ năng:**
  - *Kỹ năng Nghe (Listening):* Nghe các đoạn băng hội thoại/bài giảng, làm bài trắc nghiệm chọn 1 trong 4 đáp án A-B-C-D, nộp bài nhận kết quả ngay kèm transcript và lời giải thích.
  - *Kỹ năng Đọc (Reading):* Đọc các văn bản dài 400-500 từ theo từng chủ đề, làm bài trắc nghiệm 10 câu mỗi bài đọc, hỗ trợ công cụ tra cứu từ vựng trực tiếp trong ngữ cảnh bài đọc.
  - *Kỹ năng Viết (Writing):* Lựa chọn đề bài Task 1 (viết thư điện tử giao dịch/thân mật tối thiểu 120 từ) hoặc Task 2 (viết bài luận học thuật bày tỏ quan điểm tối thiểu 250 từ). Trình soạn thảo tích hợp bộ đếm từ tự động. Khi hoàn thành, học viên bấm nút **"AI Chấm điểm"** để nhận kết quả phân tích chuyên sâu tức thì.
  - *Kỹ năng Nói (Speaking):* Luyện tập theo 3 phần thi tương tác, thảo luận giải pháp và phát triển chủ đề. Hệ thống cung cấp dàn ý gợi ý, bộ đếm giờ chuẩn bị/trình bày và công cụ ghi âm giọng nói qua micro.
* **Tham gia thi thử toàn diện (VSTEP Mock Test):** Tham gia phòng thi mô phỏng với đầy đủ 4 kỹ năng liên tục trong thời gian 180 phút. Đồng hồ đếm ngược hoạt động cưỡng chế; khi hết giờ thi, hệ thống tự động khóa đề và thu bài.
* **Tự nhập đề thi cá nhân (Custom Test):** Tải lên các tệp đề thi sẵn có dạng `.docx` hoặc `.pdf` để hệ thống tự động bóc tách thành câu hỏi trực tuyến và làm bài ngay.
* **Ôn luyện từ vựng mở rộng:** Tra cứu danh mục từ vựng học thuật phân loại theo khung CEFR (A1 đến C2) và học từ vựng bằng phương pháp lật thẻ thông minh (Flashcards).

### 1.2.2. Tác nhân Quản trị viên (Administrator)
Quản trị viên chịu trách nhiệm quản lý tài nguyên nội dung và giám sát hệ thống:
* **Quản trị ngân hàng đề thi:** Thêm mới, chỉnh sửa, ẩn/hiện các bộ đề thi chuẩn VSTEP và đề thi theo từng kỹ năng.
* **Quản lý danh mục bài học và từ vựng:** Cập nhật các bộ từ vựng mới theo chủ đề và cấp độ CEFR.
* **Giám sát hoạt động và tài khoản:** Quản lý danh sách người dùng, xem thống kê số lượt làm bài thi và nhật ký đánh giá của hệ thống.

### 1.2.3. Phân hệ Trí tuệ nhân tạo (AI Engine - External Service)
Hệ thống kết nối trực tiếp với dịch vụ phân tích ngôn ngữ tự nhiên tiên tiến (Google Gemini AI API) để thực hiện nhiệm vụ:
* Tiếp nhận đề bài và nội dung bài viết tự luận của học viên.
* Áp dụng Rubric chấm thi chuẩn mực của kỳ thi VSTEP để phân tích ngữ pháp, từ vựng học thuật, độ mạch lạc lập luận và tính đáp ứng yêu cầu đề bài.
* Trả về dữ liệu có cấu trúc (JSON) gồm: Điểm tổng quan thang 10.0, bậc năng lực quy đổi CEFR, danh sách lỗi sai chi tiết kèm giải thích và một phiên bản bài viết mẫu nâng cao đạt chuẩn B2/C1.

---

## 1.3. Hồ sơ dữ liệu thu thập được về kỳ thi VSTEP chuẩn

Để đảm bảo hệ thống phản ánh trung thực bài toán thực tế, toàn bộ cấu trúc dữ liệu của VSTEP Master được xây dựng dựa trên Quy chế thi đánh giá năng lực tiếng Anh theo Khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam do Bộ Giáo dục và Đào tạo ban hành:

### Bảng 1.1: Cấu trúc ma trận đề thi VSTEP chuẩn 4 kỹ năng (B1 - B2 - C1)
| Kỹ năng | Cấu trúc thành phần | Số lượng câu hỏi | Thời gian | Hình thức đánh giá |
|:---|:---|:---:|:---:|:---|
| **Listening (Nghe)** | - Part 1: 8 thông báo ngắn (8 câu)<br>- Part 2: 3 bài hội thoại dài (12 câu)<br>- Part 3: 3 bài giảng/thuyết trình (15 câu) | 35 câu trắc nghiệm | 40 phút | **Chấm trắc nghiệm tự động 100%:** Đối chiếu đáp án A-B-C-D, có kết quả ngay. |
| **Reading (Đọc)** | - 4 bài đọc hiểu dài (400 - 500 từ/bài) bao gồm các chủ đề học thuật, xã hội, khoa học. | 40 câu trắc nghiệm | 60 phút | **Chấm trắc nghiệm tự động 100%:** Đối chiếu đáp án A-B-C-D, có kết quả ngay. |
| **Writing (Viết)** | - Task 1: Viết thư điện tử/thư tín (tối thiểu 120 từ, chiếm 1/3 điểm)<br>- Task 2: Bài luận học thuật bày tỏ quan điểm (tối thiểu 250 từ, chiếm 2/3 điểm) | 2 bài tự luận | 60 phút | **AI Engine chấm điểm tự động:** Phân tích ngôn ngữ theo Rubric 4 tiêu chí CEFR. |
| **Speaking (Nói)** | - Part 1: Tương tác xã hội (3-6 câu hỏi quen thuộc)<br>- Part 2: Thảo luận giải pháp (chọn 1 trong 3 phương án)<br>- Part 3: Phát triển chủ đề (thuyết trình theo sơ đồ tư duy) | 3 phần nói | 12 phút | **Luyện tập ghi âm & AI phân tích:** Ghi âm trực tiếp, hỗ trợ AI nhận xét phát âm/từ vựng. |
| **TỔNG CỘNG** | **Trọn vẹn 4 kỹ năng tiêu chuẩn** | **75 câu trắc nghiệm + 5 phần tự luận** | **~180 phút** | **Hệ thống tự động tổng hợp điểm và xếp loại** |

### Bảng 1.2: Quy tắc quy đổi thang điểm và Xếp loại Chứng chỉ VSTEP
* Điểm của từng kỹ năng được tính trên thang điểm 10, làm tròn đến 0.5 điểm.
* Điểm trung bình làm tròn = $(Điểm Nghe + Điểm Đọc + Điểm Viết + Điểm Nói) / 4$.
* Thang phân bậc xếp loại chứng chỉ chính thức:
  - **Dưới 4.0 điểm:** Không đủ điều kiện cấp chứng chỉ (Dưới B1).
  - **Từ 4.0 đến 5.5 điểm:** Đạt chứng chỉ **Bậc 3 (Tương đương B1 CEFR)**.
  - **Từ 6.0 đến 8.0 điểm:** Đạt chứng chỉ **Bậc 4 (Tương đương B2 CEFR)**.
  - **Từ 8.5 đến 10.0 điểm:** Đạt chứng chỉ **Bậc 5 (Tương đương C1 CEFR)**.

---

## 1.4. Phân tích các quy trình nghiệp vụ cốt lõi

### Quy trình 1: Luyện tập Tự luận (Writing) và Chấm điểm bằng Trí tuệ nhân tạo
1. **Bước 1 - Lựa chọn bài tập:** Học viên truy cập phân hệ Luyện viết, chọn đề bài Task 1 hoặc Task 2 dựa trên cấp độ mong muốn (B1, B2, C1).
2. **Bước 2 - Soạn thảo bài làm:** Học viên nhập nội dung bài luận trực tiếp vào trình soạn thảo. Hệ thống liên tục tính toán số từ theo thời gian thực (Real-time Word Counter) và hiển thị cảnh báo nếu bài viết chưa đạt độ dài yêu cầu.
3. **Bước 3 - Kích hoạt chấm điểm:** Khi hoàn thành, học viên bấm nút **"AI Chấm điểm"**. Hệ thống khóa nút bấm để tránh gửi trùng lặp yêu cầu và hiển thị trạng thái đang xử lý.
4. **Bước 4 - Xử lý và Phân tích:** Module điều phối xây dựng Payload chứa nội dung bài viết kết hợp bộ tiêu chí chuẩn VSTEP gửi tới Phân hệ AI Engine.
5. **Bước 5 - Phản hồi và Trực quan hóa:** AI Engine phân tích ngữ nghĩa, trả về dữ liệu JSON có cấu trúc. Hệ thống giải mã và hiển thị trực quan:
   - Điểm số tổng kết thang 10.0 và Bậc năng lực CEFR.
   - Thống kê chi tiết 4 tiêu chí: Task Fulfillment, Organization, Lexical Resource, Grammatical Accuracy.
   - Danh sách các lỗi sai ngữ pháp kèm giải thích nguyên nhân và cách sửa.
   - Đoạn văn viết lại mẫu (Enhanced Sample) nâng cao để học viên đối chiếu học tập.
6. **Bước 6 - Lưu trữ lịch sử:** Toàn bộ kết quả chấm điểm được tự động ghi nhận vào lịch sử học tập để học viên theo dõi biểu đồ tiến bộ qua thời gian.

### Quy trình 2: Thi thử VSTEP toàn diện (Mock Test 180 phút)
1. **Bước 1 - Khởi tạo phiên thi:** Học viên nhấn nút "Bắt đầu làm bài thi thử". Hệ thống khởi tạo một phiên làm bài (`Test Session`), đồng thời kích hoạt bộ đếm thời gian lùi từ 180:00 xuống 00:00.
2. **Bước 2 - Thực hiện bài thi:** Thí sinh làm lần lượt qua 4 kỹ năng. Dữ liệu làm bài tạm thời (các đáp án trắc nghiệm đã chọn, nội dung văn bản bài viết đã gõ) được tự động lưu tạm sau mỗi thao tác để chống mất dữ liệu khi gặp sự cố mạng hoặc tắt trình duyệt đột ngột.
3. **Bước 3 - Thu bài và Khóa đề thi:** Khi đồng hồ đếm ngược chạm mốc 00:00:00 (hoặc khi thí sinh bấm xác nhận Nộp bài sớm), hệ thống thực hiện cơ chế cưỡng chế khóa toàn bộ bài thi, vô hiệu hóa mọi thao tác chỉnh sửa.
4. **Bước 4 - Phân luồng chấm điểm tự động:**
   - *Phần Trắc nghiệm (Listening & Reading):* Hệ thống đối chiếu ngay với bộ Answer Key chuẩn $\rightarrow$ Tính ra điểm số của 75 câu trắc nghiệm chỉ trong vài chục mili-giây.
   - *Phần Tự luận (Writing):* Hệ thống tự động chuyển bài luận sang Module AI Engine để phân tích và tính điểm.
5. **Bước 5 - Tổng hợp và Báo cáo:** Hệ thống tổng hợp điểm số của 4 kỹ năng theo công thức Bộ GD&ĐT, làm tròn 0.5 điểm, xếp loại Bậc chứng chỉ tương ứng (B1, B2, C1) và xuất báo cáo bảng điểm toàn diện.

### Quy trình 3: Bóc tách đề thi tự động từ tệp Word/PDF (Custom Test)
1. **Bước 1 - Tải tệp tin:** Học viên kéo thả hoặc chọn tệp đề thi dạng `.docx` hoặc `.pdf` từ máy tính cá nhân lên giao diện Custom Test.
2. **Bước 2 - Bóc tách văn bản:**
   - Với tệp Word (`.docx`): Thư viện bóc tách `Mammoth` phân tích cấu trúc cây tài liệu, đọc các đoạn văn, định dạng in đậm/nghiêng và bảng biểu.
   - Với tệp PDF (`.pdf`): Thư viện `PDF.js` quét các luồng văn bản (Text Streams) theo từng trang tài liệu.
3. **Bước 3 - Nhận diện quy tắc câu hỏi:** Thuật toán Heuristic Regex quét qua văn bản bóc tách để nhận diện các mẫu cú pháp đề thi: Tiêu đề bài đọc, Câu hỏi (ví dụ: `Question 1: ...`), các phương án lựa chọn (`A. ...`, `B. ...`, `C. ...`, `D. ...`) và đáp án nếu có.
4. **Bước 4 - Chuẩn hóa và Khởi tạo:** Dữ liệu sau khi nhận diện được chuẩn hóa thành cấu trúc bài thi trực tuyến. Học viên có thể xem trước nội dung, chỉnh sửa nếu cần và bấm bắt đầu làm bài trực tiếp trên đề vừa tạo.

### Quy trình 4: Quản trị Ngân hàng Đề thi, Phê duyệt Đề bóc tách & Cấu hình AI (Admin Workflow)
1. **Bước 1 - Tiếp nhận và Quản trị Ngân hàng Đề thi:** Quản trị viên truy cập Cổng Quản trị (Admin Portal), quản lý danh mục đề thi chuẩn 4 kỹ năng (Nghe, Đọc, Viết, Nói), thêm mới hoặc cập nhật nội dung câu hỏi, liên kết tệp âm thanh (audio), kịch bản nghe (transcript) và đáp án chính thức (Answer Key).
2. **Bước 2 - Kiểm duyệt Đề bóc tách từ Word/PDF:** Khi người dùng hoặc giảng viên tải lên tệp đề thi qua phân hệ Custom Test, hệ thống xếp đề thi vào hàng đợi kiểm duyệt (Pending Approval Queue). Quản trị viên mở giao diện đối soát (Verification Modal), kiểm tra độ chính xác của văn bản bóc tách, đối chiếu đáp án và đưa ra quyết định:
   - *Phê duyệt (Approve):* Chuyển trạng thái sang `ACTIVE`, phát hành chính thức vào Ngân hàng Đề thi chung để toàn bộ học viên có thể luyện tập và thi thử.
   - *Từ chối (Reject):* Xóa bỏ đề thi lỗi hoặc yêu cầu định dạng lại tệp nguồn.
3. **Bước 3 - Cấu hình Tham số AI Engine & Barem Rubric:** Quản trị viên thiết lập mô hình AI xử lý (Google Gemini 1.5 Pro / Flash), điều chỉnh nhiệt độ sáng tạo (Temperature = 0.2 nhằm đảm bảo tính nhất quán của điểm số), cập nhật System Prompt đóng vai giám khảo VSTEP chuẩn Bộ GD&ĐT, và phân bổ tỷ trọng 4 tiêu chí CEFR (Task Fulfillment 25%, Coherence & Cohesion 25%, Lexical Resource 25%, Grammatical Range & Accuracy 25%).
4. **Bước 4 - Giám sát Gian lận và Tải hệ thống:** Theo dõi nhật ký bảo mật (Anti-cheating Logs: cảnh báo chuyển tab, nộp bài bất thường), thực hiện khóa tạm thời tài khoản vi phạm, đồng thời giám sát hạn ngạch tiêu thụ API (API Quota) để đảm bảo hệ thống vận hành liên tục 24/7.

---

## 1.5. Bảng mã hóa toàn diện Yêu cầu Chức năng (Functional Requirements)

Tuân thủ cấu trúc tài liệu đặc tả yêu cầu chuẩn (SRS), toàn bộ các yêu cầu chức năng của hệ thống VSTEP Master được phân loại và mã hóa theo bảng dưới đây:

| Phân hệ | Mã yêu cầu | Tên chức năng | Mô tả chi tiết yêu cầu kỹ thuật | Độ ưu tiên |
|:---|:---|:---|:---|:---:|
| **Xác thực (AUTH)** | `[YC-AUTH-01]` | Đăng nhập tài khoản | Cho phép người dùng đăng nhập hệ thống bằng Tên đăng nhập và Mật khẩu chính xác. | Bắt buộc |
| | `[YC-AUTH-02]` | Đăng ký học viên mới | Cho phép học viên mới tạo tài khoản cá nhân, kiểm tra trùng lặp tên đăng nhập. | Bắt buộc |
| | `[YC-AUTH-03]` | Phân quyền truy cập (RBAC) | Phân định rõ quyền hạn giữa Học viên (`user` - luyện thi) và Quản trị viên (`admin` - quản lý). | Bắt buộc |
| | `[YC-AUTH-04]` | Quản lý phiên làm việc | Duy trì trạng thái đăng nhập qua các phiên duyệt web, hỗ trợ Đăng xuất an toàn. | Bắt buộc |
| **Trắc nghiệm (OBJ)** | `[YC-OBJ-01]` | Luyện Listening theo Part | Cung cấp trình phát Audio bài nghe theo Part 1, 2, 3; Giao diện chọn đáp án A, B, C, D. | Bắt buộc |
| | `[YC-OBJ-02]` | Chấm trắc nghiệm tự động | Tự động so khớp câu trả lời với bộ Answer Key chuẩn; **Xuất kết quả ngay sau khi nộp.** | Bắt buộc |
| | `[YC-OBJ-03]` | Hiển thị Transcript & Lời giải | Cung cấp toàn văn kịch bản bài nghe (Transcript) và giải thích chi tiết lý do chọn đáp án. | Bắt buộc |
| | `[YC-OBJ-04]` | Luyện Reading theo Passage | Hiển thị văn bản đọc hiểu 400-500 từ song song với 10 câu hỏi trắc nghiệm tương ứng. | Bắt buộc |
| | `[YC-OBJ-05]` | Tra cứu từ vựng trong bài đọc | Cho phép học viên bôi đen từ vựng trong bài đọc để tra cứu định nghĩa tức thì. | Quan trọng |
| **Tự luận (SUBJ)** | `[YC-SUBJ-01]` | Soạn thảo bài viết Task 1 & 2 | Cung cấp trình soạn thảo bài viết luận có bộ đếm từ tự động (Word Count) theo thời gian thực. | Bắt buộc |
| | `[YC-SUBJ-02]` | Luyện Nói theo chủ đề | Cung cấp câu hỏi gợi ý và dàn ý cho 3 Part Speaking; Hỗ trợ đồng hồ đếm ngược thời gian chuẩn bị. | Bắt buộc |
| | `[YC-SUBJ-03]` | Ghi âm bài nói qua Micro | Tích hợp công cụ ghi âm trực tiếp trên trình duyệt, cho phép nghe lại bản thu âm của mình. | Quan trọng |
| **Trí tuệ nhân tạo (AI)** | `[YC-AI-01]` | AI Chấm điểm Writing tự động | Phân tích bài viết theo Rubric CEFR, chấm điểm thang 10.0 và xếp bậc năng lực B1/B2/C1. | Bắt buộc |
| | `[YC-AI-02]` | AI Chỉ lỗi sai ngữ pháp & từ | Liệt kê chi tiết các lỗi chính tả, dùng từ sai ngữ cảnh, cấu trúc câu chưa chuẩn và cách sửa. | Bắt buộc |
| | `[YC-AI-03]` | AI Gợi ý bài mẫu nâng cao | Cung cấp phiên bản bài viết nâng cao (Enhanced Essay) đạt chuẩn B2/C1 từ ý tưởng của học viên. | Quan trọng |
| **Thi thử (MOCK)** | `[YC-MOCK-01]` | Khởi tạo đề thi Full Test | Tổng hợp đề thi hoàn chỉnh 4 kỹ năng: Nghe (35 câu), Đọc (40 câu), Viết (2 task), Nói (3 part). | Bắt buộc |
| | `[YC-MOCK-02]` | Đồng hồ đếm ngược 180 phút | Đếm lùi thời gian thực tế; Cảnh báo trực quan khi còn 5 phút; Cưỡng chế nộp bài khi hết giờ. | Bắt buộc |
| | `[YC-MOCK-03]` | Lưu trữ bài làm tạm thời | Tự động đồng bộ đáp án sau mỗi thao tác chọn để bảo vệ dữ liệu khi mất kết nối mạng. | Bắt buộc |
| | `[YC-MOCK-04]` | Tổng hợp kết quả & Xếp loại | Tự động tính điểm trung bình 4 kỹ năng làm tròn 0.5 và cấp chứng nhận xếp loại B1/B2/C1. | Bắt buộc |
| **Tự tạo đề (CUST)** | `[YC-CUST-01]` | Bóc tách đề thi Word (.docx) | Sử dụng thư viện Mammoth tự động chuyển đổi file văn bản Word thành câu hỏi trắc nghiệm trực tuyến. | Bắt buộc |
| | `[YC-CUST-02]` | Bóc tách đề thi PDF (.pdf) | Sử dụng thư viện PDF.js tự động trích xuất các luồng văn bản PDF thành đề thi làm bài trực tiếp. | Quan trọng |
| **Mở rộng (VOCAB)** | `[YC-VOCAB-01]` | Tra cứu từ điển CEFR | Danh mục từ vựng phân loại theo các cấp độ A1, A2, B1, B2, C1 kèm phát âm, giải nghĩa và ví dụ. | Hữu ích |
| | `[YC-VOCAB-02]` | Thẻ ghi nhớ Flashcards | Công cụ học từ vựng lật thẻ thông minh hai mặt, đánh dấu từ đã nhớ hoặc cần ôn tập lại. | Hữu ích |
| **Quản trị (ADM)** | `[YC-ADM-01]` | Quản lý Ngân hàng Đề thi | Thêm, sửa, xóa các bộ đề chuẩn VSTEP 4 kỹ năng; Quản lý cấu trúc câu hỏi, tệp audio, transcript và đáp án chuẩn. | Bắt buộc |
| | `[YC-ADM-02]` | Kiểm duyệt Đề bóc tách | Rà soát hàng đợi các đề thi tự động bóc tách từ file Word (.docx) và PDF (.pdf); Đối soát nội dung và bấm Phê duyệt / Từ chối. | Bắt buộc |
| | `[YC-ADM-03]` | Cấu hình Tham số AI Engine | Thiết lập mô hình AI (Gemini 1.5 Pro/Flash), tinh chỉnh System Prompt giám khảo VSTEP, cấu hình tỷ trọng Barem Rubric 4 tiêu chí CEFR. | Bắt buộc |
| | `[YC-ADM-04]` | Quản trị Người dùng & Giám sát | Quản lý danh sách tài khoản, phân quyền RBAC (Admin/Student), khóa tài khoản vi phạm gian lận và giám sát tải hạn ngạch API. | Bắt buộc |

---

## 1.6. Bảng yêu cầu phi chức năng chuẩn FURPS+

| Tiêu chí | Mã yêu cầu | Mô tả chi tiết yêu cầu kỹ thuật | Chỉ số đo lường định lượng |
|:---|:---|:---|:---|
| **Functionality (Tính năng)** | `[NFR-FUN-01]` | Khả năng kiểm tra tính toàn vẹn dữ liệu bài làm. | Hệ thống không cho phép nộp bài trống; Tự động cảnh báo các câu trắc nghiệm chưa chọn đáp án. |
| **Usability (Tiện dụng)** | `[NFR-USE-01]` | Giao diện thích ứng đa nền tảng (Responsive). | Hiển thị tối ưu trên màn hình Desktop (>= 1024px), Tablet (768px - 1023px) và Mobile (>= 375px). |
| | `[NFR-USE-02]` | Trải nghiệm chế độ hiển thị Sáng / Tối. | Hỗ trợ chuyển đổi tức thì giữa Light Mode và Dark Mode, giảm mỏi mắt cho học viên khi ôn luyện ban đêm. |
| | `[NFR-USE-03]` | Khả năng tiếp cận điều hướng (Accessibility). | Thao tác chuyển đổi giữa các kỹ năng và câu hỏi có thể thực hiện thông qua phím tắt hoặc thanh điều hướng nhanh. |
| **Reliability (Tin cậy)** | `[NFR-REL-01]` | Cơ chế tự phục hồi sự cố mạng (Fault Tolerance). | Dữ liệu làm bài tạm thời được lưu liên tục vào bộ nhớ cục bộ; Nếu rớt mạng hoặc F5 tải lại, bài thi vẫn giữ nguyên trạng thái. |
| | `[NFR-REL-02]` | Tỉ lệ vận hành liên tục (Availability). | Đạt chỉ số sẵn sàng tối thiểu 99.5% trong điều kiện vận hành tiêu chuẩn. |
| **Performance (Hiệu năng)** | `[NFR-PER-01]` | Thời gian chấm trắc nghiệm (Grading Latency). | Thời gian xử lý chấm điểm và hiển thị kết quả bài thi trắc nghiệm dưới 50 mili-giây. |
| | `[NFR-PER-02]` | Thời gian phản hồi phân tích AI. | Thời gian phân tích bài luận tự luận từ Phân hệ AI Engine trung bình từ 2 đến 4 giây. |
| | `[NFR-PER-03]` | Tốc độ tải trang ban đầu (First Contentful Paint). | Thời gian tải trang ứng dụng lần đầu dưới 1.5 giây trên đường truyền mạng băng rộng tiêu chuẩn. |
| **Supportability (Bảo trì)** | `[NFR-SUP-01]` | Tiêu chuẩn chất lượng mã nguồn (Code Standard). | Toàn bộ mã nguồn viết bằng TypeScript ở chế độ kiểm tra kiểu tĩnh nghiêm ngặt (`strict: true`), không phát sinh lỗi biên dịch. |
| | `[NFR-SUP-02]` | Tính độc lập giữa các tầng kiến trúc (Modularity). | Tách biệt hoàn toàn giữa Tầng giao diện (UI Layer), Tầng nghiệp vụ (Service Layer) và Tầng hạ tầng (Adapter Layer). |

---

## 1.7. Tiêu chuẩn nghiệm thu phần mềm (Acceptance Criteria)

Hệ thống VSTEP Master được nghiệm thu và đánh giá hoàn thiện khi thỏa mãn toàn bộ các điều kiện sau:
1. **Tiêu chuẩn kiểm thử chức năng:** Toàn bộ 20 yêu cầu chức năng được mô tả tại mục 1.5 phải vận hành chính xác trên môi trường thực tế, không có hiện tượng dừng đột ngột (Crash) hay mất dữ liệu.
2. **Tiêu chuẩn đánh giá tự động:**
   - Phần thi trắc nghiệm (Nghe/Đọc): Nộp bài là có điểm số và đáp án đúng/sai ngay lập tức.
   - Phần thi tự luận (Viết): Gửi bài sang Phân hệ AI Engine nhận được kết quả định dạng JSON chuẩn gồm: Điểm tổng quan thang 10.0, Bậc CEFR, 4 tiêu chí thành phần, Lỗi ngữ pháp và Bản sửa mẫu.
3. **Tiêu chuẩn mô phỏng phòng thi:** Đồng hồ đếm ngược 180 phút hoạt động chính xác đến từng giây, tự động khóa giao diện và nộp bài khi hết giờ mà không phụ thuộc vào thao tác người dùng.
4. **Tiêu chuẩn bóc tách tài liệu:** Tải lên tệp đề thi Word (`.docx`) hoặc PDF (`.pdf`) chuẩn bóc tách thành công cấu trúc câu hỏi trắc nghiệm A, B, C, D trực tuyến.
5. **Tiêu chuẩn học thuật thiết kế:** Hồ sơ thiết kế chứng minh rõ rệt việc áp dụng kiến trúc Clean Architecture, các mẫu thiết kế GoF (Strategy, Adapter, Builder) và lược đồ cơ sở dữ liệu quan hệ chuẩn hóa đạt Dạng chuẩn 3 (3NF).
