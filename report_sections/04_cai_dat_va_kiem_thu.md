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
| **TC-04** | AUTH | Đăng ký tài khoản học viên mới hợp lệ | Tên đăng nhập chưa ai sử dụng | 1. Vào trang Đăng ký.<br>2. Điền đủ thông tin hợp lệ.<br>3. Bấm "Đăng ký". | User: `hocvien01`<br>Pass: `matkhau123` | Tạo tài khoản thành công, tự động chuyển về form đăng nhập. | Tài khoản được tạo thành công. | **PASS** |
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
   - Bản vẽ thiết kế UML được lưu trữ dạng mã nguồn `.puml` riêng biệt, hoàn toàn có thể chỉnh sửa và kết xuất tự động.

### 4.3.2. Hạn chế còn tồn tại
* Năng lực đánh giá bài thi Nói (Speaking) hiện tại mới dừng ở mức thu âm, hiển thị dàn ý gợi ý và bài mẫu tham khảo; chưa tích hợp mô hình nhận diện giọng nói nâng cao (Speech-to-Text) chuyên biệt để chấm phát âm (Phonetics/Intonation) theo thời gian thực.
* Phân hệ bóc tách đề thi Custom Test phụ thuộc vào quy chuẩn định dạng văn bản (cần có các tiền tố A., B., C., D.); nếu tệp tải lên có bố cục bảng biểu quá phức tạp hoặc dạng ảnh scan thì độ chính xác nhận diện sẽ bị suy giảm.

### 4.3.3. Định hướng phát triển trong tương lai
1. **Tích hợp mô hình Whisper STT & Chấm phát âm AI chuyên sâu:**
   - Bổ sung phân hệ Speech-to-Text để chuyển đổi giọng nói bài thi Speaking thành văn bản, kết hợp mô hình AI chuyên gia để phân tích độ trôi chảy (Fluency), trọng âm từ và ngữ điệu câu.
2. **Chuyển đổi kiến trúc sang Microservices & Docker hóa:**
   - Tách các dịch vụ `AI Evaluation Service` và `Document Parser Service` thành các Microservices độc lập viết bằng Python/FastAPI, giao tiếp qua hàng đợi thông điệp (RabbitMQ / Kafka) để hỗ trợ hàng chục ngàn thí sinh thi thử đồng thời mà không bị nghẽn mạng.
3. **Phát triển ứng dụng di động đa nền tảng (Mobile App):**
   - Triển khai phiên bản ứng dụng di động sử dụng React Native hoặc Flutter, cho phép học viên ôn luyện từ vựng qua Flashcards và làm bài tập trắc nghiệm mọi lúc mọi nơi trên điện thoại thông minh.
