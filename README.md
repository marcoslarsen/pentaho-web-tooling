# Pentaho Webpack #
Project that integrates transpile (Babel) and bundling (Webpack) tools to pentaho build workflow

This will build, and package the whole project. The artifact will be generated in: ```target```

```
$ mvn clean install 
```

  This will launch a dev server ("webpack") with "hot reloading" in: http://localhost:9000

```
$ mvn frontend:npm@server
```