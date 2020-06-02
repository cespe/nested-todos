// Beasts 8. Nested todos 

/*
 These tests use a custom version of simpletest (included in the same directory and hardwired into todos-tdd.html test page).

 A test that begins with 'Section:' becomes a Section heading to organize tests

 There are three new helper functions that work like fail():
	future() highlights tests dealing with unimplemented features;
	manual() highlights tests that can't be automated;
	remove() highlights tests that are no longer needed and can be removed;

 The alias eq is bound to assertStrictEquals instead of assertEquals as in the original simpletest. eqstrict is commented out.
 There is a new alias, neq, bound to a new function assertStrictDoesNotEqual that fails when expected === actual.
*/

tests({
	"The app should have a 'todos' array for storing todos.": function() {
		var hasStorage = Array.isArray(todos);
		eq(hasStorage, true);
	},
	"Todo constructor should return a new todo object.": function() {
		var newTodo = undefined;
		newTodo = new Todo();
		eq(typeof newTodo, "object");
	},
	"The app should have a way to add a todo object to the todos array.": function() {
		todos = [];
		newTodo = new Todo();
		insertTodo(todos, newTodo);
		eq(todos[0], newTodo);
	},
	"A todo object should be created with an 'id' property of type String to store an identifier.": function() {
		newTodo = new Todo();
		eq(typeof newTodo.id, "string");
	},
	"Todo should take an entry of type String and store it in the todo object 'entry' property.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.entry, 'Item 1');
	},
	"If 'entry' argument is not a string or is missing, Todo should set todo entry property to an empty string.": function() {
		newTodo = new Todo();
		eq(newTodo.entry, '');
	},
	"A todo object should be created with a 'children' property of type Array to store nested todo objects.": function() {
		newTodo = new Todo();
		eq(Array.isArray(newTodo.children), true);
		eq(newTodo.children.length, 0);
	},
	"A todo object should be created with a 'selected' property of type Boolean set to false.": function() {
		newTodo = new Todo();
		eq(newTodo.selected, false);
	},
	"A todo object should be created with a 'selectMode' property of type Boolean set to false.": function() {
		newTodo = new Todo();
		eq(newTodo.selectMode, false);
	},
	"A todo object should be created with a 'deleted' property of type Boolean set to false.": function() {
		newTodo = new Todo();
		eq(newTodo.deleted, false);
	},
	"A todo object should be created with a 'stage' property of type String set to 'active'.": function() {
		newTodo = new Todo();
		eq(newTodo.stage, 'active');
	},
	"A todo object should be created with a 'collapsed' property of type Boolean set to false.": function() {
		// When false, expand children <ul> to show child todos; when true, collapse <ul> to hide them
		newTodo = new Todo();
		eq(newTodo.collapsed, false);
	},
	"A todo object should be created with a 'hidden' property of type Boolean set to false.": function() {
		// Necessary to prevent hidden todos from being selected
		newTodo = new Todo();
		eq(newTodo.hidden, false);
	},
	"A todo object should be created with a 'filteredIn' property of type Boolean set to true.": function() {
		// Created true because default stage is 'active' and the app only creates new todos when showActiveButton is '√ Active'.
		// When showActiveButton is 'Active', addTodo, addSibling, addChild buttons and key shortcuts are disabled.
		newTodo = new Todo();
		eq(newTodo.filteredIn, true);
	},
	"A todo object should be created with a 'filteredOutParentOfFiteredIn' property of type Boolean set to false.": function() {
		newTodo = new Todo();
		eq(newTodo.filteredOutParentOfFilteredIn, false);
	},
	"The app should have a way to update a todo entry.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.entry, 'Item 1');
		newTodo.update('Item 1 updated');
		eq(newTodo.entry, 'Item 1 updated');
	},
	"The app should have a way to mark a todo selected or not selected.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.selected, false);
		newTodo.markSelected(true);
		eq(newTodo.selected, true);
		newTodo.markSelected(false);
		eq(newTodo.selected, false);
	},
	"The app should have a way to mark a todo in select mode or not.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.selectMode, false);
		newTodo.markSelectMode(true);
		eq(newTodo.selectMode, true);
		newTodo.markSelectMode(false);
		eq(newTodo.selectMode, false);
	},
	"The app should have a way to set a todo's 'stage' property to a value from todoStages set.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.stage, 'active');
		eq(todoStages instanceof Set, true);
		newTodo.setStage('completed');
		eq(newTodo.stage, 'completed');
		newTodo.setStage('canceled');
		eq(newTodo.stage, 'canceled');
		newTodo.setStage('active');
		eq(newTodo.stage, 'active');
	},
	"The app should have a way to mark a todo deleted or not deleted.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.deleted, false);
		newTodo.markDeleted(true);
		eq(newTodo.deleted, true);
		newTodo.markDeleted(false);
		eq(newTodo.deleted, false);
	},
	"The app should have a way to add a child todo to a parent todo.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.children.length, 0);
		childTodo = new Todo('Item 1 child 1');
		newTodo.addChild(childTodo);
		eq(newTodo.children.length, 1);
		eq(newTodo.children[0], childTodo);
	},
	"The app should have a way to mark nested todos expanded or collapsed.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.collapsed, false);
		newTodo.markCollapsed(true);
		eq(newTodo.collapsed, true);
		newTodo.markCollapsed(false);
		eq(newTodo.collapsed, false);
	},
	"The app should have a way to mark a todo's hidden property true or false.": function() {
		todo1 = new Todo('Item 1');
		eq(todo1.hidden, false);
		todo1.markHidden(true);
		eq(todo1.hidden, true);
		todo1.markHidden(false);
		eq(todo1.hidden, false);
	},
	"The app should have a way to mark a todo filtered in for display or not according to a supplied set of tags.": function() {
		// Tests todo.markFilteredIn(set)
		todo1 = new Todo('Item 1 active');
		todo2 = new Todo('Item 2 completed');
		todo3 = new Todo('Item 3 deleted');

		todo2.setStage('completed');
		todo3.markDeleted(true);

		filterSet = new Set();
		filterSet.add('#active');
		filterSet.add('#deleted');

		todo1.markFilteredIn(filterSet);
		todo2.markFilteredIn(filterSet);
		todo3.markFilteredIn(filterSet);

		eq(todo1.filteredIn, true);
		eq(todo2.filteredIn, false);
		eq(todo3.filteredIn, true);

		// Identifies a bug where deleted todo was not filtered in when Active filter is off
		filterSet2 = new Set();
		filterSet2.add('#completed');
		filterSet2.add('#deleted');

		todo1.markFilteredIn(filterSet2);
		todo2.markFilteredIn(filterSet2);
		todo3.markFilteredIn(filterSet2);

		eq(todo1.filteredIn, false);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, true);

	},
	"The app should have a way to mark a todo as a filtered-out parent of filtered-in todos according to a supplied set of filter tags.": function() {
		// Tests todo.markFilteredOutParentOfFilteredIn();
		todo1 = new Todo('Item 1 filtered in');						// tagged active on creation
		todo2 = new Todo('Item 2 filtered-out parent');
		todo2.setStage('completed');
		child2 = new Todo('Item 2 child filtered-out parent');
		child2.setStage('completed');
		todo2.addChild(child2);
		grandchild2 = new Todo('Item 2 grandchild filtered in');
		grandchild2.markDeleted(true);
		child2.addChild(grandchild2);
		todo3 = new Todo('Item 3 filtered-out parent');
		todo3.setStage('completed');
		child3 = new Todo('Item 3 child filtered in');				// tagged active on creation		
		todo3.addChild(child3);

		var filterSet = new Set();
		filterSet.add('#active');
		filterSet.add('#deleted');

		todo1.markFilteredIn(filterSet);
		todo2.markFilteredIn(filterSet);
		child2.markFilteredIn(filterSet);
		grandchild2.markFilteredIn(filterSet);
		todo3.markFilteredIn(filterSet);
		child3.markFilteredIn(filterSet);

		// These are ordered to simulate recursion, needed for the function to work properly
		todo1.markFilteredOutParentOfFilteredIn();
		grandchild2.markFilteredOutParentOfFilteredIn();
		child2.markFilteredOutParentOfFilteredIn();
		todo2.markFilteredOutParentOfFilteredIn();
		child3.markFilteredOutParentOfFilteredIn();
		todo3.markFilteredOutParentOfFilteredIn();

		eq(todo1.filteredOutParentOfFilteredIn, false);
		eq(todo2.filteredOutParentOfFilteredIn, true);
		eq(child2.filteredOutParentOfFilteredIn, true);
		eq(grandchild2.filteredOutParentOfFilteredIn, false);
		eq(todo2.filteredOutParentOfFilteredIn, true);
		eq(child3.filteredOutParentOfFilteredIn, false);
	},
	"The app should have a way to insert a new todo after any todo in the array it is in.": function() {
		// Tests insertTodo(array, todoToInsert, todoBeforeInsertionPoint)
		todos = []
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		eq(todos[0], todo1);
		var todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		eq(todos[1], todo2);
		var todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);
		eq(todos[2], todo3);
		var todo4 = new Todo('Item 4 inserted after Item 1');
		insertTodo(todos, todo4, todo1);
		eq(todos[0], todo1);
		eq(todos[1], todo4);
		eq(todos[2], todo2);
		eq(todos[3], todo3);

		var child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		eq(todo1.children[0], child1);
		var child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		eq(todo1.children[1], child2);
		var child3 = new Todo('Item 1 child 3 inserted after child 1');
		insertTodo(todo1.children, child3, child1);
		eq(todo1.children[0], child1);
		eq(todo1.children[1], child3);
		eq(todo1.children[2], child2);

	},
	"If insertTodo is called without insertion point, it should push the new todo to end of array.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		eq(todos[0].entry, 'Item 1');
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		eq(todos[1].entry, 'Item 2');
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);
		eq(todos[2].entry, 'Item 3');
	},
	"The todos array and children arrays should enforce unique ids when todos are added.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		todo1.id = 'duplicate';
		insertTodo(todos, todo1);
		eq(todos[0].entry, 'Item 1');
		eq(todos[0].id, 'duplicate');
		var todo2 = new Todo('Item 2');
		todo2.id = 'duplicate';
		insertTodo(todos, todo2);
		eq(todos[0].id, 'duplicate');
		eq(todos[1].entry, 'Item 2');
		eq(todos[1].id !== 'duplicate', true);

		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var child1 = new Todo('Item 1 child 1');
		child1.id = 'duplicate';
		todos[0].addChild(child1);
		eq(todos[0].children[0].entry, 'Item 1 child 1');
		eq(todos[0].children[0].id, 'duplicate');
		var child2 = new Todo('Item 1 child 2');
		child2.id = 'duplicate';
		insertTodo(todos[0].children, child2);
		eq(todos[0].children[0].id, 'duplicate');
		eq(todos[0].children[1].entry, 'Item 1 child 2');
		eq(todos[0].children[1].id !== 'duplicate', true);

	},
	"The app should have a way to delete a todo from the array it is in.": function() {
		// Tests deleteTodo(array, todo)
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		eq(todos[0], todo1);
		var todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		eq(todos[1], todo2);
		var todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);
		eq(todos[2], todo3);
		deleteTodo(todos, todo2);
		eq(todos[0], todo1);
		eq(todos[1], todo3);

		var child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		eq(todo1.children[0], child1);
		var child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		eq(todo1.children[1], child2);
		var child3 = new Todo('Item 1 child 3');
		todo1.addChild(child3);
		eq(todo1.children[2], child3);
		deleteTodo(todo1.children, child2);
		eq(todo1.children[0], child1);
		eq(todo1.children[1], child3);

	},
	"The app should have a way to update filter tags and apply them to all todos.": function() {
		// Tests applyDisplayTags(filterSet)
		todos = [];
		todo1 = new Todo('Item 1 filtered in');						// tagged active on creation
		todo2 = new Todo('Item 2 filtered-out parent');
		todo2.setStage('completed');
		child2 = new Todo('Item 2 child filtered in');				// tagged active on creation		
		todo2.addChild(child2);
		todo3 = new Todo('Item 3 filtered in');						// tagged active on creation
		todo4 = new Todo('Item 4 filtered-out parent');
		todo4.setStage('completed');
		child4 = new Todo('Item 4 child filtered-out parent');
		child4.setStage('completed');
		todo4.addChild(child4);
		grandchild1 = new Todo('Item 4 grandchild 1 filtered in');
		grandchild1.markDeleted(true);
		grandchild2 = new Todo('Item 4 grandchild 2 filtered out');
		grandchild2.setStage('completed');
		child4.addChild(grandchild1);
		child4.addChild(grandchild2);
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);
		insertTodo(todos, todo3);
		insertTodo(todos, todo4);

		var filterSet = new Set();
		filterSet.add('#active');
		filterSet.add('#deleted');

		applyDisplayTags(filterSet);

		eq(todo1.filteredIn, true);
		eq(todo2.filteredIn, false);
		eq(child2.filteredIn, true);
		eq(todo3.filteredIn, true);
		eq(todo4.filteredIn, false);
		eq(child4.filteredIn, false);
		eq(grandchild1.filteredIn, true);
		eq(grandchild2.filteredIn, false);

		eq(todo1.filteredOutParentOfFilteredIn, false);
		eq(todo2.filteredOutParentOfFilteredIn, true);
		eq(child2.filteredOutParentOfFilteredIn, false);
		eq(todo3.filteredOutParentOfFilteredIn, false);
		eq(todo4.filteredOutParentOfFilteredIn, true);
		eq(child4.filteredOutParentOfFilteredIn, true);
		eq(grandchild1.filteredOutParentOfFilteredIn, false);
		eq(grandchild2.filteredOutParentOfFilteredIn, false);
	},
	"When applying filter tags, the app should mark selected todos filtered in.": function() {
		// By design, freeze display of selected todos so it is clear which todos are
		// affected by deleteSelected or completeSelected. 
		todos = [];
		todo1 = new Todo('Item 1');
		todo2 = new Todo('Item 2');
		todo2.setStage('deleted');
		todo2.markSelected(true);
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);

		var filterSet = new Set();
		filterSet.add('#active');
		filterSet.add('#completed');

		applyDisplayTags(filterSet);

		eq(todo1.filteredIn, true);
		eq(todo2.selected, true);
		eq(todo2.filteredIn, true);		// filtered in even though deleted because it is selected
	},
	"The app should have a way to mark todos in collapsed todo.children arrays hidden.": function() {
		// Tests markHiddenTodos(todosArray)
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		greatgrandchild1 = new Todo('Great grandchild 1');
		grandchild1.addChild(greatgrandchild1);
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		child1.markCollapsed(true);
		insertTodo(todos, todo1);
		
		eq(todo1.hidden, false);
		eq(child1.hidden, false);
		eq(grandchild1.hidden, false);
		eq(greatgrandchild1.hidden, false);

		markHiddenTodos(todos);

		eq(greatgrandchild1.hidden, true);
		eq(grandchild1.hidden, true);
		eq(child1.hidden, false);
		eq(todo1.hidden, false);
	},
	"Section: todo array helper functions": function() {
	},
	"The app should have a way to return a todo when given its id.": function() {
		// Tests findTodo(array, id)
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		grandchild1 = new Todo('Item 1 child 1 grandchild 1');
		child1.addChild(grandchild1);

		var result = findTodo(todos, todo2.id);
		eq(result, todo2);
		var result = findTodo(todos, child1.id);
		eq(result, child1);
		var result = findTodo(todos, child2.id);
		eq(result, child2);
		var result = findTodo(todos, grandchild1.id);
		eq(result, grandchild1);
	},
	"The app should have a way to return the array holding a todo when given its id.": function() {
		// Tests findArray(array, id)
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		grandchild1 = new Todo('Item 1 child 1 grandchild 1');
		child1.addChild(grandchild1);

		var result = findArray(todos, todo2.id);
		eq(result, todos);
		var result = findArray(todos, child1.id);
		eq(result, todo1.children);
		var result = findArray(todos, child2.id);
		eq(result, todo1.children);
		var result = findArray(todos, grandchild1.id);
		eq(result, child1.children);
	},
	"The app should have a way to return the parent of a given todo.": function() {
		// Tests findParent(childTodo)
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		grandchild1 = new Todo('Item 1 child 1 grandchild 1');
		child1.addChild(grandchild1);
		item2Child1 = new Todo('Item 2 child 1');
		grandchild2 = new Todo('Item 2 child 1 grandchild 1');
		todo2.addChild(item2Child1);
		item2Child1.addChild(grandchild2);
		
		var result = findParent(todo1);
		eq(result, undefined);
		var result = findParent(todo2);
		eq(result, undefined);
		var result = findParent(child1);
		eq(result, todo1);
		var result = findParent(child2);
		eq(result, todo1);
		var result = findParent(grandchild1);
		eq(result, child1);
		var result = findParent(item2Child1);
		eq(result, todo2);
		var result = findParent(grandchild2);
		eq(result, item2Child1);
	},
	"The app should have a way to return the select-mode root of a given todo in select mode.": function() {
		// Tests findSelectModeRoot(todo)
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		child2 = new Todo('Child 2');
		todo1.addChild(child2);
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		
		todo1.markSelectMode(true);
		todo2.markSelectMode(true);

		var result = findSelectModeRoot(todo1);
		eq(result, undefined);
		var result = findSelectModeRoot(todo2);
		eq(result, undefined);

		todo1.markSelectMode(false);
		todo2.markSelectMode(false);
		child1.markSelectMode(true);
		child2.markSelectMode(true);

		var result = findSelectModeRoot(child1);
		eq(result, todo1);
		var result = findSelectModeRoot(child2);
		eq(result, todo1);

		grandchild1.markSelectMode(true);

		var result = findSelectModeRoot(grandchild1);
		eq(result, todo1);

		todo1.markSelectMode(true);

		var result = findSelectModeRoot(grandchild1);
		eq(result, undefined);
	},
	"The app should have a way to determine if any todos, including nested todos, are selected.": function() {
		// Tests anySelectedTodos(array)
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		grandchild1 = new Todo('Item 1 child 1 grandchild 1');
		child1.addChild(grandchild1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo2Child1 = new Todo('Item 2 child 1');
		todo2Grandchild1 = new Todo('Item 2 child 1 grandchild 1');
		todo2.addChild(todo2Child1);
		todo2Child1.addChild(todo2Grandchild1);
		
		eq(anySelectedTodos(todos), false);
		todo1.selected = true;
		eq(anySelectedTodos(todos), true);
		todo1.selected = false;
		eq(anySelectedTodos(todos), false);

		child1.selected = true;
		eq(anySelectedTodos(todos), true);
		child1.selected = false;
		eq(anySelectedTodos(todos), false);

		child2.selected = true;
		eq(anySelectedTodos(todos), true);
		child2.selected = false;
		eq(anySelectedTodos(todos), false);

		grandchild1.selected = true;
		eq(anySelectedTodos(todos), true);
		grandchild1.selected = false;
		eq(anySelectedTodos(todos), false);

		todo2.selected = true;
		eq(anySelectedTodos(todos), true);
		todo2.selected = false;
		eq(anySelectedTodos(todos), false);

		todo2Child1.selected = true;
		eq(anySelectedTodos(todos), true);
		todo2Child1.selected = false;
		eq(anySelectedTodos(todos), false);

		todo2Grandchild1.selected = true;
		eq(anySelectedTodos(todos), true);
		todo2Grandchild1.selected = false;
		eq(anySelectedTodos(todos), false);

		todo2Grandchild1.selected = true;
		eq(anySelectedTodos(todo2.children), true);
		todo2Grandchild1.selected = false;
		eq(anySelectedTodos(todo2.children), false);
	},
	"The app should have a way to determine if any filtered-in descendants are in select mode.": function() {
		// Tests anyFilteredInTodosInSelectMode(array)
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		grandchild1.markSelectMode(true);

		eq(anyFilteredInTodosInSelectMode(todo1.children), true);
		eq(anyFilteredInTodosInSelectMode(child1.children), true);
	},
	"The app should have a way to determine if all filtered-in descendants are in select mode.": function() {
		// Tests allFilteredInTodosInSelectMode(array)
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		grandchild1.markSelectMode(true);

		eq(allFilteredInTodosInSelectMode(todo1.children), false);
		eq(allFilteredInTodosInSelectMode(child1.children), true);
	},
	"The app should have a way to determine if any todos at a root array level are selected.": function() {
		// Tests anySelectedRootTodos(array)
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		child2 = new Todo('Child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);

		eq(anySelectedRootTodos(todos), false);
		eq(anySelectedRootTodos(todo1.children), false);
		
		todo2.markSelected(true);
		eq(anySelectedRootTodos(todos), true);

		child2.markSelected(true);
		eq(anySelectedRootTodos(todo1.children), true);
	},
	"The app should have a way to check if any todos, including nested todos, are both selected and filtered in for display.": function() {
		// Tests anySelectedFilteredInTodos(array)
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		grandchild1.markSelectMode(true);
		grandchild1.markSelected(true);

		eq(anySelectedFilteredInTodos(todo1.children), true);
		eq(anySelectedFilteredInTodos(child1.children), true);
	},
	"The app should have a way to check if all todos, including nested todos, are both selected and completed.": function() {
		// Tests allSelectedTodosCompleted(array)
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);

		eq(allSelectedTodosCompleted(todo1.children), false);	// zero of two selected, zero of two completed
		
		child1.selected = true;

		eq(allSelectedTodosCompleted(todo1.children), false);	// one of two selected, zero of two completed

		child2.selected = true;

		eq(allSelectedTodosCompleted(todo1.children), false);	// two of two selected, zero of two completed
		
		child1.stage = 'completed';

		eq(allSelectedTodosCompleted(todo1.children), false);	// two of two selected, one of two completed
		
		child2.stage = 'completed';

		eq(allSelectedTodosCompleted(todo1.children), true);	// two of two selected, two of two completed

		grandchild1 = new Todo('Item 1 child 1 grandchild 1');
		child1.addChild(grandchild1);

		eq(allSelectedTodosCompleted(todo1.children), true);	// two of three selected, two of three completed

		grandchild1.selected = true;

		eq(allSelectedTodosCompleted(todo1.children), false);	// three of three selected, two of three completed

		grandchild1.stage = 'completed';

		eq(allSelectedTodosCompleted(todo1.children), true);	// three of three selected, three of three completed
	},
	"Section: todoLi elements": function() {
	},
	"The app should have a way to build a todoLi element from a todo object.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);

		eq(todoLi.nodeName, 'LI');
		eq(todoLi.querySelector('p').textContent, 'Item 1');	
	},
	"Each todoLi should have an id equal to todo.id.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.id, todo1.id);
	},
	"The app should build a parent-placeholder todoLi when a todo's filteredOutParent property is true.": function() {
		// Tests createParentPlaceholderLi(todo)
		
		// Solves the problem of showing nested filtered-in todos when parents are hidden.
		// E.g. currently, if only the Completed filter is checked (√ Completed), then completed todos that are children
		// of active or deleted todos will not be shown. There should be a way to find all the completed todos and
		// show them in a special display that indicates nesting but does not show parents that are filtered out.

		var todo1 = new Todo('Item 1 filtered-out parent');

		var todo1ParentPlaceholderLi = createParentPlaceholderLi(todo1);

		eq(todo1ParentPlaceholderLi.nodeName, 'LI');
		eq(todo1ParentPlaceholderLi.id, todo1.id);
		
	},
	"A parent-placeholder todoLi should include a <p> element for its todo entry but it should not be editable.": function() {
		var todo1 = new Todo('Item 1 filtered-out parent');
		var todo1ParentPlaceholderLi = createParentPlaceholderLi(todo1);
		var todo1ParentPlaceholderLiEntry = todo1ParentPlaceholderLi.querySelector('p');

		eq(todo1ParentPlaceholderLiEntry.nodeName, 'P');
		eq(todo1ParentPlaceholderLiEntry.contentEditable, 'false');

	},
	"A parent placeholder li should have class 'parent-placeholder' on its entry.": function() {
		var todo1 = new Todo('Item 1 filtered-out parent');
		var todo1ParentPlaceholderLi = createParentPlaceholderLi(todo1);
		var todo1ParentPlaceholderLiEntry = todo1ParentPlaceholderLi.querySelector('p');

		eq(todo1ParentPlaceholderLiEntry.classList.contains('parent-placeholder'), true);
	}, 
	"A parent-placeholder todoLi should set todo.collapsed false so filtered-in children are visible.": function() {
		// By design, make sure filtered-in children are visible since that is the point of the parent-placeholder.
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markDeleted(true);
		todo1.markCollapsed(true);
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		eq(todo1.filteredOutParentOfFilteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo1.collapsed, false);
	},
	"The app should have a way to generate a ul element from an array of todos.": function() {
		// Tests createTodosUl
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		var filterSet = generateFilterSet();
		applyDisplayTags(filterSet);

		var topLevelUl = createTodosUl(todos);

		// Case: top-level <ul>

		eq(topLevelUl.nodeName, 'UL');
		eq(topLevelUl.childElementCount, 2);
		eq(topLevelUl.children[0].querySelector('p').textContent, 'Item 1');
		eq(topLevelUl.children[1].querySelector('p').textContent, 'Item 2');

		// Case: nested <ul>
		
		var childLevelUl = topLevelUl.children[0].querySelector('ul');

		eq(childLevelUl.nodeName, 'UL');
		eq(childLevelUl.childElementCount, 2);
		eq(childLevelUl.children[0].querySelector('p').textContent, 'Item 1 child 1');
		eq(childLevelUl.children[1].querySelector('p').textContent, 'Item 1 child 2');
	},
	"When loaded, the app should display todos.": function() {
		// Tests renderTodolist()
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);

		startTestApp();
		
		var todo1Li = document.getElementById(todo1.id);
		var todo1LiEntry = todo1Li.querySelector('p').textContent;
		eq(todo1LiEntry, 'Item 1');
		
		var todo2Li = document.getElementById(todo2.id);
		var todo2LiEntry = todo2Li.querySelector('p').textContent;
		eq(todo2LiEntry, 'Item 2');

		var todo3Li = document.getElementById(todo3.id);
		var todo3LiEntry = todo3Li.querySelector('p').textContent;
		eq(todo3LiEntry, 'Item 3');
	},
	"When loaded, the app should also display nested todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);
		
		startTestApp();

		var todo1Li = document.getElementById(todo1.id);
		var todo1LiEntry = todo1Li.querySelector('p').textContent;
		eq(todo1LiEntry, 'Item 1');
		
		var todo1LiUl = todo1Li.querySelector('ul');
		var todo1LiChild1Li = todo1LiUl.children[0];
		var todo1LiChild1LiEntry = todo1LiChild1Li.querySelector('p').textContent;
		eq(todo1LiChild1LiEntry, 'Item 1 child 1');
		
		var todo1LiChild2Li = todo1LiUl.children[1];
		var todo1LiChild2LiEntry = todo1LiChild2Li.querySelector('p').textContent;
		eq(todo1LiChild2LiEntry, 'Item 1 child 2');
		
		var todo2Li = document.getElementById(todo2.id);
		var todo2LiEntry = todo2Li.querySelector('p').textContent;
		eq(todo2LiEntry, 'Item 2');

		var todo3Li = document.getElementById(todo3.id);
		var todo3LiEntry = todo3Li.querySelector('p').textContent;
		eq(todo3LiEntry, 'Item 3');
	},
	"When loaded, the app should display filtered-out parent todos when necessary to display filtered-in child todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1 filtered-out parent');
		todo1.markDeleted(true);
		child1 = new Todo('Item 1 child 1 filtered in');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();
		
		var todo1Li = document.getElementById(todo1.id);
		var todo1LiEntry = todo1Li.children[0];

		eq(todo1.filteredIn, false);
		eq(todo1.filteredOutParentOfFilteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo1LiEntry.classList.contains('parent-placeholder'), true);
	},
	"the app should set filteredOutParentOfFilteredIn to baseline value (false) before each re-render.": function() {
		// Identifies a bug where the property remained true when re-rendered
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		todoLi1Entry = todoLi1.querySelector('p');
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1Entry = childLi1.querySelector('p');

		eq(todoLi1Entry.classList.contains('parent-placeholder'), false);
		eq(todo1.deleted, false);
		eq(todo1.filteredIn, true);
		eq(todo1.filteredOutParentOfFilteredIn, false);
		eq(child1.stage, 'active');
		eq(child1.filteredIn, true);
		eq(showDeletedButton.textContent, 'Deleted');

		todoLi1DeleteButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1Entry = todoLi1.querySelector('p');
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1DeleteButton = childLi1.children.namedItem('delete');
		childLi1Entry = childLi1.querySelector('p');

		eq(todoLi1Entry.classList.contains('parent-placeholder'), true);
		eq(todo1.deleted, true);
		eq(todo1.filteredIn, false);
		eq(todo1.filteredOutParentOfFilteredIn, true);
		eq(child1.stage, 'active');
		eq(child1.filteredIn, true);
		eq(showDeletedButton.textContent, 'Deleted');

		childLi1DeleteButton.click();

		todoLi1 = todolist.children[0].children[0];

		eq(todo1.deleted, true);
		eq(todo1.filteredIn, false);
		eq(todo1.filteredOutParentOfFilteredIn, false);
		eq(child1.deleted, true);
		eq(child1.filteredIn, false);
		eq(showDeletedButton.textContent, 'Deleted');
		eq(todoLi1, undefined);

		showDeletedButton.click();

		eq(showDeletedButton.textContent, '√ Deleted');

		todoLi1 = todolist.children[0].children[0];
		todoLi1Entry = todoLi1.querySelector('p');
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1Entry = childLi1.querySelector('p');

		eq(todoLi1Entry.classList.contains('faded-deleted'), true);
		eq(todoLi1Entry.classList.contains('parent-placeholder'), false);
		eq(todo1.deleted, true);
		eq(todo1.filteredIn, true);
		eq(todo1.filteredOutParentOfFilteredIn, false);
		eq(child1.stage, 'active');
		eq(child1.deleted, true);
		eq(child1.filteredIn, true);
		eq(childLi1Entry.classList.contains('faded-deleted'), true);
	},
	"The app should have a way to insert the first todoLi into an empty todos list.": function() {
		todolist.innerHTML = '';
		todos = [];

		insertNewTodoLi(todos);
		
		eq(todos.length, 1);
		eq(todos[0].entry, '');

		todosUl = todolist.children[0];
		eq(todosUl.childElementCount, 1);
		eq(todosUl.children[0].querySelector('p').textContent, '');
	},
	"The app should have a way to insert a new sibling todo after a given todo.": function() {
		todolist.innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		eq(todos.length, 1);
		eq(todos[0].entry, 'Item 1');
		eq(todosUl.childElementCount, 1);
		eq(todoLi1.querySelector('p').textContent, 'Item 1');
		
		insertNewTodoLi(todos, todo1);				// insert a new todo after the existing one

		todosUl = todolist.children[0];

		eq(todos.length, 2);
		eq(todos[1].entry, '');
		eq(todosUl.childElementCount, 2);
		eq(todosUl.children[1].querySelector('p').textContent, '');

		var todo2 = todos[1];
		eq(todosUl.children[1].id, todo2.id);

		insertNewTodoLi(todos, todo1);				// insert a third todo between the two existing todos

		todosUl = todolist.children[0];

		eq(todos.length, 3)
		eq(todos[1].entry, '');
		eq(todosUl.childElementCount, 3);
		eq(todosUl.children[0].querySelector('p').textContent, 'Item 1');
		eq(todosUl.children[1].querySelector('p').textContent, '');
		eq(todosUl.children[2].id, todo2.id);
		eq(todos[2], todo2);
	},
	"The app should have a way to nest a new child todo under a given todo.": function() {
		todolist.innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		eq(todoLi1.querySelector('ul'), null);
		eq(todoLi1.querySelector('p').textContent, 'Item 1');

		appendNewChildTodoLi(todo1);				// case of first child added to a new UL

		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1Ul = todoLi1.querySelector('ul');

		eq(todoLi1Ul.childElementCount, 1);
		eq(todoLi1Ul.nodeName, "UL");

		var child1 = todo1.children[0];
		var child1Li = todoLi1Ul.children[0];

		eq(todoLi1Ul.children[0], child1Li);	
		eq(child1.id, child1Li.id);
		eq(child1Li.nodeName, "LI");

		appendNewChildTodoLi(todo1);				// case of second child added to existing UL

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');

		eq(todoLi1Ul.childElementCount, 2);
		eq(todoLi1Ul.nodeName, "UL");

		var child2 = todo1.children[1];
		var child2Li = todoLi1Ul.children[1];
		
		eq(todoLi1Ul.children[1], child2Li);	
		eq(child2.id, child2Li.id);
		eq(child2Li.nodeName, "LI");
	},
	"A todoLi should allow for editing its todo entry.": function() {
		todolist.innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todoLi1Entry.textContent, 'Item 1');
		eq(todoLi1Entry.contentEditable, 'true');

	},
	"An empty todo should be created in editing mode for text entry (close devtools to pass test).": function() {
		// Devtools must be closed for the focus tests below to pass.
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startTestApp();

		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		insertNewTodoLi(todos, todo1);				// insert a new todo after the existing one

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];

		var todoLi2 = todosUl.children[1];
		var todoLi2Entry = todoLi2.querySelector('p');

		eq(todos.length, 2);
		eq(todos[1].entry, '');
		eq(todosUl.childElementCount, 2);
		eq(todoLi2Entry.textContent, '');
		eq(document.activeElement, todoLi2Entry);
		eq(document.hasFocus(), true);

		appendNewChildTodoLi(todo1);					// case of first child added to a new UL

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi = todoLi1Ul.children[0];
		var childLiEntry = childLi.querySelector('p');
		eq(document.activeElement, childLiEntry);
		eq(document.hasFocus(), true);

		appendNewChildTodoLi(todo1);					// case of second child added to existing UL

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		var child2Li = todoLi1Ul.children[1];
		var child2LiEntry = child2Li.querySelector('p');
		eq(document.activeElement, child2LiEntry);
		eq(document.hasFocus(), true);
	},
	"When editing, losing focus on the todoLi should save the revised entry (close devtools to pass test).": function() {
		// Devtools must be closed for the focus tests below to pass.
		todolist.innerHTML = '';
		todos = [];
		insertNewTodoLi(todos);
		eq(todos[0].entry, "");						// state before edit
		var todo1 = todos[0];
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1AddSiblingButton = todoLi1.children.namedItem('addSibling');
		var todoLi1Entry = todoLi1.querySelector('p');
		todoLi1Entry.textContent = "test";			// simulate edit

		todoLi1AddSiblingButton.click();			// todoLi1 loses focus, firing focusout event

		eq(todos[0].entry, "test");					// state after edit

		todosUl = todolist.children[0];
		var todoLi2 = todosUl.children[1];
		var todoLi2Entry = todoLi2.querySelector('p');

		eq(todoLi2Entry.textContent, '');
		eq(document.activeElement, todoLi2Entry);
		eq(document.hasFocus(), true);
	},
	"Section: todoLi buttons": function() {
	},
	"Each todoLi should have a 'complete' button to toggle 'Complete/Uncomplete'.": function() {
		todolist.innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		todoLi = todolist.children[0].children[0];

		eq(todoLi.children.namedItem('complete').nodeName, 'BUTTON');
		eq(todoLi.children.namedItem('complete').name, 'complete');
	},
	"If a todo is not completed, its todoLi 'complete' button text should be 'Complete'": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');

		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todo1.stage === 'completed', false);
	},
	"If todo is completed, todoLi 'complete' button text should be 'Uncomplete'.": function () {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.stage = 'completed';
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');

		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todo1.stage === 'completed', true);
	},
	"If todo is not completed, todoLi entry <p> class should not contain 'struck-completed'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todo1.stage === 'completed', false);
		eq(todoLi1.querySelector('p').classList.contains('struck-completed'), false);
	},
	"If todo is completed, todoLi entry <p> class should contain 'struck-completed'.": function () {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.stage = 'completed';
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todo1.stage === 'completed', true);
		eq(todoLi1.querySelector('p').classList.contains('struck-completed'), true);
	},
	"Clicking a todoLi 'complete' button should tag the todo complete and re-render the todoLi.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todo1.stage === 'completed', false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1Entry.classList.contains('struck-completed'), false);

		todoLi1CompleteButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		todoLi1Entry = todoLi1.querySelector('p');

		eq(todo1.stage === 'completed', true);
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todoLi1Entry.classList.contains('struck-completed'), true);

		todoLi1CompleteButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		todoLi1Entry = todoLi1.querySelector('p');

		eq(todo1.stage === 'completed', false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1Entry.classList.contains('struck-completed'), false);
	},
	"Marking a todo completed should not mark its children completed.": function() {
		// because then marking uncompleted could incorrectly reverse some child values
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var child1 = new Todo('child 1');
		var child2 = new Todo('child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);

		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1Ul = todoLi1.querySelector('ul');
		var todoLi1Child1 = todoLi1Ul.children[0];
		var todoLi1Child2 = todoLi1Ul.children[1];
		var todoLi1Child1CompleteButton = todoLi1Child1.children.namedItem('complete');
		var todoLi1Child2CompleteButton = todoLi1Child2.children.namedItem('complete');

		eq(todo1.stage === 'completed', false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1.querySelector('p').classList.contains('struck-completed'), false);
		eq(child1.stage === 'completed', false);
		eq(todoLi1Child1CompleteButton.textContent, 'Complete');
		eq(todoLi1Child1.querySelector('p').classList.contains('struck-completed'), false);
		eq(child2.stage === 'completed', false);
		eq(todoLi1Child2CompleteButton.textContent, 'Complete');
		eq(todoLi1Child2.querySelector('p').classList.contains('struck-completed'), false);

		todoLi1CompleteButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		todoLi1Ul = todoLi1.querySelector('ul');
		todoLi1Child1 = todoLi1Ul.children[0];
		todoLi1Child2 = todoLi1Ul.children[1];
		todoLi1Child1CompleteButton = todoLi1Child1.children.namedItem('complete');
		todoLi1Child2CompleteButton = todoLi1Child2.children.namedItem('complete');

		eq(todo1.stage === 'completed', true);
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todoLi1.querySelector('p').classList.contains('struck-completed'), true);
		eq(child1.stage === 'completed', false);
		eq(todoLi1Child1CompleteButton.textContent, 'Complete');
		eq(todoLi1Child1.querySelector('p').classList.contains('struck-completed'), false);
		eq(child2.stage === 'completed', false);
		eq(todoLi1Child2CompleteButton.textContent, 'Complete');
		eq(todoLi1Child2.querySelector('p').classList.contains('struck-completed'), false);
	},
	"Each todo li should have a 'delete' button to toggle 'Delete/Undelete'.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		var todoLi = todolist.children[0].children[0];

		eq(todoLi.children.namedItem('delete').nodeName, 'BUTTON');
		eq(todoLi.children.namedItem('delete').name, 'delete');
	},
	"If a todo is not deleted, its todoLi 'deleted' button text should be 'Delete'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');

		eq(todo1.deleted, false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
	},
	"If todo is deleted, its todoLi 'deleted' button text should be 'Undelete'.": function() {
		todolist.innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markDeleted(true);
		insertTodo(todos, todo1);
		
		startTestApp();

		showDeletedButton.click()		// required for renderTodolist to generate the todoLi

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');

		eq(todo1.deleted, true);
		eq(todoLi1DeleteButton.textContent, 'Undelete');
	},
	"If todo is not deleted, its todoLi entry should not contain class 'faded-deleted'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todo1.deleted, false);
		eq(todoLi1.querySelector('p').classList.contains('faded-deleted'), false);
	},
	"If todo is deleted, its todoLi entry should contain class 'faded-deleted'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markDeleted(true);
		insertTodo(todos, todo1);

		startTestApp();

		showDeletedButton.click();

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todo1.deleted, true);
		eq(todoLi1.querySelector('p').classList.contains('faded-deleted'), true);
	},
	"Clicking a 'deleted' button should toggle button text and todo.deleted and re-render the todoLi.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		showDeletedButton.click();

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');

		eq(todo1.deleted, false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1.querySelector('p').classList.contains('faded-deleted'), false);

		todoLi1DeleteButton.click();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');

		eq(todo1.deleted, true);
		eq(todoLi1DeleteButton.textContent, 'Undelete');
		eq(todoLi1.querySelector('p').classList.contains('faded-deleted'), true);

		todoLi1DeleteButton.click();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');

		eq(todo1.deleted, false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1.querySelector('p').classList.contains('faded-deleted'), false);
	},
	"Deleting a todo should not delete its children.": function() {
		// The children are just along for the ride
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var child1 = new Todo('child 1');
		var child2 = new Todo('child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);

		startTestApp();

		showDeletedButton.click();

		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		var todoLi1DeletedButton = todoLi1.children.namedItem('delete');
		var todoLi1Child1DeletedButton = todoLi1.querySelector('ul').children[0].children.namedItem('delete');
		var todoLi1Child2DeletedButton = todoLi1.querySelector('ul').children[1].children.namedItem('delete');

		eq(todoLi1DeletedButton.textContent, 'Delete');
		eq(todo1.deleted, false);
		eq(todoLi1Child1DeletedButton.textContent, 'Delete');
		eq(child1.deleted, false);
		eq(todoLi1Child2DeletedButton.textContent, 'Delete');
		eq(child2.deleted, false);

		todoLi1DeletedButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		var todoLi1DeletedButton = todoLi1.children.namedItem('delete');
		var todoLi1Child1DeletedButton = todoLi1.querySelector('ul').children[0].children.namedItem('delete');
		var todoLi1Child2DeletedButton = todoLi1.querySelector('ul').children[1].children.namedItem('delete');

		eq(todoLi1DeletedButton.textContent, 'Undelete');
		eq(todo1.deleted, true);
		eq(todoLi1Child1DeletedButton.textContent, 'Delete');
		eq(child1.deleted, false);
		eq(todoLi1Child2DeletedButton.textContent, 'Delete');
		eq(child2.deleted, false);
	},
	"Each todo li should have an 'addSibling' button to add a sibling todo after it.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1AddSibling = todoLi1.children.namedItem('addSibling');

		eq(todoLi1AddSibling.nodeName, 'BUTTON');
		eq(todoLi1AddSibling.name, 'addSibling');
		eq(todoLi1AddSibling.textContent, 'Add sibling');
	},
	"Clicking an 'addSibling' button should create a new sibling todo, re-render todolist, and focus new todoLi entry <p> (close devtools to pass test).": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		

		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1SiblingButton = todoLi1.children.namedItem('addSibling');
		todoLi1Ul = todoLi1.querySelector('ul');
		todoLi1Child1 = todoLi1Ul.children[0];
		todoLi1Child1AddSiblingButton = todoLi1Child1.children.namedItem('addSibling');

		eq(todosUl.childElementCount, 1);
		eq(todoLi1Ul.childElementCount, 1);
		eq(todo1.children[0].id, todoLi1Child1.id);

		todoLi1SiblingButton.click();				// Add a sibling at top level to todos array

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		todoLi1Child1 = todoLi1Ul.children[0];
		todoLi1Child1AddSiblingButton = todoLi1Child1.children.namedItem('addSibling');
		var todoLi2 = todosUl.children[1]			// the added sibling
		var todoLi2Entry = todoLi2.querySelector('p');

		eq(todosUl.childElementCount, 2);
		eq(todoLi2.nodeName, 'LI');
		eq(todoLi2.id, todos[1].id)
		eq(document.activeElement, todoLi2Entry);
		eq(document.hasFocus(), true);				// doesn't pass unless console is closed

		todoLi1Child1AddSiblingButton.click();		// Add a sibling at nested level to todo.children array

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		todoLi1Child1 = todoLi1Ul.children[0];
		var todoLi1Child2 = todoLi1Ul.children[1];	// the added sibling
		var todoLi1Child2Entry = todoLi1Child2.querySelector('p');

		eq(todoLi1Ul.childElementCount, 2);
		eq(todoLi1Child2.nodeName, 'LI');
		eq(todo1.children[1].id, todoLi1Child2.id);
		eq(document.activeElement, todoLi1Child2Entry);
		eq(document.hasFocus(), true);				// doesn't pass unless console is closed
	},
	"Each todo li should have an 'addChild' button to add a child todo underneath it.": function() {
		todolist.innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1AddChild = todoLi1.children.namedItem('addChild');

		eq(todoLi1AddChild.nodeName, 'BUTTON');
		eq(todoLi1AddChild.name, 'addChild');
		eq(todoLi1AddChild.textContent, 'Add child');
	},
	"Clicking an 'addChild' button should create a new nested child todo, re-render todolist, and focus new todoLi entry <p> (close devtools to pass test).": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		todoLi1Ul = todoLi1.querySelector('ul');

		eq(todosUl.childElementCount, 1);
		eq(todo1.children[0], undefined);
		eq(todoLi1Ul, null);

		todoLi1AddChildButton.click();

		todo1 = todos[0];
		child1 = todo1.children[0];
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		var todoLi1Ul = todoLi1.querySelector('ul')
		var todoLi1Child1 = todoLi1Ul.children[0];
		var todoLi1Child1Entry = todoLi1Child1.querySelector('p');

		eq(todosUl.childElementCount, 1);
		neq(todoLi1Ul, null);
		eq(todoLi1Ul.childElementCount, 1);

		eq(todo1.children[0].entry, "");
		eq(todoLi1Child1.nodeName, 'LI');
		eq(todoLi1Child1.id, child1.id)
		eq(child1.entry === "", true);
		eq(todoLi1Child1Entry.textContent, "");
		eq(document.activeElement, todoLi1Child1Entry);
		eq(document.hasFocus(), true);					// doesn't pass unless console is closed
	},
	"Clicking an addChild button should set todo.collapsed false and display nested todos on re-render.": function() {
		todolist.innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		
		todoLi1AddChildButton.click();

		todo1 = todos[0]
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		todoLi1Ul = todoLi1.querySelector('ul');
		var child1 = todo1.children[0];
		var childLi1 = todoLi1Ul.children[0];

		eq(todo1.collapsed, false);
		eq(todo1.children.length, 1);
		eq(todo1.children[0], child1);
		eq(todoLi1Ul.children[0], childLi1);

		todo1.collapsed = true;

		todoLi1AddChildButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		child1 = todo1.children[0];
		childLi1 = todoLi1Ul.children[0];
		var child2 = todo1.children[1];
		var childLi2 = todoLi1Ul.children[1];

		eq(todo1.collapsed, false);
		eq(todo1.children.length, 2);
		eq(todo1.children[0], child1);
		eq(todo1.children[1], child2);
		eq(todoLi1Ul.children[0], childLi1);
		eq(todoLi1Ul.children[1], childLi2);
	},
	"Each todo li should have a 'select' button to toggle 'selected/unselected'.": function() {
		todolist.innerHTML = '';
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		todoLi = todolist.children[0].children[0];

		eq(todoLi.children.namedItem('select').nodeName, 'BUTTON');
		eq(todoLi.children.namedItem('select').name, 'select');
	},
	"If a todo is not selected, its todoLi 'select' button text should be 'Select'.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
	},
	"If a todo is selected, its todoLi 'select' button should be 'Unselect' and it should not be disabled.": function() {
		todos = []
		todo1 = new Todo('Item 1');
		todo1.markSelected(true);
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');

		eq(todo1.selected, true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.disabled, false);
	},
	"If todo selectMode is true, its todoLi 'select' button should be enabled; otherwise disabled.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markSelected(true);
		todo1.markSelectMode(true);
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');

		eq(todoLi1SelectButton.disabled, false);

		todo1.markSelected(false);
		todo1.markSelectMode(false);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectButton = todoLi1.children.namedItem('select');

		eq(todoLi1SelectButton.disabled, true);
	},
	"Also, its todoLi 'complete', 'delete', 'addSibling', and 'addChild' buttons should be disabled; otherwise enabled.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markSelected(true);
		todo1.markSelectMode(true);
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		var todoLi1AddSiblingButton = todoLi1.children.namedItem('addSibling');
		var todoLi1AddChildButton = todoLi1.children.namedItem('addChild');

		eq(todoLi1SelectButton.disabled, false);
		eq(todoLi1CompleteButton.disabled, true);
		eq(todoLi1DeleteButton.disabled, true);
		eq(todoLi1AddSiblingButton.disabled, true);
		eq(todoLi1AddChildButton.disabled, true);

		todo1.markSelected(false);
		todo1.markSelectMode(false);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectButton = todoLi1.children.namedItem('select');
		todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		todoLi1AddSiblingButton = todoLi1.children.namedItem('addSibling');
		todoLi1AddChildButton = todoLi1.children.namedItem('addChild');

		eq(todoLi1SelectButton.disabled, true);
		eq(todoLi1CompleteButton.disabled, false);
		eq(todoLi1DeleteButton.disabled, false);
		eq(todoLi1AddSiblingButton.disabled, false);
		eq(todoLi1AddChildButton.disabled, false);
	},
	"If a todo is selected, its todoLi entry <p> class should contain 'highlighted'.": function() {
		todos = []
		todo1 = new Todo('Item 1');
		todo1.markSelected(true);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi2Entry = todoLi2.querySelector('p');

		eq(todo1.selected, true);
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todo2.selected, false);
		eq(todoLi2Entry.classList.contains('highlighted'), false);
	},
	"Clicking a 'select' button should toggle todo.selected and re-render todoLi, toggling button text": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		child2 = new Todo('Child 2');
		child1.markSelected(true);
		child2.markSelected(true);
		todo1.addChild(child1);
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi2 = todoLi1Ul.children[1];
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi2SelectButton = childLi2.children.namedItem('select');
		var childLi1Entry = childLi1.querySelector('p');
		var childLi2Entry = childLi2.querySelector('p');

		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(childLi2SelectButton.textContent, 'Unselect');
		eq(childLi1Entry.classList.contains('highlighted'), true);
		eq(childLi2Entry.classList.contains('highlighted'), true);

		childLi1SelectButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi2 = todoLi1Ul.children[1];
		childLi1SelectButton = childLi1.children.namedItem('select');
		childLi2SelectButton = childLi2.children.namedItem('select');
		childLi1Entry = childLi1.querySelector('p');
		childLi2Entry = childLi2.querySelector('p');

		eq(child1.selected, false);
		eq(child2.selected, true);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.textContent, 'Unselect');
		eq(childLi1Entry.classList.contains('highlighted'), false);
		eq(childLi2Entry.classList.contains('highlighted'), true);
	},
	"Selecting a todo should not select its children.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markSelected(true);
		insertTodo(todos, todo1);
		var child1 = new Todo('child 1');
		var child2 = new Todo('child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);

		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi2 = todoLi1Ul.children[1];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi2SelectButton = childLi2.children.namedItem('select');
		var todoLi1Entry = todoLi1.querySelector('p');
		var childLi1Entry = childLi1.querySelector('p');
		var childLi2Entry = childLi2.querySelector('p');

		eq(todo1.selected, true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		
		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1Entry.classList.contains('highlighted'), false);
		
		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2Entry.classList.contains('highlighted'), false);

		todoLi1SelectButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi2 = todoLi1Ul.children[1];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi2SelectButton = childLi2.children.namedItem('select');
		var todoLi1Entry = todoLi1.querySelector('p');
		var childLi1Entry = childLi1.querySelector('p');
		var childLi2Entry = childLi2.querySelector('p');

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		
		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1Entry.classList.contains('highlighted'), false);
		
		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2Entry.classList.contains('highlighted'), false);
	},
	"Each todoLi should have a disabled-by-default 'undoEdit' button to revert changes to the entry.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1UndoEditButton = todoLi1.children.namedItem('undoEdit');

		eq(todoLi1UndoEditButton.nodeName, 'BUTTON');
		eq(todoLi1UndoEditButton.name, 'undoEdit');
		eq(todoLi1UndoEditButton.textContent, 'Undo edit');
		eq(todoLi1UndoEditButton.disabled, true);
	},
	"undoEditButton should become enabled when a todoLi entry is edited.": function() {
		
		manual();

		// Add a todo. undoEdit button is disabled. Hit a key, button is enabled.

		/*		
		// Need alternative to synthetic key events, which don't trigger code, to automate this test
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1UndoEditButton = todoLi.children.namedItem('undoEdit');
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todoLi1UndoEditButton.disabled, true);
		eq(todoLi1Entry.textContent, 'Item 1');

		// simulate input
		todoLi1Entry.textContent = 'Item 11';	// doesn't trigger an input event so doesn't signal an edit
		var testEvent = new Event('input');
		todoLi1Entry.dispatchEvent(testEvent);	// doesn't trigger app event handler

		eq(todoLi1UndoEditButton.disabled, false);
		eq(todoLi1Entry.textContent, 'Item 11');

		addTodoButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1UndoEditButton = todoLi.children.namedItem('undoEdit');
		var todoLi2 = todolist.children[0].children[1];
		var todoLi2UndoEditButton = todoLi2.children.namedItem('undoEdit');
		var todoLi2Entry = todoLi2.querySelector('p');
		
		eq(todoLi1UndoEditButton.disabled, true);
		eq(todoLi2Entry.textContent, '');

		// simulate pasted input
		// Code to paste 'Item 2' with a synthetic paste event to trigger the input event
		todoLi2Entry.textContent = 'Item 2';	// doesn't trigger an input event so doesn't signal an edit

		eq(todoLi2UndoEditButton.disabled, false);
		eq(todoLi2Entry.textContent, 'Item 2');
		*/
	},
	"undoEditButton should remain enabled until an edit is started on another entry or todolist re-renders.": function() {
		// By design, you are allowed to undo an edit even if the entry loses focus until
		// 1) the todolist re-renders or 2) another entry is edited (i.e. fires an input event).
		// You can click out of entry A, even on to another entry B or C, but until a different entry
		// is being edited or a button is clicked, the edit to entry A can still be undone.

		manual();

		// Add a todo (Todo A) and enter 'A'. undoEdit button becomes enabled.
		// Add another todo (Todo B) but do not enter anything. Todo A undoEdit button becomes disabled. Todo B button also disabled.
		// Enter 'B' in Todo B. Todo B undoEdit button becomes enabled.
		// Go back and edit todo A. Todo B button becomes disabled. Todo A button enabled.
		// Click on Todo B entry but do not edit it. Todo A undoEdit button still enabled.
		// Click outside of entries on body but not on a button. Todo A button still enabled.
		// Click Todo A undoEdit button. Entry reverts to original 'A'. Todo A undoEdit button text becomes 'Redo edit'.
		// Click showDeletedButton to re-render. Todo A undoEdit button reads 'Undo edit' and is disabled.

		/*
		// Need alternative to synthetic key events, which don't trigger code, to automate this test
		
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi1UndoEditButton = todoLi.children.namedItem('undoEdit');

		eq(todoLi1UndoEditButton.disabled, true);
		eq(todoLi1Entry.textContent, 'Item 1');

		// Case 1: edit completed with undoEditButton click

		// TODO code to append a '1' with a synthetic key event alternative

		eq(todoLi1UndoEditButton.disabled, false);
		eq(todoLi1Entry.textContent, 'Item 11');

		todoLi1UndoEditButton.click();

		eq(todoLi1UndoEditButton.disabled, true);
		eq(todoLiEntry.textContent, 'Item 1');

		// Case 2: edit completed when entry loses focus

		// TODO code to append a '1' with a synthetic key event alternative

		eq(todoLi1UndoEditButton.disabled, false);
		eq(todoLi1Entry.textContent, 'Item 11');

		addTodoButton.click();	// edit over as entry loses focus

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi1UndoEditButton = todoLi.children.namedItem('undoEdit');

		eq(todoLi1UndoEditButton.disabled, false);
		eq(todoLi1Entry.textContent, 'Item 11');
		*/
	},
	"Clicking 'Undo edit' button should revert entry to old version and toggle button text to 'Redo edit'.": function() {

		manual();

		// Add a todo. Enter text. Click undoEdit button. Text goes away and undoEdit button reads 'Redo edit'.
		// The entry loses focus as a consequence of the button click. That is the natural expected behavior.

		/*
		// Need alternative to synthetic key events, which don't trigger code, to automate this test
		
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi1UndoEditButton = todoLi.children.namedItem('undoEdit');

		eq(todoLi1UndoEditButton.disabled, true);
		eq(todoLi1Entry.textContent, 'Item 1');

		// TODO need to trigger an input event here
		// Activate undoEditButton programmatically in lieu of firing an input event
		todoLi1Entry.textContent = 'Item 11';

		eq(todoLi1UndoEditButton.disabled, false);
		eq(todoLiUndoEditButton.textContent, 'Undo edit');
		eq(todoLi1Entry.textContent, 'Item 11');

		todoLi1UndoEditButton.click();

		eq(todoLi1UndoEditButton.disabled, false);
		eq(todoLiUndoEditButton.textContent, 'Redo edit');
		eq(todoLi1Entry.textContent, 'Item 1');
		*/
	},
	"Clicking 'Redo edit' button should revert entry to edited version and toggle button text to 'Undo edit'.": function() {
		// By design, the undoing/re-doing process is cumulative. If you re-do an edit and then add more to the entry,
		// the redone edit becomes the new baseline for undoing the most recent addition.
		
		manual();
		
		// Add a todo. Enter text 'Fresh entry'. Click undoEdit button. Text goes away and undoEdit button reads 'Redo edit'.
		// Click 'Redo edit' button. 'Fresh entry' re-appears. Button toggles back to 'Undo edit'.
		// Add 'edited again' after 'Fresh entry'. Click 'Undo edit' again. Text reverts to 'Fresh entry' and button to 'Redo edit' 
		// Click 'Redo edit'. Text goes back to 'Fresh entry edited again'. Button reads 'Undo edit'.
		// Click 'Undo edit' one last time. Text revers to 'Fresh entry' and button to 'Redo edit'.
		// Click showDeleted filter button. undoEdit button reads 'Undo edit' and is disabled.
	},
	"Each todoLi with children should have a showChildren button to expand/collapse nested todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');

		eq(todoLi1ShowChildrenButton.nodeName, 'BUTTON');
		eq(todoLi1ShowChildrenButton.name, 'showChildren');
	},
	"If a todo has no children, todoLi should be created without a showChildren button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];

		eq(todoLi1.children.namedItem('showChildren'), null);
	},
	"If a todo has children that are all filtered out of the display, todoLi should be created without a showChildren button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		child1.markDeleted(true);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];

		eq(todoLi1.children.namedItem('showChildren'), null);
	},
	"If a todo has children and todo.collapsed is true, todoLi should be created with showChildren button text 'Show children'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markCollapsed(true);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');

		eq(todo1.collapsed, true);
		eq(todoLi1ShowChildrenButton.textContent, 'Show children');
	},
	"If a todo has children and todo.collapsed is false, todoLi should be created with showChildren button text 'Hide children'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');

		eq(todo1.collapsed, false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
	},
	"If a todo has any filtered-in descendants in select mode, showChildren button should be disabled.": function() {
		// By design, don't allow todos to be removed from the display while they are in select mode. This is the same design
		// decision that governs not allowing new todos while in select mode. It's important to focus on the task at hand.
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		greatgrandchild1 = new Todo('Great grandchild 1');
		grandchild1.addChild(greatgrandchild1);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1Ul = childLi1.querySelector('ul');
		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');
		
		childLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		var todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');
		childLi1 = todoLi1Ul.children[0];
		var childLi1ShowChildrenButton = childLi1.children.namedItem('showChildren');
		childLi1Ul = childLi1.querySelector('ul');
		var grandchildLi1 = childLi1Ul.children[0];
		var grandchildLi1ShowChildrenButton = grandchildLi1.children.namedItem('showChildren');

		eq(todoLi1ShowChildrenButton.disabled, true);
		eq(childLi1ShowChildrenButton.disabled, true);
		eq(grandchildLi1ShowChildrenButton.disabled, true);
	},
	"If showChildren button text is 'Show children', app should preserve spacing above the following entry.": function() {
		// TODO there is probably a better way than just adding an empty <p> element
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo2 = new Todo('Item 2');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);

		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');

		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');

		todoLi1ShowChildrenButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');
		
		eq(todoLi1Ul, null);			// childLi1 not created on re-render
		eq(todoLi1ShowChildrenButton.textContent, 'Show children');
		eq(todoLi1.lastElementChild.nodeName, 'P');

	},
	"Clicking a showChildren button should toggle todo.collapsed and re-render todoLis, toggling button text.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');

		eq(todo1.collapsed, false);
		eq(child1.id, childLi1.id);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');

		todoLi1ShowChildrenButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');
		
		eq(todo1.collapsed, true);
		eq(todoLi1Ul, null);			// childLi1 not created on re-render
		eq(todoLi1ShowChildrenButton.textContent, 'Show children');

		todoLi1ShowChildrenButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');

		eq(todo1.collapsed, false);
		eq(child1.id, childLi1.id);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
	},
	"If a todo has children, its todoLi should have a 'selectChildren' button to select them.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton.nodeName, 'BUTTON');
		eq(todoLi1SelectChildrenButton.name, 'selectChildren');
	},
	"If a todo has no children, its todoLi should not have a 'selectChildren' button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton, null);
	},
	"If a todo has children that are all filtered out of the display, todoLi should not have a selectChildren button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		child1.markDeleted(true);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];

		eq(todoLi1.children.namedItem('selectChildren'), null);
	},
	"If todo.collapsed is true, its todoLi should be created without a selectChildren button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markCollapsed(true);
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton, null);
	},
	"If todo.collapsed is false, its todoLi should be created with selectChildren button enabled.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton.disabled, false);
	},
	"If no filtered-in descendants are in select mode, button should read 'Select children'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		child2 = new Todo('Child 2');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
	},
	"If todo has any filtered-in descendants not in select mode, todoLi selectChildren button should read 'Select children'.": function() {
		// select-mode-root-ancestor
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1Ul = childLi1.querySelector('ul');
		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');
		
		childLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		childLi1 = todoLi1Ul.children[0];
		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.textContent, 'Unselect children');
	}, 
	"If all filtered-in descendants are in select mode and any are selected, button should read 'Unselect children'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		
		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1SelectChildrenButton.textContent, 'Unselect children');
	},
	"If all filtered-in descendants are in select mode and none are selected, button should read 'Select children'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		
		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');
		var childLi1Ul = childLi1.querySelector('ul');
		var grandchildLi1 = childLi1Ul.children[0];
		var grandchildLi1SelectButton = grandchildLi1.children.namedItem('select');

		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1SelectChildrenButton.textContent, 'Unselect children');

		grandchildLi1SelectButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1SelectChildrenButton.textContent, 'Select children');

		childLi1SelectButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
	},
	"Clicking 'Select children' button should select nested filtered-in todos and re-render todoLis, toggling button text.": function() {
		// Revised to expose bug where, in the case where some but not all descendants are in select mode,
		// clicking the select-root-ancestor button would remove descendants from select mode and
		// set itself and all nested selectChildren buttons to 'Select children'
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		child2 = new Todo('Child 2');
		todo1.addChild(child2);
		grandchild2 = new Todo('Grandchild 2');
		child2.addChild(grandchild2);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(grandchild2.selected, false);
		eq(child1.selectMode, false);
		eq(child2.selectMode, false);
		eq(grandchild2.selectMode, false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');

		todoLi1SelectChildrenButton.click();
		
		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(grandchild2.selected, true);
		eq(child1.selectMode, true);
		eq(child2.selectMode, true);
		eq(grandchild2.selectMode, true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');

		todoLi1SelectChildrenButton.click();		// re-set to starting position

		// test case of clicking a selection-root-ancestor selectChildren button
		
		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		childLi2 = todoLi1Ul.children[1];
		childLi2SelectChildrenButton = childLi2.children.namedItem('selectChildren');

		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(grandchild2.selected, false);
		eq(child1.selectMode, false);
		eq(child2.selectMode, false);
		eq(grandchild2.selectMode, false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi2SelectChildrenButton.textContent, 'Select children');

		childLi2SelectChildrenButton.click();		// the selection-root button
		
		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		childLi2 = todoLi1Ul.children[1];
		childLi2SelectChildrenButton = childLi2.children.namedItem('selectChildren');

		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(grandchild2.selected, true);
		eq(child1.selectMode, false);
		eq(child2.selectMode, false);
		eq(grandchild2.selectMode, true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi2SelectChildrenButton.textContent, 'Unselect children');

		todoLi1SelectChildrenButton.click();		// the selection-root-ancestor button
		
		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		childLi2 = todoLi1Ul.children[1];
		childLi2SelectChildrenButton = childLi2.children.namedItem('selectChildren');

		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(grandchild2.selected, true);
		eq(child1.selectMode, true);
		eq(child2.selectMode, true);
		eq(grandchild2.selectMode, true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi2SelectChildrenButton.textContent, 'Unselect children');
	},
	"Clicking 'Unselect children' button should unselect nested filtered-in todos and re-render todoLis, toggling button text.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		child2 = new Todo('Child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');

		todoLi1SelectChildrenButton.click();
		
		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');

		todoLi1SelectChildrenButton.click();
		
		todoLi1 = todolist.children[0].children[0];

		eq(child1.selected, false);
		eq(child2.selected, false);
	},
	"If selectChildren is a root button (Select button disabled), it should toggle selectMode on nested todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		child2 = new Todo('Child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		todoLi1SelectButton = todoLi1.children.namedItem('select');

		eq(child1.selected, false);
		eq(child1.selectMode, false);
		eq(child2.selected, false);
		eq(child2.selectMode, false);
		eq(todoLi1SelectButton.disabled, true);		// true if a root button
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');

		todoLi1SelectChildrenButton.click();
		
		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(child1.selectMode, true);
		eq(child2.selectMode, true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');

		todoLi1SelectChildrenButton.click();
		
		eq(child1.selected, false);
		eq(child2.selectMode, false);
		eq(child2.selected, false);
		eq(child2.selectMode, false);
	},
	"If all todos under a select-mode-root todo become unselected, all should set selectMode false.": function() {
		// Case: clicked 'Unselect' button unselects last todo under a select-mode root
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		child2 = new Todo('Child 2');
		child1.markSelected(true);
		child2.markSelected(true);
		child1.markSelectMode(true);
		child2.markSelectMode(true);
		todo1.addChild(child1);
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1SelectButton = childLi1.children.namedItem('select');

		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(child1.selectMode, true);
		eq(child2.selectMode, true);

		childLi1SelectButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		var childLi2 = todoLi1Ul.children[1];
		var childLi2SelectButton = childLi2.children.namedItem('select');

		eq(child1.selected, false);
		eq(child2.selected, true);
		eq(child1.selectMode, true);
		eq(child2.selectMode, true);

		childLi2SelectButton.click();

		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(child1.selectMode, false);
		eq(child2.selectMode, false);

		// Case: clicked 'Unselect children' button unselects last todo under a select-mode root

		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1AddChildButton = childLi1.children.namedItem('addChild');

		childLi1AddChildButton.click();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1Ul = todoLi1.querySelector('ul');
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		todoLi1SelectChildrenButton.click();

		var grandchild1 = todo1.children[0].children[0];

		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(grandchild1.selected, true);

		eq(child1.selectMode, true);
		eq(child2.selectMode, true);
		eq(grandchild1.selectMode, true);

		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi2 = todoLi1Ul.children[1];
		childLi2SelectButton = childLi2.children.namedItem('select');

		childLi2SelectButton.click();	// Unselect
		
		eq(child1.selected, true);
		eq(child2.selected, false);
		eq(grandchild1.selected, true);

		eq(child1.selectMode, true);
		eq(child2.selectMode, true);
		eq(grandchild1.selectMode, true);

		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1SelectButton = childLi1.children.namedItem('select');

		childLi1SelectButton.click();	// Unselect
		
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(grandchild1.selected, true);

		eq(child1.selectMode, true);
		eq(child2.selectMode, true);
		eq(grandchild1.selectMode, true);

		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');

		childLi1SelectChildrenButton.click();	// Unselect children

		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(grandchild1.selected, false);

		eq(child1.selectMode, false);
		eq(child2.selectMode, false);
		eq(grandchild1.selectMode, false);
	},
	"If selectChildren is a root-descendant button (Select button enabled), it should not toggle selectMode on nested todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		grandchild2 = new Todo('Grandchild 2');
		child1.addChild(grandchild1);
		child1.addChild(grandchild2);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(child1.selected, false);
		eq(grandchild1.selected, false);
		eq(grandchild2.selected, false);
		eq(child1.selectMode, false);
		eq(grandchild1.selectMode, false);
		eq(grandchild2.selectMode, false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');

		todoLi1SelectChildrenButton.click();
		
		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1SelectButton = childLi1.children.namedItem('select');
		childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');

		eq(child1.selected, true);
		eq(grandchild1.selected, true);
		eq(grandchild2.selected, true);
		eq(child1.selectMode, true);
		eq(grandchild1.selectMode, true);
		eq(grandchild2.selectMode, true);
		eq(childLi1SelectButton.disabled, false);			// not a root selectChildren button
		eq(childLi1SelectChildrenButton.textContent, 'Unselect children');

		childLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1SelectButton = childLi1.children.namedItem('select');
		childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');

		eq(child1.selected, true);
		eq(grandchild1.selected, false);
		eq(grandchild2.selected, false);
		eq(child1.selectMode, true);
		eq(grandchild1.selectMode, true);
		eq(grandchild2.selectMode, true);
		eq(childLi1SelectButton.disabled, false);			// not a root selectChildren button
		eq(childLi1SelectChildrenButton.textContent, 'Select children');

		childLi1SelectChildrenButton.click();

		eq(child1.selected, true);
		eq(grandchild1.selected, true);
		eq(grandchild2.selected, true);
		eq(child1.selectMode, true);
		eq(grandchild1.selectMode, true);
		eq(grandchild2.selectMode, true);
	},
	"The selectChildren button should select/unselect displayed (filtered-in and not hidden) nested todos only.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		child1.markCollapsed(true);						// to test case of filtering out by hiding children	
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		child3 = new Todo('Item 1 child 3');
		child3.markDeleted(true);						// to test case of filtering out by filter
		todo1.addChild(child3);
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1Ul = todoLi1.querySelector('ul');
		var child1Li = todoLi1Ul.children[0];
		var child1LiShowChildrenButton = child1Li.children.namedItem('showChildren');
		var child1LiUl = child1Li.querySelector('ul');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child3Li = todoLi1.querySelector('ul').children[2];

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(child1LiShowChildrenButton.textContent, 'Show children');

		eq(child1.selected, false);
		eq(grandchild1.selected, false);
		eq(child2.selected, false);
		eq(child3.selected, false);
		eq(child1.filteredIn, true);
		eq(grandchild1.filteredIn, true);
		eq(child2.filteredIn, true);
		eq(child3.filteredIn, false);
		eq(child1.hidden, false);
		eq(grandchild1.hidden, true);
		eq(child2.hidden, false);
		eq(child3.hidden, false);
		eq(todoLi1Ul.children.length, 2);
		eq(child1Li, todoLi1Ul.children[0]);
		eq(child1LiUl, null);					// because child1.children is collapsed
		eq(child2Li, todoLi1Ul.children[1]);
		eq(child3Li, undefined);

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		todoLi1Ul = todoLi1.querySelector('ul');
		child1Li = todoLi1Ul.children[0];
		child1LiUl = child1Li.querySelector('ul');
		eq(child1LiUl, null);
		child2Li = todoLi1.querySelector('ul').children[1];
		child3Li = todoLi1.querySelector('ul').children[2];

		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');

		eq(child1.selected, true);
		eq(grandchild1.selected, false);
		eq(child2.selected, true);
		eq(child3.selected, false);
		eq(child1.filteredIn, true);
		eq(grandchild1.filteredIn, true);
		eq(child2.filteredIn, true);
		eq(child3.filteredIn, false);
		eq(child1.hidden, false);
		eq(grandchild1.hidden, true);
		eq(child2.hidden, false);
		eq(child3.hidden, false);
		eq(todoLi1Ul.children.length, 2);
		eq(child1Li, todoLi1Ul.children[0]);
		eq(child1LiUl, null);
		eq(child2Li, todoLi1Ul.children[1]);
		eq(child3Li, undefined);

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		todoLi1Ul = todoLi1.querySelector('ul');
		child1Li = todoLi1Ul.children[0];
		child1LiUl = child1Li.querySelector('ul');
		child2Li = todoLi1.querySelector('ul').children[1];
		child3Li = todoLi1.querySelector('ul').children[2];

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');

		eq(child1.selected, false);
		eq(grandchild1.selected, false);
		eq(child2.selected, false);
		eq(child3.selected, false);
		eq(child1.filteredIn, true);
		eq(grandchild1.filteredIn, true);
		eq(child2.filteredIn, true);
		eq(child3.filteredIn, false);
		eq(child1.hidden, false);
		eq(grandchild1.hidden, true);
		eq(child2.hidden, false);
		eq(child3.hidden, false);
		eq(todoLi1Ul.children.length, 2);
		eq(child1Li, todoLi1Ul.children[0]);
		eq(child1LiUl, null);
		eq(child2Li, todoLi1Ul.children[1]);
		eq(child3Li, undefined);
	}, 
	"The selectChildren button should set/unset select mode on all child todos.": function() {
		// So that newly filtered-in todos are displayed in select mode when they should be
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		child1.markCollapsed(true);						// to test case of hidden children	
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		child3 = new Todo('Item 1 child 3');
		child3.markDeleted(true);						// to test case of filtering out
		todo1.addChild(child3);
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1Ul = todoLi1.querySelector('ul');
		var child1Li = todoLi1Ul.children[0];
		var child1LiUl = child1Li.querySelector('ul');
		var child1LiShowChildrenButton = child1Li.children.namedItem('showChildren');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child3Li = todoLi1.querySelector('ul').children[2];

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(child1LiShowChildrenButton.textContent, 'Show children');

		eq(child1.selectMode, false);
		eq(grandchild1.selectMode, false);
		eq(child2.selectMode, false);
		eq(child3.selectMode, false);
		eq(child1.filteredIn, true);
		eq(grandchild1.filteredIn, true);
		eq(child2.filteredIn, true);
		eq(child3.filteredIn, false);
		eq(child1.hidden, false);
		eq(grandchild1.hidden, true);
		eq(child2.hidden, false);
		eq(child3.hidden, false);
		eq(todoLi1Ul.children.length, 2);
		eq(child1Li, todoLi1Ul.children[0]);
		eq(child1LiUl, null);
		eq(child2Li, todoLi1Ul.children[1]);
		eq(child3Li, undefined);

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		todoLi1Ul = todoLi1.querySelector('ul');
		child1Li = todoLi1Ul.children[0];
		child1LiUl = child1Li.querySelector('ul');
		child2Li = todoLi1.querySelector('ul').children[1];
		child3Li = todoLi1.querySelector('ul').children[2];

		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');

		eq(child1.selectMode, true);
		eq(grandchild1.selectMode, true);
		eq(child2.selectMode, true);
		eq(child3.selectMode, true);
		eq(child1.filteredIn, true);
		eq(grandchild1.filteredIn, true);
		eq(child2.filteredIn, true);
		eq(child3.filteredIn, false);
		eq(child1.hidden, false);
		eq(grandchild1.hidden, true);
		eq(child2.hidden, false);
		eq(child3.hidden, false);
		eq(todoLi1Ul.children.length, 2);
		eq(child1Li, todoLi1Ul.children[0]);
		eq(child1LiUl, null);
		eq(child2Li, todoLi1Ul.children[1]);
		eq(child3Li, undefined);

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		todoLi1Ul = todoLi1.querySelector('ul');
		child1Li = todoLi1Ul.children[0];
		child1Li = todoLi1Ul.children[0];
		child1LiUl = child1Li.querySelector('ul');
		child2Li = todoLi1.querySelector('ul').children[1];
		child3Li = todoLi1.querySelector('ul').children[2];

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');

		eq(child1.selectMode, false);
		eq(grandchild1.selectMode, false);
		eq(child2.selectMode, false);
		eq(child3.selectMode, false);
		eq(child1.filteredIn, true);
		eq(grandchild1.filteredIn, true);
		eq(child2.filteredIn, true);
		eq(child3.filteredIn, false);
		eq(child1.hidden, false);
		eq(grandchild1.hidden, true);
		eq(child2.hidden, false);
		eq(child3.hidden, false);
		eq(todoLi1Ul.children.length, 2);
		eq(child1Li, todoLi1Ul.children[0]);
		eq(child1LiUl, null);
		eq(child2Li, todoLi1Ul.children[1]);
		eq(child3Li, undefined);
	}, 
	"The selectChildren button should operate recursively on all filtered-in nested todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		grandchild1 = new Todo('Item 1 child 1 child 1');
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		child3 = new Todo('Item 1 child 3');
		todo1.addChild(child3);
		grandchild3 = new Todo('Item 1 child 3 child 1');
		child3.addChild(grandchild3);
		insertTodo(todos, todo1);
		
		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1Ul = todoLi1.querySelector('ul');
		var child1Li = todoLi1Ul.children[0];
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child3Li = todoLi1.querySelector('ul').children[2];

		var child1LiUl = child1Li.querySelector('ul');
		var child3LiUl = child3Li.querySelector('ul');

		var grandchild1Li = child1LiUl.children[0];
		var grandchild3Li = child3LiUl.children[0];

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');

		eq(child1.selectMode, false);
		eq(child2.selectMode, false);
		eq(child3.selectMode, false);
		eq(grandchild1.selectMode, false);
		eq(grandchild3.selectMode, false);
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(child3.selected, false);
		eq(grandchild1.selected, false);
		eq(grandchild3.selected, false);
		eq(child1.filteredIn, true);
		eq(child2.filteredIn, true);
		eq(child3.filteredIn, true);
		eq(grandchild1.filteredIn, true);
		eq(grandchild3.filteredIn, true);
		eq(todoLi1Ul.children.length, 3);
		eq(child1Li, todoLi1Ul.children[0]);
		eq(child2Li, todoLi1Ul.children[1]);
		eq(child3Li, todoLi1Ul.children[2]);
		eq(grandchild1Li, child1LiUl.children[0]);
		eq(grandchild3Li, child3LiUl.children[0]);

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		todoLi1Ul = todoLi1.querySelector('ul');
		child1Li = todoLi1Ul.children[0];
		child2Li = todoLi1.querySelector('ul').children[1];
		child3Li = todoLi1.querySelector('ul').children[2];

		child1LiUl = child1Li.querySelector('ul');
		child3LiUl = child3Li.querySelector('ul');

		grandchild1Li = child1LiUl.children[0];
		grandchild3Li = child3LiUl.children[0];

		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');

		eq(child1.selectMode, true);
		eq(child2.selectMode, true);
		eq(child3.selectMode, true);
		eq(grandchild1.selectMode, true);
		eq(grandchild3.selectMode, true);
		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(child3.selected, true);
		eq(grandchild1.selected, true);
		eq(grandchild3.selected, true);
		eq(child1.filteredIn, true);
		eq(child2.filteredIn, true);
		eq(child3.filteredIn, true);
		eq(grandchild1.filteredIn, true);
		eq(grandchild3.filteredIn, true);
		eq(todoLi1Ul.children.length, 3);
		eq(child1Li, todoLi1Ul.children[0]);
		eq(child2Li, todoLi1Ul.children[1]);
		eq(child3Li, todoLi1Ul.children[2]);
		eq(grandchild1Li, child1LiUl.children[0]);
		eq(grandchild3Li, child3LiUl.children[0]);

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		todoLi1Ul = todoLi1.querySelector('ul');
		child1Li = todoLi1Ul.children[0];
		child2Li = todoLi1.querySelector('ul').children[1];
		child3Li = todoLi1.querySelector('ul').children[2];

		child1LiUl = child1Li.querySelector('ul');
		child3LiUl = child3Li.querySelector('ul');

		grandchild1Li = child1LiUl.children[0];
		grandchild3Li = child3LiUl.children[0];

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');

		eq(child1.selectMode, false);
		eq(child2.selectMode, false);
		eq(child3.selectMode, false);
		eq(grandchild1.selectMode, false);
		eq(grandchild3.selectMode, false);
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(child3.selected, false);
		eq(grandchild1.selected, false);
		eq(grandchild3.selected, false);
		eq(child1.filteredIn, true);
		eq(child2.filteredIn, true);
		eq(child3.filteredIn, true);
		eq(grandchild1.filteredIn, true);
		eq(grandchild3.filteredIn, true);
		eq(todoLi1Ul.children.length, 3);
		eq(child1Li, todoLi1Ul.children[0]);
		eq(child2Li, todoLi1Ul.children[1]);
		eq(child3Li, todoLi1Ul.children[2]);
		eq(grandchild1Li, child1LiUl.children[0]);
		eq(grandchild3Li, child3LiUl.children[0]);
	}, 
	"A todoLi should have a 'completeSelectedChildren' button to complete/uncomplete selected nested todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.markSelected(true);
		grandchild1 = new Todo('Item 1 grandchild 1');
		grandchild1.markSelected(true);
		grandchild1.markSelectMode(true);
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		
		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1CompleteSelectedChildrenButton = childLi1.children.namedItem('completeSelectedChildren');

		eq(childLi1CompleteSelectedChildrenButton.nodeName, 'BUTTON');
		eq(childLi1CompleteSelectedChildrenButton.name, 'completeSelectedChildren');
	},
	"If a todo has no children, its todoLi should not have a 'completeSelectedChildren' button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');

		eq(todoLi1CompleteSelectedChildrenButton, null);
	},
	"If a todo has children that are all filtered out of the display, todoLi should not have a completeSelectChildren button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		child1.markDeleted(true);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];

		eq(todoLi1.children.namedItem('completeSelectChildren'), null);
	},
	"If a todo has no selected descendants, its todoLi should not have a 'completeSelectedChildren' button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.markSelected(false);
		child1.markSelectMode(true);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];

		eq(todoLi1CompleteSelectedChildrenButton, null);
	},
	"If a todo is in select mode, its todoLi should not have a 'completeSelectedChildren' button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		insertTodo(todos, todo1);
		
		startTestApp();

		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		todoLi1SelectChildrenButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');
		var childLi1CompleteSelectedChildrenButton = childLi1.children.namedItem('completeSelectedChildren');

		eq(child1.selectMode, true);
		eq(grandchild1.selected, true);
		eq(childLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1CompleteSelectedChildrenButton, null);
	},
	"If a todo has filtered-in descendants not in select mode, its todoLi shouldn't have a 'completeSelectedChildren' button.": function() {
		// select-mode-root-ancestor
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');
		
		childLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');

		eq(todoLi1CompleteSelectedChildrenButton, null);
	},
	"Otherwise, a 'completeSelectedChildren' button should be enabled.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		todoLi1SelectChildrenButton.click();

		var todoLi1 = todolist.children[0].children[0];
		
		eq(todoLi1.children.namedItem('completeSelectedChildren').disabled, false);
	},
	"If all selected nested todos are completed, 'completeSelectedChildren' button should read 'Uncomplete selected children'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.setStage('completed');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		child2.setStage('completed');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(child1.stage, 'completed');
		eq(child2.stage, 'completed');

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');

		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(child1.stage, 'completed');
		eq(child2.stage, 'completed');
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Uncomplete selected children');
	},
	"Otherwise, 'completeSelectedChildren' button should read 'Complete selected children'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.setStage('completed');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(child1.stage, 'completed');
		eq(child2.stage, 'active');

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');

		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(child1.stage, 'completed');
		eq(child2.stage, 'active');
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
	},
	"Clicking 'Complete selected children' button should set stage 'completed' on nested selected todos and re-render todoLis.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		child1Li = todoLi1.querySelector('ul').children[0];
		child1LiEntry = child1Li.querySelector('p');
		child1LiCompleteButton = child1Li.children.namedItem('complete');
		child2Li = todoLi1.querySelector('ul').children[1];
		child2LiEntry = child2Li.querySelector('p');
		child2LiCompleteButton = child2Li.children.namedItem('complete');

		eq(child1LiEntry.classList.contains('struck-completed'), false);
		eq(child2LiEntry.classList.contains('struck-completed'), false);
		eq(child1.stage, 'active');
		eq(child2.stage, 'active');
		eq(child1LiCompleteButton.textContent, 'Complete');
		eq(child2LiCompleteButton.textContent, 'Complete');

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');

		eq(todoLi1CompleteSelectedChildrenButton.disabled, false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');

		todoLi1CompleteSelectedChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		child1Li = todoLi1.querySelector('ul').children[0];
		child1LiEntry = child1Li.querySelector('p');
		child1LiCompleteButton = child1Li.children.namedItem('complete');
		child2Li = todoLi1.querySelector('ul').children[1];
		child2LiEntry = child2Li.querySelector('p');
		child2LiCompleteButton = child2Li.children.namedItem('complete');

		eq(child1LiEntry.classList.contains('struck-completed'), true);
		eq(child2LiEntry.classList.contains('struck-completed'), true);
		eq(child1.stage, 'completed');
		eq(child2.stage, 'completed');
		eq(child1LiCompleteButton.textContent, 'Uncomplete');
		eq(child2LiCompleteButton.textContent, 'Uncomplete');
	},
	"Clicking 'Uncomplete selected children' button should set stage 'active' on nested selected todos and re-render todoLis.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var child1Li = todoLi1.querySelector('ul').children[0];
		var child1LiEntry = child1Li.querySelector('p');
		var child1LiCompleteButton = child1Li.children.namedItem('complete');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child2LiEntry = child2Li.querySelector('p');
		var child2LiCompleteButton = child2Li.children.namedItem('complete');

		eq(child1LiEntry.classList.contains('struck-completed'), false);
		eq(child2LiEntry.classList.contains('struck-completed'), false);
		eq(child1.stage, 'active');
		eq(child2.stage, 'active');
		eq(child1LiCompleteButton.textContent, 'Complete');
		eq(child2LiCompleteButton.textContent, 'Complete');

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');

		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');

		todoLi1CompleteSelectedChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');
		child1Li = todoLi1.querySelector('ul').children[0];
		child1LiEntry = child1Li.querySelector('p');
		child1LiCompleteButton = child1Li.children.namedItem('complete');
		child2Li = todoLi1.querySelector('ul').children[1];
		child2LiEntry = child2Li.querySelector('p');
		child2LiCompleteButton = child2Li.children.namedItem('complete');

		eq(child1LiEntry.classList.contains('struck-completed'), true);
		eq(child2LiEntry.classList.contains('struck-completed'), true);
		eq(child1.stage, 'completed');
		eq(child2.stage, 'completed');
		eq(child1LiCompleteButton.textContent, 'Uncomplete');
		eq(child2LiCompleteButton.textContent, 'Uncomplete');

		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Uncomplete selected children');

		todoLi1CompleteSelectedChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		child1Li = todoLi1.querySelector('ul').children[0];
		child1LiEntry = child1Li.querySelector('p');
		child1LiCompleteButton = child1Li.children.namedItem('complete');
		child2Li = todoLi1.querySelector('ul').children[1];
		child2LiEntry = child2Li.querySelector('p');
		child2LiCompleteButton = child2Li.children.namedItem('complete');

		eq(child1LiEntry.classList.contains('struck-completed'), false);
		eq(child2LiEntry.classList.contains('struck-completed'), false);
		eq(child1.stage, 'active');
		eq(child2.stage, 'active');
		eq(child1LiCompleteButton.textContent, 'Complete');
		eq(child2LiCompleteButton.textContent, 'Complete');
	},
	"A completeSelectedChildren button should operate recursively on all selected nested todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var child1Li = todoLi1.querySelector('ul').children[0];
		var child1LiEntry = child1Li.querySelector('p');
		var child1LiCompleteButton = child1Li.children.namedItem('complete');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child2LiEntry = child2Li.querySelector('p');
		var child2LiCompleteButton = child2Li.children.namedItem('complete');
		var grandchild1Li = child1Li.querySelector('ul').children[0];
		var grandchild1LiEntry = grandchild1Li.querySelector('p');
		var grandchild1LiCompleteButton = grandchild1Li.children.namedItem('complete');

		eq(child1LiEntry.classList.contains('struck-completed'), false);
		eq(child2LiEntry.classList.contains('struck-completed'), false);
		eq(grandchild1LiEntry.classList.contains('struck-completed'), false);
		eq(child1.stage, 'active');
		eq(child2.stage, 'active');
		eq(grandchild1.stage, 'active');
		eq(child1LiCompleteButton.textContent, 'Complete');
		eq(child2LiCompleteButton.textContent, 'Complete');
		eq(grandchild1LiCompleteButton.textContent, 'Complete');

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');

		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');

		todoLi1CompleteSelectedChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');
		child1Li = todoLi1.querySelector('ul').children[0];
		child1LiEntry = child1Li.querySelector('p');
		child1LiCompleteButton = child1Li.children.namedItem('complete');
		child2Li = todoLi1.querySelector('ul').children[1];
		child2LiEntry = child2Li.querySelector('p');
		child2LiCompleteButton = child2Li.children.namedItem('complete');
		grandchild1Li = child1Li.querySelector('ul').children[0];
		grandchild1LiEntry = grandchild1Li.querySelector('p');
		grandchild1LiCompleteButton = grandchild1Li.children.namedItem('complete');

		eq(child1LiEntry.classList.contains('struck-completed'), true);
		eq(child2LiEntry.classList.contains('struck-completed'), true);
		eq(grandchild1LiEntry.classList.contains('struck-completed'), true);
		eq(child1.stage, 'completed');
		eq(child2.stage, 'completed');
		eq(grandchild1.stage, 'completed');
		eq(child1LiCompleteButton.textContent, 'Uncomplete');
		eq(child2LiCompleteButton.textContent, 'Uncomplete');
		eq(grandchild1LiCompleteButton.textContent, 'Uncomplete');

		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Uncomplete selected children');

		todoLi1CompleteSelectedChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');
		child1Li = todoLi1.querySelector('ul').children[0];
		child1LiEntry = child1Li.querySelector('p');
		child1LiCompleteButton = child1Li.children.namedItem('complete');
		child2Li = todoLi1.querySelector('ul').children[1];
		child2LiEntry = child2Li.querySelector('p');
		child2LiCompleteButton = child2Li.children.namedItem('complete');
		grandchild1Li = child1Li.querySelector('ul').children[0];
		grandchild1LiEntry = grandchild1Li.querySelector('p');
		grandchild1LiCompleteButton = grandchild1Li.children.namedItem('complete');

		eq(child1LiEntry.classList.contains('struck-completed'), false);
		eq(child2LiEntry.classList.contains('struck-completed'), false);
		eq(grandchild1LiEntry.classList.contains('struck-completed'), false);
		eq(child1.stage, 'active');
		eq(child2.stage, 'active');
		eq(grandchild1.stage, 'active');
		eq(child1LiCompleteButton.textContent, 'Complete');
		eq(child2LiCompleteButton.textContent, 'Complete');
		eq(grandchild1LiCompleteButton.textContent, 'Complete');

		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
	},
	"A todoLi should have a 'deleteSelectedChildren' button to delete/undelete selected child todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.markSelected(true);
		child1.markSelectMode(true);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');

		eq(todoLi1DeleteSelectedChildrenButton.nodeName, 'BUTTON');
		eq(todoLi1DeleteSelectedChildrenButton.name, 'deleteSelectedChildren');
	},
	"If a todo has no children, its todoLi should not have a 'deleteSelectedChildren' button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');

		eq(todoLi1DeleteSelectedChildrenButton, null);
	},
	"If a todo has children that are all filtered out of the display, todoLi should not have a completeSelectChildren button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		child1.markDeleted(true);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		todoLi1 = todolist.children[0].children[0];

		eq(todoLi1.children.namedItem('deleteSelectChildren'), null);
	},
	"If a todo has no selected children, its todoLi should not have a 'deleteSelectedChildren' button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];

		eq(todoLi1DeleteSelectedChildrenButton, null);
	},
	"If a todo is in select mode, its todoLi should not have a 'deleteSelectedChildren' button.": function() {
		// Because it is a 'branch' todo controlled by a 'root' todo higher in the tree
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		insertTodo(todos, todo1);
		
		startTestApp();

		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		todoLi1SelectChildrenButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');
		var childLi1DeleteSelectedChildrenButton = childLi1.children.namedItem('deleteSelectedChildren');

		eq(child1.selectMode, true);
		eq(grandchild1.selected, true);
		eq(childLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1DeleteSelectedChildrenButton, null);
	},
	"If a todo has filtered-in descendants not in select mode, its todoLi shouldn't have a 'deleteSelectedChildren' button.": function() {
		// select-mode-root-ancestor
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');
		
		childLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');

		eq(todoLi1DeleteSelectedChildrenButton, null);

	},
	"Otherwise, a 'deleteSelectedChildren' button should be enabled.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.markSelected(true);
		child1.markSelectMode(true);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		startTestApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];

		eq(todo1.selectMode, false);
		eq(todoLi1.children.namedItem('deleteSelectedChildren').disabled, false);
	},
	"If all selected nested todos are deleted, 'deleteSelectedChildren' button should read 'Undelete selected children'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.deleted = true;
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		child2.deleted = true;
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		showDeletedButton.click();		// need to display deleted todos

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');

		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(child1.deleted, true);
		eq(child2.deleted, true);
		eq(todoLi1DeleteSelectedChildrenButton, null);

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');

		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(child1.deleted, true);
		eq(child2.deleted, true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Undelete selected children');
	},
	"Otherwise, 'deleteSelectedChildren' button should read 'Delete selected children'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.deleted = true;
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		showDeletedButton.click();		// need to display deleted todos

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');

		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(child1.deleted, true);
		eq(child2.deleted, false);
		eq(todoLi1DeleteSelectedChildrenButton, null);

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');

		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(child1.deleted, true);
		eq(child2.deleted, false);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
	},
	"Clicking 'Delete selected children' button should mark nested selected todos deleted and re-render todoLis.": function() {
		// No need to check for filtered in or out because all filtered-out todos have select marked false.
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		showDeletedButton.click();

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		var child1Li = todoLi1.querySelector('ul').children[0];
		var child1LiEntry = child1Li.querySelector('p');
		var child1LiDeleteButton = child1Li.children.namedItem('delete');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child2LiEntry = child2Li.querySelector('p');
		var child2LiDeleteButton = child2Li.children.namedItem('delete');

		eq(todoLi1DeleteSelectedChildrenButton, null);
		eq(child1LiEntry.classList.contains('faded-deleted'), false);
		eq(child2LiEntry.classList.contains('faded-deleted'), false);
		eq(child1.deleted, false);
		eq(child2.deleted, false);
		eq(child1LiDeleteButton.textContent, 'Delete');
		eq(child2LiDeleteButton.textContent, 'Delete');

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');

		eq(todoLi1DeleteSelectedChildrenButton.disabled, false);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');

		todoLi1DeleteSelectedChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		child1Li = todoLi1.querySelector('ul').children[0];
		child1LiEntry = child1Li.querySelector('p');
		child1LiDeleteButton = child1Li.children.namedItem('delete');
		child2Li = todoLi1.querySelector('ul').children[1];
		child2LiEntry = child2Li.querySelector('p');
		child2LiDeleteButton = child2Li.children.namedItem('delete');

		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Undelete selected children');

		eq(child1LiEntry.classList.contains('faded-deleted'), true);
		eq(child2LiEntry.classList.contains('faded-deleted'), true);
		eq(child1.deleted, true);
		eq(child2.deleted, true);
		eq(child1LiDeleteButton.textContent, 'Undelete');
		eq(child2LiDeleteButton.textContent, 'Undelete');
	},
	"Clicking 'Undelete selected children' button should mark nested selected todos undeleted and re-render todoLis.": function() {
		// No need to check for filtered in or out because all filtered-out todos have select marked false.
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		showDeletedButton.click();

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		var child1Li = todoLi1.querySelector('ul').children[0];
		var child1LiEntry = child1Li.querySelector('p');
		var child1LiDeleteButton = child1Li.children.namedItem('delete');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child2LiEntry = child2Li.querySelector('p');
		var child2LiDeleteButton = child2Li.children.namedItem('delete');

		eq(todoLi1DeleteSelectedChildrenButton, null);
		eq(child1LiEntry.classList.contains('faded-deleted'), false);
		eq(child2LiEntry.classList.contains('faded-deleted'), false);
		eq(child1.deleted, false);
		eq(child2.deleted, false);
		eq(child1LiDeleteButton.textContent, 'Delete');
		eq(child2LiDeleteButton.textContent, 'Delete');

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');

		eq(todoLi1DeleteSelectedChildrenButton.disabled, false);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');

		todoLi1DeleteSelectedChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		child1Li = todoLi1.querySelector('ul').children[0];
		child1LiEntry = child1Li.querySelector('p');
		child1LiDeleteButton = child1Li.children.namedItem('delete');
		child2Li = todoLi1.querySelector('ul').children[1];
		child2LiEntry = child2Li.querySelector('p');
		child2LiDeleteButton = child2Li.children.namedItem('delete');

		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Undelete selected children');

		eq(child1LiEntry.classList.contains('faded-deleted'), true);
		eq(child2LiEntry.classList.contains('faded-deleted'), true);
		eq(child1.deleted, true);
		eq(child2.deleted, true);
		eq(child1LiDeleteButton.textContent, 'Undelete');
		eq(child2LiDeleteButton.textContent, 'Undelete');

		todoLi1DeleteSelectedChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		child1Li = todoLi1.querySelector('ul').children[0];
		child1LiEntry = child1Li.querySelector('p');
		child1LiDeleteButton = child1Li.children.namedItem('delete');
		child2Li = todoLi1.querySelector('ul').children[1];
		child2LiEntry = child2Li.querySelector('p');
		child2LiDeleteButton = child2Li.children.namedItem('delete');

		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');

		eq(child1LiEntry.classList.contains('faded-deleted'), false);
		eq(child2LiEntry.classList.contains('faded-deleted'), false);
		eq(child1.deleted, false);
		eq(child2.deleted, false);
		eq(child1LiDeleteButton.textContent, 'Delete');
		eq(child2LiDeleteButton.textContent, 'Delete');
	},
	"A deleteSelectedChildren button should operate recursively on all selected nested todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		showDeletedButton.click();			// need to display deleted todos

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		var child1Li = todoLi1.querySelector('ul').children[0];
		var child1LiEntry = child1Li.querySelector('p');
		var child1LiDeleteButton = child1Li.children.namedItem('delete');
		var child1LiDeleteSelectedChildrenButton = child1Li.children.namedItem('deleteSelectedChildren');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child2LiEntry = child2Li.querySelector('p');
		var child2LiDeleteButton = child2Li.children.namedItem('delete');
		var grandchild1Li = child1Li.querySelector('ul').children[0];
		var grandchild1LiEntry = grandchild1Li.querySelector('p');
		var grandchild1LiDeleteButton = grandchild1Li.children.namedItem('delete');

		eq(todoLi1DeleteSelectedChildrenButton, null);
		eq(child1LiDeleteSelectedChildrenButton, null);
		eq(child1LiEntry.classList.contains('faded-deleted'), false);
		eq(child2LiEntry.classList.contains('faded-deleted'), false);
		eq(grandchild1LiEntry.classList.contains('faded-deleted'), false);
		eq(child1.deleted, false);
		eq(child2.deleted, false);
		eq(grandchild1.deleted, false);
		eq(child1LiDeleteButton.textContent, 'Delete');
		eq(child2LiDeleteButton.textContent, 'Delete');
		eq(grandchild1LiDeleteButton.textContent, 'Delete');

		todoLi1SelectChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');

		eq(todoLi1DeleteSelectedChildrenButton.disabled, false);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');

		todoLi1DeleteSelectedChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		child1Li = todoLi1.querySelector('ul').children[0];
		child1LiEntry = child1Li.querySelector('p');
		child1LiDeleteButton = child1Li.children.namedItem('delete');
		child1LiDeleteSelectedChildrenButton = child1Li.children.namedItem('deleteSelectedChildren');
		child2Li = todoLi1.querySelector('ul').children[1];
		child2LiEntry = child2Li.querySelector('p');
		child2LiDeleteButton = child2Li.children.namedItem('delete');
		grandchild1Li = child1Li.querySelector('ul').children[0];
		grandchild1LiEntry = grandchild1Li.querySelector('p');
		grandchild1LiDeleteButton = grandchild1Li.children.namedItem('delete');

		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Undelete selected children');

		eq(child1LiDeleteSelectedChildrenButton, null);
		eq(child1LiEntry.classList.contains('faded-deleted'), true);
		eq(child2LiEntry.classList.contains('faded-deleted'), true);
		eq(grandchild1LiEntry.classList.contains('faded-deleted'), true);
		eq(child1.deleted, true);
		eq(child2.deleted, true);
		eq(grandchild1.deleted, true);
		eq(child1LiDeleteButton.textContent, 'Undelete');
		eq(child2LiDeleteButton.textContent, 'Undelete');
		eq(grandchild1LiDeleteButton.textContent, 'Undelete');

		todoLi1DeleteSelectedChildrenButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		child1Li = todoLi1.querySelector('ul').children[0];
		child1LiEntry = child1Li.querySelector('p');
		child1LiDeleteButton = child1Li.children.namedItem('delete');
		child1LiDeleteSelectedChildrenButton = child1Li.children.namedItem('deleteSelectedChildren');
		child2Li = todoLi1.querySelector('ul').children[1];
		child2LiEntry = child2Li.querySelector('p');
		child2LiDeleteButton = child2Li.children.namedItem('delete');
		grandchild1Li = child1Li.querySelector('ul').children[0];
		grandchild1LiEntry = grandchild1Li.querySelector('p');
		grandchild1LiDeleteButton = grandchild1Li.children.namedItem('delete');

		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');

		eq(child1LiDeleteSelectedChildrenButton, null);
		eq(child1LiEntry.classList.contains('faded-deleted'), false);
		eq(child2LiEntry.classList.contains('faded-deleted'), false);
		eq(grandchild1LiEntry.classList.contains('faded-deleted'), false);
		eq(child1.deleted, false);
		eq(child2.deleted, false);
		eq(grandchild1.deleted, false);
		eq(child1LiDeleteButton.textContent, 'Delete');
		eq(child2LiDeleteButton.textContent, 'Delete');
		eq(grandchild1LiDeleteButton.textContent, 'Delete');
	},
	"Section: Actions bar -- Selection": function() {
	},
	"The header actions bar should have a 'selectAll' button to select all displayed todos.": function() {
		eq(selectAllButton.nodeName, 'BUTTON');
		eq(selectAllButton.name, 'selectAll');
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.parentElement, actionsBar);
	},
	"The selectAll button should be enabled if there are any todos displayed but otherwise disabled.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		startTestApp();

		eq(selectAllButton.disabled, false);

		todo1.markDeleted(true);

		renderTodolist();

		eq(selectAllButton.disabled, true);
	},
	"If all todos are in select mode, selectAll button text should be 'Unselect all'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markSelectMode(true);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		todo2.markSelectMode(true);
		insertTodo(todos, todo2);

		startTestApp();

		eq(selectAllButton.textContent, 'Unselect all');
	},
	"If all top-level todos are filtered-out parents, use the next layer of todos when setting 'Unselect all'.": function() {
		// Identifies a bug whereby selectAllButton reads 'Select all' even when all todos displayed are selected.
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		child2 = new Todo('Child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		eq(showDeletedButton.textContent, 'Deleted');

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		todoLi1SelectChildrenButton.click();

		eq(selectAllButton.textContent, 'Select all');

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');

		todoLi1DeleteButton.click();

		eq(todo1.filteredOutParentOfFilteredIn, true);
		eq(selectAllButton.textContent, 'Unselect all');

		showDeletedButton.click();

		eq(todo1.filteredOutParentOfFilteredIn, false);
		eq(selectAllButton.textContent, 'Select all');
	}, 
	"Otherwise selectAll button text should be 'Select all'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		startTestApp();

		eq(selectAllButton.textContent, 'Select all');

		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		child1.markSelectMode(true);

		renderTodolist();

		eq(selectAllButton.textContent, 'Select all');
	},
	"Clicking selectAll button should toggle selectMode on all todos, including nested todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		child1.markCollapsed(true);
		child2 = new Todo('Child 2');
		child2.markDeleted(true);
		todo1.addChild(child1);
		todo1.addChild(child2);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		startTestApp();

		eq(todo1.selectMode, false);
		eq(todo2.selectMode, false);
		eq(child1.selectMode, false);
		eq(child2.selectMode, false);
		eq(grandchild1.selectMode, false);

		eq(selectAllButton.textContent, 'Select all');

		selectAllButton.click();

		eq(todo1.selectMode, true);
		eq(todo2.selectMode, true);
		eq(child1.selectMode, true);
		eq(child2.selectMode, true);		// even though it is filtered out
		eq(grandchild1.selectMode, true);	// even though it is hidden

		eq(selectAllButton.textContent, 'Unselect all');

		selectAllButton.click();

		eq(todo1.selectMode, false);
		eq(todo2.selectMode, false);
		eq(child1.selectMode, false);
		eq(child2.selectMode, false);
		eq(grandchild1.selectMode, false);
	},
	"Clicking selectAll button should toggle select on all displayed (filtered in and not hidden) nested todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		child1.markCollapsed(true);
		child2 = new Todo('Child 2');
		child2.markDeleted(true);
		todo1.addChild(child1);
		todo1.addChild(child2);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		startTestApp();

		eq(todo1.selected, false);
		eq(todo2.selected, false);
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(grandchild1.selected, false);

		eq(selectAllButton.textContent, 'Select all');

		selectAllButton.click();

		eq(todo1.selected, true);
		eq(todo2.selected, true);
		eq(child1.selected, true);
		eq(child2.selected, false);			// because it is filtered out
		eq(grandchild1.selected, false);	// because it is hidden

		eq(selectAllButton.textContent, 'Unselect all');

		selectAllButton.click();

		eq(todo1.selected, false);
		eq(todo2.selected, false);
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(grandchild1.selected, false);
	},
	"Clicking selectAll button should re-render todoLis.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		startTestApp();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi2 = todolist.children[0].children[1];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi2SelectButton = todoLi2.children.namedItem('select');
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi2Entry = todoLi2.querySelector('p');
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi1Entry = childLi1.querySelector('p');

		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.disabled, true);
		eq(todoLi2SelectButton.disabled, true);
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todoLi2Entry.classList.contains('highlighted'), false);
		eq(childLi1Entry.classList.contains('highlighted'), false);

		eq(selectAllButton.textContent, 'Select all');

		selectAllButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi1SelectButton = todoLi1.children.namedItem('select');
		todoLi2SelectButton = todoLi2.children.namedItem('select');
		todoLi1Entry = todoLi1.querySelector('p');
		todoLi2Entry = todoLi2.querySelector('p');
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1SelectButton = childLi1.children.namedItem('select');
		childLi1Entry = childLi1.querySelector('p');

		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.disabled, false);
		eq(todoLi2SelectButton.disabled, false);
		eq(childLi1SelectButton.disabled, false);
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi2Entry.classList.contains('highlighted'), true);
		eq(childLi1Entry.classList.contains('highlighted'), true);

		eq(selectAllButton.textContent, 'Unselect all');

		selectAllButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi1SelectButton = todoLi1.children.namedItem('select');
		todoLi2SelectButton = todoLi2.children.namedItem('select');
		todoLi1Entry = todoLi1.querySelector('p');
		todoLi2Entry = todoLi2.querySelector('p');
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1SelectButton = childLi1.children.namedItem('select');
		childLi1Entry = childLi1.querySelector('p');

		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.disabled, true);
		eq(todoLi2SelectButton.disabled, true);
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todoLi2Entry.classList.contains('highlighted'), false);
		eq(childLi1Entry.classList.contains('highlighted'), false);
	},
	"If all todos become unselected, all should set selectMode false.": function() {
		// Case: clicked 'Unselect' button unselects last todo
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		child2 = new Todo('Child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		startTestApp();

		selectAllButton.click();

		eq(todo1.selected, true);
		eq(child1.selected, true);
		eq(child2.selected, true);

		eq(todo1.selectMode, true);
		eq(child1.selectMode, true);
		eq(child2.selectMode, true);

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');

		todoLi1SelectButton.click();

		eq(todo1.selected, false);
		eq(child1.selected, true);
		eq(child2.selected, true);

		eq(todo1.selectMode, true);
		eq(child1.selectMode, true);
		eq(child2.selectMode, true);

		todoLi1 = todolist.children[0].children[0];
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1SelectButton = childLi1.children.namedItem('select');

		childLi1SelectButton.click();

		eq(todo1.selected, false);
		eq(child1.selected, false);
		eq(child2.selected, true);

		eq(todo1.selectMode, true);
		eq(child1.selectMode, true);
		eq(child2.selectMode, true);

		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		var childLi2 = todoLi1Ul.children[1];
		var childLi2SelectButton = childLi2.children.namedItem('select');

		childLi2SelectButton.click();

		eq(todo1.selected, false);
		eq(child1.selected, false);
		eq(child2.selected, false);

		eq(todo1.selectMode, false);
		eq(child1.selectMode, false);
		eq(child2.selectMode, false);

		// Case: clicked 'Unselect children' button unselects last todo

		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		var childLi1AddChildButton = childLi1.children.namedItem('addChild');

		childLi1AddChildButton.click();

		selectAllButton.click();

		var grandchild1 = todo1.children[0].children[0];

		eq(todo1.selected, true);
		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(grandchild1.selected, true);

		eq(todo1.selectMode, true);
		eq(child1.selectMode, true);
		eq(child2.selectMode, true);
		eq(grandchild1.selectMode, true);

		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi2 = todoLi1Ul.children[1];
		childLi2SelectButton = childLi2.children.namedItem('select');

		childLi2SelectButton.click();	// Unselect
		
		eq(todo1.selected, true);
		eq(child1.selected, true);
		eq(child2.selected, false);
		eq(grandchild1.selected, true);

		eq(todo1.selectMode, true);
		eq(child1.selectMode, true);
		eq(child2.selectMode, true);
		eq(grandchild1.selectMode, true);

		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1SelectButton = childLi1.children.namedItem('select');

		childLi1SelectButton.click();	// Unselect
		
		eq(todo1.selected, true);
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(grandchild1.selected, true);

		eq(todo1.selectMode, true);
		eq(child1.selectMode, true);
		eq(child2.selectMode, true);
		eq(grandchild1.selectMode, true);

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectButton = todoLi1.children.namedItem('select');

		todoLi1SelectButton.click();

		eq(todo1.selected, false);
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(grandchild1.selected, true);

		eq(todo1.selectMode, true);
		eq(child1.selectMode, true);
		eq(child2.selectMode, true);
		eq(grandchild1.selectMode, true);

		todoLi1 = todolist.children[0].children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');

		childLi1SelectChildrenButton.click();	// Unselect children

		eq(todo1.selected, false);
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(grandchild1.selected, false);

		eq(todo1.selectMode, false);
		eq(child1.selectMode, false);
		eq(child2.selectMode, false);
		eq(grandchild1.selectMode, false);
	},
	"The header actions bar should have a 'completeSelected' button to mark selected todos completed.": function() {
		eq(completeSelectedButton.nodeName, 'BUTTON');
		eq(completeSelectedButton.name, 'completeSelected');
		eq(completeSelectedButton.innerText, 'Complete selected');
		eq(completeSelectedButton.parentElement, actionsBar);
	},
	"The completeSelected button should be disabled unless there are top-level todos in select mode.": function() {
		// Same condition as setting selectAll button text to 'Unselect all'
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		insertTodo(todos, todo1);

		startTestApp();

		eq(completeSelectedButton.disabled, true);

		grandchild1.markSelected(true);
		grandchild1.markSelectMode(true);

		renderTodolist();

		eq(completeSelectedButton.disabled, true);

		child1.markSelected(true);
		child1.markSelectMode(true);

		renderTodolist();

		eq(completeSelectedButton.disabled, true);

		todo1.markSelectMode(true);

		renderTodolist();

		eq(completeSelectedButton.disabled, false);
	},
	"If all selected filtered-in todos are completed, completeSelected button text should be 'Uncomplete selected'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		insertTodo(todos, todo1);

		startTestApp();

		selectAllButton.click();

		eq(todo1.stage, 'active');
		eq(child1.stage, 'active');
		eq(grandchild1.stage, 'active');
		eq(completeSelectedButton.textContent === 'Uncomplete selected', false);

		todo1.setStage('completed');
		child1.setStage('completed');

		renderTodolist();

		eq(todo1.stage, 'completed');
		eq(child1.stage, 'completed');
		eq(grandchild1.stage, 'active');
		eq(completeSelectedButton.textContent === 'Uncomplete selected', false);

		grandchild1.setStage('completed');

		renderTodolist();

		eq(todo1.stage, 'completed');
		eq(child1.stage, 'completed');
		eq(grandchild1.stage, 'completed');
		eq(completeSelectedButton.textContent === 'Uncomplete selected', true);
	},
	"If all selected filtered-in todos are not completed, completeSelected button text should be 'Complete selected'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		insertTodo(todos, todo1);

		startTestApp();

		selectAllButton.click();

		eq(todo1.stage, 'active');
		eq(child1.stage, 'active');
		eq(grandchild1.stage, 'active');
		eq(completeSelectedButton.textContent === 'Complete selected', true);

		todo1.setStage('completed');
		child1.setStage('completed');

		renderTodolist();

		eq(todo1.stage, 'completed');
		eq(child1.stage, 'completed');
		eq(grandchild1.stage, 'active');
		eq(completeSelectedButton.textContent === 'Complete selected', true);

		grandchild1.setStage('completed');

		renderTodolist();

		eq(todo1.stage, 'completed');
		eq(child1.stage, 'completed');
		eq(grandchild1.stage, 'completed');
		eq(completeSelectedButton.textContent === 'Complete selected', false);
	},
	"Clicking completeSelected button should toggle todo stage 'complete' or 'active' for all filtered-in selected todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);

		startTestApp();

		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, true);
		eq(todo1.selected, false);
		eq(child1.selected, false);
		eq(todo2.selected, false);
		eq(todo3.selected, false);
		eq(todo1.stage, 'active');
		eq(child1.stage, 'active');
		eq(todo2.stage, 'active');
		eq(todo3.stage, 'active');

		var todoLi3 = todolist.children[0].children[2];
		var todoLi3DeleteButton = todoLi3.children.namedItem('delete');

		todoLi3DeleteButton.click();	// Delete

		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, false);
		eq(todo1.selected, false);
		eq(child1.selected, false);
		eq(todo2.selected, false);
		eq(todo3.selected, false);
		eq(todo1.stage, 'active');
		eq(child1.stage, 'active');
		eq(todo2.stage, 'active');
		eq(todo3.stage, 'active');
		eq(todo3.deleted, true);

		selectAllButton.click();

		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, false);
		eq(todo1.selected, true);
		eq(child1.selected, true);
		eq(todo2.selected, true);
		eq(todo3.selected, false);
		eq(todo1.stage, 'active');
		eq(child1.stage, 'active');
		eq(todo2.stage, 'active');
		eq(todo3.stage, 'active');

		var todoLi2 = todolist.children[0].children[1];
		var todoLi2SelectButton = todoLi2.children.namedItem('select');

		todoLi2SelectButton.click();	// Unselect

		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, false);
		eq(todo1.selected, true);
		eq(child1.selected, true);
		eq(todo2.selected, false);
		eq(todo3.selected, false);
		eq(todo1.stage, 'active');
		eq(child1.stage, 'active');
		eq(todo2.stage, 'active');
		eq(todo3.stage, 'active');

		// It should not mark todos that are filtered out 
		// It should not mark todos that are not selected

		completeSelectedButton.click();	// Complete selected
		
		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, false);
		eq(todo1.selected, true);
		eq(child1.selected, true);
		eq(todo2.selected, false);
		eq(todo3.selected, false);
		eq(todo1.stage, 'completed');
		eq(child1.stage, 'completed');
		eq(todo2.stage, 'active');
		eq(todo3.stage, 'active');

		completeSelectedButton.click();	// Uncomplete selected
		
		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, false);
		eq(todo1.selected, true);
		eq(child1.selected, true);
		eq(todo2.selected, false);
		eq(todo3.selected, false);
		eq(todo1.stage, 'active');
		eq(child1.stage, 'active');
		eq(todo2.stage, 'active');
		eq(todo3.stage, 'active');
	},
	"Clicking completeSelected button should re-render todoLis.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		startTestApp();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi2 = todolist.children[0].children[1];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi2CompleteButton = todoLi2.children.namedItem('complete');
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi2Entry = todoLi2.querySelector('p');
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1CompleteButton = childLi1.children.namedItem('complete');
		var childLi1Entry = childLi1.querySelector('p');

		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.disabled, false);
		eq(todoLi2CompleteButton.disabled, false);
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todoLi2Entry.classList.contains('highlighted'), false);
		eq(childLi1Entry.classList.contains('highlighted'), false);
		eq(todoLi1Entry.classList.contains('struck-completed'), false);
		eq(todoLi2Entry.classList.contains('struck-completed'), false);
		eq(childLi1Entry.classList.contains('struck-completed'), false);

		selectAllButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		todoLi2CompleteButton = todoLi2.children.namedItem('complete');
		todoLi1Entry = todoLi1.querySelector('p');
		todoLi2Entry = todoLi2.querySelector('p');
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1CompleteButton = childLi1.children.namedItem('complete');
		childLi1Entry = childLi1.querySelector('p');

		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.disabled, true);
		eq(todoLi2CompleteButton.disabled, true);
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi2Entry.classList.contains('highlighted'), true);
		eq(childLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi1Entry.classList.contains('struck-completed'), false);
		eq(todoLi2Entry.classList.contains('struck-completed'), false);
		eq(childLi1Entry.classList.contains('struck-completed'), false);

		completeSelectedButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		todoLi2CompleteButton = todoLi2.children.namedItem('complete');
		todoLi1Entry = todoLi1.querySelector('p');
		todoLi2Entry = todoLi2.querySelector('p');
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1CompleteButton = childLi1.children.namedItem('complete');
		childLi1Entry = childLi1.querySelector('p');

		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todoLi2CompleteButton.textContent, 'Uncomplete');
		eq(childLi1CompleteButton.textContent, 'Uncomplete');
		eq(todoLi1CompleteButton.disabled, true);
		eq(todoLi2CompleteButton.disabled, true);
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi2Entry.classList.contains('highlighted'), true);
		eq(childLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi1Entry.classList.contains('struck-completed'), true);
		eq(todoLi2Entry.classList.contains('struck-completed'), true);
		eq(childLi1Entry.classList.contains('struck-completed'), true);

		completeSelectedButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		todoLi2CompleteButton = todoLi2.children.namedItem('complete');
		todoLi1Entry = todoLi1.querySelector('p');
		todoLi2Entry = todoLi2.querySelector('p');
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1CompleteButton = childLi1.children.namedItem('complete');
		childLi1Entry = childLi1.querySelector('p');

		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.disabled, true);
		eq(todoLi2CompleteButton.disabled, true);
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi2Entry.classList.contains('highlighted'), true);
		eq(childLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi1Entry.classList.contains('struck-completed'), false);
		eq(todoLi2Entry.classList.contains('struck-completed'), false);
		eq(childLi1Entry.classList.contains('struck-completed'), false);
	},
	"The header actions bar should have a 'deleteSelected' button to mark selected todos deleted.": function() {
		eq(deleteSelectedButton.nodeName, 'BUTTON');
		eq(deleteSelectedButton.name, 'deleteSelected');
		eq(deleteSelectedButton.innerText, 'Delete selected');
		eq(deleteSelectedButton.parentElement, actionsBar);
	},
	"The deleteSelected button should be disabled unless there are top-level todos in select mode.": function() {
		// Same condition as setting selectAll button text to 'Unselect all'
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		insertTodo(todos, todo1);

		startTestApp();

		eq(deleteSelectedButton.disabled, true);

		grandchild1.markSelected(true);
		grandchild1.markSelectMode(true);

		renderTodolist();

		eq(deleteSelectedButton.disabled, true);

		child1.markSelected(true);
		child1.markSelectMode(true);

		renderTodolist();

		eq(deleteSelectedButton.disabled, true);

		todo1.markSelectMode(true);

		renderTodolist();

		eq(deleteSelectedButton.disabled, false);
	},
	"If all selected filtered-in todos are deleted, deleteSelected button text should be 'Undelete selected'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		insertTodo(todos, todo1);

		startTestApp();

		showDeletedButton.click();

		renderTodolist();

		selectAllButton.click();

		eq(todo1.deleted, false);
		eq(child1.deleted, false);
		eq(grandchild1.deleted, false);
		eq(deleteSelectedButton.textContent === 'Undelete selected', false);

		todo1.markDeleted(true);
		child1.markDeleted(true);

		renderTodolist();

		eq(todo1.deleted, true);
		eq(child1.deleted, true);
		eq(grandchild1.deleted, false);
		eq(deleteSelectedButton.textContent === 'Undelete selected', false);

		grandchild1.markDeleted(true);

		renderTodolist();

		eq(todo1.deleted, true);
		eq(child1.deleted, true);
		eq(grandchild1.deleted, true);
		eq(deleteSelectedButton.textContent === 'Undelete selected', true);
	},
	"If not all selected filtered-in todos are deleted, deleteSelected button text should be 'Delete selected'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		insertTodo(todos, todo1);

		startTestApp();

		showDeletedButton.click();

		renderTodolist();

		selectAllButton.click();

		eq(todo1.deleted, false);
		eq(child1.deleted, false);
		eq(grandchild1.deleted, false);
		eq(deleteSelectedButton.textContent === 'Delete selected', true);

		todo1.markDeleted(true);
		child1.markDeleted(true);

		renderTodolist();

		eq(todo1.deleted, true);
		eq(child1.deleted, true);
		eq(grandchild1.deleted, false);
		eq(deleteSelectedButton.textContent === 'Delete selected', true);

		grandchild1.markDeleted(true);

		renderTodolist();

		eq(todo1.deleted, true);
		eq(child1.deleted, true);
		eq(grandchild1.deleted, true);
		eq(deleteSelectedButton.textContent === 'Delete selected', false);
	},
	"Clicking deleteSelected button should toggle todo deleted or not deleted for all filtered-in selected todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);

		startTestApp();

		showDeletedButton.click();		// Deleted --> √ Deleted to filter in deleted todos
		showCompletedButton.click();	// √ Completed --> Completed to filter out completed todos

		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, true);
		eq(todo1.selected, false);
		eq(child1.selected, false);
		eq(todo2.selected, false);
		eq(todo3.selected, false);
		eq(todo1.deleted, false);
		eq(child1.deleted, false);
		eq(todo2.deleted, false);
		eq(todo3.deleted, false);

		var todoLi3 = todolist.children[0].children[2];
		var todoLi3CompleteButton = todoLi3.children.namedItem('complete');

		todoLi3CompleteButton.click();	// Complete

		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, false);
		eq(todo1.selected, false);
		eq(child1.selected, false);
		eq(todo2.selected, false);
		eq(todo3.selected, false);
		eq(todo1.deleted, false);
		eq(child1.deleted, false);
		eq(todo2.deleted, false);
		eq(todo3.deleted, false);

		selectAllButton.click();

		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, false);
		eq(todo1.selected, true);
		eq(child1.selected, true);
		eq(todo2.selected, true);
		eq(todo3.selected, false);
		eq(todo1.deleted, false);
		eq(child1.deleted, false);
		eq(todo2.deleted, false);
		eq(todo3.deleted, false);

		var todoLi2 = todolist.children[0].children[1];
		var todoLi2SelectButton = todoLi2.children.namedItem('select');

		todoLi2SelectButton.click();	// Unselect

		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, false);
		eq(todo1.selected, true);
		eq(child1.selected, true);
		eq(todo2.selected, false);
		eq(todo3.selected, false);
		eq(todo1.deleted, false);
		eq(child1.deleted, false);
		eq(todo2.deleted, false);
		eq(todo3.deleted, false);

		// It should not mark todos that are filtered out 
		// It should not mark todos that are not selected

		deleteSelectedButton.click();	// Delete selected

		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, false);
		eq(todo1.selected, true);
		eq(child1.selected, true);
		eq(todo2.selected, false);
		eq(todo3.selected, false);
		eq(todo1.deleted, true);
		eq(child1.deleted, true);
		eq(todo2.deleted, false);	// false because it is unselected 
		eq(todo3.deleted, false);	// false because it is filtered out

		deleteSelectedButton.click();	// Undelete selected

		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, false);
		eq(todo1.selected, true);
		eq(child1.selected, true);
		eq(todo2.selected, false);
		eq(todo3.selected, false);
		eq(todo1.deleted, false);
		eq(child1.deleted, false);
		eq(todo2.deleted, false);
		eq(todo3.deleted, false);
	},
	"Clicking deleteSelected button should re-render todoLis.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		startTestApp(); 

		showDeletedButton.click();

		renderTodolist();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi2 = todolist.children[0].children[1];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		var todoLi2DeleteButton = todoLi2.children.namedItem('delete');
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi2Entry = todoLi2.querySelector('p');
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1DeleteButton = childLi1.children.namedItem('delete');
		var childLi1Entry = childLi1.querySelector('p');

		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.disabled, false);
		eq(todoLi2DeleteButton.disabled, false);
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todoLi2Entry.classList.contains('highlighted'), false);
		eq(childLi1Entry.classList.contains('highlighted'), false);
		eq(todoLi1Entry.classList.contains('faded-deleted'), false);
		eq(todoLi2Entry.classList.contains('faded-deleted'), false);
		eq(childLi1Entry.classList.contains('faded-deleted'), false);

		selectAllButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		todoLi2DeleteButton = todoLi2.children.namedItem('delete');
		todoLi1Entry = todoLi1.querySelector('p');
		todoLi2Entry = todoLi2.querySelector('p');
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1DeleteButton = childLi1.children.namedItem('delete');
		childLi1Entry = childLi1.querySelector('p');

		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.disabled, true);
		eq(todoLi2DeleteButton.disabled, true);
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi2Entry.classList.contains('highlighted'), true);
		eq(childLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi1Entry.classList.contains('faded-deleted'), false);
		eq(todoLi2Entry.classList.contains('faded-deleted'), false);
		eq(childLi1Entry.classList.contains('faded-deleted'), false);

		deleteSelectedButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		todoLi2DeleteButton = todoLi2.children.namedItem('delete');
		todoLi1Entry = todoLi1.querySelector('p');
		todoLi2Entry = todoLi2.querySelector('p');
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1DeleteButton = childLi1.children.namedItem('delete');
		childLi1Entry = childLi1.querySelector('p');

		eq(todoLi1DeleteButton.textContent, 'Undelete');
		eq(todoLi2DeleteButton.textContent, 'Undelete');
		eq(childLi1DeleteButton.textContent, 'Undelete');
		eq(todoLi1DeleteButton.disabled, true);
		eq(todoLi2DeleteButton.disabled, true);
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi2Entry.classList.contains('highlighted'), true);
		eq(childLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi1Entry.classList.contains('faded-deleted'), true);
		eq(todoLi2Entry.classList.contains('faded-deleted'), true);
		eq(childLi1Entry.classList.contains('faded-deleted'), true);

		deleteSelectedButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		todoLi2DeleteButton = todoLi2.children.namedItem('delete');
		todoLi1Entry = todoLi1.querySelector('p');
		todoLi2Entry = todoLi2.querySelector('p');
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi1DeleteButton = childLi1.children.namedItem('delete');
		childLi1Entry = childLi1.querySelector('p');

		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.disabled, true);
		eq(todoLi2DeleteButton.disabled, true);
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi2Entry.classList.contains('highlighted'), true);
		eq(childLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi1Entry.classList.contains('faded-deleted'), false);
		eq(todoLi2Entry.classList.contains('faded-deleted'), false);
		eq(childLi1Entry.classList.contains('faded-deleted'), false);
	},
	"Section: Actions bar -- filters": function() {
		// Choose to display todos based on their stage in life (active or completed) and whether or not they are deleted.
	},
	"The header actions bar should have a showActive button to toggle the display of active todos.": function() {
		todos = [];
		startTestApp();		// restore defaults

		eq(showActiveButton.nodeName, 'BUTTON');
		eq(showActiveButton.name, 'showActive');
		eq(showActiveButton.textContent, '√ Active');
		eq(showActiveButton.parentElement, actionsBar);
	},
	"The header actions bar should have a showCompleted button to toggle the display of completed todos.": function() {
		eq(showCompletedButton.nodeName, 'BUTTON');
		eq(showCompletedButton.name, 'showCompleted');
		eq(showCompletedButton.textContent, '√ Completed');
		eq(showCompletedButton.parentElement, actionsBar);
	},
	"The header actions bar should have a showDeleted button to toggle the display of deleted todos.": function() {
		eq(showDeletedButton.nodeName, 'BUTTON');
		eq(showDeletedButton.name, 'showDeleted');
		eq(showDeletedButton.textContent, 'Deleted');
		eq(showDeletedButton.parentElement, actionsBar);
	},
	"The app should have a way to generate a set of filter tags from showActive, showCompleted, and showDeleted button text.": function() {
		// Tests generateFilterSet()
		
		todos = [];
		startTestApp();		// restore defaults

		// Case: default set at startup
		eq(showActiveButton.textContent, '√ Active');
		eq(showCompletedButton.textContent, '√ Completed');
		eq(showDeletedButton.textContent, 'Deleted');

		var set1 = generateFilterSet();

		eq(set1.size, 2);
		eq(set1.has('#active'), true);
		eq(set1.has('#completed'), true);
		eq(set1.has('#deleted'), false);

		// Case: none set
		showActiveButton.textContent = 'Active';
		showCompletedButton.textContent = 'Completed';
		showDeletedButton.textContent = 'Deleted';

		var set2 = generateFilterSet();

		eq(set2.size, 0);
		eq(set2.has('#active'), false);
		eq(set2.has('#completed'), false);
		eq(set2.has('#deleted'), false);

		// Case: all set
		showActiveButton.textContent = '√ Active';
		showCompletedButton.textContent = '√ Completed';
		showDeletedButton.textContent = '√ Deleted';

		var set3 = generateFilterSet();

		eq(set3.size, 3);
		eq(set3.has('#active'), true);
		eq(set3.has('#completed'), true);
		eq(set3.has('#deleted'), true);

		// Case: active only set
		showActiveButton.textContent = '√ Active';
		showCompletedButton.textContent = 'Completed';
		showDeletedButton.textContent = 'Deleted';

		var set4 = generateFilterSet();

		eq(set4.size, 1);
		eq(set4.has('#active'), true);
		eq(set4.has('#completed'), false);
		eq(set4.has('#deleted'), false);

		// Case: completed only set
		showActiveButton.textContent = '√Active';
		showCompletedButton.textContent = '√ Completed';
		showDeletedButton.textContent = 'Deleted';

		var set5 = generateFilterSet();

		eq(set5.size, 1);
		eq(set5.has('#active'), false);
		eq(set5.has('#completed'), true);
		eq(set5.has('#deleted'), false);

		// Case: deleted only set
		showActiveButton.textContent = 'Active';
		showCompletedButton.textContent = 'Completed';
		showDeletedButton.textContent = '√ Deleted';

		var set6 = generateFilterSet();

		eq(set6.size, 1);
		eq(set6.has('#active'), false);
		eq(set6.has('#completed'), false);
		eq(set6.has('#deleted'), true);

		// Case: two set, active and deleted
		showActiveButton.textContent = '√ Active';
		showCompletedButton.textContent = 'Completed';
		showDeletedButton.textContent = '√ Deleted';

		var set7 = generateFilterSet();

		eq(set7.size, 2);
		eq(set7.has('#active'), true);
		eq(set7.has('#completed'), false);
		eq(set7.has('#deleted'), true);

		// Case: two set, active and deleted
		showActiveButton.textContent = '√ Active';
		showCompletedButton.textContent = 'Completed';
		showDeletedButton.textContent = '√ Deleted';

		var set7 = generateFilterSet();

		eq(set7.size, 2);
		eq(set7.has('#active'), true);
		eq(set7.has('#completed'), false);
		eq(set7.has('#deleted'), true);

	},
	"On startup, the showActive button text should be '√ Active' and todos with stage 'active' should be displayed.": function() {
		todos = [];
		todo1 = new Todo('Item active');
		insertTodo(todos, todo1);

		startTestApp();
		
		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];

		eq(showActiveButton.textContent, '√ Active');
		eq(todo1.stage, 'active');
	},
	"On startup, the showCompleted button text should be '√ Completed' and todos with stage 'completed' should be displayed.": function() {
		todos = [];
		todo1 = new Todo('Item active');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item completed');
		todo2.setStage('completed');
		insertTodo(todos, todo2);

		startTestApp();
		
		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];

		eq(showActiveButton.textContent, '√ Active');
		eq(todo1.stage, 'active');
		eq(todoLi1, todoUl.children[0]);

		eq(showCompletedButton.textContent, '√ Completed');
		eq(todo2.stage, 'completed');
		eq(todoLi2, todoUl.children[1]);
	},
	"On startup, the showDeleted button text should be 'Deleted' and deleted todos should not be displayed.": function() {
		todos = [];
		todo1 = new Todo('Item active');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item completed');
		todo2.setStage('completed');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item deleted');
		todo3.markDeleted(true);
		insertTodo(todos, todo3);

		startTestApp();
		
		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi3 = todoUl.children[2];

		eq(showActiveButton.textContent, '√ Active');
		eq(todo1.stage, 'active');
		eq(todoLi1, todoUl.children[0]);

		eq(showCompletedButton.textContent, '√ Completed');
		eq(todo2.stage === 'active', false);
		eq(todo2.stage, 'completed');
		eq(todoLi2, todoUl.children[1]);

		eq(showDeletedButton.textContent, 'Deleted');
		eq(todoLi3, undefined);							// todoLi3 not created
	},
	"Clicking the showActive button should toggle button text and re-render todolist.": function() {
		todos = [];
		todo1 = new Todo('Item 1 active');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2 completed');
		todo2.setStage('completed');
		todo2Child = new Todo('Item 2 child active');
		todo2.addChild(todo2Child);
		todo2Grandchild = new Todo('Item 2 grandchild completed');
		todo2Grandchild.setStage('completed');
		todo2Child.addChild(todo2Grandchild);
		insertTodo(todos, todo2);

		startTestApp();

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(showActiveButton.textContent, '√ Active');

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi.id, todo2Grandchild.id);

		showActiveButton.click();

		eq(showActiveButton.textContent, 'Active');

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi = todoLi1Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];
		todoLi2 = todoUl.children[1];

		eq(todoUl.children.length, 1);
		eq(todoLi1.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi.id, todo2Grandchild.id);
		eq(todoLi2, undefined);

		showActiveButton.click();

		eq(showActiveButton.textContent, '√ Active');

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi.id, todo2Grandchild.id);
	},
	"If showActive button is 'Active', addTodo button and todoLi addSibling and addChild buttons should be disabled.": function() {
		// Because by definition a new todo is active
		todos = [];
		startTestApp();

		eq(addTodoButton.disabled, false);

		addTodoButton.click();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');

		todoLi1CompleteButton.click();
		showActiveButton.click();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1AddSiblingButton = todoLi1.children.namedItem('addSibling');
		var todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		eq(addTodoButton.disabled, true);
		eq(todoLi1AddSiblingButton.disabled, true);
		eq(todoLi1AddChildButton.disabled, true);

		showActiveButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1AddSiblingButton = todoLi1.children.namedItem('addSibling');
		todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		eq(addTodoButton.disabled, false);
		eq(todoLi1AddSiblingButton.disabled, false);
		eq(todoLi1AddChildButton.disabled, false);
	},
	"Clicking the showCompleted button should toggle button text and re-render todolist.": function() {
		todos = [];
		todo1 = new Todo('Item 1 active');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2 completed');
		todo2.setStage('completed');
		todo2Child = new Todo('Item 2 child active');
		todo2.addChild(todo2Child);
		todo2Grandchild = new Todo('Item 2 grandchild completed');
		todo2Grandchild.setStage('completed');
		todo2Child.addChild(todo2Grandchild);
		insertTodo(todos, todo2);

		startTestApp();

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(showCompletedButton.textContent, '√ Completed');

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi.id, todo2Grandchild.id);

		showCompletedButton.click();

		eq(showCompletedButton.textContent, 'Completed');

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi, undefined);

		showCompletedButton.click();

		eq(showCompletedButton.textContent, '√ Completed');

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi.id, todo2Grandchild.id);
	},
	"Clicking the showDeleted button should toggle button text and re-render todolist.": function() {
		todos = [];
		todo1 = new Todo('Item 1 active');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2 deleted');
		todo2.markDeleted(true);
		todo2Child = new Todo('Item 2 child active');
		todo2.addChild(todo2Child);
		todo2Grandchild = new Todo('Item 2 grandchild deleted');
		todo2Grandchild.markDeleted(true);
		todo2Child.addChild(todo2Grandchild);
		insertTodo(todos, todo2);

		startTestApp();

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(showDeletedButton.textContent, 'Deleted');

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi, undefined);

		showDeletedButton.click();

		eq(showDeletedButton.textContent, '√ Deleted');

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi.id, todo2Grandchild.id);

		showDeletedButton.click();

		eq(showDeletedButton.textContent, 'Deleted');

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi, undefined);
	},
	"The app should blur actions bar buttons after they are clicked.": function() {
		// Because they aren't recreated like todoLi buttons, they stay highlighted unless deliberately blurred.

		// Turns out that this is deliberate behavior in Chrome. Safari and Firefox both unselect the buttons after
		// they are clicked.

		future();
	},
	"The app should display todos according to the filter settings.": function() {
		// There are three buttons: Active, Completed, and Deleted.
		// Each can be checked (meaning activated) or unchecked (meaning deactivated), giving eight combinations.
		// | √ Active | √ Completed | √ Deleted |	Show all todos
		// | √ Active |   Completed |   Deleted |	Show active todos that are not deleted
		// |   Active | √ Completed |   Deleted |	Show completed todos that are not deleted
		// |   Active |   Completed | √ Deleted |	Show deleted todos only regardless of lifecycle stage
		// | √ Active | √ Completed |   Deleted |	Show todos that are active or completed
		// | √ Active |   Completed | √ Deleted |	Show todos that are active or deleted (including deleted completed)
		// |   Active | √ Completed | √ Deleted |	Show todos that are completed or deleted (including deleted active)
		// |   Active |   Completed |   Deleted |	Show no todos
		// 
		// Active and Completed are mutually exclusive because they are lifecycle stages, but either can combine with Deleted.
		// Therefore, there are only four todo combinations to test:
		//		Active not deleted
		//		Active deleted
		//		Completed not deleted
		//		Completed deleted

		todos = [];
		todo1 = new Todo('1. Active not deleted');
		todo2 = new Todo('2. Active deleted');
		todo2.markDeleted(true);
		todo3 = new Todo('3. Completed not deleted');
		todo3.setStage('completed');
		todo4 = new Todo('4. Completed deleted');
		todo4.setStage('completed');
		todo4.markDeleted(true);
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);
		insertTodo(todos, todo3);
		insertTodo(todos, todo4);

		startTestApp();

		// | √ Active | √ Completed | √ Deleted |	Show all todos
		showDeletedButton.click();

		eq(todo1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, true);
		eq(todo4.filteredIn, true);

		// | √ Active |   Completed |   Deleted |	Show active todos that are not deleted
		showDeletedButton.click();
		showCompletedButton.click();

		eq(todo1.filteredIn, true);
		eq(todo2.filteredIn, false);
		eq(todo3.filteredIn, false);
		eq(todo4.filteredIn, false);

		// |   Active | √ Completed |   Deleted |	Show completed todos that are not deleted
		showActiveButton.click();
		showCompletedButton.click();

		eq(todo1.filteredIn, false);
		eq(todo2.filteredIn, false);
		eq(todo3.filteredIn, true);
		eq(todo4.filteredIn, false);

		// |   Active |   Completed | √ Deleted |	Show deleted todos only regardless of lifecycle stage
		showCompletedButton.click();
		showDeletedButton.click();

		eq(todo1.filteredIn, false);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, false);
		eq(todo4.filteredIn, true);

		// | √ Active | √ Completed |   Deleted |	Show todos that are active or completed
		showActiveButton.click();
		showCompletedButton.click();
		showDeletedButton.click();

		eq(todo1.filteredIn, true);
		eq(todo2.filteredIn, false);
		eq(todo3.filteredIn, true);
		eq(todo4.filteredIn, false);

		// | √ Active |   Completed | √ Deleted |	Show todos that are active or deleted (including deleted completed)
		showCompletedButton.click();
		showDeletedButton.click();

		eq(todo1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, false);
		eq(todo4.filteredIn, true);

		// |   Active | √ Completed | √ Deleted |	Show todos that are completed or deleted (including deleted active)
		showActiveButton.click();
		showCompletedButton.click();

		eq(todo1.filteredIn, false);
		eq(todo2.filteredIn, true);
		eq(todo3.filteredIn, true);
		eq(todo4.filteredIn, true);

		// |   Active |   Completed |   Deleted |	Show no todos
		showCompletedButton.click();
		showDeletedButton.click();

		eq(todo1.filteredIn, false);
		eq(todo2.filteredIn, false);
		eq(todo3.filteredIn, false);
		eq(todo4.filteredIn, false);
	},
	"Bug fix: unchecking '√ Active' should show completed and deleted children of an active parent.": function() {
		// markFilteredIn was not setting filteredIn true for active deleted todos when active was filtered out
		todos = [];
		todo1 = new Todo('Parent');
		child1 = new Todo('Child');
		child1.setStage('completed');
		grandchild1 = new Todo('Grandchild');
		grandchild1.markDeleted(true);
		todo1.addChild(child1);
		child1.addChild(grandchild1);
		insertTodo(todos, todo1);

		startTestApp();

		showDeletedButton.click();
		showActiveButton.click();

		eq(todo1.filteredOutParentOfFilteredIn, true);
		eq(child1.filteredIn, true);
		eq(grandchild1.filteredIn, true);
	},
	"Newly displayed todos should be put in select mode if any siblings are in select mode.": function() {
		// Fixed by putting all todos in select mode on selectChildren or selectAll click rather than just filtered-in todos.
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		child1.markDeleted(true);
		todo1.addChild(child1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);

		startTestApp();

		selectAllButton.click();

		eq(todo1.selectMode, true);

		showDeletedButton.click();

		eq(child1.selectMode, true);
		eq(selectAllButton.textContent, 'Unselect all');
	},
	"Newly displayed todos should be put in select mode if any ancestors are in select mode.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		todo2 = new Todo('Item 2');
		todo2.markDeleted(true);
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);

		startTestApp();

		selectAllButton.click();

		eq(todo1.selectMode, true);

		showDeletedButton.click();

		eq(todo2.selectMode, true);
		eq(selectAllButton.textContent, 'Unselect all');
	},
	"Section: Actions bar -- other buttons": function() {

	},
	"The header actions bar should have a 'purgeSelectedDeleted' button to expunge selected deleted todos permanently.": function() {
		eq(purgeSelectedDeletedButton.nodeName, 'BUTTON');
		eq(purgeSelectedDeletedButton.name, 'purgeSelectedDeleted');
		eq(purgeSelectedDeletedButton.disabled, true);
		eq(purgeSelectedDeletedButton.textContent, 'Purge selected deleted todos');
		eq(purgeSelectedDeletedButton.parentElement, actionsBar); 
	}, 
	"purgeSelectedDeletedButton should be disabled unless a todo is filtered-in, deleted and selected.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);

		startTestApp();

		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, true);
		eq(todo1.selected, false);
		eq(child1.selected, false);
		eq(todo2.selected, false);
		eq(todo1.deleted, false);
		eq(child1.deleted, false);
		eq(todo2.deleted, false);
		eq(purgeSelectedDeletedButton.disabled, true);

		showDeletedButton.click();							// Deleted --> √ Deleted
		showCompletedButton.click();						// √ Completed --> Completed
		
		var todoLi2 = todolist.children[0].children[1];
		var todoLi2CompleteButton = todoLi2.children.namedItem('complete');

		todoLi2CompleteButton.click();						// Complete

		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, false);
		eq(todo1.selected, false);
		eq(child1.selected, false);
		eq(todo2.selected, false);
		eq(todo1.deleted, false);
		eq(child1.deleted, false);
		eq(todo2.deleted, false);
		eq(purgeSelectedDeletedButton.disabled, true);

		selectAllButton.click();							// Select all

		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, false);
		eq(todo1.selected, true);
		eq(child1.selected, true);
		eq(todo2.selected, false);
		eq(todo1.deleted, false);
		eq(child1.deleted, false);
		eq(todo2.deleted, false);
		eq(purgeSelectedDeletedButton.disabled, true);

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');

		todoLi1SelectButton.click();						// Unselect

		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, false);
		eq(todo1.selected, false);
		eq(child1.selected, true);
		eq(todo2.selected, false);
		eq(todo1.deleted, false);
		eq(child1.deleted, false);
		eq(todo2.deleted, false);
		eq(purgeSelectedDeletedButton.disabled, true);

		deleteSelectedButton.click();						// Delete selected
		
		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, false);
		eq(todo1.selected, false);
		eq(child1.selected, true);
		eq(todo2.selected, false);
		eq(todo1.deleted, false);
		eq(child1.deleted, true);
		eq(todo2.deleted, false);
		eq(purgeSelectedDeletedButton.disabled, false);

		deleteSelectedButton.click();						// Undelete selected
		
		eq(todo1.filteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo2.filteredIn, false);
		eq(todo1.selected, false);
		eq(child1.selected, true);
		eq(todo2.selected, false);
		eq(todo1.deleted, false);
		eq(child1.deleted, false);
		eq(todo2.deleted, false);
		eq(purgeSelectedDeletedButton.disabled, true);
	},
	"Clicking the purgeSelectedDeletedButton should remove selected deleted todos from storage and display.": function() {
		// TODO Consider applying this very focused style of code to other tests. No unnecessary assertions, easy to see
		// the sequence of clicks. Contrast with the test just above.

		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);

		startTestApp();

		eq(todos.length, 3);
		eq(todolist.children[0].children.length, 3);

		showDeletedButton.click();										// Deleted --> √ Deleted
		selectAllButton.click();										// Select all
		var todoLi2 = todolist.children[0].children[1];
		var todoLi2SelectButton = todoLi2.children.namedItem('select');
		todoLi2SelectButton.click();									// Unselect Item 2
		deleteSelectedButton.click();									// Delete selected

		purgeSelectedDeletedButton.click();

		eq(todos.length, 1);
		eq(todolist.children[0].children.length, 1);
	},
	"The app should warn the user before purging selected deleted todos with nested todos that are not deleted.": function() {
		future();
	},
	"The header actions bar should have an 'addTodo' button to add a new todo to the end of the list.": function() {
		// In case filtering the list results in no displayed todos so that addSibling is unavailable.

		todos = [];
		startTestApp();		// restore defaults

		eq(addTodoButton.nodeName, 'BUTTON');
		eq(addTodoButton.name, 'addTodo');
		eq(addTodoButton.disabled, false);
		eq(addTodoButton.textContent, 'Add todo');
		eq(addTodoButton.parentElement, actionsBar);
	},
	"Clicking addTodo button should add a new todo to the end of the list.": function() {
		todos = [];
		startTestApp();

		eq(todos.length, 0);
		
		addTodoButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		
		eq(todos.length, 1);
		eq(todosUl.children.length, 1);
		eq(todoLi1.id, todos[0].id);

		addTodoButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi2 = todosUl.children[1];
		
		eq(todos.length, 2);
		eq(todosUl.children.length, 2);
		eq(todoLi1.id, todos[0].id);
		eq(todoLi2.id, todos[1].id);
	},
	"If root todos are in select mode, the addTodo button should be disabled.": function() {
		// No new todos allowed while in select mode.
		todolist.innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo2 = new Todo('Item 2');
		todo1.markSelectMode(true);
		todo2.markSelected(true);
		todo2.markSelectMode(true);
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);
		startTestApp();
		eq(addTodoButton.disabled, true);
	},
	"Section: Keyboard shortcuts": function() {
	},
	"When editing, Return should be a shortcut for 'Add Sibling'.": function() {
		// Limit a todo to one line.
		manual();

		todos = [];
		startTestApp();
		addTodo();
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1Entry = todoLi1.querySelector('p');

		var activeElement = document.activeElement;
		var activeElementFocused = document.hasFocus();

		eq(todosUl.children.length, 1);
		eq(todoLi1Entry, activeElement);
		eq(activeElementFocused, true);

		// keyup and keydown event properties are Read Only, so use KeyboardEvent constructor, which instantiates the properties
		// charCode is deprecated and isn't set in a normal Chrome keydown/keyup event
		// keyCode and which are deprecated but they are set in a normal Chrome keydown/keyup event
		var returnKeyProperties = {
			"key"		: "Enter",
			"code"		: "Enter",
			"keyCode"	: 13,
			"which"		: 13
		}
		testKeyDown = new KeyboardEvent('keydown', returnKeyProperties);

		testKeyUp= new KeyboardEvent('keyup', returnKeyProperties);

		todoLi1Entry.dispatchEvent(testKeyDown);
		todoLi1Entry.dispatchEvent(testKeyUp);

		// the right events are dispatched, but it doesn't trigger the app code
		eq(todosUl.children.length, 2);	// fails, still only one todoLi

		var todoLi2 = todosUl.children[1];
		var todoLi2Entry = todoLi2.querySelector('p');

		eq(todoLi2Entry, activeElement);
		eq(todoLi2Entry, focusedElement);
	},
	"Return as a shortcut for 'Add Sibling' should be disabled if the todo is selected.": function() {
		// Adding todos not allowed in select mode
		manual();
	},
	"When editing, Shift-Return should be a shortcut for 'Add Child'.": function() {
		// Limit a todo to one line.
		manual();
	},
	"Shift-Return as a shortcut for 'Add Child' should be disabled if the todo is selected.": function() {
		// Adding todos not allowed in select mode
		manual();
	},
	"If showActive button is not '√ Active', the addSibling and addChild keyboard shortcuts should also be disabled.": function() {
		manual();
	},
	"When editing, Esc should be a shortcut for 'Undo Edit'.": function() {
		manual();
	},
	"Toggling 'Undo/Redo edit' with 'esc' puts cursor at beginning of entry; app should move it to the end.": function() {
		// There is HTMLInputElement.setSelectionRange() but it doesn't seem to work on a contenteditable <p>. 
		future();
		// Add a todo. Enter 'Fresh entry'. Hit esc twice. 'Fresh entry' should be there with cursor at the end.
	},
	"Esc should apply only to the current todoLi entry.": function() {
		// There was a bug such that Esc would restore originalEntry from the wrong todoLi.
		// Fixed by adding a check on undoEdit button.
		manual();

		todos = [];
		todo1 = new Todo('Item 1');
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);
		startTestApp();

		// Edit Item 2, then click on Item 1 entry, then hit 'esc' key. Nothing should happen.
	},
	"Section: localStorage": function() {
	},
	"The app should have a way to save todos array to localStorage.": function() {
		// Tests writeTodosToStorage(key)
		localStorage.removeItem('test-todos');
		localStorage.removeItem('undefined');			// left over from todo event handler tests
		localStorage.removeItem('undefined-filters');
		todos = [];
		todo1 = new Todo('Item 1');
		todo2 = new Todo('Item 2');
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);
		insertTodo(todos, todo3);

		eq(todos[0].id, todo1.id);	
		eq(todos[1].id, todo2.id);	
		eq(todos[2].id, todo3.id);	

		writeTodosToStorage('test-todos');
		var stored = JSON.parse(localStorage.getItem('test-todos'));
		
		eq(stored.length, todos.length);
		eq(stored[0].id, todo1.id);	
		eq(stored[1].id, todo2.id);	
		eq(stored[2].id, todo3.id);	
	},
	"The app should allow for saving the todos array to more than one localStorage key.": function() {
		// Facilitates testing and backup -- it is very easy to wipe out saved todos.
		localStorage.removeItem('test-todos');
		todos = [];
		todo1 = new Todo('Item 1');
		todo2 = new Todo('Item 2');
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);
		insertTodo(todos, todo3);

		eq(todos[0].id, todo1.id);	
		eq(todos[1].id, todo2.id);	
		eq(todos[2].id, todo3.id);	

		writeTodosToStorage('test-todos');
		var stored = JSON.parse(localStorage.getItem('test-todos'));
		
		eq(stored.length, todos.length);
		eq(stored[0].id, todo1.id);	
		eq(stored[1].id, todo2.id);	
		eq(stored[2].id, todo3.id);	

		writeTodosToStorage('test-todos-2');
		var stored2 = JSON.parse(localStorage.getItem('test-todos-2'));
		
		eq(stored2.length, todos.length);
		eq(stored2[0].id, todo1.id);	
		eq(stored2[1].id, todo2.id);	
		eq(stored2[2].id, todo3.id);	

		localStorage.removeItem('test-todos-2');
	},
	"There should be an interface for choosing which key to save data to.": function() {
		future();
		// A 'Save as' input field to get a new key name.
		// A way to choose from existing keys, delete them individually by name, or clear all keys.
	},
	"There should be a way to back up/restore todos to/from a file.": function() {
		// Because accidentally erasing all your todos is just a localStorage.removeItem() or clear() away.
		// https://developer.mozilla.org/en-US/docs/Web/API/File
		future();
	},
	"The app should have a way to convert todo data from localStorage back to todo objects with methods": function() {
		// Tests restoreTodosFromLocalStorage(key)
		localStorage.removeItem('test-todos');
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);

		eq(todos.length, 2);
		eq(todo1.id, todos[0].id);
		eq(child1.id, todo1.children[0].id);
		eq(grandchild1.id, child1.children[0].id);
		eq(todo2.id, todos[1].id);

		writeTodosToStorage('test-todos');
		todos = [];
		restoreTodosFromLocalStorage('test-todos');

		eq(todos.length, 2);
		eq(todo1.id, todos[0].id);
		eq(child1.id, todo1.children[0].id);
		eq(grandchild1.id, child1.children[0].id);
		eq(todo2.id, todos[1].id);
	},
	"Changes to todos should be saved to localStorage.": function() {
		localStorage.removeItem('test-todos');
		todos = [];
		eq(localStorage.getItem('test-todos'), null);
		startApp('test-todos');
		addTodoButton.click();
		var todo1 = todos[0];
		var stored = JSON.parse(localStorage.getItem('test-todos'));

		eq(stored[0].id, todo1.id);
		eq(stored[0].stage, todo1.stage);
		eq(todo1.stage, 'active');

		todo1Li = todolist.children[0].children[0];
		todo1LiCompleteButton = todo1Li.children.namedItem('complete');

		todo1LiCompleteButton.click();

		var stored = JSON.parse(localStorage.getItem('test-todos'));

		eq(stored[0].id, todo1.id);
		eq(stored[0].stage, todo1.stage);
		eq(todo1.stage, 'completed');
	},
	"Edited entries should also be saved to localStorage when they lose focus.": function() {
		// Targets a bug whereby an edited entry was not saved unless/until there wasw a re-render.

		manual();
		// Create a todo, edit its entry, reload page. Edited entry should survive the reload.
	},
	"On page load, saved todos should be retrieved from localStorage.": function() {
		todolist.innerHTML = '';
		localStorage.removeItem('test-todos');
		todos = [];
		startApp('test-todos');
		addTodoButton.click();
		var todo1 = todos[0];
		var stored = JSON.parse(localStorage.getItem('test-todos'));

		eq(stored[0].id, todo1.id);
		
		todos = [];
	
		startApp('test-todos');		// location.reload() is unusable because it runs all the tests again, over and over...
		
		eq(todos.length, 1);
		eq(todos[0].id, todo1.id);
	},
	"There should be a way to save the state of the Actions bar filter buttons to a given localStorage key.": function() {
		// Tests writeFiltersToStorage(key)
		localStorage.removeItem('test-todos');

		showActiveButton.textContent = 'Active';
		showCompletedButton.textContent = '√ Completed';
		showDeletedButton.textContent = '√ Deleted';
		
		writeFiltersToStorage('test-todos');

		var buttonText = JSON.parse(localStorage.getItem('test-todos-filters')); // filter key hardwired as storageKey + '-filters'

		eq(buttonText[0], 'Active');
		eq(buttonText[1], '√ Completed');
		eq(buttonText[2], '√ Deleted');
	},
	"The app should save the state of the filter buttons to localStorage whenever they change.": function() {
		localStorage.removeItem('test-todos-filters');		// filter key hardwired as storageKey + '-filters'
		localStorage.removeItem('test-todos');

		showActiveButton.textContent = 'Active';
		showCompletedButton.textContent = '√ Completed';
		showDeletedButton.textContent = '√ Deleted';
		
		showActiveButton.click();
		showCompletedButton.click();
		showDeletedButton.click();

		writeFiltersToStorage('test-todos');

		var buttonText = JSON.parse(localStorage.getItem('test-todos-filters'));

		eq(buttonText[0], '√ Active');
		eq(buttonText[1], 'Completed');
		eq(buttonText[2], 'Deleted');
	},
	"When the page is loaded, the app should restore filter button text from localStorage.": function() {
		localStorage.removeItem('test-todos-filters');		// filter key hardwired as storageKey + '-filters'
		todos = [];

		showActiveButton.textContent = 'Active';
		showCompletedButton.textContent = '√ Completed';
		showDeletedButton.textContent = '√ Deleted';
		
		writeFiltersToStorage('test-todos');

		startApp('test-todos');

		eq(showActiveButton.textContent, 'Active');
		eq(showCompletedButton.textContent, '√ Completed');
		eq(showDeletedButton.textContent, '√ Deleted');
	},
	"Section: more features": function() {
	},
	"There should be a 'canceled' stage to complement 'active' and 'completed'.": function() {
		future();
	},
	"There should be 'expandAll' buttons on Actions bar and on todoLis to set todo.collapsed false for all nested todos.": function() {
		future();
	},
	"There should be a way to move a todo in the list, for example to the top of the list.": function() {
		// 'Shift up' and 'Shift down' buttons.
		// 'Shift to top' and 'Shift to bottom' buttons.
		// 'Indent' and 'Outdent' buttons.
		// Keyboard shortcuts opt+arrow.
		// Keyboard shortcuts shift-opt-up/down arrow for shift to top/bottom.
		// Drag to new position?
		future();
	},
	"There should be a 'find' input to filter the display according to keywords/tags or entry text.": function() {
		future();
	}, 
	"Each todoLi should have a 'zoom in/out' button to filter the display to just that todoLi.": function() {
		future();
	},
	"Such a zoom in feature could replace the whole selection mode system.": function() {
		future();
		// No more selectAll function; completeAll and deleteAll would replace
		// completeSelected and deleteSelected and apply to all displayed todos.
		// No more selectChildren, completeSelectedChildren, or deleteSelectedChildren; A user wanting to
		// complete or delete children would instead zoom in on the parent todo and use the global
		// completeAll or deleteAll buttons.
	},
	"Section: On startup": function() {

	},
	"The app should have a startup function to load todos, if any, and set filter button values.": function() {
		todos = [];
		localStorage.removeItem('test-todos');
		localStorage.removeItem('test-todos-filters');

		startApp('test-todos');

		eq(todos.length, 0);
		eq(selectAllButton.disabled, true);
		eq(completeSelectedButton.disabled, true);
		eq(deleteSelectedButton.disabled, true);
		eq(purgeSelectedDeletedButton.disabled, true);
		eq(showActiveButton.disabled, false);
		eq(showCompletedButton.disabled, false);
		eq(showDeletedButton.disabled, false);
		eq(addTodoButton.disabled, false);
		eq(selectAllButton.textContent, 'Select all');
		eq(completeSelectedButton.textContent, 'Complete selected');
		eq(deleteSelectedButton.textContent, 'Delete selected');
		eq(showActiveButton.textContent, '√ Active');
		eq(showCompletedButton.textContent, '√ Completed');
		eq(showDeletedButton.textContent, 'Deleted');

		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		todo2.markDeleted(true);
		insertTodo(todos, todo2);
		writeTodosToStorage('test-todos');

		startApp('test-todos');

		todo1 = todos[0];
		todo2 = todos[1];

		eq(todos.length, 2);
		eq(selectAllButton.disabled, false);
		eq(completeSelectedButton.disabled, true);
		eq(deleteSelectedButton.disabled, true);
		eq(purgeSelectedDeletedButton.disabled, true);
		eq(showActiveButton.disabled, false);
		eq(showCompletedButton.disabled, false);
		eq(showDeletedButton.disabled, false);
		eq(addTodoButton.disabled, false);
		eq(selectAllButton.textContent, 'Select all');
		eq(completeSelectedButton.textContent, 'Complete selected');
		eq(deleteSelectedButton.textContent, 'Delete selected');
		eq(showActiveButton.textContent, '√ Active');
		eq(showCompletedButton.textContent, '√ Completed');
		eq(showDeletedButton.textContent, 'Deleted');

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi2 = todosUl.children[1];

		eq(todoLi1.id, todo1.id);
		eq(todoLi2, undefined);					// because deleted are filtered out

		showDeletedButton.click();

		startApp('test-todos')

		eq(showDeletedButton.textContent, '√ Deleted');

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi2 = todosUl.children[1];

		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);					// because deleted are not filtered out

		// Restore defaults after last test
		localStorage.removeItem('test-todos');
		localStorage.removeItem('test-todos-filters');
		todos = [];
		startApp('test-todos');
	}
});

startApp('saved-todos');
