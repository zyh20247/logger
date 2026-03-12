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
 * 满足任务要求：展示未来扩展至写入文件的可能性。
 * 使用题目要求的模拟函数 NativeFileWriteSync。
 */
export class FileOutputStrategy implements LogOutputStrategy {
  private filePath: string;

  constructor(filePath: string = './logs/app.log') {
    this.filePath = filePath;
  }

  write(entry: LogEntry): void {
    const logLine = `${JSON.stringify(entry)}\n`;
    
    // 调用题目要求的模拟原生 API
    NativeFileWriteSync(this.filePath, logLine);
  }
}

/**
 * 题目要求的模拟原生文件写入 API
 * 在实际浏览器环境中不存在，此处仅作演示。
 */
function NativeFileWriteSync(filePath: string, buffer: string): void {
  // 模拟文件 IO 延迟
  console.groupCollapsed(`[File IO Mock] Writing to ${filePath}`);
  console.log(buffer.trim());
  console.groupEnd();
}