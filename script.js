'use strict';

// 入力するtextの配列
const texts = [
  "<",
  ">",
  // "`",
  // '"',
  // "!",
  // "}",
  // "{",
  // "$",
  // ",",
  // ".",
  // "=",
  // "(",
  // ")",
  // "*",
  // "-",
  // "_",
  // "/",
  // ";",
  // ":",
  // "[",
  // "]",
  // "+",
  // "'",
  // "%",
  // "#",
  // "&",
];

const target = document.getElementById('target');
const buttonStart = document.getElementById("btnStart");
const buttonReset = document.getElementById("btnReset");
const result = document.getElementById('result');
const result2 = document.getElementById('result2');

let text = "";
let startTime;

// texts配列からランダムなtextを選択し、表示させて、配列から削除する関数
function makeText() {
  const randomIndex = Math.floor(Math.random() * texts.length);
  text = texts[randomIndex];
  target.innerText = text;
  texts.splice(randomIndex, 1)
}


// Startボタンが押された時の処理
let isGaming = false;
buttonStart.addEventListener('click', () => {
  // 既にゲーム中ならStartボタンを押しても何もしない
  if (isGaming === true) {
    return;
  }
  // ゲーム中ではない時はStartボタンでゲームを開始し、現在時刻の取得とmakeTextを実行
  isGaming = true;
  startTime = Date.now();
  makeText();
});

// Resetボタンが押された時の処理
buttonReset.addEventListener("click", () => {
  // ページをリロードする
  location.reload();
});


// キーが押された時の処理
document.addEventListener('keydown', handleKekydown);

function handleKekydown(event) {
  // タイプされたキーと違ったら何もしない
  if (event.key !== text) {
    return;
  }
  //全てのtexts配列の要素が表示された時の処理
  if (texts.length === 0) {
    target.textContent = 'Finish';
    // 経過時間を計算して表示する
    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
    result.textContent = `${elapsedTime} 秒!`;
    // 経過時間に応じたコメントを表示する
    if (elapsedTime <= 20) {
      result2.textContent = '神やん!';
    } else if (elapsedTime <= 30) {
      result2.textContent = 'まぁまぁ!';
    } else {
      result2.textContent = '調子悪い?';
    }
    return;
  }
  // タイプされたキーが正解なら次のテキストを表示させる
  makeText();
};
