document.addEventListener("DOMContentLoaded", () => {
    // "欲しいものリスト"ボタンを取得
    const wishlistButton = document.getElementById("wishlistButton");
    // 表示するテキスト
    const text = "Hello, Worl\nd!";
    const letters = []; // 文字要素を格納する配列
    let fallingObjects = []; // 落ちるオブジェクトの配列

    // 文字を画面に表示する関数
    function createLetters() {
        // 文字の開始位置
        let startX = window.innerWidth / 2 - (text.length * 50);
        let startY = window.innerHeight / 3;
        text.split("\n").forEach((line, index) => {
            let x = startX;
            line.split("").forEach((char) => {
                const span = document.createElement("span"); // spanタグを作成
                span.textContent = char;
                span.classList.add("letter"); // .letterクラスを追加
                document.body.appendChild(span); // bodyに追加
                span.style.left = `${x}px`; // 文字の位置を設定
                span.style.top = `${startY + index * 160}px`;
                letters.push(span); // 文字要素を配列に追加
                let clickCount = 0;
                // 文字をクリックした時の処理
                span.addEventListener("click", () => {
                    span.style.transform = "scale(1.2) rotate(10deg)"; // クリックで拡大と回転
                    setTimeout(() => span.style.transform = "scale(1) rotate(0)", 100); // 100ms後に元に戻す
                    clickCount++;
                    // クリック回数が一定以上なら文字を落下させる
                    if (clickCount >= Math.floor(Math.random() * 3) + 5) {
                        startFalling(span); // 落下開始
                    }
                });
                x += 160; // 文字を横に並べる
            });
        });
    }

    createLetters(); // 文字の生成

    // "欲しいものリスト"ボタンがクリックされた時の処理
    wishlistButton.addEventListener("click", () => {
        const items = ["女", "金", "薬"]; // 表示するアイテム
        const probabilities = [0.5, 0.4, 0.1]; // アイテムの選択確率
        let choice = Math.random(); // ランダムな選択値
        let selectedItem;
        // アイテムの選択
        for (let i = 0, sum = 0; i < items.length; i++) {
            sum += probabilities[i];
            if (choice <= sum) {
                selectedItem = items[i];
                break;
            }
        }
        const span = document.createElement("span"); // 選ばれたアイテムをspanタグで表示
        span.textContent = selectedItem;
        span.classList.add("letter"); // .letterクラスを追加
        document.body.appendChild(span); // bodyに追加
        span.style.position = "absolute";
        span.style.left = `${wishlistButton.offsetLeft}px`; // ボタンの位置に設定
        span.style.top = `${wishlistButton.offsetTop}px`;
        startFalling(span); // アイテムを落下させる
    });

    // 文字を落下させる処理
    function startFalling(element) {
        let obj = {
            element: element, // 落下する要素
            x: element.offsetLeft, // X座標
            y: element.offsetTop, // Y座標
            vx: (Math.random() - 0.5) * 40, // 水平方向の速度
            vy: (Math.random() - 0.5) * 40, // 垂直方向の速度
            gravity: 0.7, // 重力
            friction: 0.98, // 摩擦
            rotation: 0, // 回転角度
            rotationSpeed: (Math.random() - 0.5) * 15 // 回転速度
        };
        fallingObjects.push(obj); // 落下オブジェクトの配列に追加
        if (fallingObjects.length === 1) startPhysics(); // 最初のオブジェクトなら物理計算を開始
    }

    // 物理計算を開始する関数
    function startPhysics() {
        setInterval(() => {
            for (let i = 0; i < fallingObjects.length; i++) {
                let obj = fallingObjects[i];
                obj.vy += obj.gravity; // 重力を加える
                obj.vx *= obj.friction; // 摩擦を加える
                obj.vy *= obj.friction; // 垂直方向の摩擦を加える
                obj.rotation += obj.rotationSpeed; // 回転を更新
                obj.x += obj.vx; // X座標を更新
                obj.y += obj.vy; // Y座標を更新
                
                // 地面に当たった時の処理
                if (obj.y + obj.element.clientHeight >= window.innerHeight) {
                    obj.y = window.innerHeight - obj.element.clientHeight;
                    obj.vy *= -0.8; // 弾む
                }
                // 画面の端に当たった時の処理
                if (obj.x <= 0 || obj.x + obj.element.clientWidth >= window.innerWidth) {
                    obj.vx *= -1; // 水平方向に反転
                }
                // 他の落下オブジェクトと衝突した時の処理
                for (let j = 0; j < fallingObjects.length; j++) {
                    if (i !== j) {
                        let other = fallingObjects[j];
                        let dx = other.x - obj.x;
                        let dy = other.y - obj.y;
                        let distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < 100) { // 衝突判定
                            let angle = Math.atan2(dy, dx);
                            let force = 20;
                            obj.vx -= Math.cos(angle) * force; // 水平方向に力を加える
                            obj.vy -= Math.sin(angle) * force; // 垂直方向に力を加える
                            other.vx += Math.cos(angle) * force; // 相手に反対方向の力を加える
                            other.vy += Math.sin(angle) * force; // 相手に反対方向の力を加える
                        }
                    }
                }
                // 位置と回転を更新
                obj.element.style.left = obj.x + "px";
                obj.element.style.top = obj.y + "px";
                obj.element.style.transform = `rotate(${obj.rotation}deg)`;
            }
        }, 16); // 約60FPSで物理演算を実行
    }
});
