#!/usr/bin/env python3
"""Detect face in the user's newly cropped poster (511x437) to build the
19:6 landscape divider while keeping the face visible."""
import cv2

src = '/home/z/my-project/upload/hero-image.png'
img = cv2.imread(src)
H, W = img.shape[:2]
print(f'Image: {W}x{H}')

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = cv2.equalizeHist(gray)

for name in ['haarcascade_frontalface_default.xml', 'haarcascade_frontalface_alt2.xml']:
    cascade = cv2.CascadeClassifier(cv2.data.haarcascades + name)
    faces = cascade.detectMultiScale(gray, scaleFactor=1.05, minNeighbors=5, minSize=(30, 30))
    if len(faces):
        print(f'{name}: {len(faces)} face(s)')
        for (x, y, w, h) in faces:
            print(f'  box: x={x} y={y} w={w} h={h} center=({x+w//2},{y+h//2})')
        break
else:
    print('No face detected')
