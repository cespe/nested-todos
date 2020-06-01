// Beasts 8. Nested todos 

/********************************* Data manipulation ***********************************/

var todos = [];

// Allowed values for the lifecycle stage a todo is in
var todoStages = new Set();
todoStages.add('active');
todoStages.add('completed');
todoStages.add('canceled');								// TODO add buttons to cancel todos

// Restore a todo from JSON storage or create a new todo with supplied entry
function Todo(entry) {
	if (typeof entry === 'object') {
		// Restore JSON data fields from storage into a proper object with methods
		this.entry = entry.entry;
		this.id = entry.id;
		this.children = entry.children;
		this.collapsed = entry.collapsed;
		this.deleted = entry.deleted;
		this.stage = entry.stage;
		this.selected = entry.selected;
		this.selectMode = entry.selectMode;
		this.filteredIn = entry.filteredIn;
		this.filteredOutParentOfFilteredIn = entry.filteredOutParentOfFilteredIn;
	} else {
		if (typeof entry === 'string') {
			this.entry = entry;
		} else {
			this.entry = "";
		}
		this.id = Math.random().toString(36).slice(2);
		this.children = [];
		this.collapsed = false;							// flag to manage showing or hiding nested todos
		this.deleted = false;							// flag to enable undelete
		this.stage = 'active';							// new todo starts out active
	
		this.selected = false;
		this.selectMode = false;						// flag to manage UI in select mode
	
		this.filteredIn = true;							// new todo is filtered in for display on creation 
		this.filteredOutParentOfFilteredIn = false;		// true if this todo is filtered out but descendant(s) are not
	}
}

Todo.prototype.changeId = function() {
	this.id = Math.random().toString(36).slice(2);
}

Todo.prototype.update = function(changedEntry) {
	this.entry = changedEntry;
}

Todo.prototype.markSelected = function(bool) {
	this.selected = bool;
}

Todo.prototype.markSelectMode = function(bool) {
	this.selectMode = bool;
}

Todo.prototype.markDeleted = function(bool) {
	this.deleted = bool;
}
Todo.prototype.setStage = function(stage) {
	if (todoStages.has(stage)) {
		this.stage = stage;
	}
}
Todo.prototype.addChild = function(child) {
	this.children.push(child);
}
Todo.prototype.markCollapsed = function(bool) {
	this.collapsed = bool;
}
Todo.prototype.markFilteredIn = function(filterSet) {
	this.filteredIn = false;
	var stageTag = '#' + this.stage;
	if (this.deleted) {
		if (filterSet.has('#deleted')) {
			this.filteredIn = true;
		}
	} else if (filterSet.has(stageTag)) {
		this.filteredIn = true;
	}
}
Todo.prototype.markFilteredOutParentOfFilteredIn = function() {
	this.filteredOutParentOfFilteredIn = false;
	if (this.filteredIn === false && this.children.length > 0) {
		for (var i = 0; i < this.children.length; i++) {
			var child = this.children[i];
			if (child.filteredIn || child.filteredOutParentOfFilteredIn) {
				this.filteredOutParentOfFilteredIn = true;
				return;
			} 
		}
	}
}

function insertTodo(array, todoToInsert, todoBeforeInsertionPoint) {

	// Enforce unique todo ids in the array.
	
	while (	array.find(function(el) {
				if (el.id === todoToInsert.id) {
					return el
				}
			})) {

		todoToInsert.id = Math.random().toString(36).slice(2);
	}

	// Default to push if not inserting.
	
	if (todoBeforeInsertionPoint === undefined) {
		array.push(todoToInsert);

	} else {

	// Insert new todo.
	
	var position = array.indexOf(todoBeforeInsertionPoint) + 1;
	array.splice(position, 0, todoToInsert);
	}
}

function deleteTodo(array, todo) {
	var position = array.indexOf(todo);
	array.splice(position, 1);
}

function applyDisplayTags(filterSet) {

	// Recurse to set filteredIn and filteredOutParentOfFilteredIn flags for each todo
	function markFilteredInTodos(todosArray) {
		for (var i = 0; i < todosArray.length; i++) {
			var todo = todosArray[i];
			if (todo.children.length > 0) {
				markFilteredInTodos(todo.children);
			}
			todo.markFilteredIn(filterSet);
			if (!todo.filteredIn && todo.selected) {
				todo.filteredIn = true;				// selected todos should remain on display even if a filter
													// says otherwise
			}												
			todo.markFilteredOutParentOfFilteredIn();
			if (todo.filteredOutParentOfFilteredIn) {
				todo.collapsed = false;				// ensure that filtered-in children are visible
			}
		}
	}

	markFilteredInTodos(todos);
}

// Recursively mark todo.selectMode true or false, starting with given array
function markTodosSelectMode(todosArray, bool) {
	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		if (todo.children.length > 0) {
			markTodosSelectMode(todo.children, bool);
		}
		todo.selectMode = bool;
	}
}

// Recursively mark todo.selected true or false for filtered-in todos, starting with given array
function markFilteredInTodosSelected(todosArray, bool) {
	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		if (todo.children.length > 0) {
			markFilteredInTodosSelected(todo.children, bool);
		}
		if (todo.filteredIn) {
			todo.selected = bool;
		} else {
			todo.selected = false;				// excludes filtered-out todos
		}
	}
}

// Recursively set given stage (active, completed, etc.) for selected nested todos, starting with given array
function setSelectedTodosStage(todosArray, stage) {
	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		if (todo.children.length > 0) {
			setSelectedTodosStage(todo.children, stage);
		}
		if (todo.selected) {
			todo.setStage(stage);
		}
	}
}

// Recursively mark selected todos deleted or undeleted, starting with given array
function markSelectedTodosDeleted(todosArray, bool) {
	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		if (todo.children.length > 0) {
			markSelectedTodosDeleted(todo.children, bool);
		}
		if (todo.selected) {
		todo.deleted = bool;
		}
	}
}

function purgeSelectedDeletedTodos(array) {
	var counter = array.length;
	for (var i = counter - 1; i >= 0; i--) {
		var todo = array[i];
		if (todo.deleted && todo.selected) {
			deleteTodo(array, todo);
		} else if (todo.children.length > 0) {
			purgeSelectedDeletedTodos(todo.children);
		}
	}
}

// Remove selectMode from todos under select-mode-root if all are unselected
function leaveSelectModeIfNoneSelected(todo) {
	var startingLevel = todos;
	var selectModeRoot = findSelectModeRoot(todo)
	if (!selectModeRoot) {
		// selectAll is the controlling root
		var startingLevel = todos;
	} else {
		startingLevel = selectModeRoot.children;
	}
	if (!anySelectedTodos(startingLevel)) {
		markTodosSelectMode(startingLevel, false);
	}
}

/************************************ Data storage ***************************************/

// Store/retrieve todos and filter state to/from localStorage

var storageKey = undefined;			// localStorage has a quirk: undefined can be a key, so watch out.
									// Many button event handler tests write to 'undefined' key because
									// a 'real' key has not been supplied through startApp(key) before
									// the tests run.

// Write serialized todos to the specified key in localStorage
function writeTodosToStorage(key) {
	localStorage.setItem(key, JSON.stringify(todos));
}

// Restore todos or set todos = [] if none were stored at key.
function restoreTodosFromLocalStorage(key) {

	function restoreInPlace(dataArray) {
		for (var i = 0; i < dataArray.length; i++) {
			var todo = dataArray[i];
			restoredTodo = new Todo(todo);
			dataArray[i] = restoredTodo;
		
			if (todo.children.length > 0) {
				restoreInPlace(todo.children);
			}
		}
	}
	
	var savedData = JSON.parse(localStorage.getItem(key));
	if (savedData) {
		restoreInPlace(savedData);
		todos = savedData;
	} else {
		todos = [];
	}
}

// Serialize filter state and write to filter storage key hard-wired to key + '-filters'
function writeFiltersToStorage(key) {
	var filterKey = key + '-filters';
	var buttonText = [showActiveButton.textContent, showCompletedButton.textContent, showDeletedButton.textContent];
	localStorage.setItem(filterKey, JSON.stringify(buttonText)); 
}

// Restore filter button text or set to defaults
function restoreFiltersFromLocalStorage(key) {
	var filterKey = key + '-filters';
	var buttonText = JSON.parse(localStorage.getItem(filterKey));
	if (buttonText) {
		showActiveButton.textContent = buttonText[0];
		showCompletedButton.textContent = buttonText[1];
		showDeletedButton.textContent = buttonText[2];
	} else {
		showActiveButton.textContent = '√ Active';
		showCompletedButton.textContent = '√ Completed';
		showDeletedButton.textContent = 'Deleted';
	}
}

/*********************************** Data selection ***************************************/

// Return the todo with the given id
function findTodo(array, id) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.id === id) {
			return todo;
		}
		if (todo.children.length > 0) {
			var match = findTodo(todo.children, id);
			if (match) {
				return match;
			}
		}
	}
}

// Return the array (either todos or a todo.children) holding the todo with the given id
function findArray(array, id) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.id === id) {
			return array;
		}
		if (todo.children.length > 0) {
			var match = findArray(todo.children, id);
			if (match) {
				return match;
			}
		}
	}
}

// Return the parent of todo or return undefined
function findParent(childTodo) {

	var parent = undefined;

	// helper function to do the actual nested search
	function recurseForParent(potentialParent, childTodo) {
		if (potentialParent.children.length > 0) {
			for (var i = 0; i < potentialParent.children.length; i++) {
				var child = potentialParent.children[i];
				if (child.id === childTodo.id) {
					parent = potentialParent;
				}
				if (child.children.length > 0) {
					var match = recurseForParent(child, childTodo);
					if (match) {
						parent = match;
					}
				}
			}
		}
	}

	for (var i = 0; i < todos.length; i++) {
		recurseForParent(todos[i], childTodo);
	}

	return parent;
}

// Return the ancestor of todo that is its select-mode root or return undefined
function findSelectModeRoot(todo) {
	var candidate = findParent(todo);

	if (candidate === undefined || candidate.selectMode === false) {
		return candidate;
	} else /* selectMode === true */ {
		candidate = findSelectModeRoot(candidate);	
		if (candidate) {
			return candidate;
		}
	}
	return undefined;
}

// Return true if any todos, including nested todos, are selected
function anySelectedTodos(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.selected) {
			return true;
		}
		if (todo.children.length > 0) {
			var todoSelected = anySelectedTodos(todo.children);
			if (todoSelected) {
				return true;
			} 
		}
	}
	return false;
}

// Return true if any todos at root level of array are selected
function anySelectedRootTodos(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.selected) {
			return true;
		}
	}
	return false;
}

// Return true if any todos, including nested todos, are filtered in for display
function anyFilteredInTodos(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.filteredIn) {
			return true;
		}
		if (todo.children.length > 0) {
			if (anyFilteredInTodos(todo.children)) {
				return true;
			}
		}
	}
	return false;
}

// Return true if any filtered-in todos, including nested todos, are in select mode
function anyFilteredInTodosInSelectMode(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.filteredIn && todo.selectMode) {
			return true;
		}
		if (todo.children.length > 0) {
			if (anyFilteredInTodosInSelectMode(todo.children)) {
				return true;
			}
		}
	}
	return false;
}

// Return true if there are any todos and all of them, including nested todos, are in select mode
function allTodosInSelectMode(array) {
	var selectModeCount = 0;
	var todoCount = 0;

	function runTest(array) {
		for (var i = 0; i < array.length; i++) {
			var todo = array[i];
			if (todo.selectMode) {
				selectModeCount++;
			}
			todoCount++;

			if (todo.children.length > 0) {
				runTest(todo.children);
			}
		}
	}

	runTest(array);

	if (todoCount > 0 && todoCount === selectModeCount) {
		return true;
	} else {
		return false;
	}
}

// Return true if all filtered-in todos, including nested todos, are in select mode
function allFilteredInTodosInSelectMode(array) {
	var selectModeCount = 0;
	var filteredInCount = 0;

	function runTest(array) {
		for (var i = 0; i < array.length; i++) {
			var todo = array[i];
			if (todo.selectMode && todo.filteredIn) {
				selectModeCount++;
			}
			if (todo.filteredIn) {
				filteredInCount++;
			} 

			if (todo.children.length > 0) {
				runTest(todo.children);
			}
		}
	}

	runTest(array);

	if (filteredInCount > 0 && filteredInCount === selectModeCount) {
		return true;
	} else {
		return false;
	}
}

// Return true if any todos, including nested todos, are both selected and filtered in for display
function anySelectedFilteredInTodos(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.selected && todo.filteredIn) {
			return true;
		}
		if (todo.children.length > 0) {
			if (anySelectedFilteredInTodos(todo.children)) {
				return true;
			}
		}
	}
	return false;
}

// Return true if any selected todos, including nested todos, are deleted
function anySelectedTodosDeleted(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.deleted && todo.selected) {
			return true;
		}
		if (todo.children.length > 0) {
			var todoSelectedDeleted = anySelectedTodosDeleted(todo.children);
			if (todoSelectedDeleted) {
				return true;
			} 
		}
	}
}

// Return true if there are selected todos and all of them, including nested todos, are completed
function allSelectedTodosCompleted(array) {
	var selected = 0;
	var andCompleted = 0;

	function runTest(array) {
		for (var i = 0; i < array.length; i++) {
			var todo = array[i];
			if (todo.selected) {
				selected++;
				if (todo.stage === 'completed') {
					andCompleted++;
				}
			} 

			if (todo.children.length > 0) {
				runTest(todo.children);
			}
		}
	}

	runTest(array);

	if (selected > 0 && selected === andCompleted) {
		return true;
	} else {
		return false;
	}
}

// Return true if there are selected todos and all of them, including nested todos, are deleted
function allSelectedTodosDeleted(array) {
	var selected = 0;
	var andDeleted = 0;

	function runTest(array) {
		for (var i = 0; i < array.length; i++) {
			var todo = array[i];
			if (todo.selected) {
				selected++;
				if (todo.deleted === true) {
					andDeleted++;
				}
			} 

			if (todo.children.length > 0) {
				runTest(todo.children);
			}
		}
	}

	runTest(array);

	if (selected > 0 && selected === andDeleted) {
		return true;
	} else {
		return false;
	}
}

/************************************* DOM manipulation ********************************/

// Fixed page elements
var actionsBar = document.getElementById('actions');
var selectAllButton = actionsBar.children.namedItem('selectAll');
var completeSelectedButton = actionsBar.children.namedItem('completeSelected');
var deleteSelectedButton = actionsBar.children.namedItem('deleteSelected');
var purgeSelectedDeletedButton = actionsBar.children.namedItem('purgeSelectedDeleted');
var addTodoButton = actionsBar.children.namedItem('addTodo');
var showActiveButton = actionsBar.children.namedItem('showActive');
var showCompletedButton = actionsBar.children.namedItem('showCompleted');
var showDeletedButton = actionsBar.children.namedItem('showDeleted');

var todolist = document.getElementById('todolist');

// Global variables for todo entry being edited
var originalEntry = undefined;		// entry to be restored by 'Undo edit'	
var changedEntry = undefined;		// entry to be restored by 'Redo edit'
var oldUndoEditButton = undefined;	// button to deactivate from last todoLi to be edited

// A set to specify which todos will be displayed
function generateFilterSet() {

	var filteredIn = new Set();

	if (showActiveButton.textContent === '√ Active') {
		filteredIn.add('#active');
	}
	if (showCompletedButton.textContent === '√ Completed') {
		filteredIn.add('#completed');
	}
	if (showDeletedButton.textContent === '√ Deleted') {
		filteredIn.add('#deleted');
	}
	return filteredIn;
}

function renderTodolist() {

	var filterSet = generateFilterSet();	// set which filters determine display

	applyDisplayTags(filterSet);			// mark todos for display

	newTodolist = createTodosUl(todos);
	updateActionsBar();
	todolist.innerHTML = ''; 
	todolist.appendChild(newTodolist);
}

function updateActionsBar() {
	
	// Get conditions for updating buttons
	var filteredInTodos = anyFilteredInTodos(todos);
	var allFilteredInInSelectMode = allFilteredInTodosInSelectMode(todos);
	var allSelectedCompleted = allSelectedTodosCompleted(todos);
	var allSelectedDeleted = allSelectedTodosDeleted(todos);
	var anySelectedDeleted = anySelectedTodosDeleted(todos);

	if (filteredInTodos) {
		selectAllButton.disabled = false;
	} else {
		selectAllButton.disabled = true;
		completeSelectedButton.disabled = true;
		deleteSelectedButton.disabled = true;
		purgeSelectedDeletedButton.disabled = true;
	}

	if (allFilteredInInSelectMode) {
		selectAllButton.textContent = 'Unselect all';
		completeSelectedButton.disabled = false;
		deleteSelectedButton.disabled = false;
	} else {
		selectAllButton.textContent = 'Select all';
		completeSelectedButton.disabled = true;
		deleteSelectedButton.disabled = true;
	}

	if (allSelectedCompleted) {
		completeSelectedButton.textContent = 'Uncomplete selected';	
	} else {
		completeSelectedButton.textContent = 'Complete selected';	
	}

	if (allSelectedDeleted) {
		deleteSelectedButton.textContent = 'Undelete selected';	
	} else {
		deleteSelectedButton.textContent = 'Delete selected';	
	}

	if (anySelectedDeleted) {
		purgeSelectedDeletedButton.disabled = false;	
	} else {
		purgeSelectedDeletedButton.disabled = true;	
	}

if (showActiveButton.textContent !== '√ Active' || allFilteredInInSelectMode) {
		addTodoButton.disabled = true;	
	} else {
		addTodoButton.disabled = false;	
	}
}

function createParentPlaceholderLi(todo) {
	var todoLi = document.createElement('li');
	todoLi.id = todo.id;

	var entry = document.createElement('p');
	entry.contentEditable = false;
	entry.textContent = todo.entry;
	entry.classList.add('parent-placeholder');
	if (todo.stage === 'completed') {
		entry.classList.add('struck-completed');
	}
	if (todo.deleted) {
		entry.classList.add('faded-deleted');
	}
	todoLi.appendChild(entry);

	return todoLi;
}

function createTodoLi(todo) {	
	var todoLi = document.createElement('li');
	todoLi.id = todo.id;

	// A line to visually separate todos during development
	var todoSeparator = document.createElement('hr');

	// All these buttons are created with button.type = 'button' to distinguish from a submit
	// or reset button, as recommended by MDN.

	var selectButton = document.createElement('button')
	selectButton.name = 'select';
	selectButton.type = 'button';	
	if (todo.selected) {
		selectButton.textContent = 'Unselect';
		selectButton.disabled = false;
	} else {
		selectButton.textContent = 'Select';
		selectButton.disabled = true;
	}

	var completeButton = document.createElement('button');
	completeButton.name = 'complete';
	completeButton.type = 'button';
	if (todo.stage === 'completed') {
		completeButton.textContent = 'Uncomplete';
	} else {
		completeButton.textContent = 'Complete';
	}

	var deleteButton = document.createElement('button')
	deleteButton.name = 'delete';
	deleteButton.type = 'button';
	if (todo.deleted) {
		deleteButton.textContent = 'Undelete';
	} else {
		deleteButton.textContent = 'Delete';
	}

	var addSiblingButton = document.createElement('button')
	addSiblingButton.name = 'addSibling';
	addSiblingButton.type = 'button';
	addSiblingButton.textContent = 'Add sibling';

	var addChildButton = document.createElement('button')
	addChildButton.name = 'addChild';
	addChildButton.type = 'button';
	addChildButton.textContent = 'Add child';

	var undoEditButton = document.createElement('button')
	undoEditButton.name = 'undoEdit';
	undoEditButton.type = 'button';
	undoEditButton.textContent = 'Undo edit';
	undoEditButton.disabled = true;

	if (todo.selectMode) {
		completeButton.disabled = true;
		deleteButton.disabled = true;
		addSiblingButton.disabled = true;
		addChildButton.disabled = true;
		selectButton.disabled = false;
	}

	if (showActiveButton.textContent === 'Active') {
		addSiblingButton.disabled = true;
		addChildButton.disabled = true;
	}
	
	todoLi.appendChild(todoSeparator);
	todoLi.appendChild(selectButton);
	todoLi.appendChild(completeButton);
	todoLi.appendChild(deleteButton);
	todoLi.appendChild(addSiblingButton);
	todoLi.appendChild(addChildButton);
	todoLi.appendChild(undoEditButton);

	var entry = document.createElement('p');
	entry.contentEditable = true;
	entry.textContent = todo.entry;
	if (todo.selected) {
		entry.classList.add('highlighted');
	}
	if (todo.stage === 'completed') {
		entry.classList.add('struck-completed');
	}
	if (todo.deleted) {
		entry.classList.add('faded-deleted');
	}
	todoLi.appendChild(entry);
	
/*	 Some terminology to guide decisions on how to create selection-related buttons
	
	    A select-mode-root todo is the one on which a controlling 'Select children' button was clicked.
	       todo.selectMode === false && allFilteredInTodosInSelectMode(todo.children) === true
	
	    A select-mode-root-ancestor is higher in the tree.
	       todo.selectMode === false && allFilteredInTodosInSelectMode(todo.children) === false &&
	       anyFilteredInTodosInSelectMode(todo.children === true
	
	    A select-mode-root-descendant is lower in the tree.
	       todo.selectMode === true && allFilteredInTodosInSelectMode(todo.children) === true
*/	

	// Only create last four buttons if there are children
	
	if (todo.children.length > 0 && anyFilteredInTodos(todo.children)) {		

		var selectModeRoot = !todo.selectMode && allFilteredInTodosInSelectMode(todo.children);
		var rootAncestor = !todo.selectMode && !allFilteredInTodosInSelectMode(todo.children) && anyFilteredInTodosInSelectMode(todo.children);
		var rootDescendant = todo.selectMode && allFilteredInTodosInSelectMode(todo.children);

		var anyInSelectMode = anyFilteredInTodosInSelectMode(todo.children);

		var showChildrenButton = document.createElement('button');
		showChildrenButton.name = 'showChildren';
		showChildrenButton.type = 'button';


		if (todo.collapsed) {
			showChildrenButton.textContent = 'Show children';
			var showChildrenButtonLineBreak = document.createElement('br');
		} else {
			showChildrenButton.textContent = 'Hide children';
		}
		if (selectModeRoot || rootAncestor || rootDescendant) {
			showChildrenButton.disabled = true;
		}
		todoLi.appendChild(showChildrenButton);
		
		// Display needs an extra line after a 'Show children' button to look right
		if (showChildrenButton.textContent === 'Show children') {
			var extraLine = document.createElement('p');
			todoLi.insertAdjacentElement('beforeend', extraLine);
		}
		
		// Only create last three buttons if there are children showing

		if (!todo.collapsed) {

			var anySelected = anySelectedFilteredInTodos(todo.children);

			var selectChildrenButton = document.createElement('button');
			selectChildrenButton.name = 'selectChildren';
			selectChildrenButton.type = 'button';
			selectChildrenButton.disabled = false;

			if (anySelected) {
				if (selectModeRoot || rootDescendant) {
					selectChildrenButton.textContent = 'Unselect children';
				} else /* rootAncestor */ {
					selectChildrenButton.textContent = 'Select children';
				}
			}
			else /* none selected */ {
				selectChildrenButton.textContent = 'Select children';
			}
			todoLi.appendChild(selectChildrenButton);

			// Only create last two buttons for a select-mode-root todoLi with todos selected

			if (selectModeRoot && anySelected) {
				var completeSelectedChildrenButton = document.createElement('button');
				completeSelectedChildrenButton.name = 'completeSelectedChildren';
				completeSelectedChildrenButton.type = 'button';
				completeSelectedChildrenButton.disabled = false;
				if (allSelectedTodosCompleted(todo.children)) {
					completeSelectedChildrenButton.textContent = 'Uncomplete selected children';
				} else {
					completeSelectedChildrenButton.textContent = 'Complete selected children';
				}
				todoLi.appendChild(completeSelectedChildrenButton);

				var deleteSelectedChildrenButton = document.createElement('button');
				deleteSelectedChildrenButton.name = 'deleteSelectedChildren';
				deleteSelectedChildrenButton.type = 'button';
				deleteSelectedChildrenButton.disabled = false;
				if (allSelectedTodosDeleted(todo.children)) {
					deleteSelectedChildrenButton.textContent = 'Undelete selected children';
				} else {
					deleteSelectedChildrenButton.textContent = 'Delete selected children';
				}
				todoLi.appendChild(deleteSelectedChildrenButton);
			}
		}
	}

	return todoLi;
}

// Build DOM elements from the todos array, e.g. when app first loads
// or when todos are filtered for display
function createTodosUl(todosArray) {
	
	var todosUl = document.createElement('ul');

	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		if (todo.filteredIn)  {
			var todoLi = createTodoLi(todo)
		} else if (todo.filteredOutParentOfFilteredIn) {
			var todoLi = createParentPlaceholderLi(todo);
		}
		if (todoLi) {
			if (todo.children.length > 0 && !todo.collapsed) {
				var nestedTodosUl = createTodosUl(todo.children);
				todoLi.appendChild(nestedTodosUl);
				todosUl.appendChild(todoLi);
			} else {
				todosUl.appendChild(todoLi);
			}
		}
	}
	return todosUl;
}

// Insert a new empty todoLi into the given array after the given todo, ready for text entry.
function insertNewTodoLi(todoArray, todo) {
	var newTodo = new Todo();
	insertTodo(todoArray, newTodo, todo);
	writeTodosToStorage(storageKey);
	renderTodolist();
	newTodoLi = document.getElementById(newTodo.id);
	newTodoLi.querySelector('p').focus();
}

// Append a new todoLi in a child todosUl under a given todoLi, ready for text entry.
function appendNewChildTodoLi(todo) {
	todo.markCollapsed(false);
	var newChild = new Todo();
	insertTodo(todo.children, newChild);
	writeTodosToStorage(storageKey);
	renderTodolist();
	newChildLi= document.getElementById(newChild.id);
	newChildLi.querySelector('p').focus();
}

// Handle undoEdit button click or 'esc' key shortcut
function undoEntryEdit(todo, todoLi) {
	var todoLiEntry = todoLi.querySelector('p');
	var todoLiUndoEditButton = todoLi.children.namedItem('undoEdit');
	
	if (todoLiUndoEditButton.textContent === 'Undo edit') {
		changedEntry = todoLiEntry.textContent;		// must be todoLiEntry instead of todo.entry because it is
													// not updated in time from the in-focus entry field
													// when the keyboard shortcut 'esc' is the trigger
		todo.entry = originalEntry;
		todoLiEntry.textContent = originalEntry;
//		todoLiUndoEditButton.disabled = true;
		todoLiUndoEditButton.textContent = 'Redo edit';
	} else {	// 'Redo edit' clicked
		todo.entry = changedEntry;
		todoLiEntry.textContent = changedEntry;
		todoLiUndoEditButton.textContent = 'Undo edit';
	}
	writeTodosToStorage(storageKey);
}

/************************************* Event handling ***********************************/

function keyDownHandler(event) {
	if (event.target.nodeName === "P" && event.target.parentElement.nodeName === "LI") {
		// target is a todo entry
		if (event.key === "Enter") {
			event.preventDefault();		// Prevents an unwanted return character from being added
										// to the entry. Calling event.preventDefault() on keyUp
										// event is too late to do the job.
		}
	}
}

function keyUpHandler(event) {
	if (event.target.nodeName === "P" && event.target.parentElement.nodeName === "LI") {
		// target is a todoLi entry
		var todoLi = event.target.parentElement;
		var editedEntry = event.target.textContent
		var todo = findTodo(todos, todoLi.id);
		var todoArray = findArray(todos, todo.id);
		if (event.key === "Enter") {
			todo.update(editedEntry);				// Must update entry before re-rendering
			if (event.shiftKey) {
				if (todo.selectMode === false && showActiveButton.textContent === '√ Active') {
					appendNewChildTodoLi(todo)			// Shift-return appends a new child todo
				}
			} else {
				if (todo.selectMode === false && showActiveButton.textContent === '√ Active') {
					insertNewTodoLi(todoArray, todo);	// Return inserts a new sibling todo
				}
			}
		} else if (event.key === "Escape") {
			var todoLiUndoEditButton = todoLi.children.namedItem('undoEdit');
			if (todoLiUndoEditButton.disabled === false) /* prevent restoring the wrong entry */ {
				undoEntryEdit(todo, todoLi);			// esc reverts/restores an edited entry
			}
		}
	}
}

// input event fires when the value of <textarea> changes
function inputHandler(event) {
	if (event.target.nodeName === "P" && event.target.parentElement.nodeName === "LI") {
		// target is a todo entry
		var todoLi = event.target.parentElement;
		var todoLiUndoEditButton = todoLi.children.namedItem('undoEdit');
		var todoLiEntry = todoLi.querySelector('p');
		var todo = findTodo(todos, todoLi.id);
		
		// Save current entry in global variable so change can be undone
		originalEntry = todo.entry;
		
		// There should only be one undoEditButton enabled at a time. If there was an edit going on before 
		// this one, then its undoEdit button needs to be disabled and text restored to default.
		if (oldUndoEditButton) {
			oldUndoEditButton.disabled = true;	
			oldUndoEditButton.textContent = 'Undo edit';
		}
		todoLiUndoEditButton.disabled = false;
		// Save button reference to global variable so it can be disabled when a new entry edit starts.	
		oldUndoEditButton = todoLiUndoEditButton;
	}
}

// Handle focusout event.
function editHandler(event) {
	if (event.target.nodeName === "P" && event.target.parentElement.nodeName === "LI") {
		// target is a todo entry
		var todoLi = event.target.parentElement;
		var editedEntry = event.target.textContent;
		var todo = findTodo(todos, todoLi.id);
		todo.update(editedEntry);
		writeTodosToStorage(storageKey);
	}
}

function todoClickHandler(event) {
	var todoLi = event.target.parentElement;
	var todo = findTodo(todos, todoLi.id)
	var todoArray = findArray(todos, todoLi.id);	// todos or a todo.children array

	if (event.target.name === "select") {
		todo.selected = !todo.selected;
		if (!todo.selected) {						// 'Unselect' clicked
			leaveSelectModeIfNoneSelected(todo);
		}
		writeTodosToStorage(storageKey);
		renderTodolist();

	} else if (event.target.name === "complete") {
		if (todo.stage === 'completed') {
			todo.stage = 'active';
		} else {
			todo.stage = 'completed';
		}
		writeTodosToStorage(storageKey);
		renderTodolist();

	} else if (event.target.name === "delete") {
		todo.deleted = !todo.deleted;
		writeTodosToStorage(storageKey);
		renderTodolist();

	} else if (event.target.name === "addSibling") {
		insertNewTodoLi(todoArray, todo)

	} else if (event.target.name === "addChild") {
		appendNewChildTodoLi(todo)

	} else if (event.target.name === "undoEdit") {
		undoEntryEdit(todo, todoLi);

	} else if (event.target.name === "showChildren") {
		todo.collapsed = !todo.collapsed;
		writeTodosToStorage(storageKey);
		renderTodolist();

	} else if (event.target.name === "selectChildren") {
		var todoLiSelectChildrenButton = todoLi.children.namedItem('selectChildren');

		if (todoLiSelectChildrenButton.textContent === 'Unselect children') {
			markFilteredInTodosSelected(todo.children, false);
			if (!todo.selectMode) {
				// button is select-mode-root, remove selectMode flags to restore normal buttons
				markTodosSelectMode(todo.children, false);
			} else {
				// button is select-mode-root-descendant
				leaveSelectModeIfNoneSelected(todo)
			}
		} else {	// 'Select children' clicked
			markFilteredInTodosSelected(todo.children, true);
			if (!todo.selectMode) {
				// button is select-mode-root, set selectMode flags so normal buttons are disabled
				markTodosSelectMode(todo.children, true);
			}
		}
		writeTodosToStorage(storageKey);
		renderTodolist();

	} else if (event.target.name === "completeSelectedChildren") {
		if (allSelectedTodosCompleted(todo.children)) {
			// 'Uncomplete selected children' clicked
			setSelectedTodosStage(todo.children, 'active');
		} else {
			// 'Complete selected children' clicked
			setSelectedTodosStage(todo.children, 'completed');
		}
		writeTodosToStorage(storageKey);
		renderTodolist();

	} else if (event.target.name === "deleteSelectedChildren") {
		if (allSelectedTodosDeleted(todo.children)) {
			// 'Undelete selected children' clicked
			markSelectedTodosDeleted(todo.children, false);
		} else {
			// 'Delete selected children' clicked
			markSelectedTodosDeleted(todo.children, true);
		}
		writeTodosToStorage(storageKey);
		renderTodolist();
	}
}

function actionsClickHandler(event) {

	if (event.target.name === "showActive") {
		if (showActiveButton.textContent === '√ Active') {
			showActiveButton.textContent = 'Active';
		} else {
			showActiveButton.textContent = '√ Active';
		}
		writeFiltersToStorage(storageKey);
		renderTodolist();
	} else if (event.target.name === "showCompleted") {
		if (showCompletedButton.textContent === '√ Completed') {
			showCompletedButton.textContent = 'Completed';
		} else {
			showCompletedButton.textContent = '√ Completed';
		}
		writeFiltersToStorage(storageKey);
		renderTodolist();
	} else if (event.target.name === "showDeleted") {
		if (showDeletedButton.textContent === '√ Deleted') {
			showDeletedButton.textContent = 'Deleted';
		} else {
			showDeletedButton.textContent = '√ Deleted';
		}
		writeFiltersToStorage(storageKey);
		renderTodolist();
	} else if (event.target.name === "selectAll") {
		if (selectAllButton.textContent === 'Select all') {
			markFilteredInTodosSelected(todos, true);
			markTodosSelectMode(todos, true);
		} else {
			markFilteredInTodosSelected(todos, false);
			markTodosSelectMode(todos, false);
		}
		writeTodosToStorage(storageKey);
		renderTodolist();
	} else if (event.target.name === 'completeSelected') {
		if (completeSelectedButton.textContent === 'Complete selected') {
			setSelectedTodosStage(todos, 'completed');
		} else {
			setSelectedTodosStage(todos, 'active');
		}
		writeTodosToStorage(storageKey);
		renderTodolist();
	} else if (event.target.name === 'deleteSelected') {
		if (deleteSelectedButton.textContent === 'Delete selected') {
			markSelectedTodosDeleted(todos, true);
		} else {
			markSelectedTodosDeleted(todos, false);
		}
		writeTodosToStorage(storageKey);
		renderTodolist();
	} else if (event.target.name === 'purgeSelectedDeleted') {
		purgeSelectedDeletedTodos(todos);
		writeTodosToStorage(storageKey);
		renderTodolist();
	} else if (event.target.name === 'addTodo') {
		insertNewTodoLi(todos);
	}
}

function setUpEventListeners() {
	todolist.addEventListener('focusout', editHandler);		// using focusout event instead of change event,
															// which does not work on a contenteditable <p>
	todolist.addEventListener('click', todoClickHandler);
	actionsBar.addEventListener('click', actionsClickHandler);
	todolist.addEventListener('input', inputHandler);
	todolist.addEventListener('keydown', keyDownHandler);
	todolist.addEventListener('keyup', keyUpHandler);
}

function startApp(key) {
	storageKey = key;										// Tell the app where to store data

	restoreTodosFromLocalStorage(key);
	restoreFiltersFromLocalStorage(key);
	renderTodolist();
}

// Start app for non-storage tests without loading todos from storage
function startTestApp() {
	showActiveButton.textContent = '√ Active';
	showCompletedButton.textContent = '√ Completed';
	showDeletedButton.textContent = 'Deleted';

	renderTodolist();
}

setUpEventListeners();
