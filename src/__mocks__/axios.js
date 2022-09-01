import mockAxios from "jest-mock-axios";

/*
 * This global mock mocks the 'axios' module using 'jest-mock-axios'
 *
 * This will need (in package.json):
 *
 * "jest": {
 *   "resetMocks": false
 * }
 *
 */
export default mockAxios;
