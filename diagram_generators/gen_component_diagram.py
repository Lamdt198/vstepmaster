from .common import save_diagram

def generate():
    xml = '''        <!-- 1. Presentation Layer -->
        <mxCell id="pkg_pres" value="Presentation Layer (Tầng Trình diễn)" style="swimlane;whiteSpace=wrap;html=1;fontStyle=1;startSize=30;horizontal=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;strokeWidth=2;fontSize=13;fontColor=#1e40af;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="1080" height="120" as="geometry" />
        </mxCell>
        <mxCell id="c_exam_view" value="«component»&#xa;&lt;b&gt;ExamView&lt;/b&gt;" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#f0fdf4;strokeColor=#166534;fontColor=#14532d;" vertex="1" parent="pkg_pres">
          <mxGeometry x="40" y="45" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="c_writing_ed" value="«component»&#xa;&lt;b&gt;WritingEditor&lt;/b&gt;" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#f0fdf4;strokeColor=#166534;fontColor=#14532d;" vertex="1" parent="pkg_pres">
          <mxGeometry x="250" y="45" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="c_timer" value="«component»&#xa;&lt;b&gt;MockTestTimer&lt;/b&gt;" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#f0fdf4;strokeColor=#166534;fontColor=#14532d;" vertex="1" parent="pkg_pres">
          <mxGeometry x="460" y="45" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="c_flashcard" value="«component»&#xa;&lt;b&gt;FlashcardViewer&lt;/b&gt;" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#f0fdf4;strokeColor=#166534;fontColor=#14532d;" vertex="1" parent="pkg_pres">
          <mxGeometry x="670" y="45" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="c_auth_form" value="«component»&#xa;&lt;b&gt;AuthForm&lt;/b&gt;" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#f0fdf4;strokeColor=#166534;fontColor=#14532d;" vertex="1" parent="pkg_pres">
          <mxGeometry x="880" y="45" width="160" height="50" as="geometry" />
        </mxCell>

        <!-- 2. Application Layer -->
        <mxCell id="pkg_app" value="Application / Service Layer (Tầng Ứng dụng &amp; Dịch vụ)" style="swimlane;whiteSpace=wrap;html=1;fontStyle=1;startSize=30;horizontal=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;strokeWidth=2;fontSize=13;fontColor=#1e40af;" vertex="1" parent="1">
          <mxGeometry x="40" y="210" width="1080" height="120" as="geometry" />
        </mxCell>
        <mxCell id="c_exam_srv" value="«component»&#xa;&lt;b&gt;ExamService&lt;/b&gt;" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#f0fdf4;strokeColor=#166534;fontColor=#14532d;" vertex="1" parent="pkg_app">
          <mxGeometry x="40" y="45" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="c_ai_srv" value="«component»&#xa;&lt;b&gt;AIScoringService&lt;/b&gt;" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#f0fdf4;strokeColor=#166534;fontColor=#14532d;" vertex="1" parent="pkg_app">
          <mxGeometry x="250" y="45" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="c_doc_srv" value="«component»&#xa;&lt;b&gt;DocumentParserService&lt;/b&gt;" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#f0fdf4;strokeColor=#166534;fontColor=#14532d;" vertex="1" parent="pkg_app">
          <mxGeometry x="460" y="45" width="180" height="50" as="geometry" />
        </mxCell>
        <mxCell id="c_vocab_srv" value="«component»&#xa;&lt;b&gt;VocabularyService&lt;/b&gt;" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#f0fdf4;strokeColor=#166534;fontColor=#14532d;" vertex="1" parent="pkg_app">
          <mxGeometry x="680" y="45" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="c_auth_srv" value="«component»&#xa;&lt;b&gt;AuthService&lt;/b&gt;" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#f0fdf4;strokeColor=#166534;fontColor=#14532d;" vertex="1" parent="pkg_app">
          <mxGeometry x="880" y="45" width="160" height="50" as="geometry" />
        </mxCell>

        <!-- 3. Domain Layer -->
        <mxCell id="pkg_dom" value="Domain Layer (Tầng Nghiệp vụ cốt lõi - Thực thể &amp; Ports)" style="swimlane;whiteSpace=wrap;html=1;fontStyle=1;startSize=30;horizontal=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;strokeWidth=2;fontSize=13;fontColor=#1e40af;" vertex="1" parent="1">
          <mxGeometry x="40" y="380" width="1080" height="120" as="geometry" />
        </mxCell>
        <mxCell id="c_ent_exam" value="«entity»&#xa;&lt;b&gt;Exam / Section&lt;/b&gt;" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#fef3c7;strokeColor=#d97706;fontColor=#92400e;" vertex="1" parent="pkg_dom">
          <mxGeometry x="40" y="45" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="i_storage_port" value="«interface»&#xa;&lt;b&gt;IStoragePort&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f5f3ff;strokeColor=#7c3aed;fontColor=#5b21b6;fontStyle=1;fontSize=11;" vertex="1" parent="pkg_dom">
          <mxGeometry x="250" y="40" width="160" height="60" as="geometry" />
        </mxCell>
        <mxCell id="i_ai_port" value="«interface»&#xa;&lt;b&gt;IAIScoringPort&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f5f3ff;strokeColor=#7c3aed;fontColor=#5b21b6;fontStyle=1;fontSize=11;" vertex="1" parent="pkg_dom">
          <mxGeometry x="470" y="40" width="160" height="60" as="geometry" />
        </mxCell>
        <mxCell id="i_doc_port" value="«interface»&#xa;&lt;b&gt;IDocumentParserPort&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f5f3ff;strokeColor=#7c3aed;fontColor=#5b21b6;fontStyle=1;fontSize=11;" vertex="1" parent="pkg_dom">
          <mxGeometry x="690" y="40" width="170" height="60" as="geometry" />
        </mxCell>

        <!-- 4. Infrastructure Layer -->
        <mxCell id="pkg_infra" value="Infrastructure / Adapter Layer (Tầng Hạ tầng &amp; Adapter)" style="swimlane;whiteSpace=wrap;html=1;fontStyle=1;startSize=30;horizontal=1;container=1;fillColor=#eff6ff;strokeColor=#2563eb;strokeWidth=2;fontSize=13;fontColor=#1e40af;" vertex="1" parent="1">
          <mxGeometry x="40" y="550" width="1080" height="120" as="geometry" />
        </mxCell>
        <mxCell id="c_store_adapt" value="«adapter»&#xa;&lt;b&gt;StorageAdapter (DB/LocalStorage)&lt;/b&gt;" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#ede9fe;strokeColor=#7c3aed;fontColor=#5b21b6;" vertex="1" parent="pkg_infra">
          <mxGeometry x="200" y="45" width="240" height="50" as="geometry" />
        </mxCell>
        <mxCell id="c_ai_adapt" value="«adapter»&#xa;&lt;b&gt;AIAdapter (Gemini)&lt;/b&gt;" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#ede9fe;strokeColor=#7c3aed;fontColor=#5b21b6;" vertex="1" parent="pkg_infra">
          <mxGeometry x="470" y="45" width="200" height="50" as="geometry" />
        </mxCell>
        <mxCell id="c_doc_adapt" value="«adapter»&#xa;&lt;b&gt;DocumentParserAdapter (Mammoth/PDF)&lt;/b&gt;" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#ede9fe;strokeColor=#7c3aed;fontColor=#5b21b6;" vertex="1" parent="pkg_infra">
          <mxGeometry x="720" y="45" width="270" height="50" as="geometry" />
        </mxCell>

        <!-- Vertical Non-crossing Connectors -->
        <mxCell id="e_ev_es" style="edgeStyle=straightEdgeStyle;html=1;endArrow=open;dashed=1;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1" source="c_exam_view" target="c_exam_srv"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e_we_as" style="edgeStyle=straightEdgeStyle;html=1;endArrow=open;dashed=1;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1" source="c_writing_ed" target="c_ai_srv"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e_af_as" style="edgeStyle=straightEdgeStyle;html=1;endArrow=open;dashed=1;strokeWidth=1.5;strokeColor=#2563eb;" edge="1" parent="1" source="c_auth_form" target="c_auth_srv"><mxGeometry relative="1" as="geometry" /></mxCell>

        <!-- Dependency Inversion downwards -->
        <mxCell id="e_es_port" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=open;dashed=1;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1" source="c_exam_srv" target="i_storage_port"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e_as_port" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=open;dashed=1;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1" source="c_ai_srv" target="i_ai_port"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e_ds_port" style="edgeStyle=orthogonalEdgeStyle;html=1;endArrow=open;dashed=1;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1" source="c_doc_srv" target="i_doc_port"><mxGeometry relative="1" as="geometry" /></mxCell>

        <!-- Implementation upwards -->
        <mxCell id="e_ad_st" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;dashed=1;endFill=0;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1" source="c_store_adapt" target="i_storage_port"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e_ad_ai" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;dashed=1;endFill=0;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1" source="c_ai_adapt" target="i_ai_port"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e_ad_dc" style="edgeStyle=straightEdgeStyle;html=1;endArrow=block;dashed=1;endFill=0;strokeWidth=1.5;strokeColor=#7c3aed;" edge="1" parent="1" source="c_doc_adapt" target="i_doc_port"><mxGeometry relative="1" as="geometry" /></mxCell>'''
    save_diagram("08_component_diagram.drawio", "08_Component_Diagram", xml)
    return xml
