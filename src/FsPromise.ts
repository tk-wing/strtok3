import * as fs from "fs";

export interface IReadResult {
  bytesRead: number,
  buffer: Buffer
}

/**
 * Convert fs functions to promise based functions
 */
export class FsPromise {

  public pathExists = fs.existsSync;

  public createReadStream = fs.createReadStream;

  public close(fd: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.close(fd, err => {
        if (err)
          reject(err);
        else
          resolve();
      });
    });
  }

  public stat(path: fs.PathLike): Promise<fs.Stats> {
    return new Promise<fs.Stats>((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err)
          reject(err);
        else
          resolve(stats);
      });
    });
  }

  public open(path: fs.PathLike, mode?: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      fs.open(path, mode, (err, fd) => {
        if (err)
          reject(err);
        else
          resolve(fd);
      });
    });
  }

  public read(fd: number, buffer: Buffer, offset: number, length: number, position: number): Promise<IReadResult> {
    return new Promise<IReadResult>((resolve, reject) => {
      fs.read(fd, buffer, offset, length, position, (err, bytesRead, _buffer) => {
        if (err)
          reject(err);
        else
          resolve({bytesRead, buffer: _buffer});
      });
    });
  }

  public writeFile(path: fs.PathLike, data: Buffer | string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(path, data, err => {
        if (err)
          reject(err);
        else
          resolve();
      });
    });
  }

  public writeFileSync(path: fs.PathLike, data: Buffer | string): void {
    fs.writeFileSync(path, data);
  }

  public readFile(path: fs.PathLike): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      fs.readFile(path, (err, buffer) => {
        if (err)
          reject(err);
        else
          resolve(buffer);
      });
    });
  }
}