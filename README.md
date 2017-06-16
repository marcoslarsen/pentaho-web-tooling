# Pentaho Web Tooling #
Project that integrates transpile (Babel) and bundling (Webpack) tools to pentaho build workflow

Two branches were created to explore different approaches:

__Webpack__

```
$ git checkout webpack
```

__Gulp__

```
$ git checkout gulp
```

__Build__

This will build, and package the whole project. The artifact will be generated in: ```target```

```
$ mvn package
```

__Dev Server__

This will launch a dev server with "hot reloading" in: http://localhost:9000

```
$ mvn frontend:npm@server
```