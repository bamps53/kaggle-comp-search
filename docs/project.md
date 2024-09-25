```
.
├── backend
│   ├── src
│   │   ├── config # 設定ファイル (データベース接続情報など)
│   │   ├── controllers # API のリクエスト処理
│   │   ├── models # データベースモデル定義 (Prisma)
│   │   ├── routes # API ルーティング
│   │   ├── services # ビジネスロジック (類似度計算など)
│   │   ├── utils # ユーティリティ関数
│   │   └── index.ts # エントリーポイント
│   ├── tests # テストコード
│   └── package.json
├── docs
└── frontend
    ├── public # 静的ファイル (index.html など)
    ├── src
    │   ├── api # バックエンド API との通信
    │   ├── components # 再利用可能な UI コンポーネント
    │   ├── hooks # カスタムフック
    │   ├── pages # 各ページのコンポーネント
    │   ├── store # Zustand を使った状態管理
    │   ├── styles # グローバルなスタイル定義
    │   ├── types # TypeScript の型定義
    │   ├── utils # ユーティリティ関数
    │   ├── App.tsx # アプリケーションのルートコンポーネント
    │   ├── index.tsx # エントリーポイント
    │   └── main.tsx # React のレンダリング
    └── package.json
```
