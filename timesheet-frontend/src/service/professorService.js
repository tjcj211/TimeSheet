import http from './httpService';
const apiUrl = 'http://localhost:3001';

const apiEndpoint = apiUrl + '/professor';

function classUrl(id, classId) {
	return `${apiEndpoint}/${id}/classes/${classId}`;
}

function classesUrl(id) {
	return `${apiEndpoint}/${id}/classes`;
}

function lessonUrl(id, classId) {
	return `${apiEndpoint}/${id}/classes/${classId}/lessons`;
}

function recordUrl(id, classId, lessonId) {
	return `${apiEndpoint}/${id}/classes/${classId}/lessons/${lessonId}/records`;
}

// GET professor/:accountId/classes
export function getProfessorClasses(professorId) {
	return http.get(classesUrl(professorId));
}

// GET professor/:accountId/classes/:classId
export function getProfessorClass(professorId, classId) {
	return http.get(classUrl(professorId, classId));
}

// GET professor/:accountId/classes/:classId/lessons
export function getProfessorLessons(professorId, classId) {
	return http.get(lessonUrl(professorId, classId));
}

// GET professor/:accountId/classes/:classId/lessons/:lessonId/records
export function getProfessorRecords(professorId, classId, lessonId) {
	return http.get(recordUrl(professorId, classId, lessonId));
}

//Just an example right now
export function saveClass(professorId, clas) {
	if (clas._id) {
		const body = { ...clas };
		delete body._id;
		return http.put(classesUrl(clas._id), body);
	}

	return http.post(classesUrl(professorId), clas);
}

//Just an example right now
export function deleteClass(professorId) {
	return http.delete(classesUrl(professorId));
}
