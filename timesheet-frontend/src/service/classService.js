import http from './httpService';
const apiUrl = 'http://localhost:3001';

const apiEndpoint = apiUrl + '/classes';

//Get a specific class given a class code
function classCodeURL(class_code) {
	return `${apiEndpoint}/${class_code}`;
}

// GET account/:classCode
export function getClass(class_code) {
	return http.get(classCodeURL(class_code));
}
