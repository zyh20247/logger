import { LogLevelType, LogLevel, LogEntry, LogOutputStrategy } from './logger.types';
import { ConsoleOutputStrategy } from './logger.strategies';

// 辅助函数：获取优先级数值 
const getLevelPriority = (level: LogLevelType): number => {
  switch (level) {
    case 'VERBOSE': return 0;
    case 'INFO': return 1;
    case 'WARNING': return 2;
    case 'ERROR': return 3;
    default: return 1;
  }
};

export class Logger {
  private currentLevel: LogLevelType;
  private outputStrategy: LogOutputStrategy;

  constructor(
    level: LogLevelType = LogLevel.INFO, 
    strategy: LogOutputStrategy = new ConsoleOutputStrategy()
  ) {
    this.currentLevel = level;
    this.outputStrategy = strategy;
  }

  public setLevel(level: LogLevelType): void {
    this.currentLevel = level;
  }

  private log(level: LogLevelType, message: any): void {
    // 级别过滤逻辑
    if (getLevelPriority(level) < getLevelPriority(this.currentLevel)) {
      return;
    }

    // 数据序列化
    let formattedMessage: string;
    if (typeof message === 'object' && message !== null) {
      try {
        formattedMessage = JSON.stringify(message);
      } catch (e) {
        formattedMessage = '[Stringify Error]';
      }
    } else {
      formattedMessage = String(message);
    }

    // 构建条目并委托输出
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      levelName: level, 
      message: formattedMessage,
      rawData: message
    };

    this.outputStrategy.write(entry);
  }

  verbose(message: any): void { this.log(LogLevel.VERBOSE, message); }
  info(message: any): void { this.log(LogLevel.INFO, message); }
  warning(message: any): void { this.log(LogLevel.WARNING, message); }
  error(message: any): void { this.log(LogLevel.ERROR, message); }
}