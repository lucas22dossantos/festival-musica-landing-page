import path from "path";
import fs from "fs";
import { glob } from "glob";
import { src, dest, watch, series } from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import terser from "gulp-terser";
import sharp from "sharp";

// Creamos una instancia de gulp-sass usando dartSass como motor
const sass = gulpSass(dartSass);

//con pipe es encadenar tareas

// Función para manejar archivos JavaScript
export function js(done) {
  src("src/js/app.js") //
    .pipe(terser())
    .pipe(dest("build/js"));
  done();
}

// Función para compilar SCSS a CSS
export function css(done) {
  src("src/scss/app.scss", { sourcemaps: true }) // Toma el archivo app.scss
    .pipe(
      sass({
        outputStyle: "compressed", //minificamos el codigo css
      }).on("error", sass.logError)
    )
    .pipe(cleanCSS())
    // Lo compila a CSS y agregamos que en el caso de algun error nos avise
    .pipe(dest("build/css", { sourcemaps: "." })); // Lo guarda en la carpeta build/css

  done(); // Indica que la tarea terminó
}

// codigo para recortar (redimensiona) imágenes JPG a un tamaño específico
export async function crop(done) {
  const inputFolder = "src/img/gallery/full";
  const outputFolder = "src/img/gallery/thumb";
  const width = 250;
  const height = 180;
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }
  const images = fs.readdirSync(inputFolder).filter((file) => {
    return /\.(jpg)$/i.test(path.extname(file));
  });
  try {
    images.forEach((file) => {
      const inputFile = path.join(inputFolder, file);
      const outputFile = path.join(outputFolder, file);
      sharp(inputFile)
        .resize(width, height, {
          position: "centre",
        })
        .toFile(outputFile);
    });

    done();
  } catch (error) {
    console.log(error);
  }
}

//busca las imagenes
export async function imagenes(done) {
  const srcDir = "./src/img";
  const buildDir = "./build/img";
  const images = await glob("./src/img/**/*{jpg,png}");

  images.forEach((file) => {
    const relativePath = path.relative(srcDir, path.dirname(file));
    const outputSubDir = path.join(buildDir, relativePath);
    procesarImagenes(file, outputSubDir);
  });
  done();
}

//Optimización y conversión de imágenes a WebP
function procesarImagenes(file, outputSubDir) {
  if (!fs.existsSync(outputSubDir)) {
    fs.mkdirSync(outputSubDir, { recursive: true });
  }
  const baseName = path.basename(file, path.extname(file));
  const extName = path.extname(file);
  const outputFile = path.join(outputSubDir, `${baseName}${extName}`);
  const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`);

  const options = { quality: 80 };
  sharp(file).jpeg(options).toFile(outputFile);
  sharp(file).webp(options).toFile(outputFileWebp);
}

// Función para activar el modo desarrollo con watch
export function dev() {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", js);
  watch("src/img/**/*.{png, jpg}", imagenes);
}

// Tarea por defecto (cuando ejecutamos "gulp" en la terminal):
// 'series' ejecuta las tareas en orden, una después de la otra: primero js, luego css, luego dev

export default series(crop, js, css, imagenes, dev);
