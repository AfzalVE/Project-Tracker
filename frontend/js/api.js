import { BACKEND_URL } from './env.js';
const API_URL = `${BACKEND_URL}/api`;

const api = {
    // Sections
    async getSections() {
        const res = await fetch(`${API_URL}/sections`);
        return res.json();
    },
    
    async addSection(data) {
        const res = await fetch(`${API_URL}/sections`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },
    
    async updateSection(id, data) {
        const res = await fetch(`${API_URL}/sections/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },
    
    async deleteSection(id) {
        const res = await fetch(`${API_URL}/sections/${id}`, { method: 'DELETE' });
        return res.json();
    },
    
    async reorderSections(sections) {
        const res = await fetch(`${API_URL}/sections/reorder`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sections })
        });
        return res.json();
    },

    // Tasks
    async getAllTasks() {
        const res = await fetch(`${API_URL}/tasks`);
        return res.json();
    },

    async addTask(data) {
        const res = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },
    
    async updateTask(id, data) {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },
    
    async deleteTask(id) {
        const res = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
        return res.json();
    },
    
    async toggleTask(id) {
        const res = await fetch(`${API_URL}/tasks/toggle/${id}`, { method: 'PUT' });
        return res.json();
    },
    
    async reorderTasks(tasks) {
        const res = await fetch(`${API_URL}/tasks/reorder`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tasks })
        });
        return res.json();
    }
};

export default api;
