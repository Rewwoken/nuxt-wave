interface InvokeOptions {
  paths?: string[];
  func: () => boolean;
}

export function notInvoke(path: string, options: InvokeOptions) {
  if (options.paths && options.paths.includes(path)) {
    return true;
  }

  return options.func && options.func();
}
