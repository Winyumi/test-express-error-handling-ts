# test-express-error-handling-ts

## Express Error Handling

Using an error handler controller at the end of the Express app chain will catch any error created within the chain. This omits the basic need for try/catch/next in controllers.

```js
// app.js
app.get("/", (req, res) => {
  console.log("Hello world!");
  throw new Error("Oh no!");
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

Instead of:

```js
// app.js
app.get("/", (req, res, next) => {
  try {
    console.log("Hello world!");
    throw new Error("Oh no!");
  } catch (error) {
    next();
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

## TypeScript Configuration

### Compiling with path aliases

```json
// package.json
{
  "scripts": {
    "dev": "tsc && tsc-alias"
  }
}

// tsconfig.json
{
  "tsc-alias": {
    "resolveFullPaths": true,
    "verbose": false
  }
}
```

### Watching and reloading

**Option 1** - `nodemon`

This option allows for flexible options of `nodemon`, can be set up with just one npm script, and enables you to enter `rs` to restart the server. The example below watches for changes within the `src` folder, any `.json` file (such as dependency changes), and the `.env` file.

```json
// package.json
{
  "scripts": {
    "dev": "nodemon -w src -w *.json -w .env -e ts,js,json --exec \"tsc && tsc-alias && node --env-file=.env dist/app.js\""
  }
}
```

**Option 2** - `tsc-watch`

This option has a cleaner set up and terminal output, but requires two npm scripts due to `tsc-watch`'s inability to run multiple commands within one parameter.

```json
// package.json
{
  "scripts": {
    "dev": "tsc-watch --onSuccess \"npm run dev:start\"",
    "dev:start": "tsc-alias && node --env-file=.env dist/app.js"
  }
}
```
