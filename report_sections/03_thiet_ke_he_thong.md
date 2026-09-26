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

## 3.3. Biểu đồ Lớp chi tiết (Design Class Diagram)

Biểu đồ Lớp chi tiết thể hiện toàn bộ các lớp đối tượng, thuộc tính, phương thức và các mối quan hệ hướng đối tượng (Kế thừa, Hiện thực hóa, Kết tập, Phụ thuộc) trong hệ thống VSTEP Master.

*(Tham chiếu minh họa: **Hình 3.1: Biểu đồ Lớp chi tiết hệ thống VSTEP Master** - Nguồn tệp: `diagrams/05_class_diagram_architecture.puml`)*

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

*(Tham chiếu minh họa: **Hình 3.2: Sơ đồ Thực thể Liên kết (ERD) Cơ sở dữ liệu** - Nguồn tệp: `diagrams/06_database_erd.puml`)*

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

