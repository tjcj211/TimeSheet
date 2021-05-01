/*
 * Timothy Carta, Victoria Gorski, Julia Wilkinson
 */
import http from './httpService';
const apiUrl = 'http://localhost:3001';

const apiEndpoint = apiUrl + '/records';

//Get all records from a specific student
function recordsUrl(studentId) {
	return `${apiEndpoint}/${studentId}`;
}

// GET records/:studentId
export function getStudentRecords(studentId) {
	return http.get(recordsUrl(studentId));
}
