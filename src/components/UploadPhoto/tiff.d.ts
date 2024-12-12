// tiff.d.ts
declare module 'tiff.js' {
  interface TiffOptions {
    // Add properties here based on tiff.js documentation
    buffer: ArrayBuffer;
  }

  class Tiff {
    constructor(options: TiffOptions);
    toDataURL(): string;
    // Add other methods as needed
  }
  export default Tiff;
}
