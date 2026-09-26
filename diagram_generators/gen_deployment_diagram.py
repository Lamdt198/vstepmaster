from .common import save_diagram

def generate():
    xml = """        <!-- Node 1: Client Machine -->
        <mxCell id="node_client" value="«device»&#xa;&lt;b&gt;Client Machine (Browser)&lt;/b&gt;" style="shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;darkOpacity2=0.1;size=15;fillColor=#eff6ff;strokeColor=#2563eb;strokeWidth=2;fontColor=#1e40af;align=left;verticalAlign=top;spacingLeft=15;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="30" y="40" width="310" height="460" as="geometry" />
        </mxCell>
        <mxCell id="art_react" value="«artifact»&#xa;&lt;b&gt;React 18 SPA&lt;/b&gt;&#xa;(HTML5 / Tailwind CSS)" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#f0fdf4;strokeColor=#166534;fontColor=#14532d;" vertex="1" parent="1">
          <mxGeometry x="60" y="130" width="250" height="60" as="geometry" />
        </mxCell>
        <mxCell id="art_audio" value="«artifact»&#xa;&lt;b&gt;HTML5 Audio API&lt;/b&gt;&#xa;(Nghe bài thi Listening)" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#f0fdf4;strokeColor=#166534;fontColor=#14532d;" vertex="1" parent="1">
          <mxGeometry x="60" y="210" width="250" height="60" as="geometry" />
        </mxCell>
        <mxCell id="art_rec" value="«artifact»&#xa;&lt;b&gt;Web MediaRecorder API&lt;/b&gt;&#xa;(Thu âm bài thi Speaking)" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#f0fdf4;strokeColor=#166534;fontColor=#14532d;" vertex="1" parent="1">
          <mxGeometry x="60" y="290" width="250" height="60" as="geometry" />
        </mxCell>
        <mxCell id="db_local" value="«database»&#xa;&lt;b&gt;Browser LocalStorage&lt;/b&gt;&#xa;(Lưu tạm tiến độ mỗi 5s)" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=12;fillColor=#fef3c7;strokeColor=#d97706;fontColor=#92400e;" vertex="1" parent="1">
          <mxGeometry x="85" y="375" width="200" height="75" as="geometry" />
        </mxCell>

        <!-- Node 2: Web Server -->
        <mxCell id="node_server" value="«device»&#xa;&lt;b&gt;Web &amp; Application Server&lt;/b&gt;" style="shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;darkOpacity2=0.1;size=15;fillColor=#eff6ff;strokeColor=#2563eb;strokeWidth=2;fontColor=#1e40af;align=left;verticalAlign=top;spacingLeft=15;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="460" y="40" width="310" height="280" as="geometry" />
        </mxCell>
        <mxCell id="ee_vite" value="«executionEnvironment»&#xa;&lt;b&gt;Vite Server / Nginx&lt;/b&gt;&#xa;Node.js Runtime v18+" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#faf5ff;strokeColor=#9333ea;fontColor=#6b21a8;" vertex="1" parent="1">
          <mxGeometry x="490" y="130" width="250" height="65" as="geometry" />
        </mxCell>
        <mxCell id="art_parser" value="«artifact»&#xa;&lt;b&gt;Mammoth / PDF.js Engine&lt;/b&gt;&#xa;(Bóc tách đề Word/PDF)" style="html=1;dropTarget=0;whiteSpace=wrap;fillColor=#faf5ff;strokeColor=#9333ea;fontColor=#6b21a8;" vertex="1" parent="1">
          <mxGeometry x="490" y="215" width="250" height="65" as="geometry" />
        </mxCell>

        <!-- Node 3: External Cloud AI -->
        <mxCell id="node_ai" value="«externalService»&#xa;&lt;b&gt;Google Gemini AI REST API&lt;/b&gt;&#xa;(Chấm điểm Rubric 4 tiêu chí CEFR)" style="ellipse;shape=cloud;whiteSpace=wrap;html=1;fillColor=#faf5ff;strokeColor=#9333ea;strokeWidth=2;fontColor=#6b21a8;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="880" y="90" width="290" height="180" as="geometry" />
        </mxCell>

        <!-- Node 4: Database Server -->
        <mxCell id="node_db" value="«device»&#xa;&lt;b&gt;Database Server (RDBMS)&lt;/b&gt;" style="shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;darkOpacity2=0.1;size=15;fillColor=#eff6ff;strokeColor=#2563eb;strokeWidth=2;fontColor=#1e40af;align=left;verticalAlign=top;spacingLeft=15;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="460" y="370" width="310" height="180" as="geometry" />
        </mxCell>
        <mxCell id="db_pg" value="«database»&#xa;&lt;b&gt;PostgreSQL / MySQL 3NF&lt;/b&gt;&#xa;(14 bảng chuẩn hóa dữ liệu)" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=12;fillColor=#fef3c7;strokeColor=#d97706;fontColor=#92400e;" vertex="1" parent="1">
          <mxGeometry x="510" y="450" width="210" height="80" as="geometry" />
        </mxCell>

        <!-- Connections with White Background Labels -->
        <mxCell id="dep_c_s" value="HTTPS / TLS 1.3&#xa;(Static Assets &amp; API)" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeWidth=2;strokeColor=#2563eb;endArrow=block;labelBackgroundColor=#ffffff;labelBorderColor=#93c5fd;spacing=3;" edge="1" parent="1" source="node_client" target="node_server"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dep_s_ai" value="RESTful HTTPS&#xa;(JSON Prompt / Response)" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeWidth=2;strokeColor=#9333ea;endArrow=block;labelBackgroundColor=#ffffff;labelBorderColor=#d8b4fe;spacing=3;" edge="1" parent="1" source="node_server" target="node_ai"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dep_s_db" value="TCP/IP Connection Pool&#xa;(Port 5432 / 3306)" style="edgeStyle=straightEdgeStyle;html=1;strokeWidth=2;strokeColor=#d97706;endArrow=block;labelBackgroundColor=#ffffff;labelBorderColor=#fcd34d;spacing=3;" edge="1" parent="1" source="node_server" target="node_db"><mxGeometry relative="1" as="geometry" /></mxCell>"""
    save_diagram("09_deployment_diagram.drawio", "09_Deployment_Diagram", xml)
    return xml
