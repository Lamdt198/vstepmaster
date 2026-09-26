from .common import save_diagram

def generate():
    xml = '''        <!-- Start -->
        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="400" y="25" width="28" height="28" as="geometry" />
        </mxCell>
        <mxCell id="act_init" value="Học viên bấm Bắt đầu thi thử&#xa;(Khởi tạo Test Session)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="315" y="80" width="200" height="48" as="geometry" />
        </mxCell>
        
        <!-- Fork 1 -->
        <mxCell id="fork1" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="250" y="155" width="330" height="8" as="geometry" />
        </mxCell>

        <!-- Left: Timer -->
        <mxCell id="act_timer" value="Đồng hồ đếm ngược 180:00&#xa;(Chạy nền, chu kỳ 1s)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef2f2;strokeColor=#ef4444;fontColor=#991b1b;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="160" y="195" width="180" height="52" as="geometry" />
        </mxCell>
        <mxCell id="act_timer_check" value="Thời gian = 00:00 ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;fontSize=11;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="175" y="275" width="150" height="55" as="geometry" />
        </mxCell>

        <!-- Right: Exam Working -->
        <mxCell id="act_doing" value="Thí sinh làm bài 4 kỹ năng&#xa;(Lưu tạm LocalStorage)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f0fdf4;strokeColor=#22c55e;fontColor=#166534;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="490" y="195" width="180" height="52" as="geometry" />
        </mxCell>
        <mxCell id="act_submit_click" value="Thí sinh bấm 'Nộp bài' ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#22c55e;fontSize=11;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="505" y="275" width="150" height="55" as="geometry" />
        </mxCell>

        <!-- Join 1 -->
        <mxCell id="join1" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="250" y="370" width="330" height="8" as="geometry" />
        </mxCell>

        <mxCell id="act_lock" value="&lt;b&gt;Khóa giao diện làm bài&lt;/b&gt;&#xa;(Trạng thái SUBMITTED)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff1f2;strokeColor=#f43f5e;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="315" y="405" width="200" height="48" as="geometry" />
        </mxCell>

        <!-- Fork 2 -->
        <mxCell id="fork2" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="250" y="480" width="330" height="8" as="geometry" />
        </mxCell>

        <!-- Parallel Grading -->
        <mxCell id="act_score_obj" value="Chấm trắc nghiệm (Nghe/Đọc)&#xa;So khớp Answer Key (&lt;50ms)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#3b82f6;fontColor=#1e40af;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="150" y="515" width="200" height="54" as="geometry" />
        </mxCell>
        <mxCell id="act_score_ai" value="Gửi bài tự luận (Viết) sang AI&#xa;Phân tích theo Rubric CEFR (2-4s)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#faf5ff;strokeColor=#a855f7;fontColor=#6b21a8;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="480" y="515" width="200" height="54" as="geometry" />
        </mxCell>

        <!-- Join 2 -->
        <mxCell id="join2" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="250" y="600" width="330" height="8" as="geometry" />
        </mxCell>

        <mxCell id="act_finalize" value="Tổng hợp điểm TB 4 kỹ năng&#xa;Xác định bậc CEFR (B1, B2, C1)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="310" y="635" width="210" height="48" as="geometry" />
        </mxCell>
        <mxCell id="act_display" value="Hiển thị Bảng điểm điện tử &amp; Lưu CSDL" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="295" y="705" width="240" height="48" as="geometry" />
        </mxCell>
        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="400" y="775" width="28" height="28" as="geometry" />
        </mxCell>

        <!-- Edges with white background labels -->
        <mxCell id="ae1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="act_init"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_init" target="fork1"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae3" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="fork1" target="act_timer"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae4" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="fork1" target="act_doing"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae5" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_timer" target="act_timer_check"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae6" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_doing" target="act_submit_click"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae7" value="Hết giờ" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="act_timer_check" target="join1"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae8" value="Đồng ý nộp" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="act_submit_click" target="join1"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae9" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="join1" target="act_lock"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae10" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_lock" target="fork2"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae11" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="fork2" target="act_score_obj"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae12" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="fork2" target="act_score_ai"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae13" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_score_obj" target="join2"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae14" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_score_ai" target="join2"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae15" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="join2" target="act_finalize"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae16" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_finalize" target="act_display"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ae17" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_display" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''
    save_diagram("02_activity_flow_mock_test.drawio", "02_Activity_Flow", xml)
    return xml
