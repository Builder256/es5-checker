const acorn = require('acorn');
const fs = require('fs');

// 渡されたファイル名
const file = process.argv[2];
const code = fs.readFileSync(file, 'utf8');

// ES5.1のパーサ設定で構文解析
try {
    acorn.parse(code, { ecmaVersion: 5 });
    console.log('✅ ES5.1 構文: OK');
} catch (e) {
    console.error('❌ ES5.1 構文エラー:', e.message);
    // エラーの行番号を取得
    const lineNumber = e.loc.line;
    const columnNumber = e.loc.column;
    console.error(`エラーの位置: ${lineNumber}行目, ${columnNumber}列目`);
    // エラーの行を取得
    const errorLine = code.split('\n')[lineNumber - 1];
    // エラーの行を強調表示
    const highlightedLine = errorLine.slice(0, columnNumber) + '\x1b[31m' + errorLine.slice(columnNumber) + '\x1b[0m';
    console.error(`強調表示: ${highlightedLine}`);

    process.exit(1);
}
