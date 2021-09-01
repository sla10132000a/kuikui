# DiShare

レストラン検索。コメント投稿webアプリケーション。

# 特徴
- ### インフラ面
  - EKSで構築。Terraform使用。
  - 開発minikube、skaffold
- ### バックエンド面
  - GraphQL(Rails)
  - 認証(devise)
  - 外部API（リクルートAPI）を利用。
- ### フロントエンド面
  - Next.js、react-query、axiosを使用

# クラウドアーキテクチャー
![cloud-map](https://user-images.githubusercontent.com/49737864/84779262-23d72b00-b01f-11ea-8e2c-9347f31a07a7.png)

## 機能一覧
- ユーザー登録
- 記事投稿
- リクルートAPIによるレストラン検索