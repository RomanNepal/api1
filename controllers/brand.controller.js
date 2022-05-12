const brandAdd = (req, res, next) => {
  let data = req.body;
  console.log(req.files);
  if (req.files) {
    let images = [];
    req.files.map((item, index) => {
      images.push(item.filename);
    })
    data.image=images;
    console.log('This is data')
    console.log(data);
  }

  res.status(200).json({
    result: data,
    status: true,
    msg: "Brand Created",
  });
};
const brandUpdate = (req, res, next) => {};
const brandList = (req, res, next) => {};

module.exports = {
  brandAdd,
  brandUpdate,
  brandList,
};
