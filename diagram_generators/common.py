import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

DRAWIO_DIR = os.path.abspath('diagrams/drawio')
os.makedirs(DRAWIO_DIR, exist_ok=True)

def wrap_drawio(content, name="Diagram"):
    return f'''<mxfile host="app.diagrams.net" modified="2026-09-10T16:00:00.000Z" agent="5.0" version="21.6.8" type="device">
  <diagram id="{name}" name="{name}">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1654" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
{content}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>'''

def save_diagram(filename, name, content):
    filepath = os.path.join(DRAWIO_DIR, filename)
    xml_data = wrap_drawio(content, name)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(xml_data)
    print(f"[OK] Saved: {filename} ({len(xml_data):,} bytes)")
