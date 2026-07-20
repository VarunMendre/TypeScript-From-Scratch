interface FormData<Data> {
  isValid: boolean;
  data: Data;
};

interface RegistrationForm {
  name: string;
  email: string;
  password: string;
};

interface LoginForm {
  email: string;
  password: string;
};

interface CreatePostForm {
  content: string;
};

const registrationForm: FormData<RegistrationForm> = {
  isValid: true,
  data: {
    name: "Varun",
    email: "varun@gmail.com",
    password: "varun223",
  },
};

const loginForm: FormData<LoginForm> = {
  isValid: true,
  data: {
    email: "varun@gmail.com",
    password: "varun223",
  },
};

const postForm: FormData<CreatePostForm> = {
  isValid: true,
  data: {
    content: "Scholarship form"
  },
};

export {};
