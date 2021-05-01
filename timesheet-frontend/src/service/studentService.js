import http from './httpService';
const apiUrl = 'http://localhost:3001';

const apiEndpoint = apiUrl + '/student';

function classesUrl(id) {
	return `${apiEndpoint}/${id}/classes`;
}

function classUrl(id, classId) {
	return `${apiEndpoint}/${id}/classes/${classId}`;
}

function lessonUrl(id, classId) {
	return `${apiEndpoint}/${id}/classes/${classId}/lessons`;
}

function recordsUrl(id, classId, lessonId) {
	return `${apiEndpoint}/${id}/classes/${classId}/lessons/${lessonId}/records`;
}

// GET student/:accountId/classes
export function getStudentClasses(studentId) {
	return http.get(classesUrl(studentId));
}

// GET student/:accountId/classes/:classId
export function getStudentClass(studentId, classId) {
	return http.get(classUrl(studentId, classId));
}

// GET student/:accountId/classes/:classId/lessons
export function getStudentLessons(studentId, classId) {
	return http.get(lessonUrl(studentId, classId));
}

// GET student/:accountId/classes/:classId/lessons/:lessonId/records
export function getStudentRecords(studentId, classId, lessonId) {
	return http.get(recordsUrl(studentId, classId, lessonId));
}

export function addClass(studentId, clas) {
	if (clas[0]._id) {
		return http.put(classUrl(studentId, clas[0]._id), clas);
	}
}

export function saveRecord(professorId, classId, lessonId, record) {
	return http.post(recordsUrl(professorId, classId, lessonId), record);
}
