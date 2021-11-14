export enum Languages {
  python = 'Python',
  c = 'C',
  cpp = 'C++',
}

export const fontSizes = [14, 16, 18, 20, 24, 28, 32, 40]

export const initialCodeText = {
  [Languages.python]: `import api


# TODO: add your algorithm


api.stop_simulation()




# # API CALLS
# # Sensors
# isFront = api.front_wall_exists()
# isLeft = api.left_wall_exists()
# isRight = api.right_wall_exists()

# # Control
# api.move_forward()
# api.turn_left()
# api.turn_right()

# # Maze info
# height = api.get_maze_height()
# width = api.get_maze_width()
# area = api.get_goal_area()
# is_full_size = api.is_full_size()

# # Debug
# api.console_log('Hello')
# api.set_cell_text(1, 1, '123')

# # Stop
# api.stop_simulation()
`,
  [Languages.cpp]: `#include <iostream>
#include <string>

#include "api.h"

int main(int argc, char* argv[]) {
    
    // TODO: add your algorithm
    
    Api::stopSimulation();
}

// // API CALLS
// // Sensor
// bool isFront = Api::frontWallExists();
// bool isLeft = Api::leftWallExists();
// bool isRight = Api::rightWallExists();

// // Control
// Api::moveForward();
// Api::turnLeft();
// Api::turnRight();

// // Maze info
// int width = Api::getMazeWidth();
// int height = Api::getMazeHeight();
// GoalArea ga = Api::getGoalArea();
// bool isFullSize = Api::isFullSize();

// // Feedback: console
// Api::consoleLog("Hello");
// // Feedback: cell text
// Api::setCellText(1, 2, "123");

// // Stop
// Api::stopSimulation();
`,
  [Languages.c]: `#include <stdio.h>

#include "api.h"

int main(int argc, char* argv[]) {
    
    // TODO: add your algorithm
    
    Api_stopSimulation();
}

// // API CALLS
// // Sensor
// int isFront = Api_frontWallExists();
// int isLeft = Api_leftWallExists();
// int isRight = Api_rightWallExists();

// // Control
// Api_moveForward(1);
// Api_turnLeft();
// Api_turnRight();

// // Maze info
// int w = Api_getMazeWidth();
// int h = Api_getMazeHeight();
// int isFullSize = Api_isFullSize();
// struct GoalArea ga = Api_getGoalArea();

// // Feedback
// Api_consoleLog("hello");
// Api_setCellText(1, 2, "AB2");

// // Stop simulation
// Api_stopSimulation();
`,
}
