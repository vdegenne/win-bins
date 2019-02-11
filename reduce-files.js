const fs = require('fs');
const path = require('path');

const categories = [
  {
    name: 'images',
    extensions: ['jpg', 'JPG', 'Jpg', 'png', 'PNG', 'bmp', 'psd', 'svg', 'FBX', 'obj', 'max', 'mtl', 'ai']
  },
  {
    name: 'documents',
    extensions: ['txt', 'ahk', 'js', 'pdf', 'torrent', 'sql', 'json', 'indd', 'xml']
  },
  {
    name: 'videos',
    extensions: ['mp4', 'aep']
  },
  {
    name: 'archives',
    extensions: ['zip', '7z', 'jar']
  },
  {
    name: 'shortcuts',
    extensions: ['lnk', 'exe', 'url', 'msi', 'lnk']
  },
  {
    name: 'audios',
    extensions: ['mp3']
  }
]


const content = fs.readdirSync('.');

let extension;
for (const file of content) {
  /* don't attack the main script */
  if (file === 'reduce.js') {
    continue;
  }


  extension = path.extname(file).slice(1);
  category = categories.filter(c => c.extensions.includes(extension))[0];
  
  if (!category) {
    // no category, passing
    continue;
  }

  /* create the directory if doesn't exist */
  if (!fs.existsSync(category.name)) {
    fs.mkdirSync(category.name);
  }

  /* move the file */
  fs.renameSync(file, `${category.name}\\${file}`);
  
  // end loop
}
