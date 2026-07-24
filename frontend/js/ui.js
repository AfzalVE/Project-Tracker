export const ui = {
    showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500'
        };
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };

        toast.className = `toast-enter ${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center min-w-[250px]`;
        toast.innerHTML = `
            <i class="fa-solid ${icons[type]} mr-3 text-lg"></i>
            <span class="font-medium text-sm">${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.remove('toast-enter');
            toast.classList.add('toast-enter-active');
        });
        
        setTimeout(() => {
            toast.classList.remove('toast-enter-active');
            toast.classList.add('toast-leave');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    getPriorityColor(priority) {
        const p = priority.toLowerCase();
        if (p === 'critical') return 'text-red-600 bg-red-100 border-red-200 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400';
        if (p === 'high') return 'text-orange-600 bg-orange-100 border-orange-200 dark:bg-orange-900/30 dark:border-orange-800 dark:text-orange-400';
        if (p === 'medium') return 'text-blue-600 bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400';
        return 'text-green-600 bg-green-100 border-green-200 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400';
    },

    renderSections(sections, tasks, state) {
        const container = document.getElementById('sectionsContainer');
        container.innerHTML = '';

        if (sections.length === 0) {
            container.innerHTML = `
                <div class="text-center py-16 bg-white dark:bg-darkCard rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fa-solid fa-folder-open text-3xl text-gray-400"></i>
                    </div>
                    <h3 class="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">No Sections Found</h3>
                    <p class="text-gray-500 dark:text-gray-400 mb-6">Create a section to start managing your roadmap.</p>
                    <button class="add-section-btn bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-md transition-colors">
                        <i class="fa-solid fa-plus mr-2"></i> Add First Section
                    </button>
                </div>
            `;
            return;
        }

        sections.forEach(section => {
            const sectionTasks = tasks.filter(t => t.sectionId === section._id);
            
            // Apply sorting and filtering
            let filteredTasks = [...sectionTasks];
            if (state.filter !== 'all') {
                if (state.filter === 'completed') filteredTasks = filteredTasks.filter(t => t.completed);
                else if (state.filter === 'pending') filteredTasks = filteredTasks.filter(t => !t.completed);
                else if (state.filter === 'critical') filteredTasks = filteredTasks.filter(t => t.priority.toLowerCase() === 'critical');
            }
            if (state.searchQuery) {
                const q = state.searchQuery.toLowerCase();
                if (!section.title.toLowerCase().includes(q)) {
                    filteredTasks = filteredTasks.filter(t => 
                        t.title.toLowerCase().includes(q) || 
                        t.notes.toLowerCase().includes(q) || 
                        (t.assignee && t.assignee.toLowerCase().includes(q))
                    );
                    // If section doesn't match search and has no matching tasks, don't show it
                    if (filteredTasks.length === 0) return;
                }
            }
            
            // Sorting
            if (state.sortBy === 'priority') {
                const pVals = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
                filteredTasks.sort((a, b) => pVals[b.priority] - pVals[a.priority]);
            } else if (state.sortBy === 'date') {
                filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } else {
                filteredTasks.sort((a, b) => a.order - b.order);
            }

            const total = sectionTasks.length;
            const completed = sectionTasks.filter(t => t.completed).length;
            const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

            const sectionEl = document.createElement('div');
            sectionEl.className = 'section-card bg-white dark:bg-darkCard rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden fade-in';
            sectionEl.dataset.id = section._id;

            sectionEl.innerHTML = `
                <!-- Section Header -->
                <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex flex-wrap items-center justify-between group cursor-pointer toggle-section" data-id="${section._id}">
                    <div class="flex items-center space-x-3 w-full sm:w-auto">
                        <button class="text-gray-400 hover:text-primary transition-colors focus:outline-none transform ${section.collapsed ? '-rotate-90' : 'rotate-0'} transition-transform duration-300">
                            <i class="fa-solid fa-chevron-down"></i>
                        </button>
                        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">${section.title}</h2>
                        <span class="text-xs font-medium px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
                            ${completed}/${total} Tasks
                        </span>
                    </div>
                    
                    <div class="flex items-center space-x-4 w-full sm:w-auto mt-3 sm:mt-0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <div class="flex items-center space-x-2 mr-2">
                            <button class="edit-section-btn p-1.5 text-gray-400 hover:text-blue-500 transition-colors" data-id="${section._id}" data-title="${section.title}" title="Edit Section">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="duplicate-section-btn p-1.5 text-gray-400 hover:text-green-500 transition-colors" data-id="${section._id}" title="Duplicate Section">
                                <i class="fa-regular fa-copy"></i>
                            </button>
                            <button class="delete-section-btn p-1.5 text-gray-400 hover:text-red-500 transition-colors" data-id="${section._id}" title="Delete Section">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                            <div class="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
                            <div class="section-drag-handle p-1.5 text-gray-400 cursor-grab hover:text-gray-600 dark:hover:text-gray-200" title="Drag to reorder">
                                <i class="fa-solid fa-grip-vertical"></i>
                            </div>
                        </div>
                        <button class="add-task-btn bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-sm font-medium transition-colors" data-section-id="${section._id}">
                            <i class="fa-solid fa-plus mr-1"></i> Add Task
                        </button>
                    </div>
                </div>
                
                <!-- Section Progress -->
                <div class="h-1 w-full bg-gray-100 dark:bg-gray-800">
                    <div class="h-full bg-primary transition-all duration-500" style="width: ${progress}%"></div>
                </div>

                <!-- Task List Container -->
                <div class="p-4 overflow-x-auto" id="task-list-container-${section._id}" style="${section.collapsed ? 'display: none;' : ''}">
                    <div class="min-w-[700px]">
                        <!-- Table Header -->
                        ${filteredTasks.length > 0 ? `
                        <div class="grid grid-cols-[30px_auto_150px_100px_100px_120px] gap-4 px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 mb-2">
                        <div></div>
                        <div>Task Name</div>
                        <div>Assignee</div>
                        <div>Priority</div>
                        <div>Status</div>
                        <div class="text-right">Actions</div>
                    </div>` : ''}
                    
                        <div class="tasks-container flex flex-col space-y-1" id="task-list-${section._id}">
                            ${filteredTasks.length === 0 ? `<p class="text-center text-sm text-gray-500 dark:text-gray-400 py-4 italic">No tasks found.</p>` : ''}
                        </div>
                    </div>
                </div>
            `;

            container.appendChild(sectionEl);
            
            const taskList = sectionEl.querySelector('.tasks-container');
            const containerEl = sectionEl.querySelector(`#task-list-container-${section._id}`);

            // Update toggle logic to hide the container properly
            const toggleBtn = sectionEl.querySelector('.toggle-section');
            toggleBtn.addEventListener('click', (e) => {
                // we handle the API logic in events.js, but we can also handle visual collapse there or here
            });
            
            filteredTasks.forEach(task => {
                const taskEl = document.createElement('div');
                taskEl.className = `task-item group grid grid-cols-[30px_auto_150px_100px_100px_120px] gap-4 items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 ${task.completed ? 'task-completed' : ''}`;
                taskEl.dataset.id = task._id;
                
                taskEl.innerHTML = `
                    <div class="flex items-center">
                        <div class="task-drag-handle px-1 text-gray-300 dark:text-gray-600 cursor-grab hover:text-gray-500 dark:hover:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <i class="fa-solid fa-grip-vertical"></i>
                        </div>
                    </div>
                    
                    <div class="flex-1 min-w-0 pr-4">
                        <h4 class="task-title text-sm font-medium text-gray-800 dark:text-gray-200 truncate ${task.completed ? 'text-gray-500 dark:text-gray-400' : ''}">${task.title}</h4>
                        ${task.notes ? `<p class="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">${task.notes}</p>` : ''}
                    </div>

                    <div class="truncate text-sm text-gray-600 dark:text-gray-300 flex items-center">
                        ${task.assignee ? `<div class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold mr-2 uppercase">${task.assignee.charAt(0)}</div> <span class="truncate">${task.assignee}</span>` : `<span class="text-gray-400 text-xs italic">Unassigned</span>`}
                    </div>
                    
                    <div>
                        <span class="text-xs px-2 py-1 rounded-md border ${this.getPriorityColor(task.priority)} font-medium inline-block">
                            ${task.priority}
                        </span>
                    </div>

                    <div>
                        <button class="toggle-task text-xs px-2.5 py-1 rounded-md font-medium border transition-colors ${task.completed ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-200'}" data-id="${task._id}">
                            ${task.completed ? '<i class="fa-solid fa-check mr-1"></i> Completed' : 'Pending'}
                        </button>
                    </div>
                    
                    <div class="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="edit-task-btn p-1.5 text-gray-400 hover:text-blue-500 transition-colors rounded hover:bg-blue-50 dark:hover:bg-blue-900/30" data-id="${task._id}" title="Edit">
                            <i class="fa-solid fa-pen text-sm"></i>
                        </button>
                        <button class="duplicate-task-btn p-1.5 text-gray-400 hover:text-green-500 transition-colors rounded hover:bg-green-50 dark:hover:bg-green-900/30" data-id="${task._id}" title="Duplicate">
                            <i class="fa-regular fa-copy text-sm"></i>
                        </button>
                        <button class="delete-task-btn p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded hover:bg-red-50 dark:hover:bg-red-900/30" data-id="${task._id}" title="Delete">
                            <i class="fa-solid fa-trash text-sm"></i>
                        </button>
                    </div>
                `;
                
                if (filteredTasks.length > 0) {
                    taskList.appendChild(taskEl);
                }
            });
        });
    },

    updateDashboard(tasks) {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

        document.getElementById('statTotalTasks').innerText = total;
        document.getElementById('statCompleted').innerText = completed;
        document.getElementById('statPending').innerText = pending;
        
        document.getElementById('statProgressBar').style.width = `${progress}%`;
        document.getElementById('statProgressText').innerText = `${progress}%`;
        
        document.getElementById('navProgressBar').style.width = `${progress}%`;
        document.getElementById('navProgressText').innerText = `${progress}%`;
    },

    openModal(id) {
        const modal = document.getElementById(id);
        modal.classList.remove('hidden');
        modal.classList.add('modal-open');
        // trigger reflow
        void modal.offsetWidth;
        modal.classList.add('show');
    },

    closeModal(id) {
        const modal = document.getElementById(id);
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.remove('modal-open');
            modal.classList.add('hidden');
        }, 300);
    }
};
