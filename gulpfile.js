const { src, dest, watch, parallel, series } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes
const avif = require('gulp-avif');

// Usar import dinámico para gulp-imagemin y sus plugins integrados
async function imagenes(done) {
    const imagemin = (await import('gulp-imagemin')).default;
    const mozjpeg = (await import('imagemin-mozjpeg')).default;
    const optipng = (await import('imagemin-optipng')).default;

    const opciones = {
        plugins: [
            mozjpeg({ quality: 75, progressive: true }),  // Optimización para JPEG
            optipng({ optimizationLevel: 5 }),  // Optimización para PNG
        ]
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(imagemin(opciones.plugins))  // Aplicar optimizadores de gulp-imagemin
        .pipe(dest('build/img'));
    done();
}


async function versionWebp(done) {
    const webp = (await import('gulp-webp')).default;
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
    done();
}


function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
    done();
}


function css(done) {
    src("src/scss/**/*.scss")  // Identificar el archivo SASS
        .pipe(plumber())  // Prevenir que se detenga en caso de error
        .pipe(sass())  // Compilar SASS a CSS
        .pipe(dest("build/css"));  // Almacenar en la carpeta build
    done();
}


function javascript(done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'));
    done();
}


function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}


// Convertir imagenes solo cuando se necesite
const processImages = parallel(imagenes, versionWebp, versionAvif);


// Exportar tareas
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.processImages = processImages;
exports.dev = series(css, javascript, dev);  // Tarea para vigilar cambios en CSS y JS