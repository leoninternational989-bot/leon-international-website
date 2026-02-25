import os
import glob
from PIL import Image

src_dir = r"C:\Users\ummeh\.gemini\antigravity\brain\22e24190-aafb-45ed-a6e5-2746e3a559fa"
dest_dir = r"d:\Projetcs\leon-international-website\public\Projects"

os.makedirs(dest_dir, exist_ok=True)

for file in glob.glob(os.path.join(src_dir, "*.png")):
    filename = os.path.basename(file)
    if any(k in filename for k in ["buoys_fabrication", "generator_overhauling", "loading_arms_repair", "fender_repair", "weighbridge_repair", "main_engine_overhaul"]):
        try:
            base_name = filename.rsplit('_', 1)[0] 
            img = Image.open(file)
            dest_path = os.path.join(dest_dir, f"{base_name}.webp")
            img.save(dest_path, "WEBP", quality=80, method=6)
            print(f"Converted {filename} -> {base_name}.webp")
        except Exception as e:
            print(f"Error converting {filename}: {e}")
