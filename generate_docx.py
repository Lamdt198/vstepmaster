import os
import sys
import win32com.client

sys.stdout.reconfigure(encoding='utf-8')

def build_word_document():
    word = win32com.client.Dispatch('Word.Application')
    word.Visible = False
    
    try:
        doc = word.Documents.Add()
        sel = word.Selection
        
        # Helper styles
        def add_title(text):
            p = doc.Paragraphs.Add()
            p.Range.Text = text
            p.Range.Font.Name = "Times New Roman"
            p.Range.Font.Size = 22
            p.Range.Font.Bold = True
            p.Range.ParagraphFormat.Alignment = 1 # Center
            p.Range.ParagraphFormat.SpaceAfter = 12
            p.Range.InsertParagraphAfter()

        def add_subtitle(text):
            p = doc.Paragraphs.Add()
            p.Range.Text = text
            p.Range.Font.Name = "Times New Roman"
            p.Range.Font.Size = 15
            p.Range.Font.Bold = True
            p.Range.ParagraphFormat.Alignment = 1 # Center
            p.Range.ParagraphFormat.SpaceAfter = 18
            p.Range.InsertParagraphAfter()

        def add_h1(text):
            p = doc.Paragraphs.Add()
            p.Range.Text = text
            p.Range.Font.Name = "Times New Roman"
            p.Range.Font.Size = 16
            p.Range.Font.Bold = True
            p.Range.ParagraphFormat.Alignment = 0 # Left
            p.Range.ParagraphFormat.SpaceBefore = 14
            p.Range.ParagraphFormat.SpaceAfter = 6
            p.Range.InsertParagraphAfter()

        def add_h2(text):
            p = doc.Paragraphs.Add()
            p.Range.Text = text
            p.Range.Font.Name = "Times New Roman"
            p.Range.Font.Size = 14
            p.Range.Font.Bold = True
            p.Range.ParagraphFormat.Alignment = 0
            p.Range.ParagraphFormat.SpaceBefore = 10
            p.Range.ParagraphFormat.SpaceAfter = 4
            p.Range.InsertParagraphAfter()

        def add_h3(text):
            p = doc.Paragraphs.Add()
            p.Range.Text = text
            p.Range.Font.Name = "Times New Roman"
            p.Range.Font.Size = 13
            p.Range.Font.Bold = True
            p.Range.ParagraphFormat.Alignment = 0
            p.Range.ParagraphFormat.SpaceBefore = 6
            p.Range.ParagraphFormat.SpaceAfter = 2
            p.Range.InsertParagraphAfter()

        def add_para(text):
            p = doc.Paragraphs.Add()
            p.Range.Text = text
            p.Range.Font.Name = "Times New Roman"
            p.Range.Font.Size = 13
            p.Range.Font.Bold = False
            p.Range.ParagraphFormat.Alignment = 3 # Justify
            p.Range.ParagraphFormat.LineSpacingRule = 4 # Multiple / 1.3
            p.Range.ParagraphFormat.SpaceAfter = 6
            p.Range.InsertParagraphAfter()

        def add_image_with_caption(img_rel_path, caption_text, comment_text):
            img_abs = os.path.abspath(img_rel_path)
            if not os.path.exists(img_abs):
                print(f"Warning: image {img_abs} not found!")
                return
            p_img = doc.Paragraphs.Add()
            p_img.Range.ParagraphFormat.Alignment = 1 # Center
            shape = p_img.Range.InlineShapes.AddPicture(img_abs)
            # Scale picture if too wide (Max 480 pt)
            if shape.Width > 460:
                shape.Height = shape.Height * (460 / shape.Width)
                shape.Width = 460
            p_img.Range.InsertParagraphAfter()

            p_cap = doc.Paragraphs.Add()
            p_cap.Range.Text = caption_text
            p_cap.Range.Font.Name = "Times New Roman"
            p_cap.Range.Font.Size = 11
            p_cap.Range.Font.Bold = True
            p_cap.Range.Font.Italic = True
            p_cap.Range.ParagraphFormat.Alignment = 1
            p_cap.Range.ParagraphFormat.SpaceAfter = 4
            p_cap.Range.InsertParagraphAfter()

            p_com = doc.Paragraphs.Add()
            p_com.Range.Text = comment_text
            p_com.Range.Font.Name = "Times New Roman"
            p_com.Range.Font.Size = 12
            p_com.Range.Font.Italic = True
            p_com.Range.ParagraphFormat.Alignment = 3
            p_com.Range.ParagraphFormat.SpaceAfter = 10
            p_com.Range.InsertParagraphAfter()

        def add_table_data(headers, rows):
            p = doc.Paragraphs.Add()
            tbl = doc.Tables.Add(p.Range, len(rows) + 1, len(headers))
            tbl.Borders.Enable = True
            
            for col_idx, h in enumerate(headers):
                cell = tbl.Cell(1, col_idx + 1)
                cell.Range.Text = h
                cell.Range.Font.Name = "Times New Roman"
                cell.Range.Font.Size = 11
                cell.Range.Font.Bold = True
                cell.Range.ParagraphFormat.Alignment = 1 # Center
            
            for r_idx, row in enumerate(rows):
                for col_idx, val in enumerate(row):
                    cell = tbl.Cell(r_idx + 2, col_idx + 1)
                    cell.Range.Text = str(val)
                    cell.Range.Font.Name = "Times New Roman"
                    cell.Range.Font.Size = 11
                    if col_idx == 0:
                        cell.Range.ParagraphFormat.Alignment = 1
                    else:
                        cell.Range.ParagraphFormat.Alignment = 0
            doc.Paragraphs.Add().Range.InsertParagraphAfter()

        # ==========================================
        # COVER & HEADER
        # ==========================================
        add_title("BÀI TẬP LỚN MÔN THIẾT KẾ PHẦN MỀM NÂNG CAO")
        add_subtitle("ĐỀ TÀI: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG LUYỆN THI VSTEP 4 KỸ NĂNG TÍCH HỢP TRÍ TUỆ NHÂN TẠO CHẤM ĐIỂM TỰ ĐỘNG (VSTEP MASTER)")
        add_para("Học kỳ: 1 - Năm học: 2026 - 2027\nĐơn vị đào tạo: Khoa Công nghệ thông tin")
        
        # Bảng phân công
        add_h2("PHÂN CÔNG CÔNG VIỆC TRONG NHÓM")
        headers_assign = ["STT", "Họ và tên", "Mã SV", "Nhiệm vụ phân công", "Mức độ", "Ký tên"]
        rows_assign = [
            ["1", "[Họ tên SV 1]", "[Mã SV 1]", "Khảo sát bài toán, Kiến trúc Clean Architecture, Thiết kế CSDL 3NF", "100%", ""],
            ["2", "[Họ tên SV 2]", "[Mã SV 2]", "Phân tích mô hình UML (Use Case, Sequence, State), Mẫu thiết kế GoF", "100%", ""],
            ["3", "[Họ tên SV 3]", "[Mã SV 3]", "Cài đặt mã nguồn Frontend, Tích hợp Phân hệ AI Chấm điểm", "100%", ""],
            ["4", "[Họ tên SV 4]", "[Mã SV 4]", "Xây dựng kịch bản kiểm thử, Chạy thực nghiệm, Hoàn thiện tài liệu Word", "100%", ""]
        ]
        add_table_data(headers_assign, rows_assign)

        # Bảng từ viết tắt
        add_h2("DANH MỤC THUẬT NGỮ VÀ TỪ VIẾT TẮT")
        headers_abbr = ["Viết tắt", "Thuật ngữ Tiếng Anh", "Ý nghĩa trong hệ thống"]
        rows_abbr = [
            ["VSTEP", "Vietnamese Standardized Test of English Proficiency", "Kỳ thi đánh giá năng lực tiếng Anh theo Khung 6 bậc dùng cho Việt Nam (B1, B2, C1)."],
            ["CEFR", "Common European Framework of Reference", "Khung tham chiếu trình độ ngôn ngữ chung của Châu Âu."],
            ["UML", "Unified Modeling Language", "Ngôn ngữ mô hình hóa thống nhất dùng trực quan hóa phần mềm."],
            ["GoF", "Gang of Four", "Nhóm 4 tác giả khởi xướng 23 mẫu thiết kế hướng đối tượng kinh điển."],
            ["AI", "Artificial Intelligence", "Trí tuệ nhân tạo phân tích và chấm điểm ngôn ngữ tự nhiên."],
            ["3NF", "Third Normal Form", "Dạng chuẩn 3 loại bỏ phụ thuộc bắc cầu trong cơ sở dữ liệu quan hệ."],
            ["ERD", "Entity Relationship Diagram", "Sơ đồ biểu diễn thực thể và mối quan hệ cơ sở dữ liệu."],
            ["SPA", "Single Page Application", "Ứng dụng web một trang, tương tác mượt mà không tải lại toàn trang."]
        ]
        add_table_data(headers_abbr, rows_abbr)

        # ==========================================
        # CHƯƠNG 1
        # ==========================================
        add_h1("CHƯƠNG 1. GIỚI THIỆU VÀ ĐẶC TẢ BÀI TOÁN")
        add_h2("1.1. Lý do chọn đề tài và mục tiêu hệ thống")
        add_para("Kỳ thi VSTEP (B1, B2, C1) là chuẩn đầu ra ngoại ngữ bắt buộc đối với đông đảo sinh viên và người đi làm. Quá trình ôn luyện VSTEP bao gồm 4 kỹ năng: Nghe, Đọc, Viết và Nói. Trong đó:")
        add_para("- Phần thi Trắc nghiệm (Nghe, Đọc): Có đáp án cố định, hệ thống hoàn toàn có thể tự động chấm điểm tức thì khi thí sinh nộp bài.")
        add_para("- Phần thi Tự luận (Viết, Nói): Đòi hỏi đánh giá ngữ nghĩa, từ vựng và cấu trúc ngữ pháp. Thí sinh tự học thường thiếu người hướng dẫn sửa lỗi và chấm điểm.")
        add_para("Mục tiêu của hệ thống VSTEP Master là xây dựng một nền tảng luyện thi trực tuyến tự động hóa hoàn toàn: trắc nghiệm có kết quả ngay, tự luận có Trợ lý AI đóng vai trò giám khảo ảo chấm điểm và nhận xét sửa lỗi chi tiết theo khung năng lực CEFR.")

        add_h2("1.2. Mô tả bài toán nghiệp vụ")
        add_para("Hệ thống phục vụ 2 nhóm tác nhân chính: Học viên (luyện tập 4 kỹ năng, thi thử tính giờ, nhập đề Word/PDF, học từ vựng) và Quản trị viên (quản lý ngân hàng đề thi và hệ thống), cùng Phân hệ Trí tuệ nhân tạo (AI Engine) phân tích ngôn ngữ tự nhiên.")

        add_h2("1.3. Bảng mã hóa Yêu cầu Chức năng")
        headers_yc = ["Mã YC", "Tên chức năng", "Mô tả chi tiết", "Độ ưu tiên"]
        rows_yc = [
            ["YC-AUTH-01", "Đăng nhập tài khoản", "Đăng nhập thông thường bằng Username & Mật khẩu.", "Cao"],
            ["YC-AUTH-02", "Đăng ký học viên", "Tạo tài khoản học viên mới lưu trữ trên hệ thống.", "Cao"],
            ["YC-OBJ-01", "Luyện Listening", "Phát audio theo Part, làm trắc nghiệm, hiển thị transcript sau nộp.", "Cao"],
            ["YC-OBJ-02", "Luyện Reading", "Đọc 4 bài văn dài, trả lời trắc nghiệm, tra cứu từ vựng trực tiếp.", "Cao"],
            ["YC-SUBJ-01", "Luyện Writing", "Soạn thảo bài viết Task 1 & 2 kèm bộ đếm từ tự động.", "Cao"],
            ["YC-SUBJ-02", "Luyện Speaking", "Cung cấp chủ đề gợi ý, thu âm giọng nói qua micro.", "Cao"],
            ["YC-AI-01", "AI Chấm điểm tự luận", "Tự động phân tích bài viết/nói, chấm điểm thang 10 và xếp bậc CEFR.", "Cao"],
            ["YC-AI-02", "AI Nhận xét sửa lỗi", "Chỉ rõ lỗi sai ngữ pháp, từ vựng và đưa ra đoạn văn mẫu nâng cao.", "Cao"],
            ["YC-MOCK-01", "Thi thử Mock Test", "Mô phỏng đề thi tổng hợp 4 kỹ năng, đồng hồ đếm ngược 180 phút.", "Cao"],
            ["YC-CUST-01", "Bóc tách đề Word/PDF", "Tải file .docx hoặc .pdf tự động bóc tách thành câu hỏi trắc nghiệm.", "Cao"],
            ["YC-VOCAB-01", "Từ vựng & Flashcards", "Tra cứu từ vựng CEFR và học từ qua thẻ ghi nhớ Flashcard.", "Trung bình"]
        ]
        add_table_data(headers_yc, rows_yc)

        add_h2("1.4. Yêu cầu phi chức năng và Tiêu chuẩn nghiệm thu")
        add_para("Hệ thống tuân thủ chuẩn FURPS+: Tương thích đa thiết bị (Desktop, Tablet, Mobile), hỗ trợ Chế độ Sáng/Tối, chống mất dữ liệu khi mất kết nối mạng, tốc độ chấm trắc nghiệm dưới 50ms và thời gian phản hồi AI từ 2-4 giây.")

        # ==========================================
        # CHƯƠNG 2
        # ==========================================
        add_h1("CHƯƠNG 2. PHÂN TÍCH HỆ THỐNG VỚI UML")
        
        add_h2("2.1. Biểu đồ Ca sử dụng (Use Case Diagram)")
        add_para("Biểu đồ Ca sử dụng tổng quan mô tả toàn bộ các chức năng của hệ thống được phân rã theo 2 nhóm tác nhân: Học viên, Quản trị viên và Phân hệ AI Engine:")
        add_image_with_caption(
            "diagrams/images/01_use_case_diagram.png",
            "Hình 2.1: Biểu đồ Ca sử dụng tổng quan hệ thống VSTEP Master",
            "Bình luận: Biểu đồ thể hiện mối quan hệ giữa Học viên với các chức năng luyện tập 4 kỹ năng và thi thử. Ca sử dụng 'Luyện Tự luận' và 'Thi thử' có quan hệ <<include>> với 'AI Chấm điểm Tự luận' do phân hệ AI Engine phụ trách."
        )

        add_h2("2.2. Đặc tả Ca sử dụng: AI Chấm điểm Tự luận")
        headers_uc_spec = ["Bước", "Hành động của Học viên", "Phản ứng của Hệ thống", "Dữ liệu trao đổi"]
        rows_uc_spec = [
            ["1", "Hoàn thành bài viết luận, bấm 'AI Chấm điểm'.", "Khóa nút bấm, hiển thị biểu tượng đang chấm.", "Nội dung bài viết"],
            ["2", "Chờ hệ thống xử lý.", "Kiểm tra số từ (>=30 từ), chuẩn hóa payload.", "Dữ liệu bài làm"],
            ["3", "Chờ hệ thống xử lý.", "Gửi yêu cầu phân tích sang Phân hệ AI Engine.", "Payload Rubric VSTEP"],
            ["4", "Chờ hệ thống xử lý.", "AI phân tích cú pháp, từ vựng, tính liên kết.", "Dữ liệu phân tích AI"],
            ["5", "Nhận kết quả.", "Hiển thị Thẻ điểm, lỗi ngữ pháp và đoạn văn mẫu.", "Bảng điểm chi tiết"],
            ["6", "Xem lại bài làm.", "Tự động lưu kết quả vào lịch sử học tập.", "Bản ghi kết quả"]
        ]
        add_table_data(headers_uc_spec, rows_uc_spec)

        add_h2("2.3. Biểu đồ Hoạt động (Activity Diagram)")
        add_para("Biểu đồ hoạt động mô tả luồng quy trình thi thử VSTEP toàn diện 180 phút và cơ chế tự động phân nhánh chấm điểm:")
        add_image_with_caption(
            "diagrams/images/02_activity_flow_mock_test.png",
            "Hình 2.2: Biểu đồ Hoạt động quy trình thi thử và chấm điểm tự động",
            "Bình luận: Quy trình thể hiện nhánh song song giữa đồng hồ đếm ngược và luồng làm bài của học viên. Khi hết giờ, bài thi tự động khóa; phần trắc nghiệm được chấm ngay bằng Answer Key, phần tự luận được gửi sang AI Engine chấm điểm."
        )

        add_h2("2.4. Biểu đồ Tuần tự (Sequence Diagram)")
        add_para("Biểu đồ tuần tự mô tả chi tiết tương tác thời gian thực giữa các đối tượng khi học viên nộp bài tự luận để AI chấm điểm:")
        add_image_with_caption(
            "diagrams/images/03_sequence_ai_scoring.png",
            "Hình 2.3: Biểu đồ Tuần tự quy trình AI Chấm điểm Tự luận",
            "Bình luận: Biểu đồ minh họa luồng tuần tự từ Giao diện UI chuyển qua Service điều phối, gọi qua Adapter tương thích để gửi dữ liệu tới AI Engine, sau đó bóc tách kết quả JSON và lưu vào bộ nhớ lưu trữ trước khi hiển thị cho học viên."
        )

        add_h2("2.5. Biểu đồ Máy trạng thái (State Machine Diagram)")
        add_para("Biểu đồ máy trạng thái biểu diễn các giai đoạn chuyển đổi trạng thái của một bài thi từ khi khởi tạo đến khi hoàn tất:")
        add_image_with_caption(
            "diagrams/images/04_state_machine_exam.png",
            "Hình 2.4: Biểu đồ Máy trạng thái vòng đời phiên làm bài thi",
            "Bình luận: Thể hiện rõ các trạng thái từ NOT_STARTED chuyển sang IN_PROGRESS (làm bài), SUBMITTED (đã nộp), OBJECTIVE_SCORED (đã có điểm trắc nghiệm), AI_EVALUATING (đang chấm tự luận), và cuối cùng là ARCHIVED (lưu trữ lịch sử)."
        )

        # ==========================================
        # CHƯƠNG 3
        # ==========================================
        add_h1("CHƯƠNG 3. THIẾT KẾ HỆ THỐNG NÂNG CAO")
        add_h2("3.1. Thiết kế Kiến trúc phần mềm Clean Architecture")
        add_para("Hệ thống được thiết kế theo mô hình phân tầng Clean Architecture nhằm đảm bảo tính độc lập giữa logic nghiệp vụ cốt lõi và các phân hệ bên ngoài:")
        add_para("1. Presentation Layer: Chứa các thành phần giao diện React, Hooks và Context điều phối.")
        add_para("2. Application Layer: Chứa các Service nghiệp vụ điều phối bài thi và chấm điểm (ExamService, AIScoringService).")
        add_para("3. Domain Layer: Chứa các thực thể cốt lõi (Exam, Question, Submission) và Giao diện chiến lược (IScoringStrategy).")
        add_para("4. Infrastructure Layer: Chứa các Adapter giao tiếp với Phân hệ AI và bộ lưu trữ dữ liệu.")

        add_h2("3.2. Ứng dụng các Mẫu thiết kế GoF và Biểu đồ Lớp (Class Diagram)")
        add_para("Hệ thống hiện thực hóa mẫu Strategy Pattern nhằm phân tách rõ rệt thuật toán chấm trắc nghiệm (ObjectiveScoringStrategy) và thuật toán chấm tự luận AI (AIScoringStrategy), cùng Adapter Pattern đóng gói giao tiếp AI:")
        add_image_with_caption(
            "diagrams/images/05_class_diagram_architecture.png",
            "Hình 3.1: Biểu đồ Lớp chi tiết hệ thống VSTEP Master",
            "Bình luận: Biểu đồ lớp thể hiện mối quan hệ hiện thực hóa Interface IScoringStrategy với 2 lớp cụ thể, đồng thời lớp AIScoringStrategy phụ thuộc lỏng lẻo vào Interface IAIEvaluator thông qua lớp chuyển đổi AIAdapter."
        )

        add_h2("3.3. Thiết kế Cơ sở dữ liệu 3 mức")
        add_para("Cơ sở dữ liệu của hệ thống được thiết kế qua 3 giai đoạn chuẩn mực:")
        add_para("1. Thiết kế Khái niệm (Conceptual Schema - ERD):")
        add_image_with_caption(
            "diagrams/images/06_database_erd.png",
            "Hình 3.2: Sơ đồ Thực thể Liên kết (ERD) Cơ sở dữ liệu",
            "Bình luận: Sơ đồ thể hiện 8 thực thể trọng tâm: USERS, ROLES, EXAMS, SECTIONS, QUESTIONS, QUESTION_OPTIONS, SUBMISSIONS và AI_EVALUATION_RESULTS với các mối quan hệ toàn vẹn dữ liệu 1-N và 1-1."
        )

        add_para("2. Thiết kế Logic (Chuẩn hóa 3NF):")
        add_para("Toàn bộ các bảng quan hệ đã được chuẩn hóa đạt Dạng chuẩn 3 (3NF), loại bỏ hoàn toàn các dị thường trùng lặp dữ liệu và phụ thuộc bắc cầu.")

        add_para("3. Thiết kế Vật lý (Từ điển dữ liệu):")
        headers_dict = ["Tên cột", "Kiểu dữ liệu", "Ràng buộc", "Diễn giải"]
        rows_dict = [
            ["submission_id", "VARCHAR(36)", "PRIMARY KEY", "Định danh duy nhất bài làm."],
            ["user_id", "VARCHAR(36)", "NOT NULL, FK", "Khóa ngoại tham chiếu bảng USERS."],
            ["exam_id", "VARCHAR(36)", "NOT NULL, FK", "Khóa ngoại tham chiếu bảng EXAMS."],
            ["objective_score", "DECIMAL(3,1)", "DEFAULT 0.0", "Điểm trắc nghiệm (có ngay khi nộp)."],
            ["ai_score", "DECIMAL(3,1)", "DEFAULT 0.0", "Điểm tự luận do AI Engine chấm."],
            ["final_score", "DECIMAL(3,1)", "DEFAULT 0.0", "Điểm tổng kết toàn diện 4 kỹ năng."],
            ["cefr_band", "VARCHAR(10)", "NULL", "Bậc năng lực đạt được (B1, B2, C1)."],
            ["status", "VARCHAR(20)", "NOT NULL", "Trạng thái bài làm ('IN_PROGRESS', 'COMPLETED')."]
        ]
        add_table_data(headers_dict, rows_dict)

        # ==========================================
        # CHƯƠNG 4
        # ==========================================
        add_h1("CHƯƠNG 4. CÀI ĐẶT THỰC NGHIỆM, KIỂM THỬ VÀ KẾT LUẬN")
        add_h2("4.1. Môi trường công nghệ thực nghiệm")
        add_para("Hệ thống đã được cài đặt và vận hành thực tế tại mã nguồn vstep-app:")
        add_para("- Nền tảng: React 18, TypeScript 5.6, Vite 5.4, Tailwind CSS.")
        add_para("- Xác thực: Đăng nhập tài khoản thông thường (Username/Password), hỗ trợ phân quyền Học viên và Quản trị viên.")
        add_para("- Địa chỉ chạy thử nghiệm cục bộ: http://localhost:5174/.")

        add_h2("4.2. Kế hoạch và Kết quả kiểm thử (Test Matrix)")
        headers_test = ["Mã TC", "Hạng mục kiểm thử", "Thao tác thực hiện", "Kết quả kỳ vọng", "Trạng thái"]
        rows_test = [
            ["TC-AUTH-01", "Đăng nhập tài khoản", "Nhập 'user' / '123', bấm Đăng nhập.", "Vào trang chủ với vai trò Học viên.", "PASS"],
            ["TC-OBJ-01", "Chấm trắc nghiệm tự động", "Làm bài trắc nghiệm, bấm 'Nộp bài'.", "Có kết quả điểm số tức thì (<50ms).", "PASS"],
            ["TC-AI-01", "AI Chấm điểm bài Viết", "Viết bài luận, bấm 'AI Chấm điểm'.", "Nhận điểm số, bậc CEFR sau 2-3s.", "PASS"],
            ["TC-CUST-01", "Bóc tách đề thi Word", "Tải file .docx tại Custom Test.", "Hiển thị chính xác các câu hỏi A-B-C-D.", "PASS"],
            ["TC-MOCK-01", "Đồng hồ đếm giờ thi thử", "Bắt đầu bài Mock Test 180 phút.", "Đếm ngược chính xác, hết giờ tự khóa.", "PASS"]
        ]
        add_table_data(headers_test, rows_test)

        add_h2("4.3. Kết luận và Hướng phát triển")
        add_para("Đồ án đã phân tích và thiết kế thành công hệ thống luyện thi VSTEP Master đáp ứng đầy đủ các tiêu chuẩn học thuật của môn Thiết kế phần mềm nâng cao. Các bản vẽ UML được lưu trữ dạng mã nguồn riêng biệt giúp việc chỉnh sửa, nâng cấp hệ thống trong tương lai diễn ra nhanh chóng và thuận lợi.")

        # Save document
        doc_path = os.path.abspath('Bao_Cao_BTL_Thiet_Ke_Nang_Cao_VSTEP.docx')
        doc.SaveAs2(doc_path)
        doc.Close(False)
        print(f"Successfully generated Word document: {doc_path} (Exists: {os.path.exists(doc_path)})")
    finally:
        word.Quit()

if __name__ == '__main__':
    build_word_document()
