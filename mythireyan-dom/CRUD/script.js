// CRUD Application with Inline Editing

// DOM Elements
const itemForm = document.getElementById('item-form');
const itemNameInput = document.getElementById('item-name');
const itemsContainer = document.getElementById('items-container');
const itemCount = document.getElementById('item-count');
const recentDelete=document.querySelector(".recent")

// Data Storage
let items = JSON.parse(localStorage.getItem('crudItems')) || [];
let recent = JSON.parse(localStorage.getItem('deleteitem')) || [];
// console.log(recent);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    deleteRender()
    renderItems();
    
});

// Save to localStorage
function saveItems() {
    localStorage.setItem('crudItems', JSON.stringify(items));
}

//save to Delete

// function deleteItemsave(recent){
    
//     console.log("dei");
    
// }


// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// CREATE - Add new item
function createItem(name) {
    const newItem = {
        id: generateId(),
        name: name.trim()
    };
    items.unshift(newItem);
    saveItems();
    return newItem;
}

// UPDATE - Update item
function updateItem(id, newName) {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items[index].name = newName.trim();
        saveItems();
        return true;
    }
    return false;
}

// DELETE - Remove item
function deleteItem(id) {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        let str=items.splice(index, 1);
        // console.log(str[0].id,str[0].name);
        recent.push({id:str[0].id,name:str[0].name})
        
        localStorage.setItem('deleteitem',JSON.stringify(recent))
        saveItems();
       deleteRender();
        return true;
    }
    return false;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Render items
function renderItems() {
    itemCount.textContent = `(${items.length})`;
    
    if (items.length === 0) {
        itemsContainer.innerHTML = '<li class="empty-message">No items yet. Add your first item above!</li>';
        return;
    }
    
    itemsContainer.innerHTML = items.map(item => `
        <li class="item" data-id="${item.id}">
            <span class="item-text" ondblclick="startEdit('${item.id}')">${escapeHtml(item.name)}</span>
            <div class="item-actions">
                <button class="btn-icon btn-edit" onclick="startEdit('${item.id}')" title="Edit">✏️</button>
                <button class="btn-icon btn-delete" onclick="confirmDelete('${item.id}')" title="Delete">🗑️</button>
            </div>
        </li>
    `).join('');

    

    
}

function deleteRender(){
        recentDelete.innerHTML = recent.map(item => `
        <li class="item" data-id="${item.id}">
            <span class="item-text" ondblclick="startEdit('${item.id}')">${escapeHtml(item.name)}</span>
            <div class="item-actions">
               <button type="submit" class="btn btn-primary recovrey">Recovrey</button>
            </div>
        </li>
    `).join('');
    console.log("delete");
    
    }

    //Recovrey
   recentDelete.addEventListener('click', (e) => {
    if (e.target.classList.contains('recovrey')) {
        const li = e.target.closest('li'); // correct parent
        const id = li.dataset.id;
        console.log("Recover ID:", id);
        recoverItem(id);
    }
});

function recoverItem(id){

     recent = JSON.parse(localStorage.getItem('deleteitem')) || [];
    let find= recent.findIndex(i=>i.id==id)
    if(find==-1){
        return
    }

    
    let final=recent.splice(find,1)
    items.push({id:final[0].id,name:final[0].name})

    

    localStorage.setItem('deleteitem',JSON.stringify(recent))
    saveItems();
    renderItems();
    deleteRender()
    // console.log(final);
    
}





// Start inline editing
function startEdit(id) {
    const item = items.find(item => item.id === id);
    if (!item) return;
    
    const listItem = document.querySelector(`li[data-id="${id}"]`);
    if (!listItem) return;
    
    // Replace text with input
    listItem.innerHTML = `
        <input type="text" class="item-edit-input" value="${escapeHtml(item.name)}" 
               onkeydown="handleEditKeydown(event, '${id}')" autofocus>
        <div class="item-actions">
            <button class="btn-icon btn-save" onclick="saveEdit('${id}')" title="Save">✓</button>
            <button class="btn-icon btn-cancel" onclick="cancelEdit()" title="Cancel">✕</button>
        </div>
    `;
    
    // Focus and select input
    const input = listItem.querySelector('.item-edit-input');
    input.focus();
    input.select();
}

// Handle keyboard events during edit
function handleEditKeydown(event, id) {
    if (event.key === 'Enter') {
        event.preventDefault();
        saveEdit(id);
    } else if (event.key === 'Escape') {
        cancelEdit();
    }
}

// Save edited item
function saveEdit(id) {
    const listItem = document.querySelector(`li[data-id="${id}"]`);
    const input = listItem.querySelector('.item-edit-input');
    const newName = input.value.trim();
    
    if (newName === '') {
        alert('Item name cannot be empty');
        input.focus();
        return;
    }
    
    updateItem(id, newName);
    renderItems();
}

// Cancel editing
function cancelEdit() {
    renderItems();
}

// Confirm and delete item
function confirmDelete(id) {
    const item = items.find(item => item.id === id);
    if (item) {
        deleteItem(id);
        renderItems();
    }
}

// Form submit handler
itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = itemNameInput.value.trim();
    if (!name) {
        alert('Please enter an item name');
        return;
    }
    
    createItem(name);
    itemNameInput.value = '';
    renderItems();
    itemNameInput.focus();
});