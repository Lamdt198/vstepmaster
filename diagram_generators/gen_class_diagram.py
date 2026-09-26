from .common import save_diagram

def generate():
    xml = """        <!-- Layer 1: Presentation Layer -->
        <mxCell id="pkg_pres" value="1. PRESENTATION LAYER (Tầng Trình diễn UI)" style="shape=rect;rounded=1;fillColor=#f8fafc;strokeColor=#64748b;strokeWidth=1.5;fontStyle=1;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=12;fontColor=#0f172a;" vertex="1" parent="1">
          <mxGeometry x="20" y="30" width="980" height="155" as="geometry" />
        </mxCell>
        
        <mxCell id="c_exampage_hdr" value="ExamPage" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#2563eb;strokeColor=#1d4ed8;fontColor=#ffffff;fontSize=12;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="50" y="65" width="200" height="110" as="geometry" />
        </mxCell>
        <mxCell id="c_exampage_body" value="+ state: ExamState&#xa;+ timer: Int&#xa;--&#xa;+ handleAnswerSelect()&#xa;+ handleSubmit()" style="text;strokeColor=none;fillColor=#ffffff;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;overflow=hidden;fontSize=11;fontColor=#1e293b;" vertex="1" parent="c_exampage_hdr">
          <mxGeometry y="26" width="200" height="84" as="geometry" />
        </mxCell>

        <mxCell id="c_writing_hdr" value="WritingPage" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#2563eb;strokeColor=#1d4ed8;fontColor=#ffffff;fontSize=12;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="340" y="65" width="230" height="110" as="geometry" />
        </mxCell>
        <mxCell id="c_writing_body" value="+ wordCount: Int&#xa;+ isScoring: Boolean&#xa;--&#xa;+ handleAISubmit()&#xa;+ renderScoreCard()" style="text;strokeColor=none;fillColor=#ffffff;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;overflow=hidden;fontSize=11;fontColor=#1e293b;" vertex="1" parent="c_writing_hdr">
          <mxGeometry y="26" width="230" height="84" as="geometry" />
        </mxCell>

        <mxCell id="c_timer_hdr" value="ExamTimer (Observer)" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#2563eb;strokeColor=#1d4ed8;fontColor=#ffffff;fontSize=12;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="670" y="65" width="210" height="110" as="geometry" />
        </mxCell>
        <mxCell id="c_timer_body" value="- listeners: Function[]&#xa;--&#xa;+ subscribe(fn)&#xa;+ tick()&#xa;+ onTimeout()" style="text;strokeColor=none;fillColor=#ffffff;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;overflow=hidden;fontSize=11;fontColor=#1e293b;" vertex="1" parent="c_timer_hdr">
          <mxGeometry y="26" width="210" height="84" as="geometry" />
        </mxCell>

        <!-- Layer 2: Application Layer -->
        <mxCell id="pkg_app" value="2. APPLICATION LAYER (Tầng Ứng dụng &amp; Dịch vụ)" style="shape=rect;rounded=1;fillColor=#f0fdf4;strokeColor=#16a34a;strokeWidth=1.5;fontStyle=1;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=12;fontColor=#14532d;" vertex="1" parent="1">
          <mxGeometry x="20" y="235" width="980" height="150" as="geometry" />
        </mxCell>

        <mxCell id="c_service_hdr" value="ExamService" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#16a34a;strokeColor=#15803d;fontColor=#ffffff;fontSize=12;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="50" y="270" width="210" height="100" as="geometry" />
        </mxCell>
        <mxCell id="c_service_body" value="- repo: IExamRepository&#xa;--&#xa;+ startSession(examId)&#xa;+ submit(submissionId)&#xa;+ evaluateAI(submissionId)" style="text;strokeColor=none;fillColor=#ffffff;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;overflow=hidden;fontSize=11;fontColor=#1e293b;" vertex="1" parent="c_service_hdr">
          <mxGeometry y="26" width="210" height="74" as="geometry" />
        </mxCell>

        <mxCell id="c_builder_hdr" value="VstepExamBuilder (Builder)" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#16a34a;strokeColor=#15803d;fontColor=#ffffff;fontSize=12;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="340" y="270" width="230" height="100" as="geometry" />
        </mxCell>
        <mxCell id="c_builder_body" value="- exam: Exam&#xa;--&#xa;+ addListeningSection()&#xa;+ addReadingSection()&#xa;+ build(): Exam" style="text;strokeColor=none;fillColor=#ffffff;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;overflow=hidden;fontSize=11;fontColor=#1e293b;" vertex="1" parent="c_builder_hdr">
          <mxGeometry y="26" width="230" height="74" as="geometry" />
        </mxCell>

        <mxCell id="c_sctx_hdr" value="ScoringContext (Strategy Context)" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#16a34a;strokeColor=#15803d;fontColor=#ffffff;fontSize=12;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="670" y="270" width="230" height="100" as="geometry" />
        </mxCell>
        <mxCell id="c_sctx_body" value="- strategy: IScoringStrategy&#xa;--&#xa;+ setStrategy(strat)&#xa;+ executeScoring(data)" style="text;strokeColor=none;fillColor=#ffffff;align=left;verticalAlign=top;spacingLeft=8;spacingTop=6;overflow=hidden;fontSize=11;fontColor=#1e293b;" vertex="1" parent="c_sctx_hdr">
          <mxGeometry y="26" width="230" height="74" as="geometry" />
        </mxCell>

        <!-- Layer 3: Domain Layer -->
        <mxCell id="pkg_domain" value="3. DOMAIN LAYER (Tầng Nghiệp vụ cốt lõi - Strategy DIP)" style="shape=rect;rounded=1;fillColor=#faf5ff;strokeColor=#9333ea;strokeWidth=1.5;fontStyle=1;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=12;fontColor=#581c87;" vertex="1" parent="1">
          <mxGeometry x="20" y="435" width="980" height="165" as="geometry" />
        </mxCell>

        <mxCell id="c_strat_hdr" value="«interface» IScoringStrategy" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#7c3aed;strokeColor=#6d28d9;fontColor=#ffffff;fontSize=12;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="380" y="470" width="260" height="52" as="geometry" />
        </mxCell>
        <mxCell id="c_strat_body" value="+ calculateScore(data): ScoringResult" style="text;strokeColor=none;fillColor=#ffffff;align=left;verticalAlign=middle;spacingLeft=8;overflow=hidden;fontSize=11;fontColor=#1e293b;" vertex="1" parent="c_strat_hdr">
          <mxGeometry y="26" width="260" height="26" as="geometry" />
        </mxCell>

        <mxCell id="c_obj_hdr" value="ObjectiveScoringStrategy" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#7c3aed;strokeColor=#6d28d9;fontColor=#ffffff;fontSize=11;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="220" y="535" width="200" height="52" as="geometry" />
        </mxCell>
        <mxCell id="c_obj_body" value="+ calculateScore(data)" style="text;strokeColor=none;fillColor=#ffffff;align=left;verticalAlign=middle;spacingLeft=8;overflow=hidden;fontSize=11;fontColor=#1e293b;" vertex="1" parent="c_obj_hdr">
          <mxGeometry y="26" width="200" height="26" as="geometry" />
        </mxCell>

        <mxCell id="c_ais_hdr" value="AIScoringStrategy" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#7c3aed;strokeColor=#6d28d9;fontColor=#ffffff;fontSize=11;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="600" y="535" width="200" height="66" as="geometry" />
        </mxCell>
        <mxCell id="c_ais_body" value="- aiEvaluator: IAIEvaluator&#xa;--&#xa;+ calculateScore(data)" style="text;strokeColor=none;fillColor=#ffffff;align=left;verticalAlign=top;spacingLeft=8;spacingTop=4;overflow=hidden;fontSize=10;fontColor=#1e293b;" vertex="1" parent="c_ais_hdr">
          <mxGeometry y="26" width="200" height="40" as="geometry" />
        </mxCell>

        <!-- Layer 4: Infrastructure Layer -->
        <mxCell id="pkg_infra" value="4. INFRASTRUCTURE LAYER (Tầng Hạ tầng - Adapter Pattern)" style="shape=rect;rounded=1;fillColor=#f0fdf4;strokeColor=#059669;strokeWidth=1.5;fontStyle=1;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=12;fontColor=#064e3b;" vertex="1" parent="1">
          <mxGeometry x="20" y="650" width="980" height="130" as="geometry" />
        </mxCell>

        <mxCell id="c_iaiev_hdr" value="«interface» IAIEvaluator" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#0d9488;strokeColor=#0f766e;fontColor=#ffffff;fontSize=12;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="220" y="685" width="240" height="60" as="geometry" />
        </mxCell>
        <mxCell id="c_iaiev_body" value="+ evaluateEssay(prompt, essay): DTO" style="text;strokeColor=none;fillColor=#ffffff;align=left;verticalAlign=middle;spacingLeft=8;overflow=hidden;fontSize=11;fontColor=#1e293b;" vertex="1" parent="c_iaiev_hdr">
          <mxGeometry y="26" width="240" height="34" as="geometry" />
        </mxCell>

        <mxCell id="c_aiadp_hdr" value="AIAdapter (Adapter)" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#0d9488;strokeColor=#0f766e;fontColor=#ffffff;fontSize=12;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="580" y="685" width="240" height="75" as="geometry" />
        </mxCell>
        <mxCell id="c_aiadp_body" value="- endpointUrl: String&#xa;--&#xa;+ evaluateEssay(prompt, essay): DTO" style="text;strokeColor=none;fillColor=#ffffff;align=left;verticalAlign=top;spacingLeft=8;spacingTop=4;overflow=hidden;fontSize=11;fontColor=#1e293b;" vertex="1" parent="c_aiadp_hdr">
          <mxGeometry y="26" width="240" height="49" as="geometry" />
        </mxCell>

        <!-- Inter-layer Connectors (Clean labels in open gaps) -->
        <mxCell id="e_pres_app1" value="«uses»" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=3;" edge="1" parent="1" source="c_exampage_hdr" target="c_service_hdr">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_pres_app2" value="«delegates»" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=3;" edge="1" parent="1" source="c_writing_hdr" target="c_builder_hdr">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_pres_app3" value="«notifies»" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#16a34a;labelBackgroundColor=#ffffff;spacing=3;" edge="1" parent="1" source="c_timer_hdr" target="c_sctx_hdr">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="e_app_dom" value="«delegates»" style="edgeStyle=orthogonalEdgeStyle;dashed=1;html=1;endArrow=open;strokeWidth=1.5;strokeColor=#7c3aed;labelBackgroundColor=#ffffff;spacing=3;" edge="1" parent="1" source="c_sctx_hdr" target="c_strat_hdr">
          <mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="785" y="415"/><mxPoint x="510" y="415"/></Array></mxGeometry>
        </mxCell>

        <!-- Realizations in Domain Layer -->
        <mxCell id="e_real_obj" value="«realizes»" style="edgeStyle=orthogonalEdgeStyle;dashed=1;html=1;endArrow=block;endFill=0;strokeWidth=1.5;strokeColor=#7c3aed;labelBackgroundColor=#ffffff;spacing=3;" edge="1" parent="1" source="c_obj_hdr" target="c_strat_hdr">
          <mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="320" y="525"/><mxPoint x="510" y="525"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="e_real_ais" value="«realizes»" style="edgeStyle=orthogonalEdgeStyle;dashed=1;html=1;endArrow=block;endFill=0;strokeWidth=1.5;strokeColor=#7c3aed;labelBackgroundColor=#ffffff;spacing=3;" edge="1" parent="1" source="c_ais_hdr" target="c_strat_hdr">
          <mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="700" y="525"/><mxPoint x="510" y="525"/></Array></mxGeometry>
        </mxCell>

        <!-- Infrastructure Adapter Realization -->
        <mxCell id="e_real_adp" value="«realizes»" style="edgeStyle=straightEdgeStyle;dashed=1;html=1;endArrow=block;endFill=0;strokeWidth=1.5;strokeColor=#0d9488;labelBackgroundColor=#ffffff;spacing=3;" edge="1" parent="1" source="c_aiadp_hdr" target="c_iaiev_hdr">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>"""
    save_diagram("05_class_diagram_architecture.drawio", "05_Class_Architecture", xml)
    return xml
