// アニメーションとインタラクティブな要素を追加するスクリプト
document.addEventListener('DOMContentLoaded', function() {
    // カードのホバーエフェクトを強化
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.classList.add('fa-beat');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.classList.remove('fa-beat');
            }
        });
    });

    // ランダムな背景グラデーションアニメーション
    function updateGradient() {
        const colors = [
            '#034159', // color-1
            '#025951', // color-2
            '#02735E', // color-3
            '#038C3E', // color-4
            '#0CF25D'  // color-5
        ];
        
        // ランダムに2色を選択
        const randomIndex1 = Math.floor(Math.random() * colors.length);
        let randomIndex2 = Math.floor(Math.random() * colors.length);
        while (randomIndex2 === randomIndex1) {
            randomIndex2 = Math.floor(Math.random() * colors.length);
        }
        
        const color1 = colors[randomIndex1];
        const color2 = colors[randomIndex2];
        
        // グラデーションの角度をランダムに設定
        const angle = Math.floor(Math.random() * 360);
        
        // グラスカードの背景を更新
        const glassCards = document.querySelectorAll('.glass-card');
        glassCards.forEach(card => {
            card.style.background = `linear-gradient(${angle}deg, ${color1}10, ${color2}20)`;
        });
    }
    
    // 定期的に背景グラデーションを更新
    setInterval(updateGradient, 5000);
    updateGradient(); // 初期化時に一度実行
    
    // ハイライト要素のアニメーション
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach((highlight, index) => {
        // 少しずつ遅延させて順番にアニメーションを適用
        setTimeout(() => {
            highlight.style.transition = 'background-position 1s ease';
            highlight.style.backgroundSize = '200% 100%';
            highlight.style.backgroundPosition = 'right bottom';
            
            setTimeout(() => {
                highlight.style.backgroundPosition = 'left bottom';
            }, 500);
        }, index * 200);
    });
    
    // Font Awesomeアイコンのランダムアニメーション
    function randomizeIconAnimations() {
        const icons = document.querySelectorAll('.section-title i, .note i');
        const animations = ['fa-beat', 'fa-bounce', 'fa-fade', 'fa-flip', 'fa-shake', 'fa-spin'];
        
        icons.forEach(icon => {
            // 現在のアニメーションクラスを削除
            animations.forEach(animation => {
                icon.classList.remove(animation);
            });
            
            // ランダムなアニメーションを適用（20%の確率）
            if (Math.random() < 0.2) {
                const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
                icon.classList.add(randomAnimation);
            }
        });
    }
    
    // 定期的にアイコンアニメーションを変更
    setInterval(randomizeIconAnimations, 8000);
    
    // カードに手描き風の線を追加
    function addHandDrawnBorders() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const borderColor = getComputedStyle(card).borderColor;
            card.style.border = 'none';
            
            // SVGパスでランダムな手描き風の線を生成
            const svgNS = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");
            svg.style.position = "absolute";
            svg.style.top = "0";
            svg.style.left = "0";
            svg.style.pointerEvents = "none";
            svg.style.zIndex = "1";
            
            // 上辺
            const topPath = document.createElementNS(svgNS, "path");
            let d = `M 0,3 Q ${card.offsetWidth * 0.2},${Math.random() * 3 - 1.5} ${card.offsetWidth * 0.5},3 T ${card.offsetWidth},3`;
            topPath.setAttribute("d", d);
            topPath.setAttribute("stroke", borderColor);
            topPath.setAttribute("fill", "none");
            topPath.setAttribute("stroke-width", "2");
            
            // 右辺
            const rightPath = document.createElementNS(svgNS, "path");
            d = `M ${card.offsetWidth - 3},0 Q ${card.offsetWidth + Math.random() * 3 - 1.5},${card.offsetHeight * 0.2} ${card.offsetWidth - 3},${card.offsetHeight * 0.5} T ${card.offsetWidth - 3},${card.offsetHeight}`;
            rightPath.setAttribute("d", d);
            rightPath.setAttribute("stroke", borderColor);
            rightPath.setAttribute("fill", "none");
            rightPath.setAttribute("stroke-width", "2");
            
            // 下辺
            const bottomPath = document.createElementNS(svgNS, "path");
            d = `M ${card.offsetWidth},${card.offsetHeight - 3} Q ${card.offsetWidth * 0.8},${card.offsetHeight + Math.random() * 3 - 1.5} ${card.offsetWidth * 0.5},${card.offsetHeight - 3} T 0,${card.offsetHeight - 3}`;
            bottomPath.setAttribute("d", d);
            bottomPath.setAttribute("stroke", borderColor);
            bottomPath.setAttribute("fill", "none");
            bottomPath.setAttribute("stroke-width", "2");
            
            // 左辺
            const leftPath = document.createElementNS(svgNS, "path");
            d = `M 3,${card.offsetHeight} Q ${Math.random() * 3 - 1.5},${card.offsetHeight * 0.8} 3,${card.offsetHeight * 0.5} T 3,0`;
            leftPath.setAttribute("d", d);
            leftPath.setAttribute("stroke", borderColor);
            leftPath.setAttribute("fill", "none");
            leftPath.setAttribute("stroke-width", "2");
            
            svg.appendChild(topPath);
            svg.appendChild(rightPath);
            svg.appendChild(bottomPath);
            svg.appendChild(leftPath);
            
            card.style.overflow = "visible";
            card.appendChild(svg);
        });
    }
    
    // ウィンドウのリサイズ時に手描き風の線を再描画
    window.addEventListener('resize', function() {
        // 既存のSVGを削除
        document.querySelectorAll('.card svg').forEach(svg => svg.remove());
        // 新しい手描き風の線を追加
        setTimeout(addHandDrawnBorders, 300);
    });
    
    // 初期化時に手描き風の線を追加
    setTimeout(addHandDrawnBorders, 500);
});