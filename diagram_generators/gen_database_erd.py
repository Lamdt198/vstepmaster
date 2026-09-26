from .common import save_diagram

def generate():
    xml = """        <!-- Title -->
        <mxCell id="title" value="Sơ đồ Cơ sở Dữ liệu Quan hệ Chuẩn hóa 3NF (14 Bảng Thực thể)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="450" y="10" width="600" height="30" as="geometry" />
        </mxCell>

        <!-- ================= COLUMN 1: Users & Profiles ================= -->
        <!-- ROLES -->
        <mxCell id="t_roles_h" value="ROLES" style="rounded=1;arcSize=10;fillColor=#1e40af;strokeColor=#1e40af;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="50" width="220" height="26" as="geometry" />
        </mxCell>
        <mxCell id="t_roles_b" value="[PK] role_id : VARCHAR(20)&#xa;     role_name : VARCHAR(50) [UQ]&#xa;     description : VARCHAR(255)" style="rounded=1;arcSize=10;fillColor=#ffffff;strokeColor=#1e40af;fontColor=#0f172a;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="40" y="76" width="220" height="65" as="geometry" />
        </mxCell>

        <!-- USERS -->
        <mxCell id="t_users_h" value="USERS" style="rounded=1;arcSize=10;fillColor=#1e40af;strokeColor=#1e40af;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="190" width="220" height="26" as="geometry" />
        </mxCell>
        <mxCell id="t_users_b" value="[PK] user_id : VARCHAR(36)&#xa;     username : VARCHAR(50) [UQ]&#xa;     password_hash : VARCHAR(255)&#xa;     full_name : VARCHAR(100)&#xa;     email : VARCHAR(100) [UQ]&#xa;[FK] role_id : VARCHAR(20)&#xa;     is_active : BOOLEAN&#xa;     created_at : TIMESTAMP" style="rounded=1;arcSize=10;fillColor=#ffffff;strokeColor=#1e40af;fontColor=#0f172a;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="40" y="216" width="220" height="145" as="geometry" />
        </mxCell>

        <!-- USER_PROFILES -->
        <mxCell id="t_prof_h" value="USER_PROFILES" style="rounded=1;arcSize=10;fillColor=#1e40af;strokeColor=#1e40af;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="420" width="220" height="26" as="geometry" />
        </mxCell>
        <mxCell id="t_prof_b" value="[PK] profile_id : VARCHAR(36)&#xa;[FK] user_id : VARCHAR(36) [UQ]&#xa;     target_band : VARCHAR(10)&#xa;     current_streak_days : INT&#xa;     total_study_minutes : INT&#xa;     last_active_at : TIMESTAMP" style="rounded=1;arcSize=10;fillColor=#ffffff;strokeColor=#1e40af;fontColor=#0f172a;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="40" y="446" width="220" height="115" as="geometry" />
        </mxCell>

        <!-- ================= COLUMN 2: Exam Bank ================= -->
        <!-- EXAMS -->
        <mxCell id="t_exams_h" value="EXAMS" style="rounded=1;arcSize=10;fillColor=#166534;strokeColor=#166534;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="340" y="50" width="240" height="26" as="geometry" />
        </mxCell>
        <mxCell id="t_exams_b" value="[PK] exam_id : VARCHAR(36)&#xa;     title : VARCHAR(255)&#xa;     exam_type : VARCHAR(30)&#xa;     duration_minutes : INT&#xa;     total_questions : INT&#xa;     is_published : BOOLEAN&#xa;[FK] created_by : VARCHAR(36)" style="rounded=1;arcSize=10;fillColor=#ffffff;strokeColor=#166534;fontColor=#0f172a;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="340" y="76" width="240" height="130" as="geometry" />
        </mxCell>

        <!-- SECTIONS -->
        <mxCell id="t_sec_h" value="SECTIONS" style="rounded=1;arcSize=10;fillColor=#166534;strokeColor=#166534;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="340" y="255" width="240" height="26" as="geometry" />
        </mxCell>
        <mxCell id="t_sec_b" value="[PK] section_id : VARCHAR(36)&#xa;[FK] exam_id : VARCHAR(36)&#xa;     skill_type : VARCHAR(20)&#xa;     section_order : INT&#xa;     duration_minutes : INT&#xa;     instructions : TEXT" style="rounded=1;arcSize=10;fillColor=#ffffff;strokeColor=#166534;fontColor=#0f172a;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="340" y="281" width="240" height="120" as="geometry" />
        </mxCell>

        <!-- QUESTIONS -->
        <mxCell id="t_q_h" value="QUESTIONS" style="rounded=1;arcSize=10;fillColor=#166534;strokeColor=#166534;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="340" y="450" width="240" height="26" as="geometry" />
        </mxCell>
        <mxCell id="t_q_b" value="[PK] question_id : VARCHAR(36)&#xa;[FK] section_id : VARCHAR(36)&#xa;     passage_text : TEXT&#xa;     audio_url : VARCHAR(255)&#xa;     question_text : TEXT&#xa;     question_type : VARCHAR(30)&#xa;     difficulty_cefr : VARCHAR(5)&#xa;     question_order : INT" style="rounded=1;arcSize=10;fillColor=#ffffff;strokeColor=#166534;fontColor=#0f172a;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="340" y="476" width="240" height="145" as="geometry" />
        </mxCell>

        <!-- QUESTION_OPTIONS -->
        <mxCell id="t_opt_h" value="QUESTION_OPTIONS" style="rounded=1;arcSize=10;fillColor=#166534;strokeColor=#166534;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="340" y="670" width="240" height="26" as="geometry" />
        </mxCell>
        <mxCell id="t_opt_b" value="[PK] option_id : VARCHAR(36)&#xa;[FK] question_id : VARCHAR(36)&#xa;     option_label : VARCHAR(5)&#xa;     option_text : TEXT&#xa;     is_correct : BOOLEAN&#xa;     explanation : TEXT" style="rounded=1;arcSize=10;fillColor=#ffffff;strokeColor=#166534;fontColor=#0f172a;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="340" y="696" width="240" height="115" as="geometry" />
        </mxCell>

        <!-- QUESTION_TAGS -->
        <mxCell id="t_tag_h" value="QUESTION_TAGS" style="rounded=1;arcSize=10;fillColor=#166534;strokeColor=#166534;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="340" y="870" width="240" height="26" as="geometry" />
        </mxCell>
        <mxCell id="t_tag_b" value="[PK] tag_id : VARCHAR(36)&#xa;[FK] question_id : VARCHAR(36)&#xa;     tag_name : VARCHAR(50)" style="rounded=1;arcSize=10;fillColor=#ffffff;strokeColor=#166534;fontColor=#0f172a;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="340" y="896" width="240" height="65" as="geometry" />
        </mxCell>

        <!-- ================= COLUMN 3: Submissions & AI ================= -->
        <!-- SUBMISSIONS -->
        <mxCell id="t_sub_h" value="SUBMISSIONS" style="rounded=1;arcSize=10;fillColor=#6b21a8;strokeColor=#6b21a8;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="660" y="50" width="250" height="26" as="geometry" />
        </mxCell>
        <mxCell id="t_sub_b" value="[PK] submission_id : VARCHAR(36)&#xa;[FK] user_id : VARCHAR(36)&#xa;[FK] exam_id : VARCHAR(36)&#xa;     start_time : TIMESTAMP&#xa;     submit_time : TIMESTAMP&#xa;     listening_score : DECIMAL(3,1)&#xa;     reading_score : DECIMAL(3,1)&#xa;     writing_score : DECIMAL(3,1)&#xa;     speaking_score : DECIMAL(3,1)&#xa;     final_score : DECIMAL(3,1)&#xa;     cefr_band : VARCHAR(10)&#xa;     status : VARCHAR(20)" style="rounded=1;arcSize=10;fillColor=#ffffff;strokeColor=#6b21a8;fontColor=#0f172a;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="660" y="76" width="250" height="205" as="geometry" />
        </mxCell>

        <!-- SUBMISSION_ANSWERS -->
        <mxCell id="t_ans_h" value="SUBMISSION_ANSWERS" style="rounded=1;arcSize=10;fillColor=#6b21a8;strokeColor=#6b21a8;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="660" y="340" width="250" height="26" as="geometry" />
        </mxCell>
        <mxCell id="t_ans_b" value="[PK] answer_id : VARCHAR(36)&#xa;[FK] submission_id : VARCHAR(36)&#xa;[FK] question_id : VARCHAR(36)&#xa;[FK] selected_option_id : VARCHAR(36)&#xa;     text_response : TEXT&#xa;     audio_response_url : VARCHAR(255)&#xa;     is_correct : BOOLEAN&#xa;     earned_score : DECIMAL(3,1)" style="rounded=1;arcSize=10;fillColor=#ffffff;strokeColor=#6b21a8;fontColor=#0f172a;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="660" y="366" width="250" height="150" as="geometry" />
        </mxCell>

        <!-- AI_EVALUATION_RESULTS -->
        <mxCell id="t_ai_h" value="AI_EVALUATION_RESULTS" style="rounded=1;arcSize=10;fillColor=#6b21a8;strokeColor=#6b21a8;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="660" y="570" width="250" height="26" as="geometry" />
        </mxCell>
        <mxCell id="t_ai_b" value="[PK] evaluation_id : VARCHAR(36)&#xa;[FK] answer_id : VARCHAR(36) [UQ]&#xa;     task_fulfillment : DECIMAL(3,1)&#xa;     organization : DECIMAL(3,1)&#xa;     lexical_resource : DECIMAL(3,1)&#xa;     grammar_accuracy : DECIMAL(3,1)&#xa;     task_score : DECIMAL(3,1)&#xa;     cefr_level : VARCHAR(10)&#xa;     grammar_errors_json : JSON&#xa;     suggested_revision : TEXT" style="rounded=1;arcSize=10;fillColor=#ffffff;strokeColor=#6b21a8;fontColor=#0f172a;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="660" y="596" width="250" height="175" as="geometry" />
        </mxCell>

        <!-- ================= COLUMN 4: Vocab & Imports ================= -->
        <!-- VOCABULARY -->
        <mxCell id="t_voc_h" value="VOCABULARY" style="rounded=1;arcSize=10;fillColor=#b45309;strokeColor=#b45309;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="980" y="50" width="240" height="26" as="geometry" />
        </mxCell>
        <mxCell id="t_voc_b" value="[PK] vocab_id : VARCHAR(36)&#xa;     word : VARCHAR(100) [UQ]&#xa;     phonetic : VARCHAR(100)&#xa;     part_of_speech : VARCHAR(20)&#xa;     cefr_level : VARCHAR(5)&#xa;     definition_vi : TEXT&#xa;     example_en : TEXT&#xa;     topic : VARCHAR(50)" style="rounded=1;arcSize=10;fillColor=#ffffff;strokeColor=#b45309;fontColor=#0f172a;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="980" y="76" width="240" height="145" as="geometry" />
        </mxCell>

        <!-- USER_VOCAB_PROGRESS -->
        <mxCell id="t_vprog_h" value="USER_VOCAB_PROGRESS" style="rounded=1;arcSize=10;fillColor=#b45309;strokeColor=#b45309;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="980" y="275" width="240" height="26" as="geometry" />
        </mxCell>
        <mxCell id="t_vprog_b" value="[PK] progress_id : VARCHAR(36)&#xa;[FK] user_id : VARCHAR(36)&#xa;[FK] vocab_id : VARCHAR(36)&#xa;     repetitions : INT&#xa;     ease_factor : DECIMAL(4,2)&#xa;     interval_days : INT&#xa;     next_review_date : DATE&#xa;     is_mastered : BOOLEAN" style="rounded=1;arcSize=10;fillColor=#ffffff;strokeColor=#b45309;fontColor=#0f172a;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="980" y="301" width="240" height="145" as="geometry" />
        </mxCell>

        <!-- CUSTOM_EXAM_IMPORTS -->
        <mxCell id="t_imp_h" value="CUSTOM_EXAM_IMPORTS" style="rounded=1;arcSize=10;fillColor=#b45309;strokeColor=#b45309;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="980" y="500" width="240" height="26" as="geometry" />
        </mxCell>
        <mxCell id="t_imp_b" value="[PK] import_id : VARCHAR(36)&#xa;[FK] user_id : VARCHAR(36)&#xa;     file_name : VARCHAR(255)&#xa;     file_type : VARCHAR(20)&#xa;     file_size_bytes : BIGINT&#xa;[FK] parsed_exam_id : VARCHAR(36)&#xa;     status : VARCHAR(20)&#xa;     recognized_questions : INT" style="rounded=1;arcSize=10;fillColor=#ffffff;strokeColor=#b45309;fontColor=#0f172a;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="980" y="526" width="240" height="145" as="geometry" />
        </mxCell>

        <!-- ================= RELATIONSHIP CONNECTORS ================= -->
        <mxCell id="erd_r_u" value="1 : N" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#1e40af;labelBackgroundColor=#ffffff;labelBorderColor=#cbd5e1;fontStyle=1;fontSize=10;" edge="1" parent="1" source="t_roles_b" target="t_users_h"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="erd_u_prof" value="1 : 1" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#1e40af;labelBackgroundColor=#ffffff;labelBorderColor=#cbd5e1;fontStyle=1;fontSize=10;" edge="1" parent="1" source="t_users_b" target="t_prof_h"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="erd_e_sec" value="1 : N" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#166534;labelBackgroundColor=#ffffff;labelBorderColor=#cbd5e1;fontStyle=1;fontSize=10;" edge="1" parent="1" source="t_exams_b" target="t_sec_h"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="erd_sec_q" value="1 : N" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#166534;labelBackgroundColor=#ffffff;labelBorderColor=#cbd5e1;fontStyle=1;fontSize=10;" edge="1" parent="1" source="t_sec_b" target="t_q_h"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="erd_q_opt" value="1 : N" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#166534;labelBackgroundColor=#ffffff;labelBorderColor=#cbd5e1;fontStyle=1;fontSize=10;" edge="1" parent="1" source="t_q_b" target="t_opt_h"><mxGeometry relative="1" as="geometry" /></mxCell>
        
        <!-- Question -> Question Tags (Routes around Question Options cleanly on the right) -->
        <mxCell id="erd_q_tag" value="1 : N" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#166534;labelBackgroundColor=#ffffff;labelBorderColor=#cbd5e1;fontStyle=1;fontSize=10;exitX=1;exitY=0.8;entryX=1;entryY=0.5;" edge="1" parent="1" source="t_q_b" target="t_tag_h">
          <mxGeometry relative="1" as="geometry">
            <Array as="points"><mxPoint x="610" y="592"/><mxPoint x="610" y="883"/></Array>
          </mxGeometry>
        </mxCell>
        
        <!-- Cross Column Connectors with Clean Waypoints -->
        <mxCell id="erd_u_sub" value="1 : N" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#1e40af;labelBackgroundColor=#ffffff;labelBorderColor=#cbd5e1;fontStyle=1;fontSize=10;" edge="1" parent="1" source="t_users_b" target="t_sub_h">
          <mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="290" y="270"/><mxPoint x="290" y="35"/><mxPoint x="785" y="35"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="erd_e_sub" value="1 : N" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#166534;labelBackgroundColor=#ffffff;labelBorderColor=#cbd5e1;fontStyle=1;fontSize=10;" edge="1" parent="1" source="t_exams_b" target="t_sub_h"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="erd_sub_ans" value="1 : N" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#6b21a8;labelBackgroundColor=#ffffff;labelBorderColor=#cbd5e1;fontStyle=1;fontSize=10;" edge="1" parent="1" source="t_sub_b" target="t_ans_h"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="erd_ans_ai" value="1 : 1" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#6b21a8;labelBackgroundColor=#ffffff;labelBorderColor=#cbd5e1;fontStyle=1;fontSize=10;" edge="1" parent="1" source="t_ans_b" target="t_ai_h"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="erd_voc_prog" value="1 : N" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#b45309;labelBackgroundColor=#ffffff;labelBorderColor=#cbd5e1;fontStyle=1;fontSize=10;" edge="1" parent="1" source="t_voc_b" target="t_vprog_h"><mxGeometry relative="1" as="geometry" /></mxCell>"""
    save_diagram("06_database_erd.drawio", "06_Database_ERD_14_Tables", xml)
    return xml
