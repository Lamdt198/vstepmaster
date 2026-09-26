from .common import save_diagram

def generate():
    xml = '''        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Biểu đồ Tuần tự: Chấm Điểm Tự Luận Tích Hợp Google Gemini AI (UC-04)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=15;fontColor=#1e293b;" vertex="1" parent="1">
          <mxGeometry x="300" y="15" width="550" height="30" as="geometry" />
        </mxCell>

        <!-- Lifelines -->
        <mxCell id="ll_cand" value="Học viên&#xa;(Candidate)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="50" y="60" width="100" height="660" as="geometry" />
        </mxCell>
        <mxCell id="ll_ui" value="Giao diện Viết&#xa;(WritingUI)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0f9ff;strokeColor=#0284c7;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="230" y="60" width="110" height="660" as="geometry" />
        </mxCell>
        <mxCell id="ll_service" value="AIScoringService&#xa;(Application)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="420" y="60" width="120" height="660" as="geometry" />
        </mxCell>
        <mxCell id="ll_adapter" value="AIAdapter&#xa;(Infrastructure)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#faf5ff;strokeColor=#9333ea;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="620" y="60" width="110" height="660" as="geometry" />
        </mxCell>
        <mxCell id="ll_ai" value="Gemini AI API&#xa;(External Engine)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#ede9fe;strokeColor=#7c3aed;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="810" y="60" width="120" height="660" as="geometry" />
        </mxCell>
        <mxCell id="ll_db" value="Cơ sở dữ liệu&#xa;(Database)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;fillColor=#fef3c7;strokeColor=#d97706;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="1000" y="60" width="110" height="660" as="geometry" />
        </mxCell>

        <!-- Messages with Clean Label Backgrounds -->
        <mxCell id="m1" value="1: submitEssay(content, promptId)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="100" y="130" as="sourcePoint"/><mxPoint x="285" y="130" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2: validateWordCount(content)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="285" y="160" as="sourcePoint"/><mxPoint x="285" y="190" as="targetPoint"/><Array as="points"><mxPoint x="325" y="160"/><mxPoint x="325" y="190"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3: requestEvaluation(payload)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="285" y="220" as="sourcePoint"/><mxPoint x="480" y="220" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4: generateEvaluation(prompt, essay)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#9333ea;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="480" y="260" as="sourcePoint"/><mxPoint x="675" y="260" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m5" value="5: POST /analyze (Rubric CEFR)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=2;strokeColor=#7c3aed;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="675" y="305" as="sourcePoint"/><mxPoint x="870" y="305" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m6" value="6: Return Raw JSON Result" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#7c3aed;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="870" y="365" as="sourcePoint"/><mxPoint x="675" y="365" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m7" value="7: parseAndValidate(json)" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="675" y="395" as="sourcePoint"/><mxPoint x="675" y="425" as="targetPoint"/><Array as="points"><mxPoint x="715" y="395"/><mxPoint x="715" y="425"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="m8" value="8: Return AIEvaluationDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#9333ea;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="675" y="455" as="sourcePoint"/><mxPoint x="480" y="455" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m9" value="9: saveResult(submissionId, result)" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="480" y="495" as="sourcePoint"/><mxPoint x="1055" y="495" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m10" value="10: Confirm Save OK" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#d97706;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1055" y="535" as="sourcePoint"/><mxPoint x="480" y="535" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m11" value="11: return ScoreCardDTO" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="480" y="575" as="sourcePoint"/><mxPoint x="285" y="575" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="m12" value="12: Render Score Card, Errors &amp; Model Sample" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#2563eb;labelBackgroundColor=#ffffff;spacing=2;verticalAlign=bottom;spacingBottom=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="285" y="620" as="sourcePoint"/><mxPoint x="100" y="620" as="targetPoint"/></mxGeometry>
        </mxCell>'''
    save_diagram("03_sequence_ai_scoring.drawio", "03_Sequence_AI_Scoring", xml)
    return xml
