# ReCo

<img width="1355" alt="top_logo" src="https://user-images.githubusercontent.com/40557348/67154715-26706c00-f33c-11e9-88f7-f59830638304.png">

[![ReCo](image.png)](https://www.youtube.com/embed/IUudbtRc7Sk)

## 製品概要
### 会話 Tech

### 背景（製品開発のきっかけ、課題等）
人とコミュニケーションを取ったとき「うまくいったorうまくいかなかった」と漠然と思い返すことが多々ある

一方的に話し過ぎていなかっただろうか、しっかり会話のキャッチボールができていただろうか、どんな話題で盛り上がっていただろうか...
しかし、コミュニケーションスキルを磨きたいと感じたとして、過去の会話を逐一思い返すのは困難なのが現状である

感覚でしか感じることができない「うまくいったorうまくいかなかった」を可視化・俯瞰することができれば、自分のコミュニケーションスキルアップにつなげることができるのではないだろうか

そんな思いを込めたプロダクトを作りました

### 製品説明（具体的な製品の説明）
#### 使い方
```
1. 会話を録音して、ReCoにアップロードする
2. Recoが会話を分析し、様々なデータを可視化する
3. データを元に自分のコミュニケーションを振り返ろう!!
```

#### ReCoが分析するデータ
- それぞれの会話のログ
- これまでの会話全てを統合したログ

#### ReCoが可視化するデータ
- **盛り上がり度**
  - 会話の間や発話率などから独自のアルゴリズムで盛り上がり度を測定
  - 会話を10のフェイズに分割し、時系列データとして盛り上がりを見ることができる
  
  <img width="1071" alt="scores" src="https://user-images.githubusercontent.com/40557348/67154564-55391300-f339-11e9-9f24-e0e82c3e3839.png">
  
- **間の割合**
  - 間がどれだけあったかを測定
  - 間が多いということは気まずいということ!?
  
  <img width="206" alt="active" src="https://user-images.githubusercontent.com/40557348/67154563-54a07c80-f339-11e9-970b-59842231df79.png">
  
- **会話の支配率**
  - 自分と相手がどれだけ発言していたかを測定
  - どちらかに偏っているということは盛り上がっていないということ!?
  
  <img width="195" alt="dominate" src="https://user-images.githubusercontent.com/40557348/67154562-54a07c80-f339-11e9-85d7-9ac651001fd8.png">
  
- **トピック**
  - 特に盛り上がったタイミングで話していた話題を測定
  - 自分や相手の得意な話題や好きな話題が見えてくるかも!?
  
  <img width="757" alt="topic" src="https://user-images.githubusercontent.com/40557348/67154561-5407e600-f339-11e9-8b8e-078782de2355.png">
  
### 特長
#### 1. コミュニケーションにおける、自分の弱みと強みが分かる
会話において盛り上がる切り札や会話の支配率、間の割合を俯瞰することができる
#### 2. 自らのコミュニケーションを向上させる手がかりになる
個々の会話の分析結果と会話全体の分析結果を参照できるため、コミュニケーションスキル向上のための手がかりになる


### 解決出来ること
感覚でしか感じることができない、コミュニケーションのうまくいったorうまくいかなかったを可視化させ、復習することにより
自分のコミュニケーションスキルアップが可能となる

### 今後の展望
- デプロイできる形にする
  - 現状はローカルホスト上で動かしている
  - ユーザー認証やログファイルのDBへの移行、レスポンスの高速化などが課題として残っている
- ネイティブアプリ化
  - 「録音する」という機能の性質上、Webアプリでは少し使いづらい
  - ネイティブアプリ化することで録音してそのままアップデートすることができる

## 開発内容・開発技術
### 活用した技術

#### システム概観
<img src="https://user-images.githubusercontent.com/25533384/67153558-7cd2b000-f326-11e9-9fab-32432d1f158f.png" width="320px">

#### API・データ
* IBM Speech-To-Text API

#### フレームワーク・ライブラリ・モジュール
* Webサーバ: Flask
* グラフ描画: Chart.js

### 独自開発技術（Hack Dayで開発したもの）
#### 2日間に開発した独自の機能・技術
* 会話の盛り上がり度を独自のアルゴリズムで測定
  * 間の長さや発話者の割合からスコアを算出
* 会話ごと( `/log/{id}` )とこれまでの会話( `/overview` )の2種類のログを可視化
  * 個別にその日の会話を振り返ってもよし
  * これまでの会話を俯瞰してもよし

