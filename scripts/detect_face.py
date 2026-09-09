#!/usr/bin/env python3
"""Detect face position in hero-image.png to plan a 19:6 landscape crop
that keeps the face fully visible."""
import cv2

src = '/home/z/my-project/public/hero-image.png'
img = cv2.imread(src)
H, W = img.shape[:2]
print(f'Image size: {W}x{H} (portrait)')

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = cv2.equalizeHist(gray)

cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
faces = cascade.detectMultiScale(gray, scaleFactor=1.05, minNeighbors=5, minSize=(40, 40))

if len(faces) == 0:
    cascade2 = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_alt2.xml')
    faces = cascade2.detectMultiScale(gray, scaleFactor=1.05, minNeighbors=5, minSize=(40, 40))

print(f'Faces found: {len(faces)}')
for (x, y, w, h) in faces:
    print(f'  face box: x={x}, y={y}, w={w}, h={h}  -> center=({x+w//2}, {y+h//2})')

if len(faces):
    fx, fy, fw, fh = faces[0]
    top = max(0, fy - int(0.45 * fh))
    bottom = min(H, fy + fh + int(0.9 * fh))
    left = max(0, fx - int(0.8 * fw))
    right = min(W, fx + fw + int(0.8 * fw))
    print(f'Head+shoulders safe zone: x[{left},{right}] y[{top},{bottom}]')

target_ratio = 19 / 6
crop_h = int(round(W / target_ratio))
print(f'Crop window at full width {W}px: height = {crop_h}px (ratio 19:6)')
for (x, y, w, h) in faces:
    fc = y + h // 2
    print(f'  face center y={fc}; ideal crop top so face sits ~38% from top: {max(0, fc - int(crop_h*0.38))}')
