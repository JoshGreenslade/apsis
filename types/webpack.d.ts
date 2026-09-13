declare namespace NodeJS {
  interface Require {
    context(
      path: string,
      recursive: boolean,
      filter: RegExp,
      mode: "lazy",
    ): unknown;
  }
}
