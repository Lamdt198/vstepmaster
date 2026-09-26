import glob
import os
import xml.etree.ElementTree as ET

def fix_all_drawio():
    files = glob.glob('diagrams/drawio/*.drawio')
    print(f"Checking {len(files)} drawio files...")
    
    total_fixed_cells = 0
    for file_path in files:
        tree = ET.parse(file_path)
        root = tree.getroot()
        file_fixed = 0
        
        for cell in root.iter('mxCell'):
            val = cell.attrib.get('value', '')
            style = cell.attrib.get('style', '')
            
            # If value contains html tags or formatting
            if ('<' in val and '>' in val) or '&lt;' in val or '&gt;' in val:
                if 'html=1' not in style:
                    if style and not style.endswith(';'):
                        style += ';'
                    style += 'html=1;'
                    cell.attrib['style'] = style
                    file_fixed += 1
            
            # Clean up double escaped &lt;&lt; to proper « » or clean text
            if '&amp;lt;&amp;lt;' in val:
                val = val.replace('&amp;lt;&amp;lt;', '«').replace('&amp;gt;&amp;gt;', '»')
                cell.attrib['value'] = val
                file_fixed += 1
                
        if file_fixed > 0:
            tree.write(file_path, encoding='utf-8', xml_declaration=False)
            total_fixed_cells += file_fixed
            print(f"  Fixed {file_fixed} cells in {os.path.basename(file_path)}")
            
    print(f"Done. Fixed {total_fixed_cells} cells across all drawio files.")

if __name__ == '__main__':
    fix_all_drawio()
