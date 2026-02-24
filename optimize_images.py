import os
from PIL import Image

def optimize_images(directory, max_size_kb=500, max_width=1920):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                filepath = os.path.join(root, file)
                try:
                    size_kb = os.path.getsize(filepath) / 1024
                    if size_kb > max_size_kb:
                        print(f"Optimizing {file} ({size_kb:.0f}KB)...")
                        
                        img = Image.open(filepath)
                        
                        # Resize if too wide
                        if img.width > max_width:
                            ratio = max_width / img.width
                            new_height = int(img.height * ratio)
                            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                        
                        # Save with optimization
                        if file.lower().endswith('.png'):
                             # Convert PNG to optimized format, preserving transparency
                             img.save(filepath, optimize=True)
                        else:
                             # Save JPG with 80% quality
                             img.save(filepath, quality=80, optimize=True)
                             
                        new_size_kb = os.path.getsize(filepath) / 1024
                        print(f"  -> Reduced to {new_size_kb:.0f}KB")
                except Exception as e:
                    print(f"Error optimizing {file}: {e}")

if __name__ == "__main__":
    print("Starting image optimization...")
    optimize_images('assets')
    print("Optimization complete!")
