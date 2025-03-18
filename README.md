# 自由研究課題テーマ提案アプリ

概要:

このプロジェクトは、小学校低学年の子供たちを対象とした、自由研究課題のテーマ提案アプリです。いくつかの質問項目に答えていただくことで、AIがその意向に沿った自由研究テーマを提案します。

使用技術
- Next.js
- React
- Firebase
- Tailwind
- TypeScript
- OpenAI
- ESLint

必要条件
- Node.js v22.X 以上
- npm v11.X 以上
- Next.js v14.2 以上

環境構築
1. リポジトリをクローンします。
```bash
git clone https://github.com/daiki0930/ResearchTopic.git
```

2. 依存関係をインストールします。
```bash
npm install
```
3. envファイルを設定します。

使用方法
サーバーを開発モードで起動するには、以下のコマンドを実行します。
```bash
npm run dev
```
WebアプリケーションのURL:
http://localhost:3000


今後の展望:
- 小学生全学年が使えるように精度向上する。

ユーザーからの質問に対する回答の精度を高めるために、質問項目をより具体的かつ詳細にして、AIがよりターゲットに合ったテーマを提案できるようにします。