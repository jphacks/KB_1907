## サーバ構築
1. pipenvを入れる

2. 以下のコマンドを実行

```
pipenv install
pipenv shell #これで仮想環境がactivateされる
```

3. `python app.py` で http://localhost:8000 にサーバが立ち上がる

## DBの話
### マイグレーション
- `Flask-Migrate` を使っている
- 手順としては
  - `docker-compose up` した後に `uwsgi` コンテナに入る
  - `flask db init` （初回のみ)
  - `flask db migrate` (model定義を更新した時のみ)
  - `flask db upgrade` で `models/models.py` に定義したモデルに対応したテーブルが作成されるはず
  - `flask db downgrade` でロールバックもできる
