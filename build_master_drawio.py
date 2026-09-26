import os
import sys
import xml.etree.ElementTree as ET

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

DRAWIO_DIR = "diagrams/drawio"
MASTER_FILE = os.path.join(DRAWIO_DIR, "VSTEP_Master_All_Diagrams.drawio")

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

def build_master():
    master_root = ET.Element("mxfile", {
        "host": "app.diagrams.net",
        "modified": "2026-09-10T15:20:00.000Z",
        "agent": "5.0",
        "version": "21.6.8",
        "type": "device"
    })

    print(f"Consolidating {len(ORDERED_FILES)} files into master...")
    for filename, tab_name in ORDERED_FILES:
        filepath = os.path.join(DRAWIO_DIR, filename)
        if not os.path.exists(filepath):
            print(f"WARNING: File {filename} not found!")
            continue

        tree = ET.parse(filepath)
        root = tree.getroot()
        diagram = root.find("diagram")
        if diagram is not None:
            diagram.attrib["name"] = tab_name
            diagram.attrib["id"] = tab_name
            master_root.append(diagram)
            print(f"  + Added tab: {tab_name} from {filename}")
        else:
            print(f"  ERROR: No diagram tag in {filename}")

    master_tree = ET.ElementTree(master_root)
    ET.indent(master_tree, space="  ", level=0)
    master_tree.write(MASTER_FILE, encoding="utf-8", xml_declaration=False)
    print(f"\nSaved master file: {MASTER_FILE} ({os.path.getsize(MASTER_FILE):,} bytes)")

if __name__ == "__main__":
    build_master()
