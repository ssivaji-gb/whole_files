// Student Management System - Using JavaScript Objects
// Features: Add, View, Update, Delete, Search students

const students = [];

// Utility: Display a student object nicely
function displayStudent(student) {
	if (!student) {
		console.log('Student not found');
		return;
	}
	// Using Object.keys() to iterate properties (exercise requirement)
	Object.keys(student).forEach((key) => {
		console.log(`${student[key]}`);
	});
	console.log('---');
}

// Add a new student to the students array. Prevent duplicate IDs.
function addStudent(newStudent) {
	if (!newStudent || typeof newStudent !== 'object') {
		console.error('Invalid student object');
		return false;
	}
	const exists = students.some((s) => s.id === newStudent.id);
	if (exists) {
		console.error(`Student with id ${newStudent.id} already exists. Add aborted.`);
		return false;
	}
	// Guard: ensure required properties present
	const { id, name, age, grade, course } = newStudent;
	if (id === undefined || name === undefined) {
		console.error('Student must have id and name');
		return false;
	}
	students.push({ id, name, age, grade, course });
	return true;
}

// View all students
function viewStudents() {
	if (!students.length) {
		console.log('No students to display');
		return;
	}
	students.forEach((s) => displayStudent(s));
}

// Search for a student by ID and return object
function searchStudent(id) {
	return students.find((s) => s.id === id) || null;
}

// Update a student's record by ID. Accepts an object with fields to update.
function updateStudent(id, updates = {}) {
	const idx = students.findIndex((s) => s.id === id);
	if (idx === -1) {
		console.error(`Student with id ${id} not found. Update aborted.`);
		return false;
	}
	// Using Object.assign to update properties (exercise requirement)
	Object.assign(students[idx], updates);
	return true;
}

// Delete a student by ID
function deleteStudent(id) {
	const idx = students.findIndex((s) => s.id === id);
	if (idx === -1) {
		console.error(`Student with id ${id} not found. Delete aborted.`);
		return false;
	}
	// Remove the student object from array
	students.splice(idx, 1);
	return true;
}

// Example usage and tests (small demo)
function demo() {
	console.log('--- Adding students ---');
	addStudent({ id: 1, name: 'Alice', age: 20, grade: 'A', course: 'Math' });
	addStudent({ id: 2, name: 'Bob', age: 21, grade: 'B', course: 'Physics' });
	addStudent({ id: 3, name: 'Charlie', age: 19, grade: 'A', course: 'Chemistry' });
	// Attempt duplicate ID
	addStudent({ id: 2, name: 'DuplicateBob', age: 22, grade: 'C', course: 'Biology' });

	console.log('\n--- View all students ---');
	viewStudents();

	console.log('\n--- Search student with id 2 ---');
	displayStudent(searchStudent(2));

	console.log('\n--- Update student id 1 (change grade & course) ---');
	updateStudent(1, { grade: 'A+', course: 'Advanced Math' });
	displayStudent(searchStudent(1));

	console.log('\n--- Delete student id 3 ---');
	deleteStudent(3);
	console.log('After deletion:');
	viewStudents();

	console.log('\n--- Demonstrate deleting property (delete operator) ---');
	// Remove age from student id 2
	const s2 = searchStudent(2);
	if (s2) {
		delete s2.age; // this demonstrates delete operator use
	}
	displayStudent(searchStudent(2));
}

// Run demo when file is executed
demo();

