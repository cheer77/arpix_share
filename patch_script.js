const fs = require('fs');

function replaceInFile(path, regex, replacer) {
  const content = fs.readFileSync(path, 'utf8');
  fs.writeFileSync(path, content.replace(regex, replacer));
}

// 1. main.scss
replaceInFile('src/scss/main.scss', /\.section\s*\{[\s\S]*?\}\s*?\n/m, '');

// 2. benefits.scss
replaceInFile('src/components/pages/home/benefits/benefits.scss', /\.benefits\s*\{\s*padding:[^;]+;/m, '.benefits {\n  padding-bottom: ac(200px, 80px);');

// 3. about.scss
replaceInFile('src/components/pages/home/about/about.scss', /\.about\s*\{\s*&__inner/m, '.about {\n  padding-bottom: ac(200px, 80px);\n\n  &__inner');

// 4. hits.scss
replaceInFile('src/components/pages/home/hits/hits.scss', /\.hits\s*\{\s*&__header/m, '.hits {\n  padding-bottom: ac(200px, 80px);\n\n  &__header');

// 5. life.scss
replaceInFile('src/components/pages/home/life/life.scss', /\.life\s*\{\s*padding:[^;]+;/m, '.life {\n  padding-bottom: ac(200px, 80px);');

// 6. features.scss
replaceInFile('src/components/pages/home/features/features.scss', /\.features\s*\{\s*padding-top:[^;]+;\s*padding-bottom:[^;]+;/m, '.features {\n  padding-bottom: ac(80px, 40px);');

// 7. dealers.scss
replaceInFile('src/components/pages/home/dealers/dealers.scss', /\.dealers\s*\{\s*padding:[^;]+;/m, '.dealers {\n  padding-bottom: ac(148px, 80px);');

// 8. club.scss
replaceInFile('src/components/pages/home/club/club.scss', /\.club\s*\{\s*padding:[^;]+;/m, '.club {\n  padding-bottom: ac(148px, 80px);');

// 9. offer.scss
replaceInFile('src/components/pages/home/offer/offer.scss', /\.offer\s*\{\s*padding:[^;]+;/m, '.offer {\n  padding-bottom: ac(60px, 40px);');

console.log('Patch complete.');
