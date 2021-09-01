# 機能

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
![CloudDiagram](https://user-images.githubusercontent.com/89893576/131615273-f69901fa-0807-4a0a-b5c2-b22fabd97165.jpg)


## 機能一覧
- ユーザー登録
- 記事投稿
- リクルートAPIによるレストラン検索