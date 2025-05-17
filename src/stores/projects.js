
import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { createProject, getAllProjects } from '@/api/supabase/projectsApi'

export const useProjectsStore = defineStore('projects', () => {

  // State
  const projects = reactive([])

  // Getters

  
  // Actions
  async function creatTask(title, descrption) {
    try {
      const data = await createProject(title,descrption)
      projects.push(data)

    } catch (err) {
      console.log(err)
    }
  }

  async function readTask() {
    try {
      const data = await getAllProjects()
      projects.push(...data)

    } catch (err) {
      console.log(err)
    }
  }

  async function deleteTask() {
    try {
      const data = await getAllProjects()
      projects.push(...data)

    } catch (err) {
      console.log(err)
    }
  }

  async function updateTask() {
    try {
      const data = await getAllProjects()
      projects.push(...data)

    } catch (err) {
      console.log(err)
    }
  }

  return { 
    // State
    projects, 
    
    // Getters

    // Actions
    readTask,
    creatTask,
    updateTask,
    deleteTask
  
  
  }
})