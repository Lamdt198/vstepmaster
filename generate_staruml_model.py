import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

STARUML_DIR = os.path.abspath('diagrams/staruml')
os.makedirs(STARUML_DIR, exist_ok=True)

mdj_project = {
    "_type": "Project",
    "_id": "AAAAAAF_VSTEP_MASTER_PROJECT",
    "name": "VSTEP_Master_Advanced_Software_Design",
    "ownedElements": [
        {
            "_type": "UMLModel",
            "_id": "AAAAAAF_USE_CASE_MODEL",
            "_parent": { "$ref": "AAAAAAF_VSTEP_MASTER_PROJECT" },
            "name": "Use Case Model",
            "ownedElements": [
                {
                    "_type": "UMLUseCaseDiagram",
                    "_id": "AAAAAAF_UCD_DIAGRAM",
                    "_parent": { "$ref": "AAAAAAF_USE_CASE_MODEL" },
                    "name": "01_Use_Case_Overview"
                },
                {
                    "_type": "UMLActor",
                    "_id": "AAAAAAF_ACTOR_STUDENT",
                    "_parent": { "$ref": "AAAAAAF_USE_CASE_MODEL" },
                    "name": "Học viên (Student)"
                },
                {
                    "_type": "UMLActor",
                    "_id": "AAAAAAF_ACTOR_ADMIN",
                    "_parent": { "$ref": "AAAAAAF_USE_CASE_MODEL" },
                    "name": "Quản trị viên (Admin)"
                },
                {
                    "_type": "UMLActor",
                    "_id": "AAAAAAF_ACTOR_AI",
                    "_parent": { "$ref": "AAAAAAF_USE_CASE_MODEL" },
                    "name": "AI Engine (External Service)"
                },
                { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_01", "_parent": { "$ref": "AAAAAAF_USE_CASE_MODEL" }, "name": "UC-01: Đăng nhập và Xác thực" },
                { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_02", "_parent": { "$ref": "AAAAAAF_USE_CASE_MODEL" }, "name": "UC-02: Luyện tập Listening" },
                { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_03", "_parent": { "$ref": "AAAAAAF_USE_CASE_MODEL" }, "name": "UC-03: Luyện tập Reading" },
                { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_04", "_parent": { "$ref": "AAAAAAF_USE_CASE_MODEL" }, "name": "UC-04: Luyện tập Writing" },
                { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_05", "_parent": { "$ref": "AAAAAAF_USE_CASE_MODEL" }, "name": "UC-05: Luyện tập Speaking" },
                { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_06", "_parent": { "$ref": "AAAAAAF_USE_CASE_MODEL" }, "name": "UC-06: Thi thử Mock Test 180 phút" },
                { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_07", "_parent": { "$ref": "AAAAAAF_USE_CASE_MODEL" }, "name": "UC-07: Bóc tách đề Word/PDF" },
                { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_08", "_parent": { "$ref": "AAAAAAF_USE_CASE_MODEL" }, "name": "UC-08: Flashcards & Từ vựng" },
                { "_type": "UMLUseCase", "_id": "AAAAAAF_UC_AI", "_parent": { "$ref": "AAAAAAF_USE_CASE_MODEL" }, "name": "AI Chấm điểm Tự luận (CEFR)" }
            ]
        },
        {
            "_type": "UMLModel",
            "_id": "AAAAAAF_CLASS_MODEL",
            "_parent": { "$ref": "AAAAAAF_VSTEP_MASTER_PROJECT" },
            "name": "Design Model (Clean Architecture & GoF Patterns)",
            "ownedElements": [
                {
                    "_type": "UMLClassDiagram",
                    "_id": "AAAAAAF_DCD_DIAGRAM",
                    "_parent": { "$ref": "AAAAAAF_CLASS_MODEL" },
                    "name": "05_Design_Class_Diagram"
                },
                {
                    "_type": "UMLInterface",
                    "_id": "AAAAAAF_INT_SCORING",
                    "_parent": { "$ref": "AAAAAAF_CLASS_MODEL" },
                    "name": "IScoringStrategy",
                    "operations": [
                        { "_type": "UMLOperation", "name": "calculateScore", "parameters": [{ "name": "data" }] }
                    ]
                },
                {
                    "_type": "UMLClass",
                    "_id": "AAAAAAF_CLS_OBJ_SCORING",
                    "_parent": { "$ref": "AAAAAAF_CLASS_MODEL" },
                    "name": "ObjectiveScoringStrategy",
                    "operations": [
                        { "_type": "UMLOperation", "name": "calculateScore" },
                        { "_type": "UMLOperation", "name": "matchAnswerKey" }
                    ]
                },
                {
                    "_type": "UMLClass",
                    "_id": "AAAAAAF_CLS_AI_SCORING",
                    "_parent": { "$ref": "AAAAAAF_CLASS_MODEL" },
                    "name": "AIScoringStrategy",
                    "attributes": [
                        { "_type": "UMLAttribute", "name": "aiEvaluator", "type": "IAIEvaluator" }
                    ],
                    "operations": [
                        { "_type": "UMLOperation", "name": "calculateScore" }
                    ]
                },
                {
                    "_type": "UMLInterface",
                    "_id": "AAAAAAF_INT_AI_EVAL",
                    "_parent": { "$ref": "AAAAAAF_CLASS_MODEL" },
                    "name": "IAIEvaluator",
                    "operations": [
                        { "_type": "UMLOperation", "name": "evaluateEssay", "parameters": [{ "name": "prompt" }, { "name": "essay" }] }
                    ]
                },
                {
                    "_type": "UMLClass",
                    "_id": "AAAAAAF_CLS_AI_ADAPTER",
                    "_parent": { "$ref": "AAAAAAF_CLASS_MODEL" },
                    "name": "AIAdapter",
                    "attributes": [
                        { "_type": "UMLAttribute", "name": "endpointUrl", "type": "String" }
                    ],
                    "operations": [
                        { "_type": "UMLOperation", "name": "evaluateEssay" },
                        { "_type": "UMLOperation", "name": "transformResponse" }
                    ]
                },
                {
                    "_type": "UMLClass",
                    "_id": "AAAAAAF_CLS_BUILDER",
                    "_parent": { "$ref": "AAAAAAF_CLASS_MODEL" },
                    "name": "VstepExamBuilder",
                    "operations": [
                        { "_type": "UMLOperation", "name": "addListeningSection" },
                        { "_type": "UMLOperation", "name": "addReadingSection" },
                        { "_type": "UMLOperation", "name": "addWritingSection" },
                        { "_type": "UMLOperation", "name": "build" }
                    ]
                },
                {
                    "_type": "UMLClass",
                    "_id": "AAAAAAF_CLS_EXAM_SERVICE",
                    "_parent": { "$ref": "AAAAAAF_CLASS_MODEL" },
                    "name": "ExamService",
                    "operations": [
                        { "_type": "UMLOperation", "name": "startSession" },
                        { "_type": "UMLOperation", "name": "submitExam" }
                    ]
                },
                {
                    "_type": "UMLClass",
                    "_id": "AAAAAAF_CLS_EXAM",
                    "_parent": { "$ref": "AAAAAAF_CLASS_MODEL" },
                    "name": "Exam",
                    "attributes": [
                        { "_type": "UMLAttribute", "name": "id", "type": "String" },
                        { "_type": "UMLAttribute", "name": "title", "type": "String" },
                        { "_type": "UMLAttribute", "name": "totalDurationMinutes", "type": "Int" }
                    ]
                },
                {
                    "_type": "UMLClass",
                    "_id": "AAAAAAF_CLS_SECTION",
                    "_parent": { "$ref": "AAAAAAF_CLASS_MODEL" },
                    "name": "Section",
                    "attributes": [
                        { "_type": "UMLAttribute", "name": "id", "type": "String" },
                        { "_type": "UMLAttribute", "name": "skillType", "type": "SkillEnum" }
                    ]
                },
                {
                    "_type": "UMLClass",
                    "_id": "AAAAAAF_CLS_QUESTION",
                    "_parent": { "$ref": "AAAAAAF_CLASS_MODEL" },
                    "name": "Question",
                    "attributes": [
                        { "_type": "UMLAttribute", "name": "id", "type": "String" },
                        { "_type": "UMLAttribute", "name": "questionText", "type": "Text" }
                    ]
                },
                {
                    "_type": "UMLClass",
                    "_id": "AAAAAAF_CLS_SUBMISSION",
                    "_parent": { "$ref": "AAAAAAF_CLASS_MODEL" },
                    "name": "Submission",
                    "attributes": [
                        { "_type": "UMLAttribute", "name": "id", "type": "String" },
                        { "_type": "UMLAttribute", "name": "finalScore", "type": "Decimal" },
                        { "_type": "UMLAttribute", "name": "cefrBand", "type": "String" }
                    ]
                }
            ]
        },
        {
            "_type": "ERDDataModel",
            "_id": "AAAAAAF_DATABASE_MODEL",
            "_parent": { "$ref": "AAAAAAF_VSTEP_MASTER_PROJECT" },
            "name": "Database Model (3NF Relational Schema)",
            "ownedElements": [
                {
                    "_type": "ERDDiagram",
                    "_id": "AAAAAAF_ERD_DIAGRAM",
                    "_parent": { "$ref": "AAAAAAF_DATABASE_MODEL" },
                    "name": "06_Database_ERD"
                },
                {
                    "_type": "ERDEntity",
                    "_id": "AAAAAAF_ENT_ROLES",
                    "_parent": { "$ref": "AAAAAAF_DATABASE_MODEL" },
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
                    "_parent": { "$ref": "AAAAAAF_DATABASE_MODEL" },
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
                    "_parent": { "$ref": "AAAAAAF_DATABASE_MODEL" },
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
                    "_id": "AAAAAAF_ENT_SUBMISSIONS",
                    "_parent": { "$ref": "AAAAAAF_DATABASE_MODEL" },
                    "name": "SUBMISSIONS",
                    "columns": [
                        { "_type": "ERDColumn", "name": "submission_id", "type": "VARCHAR(36)", "primaryKey": True },
                        { "_type": "ERDColumn", "name": "user_id", "type": "VARCHAR(36)", "foreignKey": True },
                        { "_type": "ERDColumn", "name": "exam_id", "type": "VARCHAR(36)", "foreignKey": True },
                        { "_type": "ERDColumn", "name": "objective_score", "type": "DECIMAL(3,1)" },
                        { "_type": "ERDColumn", "name": "ai_score", "type": "DECIMAL(3,1)" },
                        { "_type": "ERDColumn", "name": "final_score", "type": "DECIMAL(3,1)" },
                        { "_type": "ERDColumn", "name": "cefr_band", "type": "VARCHAR(10)" }
                    ]
                },
                {
                    "_type": "ERDEntity",
                    "_id": "AAAAAAF_ENT_AI_EVAL",
                    "_parent": { "$ref": "AAAAAAF_DATABASE_MODEL" },
                    "name": "AI_EVALUATION_RESULTS",
                    "columns": [
                        { "_type": "ERDColumn", "name": "evaluation_id", "type": "VARCHAR(36)", "primaryKey": True },
                        { "_type": "ERDColumn", "name": "submission_id", "type": "VARCHAR(36)", "foreignKey": True },
                        { "_type": "ERDColumn", "name": "task_fulfillment", "type": "DECIMAL(3,1)" },
                        { "_type": "ERDColumn", "name": "organization", "type": "DECIMAL(3,1)" },
                        { "_type": "ERDColumn", "name": "lexical_resource", "type": "DECIMAL(3,1)" },
                        { "_type": "ERDColumn", "name": "grammar_accuracy", "type": "DECIMAL(3,1)" }
                    ]
                }
            ]
        }
    ]
}

staruml_file = os.path.join(STARUML_DIR, "VSTEP_Master_Model.mdj")
with open(staruml_file, 'w', encoding='utf-8') as f:
    json.dump(mdj_project, f, ensure_ascii=False, indent=2)

print(f"Successfully generated StarUML Project: {staruml_file}")
print(f"File Size: {os.path.getsize(staruml_file)} bytes")
