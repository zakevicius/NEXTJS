const fs = require('fs');

const dataEN = {
  'index/title': {
    content: 'This is title'
  }
};

const dataENpreview = {
  'index/title': {
    content: '_This is preview Title'
  }
};

// const dataES = {
//   'index/title': {
//     content: 'Este es el titulo'
//   }
// };

const dataES = {
  'index/random': {
    content: 'to jeste randomo'
  }
};

const dataESpreview = {
  'index/title': {
    content: '_Este es el título de vista previa'
  }
};

export default async (req, res) => {
  let data;
  const preview = true;
  const locale = 'en';

  if (preview) {
    data = locale === 'en' ? dataENpreview : dataESpreview;
  } else {
    data = locale === 'en' ? dataEN : dataES;
  }

  const fileName = preview ? 'index-preview.json' : 'index.json';

  await fs.writeFile(
    `public/static/locales/${locale}/${fileName}`,
    JSON.stringify(data),
    () => {
      console.log(data);
    }
  );

  res.send({ yes: 'yes' });
};
