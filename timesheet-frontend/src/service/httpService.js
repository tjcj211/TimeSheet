import axios from 'axios';
import logger from './logService';
//import { toast } from 'react-toastify';

axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		logger.log(error);
		//toast.error('An unexpected error occurred.');
	}

	return Promise.reject(error);
});

function setToken(token) {
	axios.defaults.headers.common['x-access-token'] = token;
}
const httpObj = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};
export default httpObj;
