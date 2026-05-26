export const condition = async (req, res) => {
  try {
    return res.json({
      msg: "OK",
    });
  } catch (error) {
    return res.json(error);
  }
};
//import this in routes api.js
