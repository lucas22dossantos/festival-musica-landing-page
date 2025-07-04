import { src, dest, watch } from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass); //conectamos el motor dartSass con gulpSass

//con pipe es encadenar tareas

export function css(done) {
  src("src/scss/app.scss") // Toma el archivo app.scss
    .pipe(sass().on("error", sass.logError)) // Lo compila a CSS y agregamos que en el caso de algun error nos avise
    .pipe(dest("build/css")); // Lo guarda en la carpeta build/css

  done(); // Indica que la tarea terminó
}

export function dev() {
  watch("src/scss/**/*.scss", css);
}
