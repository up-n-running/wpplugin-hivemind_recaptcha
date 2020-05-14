Any files inside this directory will be excluded from gulp's build directory so you can put what you want in here and it wont be deployed to production.

Any .js files left in here will have debug stripped and be minified by the gulp build process but then the minified file will be dropped in here alongside the original instead of being sent to /build