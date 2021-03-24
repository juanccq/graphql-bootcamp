const users = [
  {
    id: "1",
    name: "Juan",
    email: "juan@mail.com",
    age: 38,
  },
  {
    id: "2",
    name: "Carlos",
    email: "carlos@mail.com",
    age: 27,
  },
  {
    id: "3",
    name: "David",
    email: "david@example.com",
    age: 38,
  },
];

const posts = [
  {
    id: "1",
    title: "the new comments",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie maximus lorem, quis facilisis enim varius eget. Curabitur in efficitur enim.",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "another book",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie maximus lorem, quis facilisis enim varius eget. Curabitur in efficitur enim.",
    published: true,
    author: "2",
  },
  {
    id: "3",
    title: "here is your solution",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie maximus lorem, quis facilisis enim varius eget. Curabitur in efficitur enim.",
    published: true,
    author: "1",
  },
];

const comments = [
  {
    id: "1",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ex lectus, tristique in metus ac, mattis commodo lorem. Aliquam est ante, cursus a sollicitudin in",
    author: "1",
    post: "3",
  },
  {
    id: "2",
    text:
      "Aliquam neque nisi, ornare a sem nec, venenatis lacinia nibh. Nullam varius leo urna, et dignissim nisl venenatis in.",
    author: "2",
    post: "2",
  },
  {
    id: "3",
    text:
      "Morbi pellentesque consequat ligula, vel convallis dolor viverra ac. Duis ullamcorper vestibulum mi non egestas. Nunc posuere orci nec egestas malesuada",
    author: "3",
    post: "1",
  },
  {
    id: "4",
    text:
      "Suspendisse pellentesque, ligula sit amet congue condimentum, leo urna sollicitudin dolor, venenatis porta dui massa eget nunc. Integer eleifend consequat ex ut rutrum",
    author: "1",
    post: "1",
  },
];

const db = {
  users,
  posts,
  comments,
};

export { db as default };
