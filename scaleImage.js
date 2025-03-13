document.addEventListener("DOMContentLoaded", () => {
    // 画像要素を作成
    const img = document.createElement("img");
    img.src = "542578724676042967.png";  // 画像ファイルのパス
    img.alt = "拡大縮小する画像";
    img.style.position = "absolute";
    img.style.left = "0";  // 画面の左側に配置
    img.style.top = "10%";  // 上部に近い位置に設定
    img.style.transformOrigin = "center";  // 拡大・縮小の中心を画像の中心に設定
    img.style.transition = "transform 1s ease-in-out";  // 拡大縮小のスムーズなトランジション

    document.body.appendChild(img);  // 画像をページに追加

    // 「創造主」のテキストを作成
    const text = document.createElement("div");
    text.textContent = "創造主";
    text.style.position = "absolute";
    text.style.left = "0";
    text.style.top = "70%";  // 位置をさらに下げた（10%から70%に変更）
    text.style.fontSize = "150px";
    text.style.fontFamily = "Arial, sans-serif";
    text.style.textAlign = "center";
    text.style.color = "white";
    text.style.fontWeight = "bold";
    text.style.zIndex = "10";  // 画像の上に表示されるように設定
    text.style.animation = "colorChange 3s infinite alternate";  // 色のアニメーション

    document.body.appendChild(text);  // テキストをページに追加

    let scale = 1;  // 拡大縮小の初期値

    // 拡大縮小を繰り返す関数
    function scaleImage() {
        scale = (scale === 1) ? 1.5 : 1;  // 拡大と縮小を交互に切り替える
        img.style.transform = `scale(${scale})`;  // 画像のスケールを変更
    }

    // 1秒ごとに拡大縮小を繰り返す
    setInterval(scaleImage, 1000);
});
