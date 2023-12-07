const fs = require('fs').promises; 
const path = require('path');
const Task = require('../models/taskModel');
const User = require('../models/userModel');



async function loadTasks() {
  try {
    const tasks = await Task.find();
    console.log('Tasks loaded successfully.');
    return tasks;
  } catch (error) {
    console.error('Error loading tasks:', error);
    throw error;
  }
}


async function saveTasks(tasks) {
  try {
    for (const task of tasks) {
      await Task.findOneAndUpdate({ _id: task._id }, task, { upsert: true, new: true });
    }

    console.log('Tasks saved successfully to MongoDB.');
  } catch (error) {
    console.error('Error saving tasks to MongoDB:', error);
  }
};

async function createTask(taskContent) {
  try {
    const newTask = new Task({
      title: taskContent,
      completed: false,
    });
    
    const savedTask = await newTask.save(); 

    return savedTask; 
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}




async function getAllTasks() {
  return await loadTasks();
}



async function getTaskById(id) {
  try {
    const task = await Task.findById(id);
    return task;
  } catch (error) {
    console.error('Error getting task by ID:', error);
    return null;
  }
}

async function updateTask(id, updatedContent) {
  try {
    const task = await Task.findByIdAndUpdate(id, { task: updatedContent }, { new: true });
    return task;
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
}

async function toggleTaskStatus(id) {
  try {
    const task = await Task.findById(id);
    if (task) {
      task.checked = !task.checked;
      await task.save();
      return task;
    }
    return null;
  } catch (error) {
    console.error('Error toggling task status:', error);
    return null;
  }
}

async function deleteTask(id) {
  try {
    const result = await Task.findByIdAndRemove(id);
    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
}


module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  toggleTaskStatus,
  deleteTask,
};
