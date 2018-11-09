import { MAIN_WINDOW } from '../config/windows';

// TODO - Find a way to remove hard coded name
export default () => process.env.APP_UUID || MAIN_WINDOW;
