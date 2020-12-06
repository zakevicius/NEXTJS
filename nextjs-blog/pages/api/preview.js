export default async (req, res) => {
  console.log(req.query);
  if (req.query.disable) {
    res.clearPreviewData();
  } else {
    res.setPreviewData({});
  }

  res.redirect(req.query.slug);
};
