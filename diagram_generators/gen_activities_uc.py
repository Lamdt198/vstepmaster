from .common import save_diagram

def generate_uc01_auth():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Hoạt động: Đăng nhập &amp;amp; Đăng ký Tài khoản (UC-01)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="550" height="30" as="geometry" />
        </mxCell>

        <!-- Start -->
        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="485" y="70" width="28" height="28" as="geometry" />
        </mxCell>

        <mxCell id="act_access" value="Người dùng truy cập VSTEP Master" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="390" y="125" width="220" height="45" as="geometry" />
        </mxCell>

        <mxCell id="dec_op" value="Chọn thao tác ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#64748b;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="430" y="195" width="140" height="55" as="geometry" />
        </mxCell>

        <!-- Registration Column (Left) -->
        <mxCell id="grp_reg" value="Quy trình Đăng ký (Register Flow)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;startSize=28;align=left;spacingLeft=15;fontColor=#166534;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="60" y="275" width="380" height="360" as="geometry" />
        </mxCell>
        <mxCell id="act_reg_input" value="Nhập Email, Mật khẩu &amp;amp; Xác nhận mật khẩu" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontSize=11;" vertex="1" parent="grp_reg">
          <mxGeometry x="50" y="40" width="280" height="42" as="geometry" />
        </mxCell>
        <mxCell id="act_reg_val" value="Kiểm tra hợp lệ định dạng &amp;amp; độ mạnh mật khẩu" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontSize=11;" vertex="1" parent="grp_reg">
          <mxGeometry x="50" y="105" width="280" height="42" as="geometry" />
        </mxCell>
        <mxCell id="dec_reg_valid" value="Dữ liệu hợp lệ ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontSize=11;" vertex="1" parent="grp_reg">
          <mxGeometry x="120" y="170" width="140" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_reg_err" value="Báo lỗi (Email đã tồn tại / Mật khẩu yếu)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;fontColor=#991b1b;fontSize=11;" vertex="1" parent="grp_reg">
          <mxGeometry x="10" y="245" width="170" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_reg_save" value="Mã hóa BCrypt &amp;amp; Tạo tài khoản mới CSDL" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontStyle=1;fontSize=11;" vertex="1" parent="grp_reg">
          <mxGeometry x="200" y="245" width="170" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_reg_switch" value="Thông báo đăng ký thành công!&#xa;Chuyển sang Đăng nhập" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontSize=11;fontColor=#14532d;" vertex="1" parent="grp_reg">
          <mxGeometry x="80" y="305" width="220" height="45" as="geometry" />
        </mxCell>

        <!-- Login Column (Right) -->
        <mxCell id="grp_login" value="Quy trình Xác thực Đăng nhập (Auth Flow)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;startSize=28;align=left;spacingLeft=15;fontColor=#1e40af;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="490" y="275" width="410" height="360" as="geometry" />
        </mxCell>
        <mxCell id="act_log_input" value="Nhập thông tin Email và Mật khẩu" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#2563eb;fontSize=11;" vertex="1" parent="grp_login">
          <mxGeometry x="75" y="40" width="260" height="42" as="geometry" />
        </mxCell>
        <mxCell id="act_log_check" value="Truy vấn CSDL &amp;amp; Kiểm tra Bcrypt Hash" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#2563eb;fontSize=11;" vertex="1" parent="grp_login">
          <mxGeometry x="75" y="105" width="260" height="42" as="geometry" />
        </mxCell>
        <mxCell id="dec_log_check" value="Xác thực khớp ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dbeafe;strokeColor=#2563eb;fontStyle=1;fontSize=11;" vertex="1" parent="grp_login">
          <mxGeometry x="135" y="170" width="140" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_log_err" value="Báo lỗi sai thông tin đăng nhập" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;fontColor=#991b1b;fontSize=11;" vertex="1" parent="grp_login">
          <mxGeometry x="220" y="245" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_log_token" value="Khởi tạo JWT Token &amp;amp; Lưu Session Storage" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#2563eb;fontStyle=1;fontSize=11;" vertex="1" parent="grp_login">
          <mxGeometry x="10" y="245" width="190" height="45" as="geometry" />
        </mxCell>

        <!-- Role Resolution -->
        <mxCell id="dec_role" value="Phân quyền vai trò ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="425" y="665" width="150" height="55" as="geometry" />
        </mxCell>
        <mxCell id="act_role_admin" value="Cấp quyền Quản trị viên (Admin)&#xa;Quản lý ngân hàng đề &amp;amp; người dùng" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef9c3;strokeColor=#ca8a04;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="240" y="750" width="220" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_role_student" value="Cấp quyền Học viên (Student)&#xa;Luyện 4 kỹ năng &amp;amp; Thi thử trực tuyến" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e0f2fe;strokeColor=#0284c7;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="540" y="750" width="220" height="50" as="geometry" />
        </mxCell>

        <!-- Final Destination -->
        <mxCell id="act_dash" value="Điều hướng người dùng vào Màn hình Dashboard tương ứng" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="320" y="835" width="360" height="45" as="geometry" />
        </mxCell>

        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="486" y="910" width="28" height="28" as="geometry" />
        </mxCell>

        <!-- Edges with clean white label backgrounds -->
        <mxCell id="e1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="act_access"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_access" target="dec_op"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e3" value="Đăng ký" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_op" target="act_reg_input"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e4" value="Đăng nhập" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#2563eb;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_op" target="act_log_input"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="720" y="222"/></Array></mxGeometry></mxCell>
        
        <!-- Registration edges -->
        <mxCell id="e5" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_reg_input" target="act_reg_val"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e6" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_reg_val" target="dec_reg_valid"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e7" value="Không hợp lệ" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_reg_valid" target="act_reg_err"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e8" value="Hợp lệ" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_reg_valid" target="act_reg_save"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e9" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_reg_save" target="act_reg_switch"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e10" value="Nhập lại" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="act_reg_err" target="act_reg_input"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="90" y="520"/><mxPoint x="90" y="336"/></Array></mxGeometry></mxCell>
        <mxCell id="e11" value="Chuyển sang đăng nhập" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#2563eb;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="act_reg_switch" target="act_log_input"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="250" y="650"/><mxPoint x="460" y="650"/><mxPoint x="460" y="336"/></Array></mxGeometry></mxCell>

        <!-- Login edges -->
        <mxCell id="e12" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_log_input" target="act_log_check"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e13" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_log_check" target="dec_log_check"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e14" value="Sai mật khẩu" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_log_check" target="act_log_err"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e15" value="Khớp mật khẩu" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_log_check" target="act_log_token"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e16" value="Thử lại" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="act_log_err" target="act_log_input"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="870" y="542"/><mxPoint x="870" y="336"/></Array></mxGeometry></mxCell>

        <!-- Flow to Role -->
        <mxCell id="e17" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_log_token" target="dec_role"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e18" value="Admin" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#ca8a04;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_role" target="act_role_admin"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e19" value="Student" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#0284c7;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_role" target="act_role_student"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e20" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_role_admin" target="act_dash"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e21" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_role_student" target="act_dash"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e22" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_dash" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''
    save_diagram("activity_uc01_auth.drawio", "Activity_UC01_Auth", xml)

def generate_uc02_listening():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Hoạt động: Luyện tập Kỹ năng Nghe (Listening) (UC-02)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="550" height="30" as="geometry" />
        </mxCell>

        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="485" y="65" width="28" height="28" as="geometry" />
        </mxCell>

        <!-- Phase 1: Setup -->
        <mxCell id="act_select" value="Học viên chọn bộ đề Listening (Chuẩn B1-B2-C1)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="365" y="115" width="270" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_load" value="Hệ thống nạp 3 Parts (35 câu trắc nghiệm) &amp;amp; Khởi tạo Audio Stream" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="325" y="185" width="350" height="45" as="geometry" />
        </mxCell>

        <!-- Phase 2: Playing & Answering Loop -->
        <mxCell id="grp_exam" value="Vòng lặp làm bài từng Phần thi (Part 1 -&amp;gt; Part 2 -&amp;gt; Part 3)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;startSize=28;align=left;spacingLeft=15;fontColor=#166534;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="150" y="255" width="700" height="315" as="geometry" />
        </mxCell>
        <mxCell id="act_play" value="Khởi phát Audio tương ứng Part hiện tại&#xa;(Part 1: 8 câu | Part 2: 12 câu | Part 3: 15 câu)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontSize=11;" vertex="1" parent="grp_exam">
          <mxGeometry x="200" y="40" width="300" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_listen" value="Học viên lắng nghe nội dung hội thoại / bài giảng học thuật" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontSize=11;" vertex="1" parent="grp_exam">
          <mxGeometry x="200" y="110" width="300" height="42" as="geometry" />
        </mxCell>
        <mxCell id="act_choose" value="Chọn đáp án trắc nghiệm (A, B, C, D)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontStyle=1;fontSize=11;" vertex="1" parent="grp_exam">
          <mxGeometry x="80" y="175" width="240" height="42" as="geometry" />
        </mxCell>
        <mxCell id="act_autosave" value="Hệ thống tự động lưu tạm (Auto-save)&#xa;vào LocalStorage sau mỗi câu" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#22c55e;fontSize=11;" vertex="1" parent="grp_exam">
          <mxGeometry x="380" y="175" width="240" height="42" as="geometry" />
        </mxCell>
        <mxCell id="dec_more_part" value="Còn Part tiếp theo ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontSize=11;" vertex="1" parent="grp_exam">
          <mxGeometry x="275" y="245" width="150" height="50" as="geometry" />
        </mxCell>

        <!-- Phase 3: Grading & Analytics -->
        <mxCell id="act_submit" value="Học viên bấm 'Nộp bài thi'" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;fontStyle=1;fontColor=#991b1b;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="400" y="595" width="200" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_compare" value="Đối chiếu đáp án với Answer Key CSDL (&amp;lt;50ms)&#xa;Tính tổng số câu đúng (x/35 câu)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="345" y="665" width="310" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_scale" value="Quy đổi thang điểm 10 chuẩn VSTEP&#xa;(Ví dụ: 25/35 câu = 7.0 điểm ~ Đạt bậc B2)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#d97706;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="330" y="735" width="340" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_result" value="Hiển thị Bảng điểm, Transcript lời thoại &amp;amp; Vị trí câu hỏi chứa manh mối" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="280" y="805" width="440" height="45" as="geometry" />
        </mxCell>

        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="486" y="875" width="28" height="28" as="geometry" />
        </mxCell>

        <!-- Edges with clean white label backgrounds -->
        <mxCell id="le1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="act_select"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_select" target="act_load"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le3" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_load" target="act_play"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le4" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_play" target="act_listen"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le5" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_listen" target="act_choose"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le6" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_choose" target="act_autosave"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le7" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_autosave" target="dec_more_part"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le8" value="Còn phần tiếp" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_more_part" target="act_play"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="180" y="525"/><mxPoint x="180" y="318"/></Array></mxGeometry></mxCell>
        <mxCell id="le9" value="Đã hoàn thành cả 3 phần" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_more_part" target="act_submit"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le10" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_submit" target="act_compare"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le11" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_compare" target="act_scale"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le12" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_scale" target="act_result"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="le13" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_result" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''
    save_diagram("activity_uc02_listening.drawio", "Activity_UC02_Listening", xml)

def generate_uc03_reading():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Hoạt động: Luyện tập Kỹ năng Đọc hiểu (Reading) (UC-03)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="550" height="30" as="geometry" />
        </mxCell>

        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="485" y="65" width="28" height="28" as="geometry" />
        </mxCell>

        <mxCell id="act_select" value="Học viên chọn bộ đề Reading (4 Passages - 40 câu)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="350" y="115" width="300" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_render" value="Hệ thống tải văn bản chia 2 cột: Bài đọc (Trái) &amp;amp; Câu hỏi (Phải)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="320" y="185" width="360" height="45" as="geometry" />
        </mxCell>

        <!-- Reading & Dictionary Interaction Group -->
        <mxCell id="grp_read" value="Khu vực Đọc hiểu &amp;amp; Tra cứu Từ điển tích hợp" style="swimlane;whiteSpace=wrap;html=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;startSize=28;align=left;spacingLeft=15;fontColor=#166534;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="120" y="255" width="760" height="280" as="geometry" />
        </mxCell>
        <mxCell id="act_read_text" value="Đọc nội dung đoạn văn học thuật" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontSize=11;" vertex="1" parent="grp_read">
          <mxGeometry x="40" y="40" width="220" height="42" as="geometry" />
        </mxCell>
        <mxCell id="dec_lookup" value="Gặp từ vựng mới ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontSize=11;" vertex="1" parent="grp_read">
          <mxGeometry x="80" y="110" width="140" height="48" as="geometry" />
        </mxCell>
        <mxCell id="act_popup_dict" value="Bôi đen từ -&amp;gt; Popup tra từ điển CEFR&#xa;(Nghĩa, Phiên âm IPA, Ví dụ)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#faf5ff;strokeColor=#9333ea;fontSize=11;fontColor=#6b21a8;" vertex="1" parent="grp_read">
          <mxGeometry x="30" y="185" width="240" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_answer" value="Trả lời 10 câu hỏi theo từng Passage&#xa;(Main idea, Detail, Vocabulary, Inference)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontStyle=1;fontSize=11;" vertex="1" parent="grp_read">
          <mxGeometry x="460" y="40" width="260" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_save_card" value="Lưu từ vào Flashcard cá nhân (Tùy chọn)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ede9fe;strokeColor=#7c3aed;fontSize=11;" vertex="1" parent="grp_read">
          <mxGeometry x="460" y="115" width="260" height="40" as="geometry" />
        </mxCell>
        <mxCell id="dec_next_pass" value="Còn Passage tiếp theo ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontSize=11;" vertex="1" parent="grp_read">
          <mxGeometry x="515" y="185" width="150" height="50" as="geometry" />
        </mxCell>

        <!-- Final Stage -->
        <mxCell id="act_submit" value="Học viên bấm 'Nộp bài Reading'" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;fontStyle=1;fontColor=#991b1b;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="400" y="565" width="200" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_grade" value="Chấm tự động 40 câu trắc nghiệm &amp;amp; Tính điểm thang 10" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="335" y="635" width="330" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_detail" value="Hiển thị Lời giải chi tiết, Highlight vị trí chứng cứ trong bài đọc &amp;amp; Lưu CSDL" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="270" y="705" width="460" height="45" as="geometry" />
        </mxCell>

        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="486" y="775" width="28" height="28" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="re1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="act_select"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_select" target="act_render"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re3" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_render" target="act_read_text"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re4" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_read_text" target="dec_lookup"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re5" value="Có từ lạ" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;fontColor=#9333ea;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_lookup" target="act_popup_dict"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re6" value="Không" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#64748b;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_lookup" target="act_answer"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re7" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_popup_dict" target="act_save_card"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re8" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_save_card" target="act_answer"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re9" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_answer" target="dec_next_pass"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re10" value="Còn bài đọc" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_next_pass" target="act_read_text"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="730" y="465"/><mxPoint x="730" y="316"/></Array></mxGeometry></mxCell>
        <mxCell id="re11" value="Hết 4 bài đọc" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_next_pass" target="act_submit"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re12" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_submit" target="act_grade"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re13" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_grade" target="act_detail"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="re14" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_detail" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''
    save_diagram("activity_uc03_reading.drawio", "Activity_UC03_Reading", xml)

def generate_uc04_writing():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Hoạt động: Luyện tập Kỹ năng Viết tích hợp Trí tuệ nhân tạo (UC-04)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="550" height="30" as="geometry" />
        </mxCell>

        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="485" y="65" width="28" height="28" as="geometry" />
        </mxCell>

        <mxCell id="dec_task" value="Chọn Task viết ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#64748b;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="430" y="115" width="140" height="50" as="geometry" />
        </mxCell>

        <!-- Task Branching -->
        <mxCell id="act_task1" value="Task 1: Viết Thư / Email tương tác&#xa;(Độ dài tối thiểu: 120 từ)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="240" y="185" width="210" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_task2" value="Task 2: Viết Bài luận học thuật (Essay)&#xa;(Độ dài tối thiểu: 250 từ)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#faf5ff;strokeColor=#9333ea;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="550" y="185" width="210" height="45" as="geometry" />
        </mxCell>

        <!-- Writing Editor Phase -->
        <mxCell id="act_compose" value="Học viên soạn thảo bài viết trong Rich Text Editor" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="360" y="260" width="280" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_wordcount" value="Bộ đếm từ thời gian thực (Real-time Word Count) cập nhật liên tục" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f0fdf4;strokeColor=#22c55e;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="330" y="325" width="340" height="40" as="geometry" />
        </mxCell>
        <mxCell id="act_req_grade" value="Học viên bấm 'Chấm điểm bằng AI'" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="380" y="385" width="240" height="45" as="geometry" />
        </mxCell>

        <!-- Validation -->
        <mxCell id="dec_word_ok" value="Đạt số từ tối thiểu ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="420" y="450" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_warn_len" value="Cảnh báo thiếu độ dài, yêu cầu bổ sung ý" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;fontColor=#991b1b;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="630" y="452" width="220" height="45" as="geometry" />
        </mxCell>

        <!-- AI Engine Phase -->
        <mxCell id="grp_ai" value="Xử lý Chấm điểm Tự động tại AI Engine (Gemini API)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#faf5ff;strokeColor=#9333ea;fontStyle=1;startSize=28;align=left;spacingLeft=15;fontColor=#6b21a8;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="140" y="530" width="720" height="230" as="geometry" />
        </mxCell>
        <mxCell id="act_ai_prompt" value="Đóng gói Payload: Đề bài, Tiêu chí Barem CEFR &amp;amp; Bài làm học viên" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#9333ea;fontSize=11;" vertex="1" parent="grp_ai">
          <mxGeometry x="50" y="40" width="370" height="42" as="geometry" />
        </mxCell>
        <mxCell id="act_ai_call" value="Gửi REST Request sang Gemini Engine&#xa;Phân tích 4 tiêu chí CEFR (2-4s)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ede9fe;strokeColor=#7c3aed;fontStyle=1;fontSize=11;" vertex="1" parent="grp_ai">
          <mxGeometry x="450" y="40" width="240" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_ai_parse" value="Bóc tách kết quả JSON: Điểm 4 tiêu chí (Task, Cohesion, Lexical, Grammar),&#xa;Danh sách lỗi sai gạch chân kèm giải thích ngữ pháp" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#9333ea;fontSize=11;" vertex="1" parent="grp_ai">
          <mxGeometry x="50" y="110" width="640" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_ai_sample" value="Sinh bài viết mẫu chuẩn C1 kèm bộ từ vựng nâng cao (Collocations)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#9333ea;fontStyle=1;fontSize=11;" vertex="1" parent="grp_ai">
          <mxGeometry x="150" y="175" width="440" height="40" as="geometry" />
        </mxCell>

        <!-- Final Display -->
        <mxCell id="act_display_score" value="Hiển thị Thẻ điểm trực quan, highlight lỗi trong bài &amp;amp; Lưu CSDL" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="290" y="785" width="420" height="45" as="geometry" />
        </mxCell>

        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="486" y="855" width="28" height="28" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="we1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="dec_task"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we2" value="Task 1" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#2563eb;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_task" target="act_task1"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we3" value="Task 2" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#9333ea;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_task" target="act_task2"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we4" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_task1" target="act_compose"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we5" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_task2" target="act_compose"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we6" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_compose" target="act_wordcount"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we7" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_wordcount" target="act_req_grade"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we8" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_req_grade" target="dec_word_ok"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we9" value="Chưa đủ từ" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_word_ok" target="act_warn_len"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we10" value="Tiếp tục viết" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="act_warn_len" target="act_compose"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="870" y="475"/><mxPoint x="870" y="282"/></Array></mxGeometry></mxCell>
        <mxCell id="we11" value="Đạt yêu cầu" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_word_ok" target="act_ai_prompt"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we12" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="grp_ai" source="act_ai_prompt" target="act_ai_call"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we13" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="grp_ai" source="act_ai_call" target="act_ai_parse"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we14" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="grp_ai" source="act_ai_parse" target="act_ai_sample"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we15" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_ai_sample" target="act_display_score"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="we16" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_display_score" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''
    save_diagram("activity_uc04_writing.drawio", "Activity_UC04_Writing", xml)

def generate_uc05_speaking():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Hoạt động: Luyện tập Kỹ năng Nói (Speaking) (UC-05)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="550" height="30" as="geometry" />
        </mxCell>

        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="485" y="65" width="28" height="28" as="geometry" />
        </mxCell>

        <mxCell id="act_choose_part" value="Học viên chọn Part thi Nói&#xa;(Part 1: Tương tác XH | Part 2: Thảo luận giải pháp | Part 3: Phát triển chủ đề)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="290" y="115" width="420" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_display_prompt" value="Hiển thị đề bài, câu hỏi định hướng &amp;amp; Dàn ý gợi ý tư duy (Mindmap)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="310" y="185" width="380" height="45" as="geometry" />
        </mxCell>

        <!-- Preparation Timer -->
        <mxCell id="act_prep_timer" value="Đồng hồ đếm ngược thời gian chuẩn bị (1:00 phút)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="350" y="255" width="300" height="40" as="geometry" />
        </mxCell>

        <!-- Recording Group -->
        <mxCell id="grp_record" value="Quá trình Ghi âm trực tiếp (Web MediaRecorder API)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#fff1f2;strokeColor=#f43f5e;fontStyle=1;startSize=26;fontColor=#9f1239;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="180" y="325" width="640" height="205" as="geometry" />
        </mxCell>
        <mxCell id="act_start_rec" value="Bấm 'Bắt đầu ghi âm' -&amp;gt; Khởi tạo Audio Stream Micro" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#f43f5e;fontStyle=1;fontSize=11;" vertex="1" parent="grp_record">
          <mxGeometry x="40" y="40" width="280" height="42" as="geometry" />
        </mxCell>
        <mxCell id="act_recording" value="Đang thu âm: Hiển thị Waveform sóng âm&#xa;&amp;amp; Đếm ngược thời gian nói (1:30 - 2:00 phút)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;fontSize=11;" vertex="1" parent="grp_record">
          <mxGeometry x="350" y="40" width="260" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_stop_rec" value="Hết giờ hoặc học viên bấm 'Dừng ghi âm'" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#f43f5e;fontStyle=1;fontSize=11;" vertex="1" parent="grp_record">
          <mxGeometry x="40" y="115" width="280" height="42" as="geometry" />
        </mxCell>
        <mxCell id="act_audio_blob" value="Đóng Stream &amp;amp; Tạo tệp âm thanh (Audio Blob .webm)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#f43f5e;fontSize=11;" vertex="1" parent="grp_record">
          <mxGeometry x="350" y="115" width="260" height="42" as="geometry" />
        </mxCell>
        <mxCell id="act_playback" value="Cho phép nghe lại bản ghi âm trước khi quyết định gửi đánh giá" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontSize=11;" vertex="1" parent="grp_record">
          <mxGeometry x="140" y="165" width="370" height="32" as="geometry" />
        </mxCell>

        <!-- Evaluation Option -->
        <mxCell id="dec_eval_mode" value="Chọn hình thức chấm ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#64748b;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="420" y="555" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_self_eval" value="Tự đối chiếu với Bảng tiêu chí và Băng ghi âm mẫu" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="160" y="635" width="280" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_ai_eval" value="Gửi audio sang AI Engine phân tích&#xa;(Phát âm, Độ trôi chảy, Từ vựng, Ngữ pháp)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#faf5ff;strokeColor=#9333ea;fontStyle=1;fontSize=11;fontColor=#6b21a8;" vertex="1" parent="1">
          <mxGeometry x="560" y="635" width="280" height="45" as="geometry" />
        </mxCell>

        <!-- Final Report -->
        <mxCell id="act_report" value="Hiển thị Báo cáo Đánh giá Kỹ năng Nói &amp;amp; Lưu bản ghi vào CSDL" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="305" y="715" width="390" height="45" as="geometry" />
        </mxCell>

        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="486" y="785" width="28" height="28" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="se1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="act_choose_part"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_choose_part" target="act_display_prompt"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se3" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_display_prompt" target="act_prep_timer"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se4" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_prep_timer" target="act_start_rec"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se5" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_start_rec" target="act_recording"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se6" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_recording" target="act_stop_rec"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se7" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_stop_rec" target="act_audio_blob"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se8" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_audio_blob" target="act_playback"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se9" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_playback" target="dec_eval_mode"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se10" value="Tự ôn tập" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#64748b;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_eval_mode" target="act_self_eval"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se11" value="Chấm AI" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#9333ea;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_eval_mode" target="act_ai_eval"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se12" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_self_eval" target="act_report"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se13" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_ai_eval" target="act_report"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="se14" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_report" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''
    save_diagram("activity_uc05_speaking.drawio", "Activity_UC05_Speaking", xml)

def generate_uc07_custom_test():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Hoạt động: Bóc tách Đề thi Tùy biến từ tệp Word / PDF (UC-07)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="550" height="30" as="geometry" />
        </mxCell>

        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="485" y="65" width="28" height="28" as="geometry" />
        </mxCell>

        <mxCell id="act_upload" value="Người dùng tải lên tệp đề thi (.docx hoặc .pdf) từ máy tính" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="320" y="115" width="360" height="45" as="geometry" />
        </mxCell>

        <mxCell id="dec_ext" value="Kiểm tra định dạng tệp ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#64748b;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="410" y="185" width="180" height="50" as="geometry" />
        </mxCell>

        <!-- Parsing Adapters -->
        <mxCell id="act_docx" value="Khởi chạy Mammoth.js Adapter&#xa;Chuyển đổi Word XML sang Clean HTML DOM" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#2563eb;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="190" y="260" width="260" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_pdf" value="Khởi chạy PDF.js Adapter&#xa;Trích xuất luồng Text và tọa độ các khối câu hỏi" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#dc2626;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="550" y="260" width="260" height="45" as="geometry" />
        </mxCell>

        <!-- NLP Heuristic Parsing -->
        <mxCell id="act_heuristic" value="Bộ phân tích Heuristic Regex &amp;amp; NLP&#xa;Nhận diện: Tiêu đề, Hướng dẫn, Bài đọc, Danh sách câu hỏi (1-40) &amp;amp; Đáp án (A,B,C,D)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#faf5ff;strokeColor=#9333ea;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="250" y="335" width="500" height="45" as="geometry" />
        </mxCell>

        <!-- Live Preview & Edit -->
        <mxCell id="act_preview" value="Hiển thị Giao diện Xem trước đề thi &amp;amp; Cho phép sửa trực tiếp (Live Preview)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="270" y="410" width="460" height="45" as="geometry" />
        </mxCell>

        <mxCell id="dec_confirm" value="Người dùng xác nhận ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="420" y="485" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="act_edit_manual" value="Chỉnh sửa thủ công câu hỏi / đáp án bị nhận diện thiếu" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="640" y="488" width="260" height="45" as="geometry" />
        </mxCell>

        <!-- Save DB -->
        <mxCell id="act_save_db" value="Đóng gói JSON Schema hợp chuẩn VSTEP&#xa;&amp;amp; Lưu vào CSDL (Bảng EXAMS, SECTIONS, QUESTIONS)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="315" y="565" width="370" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_success" value="Thông báo nhập đề thành công! Bộ đề sẵn sàng để thi thử" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="305" y="635" width="390" height="45" as="geometry" />
        </mxCell>

        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="486" y="705" width="28" height="28" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="ce1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="act_upload"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_upload" target="dec_ext"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce3" value="Tệp .docx" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#2563eb;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_ext" target="act_docx"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce4" value="Tệp .pdf" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#dc2626;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_ext" target="act_pdf"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce5" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_docx" target="act_heuristic"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce6" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_pdf" target="act_heuristic"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce7" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_heuristic" target="act_preview"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce8" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_preview" target="dec_confirm"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce9" value="Cần sửa" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;fontColor=#d97706;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_confirm" target="act_edit_manual"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce10" value="Cập nhật" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="act_edit_manual" target="act_preview"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="920" y="510"/><mxPoint x="920" y="432"/></Array></mxGeometry></mxCell>
        <mxCell id="ce11" value="Đồng ý lưu" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_confirm" target="act_save_db"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce12" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_save_db" target="act_success"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ce13" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_success" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''
    save_diagram("activity_uc07_custom_test.drawio", "Activity_UC07_Custom_Test", xml)

def generate_uc08_vocab():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Hoạt động: Học Từ vựng Flashcards &amp;amp; Lặp lại ngắt quãng (UC-08)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="550" height="30" as="geometry" />
        </mxCell>

        <mxCell id="start" value="" style="ellipse;fillColor=#000000;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="485" y="65" width="28" height="28" as="geometry" />
        </mxCell>

        <mxCell id="act_select_deck" value="Học viên chọn bộ từ vựng theo chủ đề hoặc cấp độ CEFR (B1, B2, C1)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="290" y="115" width="420" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_load_queue" value="Hệ thống truy vấn CSDL &amp;amp; Sắp xếp danh sách thẻ theo thuật toán Spaced Repetition" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8fafc;strokeColor=#64748b;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="270" y="185" width="460" height="45" as="geometry" />
        </mxCell>

        <!-- Card Review Loop -->
        <mxCell id="grp_card" value="Vòng lặp Luyện tập Flashcard 3D" style="swimlane;whiteSpace=wrap;html=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;startSize=28;align=left;spacingLeft=15;fontColor=#166534;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="150" y="255" width="700" height="250" as="geometry" />
        </mxCell>
        <mxCell id="act_front" value="Hiển thị Mặt trước Flashcard: Từ tiếng Anh, Từ loại &amp;amp; Nút nghe phát âm" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontSize=11;" vertex="1" parent="grp_card">
          <mxGeometry x="150" y="40" width="400" height="42" as="geometry" />
        </mxCell>
        <mxCell id="act_flip" value="Học viên bấm Lật thẻ (3D Flip Card Animation)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#22c55e;fontStyle=1;fontSize=11;" vertex="1" parent="grp_card">
          <mxGeometry x="210" y="100" width="280" height="40" as="geometry" />
        </mxCell>
        <mxCell id="act_back" value="Hiển thị Mặt sau: Định nghĩa tiếng Việt, Phiên âm IPA, Ví dụ minh họa &amp;amp; Collocations" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#16a34a;fontSize=11;" vertex="1" parent="grp_card">
          <mxGeometry x="110" y="160" width="480" height="42" as="geometry" />
        </mxCell>

        <!-- Evaluation -->
        <mxCell id="act_rate" value="Học viên đánh giá mức độ nhớ: [Chưa nhớ] - [Khó] - [Tốt] - [Dễ]" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="310" y="530" width="380" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act_sm2" value="Thuật toán SM-2 cập nhật Interval (Khoảng cách ôn) &amp;amp; Ease Factor vào CSDL" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#d97706;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="270" y="600" width="460" height="45" as="geometry" />
        </mxCell>

        <mxCell id="dec_more_cards" value="Còn từ cần ôn tập ?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="420" y="670" width="160" height="50" as="geometry" />
        </mxCell>

        <!-- Summary -->
        <mxCell id="act_stats" value="Hiển thị Báo cáo Tổng kết Buổi học: Tỷ lệ nhớ, Thời gian &amp;amp; Danh sách từ cần ôn" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontStyle=1;fontColor=#14532d;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="270" y="745" width="460" height="45" as="geometry" />
        </mxCell>

        <mxCell id="end" value="" style="ellipse;shape=endState;fillColor=#000000;strokeColor=#ff0000;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="486" y="815" width="28" height="28" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="ve1" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="start" target="act_select_deck"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve2" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_select_deck" target="act_load_queue"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve3" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_load_queue" target="act_front"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve4" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="grp_card" source="act_front" target="act_flip"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve5" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="grp_card" source="act_flip" target="act_back"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve6" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_back" target="act_rate"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve7" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_rate" target="act_sm2"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve8" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_sm2" target="dec_more_cards"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve9" value="Còn từ" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;fontColor=#16a34a;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_more_cards" target="act_front"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="180" y="695"/><mxPoint x="180" y="318"/></Array></mxGeometry></mxCell>
        <mxCell id="ve10" value="Hoàn thành bộ từ" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;fontColor=#2563eb;fontStyle=1;labelBackgroundColor=#ffffff;spacing=2;" edge="1" parent="1" source="dec_more_cards" target="act_stats"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="ve11" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;" edge="1" parent="1" source="act_stats" target="end"><mxGeometry relative="1" as="geometry" /></mxCell>'''
    save_diagram("activity_uc08_vocab.drawio", "Activity_UC08_Vocab", xml)

def generate_all():
    generate_uc01_auth()
    generate_uc02_listening()
    generate_uc03_reading()
    generate_uc04_writing()
    generate_uc05_speaking()
    generate_uc07_custom_test()
    generate_uc08_vocab()

if __name__ == '__main__':
    generate_all()
