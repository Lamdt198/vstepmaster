import os
import textwrap
from PIL import Image, ImageDraw, ImageFont

def get_font(size, bold=False, italic=False):
    if bold and italic:
        f = "C:\\Windows\\Fonts\\segoeuiz.ttf"
    elif bold:
        f = "C:\\Windows\\Fonts\\segoeuib.ttf"
    elif italic:
        f = "C:\\Windows\\Fonts\\segoeuii.ttf"
    else:
        f = "C:\\Windows\\Fonts\\segoeui.ttf"
    if os.path.exists(f):
        try:
            return ImageFont.truetype(f, size)
        except Exception:
            pass
    return ImageFont.load_default()

def draw_header(draw, title, subtitle="", timer=None):
    # Top navbar
    draw.rectangle([0, 0, 1280, 60], fill="#FFFFFF", outline="#E2E8F0", width=1)
    
    # Logo
    draw.rounded_rectangle([24, 12, 60, 48], radius=8, fill="#2563EB")
    draw.text((34, 16), "M", fill="#FFFFFF", font=get_font(22, bold=True))
    draw.text((70, 17), "VSTEP Master", fill="#2563EB", font=get_font(20, bold=True))
    draw.text((215, 20), "|", fill="#CBD5E1", font=get_font(18))
    draw.text((230, 19), title, fill="#1E293B", font=get_font(17, bold=True))
    
    if subtitle:
        draw.text((760, 21), subtitle, fill="#64748B", font=get_font(13))
        
    if timer:
        # Timer box
        draw.rounded_rectangle([1080, 12, 1250, 48], radius=6, fill="#FEF2F2", outline="#EF4444", width=1)
        draw.text((1100, 17), f"Thời gian: {timer}", fill="#DC2626", font=get_font(15, bold=True))

# 1. LOGIN PAGE
def create_login_mockup(output_path):
    img = Image.new("RGB", (1280, 720), "#F0F4F8")
    draw = ImageDraw.Draw(img)

    draw.ellipse([80, 60, 320, 300], fill="#E2E8F0", outline=None)
    draw.ellipse([1000, 450, 1220, 670], fill="#E2E8F0", outline=None)

    cx1, cy1, cx2, cy2 = 410, 70, 870, 650
    draw.rounded_rectangle([cx1, cy1, cx2, cy2], radius=16, fill="#FFFFFF", outline="#E2E8F0", width=1)

    draw.rounded_rectangle([610, 95, 670, 155], radius=12, fill="#2563EB")
    draw.text((626, 102), "M", fill="#FFFFFF", font=get_font(34, bold=True))
    
    draw.text((540, 170), "VSTEP Master", fill="#0F172A", font=get_font(24, bold=True))
    draw.text((545, 202), "Luyện thi VSTEP B1 - B2 - C1 Chuẩn Bộ GD&ĐT", fill="#64748B", font=get_font(12))

    draw.line([440, 260, 840, 260], fill="#E2E8F0", width=2)
    draw.line([440, 260, 630, 260], fill="#2563EB", width=3)
    draw.text((490, 235), "Đăng nhập", fill="#2563EB", font=get_font(15, bold=True))
    draw.text((680, 235), "Đăng ký tài khoản", fill="#64748B", font=get_font(15))

    draw.text((440, 280), "Tên đăng nhập / Email", fill="#334155", font=get_font(12, bold=True))
    draw.rounded_rectangle([440, 302, 840, 342], radius=6, fill="#F8FAFC", outline="#CBD5E1", width=1)
    draw.text((455, 312), "student_vstep@gmail.com", fill="#0F172A", font=get_font(13))

    draw.text((440, 355), "Mật khẩu", fill="#334155", font=get_font(12, bold=True))
    draw.rounded_rectangle([440, 377, 840, 417], radius=6, fill="#F8FAFC", outline="#CBD5E1", width=1)
    draw.text((455, 387), "••••••••••••", fill="#0F172A", font=get_font(13))

    draw.rounded_rectangle([440, 435, 840, 480], radius=6, fill="#2563EB")
    draw.text((600, 447), "Đăng nhập", fill="#FFFFFF", font=get_font(15, bold=True))

    draw.text((550, 498), "Đăng nhập nhanh để trải nghiệm:", fill="#64748B", font=get_font(11))
    draw.rounded_rectangle([440, 520, 630, 555], radius=6, fill="#F1F5F9", outline="#CBD5E1", width=1)
    draw.text((465, 528), "Học viên (User)", fill="#1E293B", font=get_font(12, bold=True))
    
    draw.rounded_rectangle([650, 520, 840, 555], radius=6, fill="#F1F5F9", outline="#CBD5E1", width=1)
    draw.text((675, 528), "Quản trị (Admin)", fill="#1E293B", font=get_font(12, bold=True))

    draw.line([440, 580, 840, 580], fill="#E2E8F0", width=1)
    draw.rectangle([605, 572, 675, 588], fill="#FFFFFF")
    draw.text((615, 572), "HOẶC SSO", fill="#94A3B8", font=get_font(10, bold=True))

    draw.rounded_rectangle([440, 595, 840, 635], radius=6, fill="#EFF6FF", outline="#BFDBFE", width=1)
    draw.text((545, 606), "Đăng nhập với Keycloak (SSO OAuth2)", fill="#1D4ED8", font=get_font(12, bold=True))

    img.save(output_path, "PNG")
    print(f"Generated {output_path}")

# 2. DASHBOARD
def create_dashboard_mockup(output_path):
    img = Image.new("RGB", (1280, 720), "#F8FAFC")
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, 1280, 60], fill="#FFFFFF", outline="#E2E8F0", width=1)
    draw.rounded_rectangle([24, 12, 60, 48], radius=8, fill="#2563EB")
    draw.text((34, 16), "M", fill="#FFFFFF", font=get_font(22, bold=True))
    draw.text((70, 17), "VSTEP Master", fill="#2563EB", font=get_font(20, bold=True))
    draw.text((215, 20), "|", fill="#CBD5E1", font=get_font(18))
    draw.text((230, 19), "Bảng điều khiển Cá nhân (Dashboard)", fill="#1E293B", font=get_font(17, bold=True))
    
    draw.rounded_rectangle([1020, 12, 1256, 48], radius=18, fill="#F1F5F9", outline="#E2E8F0", width=1)
    draw.ellipse([1026, 16, 1054, 44], fill="#2563EB")
    draw.text((1034, 19), "A", fill="#FFFFFF", font=get_font(14, bold=True))
    draw.text((1065, 20), "Nguyễn Văn An", fill="#0F172A", font=get_font(13, bold=True))

    draw.rectangle([0, 60, 220, 720], fill="#FFFFFF", outline="#E2E8F0", width=1)
    nav_items = [
        ("Trang chủ", True),
        ("Listening", False),
        ("Reading", False),
        ("Writing (AI)", False),
        ("Speaking", False),
        ("Thi thử VSTEP", False),
        ("Tự tạo đề thi", False),
        ("Từ vựng & Flashcards", False),
        ("Thống kê tiến độ", False),
        ("Cài đặt hệ thống", False),
    ]
    ny = 80
    for text, is_active in nav_items:
        if is_active:
            draw.rounded_rectangle([12, ny, 208, ny + 38], radius=6, fill="#EFF6FF")
            draw.text((24, ny + 9), text, fill="#2563EB", font=get_font(13, bold=True))
        else:
            draw.text((24, ny + 9), text, fill="#475569", font=get_font(13))
        ny += 44

    draw.text((244, 80), "Chào mừng, Nguyễn Văn An!", fill="#0F172A", font=get_font(22, bold=True))
    draw.text((244, 110), "Hôm nay bạn muốn luyện tập kỹ năng nào? Mục tiêu: Đạt chuẩn B2 VSTEP (6.0 - 8.0/10)", fill="#64748B", font=get_font(13))

    skills_data = [
        ("Luyện Nghe (Listening)", "72%", "Hoàn thành 14/20 bài", 0.72, "#2563EB"),
        ("Luyện Đọc (Reading)", "65%", "Hoàn thành 18/28 bài", 0.65, "#10B981"),
        ("Luyện Viết (Writing AI)", "48%", "Hoàn thành 8/16 bài", 0.48, "#8B5CF6"),
        ("Luyện Nói (Speaking)", "54%", "Hoàn thành 10/18 bài", 0.54, "#F59E0B"),
    ]
    card_w = 236
    card_h = 145
    for i, (name, pct_str, subtitle, pct, color) in enumerate(skills_data):
        cx = 244 + i * (card_w + 16)
        cy = 140
        draw.rounded_rectangle([cx, cy, cx + card_w, cy + card_h], radius=8, fill="#FFFFFF", outline="#E2E8F0", width=1)
        draw.text((cx + 16, cy + 16), name, fill="#1E293B", font=get_font(14, bold=True))
        
        circ_x, circ_y = cx + 80, cy + 50
        draw.ellipse([circ_x, circ_y, circ_x + 60, circ_y + 60], outline="#E2E8F0", width=6)
        draw.arc([circ_x, circ_y, circ_x + 60, circ_y + 60], start=-90, end=int(-90 + 360 * pct), fill=color, width=6)
        draw.text((circ_x + 14, circ_y + 20), pct_str, fill=color, font=get_font(14, bold=True))
        
        draw.text((cx + 35, cy + 118), subtitle, fill="#64748B", font=get_font(11))

    draw.rounded_rectangle([244, 305, 930, 695], radius=8, fill="#FFFFFF", outline="#E2E8F0", width=1)
    draw.text((264, 325), "Lịch sử Điểm Thi Thử VSTEP Toàn Diện (Năm 2026)", fill="#0F172A", font=get_font(15, bold=True))
    draw.text((264, 348), "Quy đổi thang điểm 10 chuẩn Bộ GD&ĐT (Điểm đạt chuẩn B2 >= 6.0, C1 >= 8.5)", fill="#64748B", font=get_font(11))

    chart_x1, chart_y1, chart_x2, chart_y2 = 300, 390, 890, 620
    for score_val in [10.0, 8.0, 6.0, 4.0]:
        y_pos = chart_y2 - int((score_val / 10.0) * (chart_y2 - chart_y1))
        draw.line([chart_x1, y_pos, chart_x2, y_pos], fill="#F1F5F9", width=1)
        draw.text((chart_x1 - 32, y_pos - 8), f"{score_val:.1f}", fill="#94A3B8", font=get_font(11))

    tests = [
        ("VSTEP #1\n12/08/2026", 6.5, "#3B82F6"),
        ("VSTEP #2\n19/08/2026", 8.0, "#2563EB"),
        ("VSTEP #3\n26/08/2026", 7.5, "#3B82F6"),
        ("VSTEP #4\n02/09/2026", 8.5, "#1D4ED8"),
        ("VSTEP #5\n09/09/2026", 9.0, "#1E40AF"),
    ]
    bar_w = 54
    spacing = (chart_x2 - chart_x1 - len(tests) * bar_w) // (len(tests) + 1)
    for idx, (label, score, col) in enumerate(tests):
        bx = chart_x1 + spacing + idx * (bar_w + spacing)
        bh = int((score / 10.0) * (chart_y2 - chart_y1))
        by = chart_y2 - bh
        draw.rounded_rectangle([bx, by, bx + bar_w, chart_y2], radius=4, fill=col)
        draw.text((bx + 16, by - 22), f"{score:.1f}", fill=col, font=get_font(12, bold=True))
        
        lines = label.split("\n")
        draw.text((bx - 2, chart_y2 + 8), lines[0], fill="#1E293B", font=get_font(11, bold=True))
        draw.text((bx - 8, chart_y2 + 24), lines[1], fill="#64748B", font=get_font(10))

    draw.rounded_rectangle([950, 305, 1256, 695], radius=8, fill="#FFFFFF", outline="#E2E8F0", width=1)
    draw.text((970, 325), "Hành Động Nhanh (Quick Actions)", fill="#0F172A", font=get_font(14, bold=True))
    
    actions = [
        ("Làm đề Thi Thử (Full 180p)", True, "#2563EB", "#FFFFFF"),
        ("Tự tạo đề từ Word / PDF", False, "#F8FAFC", "#0F172A"),
        ("Luyện Viết với AI Chấm", False, "#F8FAFC", "#0F172A"),
        ("Học Từ vựng Flashcards", False, "#F8FAFC", "#0F172A"),
        ("Xem Thống kê & Bảng điểm", False, "#F8FAFC", "#0F172A"),
    ]
    ay = 365
    for act_name, is_pri, bg_col, txt_col in actions:
        bd = "#2563EB" if is_pri else "#CBD5E1"
        draw.rounded_rectangle([970, ay, 1236, ay + 48], radius=6, fill=bg_col, outline=bd, width=1)
        draw.text((990, ay + 14), act_name, fill=txt_col, font=get_font(12, bold=True))
        ay += 62

    img.save(output_path, "PNG")
    print(f"Generated {output_path}")

# 3. LISTENING & READING (SPLIT VIEW)
def create_listening_reading_mockup(output_path):
    img = Image.new("RGB", (1280, 720), "#F8FAFC")
    draw = ImageDraw.Draw(img)

    draw_header(draw, "Luyện tập Kỹ năng Nghe (Listening Practice) - Đề 03", timer="24:15")

    draw.rounded_rectangle([24, 80, 720, 690], radius=8, fill="#FFFFFF", outline="#E2E8F0", width=1)

    draw.rounded_rectangle([44, 100, 700, 185], radius=6, fill="#EFF6FF", outline="#BFDBFE", width=1)
    draw.rounded_rectangle([60, 115, 115, 170], radius=6, fill="#2563EB")
    draw.polygon([(82, 130), (82, 155), (102, 142)], fill="#FFFFFF")
    
    draw.text((130, 120), "Part 1: 8 Short Conversations (Audio Track 01)", fill="#1E40AF", font=get_font(13, bold=True))
    draw.rounded_rectangle([130, 145, 580, 153], radius=4, fill="#CBD5E1")
    draw.rounded_rectangle([130, 145, 330, 153], radius=4, fill="#2563EB")
    draw.ellipse([325, 142, 337, 156], fill="#1D4ED8")
    draw.text((600, 140), "0:45 / 3:12", fill="#475569", font=get_font(12))

    draw.text((130, 162), "Tốc độ phát:", fill="#64748B", font=get_font(11))
    for s_idx, s_val in enumerate(["0.75x", "1.0x (Chuẩn)", "1.25x"]):
        sx = 205 + s_idx * 85
        s_bg = "#2563EB" if "1.0x" in s_val else "#FFFFFF"
        s_fg = "#FFFFFF" if "1.0x" in s_val else "#475569"
        draw.rounded_rectangle([sx, 160, sx + 75, 178], radius=4, fill=s_bg, outline="#CBD5E1", width=1)
        draw.text((sx + 8, 162), s_val, fill=s_fg, font=get_font(10, bold=True))

    draw.text((44, 205), "Bản ghi âm hội thoại (English Transcript):", fill="#0F172A", font=get_font(14, bold=True))
    draw.rounded_rectangle([44, 230, 700, 665], radius=6, fill="#F8FAFC", outline="#CBD5E1", width=1)
    
    transcript_text = (
        "Conversation 1:\n"
        "Man: Excuse me, could you tell me where the nearest underground station is?\n"
        "Woman: Sure. Go straight ahead until you see the traffic lights, then turn left onto\n"
        "King Street. The entrance is right next to the municipal library.\n"
        "Man: Thank you very much. Is it within walking distance?\n"
        "Woman: Yes, absolutely. It should take no more than five minutes.\n\n"
        "Conversation 2:\n"
        "Woman: Did you manage to finalize the quarterly expenditure report for the board meeting?\n"
        "Man: Almost done. I am just waiting for the marketing department to submit their\n"
        "final promotional expense invoices before submitting everything to the Director.\n"
        "Woman: Excellent. Please make sure it reaches my desk by three o'clock this afternoon.\n\n"
        "Conversation 3:\n"
        "Man: Good afternoon, Doctor's office. How may I assist you today?\n"
        "Woman: Hello, I would like to reschedule my dental checkup previously set for Thursday morning..."
    )
    ty = 245
    for t_line in transcript_text.split("\n"):
        if t_line.startswith("Conversation"):
            draw.text((60, ty), t_line, fill="#2563EB", font=get_font(13, bold=True))
        else:
            draw.text((60, ty), t_line, fill="#1E293B", font=get_font(12))
        ty += 20

    draw.rounded_rectangle([740, 80, 1256, 690], radius=8, fill="#FFFFFF", outline="#E2E8F0", width=1)
    draw.text((760, 100), "CÂU HỎI TRẮC NGHIỆM (CÂU 12 / 35)", fill="#0F172A", font=get_font(15, bold=True))
    draw.text((760, 128), "Where does the woman advise the man to find the underground station?", fill="#1E40AF", font=get_font(13, bold=True))

    q_options = [
        ("A", "Opposite the central railway station", False),
        ("B", "Directly adjacent to the municipal library", True),
        ("C", "Across the road from the grocery market", False),
        ("D", "Inside the shopping mall on King Street", False),
    ]
    qy = 175
    for lbl, opt_desc, is_correct in q_options:
        box_bg = "#EFF6FF" if is_correct else "#FFFFFF"
        box_bd = "#2563EB" if is_correct else "#E2E8F0"
        draw.rounded_rectangle([760, qy, 1236, qy + 55], radius=6, fill=box_bg, outline=box_bd, width=1)
        draw.ellipse([775, qy + 17, 795, qy + 37], outline=box_bd, width=2)
        if is_correct:
            draw.ellipse([780, qy + 22, 790, qy + 32], fill="#2563EB")
        draw.text((810, qy + 12), f"{lbl}. {opt_desc}", fill="#0F172A", font=get_font(12, bold=is_correct))
        if is_correct:
            draw.text((1140, qy + 18), "[Đã chọn]", fill="#1D4ED8", font=get_font(11, bold=True))
        qy += 70

    draw.rounded_rectangle([760, 480, 1236, 595], radius=6, fill="#F0FDF4", outline="#86EFAC", width=1)
    draw.text((775, 492), "Phân tích đáp án & Giải thích chi tiết:", fill="#166534", font=get_font(12, bold=True))
    draw.text((775, 516), "• Key clue trong audio: 'The entrance is right next to the municipal library.'", fill="#15803D", font=get_font(11))
    draw.text((775, 538), "• Cụm từ 'right next to' đồng nghĩa chính xác với 'directly adjacent to' (Đáp án B).", fill="#15803D", font=get_font(11))
    draw.text((775, 560), "• Bẫy từ vựng: King Street là tên đường rẽ vào, không phải vị trí ga tàu.", fill="#166534", font=get_font(11))

    draw.rounded_rectangle([760, 625, 880, 665], radius=6, fill="#F1F5F9", outline="#CBD5E1", width=1)
    draw.text((790, 637), "← Câu trước", fill="#475569", font=get_font(13, bold=True))

    draw.rounded_rectangle([1116, 625, 1236, 665], radius=6, fill="#2563EB")
    draw.text((1145, 637), "Câu sau →", fill="#FFFFFF", font=get_font(13, bold=True))

    img.save(output_path, "PNG")
    print(f"Generated {output_path}")

# 4. WRITING AI
def create_writing_mockup(output_path):
    img = Image.new("RGB", (1280, 720), "#F8FAFC")
    draw = ImageDraw.Draw(img)
    
    draw_header(draw, "Luyện Viết (Writing) - Task 1: Thư / Email", timer="18:45")
    
    # Left Column: Editor (width 680)
    draw.rounded_rectangle([24, 80, 720, 690], radius=8, fill="#FFFFFF", outline="#E2E8F0", width=1)
    
    # Prompt area
    draw.rounded_rectangle([44, 100, 700, 210], radius=6, fill="#EFF6FF", outline="#BFDBFE", width=1)
    draw.text((56, 112), "ĐỀ BÀI TASK 1 (Viết thư trang trọng / Formal Letter):", fill="#1E40AF", font=get_font(14, bold=True))
    prompt_text = (
        "You recently received a scholarship offer from an international university.\n"
        "Write a letter to the Scholarship Committee to:\n"
        "- Express your sincere gratitude for the opportunity\n"
        "- Inquire about details regarding accommodation and visa sponsorship\n"
        "- Confirm your acceptance of the offer before the stated deadline"
    )
    y = 136
    for line in prompt_text.split("\n"):
        draw.text((56, y), line, fill="#1E293B", font=get_font(13))
        y += 20
        
    # Text Editor Area
    draw.rectangle([44, 230, 700, 620], fill="#FFFFFF", outline="#CBD5E1", width=1)
    # Editor toolbar
    draw.rectangle([44, 230, 700, 265], fill="#F1F5F9")
    draw.text((56, 238), "B   I   U   |   Định dạng: Đoạn văn   |   Chèn liên kết   |   Hoàn tác", fill="#475569", font=get_font(12))
    
    essay_text = (
        "Dear Scholarship Committee,\n\n"
        "I am writing this letter to formally express my deepest gratitude for awarding me the prestigious\n"
        "Global Excellence Scholarship for the upcoming academic year 2026-2027.\n\n"
        "I am thrilled and honored to have been selected among many competent applicants. In order to\n"
        "make timely arrangements, could you please provide further details regarding university\n"
        "accommodation and the procedure for student visa sponsorship? I would appreciate knowing\n"
        "the key milestones so that I can prepare all supporting financial documents accordingly.\n\n"
        "I would like to reaffirm my enthusiastic acceptance of this valuable scholarship offer..."
    )
    y = 280
    for line in essay_text.split("\n"):
        draw.text((56, y), line, fill="#0F172A", font=get_font(13))
        y += 20
        
    # Status bar
    draw.text((44, 645), "Số từ: 168 từ (Đạt yêu cầu 150-180 từ)", fill="#16A34A", font=get_font(13, bold=True))
    draw.rounded_rectangle([540, 635, 700, 675], radius=6, fill="#2563EB")
    draw.text((565, 645), "AI Chấm điểm", fill="#FFFFFF", font=get_font(14, bold=True))
    
    # Right Column: AI Scorecard (width 500)
    draw.rounded_rectangle([740, 80, 1256, 690], radius=8, fill="#FFFFFF", outline="#E2E8F0", width=1)
    
    # Score Header
    draw.rounded_rectangle([760, 100, 1236, 175], radius=6, fill="#FAF5FF", outline="#D8B4FE", width=1)
    draw.text((780, 115), "KẾT QUẢ PHÂN TÍCH AI (GEMINI ENGINE)", fill="#6B21A8", font=get_font(14, bold=True))
    draw.text((780, 140), "Điểm tổng kết: 8.0 / 10.0   |   Xếp bậc: B2 CEFR (Chuẩn đầu ra ThS)", fill="#7E22CE", font=get_font(13, bold=True))
    
    # 4 Rubric Bars
    rubrics = [
        ("Task Fulfillment (Hoàn thành yêu cầu):", "8.5 / 10", 0.85, "#10B981"),
        ("Organization & Cohesion (Bố cục mạch lạc):", "8.0 / 10", 0.80, "#3B82F6"),
        ("Lexical Resource (Vốn từ vựng học thuật):", "7.5 / 10", 0.75, "#F59E0B"),
        ("Grammatical Accuracy (Độ chuẩn ngữ pháp):", "8.0 / 10", 0.80, "#6366F1"),
    ]
    y = 195
    for title, score, pct, col in rubrics:
        draw.text((760, y), title, fill="#334155", font=get_font(12, bold=True))
        draw.text((1160, y), score, fill=col, font=get_font(12, bold=True))
        # Bar background
        draw.rounded_rectangle([760, y+18, 1236, y+26], radius=4, fill="#E2E8F0")
        # Bar foreground
        draw.rounded_rectangle([760, y+18, 760 + int(476 * pct), y+26], radius=4, fill=col)
        y += 42
        
    # Feedback & Grammar errors
    draw.text((760, 375), "Nhận xét sửa lỗi ngữ pháp & Gợi ý nâng cao:", fill="#0F172A", font=get_font(13, bold=True))
    
    feedback_box_y = 405
    # Error item 1
    draw.rounded_rectangle([760, feedback_box_y, 1236, feedback_box_y + 70], radius=6, fill="#FEF2F2", outline="#FECACA", width=1)
    draw.text((775, feedback_box_y + 10), "Lỗi Collocation: 'make timely arrangements'", fill="#DC2626", font=get_font(12, bold=True))
    draw.text((775, feedback_box_y + 35), "Gợi ý viết lại: 'make appropriate preparations' hoặc 'take necessary steps'", fill="#475569", font=get_font(12))
    
    # Error item 2
    feedback_box_y += 85
    draw.rounded_rectangle([760, feedback_box_y, 1236, feedback_box_y + 70], radius=6, fill="#F0FDF4", outline="#BBF7D0", width=1)
    draw.text((775, feedback_box_y + 10), "Điểm sáng Từ vựng: 'prestigious', 'competent applicants', 'milestones'", fill="#16A34A", font=get_font(12, bold=True))
    draw.text((775, feedback_box_y + 35), "Đánh giá: Thể hiện vốn từ học thuật B2-C1 phong phú, văn phong trang trọng chuẩn xác.", fill="#475569", font=get_font(12))
    
    # Sample link
    draw.rounded_rectangle([760, 635, 1236, 675], radius=6, fill="#F8FAFC", outline="#94A3B8", width=1)
    draw.text((910, 645), "Xem bài viết mẫu đạt chuẩn C1 VSTEP", fill="#2563EB", font=get_font(13, bold=True))
    
    img.save(output_path, "PNG")
    print(f"Generated {output_path}")

def create_mock_test_mockup(output_path):
    img = Image.new("RGB", (1280, 720), "#0F172A")  # Professional dark room theme or slate
    draw = ImageDraw.Draw(img)
    
    # Top bar
    draw.rectangle([0, 0, 1280, 56], fill="#1E293B")
    draw.text((24, 16), "VSTEP MASTER | PHÒNG THI MÔ PHỎNG CHUẨN BỘ GD&ĐT", fill="#38BDF8", font=get_font(16, bold=True))
    draw.text((600, 16), "Thí sinh: Nguyễn Văn An (SBD: VSTEP-2026-089)", fill="#94A3B8", font=get_font(14))
    
    # Big Countdown Timer Box
    draw.rounded_rectangle([1060, 8, 1256, 48], radius=6, fill="#DC2626")
    draw.text((1080, 14), "Thời gian: 142:15", fill="#FFFFFF", font=get_font(16, bold=True))
    
    # Main content card
    draw.rectangle([0, 56, 1280, 720], fill="#F1F5F9")
    
    # Skill Tabs
    skills = [
        ("KỸ NĂNG 1: LISTENING (40 phút)", False, 40, 260),
        ("KỸ NĂNG 2: READING (60 phút)", True, 270, 520),
        ("KỸ NĂNG 3: WRITING (60 phút)", False, 530, 760),
        ("KỸ NĂNG 4: SPEAKING (12 phút)", False, 770, 990),
    ]
    for name, is_active, x1, x2 in skills:
        bg = "#FFFFFF" if is_active else "#E2E8F0"
        col = "#2563EB" if is_active else "#64748B"
        draw.rectangle([x1, 66, x2, 100], fill=bg)
        if is_active:
            draw.rectangle([x1, 66, x2, 70], fill="#2563EB")
        draw.text((x1 + 15, 75), name, fill=col, font=get_font(12, bold=True))
        
    # Split view: Passage (Left 580) vs Questions (Right 640)
    # Left: Passage
    draw.rounded_rectangle([24, 110, 600, 640], radius=6, fill="#FFFFFF", outline="#CBD5E1", width=1)
    draw.text((44, 125), "PASSAGE 2: ARTIFICIAL INTELLIGENCE IN EDUCATION", fill="#1E3A8A", font=get_font(15, bold=True))
    passage = (
        "The integration of artificial intelligence into higher education has ushered in\n"
        "an era of adaptive pedagogy. Educational platforms leverage sophisticated machine\n"
        "learning models to assess student linguistic capabilities, pinpoint conceptual gaps,\n"
        "and tailor practice material in real time.\n\n"
        "Advocates argue that automated evaluation democratizes access to standardized test\n"
        "preparation. Traditionally, formative feedback on argumentative essays required hours\n"
        "of manual grading by certified instructors. With natural language processing, candidates\n"
        "receive near-instantaneous diagnostics regarding grammatical accuracy and lexical diversity.\n\n"
        "Nevertheless, skeptics question whether neural networks can truly comprehend nuanced\n"
        "rhetoric or cultural context. While algorithms excel at flagging syntax discrepancies, assessing\n"
        "the depth of critical thought remains an intricate challenge..."
    )
    y = 160
    for line in passage.split("\n"):
        draw.text((44, y), line, fill="#1E293B", font=get_font(13))
        y += 22
        
    # Right: Questions & Options
    draw.rounded_rectangle([620, 110, 1000, 640], radius=6, fill="#FFFFFF", outline="#CBD5E1", width=1)
    draw.text((640, 125), "Câu hỏi 14 / 40:", fill="#0F172A", font=get_font(15, bold=True))
    draw.text((640, 150), "According to paragraph 2, what is the main", fill="#334155", font=get_font(13, bold=True))
    draw.text((640, 172), "advantage of automated evaluation?", fill="#334155", font=get_font(13, bold=True))
    
    options = [
        ("A", "It completely eliminates the necessity for human professors in universities.", False),
        ("B", "It provides rapid, accessible feedback on syntax and vocabulary diversity.", True),
        ("C", "It guarantees that all candidates achieve C1 proficiency on their first attempt.", False),
        ("D", "It restricts test preparation materials exclusively to advanced learners.", False)
    ]
    y = 210
    for opt_label, opt_text, selected in options:
        box_bg = "#EFF6FF" if selected else "#FFFFFF"
        box_bd = "#2563EB" if selected else "#E2E8F0"
        draw.rounded_rectangle([640, y, 980, y + 54], radius=6, fill=box_bg, outline=box_bd, width=1)
        # Radio circle
        draw.ellipse([655, y + 17, 675, y + 37], outline=box_bd, width=2)
        if selected:
            draw.ellipse([660, y + 22, 670, y + 32], fill="#2563EB")
        lines = textwrap.wrap(f"{opt_label}. {opt_text}", width=40)
        if len(lines) > 1:
            draw.text((690, y + 8), lines[0], fill="#0F172A", font=get_font(12, bold=selected))
            draw.text((690, y + 27), "    " + lines[1], fill="#0F172A", font=get_font(11, bold=selected))
        else:
            draw.text((690, y + 16), lines[0], fill="#0F172A", font=get_font(12, bold=selected))
        y += 66
        
    # Question Palette (Rightmost 240px)
    draw.rounded_rectangle([1020, 110, 1256, 640], radius=6, fill="#FFFFFF", outline="#CBD5E1", width=1)
    draw.text((1035, 125), "BẢNG MA TRẬN CÂU HỎI", fill="#0F172A", font=get_font(13, bold=True))
    draw.text((1035, 145), "Đã làm: 28/40 câu  |  Chưa: 12", fill="#64748B", font=get_font(11))
    
    # 40 question grid (5 columns x 8 rows)
    grid_x = 1035
    grid_y = 175
    for i in range(1, 41):
        col_idx = (i - 1) % 5
        row_idx = (i - 1) // 5
        bx = grid_x + col_idx * 42
        by = grid_y + row_idx * 34
        
        # Color coding: Green = answered, Blue = current, White = unanswered
        if i == 14:
            c_fill, c_txt = "#2563EB", "#FFFFFF"
        elif i <= 28:
            c_fill, c_txt = "#DCFCE7", "#166534"
        else:
            c_fill, c_txt = "#F1F5F9", "#64748B"
            
        draw.rounded_rectangle([bx, by, bx + 36, by + 28], radius=4, fill=c_fill, outline="#CBD5E1", width=1)
        draw.text((bx + (10 if i < 10 else 6), by + 6), str(i), fill=c_txt, font=get_font(11, bold=True))
        
    # Action buttons at bottom
    draw.rounded_rectangle([1035, 500, 1240, 540], radius=6, fill="#EF4444")
    draw.text((1075, 510), "NỘP BÀI THI", fill="#FFFFFF", font=get_font(14, bold=True))
    
    draw.text((1035, 560), "• Tự động lưu LocalStorage: OK\n• Mã hóa bài thi: SHA-256\n• Khóa tab trình duyệt: Active", fill="#64748B", font=get_font(11))
    
    img.save(output_path, "PNG")
    print(f"Generated {output_path}")

def create_custom_test_mockup(output_path):
    img = Image.new("RGB", (1280, 720), "#F8FAFC")
    draw = ImageDraw.Draw(img)
    
    # FIXED: Clean header with NO overlapping text
    draw_header(draw, "Tự tạo đề thi (Custom Test) - Bóc tách tệp Word / PDF", subtitle="Tự động nhận diện cấu trúc VSTEP")
    
    # Left: Upload Drag & Drop Zone (Width 460)
    draw.rounded_rectangle([24, 80, 480, 690], radius=8, fill="#FFFFFF", outline="#E2E8F0", width=1)
    draw.text((44, 100), "1. Tải lên tệp đề thi nguồn (.docx / .pdf)", fill="#0F172A", font=get_font(15, bold=True))
    
    # Drop zone box
    draw.rounded_rectangle([44, 135, 460, 310], radius=8, fill="#EFF6FF", outline="#3B82F6", width=2)
    draw.text((150, 180), "KÉO THẢ TỆP VÀO ĐÂY", fill="#1D4ED8", font=get_font(16, bold=True))
    draw.text((135, 210), "hoặc nhấn để duyệt tệp từ máy tính", fill="#64748B", font=get_font(13))
    draw.text((120, 245), "Hỗ trợ: Word (.docx), Adobe PDF (.pdf) <= 15MB", fill="#94A3B8", font=get_font(11))
    
    # Parsed File Info
    draw.text((44, 335), "Tệp vừa xử lý thành công:", fill="#1E293B", font=get_font(13, bold=True))
    draw.rounded_rectangle([44, 360, 460, 440], radius=6, fill="#F0FDF4", outline="#86EFAC", width=1)
    draw.text((60, 375), "Đề_thi_thử_VSTEP_B2_ĐHQG_Hà_Nội_2026.docx", fill="#166534", font=get_font(12, bold=True))
    draw.text((60, 400), "Dung lượng: 2.4 MB  |  Trạng thái: Bóc tách thành công (100%)", fill="#15803D", font=get_font(11))
    draw.text((60, 418), "Kết quả: 40 câu trắc nghiệm + 4 bài đọc + 2 đề tự luận", fill="#166534", font=get_font(11))
    
    # Parser statistics
    draw.text((44, 465), "Thông số kỹ thuật bộ bóc tách:", fill="#0F172A", font=get_font(13, bold=True))
    params = [
        ("Engine bóc tách .docx:", "Mammoth.js (Trích xuất nguyên vẹn định dạng)"),
        ("Engine bóc tách .pdf:", "PDF.js Core (Xử lý chuỗi nhị phân)"),
        ("Thuật toán nhận diện A-B-C-D:", "Regex Pattern: ^(Câu|Question)\\s*\\d+"),
        ("Tốc độ xử lý trung bình:", "1.2 giây / đề thi hoàn chỉnh"),
    ]
    y = 495
    for k, v in params:
        draw.text((44, y), k, fill="#475569", font=get_font(11, bold=True))
        draw.text((220, y), v, fill="#0F172A", font=get_font(11))
        y += 28
        
    # Start button
    draw.rounded_rectangle([44, 625, 460, 670], radius=6, fill="#2563EB")
    draw.text((150, 638), "BẮT ĐẦU THI ĐỀ NÀY NGAY", fill="#FFFFFF", font=get_font(15, bold=True))
    
    # Right: Preview Parsed Questions (Width 760)
    draw.rounded_rectangle([504, 80, 1256, 690], radius=8, fill="#FFFFFF", outline="#E2E8F0", width=1)
    draw.text((524, 100), "2. Xem trước & Hiệu chỉnh kết quả bóc tách (Preview & Edit)", fill="#0F172A", font=get_font(15, bold=True))
    draw.text((524, 125), "Bạn có thể chỉnh sửa nội dung câu hỏi hoặc đáp án trước khi lưu vào ngân hàng đề thi:", fill="#64748B", font=get_font(12))
    
    # Preview Item 1
    y_card = 155
    draw.rounded_rectangle([524, y_card, 1236, y_card + 155], radius=6, fill="#F8FAFC", outline="#CBD5E1", width=1)
    draw.text((540, y_card + 10), "Câu 1: [Multiple Choice] (Nhận diện tự động: Tin cậy 99%)", fill="#2563EB", font=get_font(12, bold=True))
    draw.text((540, y_card + 32), "The rapid expansion of metropolitan areas has caused significant ______ on urban infrastructure.", fill="#0F172A", font=get_font(13))
    
    opts1 = [
        ("A. strain", True), ("B. tense", False), ("C. stressor", False), ("D. pull", False)
    ]
    ox = 540
    for opt_t, is_ans in opts1:
        c_bg = "#DCFCE7" if is_ans else "#FFFFFF"
        c_bd = "#22C55E" if is_ans else "#CBD5E1"
        draw.rounded_rectangle([ox, y_card + 65, ox + 160, y_card + 100], radius=4, fill=c_bg, outline=c_bd, width=1)
        draw.text((ox + 10, y_card + 73), opt_t + (" [Đáp án]" if is_ans else ""), fill="#0F172A", font=get_font(11, bold=is_ans))
        ox += 172
    draw.text((540, y_card + 115), "Giải thích bóc tách: 'strain' là danh từ ghép chuẩn collocate với 'on urban infrastructure'.", fill="#64748B", font=get_font(11, italic=True))
    
    # Preview Item 2 (FIXED: 2 rows so options fit comfortably without cutoff)
    y_card = 330
    draw.rounded_rectangle([524, y_card, 1236, y_card + 155], radius=6, fill="#F8FAFC", outline="#CBD5E1", width=1)
    draw.text((540, y_card + 10), "Câu 2: [Multiple Choice] (Nhận diện tự động: Tin cậy 98%)", fill="#2563EB", font=get_font(12, bold=True))
    draw.text((540, y_card + 32), "Had the committee known about the financial discrepancy, they ______ the project immediately.", fill="#0F172A", font=get_font(13))
    
    opts2 = [
        ("A. will suspend", False),
        ("B. would have suspended [Đáp án]", True),
        ("C. would suspend", False),
        ("D. suspended", False)
    ]
    for idx, (opt_t, is_ans) in enumerate(opts2):
        row = idx // 2
        col = idx % 2
        ox = 540 + col * 350
        oy = y_card + 62 + row * 36
        c_bg = "#DCFCE7" if is_ans else "#FFFFFF"
        c_bd = "#22C55E" if is_ans else "#CBD5E1"
        draw.rounded_rectangle([ox, oy, ox + 330, oy + 30], radius=4, fill=c_bg, outline=c_bd, width=1)
        draw.text((ox + 12, oy + 6), opt_t, fill="#0F172A", font=get_font(11, bold=is_ans))
        
    draw.text((540, y_card + 135), "Giải thích bóc tách: Cấu trúc đảo ngữ câu điều kiện loại 3 (Had + S + V3/ed, S + would have V3/ed).", fill="#64748B", font=get_font(11, italic=True))
    
    # Summary & Save buttons at bottom
    draw.text((524, 520), "Hiển thị 2 / 40 câu hỏi. Toàn bộ câu hỏi đã được tự động chuẩn hóa định dạng JSON.", fill="#64748B", font=get_font(12))
    draw.rounded_rectangle([524, 550, 760, 595], radius=6, fill="#059669")
    draw.text((560, 562), "Lưu vào Ngân hàng Đề thi", fill="#FFFFFF", font=get_font(13, bold=True))
    draw.rounded_rectangle([780, 550, 980, 595], radius=6, fill="#FFFFFF", outline="#CBD5E1", width=1)
    draw.text((815, 562), "Xuất tệp JSON chuẩn", fill="#334155", font=get_font(13, bold=True))
    
    img.save(output_path, "PNG")
    print(f"Generated {output_path}")

# 7. ADMIN MANAGEMENT PORTAL
def create_admin_mockup(output_path):
    img = Image.new("RGB", (1280, 720), "#F1F5F9")
    draw = ImageDraw.Draw(img)

    # 1. Dark Navy Sidebar (0 to 240)
    draw.rectangle([0, 0, 240, 720], fill="#0F172A")

    # Logo + Title
    draw.rounded_rectangle([20, 16, 56, 52], radius=8, fill="#2563EB")
    draw.text((29, 21), "M", fill="#FFFFFF", font=get_font(22, bold=True))
    draw.text((68, 18), "VSTEP Master", fill="#FFFFFF", font=get_font(17, bold=True))
    draw.text((68, 38), "ADMIN PORTAL", fill="#38BDF8", font=get_font(10, bold=True))

    draw.line([0, 68, 240, 68], fill="#1E293B", width=1)

    # Menu items
    draw.text((20, 85), "ĐIỀU HÀNH HỆ THỐNG", fill="#64748B", font=get_font(10, bold=True))

    menu_items = [
        ("Dashboard Tổng quan", False, None),
        ("Ngân hàng Đề thi", True, "128"),
        ("Duyệt Đề bóc tách", False, "5 mới"),
        ("Quản lý Học viên", False, None),
        ("Cấu hình AI & Rubric", False, None),
        ("Nhật ký & Bảo mật", False, "Alert"),
        ("Báo cáo & Phổ điểm", False, None),
    ]

    my = 110
    for label, active, badge in menu_items:
        if active:
            draw.rounded_rectangle([12, my, 228, my + 38], radius=6, fill="#2563EB")
            draw.text((24, my + 9), label, fill="#FFFFFF", font=get_font(13, bold=True))
        else:
            draw.text((24, my + 9), label, fill="#94A3B8", font=get_font(13))
            
        if badge:
            badge_color = "#EF4444" if ("mới" in badge or "Alert" in badge) else "#3B82F6"
            bx = 180 if len(badge) <= 3 else 165
            draw.rounded_rectangle([bx, my + 8, 218, my + 28], radius=10, fill=badge_color)
            draw.text((bx + 7, my + 10), badge, fill="#FFFFFF", font=get_font(10, bold=True))
        my += 44

    # Admin profile at bottom of sidebar
    draw.line([0, 640, 240, 640], fill="#1E293B", width=1)
    draw.rounded_rectangle([16, 652, 54, 690], radius=19, fill="#334155")
    draw.text((27, 660), "AD", fill="#38BDF8", font=get_font(13, bold=True))
    draw.text((64, 655), "Admin Quản trị viên", fill="#FFFFFF", font=get_font(12, bold=True))
    draw.text((64, 672), "Quyền: SuperAdmin", fill="#10B981", font=get_font(11))

    # 2. Top Header Bar (240 to 1280, height 60)
    draw.rectangle([240, 0, 1280, 60], fill="#FFFFFF", outline="#E2E8F0", width=1)
    draw.text((265, 18), "Trung tâm Quản trị & Điều hành Hệ thống VSTEP Master", fill="#0F172A", font=get_font(17, bold=True))
    
    # Status Pill
    draw.rounded_rectangle([860, 14, 1070, 46], radius=16, fill="#ECFDF5", outline="#10B981", width=1)
    draw.ellipse([872, 26, 882, 36], fill="#10B981")
    draw.text((890, 21), "AI Engine: Sẵn sàng (99.8%)", fill="#065F46", font=get_font(11, bold=True))

    draw.rounded_rectangle([1085, 14, 1255, 46], radius=6, fill="#2563EB")
    draw.text((1102, 21), "+ Thêm Đề thi Mới", fill="#FFFFFF", font=get_font(12, bold=True))

    # 3. Four Metric Cards (x=260, y=75, w=235 each, h=85)
    cards = [
        ("TỔNG SỐ HỌC VIÊN", "12,450", "+142 tài khoản tuần này", "#2563EB", "#EFF6FF", "#BFDBFE"),
        ("ĐỀ THI HOẠT ĐỘNG", "128 bộ đề", "Listening, Reading, Writing, Speaking", "#059669", "#F0FDF4", "#BBF7D0"),
        ("ĐỀ BÓC TÁCH CHỜ DUYỆT", "05 bộ đề", "Cần kiểm duyệt đối soát nội dung", "#D97706", "#FFFBEB", "#FDE68A"),
        ("LƯỢT CHẤM AI HÔM NAY", "1,842 lượt", "Hạn ngạch tiêu thụ: 92.1%", "#7C3AED", "#FAF5FF", "#DDD6FE")
    ]
    cx = 260
    for title, val, sub, txt_color, bg_color, bd_color in cards:
        draw.rounded_rectangle([cx, 75, cx + 235, 160], radius=8, fill=bg_color, outline=bd_color, width=1)
        draw.text((cx + 14, 85), title, fill="#64748B", font=get_font(10, bold=True))
        draw.text((cx + 14, 102), val, fill=txt_color, font=get_font(22, bold=True))
        draw.text((cx + 14, 136), sub, fill="#475569", font=get_font(10))
        cx += 248

    # 4. Main Table: Quản lý Đề thi & Hàng đợi Kiểm duyệt Bóc tách (x=260, y=175, w=995, h=330)
    draw.rounded_rectangle([260, 175, 1255, 505], radius=8, fill="#FFFFFF", outline="#E2E8F0", width=1)
    
    # Table Header Bar
    draw.text((280, 190), "Ngân hàng Đề thi & Hàng đợi Kiểm duyệt Đề Bóc tách (Document Parser)", fill="#0F172A", font=get_font(14, bold=True))
    draw.text((840, 192), "Bộ lọc: Tất cả | Chờ duyệt (5) | Đã phát hành (128)", fill="#64748B", font=get_font(11))
    draw.line([260, 218, 1255, 218], fill="#E2E8F0", width=1)

    # Column Titles (Fixed column positions to prevent overlap)
    headers = [
        (275, "Mã đề"),
        (395, "Tên bộ đề thi"),
        (650, "Kỹ năng"),
        (785, "Nguồn bóc tách"),
        (940, "Trạng thái"),
        (1055, "Thao tác nghiệp vụ")
    ]
    draw.rectangle([260, 219, 1255, 248], fill="#F8FAFC")
    for hx, ht in headers:
        draw.text((hx, 226), ht, fill="#475569", font=get_font(11, bold=True))
    draw.line([260, 248, 1255, 248], fill="#E2E8F0", width=1)

    # Rows
    rows = [
        ("DT-VSTEP-2026-01", "Đề thi Chuẩn VSTEP 4 Kỹ năng (Bộ GD&ĐT)", "Full 4 Kỹ năng", "Biên soạn nội bộ", "ĐÃ DUYỆT", "#10B981", ["Xem", "Sửa", "Khóa"]),
        ("PARSE-DOCX-09", "Đề Luyện Đọc Chuyên sâu B2-C1 ĐH Ngoại Ngữ", "Reading (40 câu)", "Tệp Word (.docx) [98%]", "CHỜ DUYỆT", "#F59E0B", ["Phê duyệt", "Đối soát", "Từ chối"]),
        ("PARSE-PDF-14", "Bộ đề Luyện Nghe VSTEP Master Test 03", "Listening (35 câu)", "Tệp PDF (.pdf) [95%]", "CHỜ DUYỆT", "#F59E0B", ["Phê duyệt", "Đối soát", "Từ chối"]),
        ("DT-WRITING-T2", "Ngân hàng 50 Đề Viết luận Học thuật Task 2", "Writing (Task 1+2)", "Hội đồng chuyên môn", "ĐÃ DUYỆT", "#10B981", ["Xem", "Sửa", "Khóa"]),
        ("PARSE-DOCX-12", "Đề thi Thử VSTEP Tổng hợp Tháng 09/2026", "Full Test (4 kỹ năng)", "Tệp Word (.docx) [99%]", "CHỜ DUYỆT", "#F59E0B", ["Phê duyệt", "Đối soát", "Từ chối"]),
        ("DT-SPEAKING-P1", "Ngân hàng 60 Chủ đề Nói Tương tác Part 1-3", "Speaking (Part 1-3)", "Giảng viên bản ngữ", "ĐÃ DUYỆT", "#10B981", ["Xem", "Sửa", "Khóa"]),
    ]

    ry = 252
    for r_code, r_name, r_skill, r_src, r_status, r_stcolor, r_actions in rows:
        draw.line([260, ry + 38, 1255, ry + 38], fill="#F1F5F9", width=1)
        draw.text((275, ry + 10), r_code, fill="#2563EB", font=get_font(11, bold=True))
        draw.text((395, ry + 10), r_name, fill="#0F172A", font=get_font(11))
        draw.text((650, ry + 10), r_skill, fill="#475569", font=get_font(11))
        draw.text((785, ry + 10), r_src, fill="#64748B", font=get_font(11))
        
        # Status badge
        s_bg = "#ECFDF5" if r_status == "ĐÃ DUYỆT" else "#FFFBEB"
        draw.rounded_rectangle([940, ry + 7, 1025, ry + 29], radius=4, fill=s_bg, outline=r_stcolor, width=1)
        draw.text((950, ry + 10), r_status, fill=r_stcolor, font=get_font(10, bold=True))
        
        # Action buttons
        ax = 1055
        for act in r_actions:
            if act == "Phê duyệt":
                draw.rounded_rectangle([ax, ry + 6, ax + 58, ry + 30], radius=4, fill="#10B981")
                draw.text((ax + 7, ry + 9), act, fill="#FFFFFF", font=get_font(10, bold=True))
                ax += 63
            elif act == "Đối soát":
                draw.rounded_rectangle([ax, ry + 6, ax + 50, ry + 30], radius=4, fill="#2563EB")
                draw.text((ax + 8, ry + 9), act, fill="#FFFFFF", font=get_font(10, bold=True))
                ax += 55
            elif act == "Từ chối":
                draw.rounded_rectangle([ax, ry + 6, ax + 46, ry + 30], radius=4, fill="#EF4444")
                draw.text((ax + 6, ry + 9), act, fill="#FFFFFF", font=get_font(10, bold=True))
                ax += 51
            else:
                draw.rounded_rectangle([ax, ry + 6, ax + 36, ry + 30], radius=4, fill="#F1F5F9", outline="#CBD5E1", width=1)
                draw.text((ax + 6, ry + 9), act, fill="#334155", font=get_font(10))
                ax += 42
        ry += 42

    # 5. Bottom Two Cards (y=520, h=185)
    # Left Card: Cấu hình Tham số AI Engine & Barem Rubric (w=570)
    draw.rounded_rectangle([260, 520, 840, 705], radius=8, fill="#FFFFFF", outline="#E2E8F0", width=1)
    draw.text((280, 532), "CẤU HÌNH THAM SỐ AI ENGINE & BAREM RUBRIC CEFR", fill="#0F172A", font=get_font(12, bold=True))
    draw.line([260, 555, 840, 555], fill="#E2E8F0", width=1)

    draw.text((280, 565), "• Mô hình Trí tuệ Nhân tạo:", fill="#475569", font=get_font(11, bold=True))
    draw.text((450, 565), "Google Gemini 1.5 Pro (Temperature: 0.2, Top-P: 0.95, Max Tokens: 2048)", fill="#0F172A", font=get_font(11))
    
    draw.text((280, 590), "• Trọng số Rubric Chấm luận:", fill="#475569", font=get_font(11, bold=True))
    draw.text((450, 590), "Task Fulfillment: 25% | Coherence: 25% | Lexical: 25% | Grammar: 25%", fill="#2563EB", font=get_font(11, bold=True))

    draw.text((280, 615), "• System Prompt Template:", fill="#475569", font=get_font(11, bold=True))
    draw.text((450, 615), "You are a certified senior VSTEP examiner evaluating according to MOET Decision 729...", fill="#64748B", font=get_font(10, italic=True))

    draw.text((280, 640), "• Quản lý API Quota & Latency:", fill="#475569", font=get_font(11, bold=True))
    draw.text((450, 640), "Hạn mức: 2,000 req/ngày (Đã dùng: 1,842) | Thời gian phản hồi: 1.85s", fill="#059669", font=get_font(11))

    draw.rounded_rectangle([280, 665, 430, 695], radius=5, fill="#2563EB")
    draw.text((298, 672), "Lưu Cấu hình AI", fill="#FFFFFF", font=get_font(11, bold=True))
    draw.rounded_rectangle([445, 665, 595, 695], radius=5, fill="#F1F5F9", outline="#CBD5E1", width=1)
    draw.text((465, 672), "Kiểm tra Kết nối API", fill="#334155", font=get_font(11, bold=True))

    # Right Card: Giám sát Gian lận & Phân quyền RBAC (w=400)
    draw.rounded_rectangle([855, 520, 1255, 705], radius=8, fill="#FFFFFF", outline="#E2E8F0", width=1)
    draw.text((875, 532), "GIÁM SÁT GIAN LẬN & PHÂN QUYỀN HỌC VIÊN (RBAC)", fill="#0F172A", font=get_font(12, bold=True))
    draw.line([855, 555, 1255, 555], fill="#E2E8F0", width=1)

    logs = [
        ("15:38:02", "Khóa tạm TK hv_nguyen22: Chuyển tab > 5 lần trong Mock Test", "#EF4444"),
        ("14:12:45", "Cảnh báo tải API: Lưu lượng đạt 85% ngưỡng giới hạn / phút", "#F59E0B"),
        ("12:05:11", "Phê duyệt đề bóc tách: DOCX-PARSE-07 đưa vào ngân hàng đề", "#10B981"),
        ("09:40:30", "Đồng bộ 15 học viên mới đăng ký từ Cổng đào tạo Đại học", "#2563EB")
    ]
    ly = 565
    for l_time, l_desc, l_color in logs:
        draw.ellipse([875, ly + 3, 881, ly + 9], fill=l_color)
        draw.text((888, ly), l_time, fill="#64748B", font=get_font(10, bold=True))
        draw.text((940, ly), l_desc[:46] + ("..." if len(l_desc) > 46 else ""), fill="#1E293B", font=get_font(10))
        ly += 25

    draw.rounded_rectangle([875, 665, 1025, 695], radius=5, fill="#F1F5F9", outline="#CBD5E1", width=1)
    draw.text((890, 672), "Quản lý Tài khoản (12,450)", fill="#334155", font=get_font(10, bold=True))
    draw.rounded_rectangle([1040, 665, 1235, 695], radius=5, fill="#FEE2E2", outline="#EF4444", width=1)
    draw.text((1055, 672), "Xem Nhật ký Bảo mật Chi tiết", fill="#DC2626", font=get_font(10, bold=True))

    img.save(output_path, "PNG")
    print(f"Generated {output_path}")

if __name__ == "__main__":
    out_dir = r"c:\Users\Hi\Downloads\CNPM Nang cao\diagrams\images"
    create_login_mockup(os.path.join(out_dir, "ui_login_page.png"))
    create_dashboard_mockup(os.path.join(out_dir, "ui_dashboard.png"))
    create_listening_reading_mockup(os.path.join(out_dir, "ui_listening_reading.png"))
    create_writing_mockup(os.path.join(out_dir, "ui_writing_ai.png"))
    create_mock_test_mockup(os.path.join(out_dir, "ui_mock_test.png"))
    create_custom_test_mockup(os.path.join(out_dir, "ui_custom_test.png"))
    create_admin_mockup(os.path.join(out_dir, "ui_admin_portal.png"))
    print("All 7 UI mockups generated cleanly and perfectly!")

