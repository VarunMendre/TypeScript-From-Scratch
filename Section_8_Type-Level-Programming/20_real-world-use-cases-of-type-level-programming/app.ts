// Extracting Dynamic Route Parameter

type RouteParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | RouteParams<Rest>
    : T extends `${string}:${infer Param}`
      ? Param
      : never;

type Params = RouteParams<"/users/:userId/posts/:postId">;

type ParamsObject<T extends string> = {
  [Key in RouteParams<T>]: string;
};

type PostObject = ParamsObject<"/users/:userId/posts/:postId">;

/*
type PostObject = {
    userId: string;
    postId: string;
}
*/

const postObj: PostObject = {
  postId: "452",
  userId: "usr_789",
};

// Type-Safe Api Response

type ApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

type User = {
  id: string;
  name: string;
};

type UserResponse = ApiResponse<User>;

function handleResponse(res: UserResponse) {
  if (res.success) {
    return res.data;
  } else {
    return res.error;
  }
}

// Type-Safe Event System

type Events = {
  login: {
    userId: string;
  };
  logout: {
    userId: string;
  };
  accounts: {
    accountsId: number;
    userId: string;
  };
};

function emit<EventName extends keyof Events>(
  eventName: EventName,
  payload: Events[EventName],
){ }

emit("accounts", { accountsId: 452, userId: "usr_789" });
