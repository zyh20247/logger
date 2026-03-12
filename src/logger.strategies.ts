import { LogEntry, LogOutputStrategy } from './logger.types';

/**
 * 控制台输出策略
 * 当前默认实现，直接输出到浏览器 Console。
 */
export class ConsoleOutputStrategy implements LogOutputStrategy {
  write(entry: LogEntry): void {
    const logMessage = `[${entry.timestamp}] [${entry.levelName}] ${entry.message}`;
    
    switch (entry.level) {
      case 'VERBOSE': console.log(logMessage); break;
      case 'INFO': console.info(logMessage); break;
      case 'WARNING': console.warn(logMessage); break;
      case 'ERROR': console.error(logMessage); break;
    }
  }
}

/**
 * [扩展功能] 文件输出策略 (模拟)
 * 未来扩展至写入文件的可能性。
 * 
 */
export class FileOutputStrategy implements LogOutputStrategy {
  private filePath: string;

  constructor(filePath: string = './logs/app.log') {
    this.filePath = filePath;
  }

  write(entry: LogEntry): void {
    const logLine = `${JSON.stringify(entry)}\n`;
    NativeFileWriteSync(this.filePath, logLine);
  }
}

/**
 * 模拟
 */
function NativeFileWriteSync(filePath: string, buffer: string): void {
  console.groupCollapsed(`[File IO Mock] Writing to ${filePath}`);
  console.log(buffer.trim());
  console.groupEnd();
}