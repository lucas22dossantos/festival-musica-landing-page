import { src, dest, watch, series } from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";

// Creamos una instancia de gulp-sass usando dartSass como motor
const sass = gulpSass(dartSass);

//con pipe es encadenar tareas

// Función para manejar archivos JavaScript
export function js(done) {
  src("src/js/app.js") //
    .pipe(dest("build/js"));
  done();
}

// Función para compilar SCSS a CSS
export function css(done) {
  src("src/scss/app.scss", { sourcemaps: true }) // Toma el archivo app.scss
    .pipe(sass().on("error", sass.logError)) // Lo compila a CSS y agregamos que en el caso de algun error nos avise
    .pipe(dest("build/css", { sourcemaps: "." })); // Lo guarda en la carpeta build/css

  done(); // Indica que la tarea terminó
}

// Función para activar el modo desarrollo con watch
export function dev() {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", js);
}

// Tarea por defecto (cuando ejecutamos "gulp" en la terminal):
// 'series' ejecuta las tareas en orden, una después de la otra: primero js, luego css, luego dev

export default series(js, css, dev);
