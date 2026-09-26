import os
import zlib
import base64
import urllib.request

os.makedirs('diagrams/images', exist_ok=True)

# 1. Use Case Diagram
uc_puml = """@startuml
!theme plain
skinparam packageStyle rectangle
skinparam shadowing false
skinparam defaultFontName Arial

left to right direction

actor "Hoc vien\\n(Student)" as Student #E3F2FD
actor "Quan tri vien\\n(Admin)" as Admin #FFF3E0
actor "Phan he AI Engine\\n(Google Gemini)" as AI #E8F5E9

rectangle "HE THONG LUYEN THI VSTEP MASTER" {
    usecase "Dang nhap / Dang ky" as UC_Auth
    usecase "Luyen Trac nghiem (Nghe va Doc)" as UC_ObjPractice
    usecase "Luyen Tu luan (Viet va Noi)" as UC_SubjPractice
    usecase "AI Cham diem Tu luan" as UC_AIScoring
    usecase "Thi thu VSTEP Mock Test (180p)" as UC_MockTest
    usecase "Boc tach de Word/PDF (Custom Test)" as UC_CustomTest
    usecase "Hoc Tu vung CEFR va Flashcards" as UC_Vocab
    usecase "Quan ly Ngan hang de thi" as UC_ManageExams
}

Student --> UC_Auth
Student --> UC_ObjPractice
Student --> UC_SubjPractice
Student --> UC_MockTest
Student --> UC_CustomTest
Student --> UC_Vocab

Admin --> UC_Auth
Admin --> UC_ManageExams

UC_SubjPractice ..> UC_AIScoring : <<include>>
UC_MockTest ..> UC_ObjPractice : <<include>>
UC_MockTest ..> UC_AIScoring : <<include>>

UC_AIScoring -- AI

note right of UC_ObjPractice
  Cham diem tu dong
  theo Answer Key
  -> Ket qua tuc thi
end note

note right of UC_AIScoring
  Phan tich cu phap va tu vung
  -> Cham diem thang 10 va CEFR
end note
@enduml
"""

with open('diagrams/01_use_case_diagram.puml', 'w', encoding='utf-8') as f:
    f.write(uc_puml.strip())

# 2. Activity Diagram
activity_puml = """@startuml
!theme plain
skinparam shadowing false
skinparam defaultFontName Arial

start
:Thi sinh chon de va Bam "Bat dau lam bai";
:He thong nap de thi va Khoi dong dong ho dem nguoc 180 phut;

fork
    :Hoc vien lam bai 4 ky nang;
    :Tu dong luu tam bai lam vao LocalStorage;
fork again
    repeat
        :Dong ho dem nguoc moi giay;
    backward:Con thoi gian;
    repeat while (Het gio 180 phut?) is (Chua) not (Da het gio)
end fork

:Khoa toan bo bai thi cuong che;

partition "Cham trac nghiem tu dong" {
    :So khop dap an Listening va Reading voi Answer Key;
    :Tinh so cau dung va quy doi diem so;
    note right: Co ket qua ngay lap tuc (<50ms)
}

partition "Cham tu luan bang AI" {
    :Gui bai lam Viet/Noi sang Phan he AI Engine;
    :AI phan tich tieu chi CEFR, tu vung va ngu phap;
    :Nhan ket qua diem so thang 10 va nhan xet sua loi;
}

:Tong hop diem so toan dien 4 ky nang;
:Quy doi sang chung chi VSTEP: B1 / B2 / C1;
:Xuat bao cao ket qua chi tiet cho hoc vien;
stop
@enduml
"""

with open('diagrams/02_activity_flow_mock_test.puml', 'w', encoding='utf-8') as f:
    f.write(activity_puml.strip())

# 3. Sequence Diagram
seq_puml = """@startuml
!theme plain
skinparam shadowing false
skinparam defaultFontName Arial
autonumber

actor Student as "Hoc vien\\n(Student)"
participant UI as "Giao dien Luyen thi\\n(WritingPractice)"
participant Service as "Dich vu cham\\n(AIScoringService)"
participant Adapter as "Bo tuong thich AI\\n(AIAdapter)"
participant AI as "Phan he AI Engine\\n(Gemini API)"
database DB as "Bo nho Luu tru\\n(LocalStorage/DB)"

Student -> UI : Soan thao bai luan, bam "AI Cham diem"
activate UI
UI -> UI : Kiem tra so tu hop le (Word Count >= 30)

UI -> Service : scoreWriting(prompt, essayContent)
activate Service

Service -> Adapter : evaluate(payload)
activate Adapter

Adapter -> AI : POST /models/gemini-1.5-flash
activate AI
note right of AI
  Danh gia 4 tieu chi CEFR:
  - Task Fulfillment
  - Coherence and Cohesion
  - Lexical Resource
  - Grammar and Accuracy
end note
AI --> Adapter : Tra ve ket qua JSON (Diem so, Bac CEFR, Loi sai)
deactivate AI

Adapter --> Service : Doi tuong EvaluationResult chuan hoa
deactivate Adapter

Service -> DB : saveEvaluationLog(submissionId, result)
activate DB
DB --> Service : Luu thanh cong
deactivate DB

Service --> UI : Tra ve du lieu ket qua cham
deactivate Service

UI --> Student : Hien thi The diem, loi ngu phap va bai mau nang cao
deactivate UI
@enduml
"""

with open('diagrams/03_sequence_ai_scoring.puml', 'w', encoding='utf-8') as f:
    f.write(seq_puml.strip())

# 4. State Machine Diagram
state_puml = """@startuml
!theme plain
skinparam shadowing false
skinparam defaultFontName Arial

[*] --> NOT_STARTED : Khoi tao phien bai thi

NOT_STARTED --> IN_PROGRESS : Bam "Bat dau lam bai"

state IN_PROGRESS {
    [*] --> LISTENING
    LISTENING --> READING : Chuyen ky nang
    READING --> WRITING : Chuyen ky nang
    WRITING --> SPEAKING : Chuyen ky nang
    SPEAKING --> LISTENING : Quay lai on duyet
}

IN_PROGRESS --> SUBMITTED : Hoc vien bam Nop bai
IN_PROGRESS --> SUBMITTED : Het thoi gian 180 phut (Auto-Submit)

state SUBMITTED {
    [*] --> OBJECTIVE_SCORED : Trac nghiem doi chieu Answer Key (Ngay lap tuc)
    OBJECTIVE_SCORED --> AI_EVALUATING : Gui bai tu luan sang AI Engine
    AI_EVALUATING --> EVALUATION_COMPLETED : AI hoan tat cham diem va sua loi
}

EVALUATION_COMPLETED --> ARCHIVED : Tong hop diem 4 ky nang va Luu lich su
ARCHIVED --> [*]
@enduml
"""

with open('diagrams/04_state_machine_exam.puml', 'w', encoding='utf-8') as f:
    f.write(state_puml.strip())

# 5. Class Diagram (Clean Architecture & Strategy Pattern)
class_puml = """@startuml
!theme plain
skinparam shadowing false
skinparam defaultFontName Arial
skinparam classAttributeIconSize 0

package "Domain Layer (Thuc the va Giao dien)" {
    interface IScoringStrategy {
        +calculateScore(submission: Submission): ScoreResult
    }

    interface IAIEvaluator {
        +evaluateWriting(prompt: String, essay: String): AIEvaluationResult
    }

    class Submission {
        +id: String
        +userId: String
        +examId: String
        +objectiveScore: float
        +aiScore: float
        +finalScore: float
        +status: String
        +getFinalResult(): String
    }

    class Exam {
        +id: String
        +title: String
        +durationMinutes: int
        +examType: String
    }

    class ScoreResult {
        +score: float
        +cefrBand: String
        +feedback: String
    }
}

package "Application Layer (Dich vu Nghiep vu)" {
    class ObjectiveScoringStrategy {
        +calculateScore(submission: Submission): ScoreResult
        -matchAnswerKey(answers: Map, key: Map): int
    }

    class AIScoringStrategy {
        -aiAdapter: IAIEvaluator
        +calculateScore(submission: Submission): ScoreResult
        -buildRubricPrompt(content: String): String
    }

    class VstepExamBuilder {
        -exam: Exam
        +reset(): VstepExamBuilder
        +addListeningParts(): VstepExamBuilder
        +addReadingPassages(): VstepExamBuilder
        +addWritingTasks(): VstepExamBuilder
        +build(): Exam
    }
}

package "Infrastructure Layer (Ha tang va Adapter)" {
    class AIAdapter {
        +evaluateWriting(prompt: String, essay: String): AIEvaluationResult
        -callGenerativeAPI(payload: String): String
    }
    
    class LocalStorageAdapter {
        +saveSubmission(sub: Submission): void
        +getSubmission(id: String): Submission
    }
}

IScoringStrategy <|.. ObjectiveScoringStrategy : implements
IScoringStrategy <|.. AIScoringStrategy : implements
IAIEvaluator <|.. AIAdapter : implements

AIScoringStrategy --> IAIEvaluator : uses
Submission --> ScoreResult : generates
VstepExamBuilder --> Exam : builds
AIScoringStrategy ..> Submission : evaluates
ObjectiveScoringStrategy ..> Submission : evaluates
@enduml
"""

with open('diagrams/05_class_diagram_architecture.puml', 'w', encoding='utf-8') as f:
    f.write(class_puml.strip())

# 6. Database ERD
erd_puml = """@startuml
!theme plain
skinparam shadowing false
skinparam defaultFontName Arial

entity "USERS" as users {
    * user_id : VARCHAR(36) [PK]
    --
    username : VARCHAR(50) [UQ]
    password_hash : VARCHAR(255)
    display_name : VARCHAR(100)
    email : VARCHAR(100)
    role_id : VARCHAR(20) [FK]
    created_at : TIMESTAMP
}

entity "ROLES" as roles {
    * role_id : VARCHAR(20) [PK]
    --
    role_name : VARCHAR(50)
    description : TEXT
}

entity "EXAMS" as exams {
    * exam_id : VARCHAR(36) [PK]
    --
    title : VARCHAR(200)
    exam_type : VARCHAR(30)
    duration_minutes : INT
    created_by : VARCHAR(36) [FK]
    created_at : TIMESTAMP
}

entity "SECTIONS" as sections {
    * section_id : VARCHAR(36) [PK]
    --
    exam_id : VARCHAR(36) [FK]
    skill_type : VARCHAR(20)
    title : VARCHAR(150)
    passage_content : TEXT
    audio_url : VARCHAR(255)
}

entity "QUESTIONS" as questions {
    * question_id : VARCHAR(36) [PK]
    --
    section_id : VARCHAR(36) [FK]
    question_number : INT
    question_content : TEXT
    correct_answer : VARCHAR(10)
}

entity "QUESTION_OPTIONS" as options {
    * option_id : VARCHAR(36) [PK]
    --
    question_id : VARCHAR(36) [FK]
    option_label : VARCHAR(5)
    option_text : TEXT
}

entity "SUBMISSIONS" as submissions {
    * submission_id : VARCHAR(36) [PK]
    --
    user_id : VARCHAR(36) [FK]
    exam_id : VARCHAR(36) [FK]
    objective_score : DECIMAL(3,1)
    ai_score : DECIMAL(3,1)
    final_score : DECIMAL(3,1)
    cefr_band : VARCHAR(10)
    status : VARCHAR(20)
    created_at : TIMESTAMP
}

entity "AI_EVALUATION_RESULTS" as ai_results {
    * eval_id : VARCHAR(36) [PK]
    --
    submission_id : VARCHAR(36) [FK]
    overall_score : DECIMAL(3,1)
    cefr_level : VARCHAR(10)
    feedback_details : TEXT
    suggested_revision : TEXT
    created_at : TIMESTAMP
}

roles ||--o{ users : has
users ||--o{ submissions : submits
exams ||--|{ sections : contains
sections ||--|{ questions : has
questions ||--|{ options : includes
submissions ||--o| ai_results : evaluated_by
exams ||--o{ submissions : takes
@enduml
"""

with open('diagrams/06_database_erd.puml', 'w', encoding='utf-8') as f:
    f.write(erd_puml.strip())

print('Successfully created 6 editable PlantUML files in diagrams/')
