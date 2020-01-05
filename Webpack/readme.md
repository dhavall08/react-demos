-   Run command "npm init -y"
-   Create "index.js" and "index.html" file under "src" folder

-   Add webpack to your project for that run below command
    "npm i -D webpack webpack-cli webpack-merge webpack-dev-server"

-   Create webpack config files. Here we create two different files (development & production) for webpack. Also create common webpack file to add common configuration.

-   Add different plugins to load files for that run below command
    "npm i -D file-loader css-loader style-loader clean-webpack-plugin html-webpack-plugin mini-css-extract-plugin uglifyjs-webpack-plugin copy-webpack-plugin"






-   webpack webpack-cli webpack-merge
    >> Main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging
    >> webpack-merge is use to handle common webpack config file for dev and prod environment
    
-   webpack-dev-server
    >> To work with development server

-   html-webpack-plugin
    >> To load index.html during application init

-   file-loader
    >> To load file like images etc

-   clean-webpack-plugin
    >> To clean public folders before create build

-   css-loader style-loader
    >> To load css files

-   mini-css-extract-plugin
    >> To load seperate file in public build folder

-   uglifyjs-webpack-plugin
    >> To minify JavaScript



Reference Link:
https://webpack.js.org/configuration/