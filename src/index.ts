import { Logger } from './logger';
import { LogLevel } from './logger.types';
import { FileOutputStrategy } from './logger.strategies';

console.log('🚀 === Logger 系统测试开始 ===\n');

// ==========================================
// 场景 1: 默认用法 (控制台输出)
// ==========================================
console.log('--- 场景 1: 默认控制台输出 (INFO 级别) ---');

const consoleLogger = new Logger();

console.log('👉 尝试输出 VERBOSE (应被忽略):');
consoleLogger.verbose('这条是 VERBOSE, 因为当前级别是 INFO, 所以不会输出');

console.log('👉 尝试输出 INFO (应显示):');
consoleLogger.info('这条是 INFO, 正常输出');

console.log('👉 尝试输出 Warning (应显示):');
consoleLogger.warning('这条是 WARNING, 正常输出');

console.log('👉 尝试输出 Error 对象 (应自动序列化):');

consoleLogger.error({ code: 500, message: '这是一个错误对象', details: '数据库连接失败' });

// ==========================================
// 场景 2: 动态修改级别
// ==========================================
console.log('\n--- 场景 2: 动态调整日志级别 ---');

console.log('👉 将级别调整为 VERBOSE:');
consoleLogger.setLevel(LogLevel.VERBOSE);
consoleLogger.verbose('✅ 现在 VERBOSE 也能看到了');

console.log('👉 将级别调整为 ERROR:');
consoleLogger.setLevel(LogLevel.ERROR);
consoleLogger.info('❌ 这条 INFO 被忽略');
consoleLogger.warning('❌ 这条 WARNING 被忽略');
consoleLogger.error('✅ 只有 ERROR 会输出');

// ==========================================
// 场景 3: 扩展用法 (文件输出策略)
// ==========================================

console.log('\n--- 场景 3: 扩展能力演示 (模拟写入文件) ---');
console.log('👉 初始化 Logger 并注入 FileOutputStrategy...');

const fileStrategy = new FileOutputStrategy('./logs/system.log');

const fileLogger = new Logger(LogLevel.INFO, fileStrategy);

console.log('开始记录日志 (观察控制台下方的 [File IO Mock] 折叠项):');
fileLogger.info('用户登录成功 - ID: 1001');
fileLogger.warning('检测到异常访问 IP: 192.168.1.5');
fileLogger.error('支付网关超时 - OrderID: 9527');

console.log('\n🎉 === 所有测试完成 ===');
