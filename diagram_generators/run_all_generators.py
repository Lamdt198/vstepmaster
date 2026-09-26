import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

from . import gen_use_case
from . import gen_activity_mock
from . import gen_sequence_ai
from . import gen_state_machine
from . import gen_class_diagram
from . import gen_database_erd
from . import gen_context_diagram
from . import gen_component_diagram
from . import gen_deployment_diagram
from . import gen_activities_uc
from . import gen_sequences_uc

DRAWIO_DIR = os.path.abspath('diagrams/drawio')
MASTER_FILE = os.path.join(DRAWIO_DIR, 'VSTEP_Master_All_Diagrams.drawio')

ORDERED_FILES = [
    ("01_use_case_diagram.drawio", "01_Use_Case"),
    ("02_activity_flow_mock_test.drawio", "02_Activity_Flow"),
    ("03_sequence_ai_scoring.drawio", "03_Sequence_AI_Scoring"),
    ("04_state_machine_exam.drawio", "04_State_Machine"),
    ("05_class_diagram_architecture.drawio", "05_Class_Diagram"),
    ("06_database_erd.drawio", "06_Database_ERD_14_Tables"),
    ("07_context_diagram.drawio", "07_Context_Diagram"),
    ("08_component_diagram.drawio", "08_Component_Diagram"),
    ("09_deployment_diagram.drawio", "09_Deployment_Diagram"),
    ("activity_uc01_auth.drawio", "Activity_UC01_Auth"),
    ("activity_uc02_listening.drawio", "Activity_UC02_Listening"),
    ("activity_uc03_reading.drawio", "Activity_UC03_Reading"),
    ("activity_uc04_writing.drawio", "Activity_UC04_Writing"),
    ("activity_uc05_speaking.drawio", "Activity_UC05_Speaking"),
    ("activity_uc07_custom_test.drawio", "Activity_UC07_Custom_Test"),
    ("activity_uc08_vocab.drawio", "Activity_UC08_Vocab"),
    ("sequence_uc01_auth.drawio", "Sequence_UC01_Auth"),
    ("sequence_uc02_listening.drawio", "Sequence_UC02_Listening"),
    ("sequence_uc03_reading.drawio", "Sequence_UC03_Reading"),
    ("sequence_uc05_speaking.drawio", "Sequence_UC05_Speaking"),
    ("sequence_uc06_mock_test.drawio", "Sequence_UC06_Mock_Test"),
    ("sequence_uc07_custom_test.drawio", "Sequence_UC07_Custom_Test"),
    ("sequence_uc08_vocab.drawio", "Sequence_UC08_Vocab"),
]

def run():
    print("=== 1. GENERATING ALL 23 INDIVIDUAL DRAW.IO DIAGRAMS ===")
    gen_use_case.generate()
    gen_activity_mock.generate()
    gen_sequence_ai.generate()
    gen_state_machine.generate()
    gen_class_diagram.generate()
    gen_database_erd.generate()
    gen_context_diagram.generate()
    gen_component_diagram.generate()
    gen_deployment_diagram.generate()
    gen_activities_uc.generate_all()
    gen_sequences_uc.generate_all()

    print("\n=== 2. COMBINING ALL 23 DIAGRAMS INTO MASTER MULTI-TAB DRAW.IO ===")
    diagram_nodes = []
    for filename, tab_name in ORDERED_FILES:
        filepath = os.path.join(DRAWIO_DIR, filename)
        if not os.path.exists(filepath):
            print(f"[WARN] File not found: {filename}")
            continue
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        match = re.search(r'(<diagram[\s\S]*?</diagram>)', content)
        if match:
            d_xml = match.group(1)
            # Ensure name and id match tab_name
            d_xml = re.sub(r'id="[^"]*"', f'id="{tab_name}"', d_xml, count=1)
            d_xml = re.sub(r'name="[^"]*"', f'name="{tab_name}"', d_xml, count=1)
            diagram_nodes.append(d_xml)
        else:
            print(f"[WARN] No diagram node found in {filename}")

    master_xml = f'''<mxfile host="app.diagrams.net" modified="2026-09-10T16:00:00.000Z" agent="5.0" version="21.6.8" type="device">
  {'\n  '.join(diagram_nodes)}
</mxfile>'''

    with open(MASTER_FILE, 'w', encoding='utf-8') as f:
        f.write(master_xml)
    print(f"[OK] Saved Master Multi-tab file: {MASTER_FILE} ({len(master_xml):,} bytes, {len(diagram_nodes)} tabs)")

if __name__ == '__main__':
    run()
