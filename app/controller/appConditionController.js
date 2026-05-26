export const condition = async () => {
  try {
    return res.json(
      console.log({
        msg: "OK",
      }),
    );
  } catch (error) {
    return res.json(error);
  }
};
//import this in routes api.js
