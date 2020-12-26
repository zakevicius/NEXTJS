export default async (req, res) => {
  if (req.query.disable) {
    res.clearPreviewData();
  } else {
    res.setPreviewData({});
  }

  res.redirect(req.query.slug);
};
