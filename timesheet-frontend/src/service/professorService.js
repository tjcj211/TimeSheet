import http from './httpService';
const apiUrl = 'http://localhost:3001';

const apiEndpoint = apiUrl + '/professor';

function classesUrl(id) {
	return `${apiEndpoint}/${id}/classes`;
}

function classUrl(id, classId) {
	return `${apiEndpoint}/${id}/classes/${classId}`;
}

function lessonUrl(id, classId) {
	return `${apiEndpoint}/${id}/classes/${classId}/lessons`;
}

function recordUrl(id, classId, lessonId) {
	return `${apiEndpoint}/${id}/classes/${classId}/lessons/${lessonId}`;
}

export function getProfessorClasses(professorId) {
	return http.get(classesUrl(professorId));
}

export function getProfessorClass(professorId, classId) {
	return http.get(classUrl(professorId, classId));
}

export function getProfessorLessons(professorId, classId) {
	return http.get(lessonUrl(professorId, classId));
}

export function getProfessorRecords(professorId, classId, lessonId) {
	return http.get(recordUrl(professorId, classId, lessonId));
}

export function saveClass(clas) {
	if (clas._id) {
		const body = { ...clas };
		delete body._id;
		return http.put(classesUrl(clas._id), body);
	}

	return http.post(apiEndpoint, clas);
}

export function deleteClass(professorId) {
	return http.delete(classesUrl(professorId));
}
