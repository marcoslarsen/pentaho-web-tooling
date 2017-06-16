# Pentaho Web Tooling #
Project that integrates transpile (Babel) and bundling (Webpack) tools to pentaho build workflow

Two branches were created to explore different approaches:

__ Webpack __

```
$ git checkout webpack
```

__ Gulp __

```
$ git checkout webpack
```

__ Build __

This will build, and package the whole project. The artifact will be generated in: ```target```

```
$ mvn package
```

__ Dev Server __

This will launch a dev server with "hot reloading" in: http://localhost:9000

```
$ mvn frontend:npm@server
```