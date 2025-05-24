import os
import ctypes
from PIL import Image

def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

def scale_images_in_folder():
    script_dir = os.path.dirname(os.path.abspath(__file__))

    if script_dir.lower().startswith("c:\\windows\\system32"):
        print("❌ Script is running in System32. Aborting to prevent risk.")
        input("Press Enter to exit...")
        return

    print(f"📁 You're about to scale all images in: {script_dir}")
    confirm = input("Are you SURE you want to continue? (yes/no): ").strip().lower()
    if confirm != "yes":
        print("Aborted.")
        return

    image_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.gif', '.tiff')

    for filename in os.listdir(script_dir):
        if filename.lower().endswith(image_extensions):
            image_path = os.path.join(script_dir, filename)
            try:
                with Image.open(image_path) as img:
                    new_width = img.width // 2
                    new_height = img.height // 2
                    new_img = img.resize((new_width, new_height), Image.LANCZOS)
                    new_img.save(image_path)
                    print(f"✅ Scaled: {filename} to {new_width}x{new_height}")
            except Exception as e:
                print(f"❌ Failed to process {filename}: {e}")

if __name__ == "__main__":
    if is_admin():
        print("❌ You're running this script as Administrator. For safety, it will not continue.")
        input("Press Enter to exit...")
    else:
        scale_images_in_folder()
        input("\nDone. Press Enter to exit...")
