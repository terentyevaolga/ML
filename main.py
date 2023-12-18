import random

import cv2
import numpy as np
import pygame
import pytesseract


def dist(pointA, pointB):
    return np.sqrt((pointA[0] - pointB[0]) ** 2 + (pointA[1] - pointB[1]) ** 2)


def near_points(point):
    count = random.randint(2, 5)
    points_array = []
    for i in range(count):
        x = random.randint(-20, 20)
        y = random.randint(-20, 20)
        points_array.append((point[0] + x, point[1] + y))
    return points_array


if __name__ == '__main__':
    HEIGHT = 400
    pygame.init()
    screen = pygame.display.set_mode((600, HEIGHT))
    screen.fill(color="#FFFFFF")
    pygame.display.update()
    is_active = True
    is_pressed = False
    count_of_keyup = 0
    clock = pygame.time.Clock()

    while (is_active):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                is_active = False
            if event.type == pygame.MOUSEMOTION:
                if event.buttons[0]:  # Left mouse button down.
                    last = (event.pos[0] - event.rel[0], event.pos[1] - event.rel[1])
                    pygame.draw.line(screen, 'black', last, event.pos, 10)
            if event.type == pygame.KEYUP:
                if event.key == 13:
                    pygame.image.save(screen, "screenshot.png")
            pygame.display.update()
        clock.tick(30)
    img = cv2.imread('screenshot.png')
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    config = r'--oem 3 --psm 6 -c tessedit_char_whitelist=0123456789-,.'
    result = pytesseract.image_to_string(img, config=config)

    i = 0
    if len(result) > 2:
        while result[i] == '0':
            if result == "0\n":
                break
            result = str(result).replace("0", "", 1)

    print(result)