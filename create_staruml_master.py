import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

STARUML_DIR = os.path.abspath('diagrams/staruml')
os.makedirs(STARUML_DIR, exist_ok=True)

def build_staruml_project():
    project = {
        "_type": "Project",
        "_id": "AAAAAAF_PROJECT_VSTEP",
        "name": "VSTEP_Master_Software_Design",
        "ownedElements": [
            # -------------------------------------------------------------
            # 1. USE CASE MODEL
            # -------------------------------------------------------------
            {
                "_type": "UMLModel",
                "_id": "AAAAAAF_MODEL_USECASE",
                "_parent": { "$ref": "AAAAAAF_PROJECT_VSTEP" },
                "name": "01_Use_Case_Model",
                "ownedElements": [
                    {
                        "_type": "UMLUseCaseDiagram",
                        "_id": "AAAAAAF_DIAG_USECASE",
                        "_parent": { "$ref": "AAAAAAF_MODEL_USECASE" },
                        "name": "Biểu đồ Ca sử dụng Tổng quan (Use Case Diagram)"
                    },
                    {
                        "_type": "UMLActor",
                        "_id": "AAAAAAF_ACT_STUDENT",
                        "_parent": { "$ref": "AAAAAAF_MODEL_USECASE" },
                        "name": "Học viên (Student / Candidate)"
                    },
                    {
                        "_type": "UMLActor",
                        "_id": "AAAAAAF_ACT_ADMIN",
                        "_parent": { "$ref": "AAAAAAF_MODEL_USECASE" },
                        "name": "Quản trị viên (Administrator)"
                    },
                    {
                        "_type": "UMLActor",
                        "_id": "AAAAAAF_ACT_AI",
                        "_parent": { "$ref": "AAAAAAF_MODEL_USECASE" },
                        "name": "Phân hệ AI Engine (Google Gemini)"
                    },
                    {
                        "_type": "UMLPackage",
                        "_id": "AAAAAAF_SUB_SYSTEM",
                        "_parent": { "$ref": "AAAAAAF_MODEL_USECASE" },
                        "name": "HỆ THỐNG LUYỆN THI VSTEP MASTER",
                        "ownedElements": [
                            { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_01", "_parent": { "$ref": "AAAAAAF_SUB_SYSTEM" }, "name": "UC-01: Đăng nhập & Đăng ký" },
                            { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_02", "_parent": { "$ref": "AAAAAAF_SUB_SYSTEM" }, "name": "UC-02: Luyện tập Kỹ năng Nghe (Listening)" },
                            { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_03", "_parent": { "$ref": "AAAAAAF_SUB_SYSTEM" }, "name": "UC-03: Luyện tập Kỹ năng Đọc (Reading)" },
                            { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_04", "_parent": { "$ref": "AAAAAAF_SUB_SYSTEM" }, "name": "UC-04: Luyện tập Kỹ năng Viết (Writing)" },
                            { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_05", "_parent": { "$ref": "AAAAAAF_SUB_SYSTEM" }, "name": "UC-05: Luyện tập Kỹ năng Nói (Speaking)" },
                            { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_06", "_parent": { "$ref": "AAAAAAF_SUB_SYSTEM" }, "name": "UC-06: Thi thử VSTEP Mock Test 180 phút" },
                            { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_07", "_parent": { "$ref": "AAAAAAF_SUB_SYSTEM" }, "name": "UC-07: Bóc tách Đề thi Word / PDF" },
                            { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_08", "_parent": { "$ref": "AAAAAAF_SUB_SYSTEM" }, "name": "UC-08: Flashcards & Tra từ điển CEFR" },
                            { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_AI", "_parent": { "$ref": "AAAAAAF_SUB_SYSTEM" }, "name": "AI Chấm điểm Tự luận (Rubric CEFR)" },
                            { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_ADM_EXAM", "_parent": { "$ref": "AAAAAAF_SUB_SYSTEM" }, "name": "Quản lý Ngân hàng Đề thi" },
                            { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_ADM_USER", "_parent": { "$ref": "AAAAAAF_SUB_SYSTEM" }, "name": "Quản lý Người dùng & Lịch sử thi" }
                        ]
                    }
                ]
            },

            # -------------------------------------------------------------
            # 2. ACTIVITY MODEL
            # -------------------------------------------------------------
            {
                "_type": "UMLModel",
                "_id": "AAAAAAF_MODEL_ACTIVITY",
                "_parent": { "$ref": "AAAAAAF_PROJECT_VSTEP" },
                "name": "02_Activity_Model",
                "ownedElements": [
                    {
                        "_type": "UMLActivityDiagram",
                        "_id": "AAAAAAF_DIAG_ACTIVITY",
                        "_parent": { "$ref": "AAAAAAF_MODEL_ACTIVITY" },
                        "name": "Biểu đồ Hoạt động (Activity Diagram - Thi thử & Chấm điểm)"
                    },
                    {
                        "_type": "UMLActivity",
                        "_id": "AAAAAAF_ACT_ROOT",
                        "_parent": { "$ref": "AAAAAAF_MODEL_ACTIVITY" },
                        "name": "Quy trình Thi thử VSTEP 180 phút",
                        "nodes": [
                            { "_type": "UMLInitialNode", "_id": "AAAAAAF_AN_INIT", "_parent": { "$ref": "AAAAAAF_ACT_ROOT" }, "name": "Start" },
                            { "_type": "UMLAction", "_id": "AAAAAAF_AN_START", "_parent": { "$ref": "AAAAAAF_ACT_ROOT" }, "name": "Bắt đầu làm bài thi thử" },
                            { "_type": "UMLForkNode", "_id": "AAAAAAF_AN_FORK1", "_parent": { "$ref": "AAAAAAF_ACT_ROOT" }, "name": "Fork 1" },
                            { "_type": "UMLAction", "_id": "AAAAAAF_AN_TIMER", "_parent": { "$ref": "AAAAAAF_ACT_ROOT" }, "name": "Đồng hồ đếm ngược 180:00" },
                            { "_type": "UMLAction", "_id": "AAAAAAF_AN_EXAM", "_parent": { "$ref": "AAAAAAF_ACT_ROOT" }, "name": "Thí sinh làm bài 4 kỹ năng" },
                            { "_type": "UMLJoinNode", "_id": "AAAAAAF_AN_JOIN1", "_parent": { "$ref": "AAAAAAF_ACT_ROOT" }, "name": "Join 1" },
                            { "_type": "UMLAction", "_id": "AAAAAAF_AN_LOCK", "_parent": { "$ref": "AAAAAAF_ACT_ROOT" }, "name": "Khóa đề thi (Hết giờ / Nộp bài)" },
                            { "_type": "UMLForkNode", "_id": "AAAAAAF_AN_FORK2", "_parent": { "$ref": "AAAAAAF_ACT_ROOT" }, "name": "Fork 2 (Phân nhánh chấm)" },
                            { "_type": "UMLAction", "_id": "AAAAAAF_AN_SCORE_OBJ", "_parent": { "$ref": "AAAAAAF_ACT_ROOT" }, "name": "Chấm trắc nghiệm đối chiếu Answer Key (<50ms)" },
                            { "_type": "UMLAction", "_id": "AAAAAAF_AN_SCORE_AI", "_parent": { "$ref": "AAAAAAF_ACT_ROOT" }, "name": "Gửi bài tự luận sang AI Engine phân tích (2-4s)" },
                            { "_type": "UMLJoinNode", "_id": "AAAAAAF_AN_JOIN2", "_parent": { "$ref": "AAAAAAF_ACT_ROOT" }, "name": "Join 2" },
                            { "_type": "UMLAction", "_id": "AAAAAAF_AN_FINALIZE", "_parent": { "$ref": "AAAAAAF_ACT_ROOT" }, "name": "Tổng hợp điểm TB & Xếp bậc B1/B2/C1" },
                            { "_type": "UMLActivityFinalNode", "_id": "AAAAAAF_AN_END", "_parent": { "$ref": "AAAAAAF_ACT_ROOT" }, "name": "End" }
                        ]
                    }
                ]
            },

            # -------------------------------------------------------------
            # 3. SEQUENCE MODEL
            # -------------------------------------------------------------
            {
                "_type": "UMLModel",
                "_id": "AAAAAAF_MODEL_SEQUENCE",
                "_parent": { "$ref": "AAAAAAF_PROJECT_VSTEP" },
                "name": "03_Sequence_Model",
                "ownedElements": [
                    {
                        "_type": "UMLSequenceDiagram",
                        "_id": "AAAAAAF_DIAG_SEQUENCE",
                        "_parent": { "$ref": "AAAAAAF_MODEL_SEQUENCE" },
                        "name": "Biểu đồ Tuần tự (Sequence Diagram - AI Chấm bài Tự luận)"
                    },
                    {
                        "_type": "UMLCollaboration",
                        "_id": "AAAAAAF_COL_AI",
                        "_parent": { "$ref": "AAAAAAF_MODEL_SEQUENCE" },
                        "name": "AI Evaluation Flow",
                        "roles": [
                            { "_type": "UMLLifeline", "_id": "AAAAAAF_LL_CAND", "name": "Học viên (Candidate)" },
                            { "_type": "UMLLifeline", "_id": "AAAAAAF_LL_UI", "name": "WritingUI" },
                            { "_type": "UMLLifeline", "_id": "AAAAAAF_LL_SRV", "name": "AIScoringService" },
                            { "_type": "UMLLifeline", "_id": "AAAAAAF_LL_ADP", "name": "AIAdapter" },
                            { "_type": "UMLLifeline", "_id": "AAAAAAF_LL_ENG", "name": "AIEngine (Gemini API)" },
                            { "_type": "UMLLifeline", "_id": "AAAAAAF_LL_DB", "name": "Database" }
                        ]
                    }
                ]
            },

            # -------------------------------------------------------------
            # 4. STATE MACHINE MODEL
            # -------------------------------------------------------------
            {
                "_type": "UMLModel",
                "_id": "AAAAAAF_MODEL_STATE",
                "_parent": { "$ref": "AAAAAAF_PROJECT_VSTEP" },
                "name": "04_State_Machine_Model",
                "ownedElements": [
                    {
                        "_type": "UMLStatechartDiagram",
                        "_id": "AAAAAAF_DIAG_STATE",
                        "_parent": { "$ref": "AAAAAAF_MODEL_STATE" },
                        "name": "Biểu đồ Máy trạng thái (State Machine - Vòng đời bài thi)"
                    },
                    {
                        "_type": "UMLStateMachine",
                        "_id": "AAAAAAF_SM_ROOT",
                        "_parent": { "$ref": "AAAAAAF_MODEL_STATE" },
                        "name": "Exam Lifecycle State Machine",
                        "regions": [
                            {
                                "_type": "UMLRegion",
                                "_id": "AAAAAAF_REG_1",
                                "_parent": { "$ref": "AAAAAAF_SM_ROOT" },
                                "name": "Main Region",
                                "vertices": [
                                    { "_type": "UMLPseudostate", "_id": "AAAAAAF_ST_INIT", "kind": "initial", "name": "Initial" },
                                    { "_type": "UMLState", "_id": "AAAAAAF_ST_NOT_STARTED", "name": "NOT_STARTED (Đề thi sẵn sàng)" },
                                    { "_type": "UMLState", "_id": "AAAAAAF_ST_IN_PROGRESS", "name": "IN_PROGRESS (Đang làm bài)" },
                                    { "_type": "UMLState", "_id": "AAAAAAF_ST_SUBMITTED", "name": "SUBMITTED (Khóa bài thi)" },
                                    { "_type": "UMLState", "_id": "AAAAAAF_ST_OBJ_SCORED", "name": "OBJECTIVE_SCORED (Điểm trắc nghiệm)" },
                                    { "_type": "UMLState", "_id": "AAAAAAF_ST_AI_EVAL", "name": "AI_EVALUATING (AI đang chấm)" },
                                    { "_type": "UMLState", "_id": "AAAAAAF_ST_COMPLETED", "name": "COMPLETED (Hoàn tất kết quả)" },
                                    { "_type": "UMLState", "_id": "AAAAAAF_ST_ARCHIVED", "name": "ARCHIVED (Lưu trữ lịch sử)" },
                                    { "_type": "UMLFinalState", "_id": "AAAAAAF_ST_FINAL", "name": "Final" }
                                ]
                            }
                        ]
                    }
                ]
            },

            # -------------------------------------------------------------
            # 5. CLASS MODEL (Clean Architecture & GoF Patterns)
            # -------------------------------------------------------------
            {
                "_type": "UMLModel",
                "_id": "AAAAAAF_MODEL_CLASS",
                "_parent": { "$ref": "AAAAAAF_PROJECT_VSTEP" },
                "name": "05_Design_Class_Model (Clean Architecture & GoF)",
                "ownedElements": [
                    {
                        "_type": "UMLClassDiagram",
                        "_id": "AAAAAAF_DIAG_CLASS",
                        "_parent": { "$ref": "AAAAAAF_MODEL_CLASS" },
                        "name": "Biểu đồ Lớp chi tiết (Design Class Diagram)"
                    },
                    # Presentation Layer
                    {
                        "_type": "UMLPackage",
                        "_id": "AAAAAAF_PKG_PRES",
                        "_parent": { "$ref": "AAAAAAF_MODEL_CLASS" },
                        "name": "Presentation Layer",
                        "ownedElements": [
                            {
                                "_type": "UMLClass",
                                "_id": "AAAAAAF_CLS_EXAM_PAGE",
                                "_parent": { "$ref": "AAAAAAF_PKG_PRES" },
                                "name": "ExamPage",
                                "attributes": [
                                    { "_type": "UMLAttribute", "name": "state", "type": "ExamState" },
                                    { "_type": "UMLAttribute", "name": "timer", "type": "Int" }
                                ],
                                "operations": [
                                    { "_type": "UMLOperation", "name": "handleAnswerSelect" },
                                    { "_type": "UMLOperation", "name": "handleSubmit" }
                                ]
                            },
                            {
                                "_type": "UMLClass",
                                "_id": "AAAAAAF_CLS_WRITING_PAGE",
                                "_parent": { "$ref": "AAAAAAF_PKG_PRES" },
                                "name": "WritingPage",
                                "attributes": [
                                    { "_type": "UMLAttribute", "name": "wordCount", "type": "Int" },
                                    { "_type": "UMLAttribute", "name": "isScoring", "type": "Boolean" }
                                ],
                                "operations": [
                                    { "_type": "UMLOperation", "name": "handleAISubmit" },
                                    { "_type": "UMLOperation", "name": "renderScoreCard" }
                                ]
                            },
                            {
                                "_type": "UMLClass",
                                "_id": "AAAAAAF_CLS_TIMER",
                                "_parent": { "$ref": "AAAAAAF_PKG_PRES" },
                                "name": "ExamTimer (Observer)",
                                "attributes": [
                                    { "_type": "UMLAttribute", "name": "listeners", "type": "Function[]" }
                                ],
                                "operations": [
                                    { "_type": "UMLOperation", "name": "subscribe" },
                                    { "_type": "UMLOperation", "name": "tick" },
                                    { "_type": "UMLOperation", "name": "onTimeout" }
                                ]
                            }
                        ]
                    },
                    # Application Layer
                    {
                        "_type": "UMLPackage",
                        "_id": "AAAAAAF_PKG_APP",
                        "_parent": { "$ref": "AAAAAAF_MODEL_CLASS" },
                        "name": "Application Layer",
                        "ownedElements": [
                            {
                                "_type": "UMLClass",
                                "_id": "AAAAAAF_CLS_EXAM_SRV",
                                "_parent": { "$ref": "AAAAAAF_PKG_APP" },
                                "name": "ExamService",
                                "operations": [
                                    { "_type": "UMLOperation", "name": "startSession", "parameters": [{ "name": "examId", "type": "String" }] },
                                    { "_type": "UMLOperation", "name": "submitExam", "parameters": [{ "name": "submissionId", "type": "String" }] }
                                ]
                            },
                            {
                                "_type": "UMLClass",
                                "_id": "AAAAAAF_CLS_BUILDER",
                                "_parent": { "$ref": "AAAAAAF_PKG_APP" },
                                "name": "VstepExamBuilder (Builder Pattern)",
                                "operations": [
                                    { "_type": "UMLOperation", "name": "addListeningSection" },
                                    { "_type": "UMLOperation", "name": "addReadingSection" },
                                    { "_type": "UMLOperation", "name": "addWritingSection" },
                                    { "_type": "UMLOperation", "name": "build", "type": "Exam" }
                                ]
                            },
                            {
                                "_type": "UMLClass",
                                "_id": "AAAAAAF_CLS_SCORING_CTX",
                                "_parent": { "$ref": "AAAAAAF_PKG_APP" },
                                "name": "ScoringContext",
                                "operations": [
                                    { "_type": "UMLOperation", "name": "setStrategy", "parameters": [{ "name": "strat", "type": "IScoringStrategy" }] },
                                    { "_type": "UMLOperation", "name": "executeScoring", "type": "ScoringResult" }
                                ]
                            }
                        ]
                    },
                    # Domain Layer
                    {
                        "_type": "UMLPackage",
                        "_id": "AAAAAAF_PKG_DOM",
                        "_parent": { "$ref": "AAAAAAF_MODEL_CLASS" },
                        "name": "Domain Layer (Entities & DIP Interfaces)",
                        "ownedElements": [
                            {
                                "_type": "UMLInterface",
                                "_id": "AAAAAAF_INT_STRAT",
                                "_parent": { "$ref": "AAAAAAF_PKG_DOM" },
                                "name": "IScoringStrategy (Strategy Pattern)",
                                "operations": [
                                    { "_type": "UMLOperation", "name": "calculateScore", "parameters": [{ "name": "data" }], "type": "ScoringResult" }
                                ]
                            },
                            {
                                "_type": "UMLClass",
                                "_id": "AAAAAAF_CLS_OBJ_STRAT",
                                "_parent": { "$ref": "AAAAAAF_PKG_DOM" },
                                "name": "ObjectiveScoringStrategy",
                                "operations": [
                                    { "_type": "UMLOperation", "name": "calculateScore", "type": "ScoringResult" }
                                ]
                            },
                            {
                                "_type": "UMLClass",
                                "_id": "AAAAAAF_CLS_AI_STRAT",
                                "_parent": { "$ref": "AAAAAAF_PKG_DOM" },
                                "name": "AIScoringStrategy",
                                "operations": [
                                    { "_type": "UMLOperation", "name": "calculateScore", "type": "ScoringResult" }
                                ]
                            },
                            {
                                "_type": "UMLClass",
                                "_id": "AAAAAAF_CLS_EXAM_ENT",
                                "_parent": { "$ref": "AAAAAAF_PKG_DOM" },
                                "name": "Exam",
                                "attributes": [
                                    { "_type": "UMLAttribute", "name": "id", "type": "String" },
                                    { "_type": "UMLAttribute", "name": "title", "type": "String" },
                                    { "_type": "UMLAttribute", "name": "totalDuration", "type": "Int" }
                                ]
                            },
                            {
                                "_type": "UMLClass",
                                "_id": "AAAAAAF_CLS_SECTION_ENT",
                                "_parent": { "$ref": "AAAAAAF_PKG_DOM" },
                                "name": "Section",
                                "attributes": [
                                    { "_type": "UMLAttribute", "name": "id", "type": "String" },
                                    { "_type": "UMLAttribute", "name": "skillType", "type": "SkillEnum" }
                                ]
                            },
                            {
                                "_type": "UMLClass",
                                "_id": "AAAAAAF_CLS_QUESTION_ENT",
                                "_parent": { "$ref": "AAAAAAF_PKG_DOM" },
                                "name": "Question",
                                "attributes": [
                                    { "_type": "UMLAttribute", "name": "id", "type": "String" },
                                    { "_type": "UMLAttribute", "name": "questionText", "type": "Text" }
                                ]
                            },
                            {
                                "_type": "UMLClass",
                                "_id": "AAAAAAF_CLS_SUBMISSION_ENT",
                                "_parent": { "$ref": "AAAAAAF_PKG_DOM" },
                                "name": "Submission",
                                "attributes": [
                                    { "_type": "UMLAttribute", "name": "id", "type": "String" },
                                    { "_type": "UMLAttribute", "name": "finalScore", "type": "Decimal" },
                                    { "_type": "UMLAttribute", "name": "cefrBand", "type": "String" }
                                ]
                            }
                        ]
                    },
                    # Infrastructure Layer
                    {
                        "_type": "UMLPackage",
                        "_id": "AAAAAAF_PKG_INFRA",
                        "_parent": { "$ref": "AAAAAAF_MODEL_CLASS" },
                        "name": "Infrastructure Layer",
                        "ownedElements": [
                            {
                                "_type": "UMLInterface",
                                "_id": "AAAAAAF_INT_AI_EVAL",
                                "_parent": { "$ref": "AAAAAAF_PKG_INFRA" },
                                "name": "IAIEvaluator",
                                "operations": [
                                    { "_type": "UMLOperation", "name": "evaluateEssay", "type": "AIEvaluationDTO" }
                                ]
                            },
                            {
                                "_type": "UMLClass",
                                "_id": "AAAAAAF_CLS_AI_ADAPTER",
                                "_parent": { "$ref": "AAAAAAF_PKG_INFRA" },
                                "name": "AIAdapter (Adapter Pattern)",
                                "attributes": [
                                    { "_type": "UMLAttribute", "name": "endpointUrl", "type": "String" }
                                ],
                                "operations": [
                                    { "_type": "UMLOperation", "name": "evaluateEssay", "type": "AIEvaluationDTO" },
                                    { "_type": "UMLOperation", "name": "transformResponse", "type": "AIEvaluationDTO" }
                                ]
                            }
                        ]
                    }
                ]
            },

            # -------------------------------------------------------------
            # 6. DATABASE MODEL (ERD 3NF)
            # -------------------------------------------------------------
            {
                "_type": "ERDDataModel",
                "_id": "AAAAAAF_MODEL_ERD",
                "_parent": { "$ref": "AAAAAAF_PROJECT_VSTEP" },
                "name": "06_Database_Model_3NF",
                "ownedElements": [
                    {
                        "_type": "ERDDiagram",
                        "_id": "AAAAAAF_DIAG_ERD",
                        "_parent": { "$ref": "AAAAAAF_MODEL_ERD" },
                        "name": "Sơ đồ Thực thể Liên kết (ERD 3NF)"
                    },
                    {
                        "_type": "ERDEntity",
                        "_id": "AAAAAAF_ENT_ROLES",
                        "_parent": { "$ref": "AAAAAAF_MODEL_ERD" },
                        "name": "ROLES",
                        "columns": [
                            { "_type": "ERDColumn", "name": "role_id", "type": "VARCHAR(36)", "primaryKey": True },
                            { "_type": "ERDColumn", "name": "role_name", "type": "VARCHAR(20)", "unique": True },
                            { "_type": "ERDColumn", "name": "description", "type": "VARCHAR(255)" }
                        ]
                    },
                    {
                        "_type": "ERDEntity",
                        "_id": "AAAAAAF_ENT_USERS",
                        "_parent": { "$ref": "AAAAAAF_MODEL_ERD" },
                        "name": "USERS",
                        "columns": [
                            { "_type": "ERDColumn", "name": "user_id", "type": "VARCHAR(36)", "primaryKey": True },
                            { "_type": "ERDColumn", "name": "username", "type": "VARCHAR(50)", "unique": True },
                            { "_type": "ERDColumn", "name": "password_hash", "type": "VARCHAR(255)" },
                            { "_type": "ERDColumn", "name": "full_name", "type": "VARCHAR(100)" },
                            { "_type": "ERDColumn", "name": "email", "type": "VARCHAR(100)" },
                            { "_type": "ERDColumn", "name": "role_id", "type": "VARCHAR(36)", "foreignKey": True }
                        ]
                    },
                    {
                        "_type": "ERDEntity",
                        "_id": "AAAAAAF_ENT_EXAMS",
                        "_parent": { "$ref": "AAAAAAF_MODEL_ERD" },
                        "name": "EXAMS",
                        "columns": [
                            { "_type": "ERDColumn", "name": "exam_id", "type": "VARCHAR(36)", "primaryKey": True },
                            { "_type": "ERDColumn", "name": "title", "type": "VARCHAR(255)" },
                            { "_type": "ERDColumn", "name": "exam_type", "type": "VARCHAR(20)" },
                            { "_type": "ERDColumn", "name": "duration_minutes", "type": "INT" }
                        ]
                    },
                    {
                        "_type": "ERDEntity",
                        "_id": "AAAAAAF_ENT_SECTIONS",
                        "_parent": { "$ref": "AAAAAAF_MODEL_ERD" },
                        "name": "SECTIONS",
                        "columns": [
                            { "_type": "ERDColumn", "name": "section_id", "type": "VARCHAR(36)", "primaryKey": True },
                            { "_type": "ERDColumn", "name": "exam_id", "type": "VARCHAR(36)", "foreignKey": True },
                            { "_type": "ERDColumn", "name": "skill_type", "type": "VARCHAR(20)" },
                            { "_type": "ERDColumn", "name": "section_order", "type": "INT" },
                            { "_type": "ERDColumn", "name": "duration_minutes", "type": "INT" }
                        ]
                    },
                    {
                        "_type": "ERDEntity",
                        "_id": "AAAAAAF_ENT_QUESTIONS",
                        "_parent": { "$ref": "AAAAAAF_MODEL_ERD" },
                        "name": "QUESTIONS",
                        "columns": [
                            { "_type": "ERDColumn", "name": "question_id", "type": "VARCHAR(36)", "primaryKey": True },
                            { "_type": "ERDColumn", "name": "section_id", "type": "VARCHAR(36)", "foreignKey": True },
                            { "_type": "ERDColumn", "name": "passage_text", "type": "TEXT" },
                            { "_type": "ERDColumn", "name": "audio_url", "type": "VARCHAR(255)" },
                            { "_type": "ERDColumn", "name": "question_text", "type": "TEXT" },
                            { "_type": "ERDColumn", "name": "question_type", "type": "VARCHAR(20)" }
                        ]
                    },
                    {
                        "_type": "ERDEntity",
                        "_id": "AAAAAAF_ENT_OPTIONS",
                        "_parent": { "$ref": "AAAAAAF_MODEL_ERD" },
                        "name": "QUESTION_OPTIONS",
                        "columns": [
                            { "_type": "ERDColumn", "name": "option_id", "type": "VARCHAR(36)", "primaryKey": True },
                            { "_type": "ERDColumn", "name": "question_id", "type": "VARCHAR(36)", "foreignKey": True },
                            { "_type": "ERDColumn", "name": "option_label", "type": "VARCHAR(2)" },
                            { "_type": "ERDColumn", "name": "option_text", "type": "TEXT" },
                            { "_type": "ERDColumn", "name": "is_correct", "type": "BOOLEAN" }
                        ]
                    },
                    {
                        "_type": "ERDEntity",
                        "_id": "AAAAAAF_ENT_SUBMISSIONS",
                        "_parent": { "$ref": "AAAAAAF_MODEL_ERD" },
                        "name": "SUBMISSIONS",
                        "columns": [
                            { "_type": "ERDColumn", "name": "submission_id", "type": "VARCHAR(36)", "primaryKey": True },
                            { "_type": "ERDColumn", "name": "user_id", "type": "VARCHAR(36)", "foreignKey": True },
                            { "_type": "ERDColumn", "name": "exam_id", "type": "VARCHAR(36)", "foreignKey": True },
                            { "_type": "ERDColumn", "name": "objective_score", "type": "DECIMAL(3,1)" },
                            { "_type": "ERDColumn", "name": "ai_score", "type": "DECIMAL(3,1)" },
                            { "_type": "ERDColumn", "name": "final_score", "type": "DECIMAL(3,1)" },
                            { "_type": "ERDColumn", "name": "cefr_band", "type": "VARCHAR(10)" },
                            { "_type": "ERDColumn", "name": "status", "type": "VARCHAR(20)" }
                        ]
                    },
                    {
                        "_type": "ERDEntity",
                        "_id": "AAAAAAF_ENT_AI_EVAL",
                        "_parent": { "$ref": "AAAAAAF_MODEL_ERD" },
                        "name": "AI_EVALUATION_RESULTS",
                        "columns": [
                            { "_type": "ERDColumn", "name": "evaluation_id", "type": "VARCHAR(36)", "primaryKey": True },
                            { "_type": "ERDColumn", "name": "submission_id", "type": "VARCHAR(36)", "foreignKey": True },
                            { "_type": "ERDColumn", "name": "task_fulfillment", "type": "DECIMAL(3,1)" },
                            { "_type": "ERDColumn", "name": "organization", "type": "DECIMAL(3,1)" },
                            { "_type": "ERDColumn", "name": "lexical_resource", "type": "DECIMAL(3,1)" },
                            { "_type": "ERDColumn", "name": "grammar_accuracy", "type": "DECIMAL(3,1)" },
                            { "_type": "ERDColumn", "name": "improved_sample", "type": "TEXT" }
                        ]
                    }
                ]
            }
        ]
    }

    out_file = os.path.join(STARUML_DIR, "VSTEP_Master_StarUML.mdj")
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(project, f, ensure_ascii=False, indent=2)

    print(f"Master StarUML Project created: {out_file} ({os.path.getsize(out_file)} bytes)")

if __name__ == '__main__':
    build_staruml_project()
