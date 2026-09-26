import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

DRAWIO_DIR = os.path.abspath('diagrams/drawio')
os.makedirs(DRAWIO_DIR, exist_ok=True)

def wrap_drawio(content, name="Diagram"):
    return f'''<mxfile host="app.diagrams.net" modified="2026-09-09T16:00:00.000Z" agent="5.0" version="21.6.8" type="device">
  <diagram id="{name}" name="{name}">
    <mxGraphModel dx="1422" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
{content}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>'''

# ==============================================================================
# 1. USE CASE DIAGRAM
# ==============================================================================
def get_use_case_xml():
    return '''        <!-- System Boundary -->
        <mxCell id="bound" value="HỆ THỐNG LUYỆN THI VSTEP MASTER" style="swimlane;whiteSpace=wrap;html=1;fontStyle=1;startSize=30;horizontal=1;container=1;fillColor=#f8fafc;strokeColor=#64748b;strokeWidth=2;fontSize=14;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="220" y="40" width="680" height="740" as="geometry" />
        </mxCell>
        
        <!-- Actors -->
        <mxCell id="act_student" value="Học viên&#xa;(Student / User)" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="60" y="340" width="60" height="100" as="geometry" />
        </mxCell>
        <mxCell id="act_admin" value="Quản trị viên&#xa;(Admin)" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#ffe6cc;strokeColor=#d79b00;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="980" y="160" width="60" height="100" as="geometry" />
        </mxCell>
        <mxCell id="act_ai" value="&lt;b&gt;AI Engine&lt;/b&gt;&#xa;(External Service)" style="shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;darkOpacity2=0.1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=12;fontColor=#4c1d95;" vertex="1" parent="1">
          <mxGeometry x="960" y="480" width="100" height="80" as="geometry" />
        </mxCell>

        <!-- Use Cases Inside Boundary -->
        <mxCell id="uc_auth" value="UC-01: Đăng nhập &amp; Đăng ký" style="ellipse;whiteSpace=wrap;html=1;fillColor=#e0f2fe;strokeColor=#0284c7;fontStyle=1;fontSize=11;" vertex="1" parent="bound">
          <mxGeometry x="60" y="50" width="190" height="55" as="geometry" />
        </mxCell>
        <mxCell id="uc_listen" value="UC-02: Luyện tập Listening" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#475569;fontSize=11;" vertex="1" parent="bound">
          <mxGeometry x="60" y="130" width="190" height="50" as="geometry" />
        </mxCell>
        <mxCell id="uc_read" value="UC-03: Luyện tập Reading" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#475569;fontSize=11;" vertex="1" parent="bound">
          <mxGeometry x="60" y="210" width="190" height="50" as="geometry" />
        </mxCell>
        <mxCell id="uc_write" value="UC-04: Luyện tập Writing" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f3e8ff;strokeColor=#9333ea;fontStyle=1;fontSize=11;" vertex="1" parent="bound">
          <mxGeometry x="60" y="290" width="190" height="55" as="geometry" />
        </mxCell>
        <mxCell id="uc_speak" value="UC-05: Luyện tập Speaking" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#475569;fontSize=11;" vertex="1" parent="bound">
          <mxGeometry x="60" y="375" width="190" height="50" as="geometry" />
        </mxCell>
        <mxCell id="uc_mock" value="UC-06: Thi thử Mock Test 180p" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#dc2626;fontStyle=1;fontSize=11;" vertex="1" parent="bound">
          <mxGeometry x="60" y="455" width="200" height="55" as="geometry" />
        </mxCell>
        <mxCell id="uc_cust" value="UC-07: Bóc tách đề Word/PDF" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#475569;fontSize=11;" vertex="1" parent="bound">
          <mxGeometry x="60" y="540" width="190" height="50" as="geometry" />
        </mxCell>
        <mxCell id="uc_vocab" value="UC-08: Flashcards &amp; Từ vựng" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#475569;fontSize=11;" vertex="1" parent="bound">
          <mxGeometry x="60" y="620" width="190" height="50" as="geometry" />
        </mxCell>

        <!-- Right Hand Use Cases -->
        <mxCell id="uc_ai_score" value="&lt;b&gt;AI Chấm điểm Tự luận&lt;/b&gt;&#xa;(CEFR Rubric Scoring)" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ede9fe;strokeColor=#7c3aed;strokeWidth=2;fontStyle=1;fontSize=12;fontColor=#5b21b6;" vertex="1" parent="bound">
          <mxGeometry x="410" y="370" width="210" height="70" as="geometry" />
        </mxCell>
        <mxCell id="uc_dict" value="Tra cứu từ điển CEFR" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontSize=11;" vertex="1" parent="bound">
          <mxGeometry x="420" y="210" width="180" height="50" as="geometry" />
        </mxCell>
        <mxCell id="uc_manage_exam" value="Quản lý Ngân hàng Đề thi" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontSize=11;" vertex="1" parent="bound">
          <mxGeometry x="420" y="70" width="190" height="50" as="geometry" />
        </mxCell>
        <mxCell id="uc_manage_user" value="Quản lý Người dùng &amp; Kết quả" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontSize=11;" vertex="1" parent="bound">
          <mxGeometry x="420" y="140" width="190" height="50" as="geometry" />
        </mxCell>

        <!-- Student Connections -->
        <mxCell id="e1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=none;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1" source="act_student" target="uc_auth"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=none;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1" source="act_student" target="uc_listen"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e3" style="edgeStyle=straightEdgeStyle;html=1;endArrow=none;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1" source="act_student" target="uc_read"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e4" style="edgeStyle=straightEdgeStyle;html=1;endArrow=none;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1" source="act_student" target="uc_write"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e5" style="edgeStyle=straightEdgeStyle;html=1;endArrow=none;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1" source="act_student" target="uc_speak"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e6" style="edgeStyle=straightEdgeStyle;html=1;endArrow=none;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1" source="act_student" target="uc_mock"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e7" style="edgeStyle=straightEdgeStyle;html=1;endArrow=none;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1" source="act_student" target="uc_cust"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e8" style="edgeStyle=straightEdgeStyle;html=1;endArrow=none;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1" source="act_student" target="uc_vocab"><mxGeometry relative="1" as="geometry" /></mxCell>

        <!-- Admin Connections -->
        <mxCell id="e9" style="edgeStyle=straightEdgeStyle;html=1;endArrow=none;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1" source="act_admin" target="uc_auth"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e10" style="edgeStyle=straightEdgeStyle;html=1;endArrow=none;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1" source="act_admin" target="uc_manage_exam"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e11" style="edgeStyle=straightEdgeStyle;html=1;endArrow=none;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1" source="act_admin" target="uc_manage_user"><mxGeometry relative="1" as="geometry" /></mxCell>

        <!-- AI Engine Connection -->
        <mxCell id="e12" style="edgeStyle=straightEdgeStyle;html=1;endArrow=none;strokeWidth=2;strokeColor=#7c3aed;" edge="1" parent="1" source="act_ai" target="uc_ai_score"><mxGeometry relative="1" as="geometry" /></mxCell>

        <!-- Include Relationships -->
        <mxCell id="inc1" value="&amp;lt;&amp;lt;include&amp;gt;&amp;gt;" style="edgeStyle=orthogonalEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#7c3aed;fontColor=#7c3aed;fontStyle=1;fontSize=10;" edge="1" parent="bound" source="uc_write" target="uc_ai_score"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="inc2" value="&amp;lt;&amp;lt;include&amp;gt;&amp;gt;" style="edgeStyle=orthogonalEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#7c3aed;fontColor=#7c3aed;fontStyle=1;fontSize=10;" edge="1" parent="bound" source="uc_mock" target="uc_ai_score"><mxGeometry relative="1" as="geometry" /></mxCell>

        <!-- Extend Relationship -->
        <mxCell id="ext1" value="&amp;lt;&amp;lt;extend&amp;gt;&amp;gt;" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;fontColor=#16a34a;fontStyle=1;fontSize=10;" edge="1" parent="bound" source="uc_dict" target="uc_read"><mxGeometry relative="1" as="geometry" /></mxCell>'''

# ==============================================================================
# 2. ACTIVITY DIAGRAM
# ==============================================================================
def get_activity_xml():
    return '''        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="460" y="30" width="30" height="30" as="geometry" />
        </mxCell>
        <mxCell id="act_init" value="Học viên bấm Bắt đầu thi thử&#xa;(Khởi tạo Test Session)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="385" y="90" width="180" height="50" as="geometry" />
        </mxCell>
        <mxCell id="fork1" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="350" y="170" width="250" height="8" as="geometry" />
        </mxCell>

        <!-- Branch 1: Timer -->
        <mxCell id="act_timer" value="Đồng hồ đếm ngược 180:00&#xa;(Chạy nền, kiểm tra chu kỳ 1s)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef2f2;strokeColor=#ef4444;fontColor=#991b1b;" vertex="1" parent="1">
          <mxGeometry x="240" y="210" width="190" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act_timer_check" value="Thời gian = 00:00 ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;" vertex="1" parent="1">
          <mxGeometry x="270" y="300" width="130" height="60" as="geometry" />
        </mxCell>

        <!-- Branch 2: Doing Exam -->
        <mxCell id="act_doing" value="Thí sinh làm bài 4 kỹ năng&#xa;(Tự động lưu tạm Local Storage)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f0fdf4;strokeColor=#22c55e;fontColor=#166534;" vertex="1" parent="1">
          <mxGeometry x="520" y="210" width="190" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act_submit_click" value="Thí sinh bấm 'Nộp bài' ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#22c55e;" vertex="1" parent="1">
          <mxGeometry x="550" y="300" width="130" height="60" as="geometry" />
        </mxCell>

        <!-- Join Bar -->
        <mxCell id="join1" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="350" y="400" width="250" height="8" as="geometry" />
        </mxCell>

        <mxCell id="act_lock" value="&lt;b&gt;Khóa giao diện làm bài&lt;/b&gt;&#xa;(Trạng thái SUBMITTED)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff1f2;strokeColor=#f43f5e;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="385" y="440" width="180" height="50" as="geometry" />
        </mxCell>

        <!-- Split Branch Grading -->
        <mxCell id="fork2" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="350" y="520" width="250" height="8" as="geometry" />
        </mxCell>
        <mxCell id="act_score_obj" value="Chấm trắc nghiệm (Nghe/Đọc)&#xa;Đối chiếu Answer Key (&lt;50ms)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#3b82f6;fontColor=#1e40af;" vertex="1" parent="1">
          <mxGeometry x="220" y="560" width="200" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act_score_ai" value="Gửi bài tự luận (Viết) sang AI&#xa;Phân tích theo Rubric CEFR (2-4s)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#faf5ff;strokeColor=#a855f7;fontColor=#6b21a8;" vertex="1" parent="1">
          <mxGeometry x="530" y="560" width="200" height="60" as="geometry" />
        </mxCell>
        <mxCell id="join2" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="350" y="650" width="250" height="8" as="geometry" />
        </mxCell>

        <mxCell id="act_finalize" value="Tổng hợp điểm TB 4 kỹ năng&#xa;Xác định bậc CEFR (B1, B2, C1)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="385" y="685" width="180" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_display" value="Hiển thị Bảng điểm điện tử &amp; Lưu CSDL" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;" vertex="1" parent="1">
          <mxGeometry x="370" y="760" width="210" height="50" as="geometry" />
        </mxCell>
        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="460" y="840" width="30" height="30" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="ae1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="act_init"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_init" target="fork1"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae3" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="fork1" target="act_timer"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae4" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="fork1" target="act_doing"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae5" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_timer" target="act_timer_check"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae6" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_doing" target="act_submit_click"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae7" value="Hết giờ" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;" edge="1" parent="1" source="act_timer_check" target="join1"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae8" value="Đồng ý nộp" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;" edge="1" parent="1" source="act_submit_click" target="join1"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae9" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="join1" target="act_lock"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae10" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_lock" target="fork2"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae11" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="fork2" target="act_score_obj"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae12" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="fork2" target="act_score_ai"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae13" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_score_obj" target="join2"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae14" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_score_ai" target="join2"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae15" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="join2" target="act_finalize"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae16" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_finalize" target="act_display"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae17" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_display" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''

# ==============================================================================
# 3. SEQUENCE DIAGRAM
# ==============================================================================
def get_sequence_xml():
    return '''        <!-- Lifelines -->
        <mxCell id="ll_cand" value="Học viên&#xa;(Candidate)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="50" y="40" width="100" height="700" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="Giao diện Viết&#xa;(WritingUI)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f8fafc;strokeColor=#64748b;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="220" y="40" width="110" height="700" as="geometry" />
        </mxCell>
        <mxCell id="ll_service" value="AIScoringService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#ede9fe;strokeColor=#7c3aed;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="390" y="40" width="120" height="700" as="geometry" />
        </mxCell>
        <mxCell id="ll_adapter" value="AIAdapter&#xa;(Infrastructure)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#ede9fe;strokeColor=#7c3aed;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="570" y="40" width="110" height="700" as="geometry" />
        </mxCell>
        <mxCell id="ll_ai" value="AI Engine API&#xa;(Gemini Service)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fae8ff;strokeColor=#c026d3;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="740" y="40" width="120" height="700" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#e0f2fe;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="920" y="40" width="110" height="700" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: submitEssay(content, promptId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="110" as="sourcePoint"/><mxPoint x="275" y="110" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: validateWordCount(content)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="140" as="sourcePoint"/><mxPoint x="275" y="170" as="targetPoint"/><Array as="points"><mxPoint x="310" y="140"/><mxPoint x="310" y="170"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: requestEvaluation(payload)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="200" as="sourcePoint"/><mxPoint x="450" y="200" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: generateEvaluation(prompt, essay)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="450" y="240" as="sourcePoint"/><mxPoint x="625" y="240" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m5" value="5: POST /analyze (Rubric VSTEP)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=2;strokeColor=#c026d3;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="625" y="290" as="sourcePoint"/><mxPoint x="800" y="290" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m6" value="6: Return Raw JSON Result" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#c026d3;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="800" y="370" as="sourcePoint"/><mxPoint x="625" y="370" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m7" value="7: parseAndValidate(json)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="625" y="400" as="sourcePoint"/><mxPoint x="625" y="430" as="targetPoint"/><Array as="points"><mxPoint x="660" y="400"/><mxPoint x="660" y="430"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m8" value="8: Return AIEvaluationDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="625" y="460" as="sourcePoint"/><mxPoint x="450" y="460" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: saveResult(submissionId, result)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#0284c7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="450" y="500" as="sourcePoint"/><mxPoint x="975" y="500" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m10" value="10: Confirm Save OK" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#0284c7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="975" y="540" as="sourcePoint"/><mxPoint x="450" y="540" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m11" value="11: return ScoreCardDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="450" y="580" as="sourcePoint"/><mxPoint x="275" y="580" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m12" value="12: Render Score Card, Errors &amp; Model Sample" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="630" as="sourcePoint"/><mxPoint x="100" y="630" as="targetPoint"/></mxGeometry>
        </mxCell>'''

# ==============================================================================
# 4. STATE MACHINE DIAGRAM
# ==============================================================================
def get_state_machine_xml():
    return '''        <mxCell id="st_init" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="80" y="240" width="30" height="30" as="geometry" />
        </mxCell>
        
        <mxCell id="st_not_started" value="&lt;b&gt;NOT_STARTED&lt;/b&gt;&#xa;Đề thi đã sẵn sàng&#xa;Chờ thí sinh nhấn bắt đầu" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#64748b;" vertex="1" parent="1">
          <mxGeometry x="170" y="220" width="160" height="70" as="geometry" />
        </mxCell>
        
        <mxCell id="st_in_progress" value="&lt;b&gt;IN_PROGRESS&lt;/b&gt;&#xa;Đang làm bài thi&#xa;Timer đếm ngược chạy&#xa;--&#xa;sub: AUTO_SAVING (LocalStorage)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#3b82f6;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="400" y="210" width="190" height="90" as="geometry" />
        </mxCell>

        <mxCell id="st_submitted" value="&lt;b&gt;SUBMITTED&lt;/b&gt;&#xa;Khóa đề thi tức thì&#xa;Ngăn chặn sửa bài" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef2f2;strokeColor=#ef4444;" vertex="1" parent="1">
          <mxGeometry x="660" y="220" width="150" height="70" as="geometry" />
        </mxCell>

        <mxCell id="st_obj_scored" value="&lt;b&gt;OBJECTIVE_SCORED&lt;/b&gt;&#xa;Có điểm trắc nghiệm&#xa;(&lt;50ms qua Answer Key)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ecfdf5;strokeColor=#10b981;" vertex="1" parent="1">
          <mxGeometry x="870" y="220" width="170" height="70" as="geometry" />
        </mxCell>

        <mxCell id="st_ai_eval" value="&lt;b&gt;AI_EVALUATING&lt;/b&gt;&#xa;AI Engine đang chấm&#xa;bài viết luận theo Rubric" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#faf5ff;strokeColor=#a855f7;" vertex="1" parent="1">
          <mxGeometry x="870" y="370" width="170" height="70" as="geometry" />
        </mxCell>

        <mxCell id="st_completed" value="&lt;b&gt;COMPLETED&lt;/b&gt;&#xa;Hoàn tất điểm 4 kỹ năng&#xa;Xếp bậc B1, B2, C1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;strokeWidth=2;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="580" y="370" width="170" height="70" as="geometry" />
        </mxCell>

        <mxCell id="st_archived" value="&lt;b&gt;ARCHIVED&lt;/b&gt;&#xa;Đóng băng lịch sử bài thi&#xa;Lưu trữ vĩnh viễn CSDL" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#475569;" vertex="1" parent="1">
          <mxGeometry x="320" y="370" width="160" height="70" as="geometry" />
        </mxCell>

        <mxCell id="st_end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="190" y="390" width="30" height="30" as="geometry" />
        </mxCell>

        <!-- Transitions -->
        <mxCell id="t1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="st_init" target="st_not_started"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="t2" value="Bắt đầu thi" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;fontStyle=1;" edge="1" parent="1" source="st_not_started" target="st_in_progress"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="t3" value="Nộp bài / Timeout" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;fontStyle=1;fontColor=#dc2626;" edge="1" parent="1" source="st_in_progress" target="st_submitted"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="t4" value="Chấm trắc nghiệm" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="st_submitted" target="st_obj_scored"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="t5" value="Gửi bài Viết" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#7c3aed;" edge="1" parent="1" source="st_obj_scored" target="st_ai_eval"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="t6" value="AI chấm xong" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;fontStyle=1;fontColor=#16a34a;" edge="1" parent="1" source="st_ai_eval" target="st_completed"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="t7" value="Rời phòng thi" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="st_completed" target="st_archived"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="t8" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="st_archived" target="st_end"><mxGeometry relative="1" as="geometry" /></mxCell>'''

# ==============================================================================
# 5. CLASS DIAGRAM (Clean Architecture)
# ==============================================================================
def get_class_diagram_xml():
    return '''        <!-- Clean Architecture Layers -->
        <mxCell id="layer_pres" value="1. PRESENTATION LAYER" style="swimlane;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#cbd5e1;startSize=26;fontStyle=1;fontSize=12;fontColor=#334155;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="1080" height="150" as="geometry" />
        </mxCell>
        <mxCell id="c_ui_exam" value="ExamPage&#xa;--&#xa;+ state: ExamState&#xa;+ timer: Int&#xa;--&#xa;+ handleAnswerSelect()&#xa;+ handleSubmit()" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#ffffff;strokeColor=#94a3b8;" vertex="1" parent="layer_pres">
          <mxGeometry x="50" y="40" width="190" height="95" as="geometry" />
        </mxCell>
        <mxCell id="c_ui_writing" value="WritingPage&#xa;--&#xa;+ wordCount: Int&#xa;+ isScoring: Boolean&#xa;--&#xa;+ handleAISubmit()&#xa;+ renderScoreCard()" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#ffffff;strokeColor=#94a3b8;" vertex="1" parent="layer_pres">
          <mxGeometry x="320" y="40" width="190" height="95" as="geometry" />
        </mxCell>
        <mxCell id="c_ui_timer" value="&lt;b&gt;ExamTimer (Observer)&lt;/b&gt;&#xa;--&#xa;- listeners: Function[]&#xa;--&#xa;+ subscribe(fn)&#xa;+ tick()&#xa;+ onTimeout()" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#ffffff;strokeColor=#94a3b8;" vertex="1" parent="layer_pres">
          <mxGeometry x="600" y="40" width="200" height="95" as="geometry" />
        </mxCell>

        <mxCell id="layer_app" value="2. APPLICATION LAYER" style="swimlane;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#93c5fd;startSize=26;fontStyle=1;fontSize=12;fontColor=#1e40af;" vertex="1" parent="1">
          <mxGeometry x="40" y="210" width="1080" height="230" as="geometry" />
        </mxCell>
        <mxCell id="c_exam_service" value="&lt;b&gt;ExamService&lt;/b&gt;&#xa;--&#xa;- scoringCtx: ScoringContext&#xa;- repo: IExamRepository&#xa;--&#xa;+ startSession(examId)&#xa;+ submit(submissionId)&#xa;+ evaluateAI(submissionId)" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#ffffff;strokeColor=#3b82f6;" vertex="1" parent="layer_app">
          <mxGeometry x="50" y="45" width="230" height="110" as="geometry" />
        </mxCell>
        <mxCell id="c_builder" value="&lt;b&gt;VstepExamBuilder (Builder)&lt;/b&gt;&#xa;--&#xa;- exam: Exam&#xa;--&#xa;+ addListeningSection()&#xa;+ addReadingSection()&#xa;+ addWritingSection()&#xa;+ build(): Exam" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#ffffff;strokeColor=#3b82f6;" vertex="1" parent="layer_app">
          <mxGeometry x="340" y="45" width="230" height="120" as="geometry" />
        </mxCell>
        <mxCell id="c_scoring_ctx" value="&lt;b&gt;ScoringContext&lt;/b&gt;&#xa;--&#xa;- strategy: IScoringStrategy&#xa;--&#xa;+ setStrategy(strat)&#xa;+ executeScoring(data)" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#ffffff;strokeColor=#3b82f6;" vertex="1" parent="layer_app">
          <mxGeometry x="640" y="45" width="220" height="95" as="geometry" />
        </mxCell>

        <mxCell id="layer_dom" value="3. DOMAIN LAYER (Business Core &amp; Strategy DIP)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#f5f3ff;strokeColor=#c4b5fd;startSize=26;fontStyle=1;fontSize=12;fontColor=#5b21b6;" vertex="1" parent="1">
          <mxGeometry x="40" y="460" width="1080" height="230" as="geometry" />
        </mxCell>
        <mxCell id="c_strat_interface" value="&lt;b&gt;&amp;lt;&amp;lt;interface&amp;gt;&amp;gt;&lt;/b&gt;&#xa;&lt;b&gt;IScoringStrategy&lt;/b&gt;&#xa;--&#xa;+ calculateScore(data): ScoringResult" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=30;fillColor=#ede9fe;strokeColor=#7c3aed;fontColor=#5b21b6;" vertex="1" parent="layer_dom">
          <mxGeometry x="420" y="40" width="240" height="60" as="geometry" />
        </mxCell>
        <mxCell id="c_obj_strat" value="&lt;b&gt;ObjectiveScoringStrategy&lt;/b&gt;&#xa;--&#xa;+ calculateScore(data)" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#ffffff;strokeColor=#7c3aed;" vertex="1" parent="layer_dom">
          <mxGeometry x="270" y="140" width="220" height="65" as="geometry" />
        </mxCell>
        <mxCell id="c_ai_strat" value="&lt;b&gt;AIScoringStrategy&lt;/b&gt;&#xa;--&#xa;- aiEvaluator: IAIEvaluator&#xa;--&#xa;+ calculateScore(data)" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#ffffff;strokeColor=#7c3aed;" vertex="1" parent="layer_dom">
          <mxGeometry x="580" y="140" width="230" height="75" as="geometry" />
        </mxCell>

        <mxCell id="layer_infra" value="4. INFRASTRUCTURE LAYER (Adapter Pattern)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#ecfdf5;strokeColor=#a7f3d0;startSize=26;fontStyle=1;fontSize=12;fontColor=#065f46;" vertex="1" parent="1">
          <mxGeometry x="40" y="710" width="1080" height="150" as="geometry" />
        </mxCell>
        <mxCell id="c_eval_interface" value="&lt;b&gt;&amp;lt;&amp;lt;interface&amp;gt;&amp;gt;&lt;/b&gt;&#xa;&lt;b&gt;IAIEvaluator&lt;/b&gt;&#xa;--&#xa;+ evaluateEssay(prompt, essay): DTO" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=30;fillColor=#dcfce7;strokeColor=#16a34a;fontColor=#14532d;" vertex="1" parent="layer_infra">
          <mxGeometry x="270" y="45" width="250" height="65" as="geometry" />
        </mxCell>
        <mxCell id="c_ai_adapter" value="&lt;b&gt;AIAdapter (Adapter)&lt;/b&gt;&#xa;--&#xa;- endpointUrl: String&#xa;--&#xa;+ evaluateEssay(prompt, essay): DTO&#xa;- transformResponse(rawJson)" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#ffffff;strokeColor=#16a34a;" vertex="1" parent="layer_infra">
          <mxGeometry x="610" y="40" width="260" height="90" as="geometry" />
        </mxCell>

        <!-- OOP Connections -->
        <mxCell id="rel1" style="edgeStyle=orthogonalEdgeStyle;dashed=1;html=1;endArrow=block;endFill=0;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1" source="c_obj_strat" target="c_strat_interface"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="rel2" style="edgeStyle=orthogonalEdgeStyle;dashed=1;html=1;endArrow=block;endFill=0;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1" source="c_ai_strat" target="c_strat_interface"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="rel3" style="edgeStyle=orthogonalEdgeStyle;dashed=1;html=1;endArrow=block;endFill=0;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1" source="c_ai_adapter" target="c_eval_interface"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="rel4" style="edgeStyle=straightEdgeStyle;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#3b82f6;" edge="1" parent="1" source="c_scoring_ctx" target="c_strat_interface"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="rel5" style="edgeStyle=straightEdgeStyle;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1" source="c_ai_strat" target="c_eval_interface"><mxGeometry relative="1" as="geometry" /></mxCell>'''

# ==============================================================================
# 6. DATABASE ERD
# ==============================================================================
def get_database_erd_xml():
    return '''        <!-- Tables -->
        <mxCell id="t_roles" value="&lt;b&gt;ROLES&lt;/b&gt;&#xa;--&#xa;&lt;b&gt;PK&lt;/b&gt; role_id : VARCHAR(36)&#xa;   role_name : VARCHAR(20) [UQ]&#xa;   description : VARCHAR(255)" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#fef3c7;strokeColor=#d97706;fontColor=#92400e;" vertex="1" parent="1">
          <mxGeometry x="50" y="40" width="220" height="90" as="geometry" />
        </mxCell>

        <mxCell id="t_users" value="&lt;b&gt;USERS&lt;/b&gt;&#xa;--&#xa;&lt;b&gt;PK&lt;/b&gt; user_id : VARCHAR(36)&#xa;   username : VARCHAR(50) [UQ]&#xa;   password_hash : VARCHAR(255)&#xa;   full_name : VARCHAR(100)&#xa;   email : VARCHAR(100)&#xa;&lt;b&gt;FK&lt;/b&gt; role_id : VARCHAR(36)&#xa;   created_at : TIMESTAMP" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#e0f2fe;strokeColor=#0284c7;fontColor=#075985;" vertex="1" parent="1">
          <mxGeometry x="50" y="210" width="220" height="150" as="geometry" />
        </mxCell>

        <mxCell id="t_submissions" value="&lt;b&gt;SUBMISSIONS&lt;/b&gt;&#xa;--&#xa;&lt;b&gt;PK&lt;/b&gt; submission_id : VARCHAR(36)&#xa;&lt;b&gt;FK&lt;/b&gt; user_id : VARCHAR(36)&#xa;&lt;b&gt;FK&lt;/b&gt; exam_id : VARCHAR(36)&#xa;   objective_score : DECIMAL(3,1)&#xa;   ai_score : DECIMAL(3,1)&#xa;   final_score : DECIMAL(3,1)&#xa;   cefr_band : VARCHAR(10)&#xa;   status : VARCHAR(20)&#xa;   submitted_at : TIMESTAMP" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#fce7f3;strokeColor=#db2777;fontColor=#9d174d;" vertex="1" parent="1">
          <mxGeometry x="380" y="210" width="240" height="175" as="geometry" />
        </mxCell>

        <mxCell id="t_ai_eval" value="&lt;b&gt;AI_EVALUATION_RESULTS&lt;/b&gt;&#xa;--&#xa;&lt;b&gt;PK&lt;/b&gt; evaluation_id : VARCHAR(36)&#xa;&lt;b&gt;FK&lt;/b&gt; submission_id : VARCHAR(36) [UQ]&#xa;   task_fulfillment : DECIMAL(3,1)&#xa;   organization : DECIMAL(3,1)&#xa;   lexical_resource : DECIMAL(3,1)&#xa;   grammar_accuracy : DECIMAL(3,1)&#xa;   grammar_errors_json : JSON&#xa;   improved_sample : TEXT" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#f5f3ff;strokeColor=#7c3aed;fontColor=#5b21b6;" vertex="1" parent="1">
          <mxGeometry x="380" y="470" width="250" height="160" as="geometry" />
        </mxCell>

        <mxCell id="t_exams" value="&lt;b&gt;EXAMS&lt;/b&gt;&#xa;--&#xa;&lt;b&gt;PK&lt;/b&gt; exam_id : VARCHAR(36)&#xa;   title : VARCHAR(255)&#xa;   exam_type : VARCHAR(20)&#xa;   duration_minutes : INT&#xa;   is_published : BOOLEAN&#xa;&lt;b&gt;FK&lt;/b&gt; created_by : VARCHAR(36)" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#fef9c3;strokeColor=#ca8a04;fontColor=#854d0e;" vertex="1" parent="1">
          <mxGeometry x="720" y="40" width="230" height="135" as="geometry" />
        </mxCell>

        <mxCell id="t_sections" value="&lt;b&gt;SECTIONS&lt;/b&gt;&#xa;--&#xa;&lt;b&gt;PK&lt;/b&gt; section_id : VARCHAR(36)&#xa;&lt;b&gt;FK&lt;/b&gt; exam_id : VARCHAR(36)&#xa;   skill_type : VARCHAR(20)&#xa;   section_order : INT&#xa;   duration_minutes : INT&#xa;   instructions : TEXT" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#f1f5f9;strokeColor=#475569;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="720" y="240" width="230" height="135" as="geometry" />
        </mxCell>

        <mxCell id="t_questions" value="&lt;b&gt;QUESTIONS&lt;/b&gt;&#xa;--&#xa;&lt;b&gt;PK&lt;/b&gt; question_id : VARCHAR(36)&#xa;&lt;b&gt;FK&lt;/b&gt; section_id : VARCHAR(36)&#xa;   passage_text : TEXT&#xa;   audio_url : VARCHAR(255)&#xa;   question_text : TEXT&#xa;   question_type : VARCHAR(20)&#xa;   question_order : INT" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#f1f5f9;strokeColor=#475569;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="720" y="435" width="230" height="150" as="geometry" />
        </mxCell>

        <mxCell id="t_options" value="&lt;b&gt;QUESTION_OPTIONS&lt;/b&gt;&#xa;--&#xa;&lt;b&gt;PK&lt;/b&gt; option_id : VARCHAR(36)&#xa;&lt;b&gt;FK&lt;/b&gt; question_id : VARCHAR(36)&#xa;   option_label : VARCHAR(2)&#xa;   option_text : TEXT&#xa;   is_correct : BOOLEAN" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#ecfdf5;strokeColor=#059669;fontColor=#065f46;" vertex="1" parent="1">
          <mxGeometry x="720" y="640" width="230" height="120" as="geometry" />
        </mxCell>

        <!-- Relationships -->
        <mxCell id="rel_r_u" value="1 : N" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#0284c7;" edge="1" parent="1" source="t_roles" target="t_users"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="rel_u_s" value="1 : N" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#db2777;" edge="1" parent="1" source="t_users" target="t_submissions"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="rel_s_ai" value="1 : 1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=2;strokeColor=#7c3aed;" edge="1" parent="1" source="t_submissions" target="t_ai_eval"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="rel_e_s" value="1 : N" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#db2777;" edge="1" parent="1" source="t_exams" target="t_submissions"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="rel_e_sec" value="1 : N" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#ca8a04;" edge="1" parent="1" source="t_exams" target="t_sections"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="rel_sec_q" value="1 : N" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#475569;" edge="1" parent="1" source="t_sections" target="t_questions"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="rel_q_opt" value="1 : N" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#059669;" edge="1" parent="1" source="t_questions" target="t_options"><mxGeometry relative="1" as="geometry" /></mxCell>'''

diagrams = [
    ("01_use_case_diagram.drawio", "01_Use_Case", get_use_case_xml),
    ("02_activity_flow_mock_test.drawio", "02_Activity_Flow", get_activity_xml),
    ("03_sequence_ai_scoring.drawio", "03_Sequence_AI_Scoring", get_sequence_xml),
    ("04_state_machine_exam.drawio", "04_State_Machine", get_state_machine_xml),
    ("05_class_diagram_architecture.drawio", "05_Class_Diagram", get_class_diagram_xml),
    ("06_database_erd.drawio", "06_Database_ERD", get_database_erd_xml)
]

for filename, name, func in diagrams:
    filepath = os.path.join(DRAWIO_DIR, filename)
    xml_content = wrap_drawio(func(), name)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(xml_content)
    print(f"Created: {filepath} ({len(xml_content)} bytes)")

# Create Multi-page Project File
all_in_one_path = os.path.join(DRAWIO_DIR, "VSTEP_Master_All_Diagrams.drawio")
multi_pages = '<mxfile host="app.diagrams.net" modified="2026-09-09T16:00:00.000Z" agent="5.0" version="21.6.8" type="device">\n'
for filename, name, func in diagrams:
    multi_pages += f'''  <diagram id="{name}" name="{name}">
    <mxGraphModel dx="1422" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
{func()}
      </root>
    </mxGraphModel>
  </diagram>\n'''
multi_pages += '</mxfile>'

with open(all_in_one_path, 'w', encoding='utf-8') as f:
    f.write(multi_pages)
print(f"Created All-in-One: {all_in_one_path} ({len(multi_pages)} bytes)")
