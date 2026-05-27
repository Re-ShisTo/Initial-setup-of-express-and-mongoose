export async function demo(req, res) {
  //Add headers here
  res.header("Novelty", "1");

  // Add cookies hear
  res.cookie("noCookies", "null");

  return res.json({
    id: 1,
    money: 99.99,
    message: "Hi everyone!",
    person: {
      name: "Shista Chakma",
      age: 24,
      location: "Rangamati",
    },
    hobbies: ["Painting", "Gaming"],
    isActive: true,
    createdAt: new Date(),
  });
}

export async function demo1(req, res) {
  //parameters as params in url
  let name = req.params.name;
  let age = req.params.age;

  return res.json({
    name,
    age,
  });
}

export async function demo2(req, res) {
  //parameters as query in url
  let name = req.query.name;
  let age = req.query.age;

  return res.json({
    name,
    age,
  });
}

// diff is when using params the parameter need to
// be attached with the base url as /demo1/name/age
// but in query the parameter can be attached with
// the searching url as /demo2?name=name&age=age
// without setting any base url endpoint.

export async function demo3(req, res) {
  //headers request
  let name = req.headers.name;
  let age = req.headers.age;

  return res.json({
    name,
    age,
  });
}

export async function demo4(req, res) {
  let body = req.body;

  return res.json({
    body: body,
    name: body["name"],
    email: body["email"],
  });
}

export async function demo5(req, res) {
  //form-data from body request
  let body = req.body;

  return res.json({
    body: body,
  });
}
