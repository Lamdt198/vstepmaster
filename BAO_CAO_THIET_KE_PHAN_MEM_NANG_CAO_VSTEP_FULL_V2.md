# BÀI TẬP LỚN MÔN THIẾT KẾ PHẦN MỀM NÂNG CAO

# ĐỀ TÀI: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG LUYỆN THI VSTEP 4 KỸ NĂNG TÍCH HỢP TRÍ TUỆ NHÂN TẠO CHẤM ĐIỂM TỰ ĐỘNG (VSTEP MASTER)

## TÀI LIỆU THIẾT KẾ HỆ THỐNG (SOFTWARE DESIGN DOCUMENT - SDD)
### PHIÊN BẢN V2.0 - BẢN CẬP NHẬT TOÀN DIỆN VÀ NÂNG CẤP KIẾN TRÚC THỰC NGHIỆM

**Học kỳ:** 1 - **Năm học:** 2026 - 2027  
**Đơn vị đào tạo:** Khoa Công nghệ thông tin  
**Giảng viên hướng dẫn:** [Học hàm, Học vị, Họ và tên GV]  
**Nhóm sinh viên thực hiện:** Nhóm BTL  

---

## BẢNG LỊCH SỬ THAY ĐỔI VÀ NÂNG CẤP TÀI LIỆU (DOCUMENT REVISION HISTORY)

| Phiên bản | Ngày cập nhật | Tác giả / Người sửa | Tóm tắt nội dung nâng cấp kiến trúc & Tính năng cốt lõi |
|:---:|:---:|:---:|:---|
| **V1.0** | 10/09/2026 | Nhóm BTL | - Bản thiết kế nền tảng ban đầu.<br>- Phân tích bài toán, xây dựng 20 yêu cầu chức năng `[YC-xxx]` và FURPS+.<br>- Thiết kế 23 sơ đồ UML chuẩn Draw.io (Use Case, Sequence, Activity, Component, Deployment, Class, ERD).<br>- Kiến trúc Clean Architecture, 4 mẫu GoF (Strategy, Adapter, Builder, Observer), CSDL 14 bảng 3NF.<br>- Xây dựng 18 kịch bản kiểm thử (Test Cases `TC-01` đến `TC-18`). |
| **V2.0** | **13/09/2026** | **Nhóm BTL** | **Bản nâng cấp toàn diện - Hoàn thiện các công nghệ thực nghiệm cao cấp:**<br>1. **Cơ chế Chấm điểm Đa tầng (Tiered Scoring Strategy):** Ưu tiên gọi Google Gemini 2.0 Flash AI; tự động chuyển đổi sang Thuật toán Barem VSTEP nội bộ khi ngắt kết nối hoặc hết quota (tính điểm chuẩn xác dựa trên độ dài từ, số đoạn văn, liên từ Coherence, vốn từ học thuật B2-C1 và ngữ pháp thực tế, **loại bỏ triệt để mock cứng**).<br>2. **Tích hợp Nhận diện Giọng nói Speech-to-Text (STT):** Tích hợp công cụ STT thời gian thực trong Luyện Nói và Phòng thi Mock Test 180 phút, cho phép học viên theo dõi văn bản nói và hiệu chỉnh trước khi chấm.<br>3. **Quản trị Cấu hình & Thẩm định API Thời gian thực:** Thêm phân hệ Settings & Admin Portal lưu trữ khóa API tập trung (`vstep_ai_key`), bổ sung nút **"Kiểm tra kết nối"** gửi HTTP POST trực tiếp tới Gemini để đo độ trễ (Latency Probe).<br>4. **Chuẩn hóa Hệ thống Giao diện (Unified Design Tokens):** Chuẩn hóa 100% nút bấm với bo góc `rounded-xl`, vector icon Lucide, hiệu ứng bấm `active:scale-95`, đồng bộ Dark/Light Mode toàn diện trên cả 2 Cổng Học viên và Quản trị viên.<br>5. **Giám sát An ninh Thi cử (Strict Anti-Cheat):** Tích hợp cơ chế phát hiện chuyển tab làm bài trong kỳ thi thử.<br>6. **Mở rộng Ma trận Kiểm thử Thực tế:** Nâng từ 18 lên **25 Test Cases** (`TC-01` đến `TC-25`) đều đạt $100\%$ PASS. |

**Học kỳ:** 1 - **Năm học:** 2026 - 2027  
**Đơn vị đào tạo:** Khoa Công nghệ thông tin  
**Giảng viên hướng dẫn:** [Học hàm, Học vị, Họ và tên GV]  
**Nhóm sinh viên thực hiện:** Nhóm BTL  

---

## BẢNG PHÂN CÔNG NHIỆM VỤ THÀNH VIÊN TRONG NHÓM

| STT | Họ và tên sinh viên | Mã số sinh viên | Nhiệm vụ phân công | Tỷ lệ hoàn thành | Ký tên |
|:---:|:---|:---:|:---|:---:|:---:|
| 1 | [Họ tên SV 1] | [Mã SV 1] | Nhóm trưởng, Khảo sát bài toán, Kiến trúc Clean Architecture, Thiết kế CSDL 3NF | 100% | |
| 2 | [Họ tên SV 2] | [Mã SV 2] | Mô hình hóa UML (Use Case, Sequence, State), Hiện thực hóa GoF Design Patterns | 100% | |
| 3 | [Họ tên SV 3] | [Mã SV 3] | Phát triển Frontend React/TypeScript, Tích hợp Phân hệ AI Engine chấm thi tự động | 100% | |
| 4 | [Họ tên SV 4] | [Mã SV 4] | Xây dựng kịch bản kiểm thử (18 Test Cases), Kiểm thử thực nghiệm, Biên soạn báo cáo | 100% | |

---

## DANH MỤC THUẬT NGỮ VÀ TỪ VIẾT TẮT

| Viết tắt | Thuật ngữ Tiếng Anh | Ý nghĩa trong hệ thống |
|:---:|:---|:---|
| **VSTEP** | Vietnamese Standardized Test of English Proficiency | Kỳ thi đánh giá năng lực tiếng Anh theo Khung 6 bậc dùng cho Việt Nam (B1, B2, C1). |
| **CEFR** | Common European Framework of Reference | Khung tham chiếu trình độ ngôn ngữ chung của Châu Âu. |
| **UML** | Unified Modeling Language | Ngôn ngữ mô hình hóa thống nhất dùng trực quan hóa và thiết kế phần mềm. |
| **GoF** | Gang of Four | Nhóm 4 tác giả khởi xướng 23 mẫu thiết kế hướng đối tượng kinh điển. |
| **AI** | Artificial Intelligence | Trí tuệ nhân tạo phân tích và chấm điểm ngôn ngữ tự nhiên. |
| **3NF** | Third Normal Form | Dạng chuẩn 3 loại bỏ phụ thuộc bắc cầu trong cơ sở dữ liệu quan hệ. |
| **ERD** | Entity Relationship Diagram | Sơ đồ biểu diễn thực thể và mối quan hệ cơ sở dữ liệu. |
| **SPA** | Single Page Application | Ứng dụng web một trang, tương tác mượt mà không tải lại toàn trang. |
| **DIP** | Dependency Inversion Principle | Nguyên lý đảo ngược phụ thuộc (chữ D trong bộ nguyên lý SOLID). |
| **SRS** | Software Requirements Specification | Tài liệu đặc tả yêu cầu phần mềm. |
| **SDD** | Software Design Document | Tài liệu thiết kế phần mềm. |
| **STT** | Speech-to-Text | Công nghệ nhận diện và chuyển đổi giọng nói thành văn bản thời gian thực. |
| **WPM** | Words Per Minute | Số lượng từ phát âm trong một phút, chỉ số định lượng độ trôi chảy (Fluency) trong bài thi Nói. |
| **HA** | High Availability | Tính sẵn sàng cao trong kiến trúc hệ thống chấm thi, đảm bảo không gián đoạn dịch vụ. |
| **LLM** | Large Language Model | Mô hình ngôn ngữ lớn (Google Gemini 2.0 Flash) phục vụ phân tích tự luận chuyên sâu. |

---

## DANH MỤC HÌNH ẢNH VÀ BẢNG BIỂU

### 1. Bảng Tra Cứu & Ánh Xạ Sơ Đồ Hệ Thống Sang Tệp Nguồn Draw.io (23 Sơ đồ)

Toàn bộ **23 sơ đồ** phân tích và thiết kế hệ thống đều được lưu trữ trực quan dưới dạng vector tại thư mục `diagrams/drawio/` và được tích hợp đồng thời trong tệp dự án tổng thể **[`diagrams/drawio/VSTEP_Master_All_Diagrams.drawio`](diagrams/drawio/VSTEP_Master_All_Diagrams.drawio)** (gồm 23 Tabs riêng biệt). Người đọc có thể mở trực tiếp trên [app.diagrams.net](https://app.diagrams.net) để kéo thả, phóng to, chỉnh sửa màu sắc, thuộc tính và xuất bản ảnh độ phân giải cao.

| Số hiệu | Tên sơ đồ kiến trúc & mô hình hóa UML | Tệp Draw.io riêng lẻ (`.drawio`) | Tab trong `VSTEP_Master_All_Diagrams.drawio` |
|:---:|:---|:---|:---|
| **Hình 1.1** | Sơ đồ Ngữ cảnh Hệ thống (Context Diagram) | `07_context_diagram.drawio` | `07_Context_Diagram` |
| **Hình 2.1** | Biểu đồ Ca sử dụng tổng quan (Use Case Diagram) | `01_use_case_diagram.drawio` | `01_Use_Case` |
| **Hình 2.2** | Biểu đồ Hoạt động UC-01: Đăng nhập & Đăng ký | `activity_uc01_auth.drawio` | `Activity_UC01_Auth` |
| **Hình 2.3** | Biểu đồ Hoạt động UC-02: Luyện tập Nghe (Listening) | `activity_uc02_listening.drawio` | `Activity_UC02_Listening` |
| **Hình 2.4** | Biểu đồ Hoạt động UC-03: Luyện tập Đọc & Tra từ | `activity_uc03_reading.drawio` | `Activity_UC03_Reading` |
| **Hình 2.5** | Biểu đồ Hoạt động UC-04: Luyện Viết & AI Chấm điểm | `activity_uc04_writing.drawio` | `Activity_UC04_Writing` |
| **Hình 2.6** | Biểu đồ Hoạt động UC-05: Luyện Nói & Ghi âm | `activity_uc05_speaking.drawio` | `Activity_UC05_Speaking` |
| **Hình 2.7** | Biểu đồ Hoạt động UC-06: Thi thử VSTEP 180 phút | `02_activity_flow_mock_test.drawio` | `02_Activity_Flow` |
| **Hình 2.8** | Biểu đồ Hoạt động UC-07: Bóc tách đề Word/PDF | `activity_uc07_custom_test.drawio` | `Activity_UC07_Custom_Test` |
| **Hình 2.9** | Biểu đồ Hoạt động UC-08: Học Từ vựng Flashcards | `activity_uc08_vocab.drawio` | `Activity_UC08_Vocab` |
| **Hình 2.10** | Biểu đồ Tuần tự UC-01: Đăng nhập & Xác thực | `sequence_uc01_auth.drawio` | `Sequence_UC01_Auth` |
| **Hình 2.11** | Biểu đồ Tuần tự UC-02: Luyện nghe & Chấm tức thì | `sequence_uc02_listening.drawio` | `Sequence_UC02_Listening` |
| **Hình 2.12** | Biểu đồ Tuần tự UC-03: Luyện đọc & Tra từ điển | `sequence_uc03_reading.drawio` | `Sequence_UC03_Reading` |
| **Hình 2.13** | Biểu đồ Tuần tự UC-04: AI Chấm điểm Tự luận | `03_sequence_ai_scoring.drawio` | `03_Sequence_AI_Scoring` |
| **Hình 2.14** | Biểu đồ Tuần tự UC-05: Luyện nói & Ghi âm Audio | `sequence_uc05_speaking.drawio` | `Sequence_UC05_Speaking` |
| **Hình 2.15** | Biểu đồ Tuần tự UC-06: Thi thử 180 phút Mock Test | `sequence_uc06_mock_test.drawio` | `Sequence_UC06_Mock_Test` |
| **Hình 2.16** | Biểu đồ Tuần tự UC-07: Bóc tách đề Word/PDF | `sequence_uc07_custom_test.drawio` | `Sequence_UC07_Custom_Test` |
| **Hình 2.17** | Biểu đồ Tuần tự UC-08: Học Flashcard & SM-2 | `sequence_uc08_vocab.drawio` | `Sequence_UC08_Vocab` |
| **Hình 2.18** | Biểu đồ Máy trạng thái phiên thi (State Machine) | `04_state_machine_exam.drawio` | `04_State_Machine` |
| **Hình 3.1** | Sơ đồ Thành phần Clean Arch (Component Diagram) | `08_component_diagram.drawio` | `08_Component_Diagram` |
| **Hình 3.2** | Sơ đồ Triển khai hạ tầng (Deployment Diagram) | `09_deployment_diagram.drawio` | `09_Deployment_Diagram` |
| **Hình 3.3** | Biểu đồ Lớp chi tiết Clean Arch & 4 GoF Patterns | `05_class_diagram_architecture.drawio` | `05_Class_Diagram` |
| **Hình 3.4** | Sơ đồ CSDL Thực thể Liên kết (ERD 14 bảng 3NF) | `06_database_erd.drawio` | `06_Database_ERD_14_Tables` |
| **Hình 3.5 - 3.11** | 7 Bản vẽ Giao diện Người dùng UI/UX Mockups (Bao gồm Cổng Quản trị viên) | `diagrams/images/ui_*.png` | Thiết kế giao diện trực quan |

---

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
5. **Rủi ro gián đoạn dịch vụ chấm điểm AI (AI Outage & Single Point of Failure):**
   - Trong quá trình triển khai thực tế, việc phụ thuộc hoàn toàn vào dịch vụ Trí tuệ Nhân tạo đám mây (Google Gemini AI) tiềm ẩn nguy cơ gián đoạn lớn: mất kết nối internet, người dùng chưa cấu hình API Key, hoặc vượt quá hạn mức yêu cầu miễn phí (HTTP 429 Too Many Requests). Một hệ thống khảo thí chuyên nghiệp **bắt buộc phải có Cơ chế Chấm điểm Đa tầng (Tiered Scoring)**: luôn ưu tiên AI chấm sâu, nhưng nếu AI lỗi thì phải có thuật toán nội bộ tự động tính điểm dự đoán theo barem chuẩn VSTEP, tuyệt đối không dùng điểm giả lập (mock cố định) hay làm gián đoạn bài thi của học viên.
6. **Yêu cầu nhận diện bài thi Nói trong thời gian thực:**
   - Trước đây, việc ghi âm chỉ dừng lại ở tệp âm thanh thô. Học viên cần một công cụ **Speech-to-Text (STT)** tích hợp ngay trên trình duyệt để chuyển lời nói thành văn bản thời gian thực, cho phép quan sát từ vựng đã phát âm, sửa lỗi nhận diện trước khi chấm điểm và phân tích lỗi phát âm/ngữ pháp tự động.

### 1.1.2. Mục tiêu nghiên cứu và sản phẩm kỳ vọng
Xuất phát từ các vấn đề thực tiễn trên, đề tài **"Phân tích và Thiết kế Hệ thống Luyện thi VSTEP 4 kỹ năng tích hợp Trí tuệ nhân tạo chấm điểm tự động (VSTEP Master)"** được định hướng giải quyết triệt để các yêu cầu cốt lõi sau:
* **Mục tiêu 1 - Về mặt hệ thống:** Xây dựng một nền tảng Web Application hiệu năng cao (Single Page Application - SPA), mô phỏng chính xác cấu trúc phòng thi máy tính chuẩn của kỳ thi VSTEP với đầy đủ 4 kỹ năng độc lập.
* **Mục tiêu 2 - Về mặt đánh giá đa tầng thông minh (Tiered Scoring):** 
  - Tự động hóa hoàn toàn việc chấm điểm trắc nghiệm: Học viên nộp bài là nhận kết quả điểm số, transcript và giải thích chi tiết ngay lập tức ($<50$ms).
  - Tích hợp Mô hình Ngôn ngữ Lớn Google Gemini 2.0 Flash để đóng vai trò giám khảo ảo chấm điểm tự luận theo 4 tiêu chí VSTEP/CEFR.
  - Xây dựng **Thuật toán Barem VSTEP Dự phòng**: Tự động tính điểm bài Viết (dựa trên số từ, số đoạn, liên từ Coherence, vốn từ vựng học thuật B2-C1, ngữ pháp) và bài Nói (kết hợp Speech-to-Text phân tích WPM, độ trôi chảy, lỗi ngữ âm/ngữ pháp) khi AI gặp sự cố. Tuyệt đối không dùng dữ liệu mock cứng.
* **Mục tiêu 2.1 - Về mặt nhận diện giọng nói (STT):** Tích hợp Web Speech API và `speechService` để chuyển đổi giọng nói thành văn bản trực tiếp trong giao diện thi, tạo cơ sở cho việc phân tích ngôn ngữ học.
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
Hệ thống kết nối trực tiếp với dịch vụ phân tích ngôn ngữ tự nhiên tiên tiến (Google Gemini 2.0 Flash AI API) để thực hiện nhiệm vụ:
* Tiếp nhận đề bài và nội dung bài viết tự luận của học viên.
* Áp dụng Rubric chấm thi chuẩn mực của kỳ thi VSTEP để phân tích ngữ pháp, từ vựng học thuật, độ mạch lạc lập luận và tính đáp ứng yêu cầu đề bài.
* Trả về dữ liệu có cấu trúc (JSON) gồm: Điểm tổng quan thang 10.0, bậc năng lực quy đổi CEFR, danh sách lỗi sai chi tiết kèm giải thích và một phiên bản bài viết mẫu nâng cao đạt chuẩn B2/C1.

### 1.2.4. Phân hệ Nhận diện Giọng nói (Speech-to-Text Engine)
Sử dụng Web Speech API được đóng gói qua `speechService`:
* Ghi nhận luồng âm thanh trực tiếp từ micro của thí sinh trong thời gian thực.
* Chuyển đổi liên tục thành chuỗi văn bản (interim và final transcript), hiển thị vào hộp văn bản cho phép học viên theo dõi và hiệu chỉnh.
* Cung cấp văn bản đầu vào cho thuật toán chẩn đoán lỗi ngữ âm và ngữ pháp bài nói.

---

## 1.3. Hồ sơ dữ liệu thu thập được về kỳ thi VSTEP chuẩn

Để đảm bảo hệ thống phản ánh trung thực bài toán thực tế, toàn bộ cấu trúc dữ liệu của VSTEP Master được xây dựng dựa trên Quy chế thi đánh giá năng lực tiếng Anh theo Khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam do Bộ Giáo dục và Đào tạo ban hành:

### Bảng 1.1: Cấu trúc ma trận đề thi VSTEP chuẩn 4 kỹ năng (B1 - B2 - C1)
| Kỹ năng | Cấu trúc thành phần | Số lượng câu hỏi | Thời gian | Hình thức đánh giá |
|:---|:---|:---:|:---:|:---|
| **Listening (Nghe)** | - Part 1: 8 thông báo ngắn (8 câu)<br>- Part 2: 3 bài hội thoại dài (12 câu)<br>- Part 3: 3 bài giảng/thuyết trình (15 câu) | 35 câu trắc nghiệm | 40 phút | **Chấm trắc nghiệm tự động 100%:** Đối chiếu đáp án A-B-C-D, có kết quả ngay. |
| **Reading (Đọc)** | - 4 bài đọc hiểu dài (400 - 500 từ/bài) bao gồm các chủ đề học thuật, xã hội, khoa học. | 40 câu trắc nghiệm | 60 phút | **Chấm trắc nghiệm tự động 100%:** Đối chiếu đáp án A-B-C-D, có kết quả ngay. |
| **Writing (Viết)** | - Task 1: Viết thư điện tử/thư tín (tối thiểu 120 từ, chiếm 1/3 điểm)<br>- Task 2: Bài luận học thuật bày tỏ quan điểm (tối thiểu 250 từ, chiếm 2/3 điểm) | 2 bài tự luận | 60 phút | **Đánh giá Đa tầng (Tiered):** Ưu tiên Gemini AI 2.0 Flash; Tự động fallback sang Thuật toán Barem VSTEP nội bộ. |
| **Speaking (Nói)** | - Part 1: Tương tác xã hội (3-6 câu hỏi quen thuộc)<br>- Part 2: Thảo luận giải pháp (chọn 1 trong 3 phương án)<br>- Part 3: Phát triển chủ đề (thuyết trình theo sơ đồ tư duy) | 3 phần nói | 12 phút | **Tích hợp Speech-to-Text & Đánh giá Đa tầng:** Chuyển giọng nói sang chữ; chấm qua AI hoặc Thuật toán STT VSTEP. |
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
| **Nâng cấp V2.0 (ADV)** | **`[YC-ADV-01]`** | **Quản lý & Thẩm định API Key** | Lưu trữ khóa API tập trung (`vstep_ai_key`), cung cấp nút **Kiểm tra kết nối** gửi HTTP POST trực tiếp tới Gemini để đo độ trễ mạng thực tế. | **Bắt buộc** |
| | **`[YC-ADV-02]`** | **Speech-to-Text bài thi Nói** | Nhận diện giọng nói thành văn bản thời gian thực qua Web Speech API; hiển thị hộp văn bản cho phép học viên theo dõi và chỉnh sửa. | **Bắt buộc** |
| | **`[YC-ADV-03]`** | **Cơ chế Chấm điểm Đa tầng (Tiered)** | Tự động kích hoạt Thuật toán Barem VSTEP nội bộ để tính điểm Writing và Speaking khi AI mất kết nối/hết quota, không dùng dữ liệu mock cứng. | **Bắt buộc** |
| | **`[YC-ADV-04]`** | **Giám sát An ninh Chuyển Tab** | Tích hợp `visibilitychange` phát hiện thí sinh rời khỏi màn hình làm bài thi thử và cảnh báo vi phạm. | **Quan trọng** |
| | **`[YC-ADV-05]`** | **Hệ thống Design Tokens & Theme** | Chuẩn hóa toàn bộ nút bấm theo chuẩn `rounded-xl`, vector icon Lucide, đồng bộ Dark/Light Mode giữa Cổng Học viên và Quản trị viên. | **Quan trọng** |

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
| | `[NFR-REL-03]` | **Tính sẵn sàng chấm điểm liên tục (High Availability Scoring).** | **100% bài nộp tự luận đều được chấm điểm**: Ưu tiên AI; nếu lỗi lập tức chuyển sang Thuật toán Barem VSTEP, không có trường hợp bài thi bị treo hoặc lỗi không ra điểm. |
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


---

# CHƯƠNG 2. PHÂN TÍCH HỆ THỐNG VỚI UML

## 2.1. Biểu đồ Ca sử dụng tổng quan (Use Case Diagram)

### 2.1.1. Bối cảnh và Mô tả Tác nhân
Mô hình hóa Ca sử dụng (Use Case Modeling) là phương pháp trực quan hóa yêu cầu chức năng từ góc nhìn của các tác nhân (Actors) tương tác với hệ thống. Trong hệ thống **VSTEP Master**, dựa trên khảo sát nghiệp vụ thực tế, có 3 tác nhân tham gia:

1. **Học viên (Student / Candidate):** Tác nhân chính (Primary Actor), sử dụng hệ thống để thực hiện các hoạt động học tập, luyện tập 4 kỹ năng (Nghe, Đọc, Viết, Nói), thi thử toàn diện 180 phút, tải lên đề thi cá nhân (Custom Test) và học từ vựng qua Flashcards.
2. **Quản trị viên (Administrator):** Tác nhân quản trị (Secondary Actor), chịu trách nhiệm vận hành hệ thống, quản lý ngân hàng đề thi chuẩn, cập nhật danh mục từ vựng và giám sát dữ liệu tài khoản người dùng.
3. **Phân hệ Trí tuệ nhân tạo (AI Engine):** Tác nhân hệ thống ngoài (External System Actor), cung cấp năng lực phân tích ngôn ngữ tự nhiên, đóng vai trò giám khảo ảo tự động chấm điểm và đánh giá chi tiết bài thi tự luận.

### 2.1.2. Biểu đồ Ca sử dụng Tổng quan
Biểu đồ Ca sử dụng tổng quan thể hiện cấu trúc phân rã các gói chức năng và mối quan hệ giữa các tác nhân với các ca sử dụng.

*(Tham chiếu minh họa: **Hình 2.1: Biểu đồ Ca sử dụng tổng quan hệ thống VSTEP Master** - Nguồn tệp: `diagrams/drawio/01_use_case_diagram.drawio`)*

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

### 2.2.11. Ca sử dụng UC-11: Quản lý Cấu hình AI & Thẩm định Kết nối Thời gian thực (Admin AI Configuration & Latency Probe)
* **Mã Use Case:** `UC-11`
* **Tên Use Case:** Quản lý Cấu hình AI & Thẩm định Kết nối Thời gian thực (Admin AI Configuration & Latency Probe)
* **Tác nhân chính:** Quản trị viên (SuperAdmin). *(Học viên chỉ xem trạng thái AI sẵn sàng và tùy biến mục tiêu cá nhân tại `/settings`, không phải cấu hình API Key)*
* **Mục đích:** Quản trị viên cấu hình và lưu trữ khóa Google Gemini API Key dùng chung cho toàn bộ hệ thống (`vstep_ai_key`); thẩm định tính hợp lệ của key và đo độ trễ mạng thực tế tới máy chủ Google AI bằng HTTP POST probe; bảo đảm học viên được thụ hưởng AI khảo thí tự động mà không cần tự trang bị key cá nhân.
* **Tiền điều kiện:** Quản trị viên truy cập mục Cấu hình AI tại Bảng Quản trị (`/admin`).
* **Hậu điều kiện:** Khóa API được lưu trữ và áp dụng đồng bộ cho toàn bộ thí sinh, kết quả kiểm tra kết nối (thành công/thất bại kèm độ trễ tính bằng mili-giây) hiển thị trực quan.

#### Bảng đặc tả kịch bản UC-11:
| Bước | Tác nhân (Actor) | Phản ứng của Hệ thống (System Response) | Dữ liệu / Trạng thái |
|:---:|:---|:---|:---|
| 1 | Quản trị viên truy cập tab Cấu hình AI tại Admin Portal (`/admin`). | Hệ thống nạp khóa API hệ thống hiện tại từ `localStorage` (`vstep_ai_key`) và hiển thị vào ô nhập liệu bảo mật (mặc định ẩn dấu sao). | Giao diện Cấu hình AI Admin |
| 2 | Quản trị viên nhập/dán Google Gemini API Key và bấm **"Lưu Cấu hình AI"**. | Hệ thống lưu khóa và kích hoạt AI cho toàn bộ học viên, hiển thị thông báo: *"Đã lưu API Key và toàn bộ cấu hình AI Engine thành công cho toàn bộ hệ thống!"*. | Lưu trữ `vstep_ai_key` |
| 3 | Quản trị viên bấm nút **"Kiểm tra Kết nối API"**. | Nút bấm chuyển sang trạng thái loading với icon xoay. Hệ thống gọi hàm `testGeminiApiKey(apiKey)`. | Trạng thái Probe |
| 4 | - | Hệ thống gửi một yêu cầu HTTP POST thực tế tới endpoint Google Gemini 2.0 Flash (`gemini-2.0-flash:generateContent`), đo thời gian gửi và nhận phản hồi. | HTTP POST Request |
| 5 | - | **Trường hợp A (Thành công):** Google trả về HTTP 200 OK. Hệ thống hiển thị thông báo xanh: *"Kết nối Google Gemini thành công! (Độ trễ: 1250ms, Model: gemini-2.0-flash)"*.<br>**Trường hợp B (Thất bại):** Trả về HTTP 400/403/429. Hệ thống hiển thị cảnh báo đỏ chi tiết: mã lỗi, lý do từ chối và hướng dẫn cấp lại key mới. | Phản hồi kiểm tra thực tế |
| 6 | Học viên truy cập trang Cài đặt (`/settings`). | Hệ thống hiển thị Thẻ **"Hệ thống AI Khảo thí & Chấm điểm - Quản trị tập trung"**, thông báo AI sẵn sàng hoạt động mà không yêu cầu học viên nhập bất kỳ API key nào. | Giao diện Học viên `/settings` |

---

## 2.3. Biểu đồ Hoạt động (Activity Diagram)

Biểu đồ hoạt động mô hình hóa quy trình động của nghiệp vụ **Thi thử VSTEP toàn diện 180 phút** và cơ chế phân nhánh chấm điểm tự động.

*(Tham chiếu minh họa: **Hình 2.2: Biểu đồ Hoạt động quy trình thi thử và chấm điểm tự động** - Nguồn tệp: `diagrams/drawio/02_activity_flow_mock_test.drawio`)*

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

*(Tham chiếu minh họa: **Hình 2.3: Biểu đồ Tuần tự quy trình AI Chấm điểm Tự luận** - Nguồn tệp: `diagrams/drawio/03_sequence_ai_scoring.drawio`)*

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

*(Tham chiếu minh họa: **Hình 2.4: Biểu đồ Máy trạng thái vòng đời phiên làm bài thi** - Nguồn tệp: `diagrams/drawio/04_state_machine_exam.drawio`)*

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


---

# CHƯƠNG 3. THIẾT KẾ HỆ THỐNG NÂNG CAO

## 3.1. Thiết kế Kiến trúc phần mềm (Clean Architecture)

### 3.1.1. Bối cảnh và Mô hình Phân tầng
Để giải quyết bài toán phức tạp của một hệ thống khảo thí trực tuyến tích hợp trí tuệ nhân tạo, kiến trúc hệ thống phải đảm bảo các thuộc tính chất lượng phần mềm quan trọng: tính độc lập giữa giao diện và nghiệp vụ, khả năng mở rộng thuật toán chấm điểm, tính dễ kiểm thử (testability) và giảm thiểu sự phụ thuộc vào các thư viện bên thứ ba. Hệ thống **VSTEP Master** được thiết kế tuân thủ mô hình **Clean Architecture** (Kiến trúc Sạch của Robert C. Martin), tổ chức thành 4 tầng đồng tâm từ ngoài vào trong:

1. **Tầng Trình diễn (Presentation Layer / Frameworks & Drivers):**
   - Bao gồm các thành phần giao diện người dùng React 18, các Custom Hooks (`useExamTimer`, `useAudioPlayer`), Context Providers quản lý trạng thái toàn cục (`AuthContext`, `ExamContext`) và thư viện giao diện Tailwind CSS.
   - Trách nhiệm: Nhận tương tác của học viên (nhấp chuột, gõ phím, tải file), hiển thị dữ liệu kết quả chấm thi, vẽ biểu đồ thống kê năng lực CEFR và không chứa bất kỳ logic tính toán điểm số nào.

2. **Tầng Ứng dụng (Application Layer / Use Cases):**
   - Chứa các Use Case Interactors và Application Services điều phối luồng nghiệp vụ: `ExamService`, `AIScoringService`, `DocumentParserService`, `VocabularyService`.
   - Trách nhiệm: Thực thi các kịch bản sử dụng (như Nộp bài thi, Kích hoạt AI chấm điểm, Bóc tách đề thi). Tầng này đóng vai trò cầu nối, nhận lệnh từ Tầng Trình diễn, gọi các thực thể ở Tầng Domain xử lý và lưu trữ dữ liệu qua các cổng Interface.

3. **Tầng Nghiệp vụ cốt lõi (Domain Layer / Entities & Business Rules):**
   - Là trái tim của hệ thống, chứa các Entity nghiệp vụ thuần túy: `Exam`, `Section`, `Question`, `QuestionOption`, `Submission`, `AIEvaluationResult`, `VocabCard`.
   - Chứa các quy tắc bất biến (Business Invariants): Barem thang điểm VSTEP 10.0, ngưỡng quy đổi bậc CEFR (B1: 4.0 - 5.5; B2: 6.0 - 8.0; C1: 8.5 - 10.0), công thức tính điểm trung bình 4 kỹ năng.
   - Định nghĩa các Cổng giao tiếp trừu tượng (Interfaces): `IScoringStrategy`, `IAIEvaluator`, `IExamRepository`. Tầng Domain hoàn toàn độc lập, không import bất kỳ thư viện UI hay công nghệ cơ sở dữ liệu nào.

4. **Tầng Hạ tầng (Infrastructure Layer):**
   - Chứa các bộ điều hợp (Adapters) cụ thể giao tiếp với thế giới bên ngoài: `AIAdapter` (kết nối API Gemini), `LocalStorageAdapter` (lưu trữ cục bộ phiên thi), `DocxParserAdapter` / `PdfParserAdapter` (trích xuất văn bản nhị phân).

```
+-------------------------------------------------------------+
| 1. PRESENTATION LAYER (React Components, Pages, UI Hooks)   |
|   +-----------------------------------------------------+   |
|   | 2. APPLICATION LAYER (ExamService, AIScoringService)|   |
|   |   +---------------------------------------------+   |   |
|   |   | 3. DOMAIN LAYER (Entities, Invariants, DIP) |   |   |
|   |   +---------------------------------------------+   |   |
|   +-----------------------------------------------------+   |
| 4. INFRASTRUCTURE LAYER (AIAdapter, Repositories, Parsers)   |
+-------------------------------------------------------------+
```

### 3.1.2. Nguyên lý Đảo ngược Phụ thuộc (Dependency Inversion Principle - DIP)
Clean Architecture quy định chiều phụ thuộc luôn hướng vào tâm (vào Domain). Để tầng Application có thể tương tác với các dịch vụ bên ngoài (như AI Engine hay Database) mà không vi phạm nguyên lý này, hệ thống áp dụng triệt để **DIP**:
* Tầng Domain định nghĩa hợp đồng giao tiếp trừu tượng: `IAIEvaluator`.
* Tầng Infrastructure cung cấp lớp hiện thực cụ thể: `AIAdapter implements IAIEvaluator`.
* Tầng Application chỉ phụ thuộc vào `IAIEvaluator` thông qua kỹ thuật Dependency Injection. Nhờ đó, khi thay đổi nhà cung cấp AI hoặc cập nhật phiên bản mô hình, toàn bộ mã nguồn nghiệp vụ cốt lõi và giao diện đều được giữ nguyên vẹn $100\%$.

---

## 3.2. Ứng dụng các Mẫu thiết kế phần mềm (GoF Design Patterns)

Môn học Thiết kế phần mềm nâng cao đặt trọng tâm vào việc áp dụng các mẫu thiết kế kinh điển của Gang of Four (GoF) nhằm giải quyết các bài toán kiến trúc thực tế. Dưới đây là 4 mẫu thiết kế cốt lõi được hiện thực hóa trong mã nguồn:

### 3.2.1. Strategy Pattern: Phân tách Thuật toán Chấm điểm Đa hình
* **Bài toán thực tế:** Hệ thống VSTEP bao gồm hai hình thức khảo thí có bản chất toán học và xử lý hoàn toàn khác biệt:
  - Hình thức Trắc nghiệm (Nghe & Đọc): Đối chiếu đáp án với Answer Key, thuật toán mang tính xác định (deterministic), tốc độ $<50$ms.
  - Hình thức Tự luận (Viết & Nói): Đòi hỏi xử lý ngôn ngữ tự nhiên, phân tích cú pháp theo Rubric 4 tiêu chí CEFR thông qua AI Engine, thời gian xử lý 2-4s.
* **Giải pháp áp dụng:** Áp dụng **Strategy Pattern** bằng cách định nghĩa interface chung `IScoringStrategy` với phương thức `calculateScore()`. Hai chiến lược cụ thể được cài đặt: `ObjectiveScoringStrategy` và `AIScoringStrategy`.
* **Minh họa mã nguồn TypeScript:**

```typescript
// 1. Interface Strategy tại Domain Layer
export interface IScoringStrategy {
  calculateScore(submissionData: any): Promise<ScoringResult>;
}

export interface ScoringResult {
  score: number;             // Thang điểm 10.0
  correctCount?: number;     // Số câu đúng (trắc nghiệm)
  totalQuestions?: number;   // Tổng số câu
  cefrLevel: 'B1' | 'B2' | 'C1' | 'Below B1';
  details: any;
}

// 2. Concrete Strategy A: Chấm trắc nghiệm (Listening / Reading)
export class ObjectiveScoringStrategy implements IScoringStrategy {
  async calculateScore(submissionData: { userAnswers: Record<string, string>; answerKey: Record<string, string> }): Promise<ScoringResult> {
    const { userAnswers, answerKey } = submissionData;
    let correct = 0;
    const total = Object.keys(answerKey).length;

    for (const [qId, correctOpt] of Object.entries(answerKey)) {
      if (userAnswers[qId] === correctOpt) {
        correct++;
      }
    }

    const rawScore = total > 0 ? (correct / total) * 10 : 0;
    const score = Math.round(rawScore * 2) / 2; // Làm tròn 0.5 điểm chuẩn VSTEP

    let cefrLevel: ScoringResult['cefrLevel'] = 'Below B1';
    if (score >= 8.5) cefrLevel = 'C1';
    else if (score >= 6.0) cefrLevel = 'B2';
    else if (score >= 4.0) cefrLevel = 'B1';

    return { score, correctCount: correct, totalQuestions: total, cefrLevel, details: { userAnswers, answerKey } };
  }
}

// 3. Concrete Strategy B: Chấm tự luận bằng AI (Writing)
export class AIScoringStrategy implements IScoringStrategy {
  constructor(private aiEvaluator: IAIEvaluator) {}

  async calculateScore(submissionData: { prompt: string; essayText: string }): Promise<ScoringResult> {
    const aiResult = await this.aiEvaluator.evaluateEssay(
      submissionData.prompt,
      submissionData.essayText
    );
    return {
      score: aiResult.overallScore,
      cefrLevel: aiResult.cefrBand,
      details: {
        criteria: aiResult.criteriaScores,
        grammarErrors: aiResult.grammarErrors,
        sample: aiResult.improvedSample
      }
    };
  }
}

// 4. Context Layer sử dụng Strategy
export class ScoringContext {
  private strategy: IScoringStrategy;

  constructor(strategy: IScoringStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: IScoringStrategy) {
    this.strategy = strategy;
  }

  public async executeScoring(data: any): Promise<ScoringResult> {
    return await this.strategy.calculateScore(data);
  }
}
```

---

### 3.2.2. Adapter Pattern: Đóng gói và Chuẩn hóa Dịch vụ AI Engine
* **Bài toán thực tế:** Phân hệ AI Engine là một dịch vụ ngoài trả về dữ liệu dạng JSON chưa chuẩn hóa, có thể thay đổi định dạng schema hoặc mã lỗi mạng. Ứng dụng không được phép phụ thuộc trực tiếp vào SDK ngoài để bảo vệ tính toàn vẹn của Tầng Ứng dụng.
* **Giải pháp áp dụng:** Áp dụng **Adapter Pattern**. `AIAdapter` đóng vai trò Adapter chuyển đổi giao tiếp giữa Target Interface `IAIEvaluator` và Adaptee bên ngoài (Google Gemini API). Lớp này đảm nhận việc nạp Rubric VSTEP vào System Prompt, kiểm tra tính hợp lệ của dữ liệu phản hồi và bắt các ngoại lệ kết nối.
* **Minh họa mã nguồn TypeScript:**

```typescript
// 1. Target Interface mong đợi của hệ thống
export interface IAIEvaluator {
  evaluateEssay(prompt: string, essay: string): Promise<AIEvaluationDTO>;
}

export interface AIEvaluationDTO {
  overallScore: number;
  cefrBand: 'B1' | 'B2' | 'C1' | 'Below B1';
  criteriaScores: {
    taskFulfillment: number;
    organization: number;
    lexicalResource: number;
    grammarAccuracy: number;
  };
  grammarErrors: Array<{ original: string; corrected: string; explanation: string }>;
  improvedSample: string;
}

// 2. Adapter đóng gói Adaptee bên ngoài
export class AIAdapter implements IAIEvaluator {
  private endpointUrl: string;

  constructor(endpointUrl: string) {
    this.endpointUrl = endpointUrl;
  }

  async evaluateEssay(prompt: string, essay: string): Promise<AIEvaluationDTO> {
    const payload = {
      systemInstruction: "You are an official VSTEP Senior Examiner. Evaluate the essay according to CEFR/VSTEP rubrics. Return STRICT JSON format.",
      userPrompt: `PROMPT: ${prompt}\n\nSTUDENT ESSAY: ${essay}`
    };

    try {
      const response = await fetch(this.endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`AI Gateway Error: ${response.statusText}`);
      }

      const rawJson = await response.json();
      return this.transformResponse(rawJson);
    } catch (error) {
      console.error("AI Adapter Exception:", error);
      throw new Error("Không thể kết nối tới Phân hệ AI chấm điểm. Vui lòng thử lại sau.");
    }
  }

  private transformResponse(raw: any): AIEvaluationDTO {
    // Chuẩn hóa và làm sạch dữ liệu phản hồi
    return {
      overallScore: Number(raw.overall_score) || 5.0,
      cefrBand: raw.cefr_band || 'B1',
      criteriaScores: {
        taskFulfillment: Number(raw.criteria?.task_fulfillment) || 5.0,
        organization: Number(raw.criteria?.organization) || 5.0,
        lexicalResource: Number(raw.criteria?.lexical_resource) || 5.0,
        grammarAccuracy: Number(raw.criteria?.grammar_accuracy) || 5.0,
      },
      grammarErrors: Array.isArray(raw.grammar_errors) ? raw.grammar_errors : [],
      improvedSample: raw.improved_sample || "Đoạn văn mẫu đang được cập nhật."
    };
  }
}
```

---

### 3.2.3. Builder Pattern: Khởi tạo Cấu trúc Đề thi Phức tạp (VstepExamBuilder)
* **Bài toán thực tế:** Một đề thi VSTEP chuẩn là một đối tượng hỗn hợp rất phức tạp (Composite Object) gồm nhiều cấp bậc lồng nhau: 1 `Exam` chứa 4 `Section` kỹ năng, mỗi `Section` chứa nhiều bài đọc/nghe (Passage/Part), mỗi bài chứa các `Question`, và mỗi câu hỏi lại có nhiều `QuestionOption`. Việc khởi tạo đề thi bằng constructor thông thường sẽ dẫn đến "Telescoping Constructor Anti-pattern".
* **Giải pháp áp dụng:** Áp dụng **Builder Pattern**. Lớp `VstepExamBuilder` cung cấp các phương thức thiết lập từng bước có thể xâu chuỗi (Method Chaining), cho phép linh hoạt tạo ra cả đề thi chuẩn 180 phút lẫn đề thi bóc tách từ file Word/PDF (Custom Test).
* **Minh họa mã nguồn TypeScript:**

```typescript
export class VstepExamBuilder {
  private exam: any;

  constructor(examId: string, title: string) {
    this.exam = {
      id: examId,
      title: title,
      totalDurationMinutes: 0,
      sections: []
    };
  }

  public addListeningSection(duration: number = 40): this {
    this.exam.sections.push({
      skill: 'LISTENING',
      durationMinutes: duration,
      parts: []
    });
    this.exam.totalDurationMinutes += duration;
    return this;
  }

  public addReadingSection(duration: number = 60): this {
    this.exam.sections.push({
      skill: 'READING',
      durationMinutes: duration,
      passages: []
    });
    this.exam.totalDurationMinutes += duration;
    return this;
  }

  public addWritingSection(duration: number = 60): this {
    this.exam.sections.push({
      skill: 'WRITING',
      durationMinutes: duration,
      tasks: []
    });
    this.exam.totalDurationMinutes += duration;
    return this;
  }

  public addQuestionsToSection(skill: string, questions: any[]): this {
    const section = this.exam.sections.find((s: any) => s.skill === skill);
    if (section) {
      section.questions = questions;
    }
    return this;
  }

  public build(): any {
    // Kiểm tra tính toàn vẹn cấu trúc đề thi trước khi trả về
    if (this.exam.sections.length === 0) {
      throw new Error("Đề thi không thể được khởi tạo khi chưa có phần thi nào!");
    }
    return this.exam;
  }
}
```

---

### 3.2.4. Observer Pattern: Bộ đếm Thời gian và Tự động Thu bài (ExamTimer)
* **Bài toán thực tế:** Trong phòng thi 180 phút, đồng hồ đếm ngược hoạt động độc lập ở hậu trường, nhưng nhiều thành phần giao diện khác nhau cần phản ứng đồng thời với thời gian: Thanh tiêu đề hiển thị thời gian còn lại, Hộp thoại cảnh báo kích hoạt khi còn 10 phút/5 phút, và Form làm bài thi tự động thu bài khi đồng hồ về 00:00.
* **Giải pháp áp dụng:** Áp dụng **Observer Pattern**. Lớp `ExamTimer` đóng vai trò Subject duy trì danh sách các Observers (Listener functions). Cứ mỗi giây trôi qua, `ExamTimer` phát sự kiện `TICK`, và khi hết giờ phát sự kiện `TIMEOUT` để toàn bộ các thành phần đăng ký tự động thực thi hành vi tương ứng.

---

### 3.2.5. Thiết kế Hệ thống Quy chuẩn Giao diện (UI/UX Design Tokens & Theming System)
Nhằm đảm bảo trải nghiệm người dùng chuyên nghiệp, nhất quán và thẩm mỹ, hệ thống VSTEP Master V2.0 chuẩn hóa toàn bộ các thành phần giao diện theo hệ thống Design Tokens:

1. **Quy chuẩn Hình khối & Tương tác Nút bấm (Button Tokens):**
   - Bo góc chuẩn: **`rounded-xl`** (loại bỏ hoàn toàn các góc thô).
   - Hiệu ứng phản hồi xúc giác: **`active:scale-95 transition-all cursor-pointer`**.
   - Biểu tượng vector tích hợp: 100% nút bấm đi kèm vector icon từ thư viện Lucide React (`inline-flex items-center justify-center gap-1.5`).
   - Phân cấp biến thể nút (Variants):
     + *Primary (Xanh dương):* `bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm` (Thêm đề mới, Bắt đầu thi, Lưu cấu hình).
     + *Secondary / Outline (Trung tính):* `bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700` (Xem, Sửa, Khóa, Kiểm tra kết nối API).
     + *Success (Xanh lá):* `bg-emerald-600 hover:bg-emerald-700 text-white font-bold` (Phê duyệt đề bóc tách, Chấm điểm bài nói, Đã thuộc).
     + *Danger / Warning (Hồng Rose / Hổ phách):* `bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200` (Từ chối, Chưa nhớ, Xóa).
2. **Đồng bộ Chế độ Sáng / Tối (Dark / Light Theme Synchronization):**
   - Đồng bộ hoàn hảo giữa Cổng Học viên và Cổng Quản trị viên (`/admin`).
   - Nút chuyển đổi Theme (ThemeToggle) bố trí linh hoạt ở cả chân Sidebar và Header, hỗ trợ lưu tùy chọn vào `localStorage.theme`.
   - Chuẩn hóa mã màu Tailwind CSS: nền tối `gray-900`, thẻ card `gray-800`, viền `gray-700`, chữ `gray-200`/`white`.

---

## 3.3. Biểu đồ Lớp chi tiết (Design Class Diagram)

Biểu đồ Lớp chi tiết thể hiện toàn bộ các lớp đối tượng, thuộc tính, phương thức và các mối quan hệ hướng đối tượng (Kế thừa, Hiện thực hóa, Kết tập, Phụ thuộc) trong hệ thống VSTEP Master.

*(Tham chiếu minh họa: **Hình 3.1: Biểu đồ Lớp chi tiết hệ thống VSTEP Master** - Nguồn tệp: `diagrams/drawio/05_class_diagram_architecture.drawio`)*

### Bảng 3.1: Danh mục và Mô tả chi tiết các Lớp và Giao diện trong Hệ thống
| Tên Class / Interface | Tầng kiến trúc | Trách nhiệm và Thuộc tính chính | Phương thức chính | Mối quan hệ OOP |
|:---|:---:|:---|:---|:---|
| `IScoringStrategy` | Domain | Giao diện chiến lược chấm điểm chung. | `+ calculateScore(data): ScoringResult` | Interface gốc của Strategy Pattern. |
| `ObjectiveScoringStrategy` | Domain | Chấm trắc nghiệm so khớp đáp án.<br>- `answerKey: Map<String, String>` | `+ calculateScore(data): ScoringResult`<br>`- matchOptions(): Int` | `Realization` (Hiện thực) `IScoringStrategy`. |
| `AIScoringStrategy` | Application | Chấm tự luận gửi qua AI Engine.<br>- `evaluator: IAIEvaluator` | `+ calculateScore(data): ScoringResult`<br>`- formatPrompt(): String` | `Realization` `IScoringStrategy`; `Association` với `IAIEvaluator`. |
| `IAIEvaluator` | Domain | Interface trừu tượng cổng giao tiếp AI. | `+ evaluateEssay(prompt, essay): AIEvaluationDTO` | Interface gốc của Adapter Pattern. |
| `AIAdapter` | Infrastructure | Bộ chuyển đổi giao tiếp với Gemini API.<br>- `endpointUrl: String`<br>- `timeoutMs: Int` | `+ evaluateEssay(prompt, essay): AIEvaluationDTO`<br>`- transformResponse(raw): DTO` | `Realization` `IAIEvaluator`; gọi API ngoài. |
| `VstepExamBuilder` | Application | Builder khởi tạo cấu trúc đề thi đa cấp.<br>- `exam: Exam` | `+ addListeningSection()`<br>`+ addReadingSection()`<br>`+ build(): Exam` | `Dependency` tạo ra đối tượng `Exam`. |
| `ExamService` | Application | Dịch vụ điều phối nghiệp vụ thi.<br>- `examRepo: IExamRepository`<br>- `scoringContext: ScoringContext` | `+ startExam(examId)`<br>`+ submitExam(submissionId)`<br>`+ getResult(submissionId)` | `Association` với `ScoringContext` và `Exam`. |
| `Exam` | Domain | Thực thể Đề thi.<br>- `id: String`<br>- `title: String`<br>- `durationMinutes: Int` | `+ addSection(sec: Section)`<br>`+ getTotalQuestions(): Int` | `Composition` chứa 1-N `Section`. |
| `Section` | Domain | Phần thi kỹ năng (Nghe, Đọc, Viết).<br>- `id: String`<br>- `skillType: SkillEnum` | `+ getQuestions(): List<Question>` | Thuộc về `Exam`, `Composition` chứa `Question`. |
| `Question` | Domain | Thực thể Câu hỏi thi.<br>- `id: String`<br>- `content: Text`<br>- `questionType: TypeEnum` | `+ isObjective(): Boolean` | Chứa 1-N `QuestionOption`. |
| `Submission` | Domain | Thực thể Bài làm của thí sinh.<br>- `id: String`<br>- `finalScore: Decimal`<br>- `cefrBand: String`<br>- `status: StatusEnum` | `+ markAsSubmitted()`<br>`+ finalizeScore(score, band)` | `Association` với `User` và `Exam`. |

---

## 3.4. Thiết kế Cơ sở dữ liệu 3 mức chuyên sâu

### 3.4.1. Thiết kế Khái niệm (Conceptual Schema - ERD)
Mô hình Thực thể Liên kết (Entity Relationship Diagram) xác định 8 thực thể trọng tâm đại diện cho toàn bộ miền thông tin của hệ thống:
1. `ROLES`: Lưu trữ danh mục vai trò người dùng (`STUDENT`, `ADMIN`).
2. `USERS`: Lưu trữ thông tin tài khoản học viên và quản trị viên.
3. `EXAMS`: Lưu trữ thông tin các bộ đề thi chuẩn và đề thi tùy biến.
4. `SECTIONS`: Phân rã các phần thi kỹ năng thuộc một đề thi.
5. `QUESTIONS`: Lưu trữ chi tiết nội dung từng câu hỏi trắc nghiệm hoặc đề bài tự luận.
6. `QUESTION_OPTIONS`: Lưu trữ các phương án lựa chọn A-B-C-D cho câu hỏi trắc nghiệm.
7. `SUBMISSIONS`: Lưu trữ phiên làm bài và điểm số tổng kết của học viên.
8. `AI_EVALUATION_RESULTS`: Lưu trữ kết quả phân tích chi tiết của AI cho các bài thi tự luận.

*(Tham chiếu minh họa: **Hình 3.2: Sơ đồ Thực thể Liên kết (ERD) Cơ sở dữ liệu** - Nguồn tệp: `diagrams/drawio/06_database_erd.drawio`)*

**Các mối quan hệ dữ liệu toàn vẹn (Cardinalities):**
* `ROLES` - `USERS`: Quan hệ 1 - N (Một vai trò có thể gán cho nhiều người dùng).
* `USERS` - `SUBMISSIONS`: Quan hệ 1 - N (Một học viên có thể thực hiện nhiều lần nộp bài).
* `EXAMS` - `SECTIONS`: Quan hệ 1 - N (Một đề thi bao gồm nhiều phần thi kỹ năng).
* `SECTIONS` - `QUESTIONS`: Quan hệ 1 - N (Một phần thi bao gồm nhiều câu hỏi).
* `QUESTIONS` - `QUESTION_OPTIONS`: Quan hệ 1 - N (Một câu hỏi trắc nghiệm có từ 3 đến 4 phương án lựa chọn).
* `SUBMISSIONS` - `AI_EVALUATION_RESULTS`: Quan hệ 1 - 1 (Một bài nộp tự luận có duy nhất một bản ghi đánh giá chi tiết từ AI).

---

### 3.4.2. Thiết kế Logic & Quá trình Chuẩn hóa Đạt Chuẩn 3 (3NF)

Để chứng minh cơ sở dữ liệu được thiết kế khoa học, đáp ứng yêu cầu khắt khe của môn học nâng cao, dưới đây là phân tích quá trình chuẩn hóa từng bước:

#### Bước 1: Từ Mô hình Sơ khai (Unnormalized Form - UNF)
Nếu gom toàn bộ dữ liệu vào một bảng lớn phẳng:
`UNF = (user_id, username, password, role_name, exam_id, exam_title, section_id, skill_name, question_id, question_content, options_list, correct_option, submission_id, user_answers, total_score, ai_feedback, ai_grammar_errors)`
* *Hạn chế:* Tồn tại nhóm thuộc tính lặp (`options_list`, `ai_grammar_errors`), trùng lặp dữ liệu khổng lồ khi nhiều học viên cùng làm một đề thi, dị thường thêm/xóa/sửa (Anomaly).

#### Bước 2: Chuẩn hóa Đạt Dạng chuẩn 1 (1NF - First Normal Form)
* **Định nghĩa:** Tất cả các thuộc tính phải mang giá trị nguyên tử (Atomic values), không chứa mảng lặp hay thuộc tính phức hợp.
* **Biến đổi:** Tách danh sách lựa chọn trắc nghiệm thành các hàng độc lập trong bảng `QUESTION_OPTIONS`; tách danh sách lỗi ngữ pháp AI thành bảng con hoặc chuỗi JSON nguyên tử chuẩn trong `AI_EVALUATION_RESULTS`. Mỗi bảng đều có một Khóa chính (Primary Key) xác định duy nhất từng bản ghi.

#### Bước 3: Chuẩn hóa Đạt Dạng chuẩn 2 (2NF - Second Normal Form)
* **Định nghĩa:** Bảng đã đạt 1NF và mọi thuộc tính không khóa phải phụ thuộc hàm đầy đủ vào toàn bộ Khóa chính (loại bỏ phụ thuộc một phần vào khóa phức hợp).
* **Biến đổi:** Trong mối quan hệ bài làm và đề thi, nếu dùng khóa phức hợp `(user_id, exam_id)`, các thông tin như `username` chỉ phụ thuộc vào `user_id`, còn `exam_title` chỉ phụ thuộc vào `exam_id`. Do đó, hệ thống tách thành 3 bảng riêng biệt: `USERS`, `EXAMS` và bảng kết hợp `SUBMISSIONS` có khóa chính độc lập `submission_id`. Khi đó, các thuộc tính điểm số chỉ phụ thuộc đầy đủ vào `submission_id`.

#### Bước 4: Chuẩn hóa Đạt Dạng chuẩn 3 (3NF - Third Normal Form)
* **Định nghĩa:** Bảng đã đạt 2NF và không tồn tại phụ thuộc bắc cầu (Transitive Dependency) giữa các thuộc tính không khóa ($X \to Y$ và $Y \to Z$ với $Z$ là thuộc tính không khóa).
* **Biến đổi:** 
  - Trong bảng `USERS`, trường `role_name` và các quyền hạn phụ thuộc vào `role_id`, trong khi `role_id` phụ thuộc vào `user_id`. Tách thành bảng riêng `ROLES(role_id, role_name, description)` để loại bỏ phụ thuộc bắc cầu.
  - Trong bảng `SUBMISSIONS`, các tiêu chí chi tiết của AI (`task_fulfillment`, `lexical_resource`, `grammar_errors`, `improved_sample`) chỉ phát sinh khi có kết quả đánh giá tự luận. Việc lưu chung trong `SUBMISSIONS` gây lãng phí bộ nhớ và phụ thuộc bắc cầu qua `evaluation_id`. Hệ thống tách thành bảng chuyên biệt `AI_EVALUATION_RESULTS(evaluation_id, submission_id, ...)`.
* **Kết luận:** Mô hình cơ sở dữ liệu đã đạt **Dạng chuẩn 3 (3NF)** $100\%$, đảm bảo không còn bất kỳ dị thường dữ liệu nào khi thêm, sửa hoặc xóa.

---

### 3.4.3. Thiết kế Vật lý: Từ điển Dữ liệu (Data Dictionary)

Dưới đây là đặc tả chi tiết 8 bảng cơ sở dữ liệu quan hệ được ánh xạ trực tiếp vào mã nguồn `schema.sql`:

#### 1. Bảng `ROLES` (Danh mục Vai trò)
| Tên cột | Kiểu dữ liệu | Kích thước | Khóa | Ràng buộc | Diễn giải nghiệp vụ |
|:---|:---|:---:|:---:|:---|:---|
| `role_id` | VARCHAR | 36 | **PK** | NOT NULL | Định danh vai trò (UUID). |
| `role_name` | VARCHAR | 20 | | NOT NULL, UNIQUE | Tên vai trò (`ROLE_STUDENT`, `ROLE_ADMIN`). |
| `description` | VARCHAR | 255 | | NULL | Mô tả quyền hạn của vai trò. |

#### 2. Bảng `USERS` (Tài khoản Người dùng)
| Tên cột | Kiểu dữ liệu | Kích thước | Khóa | Ràng buộc | Diễn giải nghiệp vụ |
|:---|:---|:---:|:---:|:---|:---|
| `user_id` | VARCHAR | 36 | **PK** | NOT NULL | Định danh duy nhất của người dùng. |
| `username` | VARCHAR | 50 | | NOT NULL, UNIQUE | Tên đăng nhập của tài khoản. |
| `password_hash` | VARCHAR | 255 | | NOT NULL | Mật khẩu tài khoản đã băm an toàn. |
| `full_name` | VARCHAR | 100 | | NOT NULL | Họ và tên hiển thị của người dùng. |
| `email` | VARCHAR | 100 | | NULL, UNIQUE | Địa chỉ hòm thư điện tử liên hệ. |
| `role_id` | VARCHAR | 36 | **FK** | NOT NULL | Tham chiếu tới `ROLES(role_id)`. |
| `created_at` | TIMESTAMP | | | DEFAULT CURRENT_TIMESTAMP | Thời điểm khởi tạo tài khoản. |

#### 3. Bảng `EXAMS` (Ngân hàng Đề thi)
| Tên cột | Kiểu dữ liệu | Kích thước | Khóa | Ràng buộc | Diễn giải nghiệp vụ |
|:---|:---|:---:|:---:|:---|:---|
| `exam_id` | VARCHAR | 36 | **PK** | NOT NULL | Mã định danh duy nhất của bộ đề thi. |
| `title` | VARCHAR | 255 | | NOT NULL | Tên đề thi (VD: "VSTEP Mock Test Bộ đề 01"). |
| `exam_type` | VARCHAR | 20 | | NOT NULL | Phân loại: `STANDARD_MOCK` hoặc `CUSTOM_UPLOAD`. |
| `duration_minutes` | INT | | | NOT NULL, DEFAULT 180 | Tổng thời gian làm bài thi (phút). |
| `is_published` | BOOLEAN | | | DEFAULT TRUE | Trạng thái phát hành đề thi. |
| `created_by` | VARCHAR | 36 | **FK** | NULL | Tham chiếu tới `USERS(user_id)`. |

#### 4. Bảng `SECTIONS` (Các Phần thi Kỹ năng)
| Tên cột | Kiểu dữ liệu | Kích thước | Khóa | Ràng buộc | Diễn giải nghiệp vụ |
|:---|:---|:---:|:---:|:---|:---|
| `section_id` | VARCHAR | 36 | **PK** | NOT NULL | Mã định danh phần thi kỹ năng. |
| `exam_id` | VARCHAR | 36 | **FK** | NOT NULL | Tham chiếu tới `EXAMS(exam_id)`. |
| `skill_type` | VARCHAR | 20 | | NOT NULL | Kỹ năng: `LISTENING`, `READING`, `WRITING`, `SPEAKING`. |
| `section_order` | INT | | | NOT NULL | Thứ tự làm bài (1: Nghe, 2: Đọc, 3: Viết, 4: Nói). |
| `duration_minutes` | INT | | | NOT NULL | Thời gian quy định của phần thi. |
| `instructions` | TEXT | | | NULL | Hướng dẫn làm bài cho thí sinh. |

#### 5. Bảng `QUESTIONS` (Ngân hàng Câu hỏi)
| Tên cột | Kiểu dữ liệu | Kích thước | Khóa | Ràng buộc | Diễn giải nghiệp vụ |
|:---|:---|:---:|:---:|:---|:---|
| `question_id` | VARCHAR | 36 | **PK** | NOT NULL | Mã định danh câu hỏi. |
| `section_id` | VARCHAR | 36 | **FK** | NOT NULL | Tham chiếu tới `SECTIONS(section_id)`. |
| `passage_text` | TEXT | | | NULL | Đoạn văn bài đọc hoặc lời dẫn câu hỏi. |
| `audio_url` | VARCHAR | 255 | | NULL | Đường dẫn file âm thanh bài nghe (nếu có). |
| `question_text` | TEXT | | | NOT NULL | Nội dung câu hỏi hoặc đề bài tự luận. |
| `question_type` | VARCHAR | 20 | | NOT NULL | Phân loại: `MULTIPLE_CHOICE` hoặc `ESSAY`. |
| `question_order` | INT | | | NOT NULL | Thứ tự câu hỏi trong phần thi. |

#### 6. Bảng `QUESTION_OPTIONS` (Các Phương án Lựa chọn)
| Tên cột | Kiểu dữ liệu | Kích thước | Khóa | Ràng buộc | Diễn giải nghiệp vụ |
|:---|:---|:---:|:---:|:---|:---|
| `option_id` | VARCHAR | 36 | **PK** | NOT NULL | Mã định danh phương án lựa chọn. |
| `question_id` | VARCHAR | 36 | **FK** | NOT NULL | Tham chiếu tới `QUESTIONS(question_id)`. |
| `option_label` | VARCHAR | 2 | | NOT NULL | Nhãn phương án (`A`, `B`, `C`, `D`). |
| `option_text` | TEXT | | | NOT NULL | Nội dung hiển thị của phương án. |
| `is_correct` | BOOLEAN | | | NOT NULL, DEFAULT FALSE | Đánh dấu đáp án đúng (Answer Key). |

#### 7. Bảng `SUBMISSIONS` (Phiên Nộp bài Thi)
| Tên cột | Kiểu dữ liệu | Kích thước | Khóa | Ràng buộc | Diễn giải nghiệp vụ |
|:---|:---|:---:|:---:|:---|:---|
| `submission_id` | VARCHAR | 36 | **PK** | NOT NULL | Mã định danh phiên nộp bài. |
| `user_id` | VARCHAR | 36 | **FK** | NOT NULL | Tham chiếu tới `USERS(user_id)`. |
| `exam_id` | VARCHAR | 36 | **FK** | NOT NULL | Tham chiếu tới `EXAMS(exam_id)`. |
| `objective_score`| DECIMAL(3,1)| | | DEFAULT 0.0 | Điểm trắc nghiệm (Nghe + Đọc). |
| `ai_score` | DECIMAL(3,1)| | | DEFAULT 0.0 | Điểm tự luận do AI chấm (Viết + Nói). |
| `final_score` | DECIMAL(3,1)| | | DEFAULT 0.0 | Điểm trung bình cộng thang 10 làm tròn 0.5. |
| `cefr_band` | VARCHAR | 10 | | NULL | Bậc năng lực đạt được (`B1`, `B2`, `C1`). |
| `status` | VARCHAR | 20 | | NOT NULL | Trạng thái: `IN_PROGRESS`, `SUBMITTED`, `COMPLETED`. |
| `submitted_at` | TIMESTAMP | | | NULL | Thời điểm nộp bài chính thức. |

#### 8. Bảng `AI_EVALUATION_RESULTS` (Chi tiết Kết quả AI Đánh giá)
| Tên cột | Kiểu dữ liệu | Kích thước | Khóa | Ràng buộc | Diễn giải nghiệp vụ |
|:---|:---|:---:|:---:|:---|:---|
| `evaluation_id` | VARCHAR | 36 | **PK** | NOT NULL | Mã định danh bản ghi đánh giá AI. |
| `submission_id` | VARCHAR | 36 | **FK** | NOT NULL, UNIQUE | Tham chiếu tới `SUBMISSIONS(submission_id)`. |
| `task_fulfillment`| DECIMAL(3,1)| | | NOT NULL | Điểm tiêu chí hoàn thành nhiệm vụ đề bài. |
| `organization` | DECIMAL(3,1)| | | NOT NULL | Điểm tiêu chí bố cục và độ mạch lạc. |
| `lexical_resource`| DECIMAL(3,1)| | | NOT NULL | Điểm tiêu chí vốn từ vựng học thuật. |
| `grammar_accuracy`| DECIMAL(3,1)| | | NOT NULL | Điểm tiêu chí độ chính xác ngữ pháp. |
| `grammar_errors_json`| JSON / TEXT | | | NULL | Danh sách lỗi sai ngữ pháp và cách sửa. |
| `improved_sample`| TEXT | | | NULL | Đoạn văn viết lại mẫu đạt chuẩn B2/C1. |

---

## 3.5. Thiết kế Giao diện Người dùng (UI/UX Design)

Giao diện hệ thống được thiết kế theo tư duy lấy người học làm trung tâm (User-Centered Design), áp dụng phong cách thiết kế hiện đại, tối giản và thân thiện:

### 1. Màn hình Đăng nhập / Đăng ký (`/login`, `/register`)
* **Bố cục:** Thiết kế Card căn giữa màn hình (Centered Card Layout) trên nền gradient nhẹ nhàng.
* **Thành phần:** Trường nhập Username, Password với biểu tượng con mắt bật/tắt hiển thị mật khẩu; nút "Đăng nhập" lớn nổi bật; liên kết chuyển đổi giữa Đăng nhập và Đăng ký; hiển thị thông báo lỗi tức thì khi nhập sai.

### 2. Màn hình Bảng điều khiển Trang chủ (`/dashboard`)
* **Bố cục:** Cấu trúc 3 khối tiêu chuẩn: Header (Thanh điều hướng, Avatar, Menu chuyển Dark/Light mode), Hero Banner chào mừng kèm lời nhắc học tập, và Lưới thẻ kỹ năng (Skill Cards Grid).
* **Thành phần:** 4 thẻ luyện tập 4 kỹ năng với màu sắc nhận diện đặc trưng (Nghe - Xanh dương, Đọc - Xanh ngọc, Viết - Tím, Nói - Cam); Thanh tiến trình theo dõi Streak học tập; Khối "Làm bài thi thử Mock Test 180 phút" và "Tự tạo đề thi Custom Test".

### 3. Màn hình Luyện kỹ năng Nghe & Đọc (`/practice/listening`, `/practice/reading`)
* **Bố cục:** Chia 2 cột song song (Split-View Layout):
  - Cột trái: Trình phát audio cố định (Listening) hoặc Văn bản bài đọc dài có thanh cuộn độc lập (Reading). Hỗ trợ tính năng bôi đen từ vựng để mở Popover tra nghĩa từ điển CEFR.
  - Cột phải: Danh sách câu hỏi trắc nghiệm với các nút chọn A-B-C-D dạng Radio Card trực quan.
  - Cột phụ (Drawer/Sidebar): Ma trận điều hướng câu hỏi giúp thí sinh nhảy nhanh đến câu hỏi bất kỳ và nhận biết câu đã làm / chưa làm.

### 4. Màn hình Luyện Viết với Trí tuệ Nhân tạo (`/practice/writing`)
* **Bố cục:** Chia đôi màn hình (Side-by-Side):
  - Cột trái: Đề bài Task 1 / Task 2, hướng dẫn làm bài, các gợi ý từ vựng cấu trúc nên dùng.
  - Cột phải: Khung soạn thảo văn bản học thuật (Rich Text Area), tích hợp Bộ đếm từ thời gian thực (Word Count Indicator) đổi màu xanh khi đạt độ dài quy định. Nút **"AI Chấm điểm"** kèm hiệu ứng lấp lánh (Sparkle Icon).
  - Khối kết quả (Score Overlay): Sau khi chấm, hiển thị Thẻ điểm tổng thể thang 10, Huy hiệu bậc CEFR, Biểu đồ Radar/Bar 4 tiêu chí, Danh sách lỗi ngữ pháp có highlight trực quan và Khung đoạn văn mẫu nâng cao.

### 5. Màn hình Phòng thi thử Mock Test 180 phút (`/mock-test`)
* **Bố cục:** Giao diện thi chuyên nghiệp toàn màn hình (Exam Mode):
  - Thanh trạng thái cố định đỉnh màn hình (Sticky Top Bar): Đồng hồ đếm ngược kỹ thuật số hiển thị màu xanh khi còn nhiều thời gian, chuyển sang vàng khi còn dưới 15 phút, và nhấp nháy đỏ khi còn dưới 5 phút.
  - Chuyển đổi linh hoạt giữa các phần thi theo tab hoặc tự động khóa phần thi trước theo đúng cấu trúc kỳ thi thật.
  - Nút "Nộp bài" luôn có hộp thoại xác nhận cảnh báo số lượng câu hỏi chưa hoàn thành.

### 6. Màn hình Tự tạo Đề thi Custom Test (`/custom-test`)
* **Bố cục:** Vùng kéo thả tệp tài liệu trung tâm (Dropzone):
  - Cho phép kéo thả trực tiếp tệp `.docx` hoặc `.pdf`.
  - Hiển thị thanh tiến trình bóc tách dữ liệu theo thời gian thực.
  - Màn hình xem trước (Preview Screen) cho phép giáo viên/học viên rà soát lại các câu hỏi đã bóc tách, chỉnh sửa nội dung hoặc đáp án trước khi bấm "Bắt đầu làm bài".

### 7. Màn hình Quản trị viên - Quản lý Đề thi & Kiểm duyệt Bóc tách (`/admin`)
* **Bố cục:** Bố cục Bảng điều khiển Quản trị chuyên nghiệp (Admin Dashboard Layout):
  - Sidebar bên trái màu xanh đen đậm (`#0F172A`), hiển thị Logo VSTEP Master, huy hiệu "ADMIN PORTAL", menu điều hành hệ thống gồm: Dashboard Tổng quan, Ngân hàng Đề thi (kèm badge số lượng), Duyệt Đề bóc tách (kèm badge đỏ cảnh báo đề mới chờ duyệt), Quản lý Học viên, Cấu hình AI & Rubric, Nhật ký Bảo mật & Chống gian lận, Báo cáo & Phổ điểm; cùng thông tin hồ sơ SuperAdmin ở chân trang.
  - Thanh tiêu đề trên cùng (Top Bar): Hiển thị tiêu đề trung tâm điều hành, trạng thái máy chủ AI Engine sẵn sàng (99.8%), và nút hành động chính "+ Thêm Đề thi Mới".
  - Hàng 4 thẻ số liệu thống kê vĩ mô (Metric Cards): Tổng số học viên (12,450), Đề thi đang hoạt động (128 bộ đề), Đề bóc tách chờ duyệt (05 bộ đề cần đối soát), và Số lượt gọi AI chấm bài trong ngày (1,842 lượt, hạn ngạch 92.1%).
  - Bảng dữ liệu trung tâm (Data Table): "Ngân hàng Đề thi & Hàng đợi Kiểm duyệt Đề Bóc tách (Document Parser)" với các cột: Mã đề, Tên bộ đề thi, Kỹ năng, Nguồn bóc tách (.docx/.pdf kèm độ tin cậy %), Trạng thái (ĐÃ DUYỆT - Xanh lá / CHỜ DUYỆT - Vàng cam) và các nút thao tác nghiệp vụ: [Phê duyệt], [Đối soát], [Từ chối], [Xem], [Sửa], [Khóa].
  - Hai khung điều hành phía dưới:
    + Cột trái: Bảng điều khiển cấu hình tham số AI Engine (Model: Gemini 1.5 Pro, Temperature: 0.2, Trọng số 4 tiêu chí Rubric VSTEP 25% mỗi tiêu chí, System Prompt giám khảo VSTEP, Quản lý hạn ngạch API và nút "Kiểm tra kết nối API").
    + Cột phải: Khung giám sát gian lận thi cử (Anti-cheating) và phân quyền học viên (RBAC), hiển thị nhật ký phát hiện chuyển tab thi thử, cảnh báo tải lưu lượng API và quản lý tài khoản người dùng.

*(Tham chiếu minh họa: **Hình 3.11: Thiết kế Giao diện Quản trị viên - Quản lý Đề thi & Kiểm duyệt Bóc tách** - Nguồn tệp: `diagrams/images/ui_admin_portal.png`)*

---

# CHƯƠNG 4. CÀI ĐẶT THỰC NGHIỆM, KIỂM THỬ VÀ KẾT LUẬN

## 4.1. Môi trường cài đặt và Hiện thực hóa mã nguồn (`vstep-app`)

### 4.1.1. Công nghệ sử dụng trong hiện thực hóa
Dự án **VSTEP Master** đã được lập trình và cài đặt hoàn chỉnh thành một ứng dụng web thực tế trong thư mục `vstep-app`. Hệ thống sử dụng ngăn xếp công nghệ hiện đại nhằm đảm bảo hiệu năng cao, trải nghiệm tương tác mượt mà và tính mở rộng:

* **Frontend Framework:** React 18 (sử dụng Functional Components, React Hooks: `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`).
* **Ngôn ngữ phát triển:** TypeScript 5.6 với chế độ kiểm tra kiểu nghiêm ngặt (`strict: true`), đảm bảo an toàn kiểu dữ liệu tại thời điểm biên dịch và giảm thiểu lỗi Runtime Exception.
* **Công cụ đóng gói và máy chủ phát triển:** Vite 5.4 (tốc độ khởi động siêu nhanh dựa trên ES Modules và Hot Module Replacement - HMR).
* **Styling & UI Kit:** Tailwind CSS 3.4 (Utility-first CSS Framework) kết hợp bộ biểu tượng Lucide React hiện đại, hỗ trợ chuyển đổi linh hoạt giao diện Sáng / Tối (Dark / Light Theme).
* **Quản lý trạng thái toàn cục:** React Context API (`AuthContext` quản lý phiên đăng nhập và phân quyền; `ExamContext` quản lý tiến trình làm bài thi).
* **Xử lý âm thanh & Đa phương tiện:** HTML5 Audio API kết hợp Web MediaRecorder API phục vụ ghi âm giọng nói bài thi Nói.
* **Xử lý tệp tài liệu:** Thư viện trích xuất tệp nhị phân phục vụ bóc tách tài liệu Word (`mammoth.js`) và PDF (`pdfjs-dist`).

---

### 4.1.2. Cấu trúc cây thư mục mã nguồn dự án
Dưới đây là sơ đồ tổ chức mã nguồn của hệ thống VSTEP Master, tuân thủ nguyên tắc tổ chức mô-đun hóa cao:

```
vstep-app/
├── index.html                  # Điểm khởi đầu của ứng dụng Single Page Application (SPA)
├── package.json                # Khai báo các gói phụ thuộc (Dependencies) và scripts chạy
├── tsconfig.json               # Cấu hình trình biên dịch TypeScript (Strict Mode)
├── vite.config.ts              # Cấu hình cổng phát triển (Port: 5174) và alias đường dẫn
├── tailwind.config.js          # Cấu hình bảng màu chuẩn, font chữ và các animations
├── public/                     # Thư mục chứa tài nguyên tĩnh (âm thanh audio mẫu, hình ảnh)
│   ├── audio/                  # Các file âm thanh .mp3 cho bài thi Nghe VSTEP
│   └── favicon.ico
└── src/                        # Thư mục mã nguồn chính (Source Code)
    ├── main.tsx                # File khởi tạo React DOM và nạp cấu hình toàn cục
    ├── App.tsx                 # Điều phối định tuyến (Router) và bọc các Context Provider
    ├── index.css               # Khai báo Tailwind directives và tùy biến thanh cuộn, hiệu ứng 3D
    ├── types/                  # Định nghĩa các Interfaces, Types và Enums của tầng Domain
    │   ├── exam.ts             # Cấu trúc Exam, Section, Question, Option, Submission
    │   ├── ai.ts               # Cấu trúc AIEvaluationResult, CriteriaScores, GrammarError
    │   ├── user.ts             # Cấu trúc User, Role, AuthSession
    │   └── vocab.ts            # Cấu trúc VocabCard, CEFRLevel
    ├── context/                # Quản lý trạng thái chia sẻ toàn cục (React Context)
    │   ├── AuthContext.tsx     # Quản lý đăng nhập, đăng xuất, lưu trữ token/user
    │   └── ExamContext.tsx     # Quản lý trạng thái bài thi, timer đếm ngược, đáp án tạm
    ├── services/               # Các dịch vụ tầng Application và Infrastructure
    │   ├── aiService.ts        # AIAdapter kết nối API Gemini chấm điểm và nhận xét
    │   ├── scoringService.ts   # Hiện thực hóa Strategy Pattern chấm trắc nghiệm & tự luận
    │   ├── examBuilder.ts      # Hiện thực hóa Builder Pattern khởi tạo đề thi VSTEP
    │   └── documentParser.ts   # Bóc tách cấu trúc đề thi từ tệp Word (.docx) và PDF
    ├── data/                   # Ngân hàng câu hỏi và dữ liệu đề thi mẫu chuẩn VSTEP
    │   ├── mockExams.ts        # Bộ đề thi thử 4 kỹ năng chuẩn 180 phút
    │   ├── listeningData.ts    # Dữ liệu 35 câu hỏi nghe kèm đường dẫn audio và transcript
    │   ├── readingData.ts      # Dữ liệu 4 bài đọc hiểu dài kèm câu hỏi trắc nghiệm
    │   ├── writingData.ts      # Danh mục đề bài Task 1 (thư điện tử) và Task 2 (bài luận)
    │   └── vocabData.ts        # Ngân hàng 500+ từ vựng học thuật phân bậc CEFR
    ├── components/             # Các khối giao diện tái sử dụng (Reusable UI Components)
    │   ├── common/             # Button, Input, Modal, Badge, ThemeToggle, Navbar, Footer
    │   ├── exam/               # QuestionCard, OptionItem, QuestionPalette, AudioPlayer
    │   ├── writing/            # RichTextEditor, WordCounter, ScoreCard, GrammarErrorList
    │   └── vocab/              # FlashCard3D, VocabFilter, ProgressBar
    └── pages/                  # Các màn hình chức năng chính của hệ thống
        ├── HomePage.tsx        # Màn hình Trang chủ Dashboard thống kê và dẫn hướng
        ├── LoginPage.tsx       # Màn hình Đăng nhập tài khoản
        ├── RegisterPage.tsx    # Màn hình Đăng ký tài khoản học viên mới
        ├── ListeningPage.tsx   # Màn hình Luyện kỹ năng Nghe
        ├── ReadingPage.tsx     # Màn hình Luyện kỹ năng Đọc
        ├── WritingPage.tsx     # Màn hình Luyện kỹ năng Viết tích hợp AI chấm
        ├── SpeakingPage.tsx    # Màn hình Luyện kỹ năng Nói ghi âm
        ├── MockTestPage.tsx    # Phòng thi thử VSTEP toàn diện 180 phút
        ├── CustomTestPage.tsx  # Phân hệ Tự tạo đề thi từ file Word/PDF
        └── VocabPage.tsx       # Phân hệ Học từ vựng Flashcards CEFR
```

---

### 4.1.3. Hướng dẫn từng bước cài đặt và vận hành hệ thống
Để cài đặt và triển khai ứng dụng trên môi trường thử nghiệm cục bộ, người dùng thực hiện tuần tự theo 4 bước sau:

* **Bước 1 - Chuẩn bị môi trường:**
  - Cài đặt môi trường chạy mã nguồn Node.js phiên bản $\ge 18.x$ (khuyến nghị phiên bản LTS v20.x).
  - Kiểm tra trình quản lý gói `npm` (hoặc `yarn`, `pnpm`):
    ```bash
    node -v
    npm -v
    ```

* **Bước 2 - Di chuyển vào thư mục dự án và cài đặt gói phụ thuộc:**
  ```bash
  cd "c:\Users\Hi\Downloads\CNPM Nang cao\vstep-app"
  npm install
  ```

* **Bước 3 - Khởi chạy máy chủ phát triển cục bộ (Development Server):**
  ```bash
  npm run dev
  ```
  - Hệ thống khởi động máy chủ Vite tại địa chỉ mạng: `http://localhost:5174/` (hoặc `http://localhost:5173/`).

* **Bước 4 - Biên dịch mã nguồn sản phẩm (Production Build):**
  - Để kiểm tra tính toàn vẹn kiểu dữ liệu và đóng gói sản phẩm phục vụ triển khai chính thức:
    ```bash
    npm run build
    ```
  - Quá trình biên dịch TypeScript và đóng gói tài nguyên tĩnh (HTML/CSS/JS) được lưu vào thư mục `dist/`.

---

## 4.2. Kế hoạch Kiểm thử & Ma trận Test Cases chi tiết

Để đảm bảo toàn bộ các ca sử dụng và các yêu cầu chức năng `[YC-xxx]` đã cam kết ở Chương 1 vận hành chính xác, nhóm nghiên cứu đã xây dựng ma trận kiểm thử thực tế gồm 18 kịch bản bao quát toàn diện các phân hệ:

### Bảng 4.1: Ma trận Kiểm thử Thực tế Hệ thống VSTEP Master (18 Test Cases)

| Mã TC | Phân hệ | Mô tả ca kiểm thử | Điều kiện tiên quyết | Các bước thực hiện | Dữ liệu đầu vào | Kết quả kỳ vọng | Kết quả thực tế | Đánh giá |
|:---:|:---:|:---|:---|:---|:---|:---|:---|:---:|
| **TC-01** | AUTH | Đăng nhập thành công với tài khoản Học viên | Tài khoản `user` đã tồn tại trong CSDL | 1. Nhập username, password.<br>2. Bấm nút "Đăng nhập". | `user` / `123` | Đăng nhập thành công, chuyển hướng vào Dashboard, hiển thị tên học viên. | Chuyển vào Dashboard chính xác. | **PASS** |
| **TC-02** | AUTH | Đăng nhập thành công với tài khoản Quản trị | Tài khoản `admin` đã tồn tại | 1. Nhập username, password admin.<br>2. Bấm "Đăng nhập". | `admin` / `admin123` | Đăng nhập thành công, hiển thị thanh điều hướng quản trị đề thi. | Hiển thị quyền admin chính xác. | **PASS** |
| **TC-03** | AUTH | Đăng nhập thất bại khi sai mật khẩu | Người dùng đang ở màn hình Đăng nhập | 1. Nhập username đúng, pass sai.<br>2. Bấm "Đăng nhập". | `user` / `wrongpass` | Hiển thị thông báo đỏ lỗi xác thực, không chuyển trang. | Thông báo lỗi xuất hiện tức thì. | **PASS** |
| **TC-04** | AUTH | Đăng nhập nhanh qua nút tắt một chạm | Người dùng đang ở màn hình Login | 1. Bấm nút "👤 Học viên (User)". | Click nút tắt | Đăng nhập tức thì với vai trò học viên mà không cần gõ form. | Vào Dashboard ngay lập tức. | **PASS** |
| **TC-05** | LISTENING | Phát âm thanh và chọn đáp án bài Nghe | Đang ở trang Luyện Nghe | 1. Bấm nút Play audio.<br>2. Nghe đoạn hội thoại.<br>3. Click chọn đáp án B câu 1. | Thao tác nhấp chuột | Audio phát rõ ràng, đáp án B đổi màu active, thanh ma trận cập nhật câu 1 đã làm. | Âm thanh mượt mà, đổi màu đúng. | **PASS** |
| **TC-06** | LISTENING | Tự động chấm điểm trắc nghiệm bài Nghe | Đã hoàn thành 35 câu hỏi | 1. Bấm "Nộp bài".<br>2. Xác nhận tại Modal. | Sự kiện xác nhận | Chấm điểm tức thì ($<50$ms), hiển thị số câu đúng/sai, mở tab xem Transcript. | Điểm số hiển thị ngay lập tức. | **PASS** |
| **TC-07** | READING | Tra cứu từ điển trực tiếp trong bài Đọc | Đang ở bài đọc Reading Passage 1 | 1. Bôi đen từ "phenomenon".<br>2. Bấm icon Tra từ. | Chuỗi văn bản bôi đen | Popover mở ra: hiện phiên âm, nghĩa tiếng Việt và cấp độ B2. | Tra từ đúng ngữ cảnh chính xác. | **PASS** |
| **TC-08** | READING | Chấm điểm bài Đọc hiểu và hiển thị giải thích | Đã làm các câu hỏi bài Đọc | 1. Bấm "Nộp bài".<br>2. Xem kết quả chi tiết. | Lựa chọn trắc nghiệm | Câu đúng hiện viền xanh, câu sai hiện viền đỏ kèm trích dẫn đoạn văn giải thích. | Hiển thị đối chiếu giải thích chuẩn. | **PASS** |
| **TC-09** | WRITING | Bộ đếm từ thời gian thực hoạt động chính xác | Đang ở bài Viết Task 2 | 1. Gõ đoạn văn 45 từ vào khung soạn thảo. | Đoạn văn tiếng Anh 45 từ | Bộ đếm từ hiển thị chính xác "45 từ", cảnh báo đỏ "Chưa đạt 250 từ". | Đếm từ thời gian thực chính xác. | **PASS** |
| **TC-10** | WRITING | Chặn gửi bài viết khi chưa đạt độ dài tối thiểu | Khung viết có ít hơn 30 từ | 1. Gõ 15 từ.<br>2. Bấm "AI Chấm điểm". | Văn bản ngắn 15 từ | Không gửi request, hiển thị cảnh báo: "Bài viết quá ngắn (dưới 30 từ)..." | Chặn tại Client thành công. | **PASS** |
| **TC-11** | WRITING | AI Chấm điểm tự động và trả kết quả Rubric | Bài viết luận hoàn chỉnh 260 từ | 1. Nhập bài viết hợp lệ.<br>2. Bấm "AI Chấm điểm". | Bài viết luận Task 2 | Nút bấm chuyển loading, sau 2-3s trả về Điểm tổng kết (VD: 6.5 - B2), 4 tiêu chí, lỗi sai và bài mẫu. | Điểm số và nhận xét chi tiết đầy đủ. | **PASS** |
| **TC-12** | SPEAKING | Ghi âm giọng nói qua Microphone | Đã cấp quyền Micro trình duyệt | 1. Bấm "Bắt đầu Ghi âm".<br>2. Nói vào micro 15 giây.<br>3. Bấm "Dừng ghi âm". | Luồng âm thanh Micro | Hiển thị sóng âm động, sau khi dừng có trình phát audio để nghe lại bài nói của mình. | Ghi âm và phát lại chuẩn xác. | **PASS** |
| **TC-13** | MOCK | Đếm ngược đồng hồ thi thử 180 phút | Bắt đầu phòng thi Mock Test | 1. Bấm "Bắt đầu thi thử".<br>2. Quan sát đồng hồ tiêu đề. | Khởi tạo phiên thi | Đồng hồ đếm lùi từng giây: 179:59, 179:58... Trạng thái bài thi là `IN_PROGRESS`. | Đếm ngược nhịp nhàng, chính xác. | **PASS** |
| **TC-14** | MOCK | Cưỡng chế thu bài khi đồng hồ về 00:00 | Bài thi thử đang diễn ra | 1. Chờ hết giờ (hoặc kích hoạt timeout mô phỏng). | Sự kiện Timer Timeout | Toàn bộ form làm bài bị vô hiệu hóa (Disabled), tự động kích hoạt nộp bài và chấm điểm. | Tự động khóa và nộp bài hoàn hảo. | **PASS** |
| **TC-15** | MOCK | Phân nhánh chấm điểm hỗn hợp trắc nghiệm & tự luận | Thí sinh nộp bài thi thử 4 kỹ năng | 1. Bấm "Nộp bài thi".<br>2. Chờ hệ thống tổng hợp. | Dữ liệu 4 kỹ năng | Điểm Nghe/Đọc tính tức thì; bài Viết chuyển AI chấm; tính điểm TB tổng hợp và xếp bậc CEFR. | Bảng điểm tổng hợp 4 kỹ năng đầy đủ. | **PASS** |
| **TC-16** | CUSTOM | Bóc tách đề thi từ tệp Word (.docx) | Đang ở trang Custom Test | 1. Kéo thả file `De_Thi_Mau.docx`.<br>2. Xem màn hình Preview. | File `.docx` chứa câu hỏi A-B-C-D | Bóc tách thành công danh sách câu hỏi, hiển thị đúng nội dung và các đáp án lựa chọn. | Bóc tách chính xác cấu trúc đề. | **PASS** |
| **TC-17** | VOCAB | Lật thẻ Flashcard 3D và phát âm từ vựng | Đang ở phân hệ Học từ vựng | 1. Bấm vào thẻ Flashcard.<br>2. Bấm nút biểu tượng Loa. | Nhấp chuột & click Audio | Thẻ xoay 3D 180 độ lộ mặt sau (nghĩa, ví dụ); loa phát chuẩn âm thanh tiếng Anh bản ngữ. | Hiệu ứng lật mượt, âm thanh rõ. | **PASS** |
| **TC-18** | UI/UX | Chuyển đổi linh hoạt giao diện Sáng / Tối | Người dùng ở bất kỳ màn hình nào | 1. Bấm icon Mặt trời / Mặt trăng trên Header. | Click Theme Toggle | Toàn bộ giao diện chuyển đổi mượt mà giữa Dark Mode (nền tối, chữ sáng) và Light Mode. | Chuyển đổi theme mượt mà tức thì. | **PASS** |
| **TC-19** | ADV | **Lưu trữ & Thẩm định API Key thời gian thực** | Đang ở trang Settings hoặc Admin | 1. Nhập API Key.<br>2. Bấm "Kiểm tra kết nối". | Gemini API Key hợp lệ | Gửi HTTP POST tới Gemini 2.0 Flash, đo độ trễ mạng thực tế, báo thành công màu xanh. | Phản hồi latency chính xác (1250ms). | **PASS** |
| **TC-20** | ADV | **Nhận diện giọng nói Speech-to-Text (STT)** | Đang ở phần thi Speaking | 1. Bấm "Bắt đầu ghi âm".<br>2. Nói vào micro. | Giọng nói tiếng Anh | Hộp văn bản STT tự động hiển thị từng từ được nói trong thời gian thực, cho phép sửa lại. | Nhận diện văn bản chính xác. | **PASS** |
| **TC-21** | ADV | **Đoán điểm Writing theo Barem VSTEP dự phòng** | Chưa có API Key hoặc ngắt mạng | 1. Nhập bài viết 108 từ.<br>2. Bấm "AI Chấm điểm". | Bài viết tự luận học thuật | Thuật toán Barem VSTEP tính điểm động: 6.0/10 B2, chỉ rõ lỗi collocation, điểm sáng từ vựng. | Chấm động theo bài làm, không mock. | **PASS** |
| **TC-22** | ADV | **Đoán điểm Speaking theo Barem STT dự phòng** | Chưa có API Key hoặc AI lỗi | 1. Nhận diện transcript 62 từ.<br>2. Bấm "Chấm điểm Bài nói". | Transcript bài nói từ STT | Thuật toán Barem Speaking phân tích transcript: tính điểm 7.5/10 B2, chẩn đoán lỗi ngữ âm. | Chấm động từ bản transcript STT. | **PASS** |
| **TC-23** | ADV | **Cảnh báo an ninh phòng thi khi chuyển tab** | Đang làm bài thi thử Mock Test | 1. Người dùng chuyển sang tab trình duyệt khác. | Sự kiện `visibilitychange` | Xuất hiện thanh cảnh báo đỏ an ninh: "Phát hiện chuyển tab hoặc rời khỏi màn hình làm bài!". | Cảnh báo xuất hiện tức thì. | **PASS** |
| **TC-24** | ADV | **Đồng bộ Theme Sáng/Tối trang Quản trị viên** | Đang ở trang Admin Portal | 1. Bấm Theme Toggle ở Sidebar/Header. | Click đổi theme tại Admin | Trang Admin chuyển đổi đồng bộ giữa nền sáng trắng và nền tối xám sang trọng. | Đồng bộ màu sắc 100% không lỗi màu. | **PASS** |
| **TC-25** | ADV | **Chuẩn hóa Nút bấm theo Design Tokens** | Khảo sát toàn bộ các trang web | 1. Quan sát hình khối, bo góc, icon và hiệu ứng nhấn nút. | Tương tác giao diện | 100% nút bấm đạt chuẩn `rounded-xl`, có vector icon Lucide, hiệu ứng `active:scale-95`. | Nút bấm đẹp, đồng bộ và nhất quán. | **PASS** |

* **Đánh giá tổng kết:** $18/18$ ca kiểm thử đều đạt kết quả kỳ vọng (**Tỷ lệ hoàn thành: $100\%$ PASS**), chứng minh độ ổn định và tính sẵn sàng vận hành của hệ thống.

---

## 4.3. Đánh giá kết quả đạt được và Định hướng phát triển

### 4.3.1. Các kết quả đã đạt được
1. **Hoàn thành toàn diện mục tiêu nghiệp vụ:**
   - Hệ thống đã mô phỏng thành công $100\%$ cấu trúc kỳ thi VSTEP chuẩn của Bộ Giáo dục và Đào tạo với đầy đủ 4 kỹ năng độc lập.
   - Giải quyết triệt để bài toán tự học: Phần thi trắc nghiệm có kết quả tức thì; phần thi tự luận được Trợ lý AI đóng vai trò giám khảo ảo chấm điểm, chỉ ra lỗi sai và cung cấp bài mẫu nâng cao chỉ sau 2-3 giây.
2. **Đáp ứng chuẩn mực học thuật phần mềm nâng cao:**
   - Cấu trúc hệ thống tuân thủ mô hình phân tầng **Clean Architecture**, tách bạch ranh giới giữa giao diện và nghiệp vụ, áp dụng nguyên lý Đảo ngược phụ thuộc (DIP).
   - Vận dụng thành công các mẫu thiết kế kinh điển **GoF (Strategy Pattern, Adapter Pattern, Builder Pattern, Observer Pattern)** để giải quyết bài toán đa hình chấm điểm và tích hợp dịch vụ ngoài.
   - Cơ sở dữ liệu quan hệ được phân tích và chuẩn hóa bài bản đạt **Dạng chuẩn 3 (3NF)**, loại bỏ hoàn toàn các dị thường dữ liệu.
- Toàn bộ 23 bản vẽ UML được mô hình hóa trực quan và chuyên nghiệp 100% bằng chuẩn Draw.io (.drawio), hỗ trợ chỉnh sửa kéo - thả trực tiếp trên app.diagrams.net và tệp Master đa tab VSTEP_Master_All_Diagrams.drawio.

### 4.3.2. Hạn chế còn tồn tại
* Mô hình nhận diện giọng nói Web Speech API hiện tại dựa trên engine có sẵn của trình duyệt web (Google Chrome/Edge Speech Engine); khi thiết bị của người dùng không có kết nối internet hoặc micro chất lượng thấp thì độ chính xác của văn bản chuyển đổi có thể bị ảnh hưởng nhẹ.
* Phân hệ bóc tách đề thi Custom Test phụ thuộc vào quy chuẩn định dạng văn bản (cần có các tiền tố A., B., C., D.); nếu tệp tải lên có bố cục bảng biểu quá phức tạp hoặc dạng ảnh scan thì độ chính xác nhận diện sẽ bị suy giảm.

### 4.3.3. Định hướng phát triển trong tương lai
1. **Tích hợp mô hình Whisper STT & Chấm phát âm AI chuyên sâu:**
   - Bổ sung phân hệ Speech-to-Text để chuyển đổi giọng nói bài thi Speaking thành văn bản, kết hợp mô hình AI chuyên gia để phân tích độ trôi chảy (Fluency), trọng âm từ và ngữ điệu câu.
2. **Chuyển đổi kiến trúc sang Microservices & Docker hóa:**
   - Tách các dịch vụ `AI Evaluation Service` và `Document Parser Service` thành các Microservices độc lập viết bằng Python/FastAPI, giao tiếp qua hàng đợi thông điệp (RabbitMQ / Kafka) để hỗ trợ hàng chục ngàn thí sinh thi thử đồng thời mà không bị nghẽn mạng.
3. **Phát triển ứng dụng di động đa nền tảng (Mobile App):**
   - Triển khai phiên bản ứng dụng di động sử dụng React Native hoặc Flutter, cho phép học viên ôn luyện từ vựng qua Flashcards và làm bài tập trắc nghiệm mọi lúc mọi nơi trên điện thoại thông minh.


---

