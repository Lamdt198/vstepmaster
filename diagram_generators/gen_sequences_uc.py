from .common import save_diagram

def generate_uc01_auth():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Đăng nhập &amp;amp; Xác thực Người dùng (UC-01)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=15;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="15" width="500" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_cand" value="Học viên&#xa;(Candidate)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="60" y="60" width="110" height="660" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="Giao diện Đăng nhập&#xa;(AuthUI)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="270" y="60" width="130" height="660" as="geometry" />
        </mxCell>
        <mxCell id="ll_service" value="AuthService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="490" y="60" width="130" height="660" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="720" y="60" width="120" height="660" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: submitLogin(email, password)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="115" y="130" as="sourcePoint"/><mxPoint x="335" y="130" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: validateInputFormat(email, password)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="335" y="160" as="sourcePoint"/><mxPoint x="335" y="190" as="targetPoint"/><Array as="points"><mxPoint x="375" y="160"/><mxPoint x="375" y="190"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: login(credentials)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="335" y="220" as="sourcePoint"/><mxPoint x="555" y="220" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: findByEmail(email)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="555" y="255" as="sourcePoint"/><mxPoint x="780" y="255" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m5" value="5: return UserRecord (với Bcrypt Hash)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="780" y="290" as="sourcePoint"/><mxPoint x="555" y="290" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Frame alt [Xac thuc thanh cong] -->
        <mxCell id="f_alt" value="alt [Xác thực thành công (Bcrypt match)]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=250;height=22;fillColor=none;strokeColor=#64748b;pointerEvents=0;" vertex="1" parent="1">
          <mxGeometry x="40" y="325" width="820" height="215" as="geometry" />
        </mxCell>
        <mxCell id="m6" value="6: verifyBcrypt(password, hash) &amp;amp; generateToken(user)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="555" y="360" as="sourcePoint"/><mxPoint x="555" y="390" as="targetPoint"/><Array as="points"><mxPoint x="595" y="360"/><mxPoint x="595" y="390"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m7" value="7: return AuthResponseDTO (JWT Token, UserProfile)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="555" y="420" as="sourcePoint"/><mxPoint x="335" y="420" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m8" value="8: saveSession(token) vào LocalStorage" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="335" y="450" as="sourcePoint"/><mxPoint x="335" y="480" as="targetPoint"/><Array as="points"><mxPoint x="375" y="450"/><mxPoint x="375" y="480"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: redirectToDashboard(role)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="335" y="510" as="sourcePoint"/><mxPoint x="115" y="510" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Frame else [Xac thuc that bai] -->
        <mxCell id="f_else" value="[else: Mật khẩu sai hoặc không tìm thấy tài khoản]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=290;height=22;fillColor=none;strokeColor=#ef4444;strokeWidth=1;dashed=1;pointerEvents=0;" vertex="1" parent="1">
          <mxGeometry x="40" y="545" width="820" height="120" as="geometry" />
        </mxCell>
        <mxCell id="m10" value="10: 401 Unauthorized (Invalid Credentials)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#ef4444;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="555" y="585" as="sourcePoint"/><mxPoint x="335" y="585" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m11" value="11: displayErrorMessage(&quot;Sai email hoặc mật khẩu&quot;)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#ef4444;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="335" y="625" as="sourcePoint"/><mxPoint x="115" y="625" as="targetPoint"/></mxGeometry>
        </mxCell>'''
    save_diagram("sequence_uc01_auth.drawio", "Sequence_UC01_Auth", xml)

def generate_uc02_listening():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Luyện tập Kỹ năng Nghe &amp;amp; Chấm điểm Trắc nghiệm (UC-02)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=15;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="15" width="550" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_cand" value="Học viên&#xa;(Candidate)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="50" y="60" width="100" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="ListeningUI&#xa;(Presentation)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="230" y="60" width="120" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_audio" value="AudioPlayer&#xa;(HTML5 Audio)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f8fafc;strokeColor=#64748b;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="420" y="60" width="110" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_service" value="ExamService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="600" y="60" width="120" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="790" y="60" width="110" height="740" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: selectListeningExam(examId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="125" as="sourcePoint"/><mxPoint x="290" y="125" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: loadExamDetails(examId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="290" y="160" as="sourcePoint"/><mxPoint x="660" y="160" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: queryExamWithAudio(examId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="660" y="195" as="sourcePoint"/><mxPoint x="845" y="195" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: return ExamDataDTO (35 questions &amp;amp; Audio URLs)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="845" y="230" as="sourcePoint"/><mxPoint x="660" y="230" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m5" value="5: return ExamDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="660" y="260" as="sourcePoint"/><mxPoint x="290" y="260" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m6" value="6: initAudioStream(part1_url)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#64748b;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="290" y="295" as="sourcePoint"/><mxPoint x="475" y="295" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m7" value="7: playAudioStream()" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#64748b;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="475" y="325" as="sourcePoint"/><mxPoint x="100" y="325" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Loop Doing Exam -->
        <mxCell id="f_loop" value="loop [Làm bài 35 câu trắc nghiệm]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=220;height=22;fillColor=none;strokeColor=#64748b;pointerEvents=0;" vertex="1" parent="1">
          <mxGeometry x="30" y="355" width="890" height="110" as="geometry" />
        </mxCell>
        <mxCell id="m8" value="8: selectAnswer(questionId, choice)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="385" as="sourcePoint"/><mxPoint x="290" y="385" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: autoSaveDraft(answers) vào LocalStorage" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="290" y="415" as="sourcePoint"/><mxPoint x="290" y="445" as="targetPoint"/><Array as="points"><mxPoint x="330" y="415"/><mxPoint x="330" y="445"/></Array></mxGeometry>
        </mxCell>

        <!-- Submission & Grading -->
        <mxCell id="m10" value="10: clickSubmitExam()" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="490" as="sourcePoint"/><mxPoint x="290" y="490" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m11" value="11: gradeObjectiveExam(answers, examId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="290" y="525" as="sourcePoint"/><mxPoint x="660" y="525" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m12" value="12: queryAnswerKeys(examId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="660" y="560" as="sourcePoint"/><mxPoint x="845" y="560" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m13" value="13: return AnswerKeyList" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="845" y="595" as="sourcePoint"/><mxPoint x="660" y="595" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m14" value="14: computeScore(35) &amp;amp; convertVstepScale10()" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="660" y="625" as="sourcePoint"/><mxPoint x="660" y="655" as="targetPoint"/><Array as="points"><mxPoint x="700" y="625"/><mxPoint x="700" y="655"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m15" value="15: saveSubmission(submissionRecord)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="660" y="685" as="sourcePoint"/><mxPoint x="845" y="685" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m16" value="16: return ScoreReportDTO (score, correctCount, transcript)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="660" y="720" as="sourcePoint"/><mxPoint x="290" y="720" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m17" value="17: renderScoreCardAndTranscript()" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="290" y="755" as="sourcePoint"/><mxPoint x="100" y="755" as="targetPoint"/></mxGeometry>
        </mxCell>'''
    save_diagram("sequence_uc02_listening.drawio", "Sequence_UC02_Listening", xml)

def generate_uc03_reading():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Luyện tập Kỹ năng Đọc &amp;amp; Tra từ điển CEFR (UC-03)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=15;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="15" width="550" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_cand" value="Học viên&#xa;(Candidate)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="50" y="60" width="100" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="ReadingUI&#xa;(Presentation)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="220" y="60" width="110" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_dict" value="DictPopover&#xa;(CEFR Dict)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#faf5ff;strokeColor=#9333ea;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="390" y="60" width="110" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_service" value="ExamService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="560" y="60" width="120" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="750" y="60" width="110" height="740" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: selectReadingExam(examId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="125" as="sourcePoint"/><mxPoint x="275" y="125" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: loadReadingExam(examId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="160" as="sourcePoint"/><mxPoint x="620" y="160" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: queryPassagesAndQuestions(examId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="620" y="195" as="sourcePoint"/><mxPoint x="805" y="195" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: return ReadingExamData (4 passages, 40 questions)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="805" y="230" as="sourcePoint"/><mxPoint x="620" y="230" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m5" value="5: return ReadingExamDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="620" y="260" as="sourcePoint"/><mxPoint x="275" y="260" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m6" value="6: renderPassageAndQuestions()" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="295" as="sourcePoint"/><mxPoint x="100" y="295" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Opt Dictionary Lookup -->
        <mxCell id="f_opt" value="opt [Tra cứu từ vựng tức thì]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=190;height=22;fillColor=none;strokeColor=#9333ea;pointerEvents=0;" vertex="1" parent="1">
          <mxGeometry x="30" y="325" width="850" height="135" as="geometry" />
        </mxCell>
        <mxCell id="m7" value="7: highlightWord(word)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#9333ea;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="355" as="sourcePoint"/><mxPoint x="275" y="355" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m8" value="8: lookupWord(word)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#9333ea;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="390" as="sourcePoint"/><mxPoint x="445" y="390" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: renderTooltip(meaning, ipa, cefrLevel)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#9333ea;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="445" y="425" as="sourcePoint"/><mxPoint x="100" y="425" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Loop Answering -->
        <mxCell id="f_loop" value="loop [Làm bài 40 câu trắc nghiệm]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=220;height=22;fillColor=none;strokeColor=#64748b;pointerEvents=0;" vertex="1" parent="1">
          <mxGeometry x="30" y="475" width="850" height="105" as="geometry" />
        </mxCell>
        <mxCell id="m10" value="10: selectAnswer(qId, choice)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="505" as="sourcePoint"/><mxPoint x="275" y="505" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m11" value="11: autoSaveProgress(answers)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="535" as="sourcePoint"/><mxPoint x="275" y="565" as="targetPoint"/><Array as="points"><mxPoint x="315" y="535"/><mxPoint x="315" y="565"/></Array></mxGeometry>
        </mxCell>

        <!-- Submit -->
        <mxCell id="m12" value="12: submitReading()" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="605" as="sourcePoint"/><mxPoint x="275" y="605" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m13" value="13: gradeReading(answers, examId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="635" as="sourcePoint"/><mxPoint x="620" y="635" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m14" value="14: persistReadingSubmission(result)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="620" y="670" as="sourcePoint"/><mxPoint x="805" y="670" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m15" value="15: return DetailedReportDTO (score, explanations)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="620" y="705" as="sourcePoint"/><mxPoint x="275" y="705" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m16" value="16: displayResultsWithExplanations()" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="275" y="740" as="sourcePoint"/><mxPoint x="100" y="740" as="targetPoint"/></mxGeometry>
        </mxCell>'''
    save_diagram("sequence_uc03_reading.drawio", "Sequence_UC03_Reading", xml)

def generate_uc05_speaking():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Luyện tập Kỹ năng Nói &amp;amp; Thu âm trực tiếp (UC-05)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=15;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="300" y="15" width="550" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_cand" value="Học viên&#xa;(Candidate)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="40" y="60" width="100" height="760" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="SpeakingUI&#xa;(Presentation)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="200" y="60" width="110" height="760" as="geometry" />
        </mxCell>
        <mxCell id="ll_timer" value="PrepTimer&#xa;(Web Worker)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef2f2;strokeColor=#ef4444;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="360" y="60" width="100" height="760" as="geometry" />
        </mxCell>
        <mxCell id="ll_rec" value="MediaRecorder&#xa;(Web API)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fff1f2;strokeColor=#f43f5e;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="510" y="60" width="120" height="760" as="geometry" />
        </mxCell>
        <mxCell id="ll_service" value="AIService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="680" y="60" width="110" height="760" as="geometry" />
        </mxCell>
        <mxCell id="ll_ai" value="Gemini AI API&#xa;(External Engine)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#ede9fe;strokeColor=#7c3aed;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="840" y="60" width="120" height="760" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="1000" y="60" width="100" height="760" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: selectSpeakingTopic(partId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="90" y="125" as="sourcePoint"/><mxPoint x="255" y="125" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: displayTopicAndMindmap()" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="255" y="160" as="sourcePoint"/><mxPoint x="90" y="160" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: startPrepTimer(1:00 min)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#ef4444;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="255" y="195" as="sourcePoint"/><mxPoint x="410" y="195" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: onPrepTimerExpire()" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#ef4444;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="410" y="230" as="sourcePoint"/><mxPoint x="255" y="230" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m5" value="5: clickStartRecording()" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#f43f5e;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="90" y="265" as="sourcePoint"/><mxPoint x="255" y="265" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m6" value="6: startRecording(audioStream)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#f43f5e;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="255" y="300" as="sourcePoint"/><mxPoint x="570" y="300" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m7" value="7: startSpeakingTimer(2:00 min)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#ef4444;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="255" y="335" as="sourcePoint"/><mxPoint x="410" y="335" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m8" value="8: speakSpeechContent()" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="90" y="370" as="sourcePoint"/><mxPoint x="570" y="370" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: onSpeakingTimerExpire() / stopClicked" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#ef4444;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="410" y="405" as="sourcePoint"/><mxPoint x="255" y="405" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m10" value="10: stopRecording()" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#f43f5e;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="255" y="440" as="sourcePoint"/><mxPoint x="570" y="440" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m11" value="11: return AudioBlob (.webm)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#f43f5e;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="570" y="475" as="sourcePoint"/><mxPoint x="255" y="475" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Opt AI Evaluation -->
        <mxCell id="f_ai" value="opt [Gửi AI Chấm điểm Phát âm &amp;amp; Độ trôi chảy]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=290;height=22;fillColor=none;strokeColor=#7c3aed;pointerEvents=0;" vertex="1" parent="1">
          <mxGeometry x="20" y="505" width="1090" height="205" as="geometry" />
        </mxCell>
        <mxCell id="m12" value="12: requestAIEvaluation()" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#7c3aed;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="90" y="535" as="sourcePoint"/><mxPoint x="255" y="535" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m13" value="13: evaluateSpeech(audioBlob, promptId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="255" y="570" as="sourcePoint"/><mxPoint x="735" y="570" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m14" value="14: POST /speech-eval (Audio + Rubric CEFR)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#7c3aed;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="735" y="605" as="sourcePoint"/><mxPoint x="900" y="605" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m15" value="15: return SpeechEvaluationJSON" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#7c3aed;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="900" y="640" as="sourcePoint"/><mxPoint x="735" y="640" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m16" value="16: saveSpeakingResult(evalDTO)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="735" y="675" as="sourcePoint"/><mxPoint x="1050" y="675" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Final Report -->
        <mxCell id="m17" value="17: return SpeakingScoreCardDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="735" y="725" as="sourcePoint"/><mxPoint x="255" y="725" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m18" value="18: renderSpeakingFeedbackAndSample()" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="255" y="755" as="sourcePoint"/><mxPoint x="90" y="755" as="targetPoint"/></mxGeometry>
        </mxCell>'''
    save_diagram("sequence_uc05_speaking.drawio", "Sequence_UC05_Speaking", xml)

def generate_uc06_mock_test():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Thi Thử Toàn diện 4 Kỹ năng 180 Phút (UC-06)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=15;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="300" y="15" width="550" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_cand" value="Học viên&#xa;(Candidate)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="40" y="60" width="100" height="780" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="MockTestUI&#xa;(Presentation)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="190" y="60" width="110" height="780" as="geometry" />
        </mxCell>
        <mxCell id="ll_timer" value="ExamTimer&#xa;(180:00 Countdown)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef2f2;strokeColor=#ef4444;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="340" y="60" width="120" height="780" as="geometry" />
        </mxCell>
        <mxCell id="ll_service" value="ExamService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="500" y="60" width="120" height="780" as="geometry" />
        </mxCell>
        <mxCell id="ll_ai_svc" value="AIScoringService&#xa;(AI Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#faf5ff;strokeColor=#9333ea;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="660" y="60" width="130" height="780" as="geometry" />
        </mxCell>
        <mxCell id="ll_ai" value="Gemini AI API&#xa;(External Engine)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#ede9fe;strokeColor=#7c3aed;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="830" y="60" width="110" height="780" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="980" y="60" width="100" height="780" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: startFullMockTest(mockId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="90" y="125" as="sourcePoint"/><mxPoint x="245" y="125" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: loadFullExamStructure(mockId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="160" as="sourcePoint"/><mxPoint x="560" y="160" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: query4SkillSections(mockId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="560" y="195" as="sourcePoint"/><mxPoint x="1030" y="195" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: return FullExamStructureDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1030" y="230" as="sourcePoint"/><mxPoint x="560" y="230" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m5" value="5: return FullExamDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="560" y="260" as="sourcePoint"/><mxPoint x="245" y="260" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m6" value="6: initCountdown(180:00)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#ef4444;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="295" as="sourcePoint"/><mxPoint x="400" y="295" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Loop Exam -->
        <mxCell id="f_loop" value="loop [Làm bài 4 Kỹ năng &amp;amp; Tự động lưu tiến độ]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=270;height=22;fillColor=none;strokeColor=#64748b;pointerEvents=0;" vertex="1" parent="1">
          <mxGeometry x="20" y="325" width="1070" height="100" as="geometry" />
        </mxCell>
        <mxCell id="m7" value="7: answerQuestions(skill, answers)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="90" y="355" as="sourcePoint"/><mxPoint x="245" y="355" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m8" value="8: cacheDraftAnswers() vào LocalStorage" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="380" as="sourcePoint"/><mxPoint x="245" y="405" as="targetPoint"/><Array as="points"><mxPoint x="285" y="380"/><mxPoint x="285" y="405"/></Array></mxGeometry>
        </mxCell>

        <!-- Auto submit -->
        <mxCell id="m9" value="9: onTimerExpire() / submitClicked" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#ef4444;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="400" y="445" as="sourcePoint"/><mxPoint x="245" y="445" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m10" value="10: lockExamInterface() &amp;amp; collectAllAnswers()" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="470" as="sourcePoint"/><mxPoint x="245" y="495" as="targetPoint"/><Array as="points"><mxPoint x="285" y="470"/><mxPoint x="285" y="495"/></Array></mxGeometry>
        </mxCell>

        <!-- Par Frame Parallel Scoring -->
        <mxCell id="f_par" value="par [Chấm điểm song song Độc lập]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=240;height=22;fillColor=none;strokeColor=#16a34a;pointerEvents=0;" vertex="1" parent="1">
          <mxGeometry x="20" y="515" width="1070" height="155" as="geometry" />
        </mxCell>
        <mxCell id="m11" value="11: gradeObjective(Listening &amp;amp; Reading)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="545" as="sourcePoint"/><mxPoint x="560" y="545" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m12" value="12: gradeSubjective(Writing &amp;amp; Speaking)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#9333ea;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="580" as="sourcePoint"/><mxPoint x="725" y="580" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m13" value="13: POST /evaluate-subjective (Rubric CEFR)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#7c3aed;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="725" y="615" as="sourcePoint"/><mxPoint x="885" y="615" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m14" value="14: return AIResultDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#7c3aed;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="885" y="670" as="sourcePoint"/><mxPoint x="725" y="670" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Final Aggregation -->
        <mxCell id="m15" value="15: aggregateFinalScore(CEFR)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="725" y="690" as="sourcePoint"/><mxPoint x="560" y="690" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m16" value="16: saveComprehensiveSubmission(finalResult)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="560" y="725" as="sourcePoint"/><mxPoint x="1030" y="725" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m17" value="17: return ComprehensiveScoreCardDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="560" y="755" as="sourcePoint"/><mxPoint x="245" y="755" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m18" value="18: renderFinalScoreCard(B1/B2/C1)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="245" y="805" as="sourcePoint"/><mxPoint x="90" y="805" as="targetPoint"/></mxGeometry>
        </mxCell>'''
    save_diagram("sequence_uc06_mock_test.drawio", "Sequence_UC06_Mock_Test", xml)

def generate_uc07_custom_test():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Bóc tách Đề thi Tùy biến từ tệp Word / PDF (UC-07)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=15;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="15" width="550" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_user" value="Người dùng&#xa;(User / Admin)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="50" y="60" width="100" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="CustomTestUI&#xa;(Presentation)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="210" y="60" width="120" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_val" value="FileValidator&#xa;(Validation)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f8fafc;strokeColor=#64748b;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="380" y="60" width="110" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_service" value="DocParserService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="540" y="60" width="130" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_adapter" value="DocParserAdapter&#xa;(Mammoth / PDF.js)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#faf5ff;strokeColor=#9333ea;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="720" y="60" width="120" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="890" y="60" width="110" height="740" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: uploadExamFile(file)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="125" as="sourcePoint"/><mxPoint x="270" y="125" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: validateFile(file.name, file.size)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#64748b;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="160" as="sourcePoint"/><mxPoint x="435" y="160" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: return ValidationResult(isValid=true)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#64748b;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="435" y="195" as="sourcePoint"/><mxPoint x="270" y="195" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: parseDocument(file)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="230" as="sourcePoint"/><mxPoint x="605" y="230" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Frame alt Format -->
        <mxCell id="f_alt" value="alt [Tệp .docx vs Tệp .pdf]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=200;height=22;fillColor=none;strokeColor=#64748b;pointerEvents=0;" vertex="1" parent="1">
          <mxGeometry x="30" y="255" width="980" height="135" as="geometry" />
        </mxCell>
        <mxCell id="m5" value="5: parseMammothDocx(file) -&gt; Clean HTML DOM" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#9333ea;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="605" y="285" as="sourcePoint"/><mxPoint x="780" y="285" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m6" value="6: parsePdfJs(file) -&gt; Text Stream &amp;amp; Coordinates" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#9333ea;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="605" y="320" as="sourcePoint"/><mxPoint x="780" y="320" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m7" value="7: return RawExtractedContent" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#9333ea;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="780" y="355" as="sourcePoint"/><mxPoint x="605" y="355" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Structure analysis -->
        <mxCell id="m8" value="8: analyzeStructureHeuristic(regexNLP)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="605" y="405" as="sourcePoint"/><mxPoint x="605" y="435" as="targetPoint"/><Array as="points"><mxPoint x="645" y="405"/><mxPoint x="645" y="435"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: return ParsedExamDraftDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="605" y="465" as="sourcePoint"/><mxPoint x="270" y="465" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m10" value="10: displayLivePreviewAndEditor()" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="500" as="sourcePoint"/><mxPoint x="100" y="500" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m11" value="11: editAndConfirmExam(finalData)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="535" as="sourcePoint"/><mxPoint x="270" y="535" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m12" value="12: saveCustomExam(finalData)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="570" as="sourcePoint"/><mxPoint x="605" y="570" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m13" value="13: INSERT INTO EXAMS, SECTIONS, QUESTIONS" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="605" y="605" as="sourcePoint"/><mxPoint x="945" y="605" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m14" value="14: confirmInsertSuccess(newExamId)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="945" y="640" as="sourcePoint"/><mxPoint x="605" y="640" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m15" value="15: return SuccessResponseDTO(newExamId)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="605" y="675" as="sourcePoint"/><mxPoint x="270" y="675" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m16" value="16: showNotification(&quot;Nhập đề thành công! Sẵn sàng thi&quot;)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="270" y="735" as="sourcePoint"/><mxPoint x="100" y="735" as="targetPoint"/></mxGeometry>
        </mxCell>'''
    save_diagram("sequence_uc07_custom_test.drawio", "Sequence_UC07_Custom_Test", xml)

def generate_uc08_vocab():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Học Từ vựng Flashcards &amp;amp; Lặp lại ngắt quãng SM-2 (UC-08)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=15;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="250" y="15" width="550" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_cand" value="Học viên&#xa;(Student)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="50" y="60" width="100" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="FlashcardUI&#xa;(Presentation)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="220" y="60" width="120" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_service" value="VocabService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="400" y="60" width="120" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_engine" value="SpacedRepEngine&#xa;(SM-2 Algorithm)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#faf5ff;strokeColor=#9333ea;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="580" y="60" width="130" height="740" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="760" y="60" width="110" height="740" as="geometry" />
        </mxCell>

        <!-- Messages -->
        <mxCell id="m1" value="1: selectVocabTopic(topicId, cefrLevel)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="125" as="sourcePoint"/><mxPoint x="280" y="125" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: getDueFlashcards(userId, topicId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="280" y="160" as="sourcePoint"/><mxPoint x="460" y="160" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: queryVocabCardsWithProgress(userId, topicId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="460" y="195" as="sourcePoint"/><mxPoint x="815" y="195" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: return CardListDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="815" y="230" as="sourcePoint"/><mxPoint x="460" y="230" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m5" value="5: prioritizeQueue(CardList)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#9333ea;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="460" y="265" as="sourcePoint"/><mxPoint x="645" y="265" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m6" value="6: return OrderedCardQueue" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#9333ea;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="645" y="300" as="sourcePoint"/><mxPoint x="280" y="300" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Loop Review -->
        <mxCell id="f_loop" value="loop [Luyện từng thẻ từ vựng]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=200;height=22;fillColor=none;strokeColor=#64748b;pointerEvents=0;" vertex="1" parent="1">
          <mxGeometry x="30" y="330" width="860" height="255" as="geometry" />
        </mxCell>
        <mxCell id="m7" value="7: displayFrontCard(word, pos, audio)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="280" y="360" as="sourcePoint"/><mxPoint x="100" y="360" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m8" value="8: clickFlipCard()" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="395" as="sourcePoint"/><mxPoint x="280" y="395" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: displayBackCard(meaning, ipa, collocations)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="280" y="430" as="sourcePoint"/><mxPoint x="100" y="430" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m10" value="10: submitSelfRating(rating: Again/Hard/Good/Easy)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="465" as="sourcePoint"/><mxPoint x="280" y="465" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m11" value="11: calculateNextReview(cardId, rating)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#9333ea;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="280" y="500" as="sourcePoint"/><mxPoint x="645" y="500" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m12" value="12: updateCardIntervalAndEase(cardId, interval, easeFactor)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="645" y="535" as="sourcePoint"/><mxPoint x="815" y="535" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Summary -->
        <mxCell id="m13" value="13: finishSession(userId, topicId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="280" y="615" as="sourcePoint"/><mxPoint x="460" y="615" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m14" value="14: logSessionSummary(sessionMetrics)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="460" y="650" as="sourcePoint"/><mxPoint x="815" y="650" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m15" value="15: return SessionSummaryDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="460" y="685" as="sourcePoint"/><mxPoint x="280" y="685" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m16" value="16: renderVocabAnalytics(% retention, learnedCount)" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="280" y="720" as="sourcePoint"/><mxPoint x="100" y="720" as="targetPoint"/></mxGeometry>
        </mxCell>'''
    save_diagram("sequence_uc08_vocab.drawio", "Sequence_UC08_Vocab", xml)

def generate_all():
    generate_uc01_auth()
    generate_uc02_listening()
    generate_uc03_reading()
    generate_uc05_speaking()
    generate_uc06_mock_test()
    generate_uc07_custom_test()
    generate_uc08_vocab()

if __name__ == '__main__':
    generate_all()
