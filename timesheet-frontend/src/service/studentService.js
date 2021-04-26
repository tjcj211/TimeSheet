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
export function getstudentClasses(studentId) {
	return http.get(classesUrl(studentId));
}

// GET student/:accountId/classes/:classId
export function getstudentClass(studentId, classId) {
	return http.get(classUrl(studentId, classId));
}

// GET student/:accountId/classes/:classId/lessons
export function getstudentLessons(studentId, classId) {
	return http.get(lessonUrl(studentId, classId));
}

// GET student/:accountId/classes/:classId/lessons/:lessonId/records
export function getstudentRecords(studentId, classId, lessonId) {
	return http.get(recordsUrl(studentId, classId, lessonId));
}
