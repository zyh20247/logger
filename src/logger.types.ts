
export type LogLevelType = 'VERBOSE' | 'INFO' | 'WARNING' | 'ERROR';

export const LogLevel = {
  VERBOSE: 'VERBOSE' as LogLevelType,
  INFO: 'INFO' as LogLevelType,
  WARNING: 'WARNING' as LogLevelType,
  ERROR: 'ERROR' as LogLevelType,
} as const;

export interface LogEntry {
  timestamp: string;
  level: LogLevelType;
  levelName: string;
  message: string;
  rawData?: any;
}

/**
 * 输出策略接口
 * 设计理念：通过接口隔离，使得 Logger 不依赖具体输出方式，方便未来扩展。
 */
export interface LogOutputStrategy {
  write(entry: LogEntry): void;
}