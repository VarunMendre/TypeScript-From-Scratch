type Box<T> = {
  values: T[];
};

// const numbers: Box<number> = {
//   values: [10, 20, 30],
// };

// const names: Box<string> = {
//   values: ["Varun", "John", "Alice"],
// };

// const flags: Box<boolean> = {
//   values: [true, false, true],
// };

type Value<T> = {
  value: T;
};

// const numberValue: Value<number> = {
//   value: 100,
// };

// const stringValue: Value<string> = {
//   value: "Hello",
// };

// const objectValue: Value<{ name: string }> = {
//   value: {
//     name: "Varun",
//   },
// };

interface FormState<T> {
  isValid: Boolean;
  data: T;
}

interface LoginForm {
  email: string;
  password: string;
}

interface RegistrationForm {
  name: string;
  email: string;
  password: string;
}

interface PostForm {
  postId: number;
  title: string;
  email: string;
}

// Create test objects
const login: FormState<LoginForm> = {
    isValid: true,
    data: {
        email: "varun@gmail.com",
        password: "Varun@0404"
    }
};

const registration: FormState<RegistrationForm> = {
    isValid: true,
    data: {
        name: "varun",
        email: "varun@gmail.com",
        password: "Varun@0404"
    }
};


