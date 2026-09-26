-- =====================================================================
-- DATABASE SCHEMA: VSTEP MASTER (ENTERPRISE AI EXAM PLATFORM)
-- Academic Course: Thiet ke phan mem nang cao (Advanced Software Design)
-- Normalization Level: Third Normal Form (3NF) Certified
-- Architecture: 5 Cohesive Subsystems (14 Normalized Tables)
-- =====================================================================

DROP TABLE IF EXISTS ai_evaluation_results CASCADE;
DROP TABLE IF EXISTS submission_answers CASCADE;
DROP TABLE IF EXISTS submissions CASCADE;
DROP TABLE IF EXISTS user_vocab_progress CASCADE;
DROP TABLE IF EXISTS vocabulary CASCADE;
DROP TABLE IF EXISTS custom_exam_imports CASCADE;
DROP TABLE IF EXISTS question_options CASCADE;
DROP TABLE IF EXISTS question_tags CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS sections CASCADE;
DROP TABLE IF EXISTS exams CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- =====================================================================
-- PHÂN HỆ 1: NGƯỜI DÙNG, PHÂN QUYỀN & HỒ SƠ HỌC TẬP (RBAC & PROFILES)
-- =====================================================================

CREATE TABLE roles (
    role_id VARCHAR(20) PRIMARY KEY, -- 'ROLE_ADMIN', 'ROLE_STUDENT', 'ROLE_EXAMINER'
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE users (
    user_id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role_id VARCHAR(20) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES roles(role_id) ON UPDATE CASCADE
);

CREATE TABLE user_profiles (
    profile_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL UNIQUE,
    target_band VARCHAR(10) NOT NULL DEFAULT 'B2', -- 'B1', 'B2', 'C1'
    current_streak_days INT NOT NULL DEFAULT 0,
    total_study_minutes INT NOT NULL DEFAULT 0,
    preferred_study_time VARCHAR(20) DEFAULT 'EVENING',
    last_active_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_profiles_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

-- =====================================================================
-- PHÂN HỆ 2: NGÂN HÀNG HỌC LIỆU, ĐỀ THI & CÂU HỎI (QUESTION BANK)
-- =====================================================================

CREATE TABLE exams (
    exam_id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    exam_type VARCHAR(30) NOT NULL, -- 'STANDARD_MOCK', 'CUSTOM_IMPORT', 'SKILL_PRACTICE'
    duration_minutes INT NOT NULL DEFAULT 180,
    total_questions INT NOT NULL DEFAULT 75,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_by VARCHAR(36) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_exams_user FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE sections (
    section_id VARCHAR(36) PRIMARY KEY,
    exam_id VARCHAR(36) NOT NULL,
    skill_type VARCHAR(20) NOT NULL, -- 'LISTENING', 'READING', 'WRITING', 'SPEAKING'
    section_order INT NOT NULL,      -- 1, 2, 3, 4
    duration_minutes INT NOT NULL,
    instructions TEXT,
    CONSTRAINT fk_sections_exam FOREIGN KEY (exam_id) REFERENCES exams(exam_id) ON DELETE CASCADE,
    CONSTRAINT uq_exam_section_order UNIQUE (exam_id, section_order)
);

CREATE TABLE questions (
    question_id VARCHAR(36) PRIMARY KEY,
    section_id VARCHAR(36) NOT NULL,
    passage_text TEXT NULL,          -- Ngữ liệu bài đọc dài hoặc lời dẫn bài nghe
    audio_url VARCHAR(255) NULL,     -- Đường dẫn tệp âm thanh (mp3)
    question_text TEXT NOT NULL,     -- Câu hỏi trắc nghiệm hoặc đề bài tự luận Task 1/2
    question_type VARCHAR(30) NOT NULL, -- 'MULTIPLE_CHOICE', 'ESSAY_TASK1', 'ESSAY_TASK2', 'SPEAKING_PROMPT'
    difficulty_cefr VARCHAR(5) NOT NULL DEFAULT 'B2', -- 'B1', 'B2', 'C1'
    question_order INT NOT NULL,
    CONSTRAINT fk_questions_section FOREIGN KEY (section_id) REFERENCES sections(section_id) ON DELETE CASCADE
);

CREATE TABLE question_tags (
    tag_id VARCHAR(36) PRIMARY KEY,
    question_id VARCHAR(36) NOT NULL,
    tag_name VARCHAR(50) NOT NULL,   -- 'Environment', 'Education', 'Science', 'Technology'
    CONSTRAINT fk_tags_question FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
);

CREATE TABLE question_options (
    option_id VARCHAR(36) PRIMARY KEY,
    question_id VARCHAR(36) NOT NULL,
    option_label VARCHAR(5) NOT NULL, -- 'A', 'B', 'C', 'D'
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    explanation TEXT NULL,            -- Trích dẫn giải thích lý do đúng/sai
    CONSTRAINT fk_options_question FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE,
    CONSTRAINT uq_question_option UNIQUE (question_id, option_label)
);

-- =====================================================================
-- PHÂN HỆ 3: KHẢO THÍ, NỘP BÀI & AI CHẤM TỰ LUẬN (EXAM & AI EVALUATION)
-- =====================================================================

CREATE TABLE submissions (
    submission_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    exam_id VARCHAR(36) NOT NULL,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    submit_time TIMESTAMP NULL,
    listening_score DECIMAL(3,1) DEFAULT 0.0,
    reading_score DECIMAL(3,1) DEFAULT 0.0,
    writing_score DECIMAL(3,1) DEFAULT 0.0,
    speaking_score DECIMAL(3,1) DEFAULT 0.0,
    final_score DECIMAL(3,1) DEFAULT 0.0,     -- Điểm trung bình làm tròn 0.5
    cefr_band VARCHAR(10) NULL,               -- 'B1', 'B2', 'C1' hoặc 'KHONG_DAT'
    status VARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS', -- 'IN_PROGRESS', 'SUBMITTED', 'COMPLETED'
    CONSTRAINT fk_submissions_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_submissions_exam FOREIGN KEY (exam_id) REFERENCES exams(exam_id) ON DELETE CASCADE
);

CREATE TABLE submission_answers (
    answer_id VARCHAR(36) PRIMARY KEY,
    submission_id VARCHAR(36) NOT NULL,
    question_id VARCHAR(36) NOT NULL,
    selected_option_id VARCHAR(36) NULL,     -- Lưu đáp án trắc nghiệm chọn
    text_response TEXT NULL,                 -- Lưu nội dung bài viết luận Writing Task 1/2
    audio_response_url VARCHAR(255) NULL,    -- Lưu tệp ghi âm giọng nói Speaking
    is_correct BOOLEAN NULL,                 -- Tự động đánh dấu cho trắc nghiệm
    earned_score DECIMAL(3,1) DEFAULT 0.0,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_answers_submission FOREIGN KEY (submission_id) REFERENCES submissions(submission_id) ON DELETE CASCADE,
    CONSTRAINT fk_answers_question FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE,
    CONSTRAINT fk_answers_option FOREIGN KEY (selected_option_id) REFERENCES question_options(option_id) ON DELETE SET NULL
);

CREATE TABLE ai_evaluation_results (
    evaluation_id VARCHAR(36) PRIMARY KEY,
    answer_id VARCHAR(36) NOT NULL UNIQUE,   -- Quan hệ 1:1 với bài làm tự luận của câu hỏi tương ứng
    task_fulfillment DECIMAL(3,1) NOT NULL,  -- Tiêu chí 1: Hoàn thành yêu cầu đề bài
    organization DECIMAL(3,1) NOT NULL,      -- Tiêu chí 2: Bố cục & độ mạch lạc
    lexical_resource DECIMAL(3,1) NOT NULL,  -- Tiêu chí 3: Vốn từ vựng học thuật
    grammar_accuracy DECIMAL(3,1) NOT NULL,  -- Tiêu chí 4: Độ chuẩn ngữ pháp
    task_score DECIMAL(3,1) NOT NULL,        -- Điểm tổng kết thang 10 của Task
    cefr_level VARCHAR(10) NOT NULL,         -- 'B1', 'B2', 'C1'
    grammar_errors_json JSON NOT NULL,       -- Mảng JSON lưu vị trí lỗi, nguyên nhân, cách sửa
    suggested_revision TEXT NULL,            -- Đoạn văn viết lại mẫu đạt chuẩn B2/C1
    evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ai_eval_answer FOREIGN KEY (answer_id) REFERENCES submission_answers(answer_id) ON DELETE CASCADE
);

-- =====================================================================
-- PHÂN HỆ 4: TỪ VỰNG HỌC THUẬT & LẶP LẠI NGẮT QUÃNG (SPACED REPETITION)
-- =====================================================================

CREATE TABLE vocabulary (
    vocab_id VARCHAR(36) PRIMARY KEY,
    word VARCHAR(100) NOT NULL UNIQUE,
    phonetic VARCHAR(100) NULL,
    part_of_speech VARCHAR(20) NOT NULL DEFAULT 'noun',
    cefr_level VARCHAR(5) NOT NULL DEFAULT 'B2', -- 'B1', 'B2', 'C1'
    definition_vi TEXT NOT NULL,
    example_en TEXT NOT NULL,
    audio_pronounce_url VARCHAR(255) NULL,
    topic VARCHAR(50) NOT NULL DEFAULT 'General Academic'
);

CREATE TABLE user_vocab_progress (
    progress_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    vocab_id VARCHAR(36) NOT NULL,
    repetitions INT NOT NULL DEFAULT 0,
    ease_factor DECIMAL(4,2) NOT NULL DEFAULT 2.50, -- Hệ số dễ SM-2
    interval_days INT NOT NULL DEFAULT 1,          -- Khoảng cách ngày ôn tập tiếp theo
    next_review_date DATE NOT NULL,
    is_mastered BOOLEAN NOT NULL DEFAULT FALSE,
    last_reviewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vocab_progress_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_vocab_progress_vocab FOREIGN KEY (vocab_id) REFERENCES vocabulary(vocab_id) ON DELETE CASCADE,
    CONSTRAINT uq_user_vocab UNIQUE (user_id, vocab_id)
);

-- =====================================================================
-- PHÂN HỆ 5: BÓC TÁCH ĐỀ THI TỰ ĐỘNG TỪ FILE (CUSTOM EXAM IMPORT AUDIT)
-- =====================================================================

CREATE TABLE custom_exam_imports (
    import_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(20) NOT NULL,          -- 'DOCX', 'PDF'
    file_size_bytes BIGINT NOT NULL,
    parsed_exam_id VARCHAR(36) NULL,         -- Đề thi sinh ra sau khi bóc tách
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'PARSED', 'FAILED'
    recognized_questions INT NOT NULL DEFAULT 0,
    parser_logs TEXT NULL,
    imported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_imports_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_imports_exam FOREIGN KEY (parsed_exam_id) REFERENCES exams(exam_id) ON DELETE SET NULL
);

-- =====================================================================
-- DỮ LIỆU KHỞI TẠO (SEED DATA)
-- =====================================================================

INSERT INTO roles (role_id, role_name, description) VALUES
('ROLE_ADMIN', 'Quản trị viên', 'Toàn quyền quản trị học liệu, người dùng và đề thi'),
('ROLE_STUDENT', 'Học viên', 'Luyện tập 4 kỹ năng, thi thử 180 phút và tự tạo đề thi');

INSERT INTO users (user_id, username, password_hash, full_name, email, role_id) VALUES
('u_admin', 'admin', '$2a$12$e8Y5M1FvB6Z8cK...', 'Quản Trị Viên Hệ Thống', 'admin@vstepmaster.edu.vn', 'ROLE_ADMIN'),
('u_student1', 'user', '$2a$12$g9Z6N2GwC7a9dL...', 'Nguyễn Văn An', 'student1@vstepmaster.edu.vn', 'ROLE_STUDENT');

INSERT INTO user_profiles (profile_id, user_id, target_band, current_streak_days, total_study_minutes) VALUES
('prof_1', 'u_student1', 'B2', 5, 420);
