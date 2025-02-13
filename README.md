                                    😎TaskMate😎
                         😊React Native Task Manager App😊

TaskMate is a simple yet powerful task management app built with **React Native** and **Expo**, featuring Redux for state management and **AsyncStorage** for local data persistence. The app provides users with an intuitive interface to create, manage, and track tasks efficiently.  

App Structure

The application is divided into three main tabs:  

1. Home 
The Home tab serves as an overview dashboard displaying key task statistics, including:  
- Total Tasks: The total number of tasks created by the user.  
- Pending Tasks: The count of tasks that are yet to be completed.  

Additionally, users can quickly navigate to:  
- View All Tasks**: Redirects to the "All Tasks" tab to browse the complete list of tasks.  
- Create New Task**: Redirects to the "Create Task" tab to add a new task.  

2. All Tasks 
The All Tasks tab provides a comprehensive list of all created tasks in a structured card format. Each task card displays:  
- Task Title
- Task Description
- Due Date 

Users have the following options:  
- Edit Task: Allows modification of the task title, description, and due date. The user will be redirected to an edit screen where they can update the task details.  
- Delete Task**: Permanently removes the specific task from the list.  

3. Create Task**  
The Create Task tab enables users to add new tasks. Users must provide:  
- Title (Required)  
- Description (Required)
- Due Date (Optional) (Defaults to today’s date if left unspecified)  

This structured approach ensures users can efficiently manage their tasks, keep track of pending work, and stay organized.  
