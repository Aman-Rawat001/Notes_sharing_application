import { init } from "emailjs-com";
init("user_V6sFOHTVXZLMnCut5wbJJ");

export default {
  SERVICE_ID: process.env.REACT_APP_SERVICE_ID,
  USER_ID: process.env.REACT_APP_USER_ID,
  TEMPLATE_ID_CONTACT: process.env.REACT_APP_TEMPLATE_ID_CONTACT,
  TEMPLATE_ID_UPLOAD: process.env.REACT_APP_TEMPLATE_ID_UPLOAD,
};
