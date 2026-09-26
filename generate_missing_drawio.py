import os
import sys
import xml.etree.ElementTree as ET

sys.stdout.reconfigure(encoding='utf-8')

DRAWIO_DIR = os.path.abspath('diagrams/drawio')
os.makedirs(DRAWIO_DIR, exist_ok=True)

def wrap_drawio(content, name="Diagram"):
    return f'''<mxfile host="app.diagrams.net" modified="2026-09-10T14:30:00.000Z" agent="5.0" version="21.6.8" type="device">
  <diagram id="{name}" name="{name}">
    <mxGraphModel dx="1422" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="1100" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
{content}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>'''

# ==============================================================================
# ACTIVITY DIAGRAMS (7 MISSING)
# ==============================================================================

# 1. Activity UC01 Auth
def get_activity_uc01_auth_xml():
    return '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Hoạt động: Đăng nhập &amp; Đăng ký Tài khoản (UC-01)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="500" height="30" as="geometry" />
        </mxCell>

        <!-- Start -->
        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="485" y="70" width="30" height="30" as="geometry" />
        </mxCell>

        <mxCell id="act_access" value="Người dùng truy cập VSTEP Master" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="400" y="130" width="200" height="45" as="geometry" />
        </mxCell>

        <mxCell id="dec_op" value="Chọn thao tác ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#64748b;" vertex="1" parent="1">
          <mxGeometry x="435" y="205" width="130" height="60" as="geometry" />
        </mxCell>

        <!-- Branch Dang ky (Left) -->
        <mxCell id="part_reg" value="Phân hệ Đăng ký (Register)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;startSize=25;fontColor=#166534;" vertex="1" parent="1">
          <mxGeometry x="80" y="290" width="360" height="370" as="geometry" />
        </mxCell>
        <mxCell id="act_reg_input" value="Nhập Email, Mật khẩu &amp; Xác nhận mật khẩu" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;" vertex="1" parent="part_reg">
          <mxGeometry x="55" y="40" width="250" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_reg_val" value="Kiểm tra hợp lệ (Validate Email, Password)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;" vertex="1" parent="part_reg">
          <mxGeometry x="55" y="110" width="250" height="45" as="geometry" />
        </mxCell>
        <mxCell id="dec_reg_valid" value="Dữ liệu hợp lệ ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;" vertex="1" parent="part_reg">
          <mxGeometry x="115" y="180" width="130" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_reg_err" value="Báo lỗi (Email đã tồn tại / Password yếu)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;fontColor=#991b1b;" vertex="1" parent="part_reg">
          <mxGeometry x="10" y="255" width="160" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_reg_save" value="Mã hóa BCrypt &amp; Tạo tài khoản mới" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontStyle=1;" vertex="1" parent="part_reg">
          <mxGeometry x="190" y="255" width="160" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_reg_switch" value="Thông báo thành công &amp; Chuyển sang Đăng nhập" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;" vertex="1" parent="part_reg">
          <mxGeometry x="60" y="320" width="240" height="40" as="geometry" />
        </mxCell>

        <!-- Branch Dang nhap (Right) -->
        <mxCell id="part_login" value="Phân hệ Đăng nhập (Authentication)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;startSize=25;fontColor=#1e40af;" vertex="1" parent="1">
          <mxGeometry x="520" y="290" width="380" height="370" as="geometry" />
        </mxCell>
        <mxCell id="act_log_input" value="Nhập Email và Mật khẩu" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#2563eb;" vertex="1" parent="part_login">
          <mxGeometry x="70" y="40" width="240" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_log_check" value="Truy vấn CSDL &amp; Kiểm tra thông tin xác thực" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#2563eb;" vertex="1" parent="part_login">
          <mxGeometry x="70" y="110" width="240" height="45" as="geometry" />
        </mxCell>
        <mxCell id="dec_log_check" value="Xác thực đúng ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dbeafe;strokeColor=#2563eb;" vertex="1" parent="part_login">
          <mxGeometry x="125" y="180" width="130" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_log_err" value="Báo lỗi sai thông tin, cho phép thử lại" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;fontColor=#991b1b;" vertex="1" parent="part_login">
          <mxGeometry x="190" y="255" width="170" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_log_token" value="Khởi tạo JWT Token &amp; Lưu Session Storage" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#2563eb;fontStyle=1;" vertex="1" parent="part_login">
          <mxGeometry x="10" y="255" width="170" height="45" as="geometry" />
        </mxCell>

        <!-- Role Decision -->
        <mxCell id="dec_role" value="Phân quyền vai trò ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;" vertex="1" parent="1">
          <mxGeometry x="430" y="700" width="140" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act_role_admin" value="Cấp quyền Quản trị viên&#xa;(Quản lý Đề thi, Thống kê, User)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef9c3;strokeColor=#ca8a04;" vertex="1" parent="1">
          <mxGeometry x="270" y="790" width="200" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_role_student" value="Cấp quyền Học viên&#xa;(Luyện 4 kỹ năng, Thi thử, Từ vựng)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e0f2fe;strokeColor=#0284c7;" vertex="1" parent="1">
          <mxGeometry x="530" y="790" width="200" height="50" as="geometry" />
        </mxCell>

        <mxCell id="act_dash" value="Chuyển hướng vào Màn hình Dashboard" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;" vertex="1" parent="1">
          <mxGeometry x="380" y="880" width="240" height="45" as="geometry" />
        </mxCell>

        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="485" y="960" width="30" height="30" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="e1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="act_access"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_access" target="dec_op"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e3" value="Đăng ký" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;" edge="1" parent="1" source="dec_op" target="act_reg_input"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e4" value="Đăng nhập" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#2563eb;" edge="1" parent="1" source="dec_op" target="act_log_input"><mxGeometry relative="1" as="geometry" /></mxCell>
        
        <mxCell id="e5" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="part_reg" source="act_reg_input" target="act_reg_val"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e6" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="part_reg" source="act_reg_val" target="dec_reg_valid"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e7" value="Không" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;" edge="1" parent="part_reg" source="dec_reg_valid" target="act_reg_err"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e8" value="Hợp lệ" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;" edge="1" parent="part_reg" source="dec_reg_valid" target="act_reg_save"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e9" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="part_reg" source="act_reg_save" target="act_reg_switch"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e10" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_reg_switch" target="act_log_input"><mxGeometry relative="1" as="geometry" /></mxCell>

        <mxCell id="e11" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="part_login" source="act_log_input" target="act_log_check"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e12" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="part_login" source="act_log_check" target="dec_log_check"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e13" value="Sai" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;" edge="1" parent="part_login" source="dec_log_check" target="act_log_err"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e14" value="Đúng" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;" edge="1" parent="part_login" source="dec_log_check" target="act_log_token"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e15" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="part_login" source="act_log_err" target="act_log_input"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="360" y="278"/><mxPoint x="360" y="62"/></Array></mxGeometry></mxCell>

        <mxCell id="e16" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_log_token" target="dec_role"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e17" value="Admin" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#ca8a04;" edge="1" parent="1" source="dec_role" target="act_role_admin"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e18" value="Student" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#0284c7;" edge="1" parent="1" source="dec_role" target="act_role_student"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e19" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_role_admin" target="act_dash"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e20" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_role_student" target="act_dash"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e21" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_dash" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''

# 2. Activity UC02 Listening
def get_activity_uc02_listening_xml():
    return '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Hoạt động: Luyện tập Kỹ năng Nghe (Listening) (UC-02)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="500" height="30" as="geometry" />
        </mxCell>

        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="485" y="65" width="30" height="30" as="geometry" />
        </mxCell>

        <!-- Swimlane: Chuan bi -->
        <mxCell id="sw_prep" value="Chuẩn bị bài nghe" style="swimlane;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontStyle=1;startSize=25;" vertex="1" parent="1">
          <mxGeometry x="150" y="120" width="700" height="110" as="geometry" />
        </mxCell>
        <mxCell id="act_select" value="Học viên chọn bộ đề Listening&#xa;(Đề thi chuẩn B1-B2-C1)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#2563eb;" vertex="1" parent="sw_prep">
          <mxGeometry x="40" y="40" width="220" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_load" value="Hệ thống nạp 3 Parts (35 câu trắc nghiệm)&#xa;&amp; chuẩn bị Audio Stream" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#3b82f6;fontStyle=1;" vertex="1" parent="sw_prep">
          <mxGeometry x="380" y="40" width="280" height="50" as="geometry" />
        </mxCell>

        <!-- Swimlane: Lam bai -->
        <mxCell id="sw_exam" value="Quá trình Nghe &amp; Làm bài thi" style="swimlane;whiteSpace=wrap;html=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;startSize=25;" vertex="1" parent="1">
          <mxGeometry x="150" y="260" width="700" height="320" as="geometry" />
        </mxCell>
        <mxCell id="act_play" value="Khởi phát Audio tương ứng Part hiện tại&#xa;(Part 1: 8 câu | Part 2: 12 câu | Part 3: 15 câu)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;" vertex="1" parent="sw_exam">
          <mxGeometry x="200" y="40" width="300" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_listen" value="Học viên lắng nghe nội dung hội thoại / bài giảng" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;" vertex="1" parent="sw_exam">
          <mxGeometry x="200" y="115" width="300" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_choose" value="Chọn đáp án trắc nghiệm (A, B, C, D)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontStyle=1;" vertex="1" parent="sw_exam">
          <mxGeometry x="80" y="185" width="230" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_autosave" value="Hệ thống tự động lưu tạm (Auto-save)&#xa;vào LocalStorage sau mỗi câu" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#22c55e;" vertex="1" parent="sw_exam">
          <mxGeometry x="370" y="185" width="250" height="45" as="geometry" />
        </mxCell>
        <mxCell id="dec_more_part" value="Còn Part tiếp theo ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;" vertex="1" parent="sw_exam">
          <mxGeometry x="280" y="250" width="140" height="55" as="geometry" />
        </mxCell>

        <!-- Swimlane: Cham diem -->
        <mxCell id="sw_grade" value="Chấm điểm tự động &amp; Báo cáo kết quả" style="swimlane;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;startSize=25;" vertex="1" parent="1">
          <mxGeometry x="150" y="610" width="700" height="230" as="geometry" />
        </mxCell>
        <mxCell id="act_submit" value="Học viên bấm 'Nộp bài'" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#dc2626;fontStyle=1;" vertex="1" parent="sw_grade">
          <mxGeometry x="70" y="40" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_compare" value="Đối chiếu đáp án với Answer Key CSDL (&lt;50ms)&#xa;Tính tổng số câu đúng (x/35)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#d97706;" vertex="1" parent="sw_grade">
          <mxGeometry x="320" y="40" width="320" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_scale" value="Quy đổi thang điểm 10 chuẩn VSTEP&#xa;(Ví dụ: 25/35 câu = 7.0 điểm ~ B2)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#d97706;fontStyle=1;" vertex="1" parent="sw_grade">
          <mxGeometry x="180" y="110" width="340" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_result" value="Hiển thị Bảng điểm, Transcript lời thoại &amp; Vị trí câu hỏi trong đoạn nghe" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef9c3;strokeColor=#ca8a04;fontStyle=1;" vertex="1" parent="sw_grade">
          <mxGeometry x="120" y="170" width="460" height="45" as="geometry" />
        </mxCell>

        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="485" y="870" width="30" height="30" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="le1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="act_select"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_prep" source="act_select" target="act_load"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le3" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_load" target="act_play"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le4" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_exam" source="act_play" target="act_listen"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le5" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_exam" source="act_listen" target="act_choose"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le6" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_exam" source="act_choose" target="act_autosave"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le7" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_exam" source="act_autosave" target="dec_more_part"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le8" value="Có" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;" edge="1" parent="sw_exam" source="dec_more_part" target="act_play"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="120" y="278"/><mxPoint x="120" y="65"/></Array></mxGeometry></mxCell>
        <mxCell id="le9" value="Hết" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;" edge="1" parent="1" source="dec_more_part" target="act_submit"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le10" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_grade" source="act_submit" target="act_compare"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le11" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_grade" source="act_compare" target="act_scale"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le12" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_grade" source="act_scale" target="act_result"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le13" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_result" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''

# 3. Activity UC03 Reading
def get_activity_uc03_reading_xml():
    return '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Hoạt động: Luyện tập Kỹ năng Đọc (Reading) &amp; Tra Từ điển (UC-03)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="500" height="30" as="geometry" />
        </mxCell>

        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="485" y="65" width="30" height="30" as="geometry" />
        </mxCell>

        <mxCell id="act_init" value="Học viên chọn bộ đề Reading (4 Passages - 40 câu hỏi)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="355" y="120" width="290" height="45" as="geometry" />
        </mxCell>

        <mxCell id="sw_read" value="Vòng lặp đọc và xử lý 4 Passages" style="swimlane;whiteSpace=wrap;html=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;startSize=25;" vertex="1" parent="1">
          <mxGeometry x="100" y="195" width="800" height="400" as="geometry" />
        </mxCell>
        <mxCell id="act_load_p" value="Hiển thị nội dung Passage (cột trái) &amp; 10 câu hỏi (cột phải)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;" vertex="1" parent="sw_read">
          <mxGeometry x="200" y="35" width="400" height="45" as="geometry" />
        </mxCell>

        <!-- Fork for Reading & Dictionary -->
        <mxCell id="fork_read" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="sw_read">
          <mxGeometry x="180" y="105" width="440" height="6" as="geometry" />
        </mxCell>

        <!-- Branch 1: Answering -->
        <mxCell id="act_ans" value="Đọc hiểu &amp; trả lời câu hỏi&#xa;(True/False/NG, Matching, Multiple Choice)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;" vertex="1" parent="sw_read">
          <mxGeometry x="70" y="140" width="280" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_save_opt" value="Lưu đáp án đã chọn vào bộ nhớ tạm" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dbeafe;strokeColor=#2563eb;" vertex="1" parent="sw_read">
          <mxGeometry x="90" y="215" width="240" height="40" as="geometry" />
        </mxCell>

        <!-- Branch 2: Dictionary Popover -->
        <mxCell id="dec_lookup" value="Cần tra từ mới ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;" vertex="1" parent="sw_read">
          <mxGeometry x="510" y="130" width="130" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_dict_pop" value="Bấm đúp từ -&gt; Popover hiển thị:&#xa;Phiên âm IPA, Nghĩa ngữ cảnh, Bậc CEFR" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef9c3;strokeColor=#ca8a04;" vertex="1" parent="sw_read">
          <mxGeometry x="450" y="210" width="250" height="50" as="geometry" />
        </mxCell>

        <mxCell id="join_read" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="sw_read">
          <mxGeometry x="180" y="295" width="440" height="6" as="geometry" />
        </mxCell>

        <mxCell id="dec_more_p" value="Còn Passage tiếp theo ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;" vertex="1" parent="sw_read">
          <mxGeometry x="320" y="325" width="160" height="55" as="geometry" />
        </mxCell>

        <!-- Scoring Section -->
        <mxCell id="act_sub_read" value="Bấm 'Nộp bài thi Đọc'" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#dc2626;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="405" y="625" width="190" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_grade_read" value="Hệ thống chấm tự động 40 câu theo Answer Key&#xa;&amp; Quy đổi sang thang điểm 10 VSTEP" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="345" y="700" width="310" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_view_read" value="Hiển thị Điểm số, Giải thích chi tiết &amp; Highlight câu dẫn chứng trong bài" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;" vertex="1" parent="1">
          <mxGeometry x="290" y="780" width="420" height="50" as="geometry" />
        </mxCell>

        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="485" y="860" width="30" height="30" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="re1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="act_init"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_init" target="act_load_p"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re3" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_read" source="act_load_p" target="fork_read"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re4" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_read" source="fork_read" target="act_ans"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re5" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_read" source="fork_read" target="dec_lookup"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re6" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_read" source="act_ans" target="act_save_opt"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re7" value="Có" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;fontColor=#ca8a04;" edge="1" parent="sw_read" source="dec_lookup" target="act_dict_pop"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re8" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_read" source="act_save_opt" target="join_read"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re9" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_read" source="act_dict_pop" target="join_read"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re10" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_read" source="join_read" target="dec_more_p"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re11" value="Còn" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;" edge="1" parent="sw_read" source="dec_more_p" target="act_load_p"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="40" y="352"/><mxPoint x="40" y="58"/></Array></mxGeometry></mxCell>
        <mxCell id="re12" value="Hết" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;" edge="1" parent="1" source="dec_more_p" target="act_sub_read"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re13" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_sub_read" target="act_grade_read"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re14" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_grade_read" target="act_view_read"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re15" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_view_read" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''

# 4. Activity UC04 Writing
def get_activity_uc04_writing_xml():
    return '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Hoạt động: Luyện Viết (Writing) &amp; AI Chấm Điểm CEFR (UC-04)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="500" height="30" as="geometry" />
        </mxCell>

        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="485" y="65" width="30" height="30" as="geometry" />
        </mxCell>

        <mxCell id="dec_task" value="Chọn Task viết ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#f3e8ff;strokeColor=#9333ea;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="430" y="120" width="140" height="60" as="geometry" />
        </mxCell>

        <!-- Tasks -->
        <mxCell id="act_task1" value="Task 1: Viết Thư / Email tương tác&#xa;(Độ dài: 150 - 180 từ | 20 phút)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#9333ea;" vertex="1" parent="1">
          <mxGeometry x="180" y="210" width="250" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_task2" value="Task 2: Bài luận nghị luận xã hội (Essay)&#xa;(Độ dài: 250+ từ | 40 phút)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#9333ea;" vertex="1" parent="1">
          <mxGeometry x="570" y="210" width="250" height="50" as="geometry" />
        </mxCell>

        <mxCell id="join_task" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="380" y="290" width="240" height="6" as="geometry" />
        </mxCell>

        <!-- Editor & Word Count -->
        <mxCell id="act_editor" value="Học viên soạn thảo bài viết trong Editor&#xa;(Tự động đếm số từ trực tiếp theo thời gian thực)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;" vertex="1" parent="1">
          <mxGeometry x="350" y="325" width="300" height="50" as="geometry" />
        </mxCell>
        <mxCell id="dec_wordcount" value="Đủ số từ tối thiểu ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;" vertex="1" parent="1">
          <mxGeometry x="420" y="405" width="160" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act_warn_word" value="Cảnh báo bài chưa đủ độ dài quy định" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;fontColor=#991b1b;" vertex="1" parent="1">
          <mxGeometry x="670" y="412" width="210" height="45" as="geometry" />
        </mxCell>

        <!-- AI Scoring Swimlane -->
        <mxCell id="sw_ai" value="Quy trình Phân tích &amp; Chấm điểm của Google Gemini AI Engine" style="swimlane;whiteSpace=wrap;html=1;fillColor=#faf5ff;strokeColor=#a855f7;fontStyle=1;startSize=25;fontColor=#6b21a8;" vertex="1" parent="1">
          <mxGeometry x="60" y="500" width="880" height="230" as="geometry" />
        </mxCell>
        <mxCell id="act_send_ai" value="Gửi bài viết + Đề bài + Prompt Rubric VSTEP sang AI API" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#7c3aed;fontStyle=1;" vertex="1" parent="sw_ai">
          <mxGeometry x="270" y="35" width="340" height="40" as="geometry" />
        </mxCell>

        <mxCell id="fork_ai" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="sw_ai">
          <mxGeometry x="100" y="95" width="680" height="6" as="geometry" />
        </mxCell>

        <mxCell id="crit_tf" value="1. Task Fulfillment&#xa;(Mức độ trả lời yêu cầu đề)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#a855f7;fontSize=11;" vertex="1" parent="sw_ai">
          <mxGeometry x="30" y="120" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="crit_org" value="2. Organization&#xa;(Bố cục, đoạn văn, liên kết)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#a855f7;fontSize=11;" vertex="1" parent="sw_ai">
          <mxGeometry x="240" y="120" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="crit_lex" value="3. Lexical Resource&#xa;(Vốn từ vựng C1/B2, collocation)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#a855f7;fontSize=11;" vertex="1" parent="sw_ai">
          <mxGeometry x="450" y="120" width="190" height="45" as="geometry" />
        </mxCell>
        <mxCell id="crit_gra" value="4. Grammatical Range&#xa;(Cấu trúc phức, độ chính xác ngữ pháp)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#a855f7;fontSize=11;" vertex="1" parent="sw_ai">
          <mxGeometry x="660" y="120" width="200" height="45" as="geometry" />
        </mxCell>

        <mxCell id="join_ai" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="sw_ai">
          <mxGeometry x="100" y="185" width="680" height="6" as="geometry" />
        </mxCell>

        <!-- Result -->
        <mxCell id="act_render_res" value="Hiển thị Bảng điểm 4 tiêu chí, Gạch chân lỗi sai &amp; Đề xuất sửa" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="275" y="760" width="450" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_model_essay" value="Cung cấp Bài viết mẫu nâng cao (Band C1) &amp; Lưu CSDL" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;" vertex="1" parent="1">
          <mxGeometry x="325" y="835" width="350" height="45" as="geometry" />
        </mxCell>

        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="485" y="910" width="30" height="30" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="we1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="dec_task"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we2" value="Task 1" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="dec_task" target="act_task1"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we3" value="Task 2" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="dec_task" target="act_task2"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we4" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_task1" target="join_task"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we5" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_task2" target="join_task"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we6" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="join_task" target="act_editor"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we7" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_editor" target="dec_wordcount"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we8" value="Thiếu từ" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;" edge="1" parent="1" source="dec_wordcount" target="act_warn_word"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we9" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_warn_word" target="act_editor"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="775" y="350"/></Array></mxGeometry></mxCell>
        <mxCell id="we10" value="Đủ điều kiện" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;" edge="1" parent="1" source="dec_wordcount" target="act_send_ai"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we11" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_ai" source="act_send_ai" target="fork_ai"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we12" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_ai" source="fork_ai" target="crit_tf"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we13" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_ai" source="fork_ai" target="crit_org"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we14" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_ai" source="fork_ai" target="crit_lex"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we15" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_ai" source="fork_ai" target="crit_gra"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we16" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_ai" source="crit_tf" target="join_ai"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we17" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_ai" source="crit_org" target="join_ai"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we18" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_ai" source="crit_lex" target="join_ai"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we19" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_ai" source="crit_gra" target="join_ai"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we20" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="join_ai" target="act_render_res"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we21" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_render_res" target="act_model_essay"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we22" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_model_essay" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''

# 5. Activity UC05 Speaking
def get_activity_uc05_speaking_xml():
    return '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Hoạt động: Luyện Nói (Speaking) &amp; Ghi âm Trực tiếp (UC-05)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="500" height="30" as="geometry" />
        </mxCell>

        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="485" y="65" width="30" height="30" as="geometry" />
        </mxCell>

        <mxCell id="act_part" value="Học viên chọn Part luyện Nói&#xa;(Part 1: Phỏng vấn | Part 2: Giải pháp | Part 3: Phát triển chủ đề)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="325" y="115" width="350" height="50" as="geometry" />
        </mxCell>

        <mxCell id="sw_prep" value="Giai đoạn Chuẩn bị (Preparation)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;startSize=25;" vertex="1" parent="1">
          <mxGeometry x="160" y="195" width="680" height="110" as="geometry" />
        </mxCell>
        <mxCell id="act_prompt" value="Hiển thị đề thi Nói &amp; Dàn ý gợi ý (Outline)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#2563eb;" vertex="1" parent="sw_prep">
          <mxGeometry x="40" y="40" width="260" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_timer_prep" value="Đếm ngược thời gian suy nghĩ chuẩn bị&#xa;(1 phút cho Part 2 / Part 3)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dbeafe;strokeColor=#2563eb;fontStyle=1;" vertex="1" parent="sw_prep">
          <mxGeometry x="370" y="40" width="270" height="45" as="geometry" />
        </mxCell>

        <mxCell id="sw_record" value="Giai đoạn Ghi âm (MediaRecorder API)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#fef2f2;strokeColor=#ef4444;fontStyle=1;startSize=25;" vertex="1" parent="1">
          <mxGeometry x="160" y="335" width="680" height="195" as="geometry" />
        </mxCell>
        <mxCell id="act_rec_start" value="Tự động kích hoạt Micro &amp; Bắt đầu ghi âm" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#dc2626;fontStyle=1;" vertex="1" parent="sw_record">
          <mxGeometry x="60" y="40" width="250" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_speaking" value="Học viên thực hiện bài nói theo thời gian quy định" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#ef4444;" vertex="1" parent="sw_record">
          <mxGeometry x="370" y="40" width="280" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_rec_stop" value="Dừng ghi âm khi hết giờ hoặc bấm 'Hoàn thành'&#xa;-&gt; Đóng gói Audio Blob (.webm / .wav)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#ef4444;" vertex="1" parent="sw_record">
          <mxGeometry x="180" y="115" width="320" height="50" as="geometry" />
        </mxCell>

        <!-- Evaluation Choice -->
        <mxCell id="act_playback" value="Học viên nghe lại bản ghi âm giọng nói" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;" vertex="1" parent="1">
          <mxGeometry x="380" y="555" width="240" height="45" as="geometry" />
        </mxCell>
        <mxCell id="dec_eval" value="Hình thức đánh giá ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="420" y="630" width="160" height="60" as="geometry" />
        </mxCell>

        <!-- Self Eval -->
        <mxCell id="act_self_eval" value="Tự đánh giá: Nghe Audio mẫu chuẩn bản ngữ&#xa;&amp; So sánh đối chiếu tiêu chí" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef9c3;strokeColor=#ca8a04;" vertex="1" parent="1">
          <mxGeometry x="160" y="720" width="280" height="50" as="geometry" />
        </mxCell>

        <!-- AI Eval -->
        <mxCell id="act_ai_eval" value="AI Đánh giá: Phân tích Speech-to-Text,&#xa;Chấm Phát âm (Pronunciation), Trôi chảy &amp; Ngữ pháp" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#faf5ff;strokeColor=#9333ea;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="540" y="720" width="310" height="50" as="geometry" />
        </mxCell>

        <mxCell id="join_eval" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="380" y="805" width="240" height="6" as="geometry" />
        </mxCell>

        <mxCell id="act_res_speak" value="Lưu lịch sử bài nói vào CSDL &amp; Hiển thị nhận xét cải thiện" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;" vertex="1" parent="1">
          <mxGeometry x="310" y="840" width="380" height="45" as="geometry" />
        </mxCell>

        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="485" y="915" width="30" height="30" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="se1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="act_part"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_part" target="act_prompt"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se3" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_prep" source="act_prompt" target="act_timer_prep"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se4" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_timer_prep" target="act_rec_start"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se5" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_record" source="act_rec_start" target="act_speaking"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se6" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_record" source="act_speaking" target="act_rec_stop"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se7" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_rec_stop" target="act_playback"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se8" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_playback" target="dec_eval"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se9" value="Tự chấm" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#ca8a04;" edge="1" parent="1" source="dec_eval" target="act_self_eval"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se10" value="AI Chấm" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#9333ea;" edge="1" parent="1" source="dec_eval" target="act_ai_eval"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se11" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_self_eval" target="join_eval"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se12" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_ai_eval" target="join_eval"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se13" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="join_eval" target="act_res_speak"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se14" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_res_speak" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''

# 6. Activity UC07 Custom Test
def get_activity_uc07_custom_test_xml():
    return '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Hoạt động: Bóc tách &amp; Nhập đề thi tùy biến Word/PDF (UC-07)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="500" height="30" as="geometry" />
        </mxCell>

        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="485" y="65" width="30" height="30" as="geometry" />
        </mxCell>

        <mxCell id="act_upload" value="Người dùng tải lên tệp đề thi (.docx hoặc .pdf)&#xa;(Kéo thả file vào DropZone)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="360" y="120" width="280" height="50" as="geometry" />
        </mxCell>

        <mxCell id="dec_format" value="Định dạng tệp tin ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="425" y="200" width="150" height="60" as="geometry" />
        </mxCell>

        <!-- Extract Branch -->
        <mxCell id="act_mammoth" value="Dùng Mammoth.js bóc tách HTML DOM&#xa;&amp; trích xuất cấu trúc văn bản Word" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;" vertex="1" parent="1">
          <mxGeometry x="170" y="285" width="260" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_pdfjs" value="Dùng PDF.js trích xuất dòng văn bản (Text Streams)&#xa;&amp; tọa độ chữ trong trang PDF" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;" vertex="1" parent="1">
          <mxGeometry x="570" y="285" width="280" height="50" as="geometry" />
        </mxCell>

        <mxCell id="join_extract" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="380" y="365" width="240" height="6" as="geometry" />
        </mxCell>

        <!-- Regex Parsing Section -->
        <mxCell id="sw_parse" value="Thuật toán Regex &amp; NLP phân tích cấu trúc đề thi VSTEP" style="swimlane;whiteSpace=wrap;html=1;fillColor=#faf5ff;strokeColor=#a855f7;fontStyle=1;startSize=25;" vertex="1" parent="1">
          <mxGeometry x="70" y="400" width="860" height="150" as="geometry" />
        </mxCell>
        <mxCell id="p_passage" value="Nhận diện Passage / Audio link&#xa;(Đoạn văn đọc hiểu / bài nghe)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#7c3aed;fontSize=11;" vertex="1" parent="sw_parse">
          <mxGeometry x="20" y="40" width="190" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p_q" value="Nhận diện Câu hỏi &amp; Số thứ tự&#xa;(VD: Câu 1, Question 2)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#7c3aed;fontSize=11;" vertex="1" parent="sw_parse">
          <mxGeometry x="230" y="40" width="190" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p_opt" value="Nhận diện 4 Phương án A, B, C, D&#xa;(Regex: /^[A-D]\.\s/)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#7c3aed;fontSize=11;" vertex="1" parent="sw_parse">
          <mxGeometry x="440" y="40" width="190" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p_key" value="Nhận diện Đáp án đúng &amp; Barem&#xa;(Answer Key / Explanation)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#7c3aed;fontSize=11;" vertex="1" parent="sw_parse">
          <mxGeometry x="650" y="40" width="190" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_build_dto" value="Tổng hợp thành Cấu trúc Bộ đề hoàn chỉnh (CustomExamDTO)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ede9fe;strokeColor=#7c3aed;fontStyle=1;" vertex="1" parent="sw_parse">
          <mxGeometry x="230" y="95" width="400" height="40" as="geometry" />
        </mxCell>

        <!-- Preview & Edit -->
        <mxCell id="act_preview" value="Hiển thị Bản xem trước tương tác (Preview Mode)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="360" y="580" width="280" height="45" as="geometry" />
        </mxCell>
        <mxCell id="dec_edit" value="Cần chỉnh sửa câu hỏi ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;" vertex="1" parent="1">
          <mxGeometry x="420" y="650" width="160" height="55" as="geometry" />
        </mxCell>
        <mxCell id="act_do_edit" value="Hiệu chỉnh nội dung trực tiếp trên Form" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;" vertex="1" parent="1">
          <mxGeometry x="660" y="655" width="220" height="45" as="geometry" />
        </mxCell>

        <mxCell id="act_save_db" value="Xác nhận &amp; Lưu bộ đề mới vào Cơ sở dữ liệu&#xa;(Bảng EXAMS, SECTIONS, QUESTIONS, QUESTION_OPTIONS)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;" vertex="1" parent="1">
          <mxGeometry x="300" y="735" width="400" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_ready" value="Bộ đề sẵn sàng trong Ngân hàng đề thi cho Học viên luyện tập" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;" vertex="1" parent="1">
          <mxGeometry x="320" y="815" width="360" height="45" as="geometry" />
        </mxCell>

        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="485" y="890" width="30" height="30" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="ce1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="act_upload"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_upload" target="dec_format"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce3" value=".docx" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#2563eb;" edge="1" parent="1" source="dec_format" target="act_mammoth"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce4" value=".pdf" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#ef4444;" edge="1" parent="1" source="dec_format" target="act_pdfjs"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce5" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_mammoth" target="join_extract"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce6" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_pdfjs" target="join_extract"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce7" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="join_extract" target="sw_parse"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce8" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_build_dto" target="act_preview"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce9" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_preview" target="dec_edit"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce10" value="Có" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;" edge="1" parent="1" source="dec_edit" target="act_do_edit"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce11" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_do_edit" target="act_preview"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="770" y="602"/></Array></mxGeometry></mxCell>
        <mxCell id="ce12" value="Không / Đã sửa xong" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;fontColor=#2563eb;" edge="1" parent="1" source="dec_edit" target="act_save_db"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce13" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_save_db" target="act_ready"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce14" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_ready" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''

# 7. Activity UC08 Vocab
def get_activity_uc08_vocab_xml():
    return '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Hoạt động: Học Từ Vựng Flashcards &amp; Lặp lại Ngắt quãng (UC-08)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="500" height="30" as="geometry" />
        </mxCell>

        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="485" y="65" width="30" height="30" as="geometry" />
        </mxCell>

        <mxCell id="act_choose_topic" value="Học viên chọn Bộ từ vựng theo Topic&#xa;(Academic, Environment, Technology) hoặc Cấp độ CEFR (B1, B2, C1)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="290" y="115" width="420" height="50" as="geometry" />
        </mxCell>

        <!-- Swimlane: Spaced Repetition Loop -->
        <mxCell id="sw_card" value="Vòng lặp Học với Flashcard 3D &amp; Thuật toán Spaced Repetition (SM-2)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;startSize=25;" vertex="1" parent="1">
          <mxGeometry x="80" y="195" width="840" height="480" as="geometry" />
        </mxCell>
        <mxCell id="act_front" value="Hiển thị mặt trước Flashcard:&#xa;Từ tiếng Anh, Loại từ &amp; Nút nghe Audio phát âm chuẩn" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontStyle=1;" vertex="1" parent="sw_card">
          <mxGeometry x="240" y="40" width="360" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_flip" value="Học viên tương tác Lật thẻ (Flip Animation 3D)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;" vertex="1" parent="sw_card">
          <mxGeometry x="280" y="115" width="280" height="40" as="geometry" />
        </mxCell>
        <mxCell id="act_back" value="Hiển thị mặt sau Flashcard:&#xa;Nghĩa tiếng Việt, Phiên âm IPA, Collocations &amp; Câu ví dụ VSTEP" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;" vertex="1" parent="sw_card">
          <mxGeometry x="220" y="180" width="400" height="50" as="geometry" />
        </mxCell>

        <!-- Memory Level Decision -->
        <mxCell id="dec_memory" value="Đánh giá mức độ ghi nhớ ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;" vertex="1" parent="sw_card">
          <mxGeometry x="320" y="255" width="200" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act_remembered" value="[Đã nhớ]&#xa;Tăng khoảng cách ôn tập&#xa;Interval = 6 ngày" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontSize=11;" vertex="1" parent="sw_card">
          <mxGeometry x="50" y="340" width="180" height="55" as="geometry" />
        </mxCell>
        <mxCell id="act_review" value="[Cần ôn lại]&#xa;Đặt lịch ôn tập ngắn hạn&#xa;Interval = 1 ngày" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef9c3;strokeColor=#ca8a04;fontSize=11;" vertex="1" parent="sw_card">
          <mxGeometry x="330" y="340" width="180" height="55" as="geometry" />
        </mxCell>
        <mxCell id="act_forgot" value="[Chưa nhớ]&#xa;Thêm vào hàng đợi học lại&#xa;ngay trong phiên học này" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;fontSize=11;fontColor=#991b1b;" vertex="1" parent="sw_card">
          <mxGeometry x="610" y="340" width="180" height="55" as="geometry" />
        </mxCell>

        <mxCell id="join_card" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=none;" vertex="1" parent="sw_card">
          <mxGeometry x="200" y="420" width="440" height="6" as="geometry" />
        </mxCell>
        <mxCell id="dec_more_cards" value="Còn từ vựng trong phiên ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dbeafe;strokeColor=#2563eb;" vertex="1" parent="sw_card">
          <mxGeometry x="335" y="435" width="170" height="40" as="geometry" />
        </mxCell>

        <!-- Summary Section -->
        <mxCell id="act_summary" value="Hệ thống tổng hợp báo cáo phiên học:&#xa;Số từ đã thuộc (%), Thời gian học, Danh sách từ cần ôn tập" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="310" y="705" width="380" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_update_streak" value="Cập nhật Streak học tập hàng ngày &amp; Lưu tiến độ vào CSDL" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;" vertex="1" parent="1">
          <mxGeometry x="310" y="780" width="380" height="45" as="geometry" />
        </mxCell>

        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="485" y="855" width="30" height="30" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="ve1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="act_choose_topic"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_choose_topic" target="act_front"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve3" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_card" source="act_front" target="act_flip"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve4" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_card" source="act_flip" target="act_back"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve5" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_card" source="act_back" target="dec_memory"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve6" value="Đã nhớ" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;" edge="1" parent="sw_card" source="dec_memory" target="act_remembered"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve7" value="Cần ôn" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#ca8a04;" edge="1" parent="sw_card" source="dec_memory" target="act_review"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve8" value="Chưa nhớ" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#ef4444;" edge="1" parent="sw_card" source="dec_memory" target="act_forgot"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve9" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_card" source="act_remembered" target="join_card"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve10" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_card" source="act_review" target="join_card"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve11" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_card" source="act_forgot" target="join_card"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve12" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="sw_card" source="join_card" target="dec_more_cards"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve13" value="Còn từ" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;" edge="1" parent="sw_card" source="dec_more_cards" target="act_front"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="30" y="455"/><mxPoint x="30" y="65"/></Array></mxGeometry></mxCell>
        <mxCell id="ve14" value="Hết từ" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#2563eb;" edge="1" parent="1" source="dec_more_cards" target="act_summary"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve15" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_summary" target="act_update_streak"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve16" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_update_streak" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''

# ==============================================================================
# SEQUENCE DIAGRAMS (7 MISSING)
# ==============================================================================

# 8. Sequence UC01 Auth
def get_sequence_uc01_auth_xml():
    return '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Đăng nhập &amp; Xác thực Người dùng (UC-01)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="15" width="500" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_student" value="Học viên&#xa;(Student)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="60" y="60" width="110" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_authui" value="Giao diện Đăng nhập&#xa;(AuthUI)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="270" y="60" width="130" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_authservice" value="AuthService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="490" y="60" width="130" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="720" y="60" width="120" height="740" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: Nhập email, password &amp; bấm Submit" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="115" y="140" as="sourcePoint"/><mxPoint x="335" y="140" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: validateInput(email, password)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="335" y="170" as="sourcePoint"/><mxPoint x="335" y="200" as="targetPoint"/><Array as="points"><mxPoint x="375" y="170"/><mxPoint x="375" y="200"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: login(credentials)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="335" y="230" as="sourcePoint"/><mxPoint x="555" y="230" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: SELECT * FROM USERS WHERE email = ?" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="555" y="270" as="sourcePoint"/><mxPoint x="780" y="270" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m5" value="5: Return userRecord (với password_hash)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="780" y="310" as="sourcePoint"/><mxPoint x="555" y="310" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Frame alt -->
        <mxCell id="frame_alt" value="alt [Xác thực thành công (Password match)]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=250;height=25;fillColor=none;strokeColor=#64748b;" vertex="1" parent="1">
          <mxGeometry x="40" y="350" width="820" height="230" as="geometry" />
        </mxCell>
        <mxCell id="m6" value="6: verifyBcrypt(password, hash) &amp; generateToken(user)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="555" y="390" as="sourcePoint"/><mxPoint x="555" y="420" as="targetPoint"/><Array as="points"><mxPoint x="595" y="390"/><mxPoint x="595" y="420"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m7" value="7: Return AuthResponseDTO (JWT Token, UserProfile)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="555" y="450" as="sourcePoint"/><mxPoint x="335" y="450" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m8" value="8: saveSession(token) vào LocalStorage" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="335" y="480" as="sourcePoint"/><mxPoint x="335" y="510" as="targetPoint"/><Array as="points"><mxPoint x="375" y="480"/><mxPoint x="375" y="510"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: Chuyển hướng tới Dashboard theo vai trò" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="335" y="540" as="sourcePoint"/><mxPoint x="115" y="540" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Divider line in frame -->
        <mxCell id="divider" value="[else: Xác thực thất bại (Sai email / password)]" style="line;strokeWidth=1;dashed=1;labelPosition=top;verticalLabelPosition=bottom;align=left;spacingLeft=10;strokeColor=#ef4444;fontColor=#dc2626;" vertex="1" parent="frame_alt">
          <mxGeometry y="230" width="820" height="10" as="geometry" />
        </mxCell>

        <mxCell id="m10" value="10: Return 401 Unauthorized (Invalid Credentials)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#ef4444;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="555" y="640" as="sourcePoint"/><mxPoint x="335" y="640" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m11" value="11: Hiển thị thông báo lỗi &amp; cho phép thử lại" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#ef4444;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="335" y="690" as="sourcePoint"/><mxPoint x="115" y="690" as="targetPoint"/></mxGeometry>
        </mxCell>'''

# 9. Sequence UC02 Listening
def get_sequence_uc02_listening_xml():
    return '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Luyện tập Kỹ năng Nghe (Listening) &amp; Chấm Trắc nghiệm (UC-02)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="15" width="550" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_s" value="Học viên&#xa;(Student)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="50" y="60" width="100" height="760" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="ListeningUI&#xa;(Presentation)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="220" y="60" width="110" height="760" as="geometry" />
        </mxCell>
        <mxCell id="ll_audio" value="AudioPlayer&#xa;(HTML5 Audio)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#faf5ff;strokeColor=#a855f7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="390" y="60" width="110" height="760" as="geometry" />
        </mxCell>
        <mxCell id="ll_srv" value="ExamService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="560" y="60" width="120" height="760" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="740" y="60" width="110" height="760" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: Chọn bộ đề Listening" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="130" as="sourcePoint"/><mxPoint x="275" y="130" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: loadExam(examId, skill='LISTENING')" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="165" as="sourcePoint"/><mxPoint x="620" y="165" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: Query QUESTIONS, OPTIONS, audio_url (35 câu)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="620" y="200" as="sourcePoint"/><mxPoint x="795" y="200" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: Trả về danh sách câu hỏi &amp; URL audio" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="795" y="235" as="sourcePoint"/><mxPoint x="620" y="235" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m5" value="5: Return ExamDTO (3 Parts)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="620" y="270" as="sourcePoint"/><mxPoint x="275" y="270" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m6" value="6: initAudioPlayer(audioUrl)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#a855f7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="305" as="sourcePoint"/><mxPoint x="445" y="305" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m7" value="7: playAudio() phát âm thanh" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#a855f7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="445" y="340" as="sourcePoint"/><mxPoint x="100" y="340" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Loop -->
        <mxCell id="fr_loop" value="loop [Lặp cho 35 câu hỏi trắc nghiệm]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=220;height=25;fillColor=none;strokeColor=#64748b;" vertex="1" parent="1">
          <mxGeometry x="40" y="380" width="360" height="110" as="geometry" />
        </mxCell>
        <mxCell id="m8" value="8: Chọn đáp án A, B, C, hoặc D" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="420" as="sourcePoint"/><mxPoint x="275" y="420" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: autoSaveAnswer(qId, optId)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="445" as="sourcePoint"/><mxPoint x="275" y="470" as="targetPoint"/><Array as="points"><mxPoint x="310" y="445"/><mxPoint x="310" y="470"/></Array></mxGeometry>
        </mxCell>

        <!-- Submit & Grading -->
        <mxCell id="m10" value="10: Bấm 'Nộp bài'" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#dc2626;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="520" as="sourcePoint"/><mxPoint x="275" y="520" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m11" value="11: submitAndGrade(answers)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="555" as="sourcePoint"/><mxPoint x="620" y="555" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m12" value="12: compareWithAnswerKey() &amp; scaleScoreVstep()" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="620" y="585" as="sourcePoint"/><mxPoint x="620" y="615" as="targetPoint"/><Array as="points"><mxPoint x="660" y="585"/><mxPoint x="660" y="615"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m13" value="13: INSERT INTO SUBMISSIONS (objective_score, status)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="620" y="645" as="sourcePoint"/><mxPoint x="795" y="645" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m14" value="14: Confirm Save OK" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="795" y="680" as="sourcePoint"/><mxPoint x="620" y="680" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m15" value="15: Return ResultDTO (Score/10, Transcript, Answers)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="620" y="715" as="sourcePoint"/><mxPoint x="275" y="715" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m16" value="16: Hiển thị Bảng điểm, Transcript &amp; Giải thích đáp án" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="750" as="sourcePoint"/><mxPoint x="100" y="750" as="targetPoint"/></mxGeometry>
        </mxCell>'''

# 10. Sequence UC03 Reading
def get_sequence_uc03_reading_xml():
    return '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Luyện tập Kỹ năng Đọc &amp; Tra Từ Điển Popover (UC-03)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="15" width="550" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_s" value="Học viên&#xa;(Student)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="50" y="60" width="100" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="ReadingUI&#xa;(Presentation)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="220" y="60" width="110" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_dict" value="DictionaryPopover&#xa;(Component)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef9c3;strokeColor=#ca8a04;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="390" y="60" width="120" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_srv" value="ExamService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="570" y="60" width="120" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="750" y="60" width="110" height="770" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: Chọn bộ đề thi Reading" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="130" as="sourcePoint"/><mxPoint x="275" y="130" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: loadExam(examId, skill='READING')" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="165" as="sourcePoint"/><mxPoint x="630" y="165" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: Query 4 Passages &amp; 40 Questions" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="630" y="200" as="sourcePoint"/><mxPoint x="805" y="200" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: Trả về dữ liệu passages &amp; questions" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="805" y="235" as="sourcePoint"/><mxPoint x="630" y="235" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m5" value="5: Return ReadingExamDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="630" y="270" as="sourcePoint"/><mxPoint x="275" y="270" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Loop & Opt -->
        <mxCell id="fr_loop" value="loop [Trong quá trình đọc &amp; làm bài 40 câu]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=240;height=25;fillColor=none;strokeColor=#64748b;" vertex="1" parent="1">
          <mxGeometry x="40" y="300" width="500" height="230" as="geometry" />
        </mxCell>
        <mxCell id="m6" value="6: Đọc văn bản &amp; Chọn đáp án" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="340" as="sourcePoint"/><mxPoint x="275" y="340" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m7" value="7: saveAnswerTemp(qId, optId)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="360" as="sourcePoint"/><mxPoint x="275" y="385" as="targetPoint"/><Array as="points"><mxPoint x="310" y="360"/><mxPoint x="310" y="385"/></Array></mxGeometry>
        </mxCell>

        <mxCell id="fr_opt" value="opt [Nếu cần tra cứu từ mới trực tiếp]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=220;height=25;fillColor=none;strokeColor=#ca8a04;" vertex="1" parent="1">
          <mxGeometry x="50" y="405" width="460" height="115" as="geometry" />
        </mxCell>
        <mxCell id="m8" value="8: Click chọn từ khó trong bài đọc" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#ca8a04;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="445" as="sourcePoint"/><mxPoint x="275" y="445" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: lookupWord(selectedWord)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#ca8a04;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="475" as="sourcePoint"/><mxPoint x="450" y="475" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m10" value="10: Hiển thị Popup (Nghĩa, IPA, Bậc CEFR)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#ca8a04;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="450" y="505" as="sourcePoint"/><mxPoint x="100" y="505" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Submit -->
        <mxCell id="m11" value="11: Bấm 'Nộp bài thi Đọc'" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#dc2626;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="555" as="sourcePoint"/><mxPoint x="275" y="555" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m12" value="12: submitAndGrade(readingAnswers)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="590" as="sourcePoint"/><mxPoint x="630" y="590" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m13" value="13: gradeObjectiveQuestions(40 câu) -&gt; Điểm thang 10" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="630" y="615" as="sourcePoint"/><mxPoint x="630" y="645" as="targetPoint"/><Array as="points"><mxPoint x="670" y="615"/><mxPoint x="670" y="645"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m14" value="14: Lưu kết quả bài làm vào CSDL" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="630" y="670" as="sourcePoint"/><mxPoint x="805" y="670" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m15" value="15: Xác nhận lưu" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="805" y="705" as="sourcePoint"/><mxPoint x="630" y="705" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m16" value="16: Return ScoreReportDTO (Điểm, chi tiết dẫn chứng)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="630" y="735" as="sourcePoint"/><mxPoint x="275" y="735" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m17" value="17: Hiển thị Báo cáo kết quả &amp; Dẫn chứng câu trong bài" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="765" as="sourcePoint"/><mxPoint x="100" y="765" as="targetPoint"/></mxGeometry>
        </mxCell>'''

# 11. Sequence UC05 Speaking
def get_sequence_uc05_speaking_xml():
    return '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Luyện Nói (Speaking) &amp; Phân Tích Giọng Nói AI (UC-05)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="15" width="550" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_s" value="Học viên&#xa;(Student)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="40" y="60" width="100" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="SpeakingUI&#xa;(Presentation)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="190" y="60" width="110" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_timer" value="Timer&#xa;(Countdown)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fee2e2;strokeColor=#ef4444;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="350" y="60" width="100" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_rec" value="MediaRecorder&#xa;(Web Audio API)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#faf5ff;strokeColor=#a855f7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="500" y="60" width="120" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_srv" value="AIScoringService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="670" y="60" width="130" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_ai" value="Gemini AI Engine&#xa;(External API)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#ede9fe;strokeColor=#7c3aed;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="850" y="60" width="120" height="770" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: Chọn Part luyện nói (Part 1, 2, hoặc 3)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="90" y="130" as="sourcePoint"/><mxPoint x="245" y="130" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: Hiển thị đề bài &amp; Dàn ý gợi ý (Outline)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="155" as="sourcePoint"/><mxPoint x="245" y="180" as="targetPoint"/><Array as="points"><mxPoint x="280" y="155"/><mxPoint x="280" y="180"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: startPrepTimer(60s)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#ef4444;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="200" as="sourcePoint"/><mxPoint x="400" y="200" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: onPrepFinished() hết giờ chuẩn bị" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#ef4444;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="400" y="235" as="sourcePoint"/><mxPoint x="245" y="235" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Record -->
        <mxCell id="m5" value="5: Bấm 'Bắt đầu ghi âm' (Record)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#dc2626;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="90" y="270" as="sourcePoint"/><mxPoint x="245" y="270" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m6" value="6: startRecording(audioConstraints)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#a855f7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="305" as="sourcePoint"/><mxPoint x="560" y="305" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m7" value="7: startSpeakingTimer(180s)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#ef4444;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="335" as="sourcePoint"/><mxPoint x="400" y="335" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m8" value="8: Phát biểu bài nói qua Microphone" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#a855f7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="90" y="370" as="sourcePoint"/><mxPoint x="560" y="370" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: onTimeExpired() hoặc bấm Stop" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#ef4444;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="400" y="405" as="sourcePoint"/><mxPoint x="245" y="405" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m10" value="10: stopRecording() &amp; đóng gói Blob" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#a855f7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="435" as="sourcePoint"/><mxPoint x="560" y="435" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m11" value="11: return AudioBlob (audio/webm)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#a855f7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="560" y="465" as="sourcePoint"/><mxPoint x="245" y="465" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m12" value="12: Nghe lại bản ghi âm giọng nói" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="495" as="sourcePoint"/><mxPoint x="90" y="495" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- AI Opt -->
        <mxCell id="fr_opt" value="opt [Yêu cầu AI Đánh giá &amp; Chấm điểm]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=240;height=25;fillColor=none;strokeColor=#7c3aed;" vertex="1" parent="1">
          <mxGeometry x="30" y="530" width="950" height="230" as="geometry" />
        </mxCell>
        <mxCell id="m13" value="13: Bấm 'AI Chấm điểm &amp; Nhận xét'" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="90" y="570" as="sourcePoint"/><mxPoint x="245" y="570" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m14" value="14: evaluateSpeaking(audioBlob, prompt)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="605" as="sourcePoint"/><mxPoint x="735" y="605" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m15" value="15: POST /gemini-1.5:generateContent (Multimodal Audio + STT + Rubric VSTEP)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=2;strokeColor=#7c3aed;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="735" y="640" as="sourcePoint"/><mxPoint x="910" y="640" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m16" value="16: Return JSON (Pronunciation, Fluency, Lexical, Grammar, Band B1-C1)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="910" y="675" as="sourcePoint"/><mxPoint x="735" y="675" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m17" value="17: Return SpeakingFeedbackDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="735" y="710" as="sourcePoint"/><mxPoint x="245" y="710" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m18" value="18: Hiển thị Bảng điểm chi tiết &amp; Gợi ý sửa phát âm" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="740" as="sourcePoint"/><mxPoint x="90" y="740" as="targetPoint"/></mxGeometry>
        </mxCell>'''

# 12. Sequence UC06 Mock Test
def get_sequence_uc06_mock_test_xml():
    return '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Thi Thử Toàn Diện VSTEP Mock Test 180 Phút (UC-06)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="15" width="550" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_s" value="Thí sinh&#xa;(Student)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="30" y="60" width="90" height="800" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="MockTestUI&#xa;(Presentation)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="170" y="60" width="110" height="800" as="geometry" />
        </mxCell>
        <mxCell id="ll_timer" value="CountdownTimer&#xa;(180 phút)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fee2e2;strokeColor=#ef4444;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="330" y="60" width="110" height="800" as="geometry" />
        </mxCell>
        <mxCell id="ll_srv" value="ExamService&#xa;(Objective)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="490" y="60" width="110" height="800" as="geometry" />
        </mxCell>
        <mxCell id="ll_ai_srv" value="AIScoringService&#xa;(Subjective)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#faf5ff;strokeColor=#a855f7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="650" y="60" width="120" height="800" as="geometry" />
        </mxCell>
        <mxCell id="ll_ai" value="Gemini AI&#xa;(External API)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#ede9fe;strokeColor=#7c3aed;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="820" y="60" width="100" height="800" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="960" y="60" width="100" height="800" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: Chọn đề thi thử toàn diện VSTEP" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="75" y="125" as="sourcePoint"/><mxPoint x="225" y="125" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: loadFullExamPackage(examId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="225" y="155" as="sourcePoint"/><mxPoint x="545" y="155" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: Query trọn bộ 4 kỹ năng (L, R, W, S)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="545" y="185" as="sourcePoint"/><mxPoint x="1010" y="185" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: Trả về FullExamDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="545" y="215" as="sourcePoint"/><mxPoint x="225" y="215" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m5" value="5: startCountdown(180:00)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#ef4444;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="225" y="245" as="sourcePoint"/><mxPoint x="385" y="245" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Loop 180 mins -->
        <mxCell id="fr_loop" value="loop [Trong 180 phút làm bài 4 kỹ năng]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=230;height=25;fillColor=none;strokeColor=#64748b;" vertex="1" parent="1">
          <mxGeometry x="20" y="275" width="280" height="95" as="geometry" />
        </mxCell>
        <mxCell id="m6" value="6: Thí sinh làm bài thi các phần" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="75" y="310" as="sourcePoint"/><mxPoint x="225" y="310" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m7" value="7: autoSaveToLocalStorage (mỗi 30s)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="225" y="330" as="sourcePoint"/><mxPoint x="225" y="355" as="targetPoint"/><Array as="points"><mxPoint x="260" y="330"/><mxPoint x="260" y="355"/></Array></mxGeometry>
        </mxCell>

        <!-- Lock -->
        <mxCell id="m8" value="8: onTimeExpired() (Hết 180 phút)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#ef4444;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="385" y="395" as="sourcePoint"/><mxPoint x="225" y="395" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: lockInterface() khóa quyền chỉnh sửa" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="225" y="415" as="sourcePoint"/><mxPoint x="225" y="440" as="targetPoint"/><Array as="points"><mxPoint x="260" y="415"/><mxPoint x="260" y="440"/></Array></mxGeometry>
        </mxCell>

        <!-- Parallel Grading -->
        <mxCell id="fr_par" value="par [Chấm điểm song song: Trắc nghiệm &amp; AI Tự luận]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=310;height=25;fillColor=none;strokeColor=#7c3aed;" vertex="1" parent="1">
          <mxGeometry x="150" y="465" width="800" height="210" as="geometry" />
        </mxCell>
        <mxCell id="m10" value="10: submitObjectiveAnswers(L &amp; R)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="225" y="500" as="sourcePoint"/><mxPoint x="545" y="500" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m11" value="11: Chấm tức thì đối chiếu Answer Key" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="545" y="515" as="sourcePoint"/><mxPoint x="545" y="540" as="targetPoint"/><Array as="points"><mxPoint x="580" y="515"/><mxPoint x="580" y="540"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m12" value="12: Return ObjectiveScores (L, R)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="545" y="560" as="sourcePoint"/><mxPoint x="225" y="560" as="targetPoint"/></mxGeometry>
        </mxCell>

        <mxCell id="div_par" value="[and]" style="line;strokeWidth=1;dashed=1;labelPosition=top;verticalLabelPosition=bottom;align=left;spacingLeft=10;strokeColor=#a855f7;fontColor=#7c3aed;" vertex="1" parent="fr_par">
          <mxGeometry y="115" width="800" height="10" as="geometry" />
        </mxCell>

        <mxCell id="m13" value="13: submitSubjectiveAnswers(W &amp; S)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#a855f7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="225" y="605" as="sourcePoint"/><mxPoint x="710" y="605" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m14" value="14: evaluateSubjective(Rubric VSTEP)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=2;strokeColor=#7c3aed;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="710" y="630" as="sourcePoint"/><mxPoint x="870" y="630" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m15" value="15: Return AI Scores (W, S)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#a855f7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="710" y="660" as="sourcePoint"/><mxPoint x="225" y="660" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Finalize -->
        <mxCell id="m16" value="16: finalizeScoreCard(L, R, W, S) -&gt; Tính điểm TB &amp; Quy đổi B1/B2/C1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="225" y="700" as="sourcePoint"/><mxPoint x="545" y="700" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m17" value="17: Lưu kết quả ScoreCard vào Database" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="545" y="735" as="sourcePoint"/><mxPoint x="1010" y="735" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m18" value="18: Return FinalScoreCardDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="545" y="770" as="sourcePoint"/><mxPoint x="225" y="770" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m19" value="19: Hiển thị Bảng điểm VSTEP 4 kỹ năng &amp; Chứng nhận năng lực mô phỏng" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="225" y="805" as="sourcePoint"/><mxPoint x="75" y="805" as="targetPoint"/></mxGeometry>
        </mxCell>'''

# 13. Sequence UC07 Custom Test
def get_sequence_uc07_custom_test_xml():
    return '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Bóc tách &amp; Nhập đề thi tùy biến Word/PDF (UC-07)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="15" width="550" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_u" value="Admin / Học viên&#xa;(User)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="40" y="60" width="110" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="CustomTestUI&#xa;(Presentation)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="210" y="60" width="120" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_up" value="FileUploader&#xa;(Component)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#faf5ff;strokeColor=#a855f7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="380" y="60" width="110" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_srv" value="DocParserService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="540" y="60" width="130" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_adp" value="DocParserAdapter&#xa;(Mammoth / PDF.js)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fff1f2;strokeColor=#e11d48;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="720" y="60" width="130" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="900" y="60" width="110" height="770" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: Chọn tệp tải lên (.docx hoặc .pdf)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="95" y="130" as="sourcePoint"/><mxPoint x="270" y="130" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: uploadFile(fileData)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#a855f7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="160" as="sourcePoint"/><mxPoint x="435" y="160" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: validateFormatAndSize(max=20MB)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="435" y="180" as="sourcePoint"/><mxPoint x="435" y="205" as="targetPoint"/><Array as="points"><mxPoint x="470" y="180"/><mxPoint x="470" y="205"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: File Validated OK" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#a855f7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="435" y="225" as="sourcePoint"/><mxPoint x="270" y="225" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m5" value="5: parseExamDocument(fileStream, fileType)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="255" as="sourcePoint"/><mxPoint x="605" y="255" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Alt Frame for Format -->
        <mxCell id="fr_alt" value="alt [Định dạng tệp tin]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=180;height=25;fillColor=none;strokeColor=#64748b;" vertex="1" parent="1">
          <mxGeometry x="510" y="285" width="370" height="150" as="geometry" />
        </mxCell>
        <mxCell id="m6" value="6: [.docx] parseWithMammoth(docxStream)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#e11d48;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="605" y="320" as="sourcePoint"/><mxPoint x="785" y="320" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m7" value="7: Return Raw HTML DOM" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#e11d48;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="785" y="345" as="sourcePoint"/><mxPoint x="605" y="345" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="div_alt" value="[.pdf]" style="line;strokeWidth=1;dashed=1;labelPosition=top;verticalLabelPosition=bottom;align=left;spacingLeft=10;strokeColor=#64748b;" vertex="1" parent="fr_alt">
          <mxGeometry y="80" width="370" height="10" as="geometry" />
        </mxCell>
        <mxCell id="m8" value="8: [.pdf] parseWithPdfJs(pdfStream)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#e11d48;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="605" y="390" as="sourcePoint"/><mxPoint x="785" y="390" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: Return Text Streams &amp; Lines" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#e11d48;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="785" y="415" as="sourcePoint"/><mxPoint x="605" y="415" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Regex Parsing -->
        <mxCell id="m10" value="10: extractStructure(Regex, Questions, Options, Keys)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="605" y="455" as="sourcePoint"/><mxPoint x="605" y="485" as="targetPoint"/><Array as="points"><mxPoint x="645" y="455"/><mxPoint x="645" y="485"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m11" value="11: Return ParsedExamPreviewDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="605" y="515" as="sourcePoint"/><mxPoint x="270" y="515" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m12" value="12: Hiển thị Bản xem trước tương tác (Preview)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="550" as="sourcePoint"/><mxPoint x="95" y="550" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Confirm & Save -->
        <mxCell id="m13" value="13: Hiệu chỉnh câu hỏi &amp; Bấm 'Xác nhận lưu'" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="95" y="590" as="sourcePoint"/><mxPoint x="270" y="590" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m14" value="14: persistExam(customExamDTO)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="625" as="sourcePoint"/><mxPoint x="605" y="625" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m15" value="15: INSERT INTO EXAMS, SECTIONS, QUESTIONS, OPTIONS" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="605" y="660" as="sourcePoint"/><mxPoint x="955" y="660" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m16" value="16: Transaction Committed OK (newExamId)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="955" y="695" as="sourcePoint"/><mxPoint x="605" y="695" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m17" value="17: Return SaveSuccessDTO(examId)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="605" y="730" as="sourcePoint"/><mxPoint x="270" y="730" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m18" value="18: Thông báo nhập đề thành công, sẵn sàng luyện tập" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="760" as="sourcePoint"/><mxPoint x="95" y="760" as="targetPoint"/></mxGeometry>
        </mxCell>'''

# 14. Sequence UC08 Vocab
def get_sequence_uc08_vocab_xml():
    return '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Học Từ Vựng Flashcards &amp; Spaced Repetition (UC-08)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="15" width="550" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_s" value="Học viên&#xa;(Student)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="40" y="60" width="100" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="FlashcardUI&#xa;(Presentation)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="210" y="60" width="120" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_srv" value="VocabService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="400" y="60" width="120" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_sre" value="SREngine&#xa;(Algorithm SM-2)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#faf5ff;strokeColor=#a855f7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="590" y="60" width="130" height="770" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="790" y="60" width="110" height="770" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: Chọn bộ từ (theo chủ đề / cấp độ CEFR)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="90" y="130" as="sourcePoint"/><mxPoint x="270" y="130" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: getStudySessionCards(topicId, userId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="165" as="sourcePoint"/><mxPoint x="460" y="165" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: Query VOCAB_CARDS &amp; USER_VOCAB_PROGRESS" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="460" y="200" as="sourcePoint"/><mxPoint x="845" y="200" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: Trả về danh sách thẻ từ vựng thô" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="845" y="235" as="sourcePoint"/><mxPoint x="460" y="235" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m5" value="5: rankCardsByReviewInterval(cards, stats)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#a855f7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="460" y="270" as="sourcePoint"/><mxPoint x="655" y="270" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m6" value="6: Return SortedCards (Ưu tiên từ sắp quên)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#a855f7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="655" y="300" as="sourcePoint"/><mxPoint x="460" y="300" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m7" value="7: Return StudyCardsDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="460" y="330" as="sourcePoint"/><mxPoint x="270" y="330" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Loop -->
        <mxCell id="fr_loop" value="loop [Học từng thẻ Flashcard trong phiên]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=240;height=25;fillColor=none;strokeColor=#64748b;" vertex="1" parent="1">
          <mxGeometry x="30" y="360" width="840" height="240" as="geometry" />
        </mxCell>
        <mxCell id="m8" value="8: Hiển thị mặt trước (Từ vựng tiếng Anh, Audio)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="395" as="sourcePoint"/><mxPoint x="90" y="395" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: Bấm Lật thẻ (Flip)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="90" y="425" as="sourcePoint"/><mxPoint x="270" y="425" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m10" value="10: Hiển thị mặt sau (Nghĩa, IPA, Ví dụ, CEFR)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="455" as="sourcePoint"/><mxPoint x="90" y="455" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m11" value="11: Đánh giá: Đã nhớ / Cần ôn / Chưa nhớ" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="90" y="490" as="sourcePoint"/><mxPoint x="270" y="490" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m12" value="12: recordCardReview(cardId, memoryLevel)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#a855f7;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="520" as="sourcePoint"/><mxPoint x="655" y="520" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m13" value="13: Tính interval mới &amp; UPDATE next_review_at" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="655" y="550" as="sourcePoint"/><mxPoint x="845" y="550" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m14" value="14: Confirm OK" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="845" y="575" as="sourcePoint"/><mxPoint x="655" y="575" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Summary -->
        <mxCell id="m15" value="15: Hoàn thành phiên học (Finish Session)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="90" y="625" as="sourcePoint"/><mxPoint x="270" y="625" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m16" value="16: getSessionSummary(userId, sessionId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="660" as="sourcePoint"/><mxPoint x="460" y="660" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m17" value="17: Return SummaryDTO (% nhớ, thời gian, từ cần ôn)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="460" y="695" as="sourcePoint"/><mxPoint x="270" y="695" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m18" value="18: Hiển thị Báo cáo tiến độ học từ vựng &amp; Cập nhật Streak" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="730" as="sourcePoint"/><mxPoint x="90" y="730" as="targetPoint"/></mxGeometry>
        </mxCell>'''

new_diagrams = [
    ("activity_uc01_auth.drawio", "Activity_UC01_Auth", get_activity_uc01_auth_xml),
    ("activity_uc02_listening.drawio", "Activity_UC02_Listening", get_activity_uc02_listening_xml),
    ("activity_uc03_reading.drawio", "Activity_UC03_Reading", get_activity_uc03_reading_xml),
    ("activity_uc04_writing.drawio", "Activity_UC04_Writing", get_activity_uc04_writing_xml),
    ("activity_uc05_speaking.drawio", "Activity_UC05_Speaking", get_activity_uc05_speaking_xml),
    ("activity_uc07_custom_test.drawio", "Activity_UC07_Custom_Test", get_activity_uc07_custom_test_xml),
    ("activity_uc08_vocab.drawio", "Activity_UC08_Vocab", get_activity_uc08_vocab_xml),
    ("sequence_uc01_auth.drawio", "Sequence_UC01_Auth", get_sequence_uc01_auth_xml),
    ("sequence_uc02_listening.drawio", "Sequence_UC02_Listening", get_sequence_uc02_listening_xml),
    ("sequence_uc03_reading.drawio", "Sequence_UC03_Reading", get_sequence_uc03_reading_xml),
    ("sequence_uc05_speaking.drawio", "Sequence_UC05_Speaking", get_sequence_uc05_speaking_xml),
    ("sequence_uc06_mock_test.drawio", "Sequence_UC06_Mock_Test", get_sequence_uc06_mock_test_xml),
    ("sequence_uc07_custom_test.drawio", "Sequence_UC07_Custom_Test", get_sequence_uc07_custom_test_xml),
    ("sequence_uc08_vocab.drawio", "Sequence_UC08_Vocab", get_sequence_uc08_vocab_xml)
]

def main():
    # 1. Create the 14 new .drawio files
    for filename, name, func in new_diagrams:
        filepath = os.path.join(DRAWIO_DIR, filename)
        xml_content = wrap_drawio(func(), name)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(xml_content)
        # Test parse
        ET.fromstring(xml_content)
        print(f"✅ Generated & Validated: {filename}")

    # 2. Rebuild the master All-in-One project with ALL 23 DIAGRAMS!
    all_diagram_files = [
        # 9 Core architectural & system diagrams
        "01_use_case_diagram.drawio",
        "02_activity_flow_mock_test.drawio",
        "03_sequence_ai_scoring.drawio",
        "04_state_machine_exam.drawio",
        "05_class_diagram_architecture.drawio",
        "06_database_erd.drawio",
        "07_context_diagram.drawio",
        "08_component_diagram.drawio",
        "09_deployment_diagram.drawio",
        # 7 Detailed Activity diagrams
        "activity_uc01_auth.drawio",
        "activity_uc02_listening.drawio",
        "activity_uc03_reading.drawio",
        "activity_uc04_writing.drawio",
        "activity_uc05_speaking.drawio",
        "activity_uc07_custom_test.drawio",
        "activity_uc08_vocab.drawio",
        # 7 Detailed Sequence diagrams
        "sequence_uc01_auth.drawio",
        "sequence_uc02_listening.drawio",
        "sequence_uc03_reading.drawio",
        "sequence_uc05_speaking.drawio",
        "sequence_uc06_mock_test.drawio",
        "sequence_uc07_custom_test.drawio",
        "sequence_uc08_vocab.drawio"
    ]

    master_file = os.path.join(DRAWIO_DIR, "VSTEP_Master_All_Diagrams.drawio")
    master_root = ET.Element("mxfile", {
        "host": "app.diagrams.net",
        "modified": "2026-09-10T14:30:00.000Z",
        "agent": "5.0",
        "version": "21.6.8",
        "type": "device"
    })

    total_tabs = 0
    for fname in all_diagram_files:
        fpath = os.path.join(DRAWIO_DIR, fname)
        if not os.path.exists(fpath):
            print(f"❌ Missing file: {fpath}")
            continue
        tree = ET.parse(fpath)
        root = tree.getroot()
        for diag in root.findall('diagram'):
            master_root.append(diag)
            total_tabs += 1

    master_tree = ET.ElementTree(master_root)
    ET.indent(master_tree, space="  ", level=0)
    master_tree.write(master_file, encoding="utf-8", xml_declaration=True)
    print(f"\n🎉 Successfully merged all {total_tabs} diagrams into {master_file}!")

if __name__ == "__main__":
    main()
