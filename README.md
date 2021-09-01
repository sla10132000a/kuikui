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
![undefined](https://user-images.githubusercontent.com/89893576/131615060-f9f8bac6-cf99-4142-8248-2a34c516ea6b.png)


## 機能一覧
- ユーザー登録
- 記事投稿
- リクルートAPIによるレストラン検索