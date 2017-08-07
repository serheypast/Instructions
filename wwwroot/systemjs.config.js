/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',



            // other libraries
            'rxjs': 'npm:rxjs',
            'angular2-infinite-scroll': 'npm:angular2-infinite-scroll/',

            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            'ng2-dragula': 'npm:ng2-dragula/bundles/ng2-dragula.umd.js',
            'primeng': 'npm:primeng',
            '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
            'ng2-file-upload': 'npm:ng2-file-upload/bundles/ng2-file-upload.umd.js',
            'ng2-cloudinary': 'npm:ng2-cloudinary/dist/umd/ng2-cloudinary.js',
            '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
            '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            'ng2-tag-input': 'npm:ng2-tag-input/dist/ng2-tag-input.bundle.js',
            'ng2-material-dropdown': 'npm:ng2-material-dropdown/dist/ng2-dropdown.bundle.js',
            'ng2-select': 'npm:ng2-select/bundles/ng2-select.umd.js',
           'ng2-completer': 'node_modules/ng2-completer/ng2-completer.umd.js',
            'ng2-sticky': 'npm:ng2-sticky/dist/ng2-sticky.umd.js',
            '@ngui/scrollable': 'npm:@ngui/scrollable/dist/scrollable.umd.js',
            'angular-l10n': 'npm:angular-l10n/bundles/angular-l10n.umd.js'
            
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-infinite-scroll': {
                main: 'angular2-infinite-scroll.js',
                defaultExtension: 'js'
            },
            

            primeng: {
                defaultExtension: 'js'
            },
            
            
        }
     

        
    });
})(this);
