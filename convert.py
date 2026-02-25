import os
import glob
from PIL import Image

src_dir = r"C:\Users\ummeh\.gemini\antigravity\brain\22e24190-aafb-45ed-a6e5-2746e3a559fa"
dest_dir = r"d:\Projetcs\leon-international-website\public\Products"

os.makedirs(dest_dir, exist_ok=True)

for file in glob.glob(os.path.join(src_dir, "*.png")):
    filename = os.path.basename(file)
    # Check if the file is one of our newly generated product images
    if any(k in filename for k in ["engine_parts", "diesel_generators", "turbocharger_spares", "navigation_systems", "electrical_equipment", "propulsion_systems", "deck_machinery", "hydraulic_equipment"]):
        try:
            # We want to name them properly without the timestamp suffix
            # E.g. engine_parts_1234567.png -> engine_parts.webp
            base_name = filename.rsplit('_', 1)[0] 
            
            img = Image.open(file)
            dest_path = os.path.join(dest_dir, f"{base_name}.webp")
            
            img.save(dest_path, "WEBP", quality=80, method=6)
            print(f"Converted {filename} -> {base_name}.webp")
        except Exception as e:
            print(f"Error converting {filename}: {e}")
