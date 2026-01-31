
        // 1. 生成动态爱心背景
        function createHearts() {
            const heartsContainer = document.getElementById('hearts');
            const heartCount = Math.min(50, Math.floor(window.innerWidth / 10));
            for (let i = 0; i < heartCount; i++) {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.style.left = `${Math.random() * 100}vw`;
                heart.style.top = `${Math.random() * 100}vh`;
                heart.style.animationDelay = `${Math.random() * 5}s`;
                heart.style.scale = `${0.5 + Math.random()}`;
                heartsContainer.appendChild(heart);
            }
        }

        // 2. 正计时功能（修改这里的startDate为你们的纪念日）
        function updateTimer() {
            const startDate = new Date(2025, 11, 26); // 格式：年, 月(0-11), 日
            const now = new Date();
            const diff = now - startDate;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }

        // 3. 随机情话
        const loveMsgs = [
           "今天比昨天更爱梦梦一点！❤️",
            "你的笑容是我的小太阳～",
            "可不可以一直和梦梦贴贴",
            "想和你吃好多好多顿饭",
            "你是我藏在微风里的喜欢",
            "要和梦梦亲亲一整天！✨",
            "要和梦梦去很多很多地方💓",
            "你是我所有温柔的来源和归属🌷",
            "三餐四季，只想和你共度🍚",
            "想趴在梦梦身上睡觉觉！🌙",
            "梦梦要亲我一万口！",
            "梦梦说亲亲是奖励诶嘿嘿",
            "每天都要和梦梦碎碎念💓",
            "最爱你啦我的梦梦！"
        ];
        function showRandomMsg() {
            const msg = loveMsgs[Math.floor(Math.random() * loveMsgs.length)];
            document.getElementById('randomMsg').textContent = msg;
        }

        // 4. 心愿树核心逻辑（最多6个心愿）
        // 6个对称树叶的位置（左3+右3）
        const leafPositions = [
            { x: 20, y: 90 }, { x: 10, y: 110 }, { x: 30, y: 80 }, // 左
            { x: 180, y: 90 }, { x: 190, y: 110 }, { x: 170, y: 80 }  // 右
        ];

        // 加载心愿并渲染树叶/卡片/果实
        function loadWishes() {
            const wishes = JSON.parse(localStorage.getItem('loveWishes')) || [];
            const wishCardsContainer = document.getElementById('wishCards');
            const treeWrapper = document.getElementById('treeWrapper');
            
            // 清空现有树叶
            const existingLeaves = document.querySelectorAll('.tree-leaf');
            existingLeaves.forEach(leaf => leaf.remove());

            // 渲染心愿卡片
            wishCardsContainer.innerHTML = '';
            if (wishes.length === 0) {
                wishCardsContainer.innerHTML = `<div style="text-align: center; color: #999; padding: 10px; width: 100%;">还没有添加心愿哦～点击按钮种下第一片叶子吧❤️</div>`;
            } else {
                wishes.forEach((wish, index) => {
                    const wishCard = document.createElement('div');
                    wishCard.className = 'wish-card';
                    wishCard.innerHTML = `
                        <button class="delete-wish-btn" onclick="deleteWish(${index})">×</button>
                        <p class="wish-text">${wish.text}</p>
                        <p class="wish-time">${wish.time}</p>
                    `;
                    wishCardsContainer.appendChild(wishCard);
                });
            }

            // 渲染树的状态：3个心愿显示分枝，6个心愿显示果实
            const wishCount = wishes.length;
            const mainBranches = document.querySelectorAll('.tree-main-branch');
            const subBranches = document.querySelectorAll('.tree-sub-branch');
            const dots = document.querySelectorAll('.canopy-dot');

            // 3个及以上心愿显示分枝
            if (wishCount >= 3) {
                mainBranches.forEach(branch => branch.style.display = 'block');
                subBranches.forEach(branch => branch.style.display = 'block');
            } else {
                mainBranches.forEach(branch => branch.style.display = 'none');
                subBranches.forEach(branch => branch.style.display = 'none');
            }

            // 6个心愿显示所有果实
            if (wishCount >= 6) {
                dots.forEach(dot => dot.style.display = 'block');
            } else {
                dots.forEach(dot => dot.style.display = 'none');
            }

            // 生成对称树叶（有多少心愿就显示多少片，最多6片）
            wishes.forEach((wish, index) => {
                if (index >= leafPositions.length) return;
                const leaf = document.createElement('div');
                leaf.classList.add('tree-leaf');
                const treeWidth = treeWrapper.offsetWidth;
                const scaleRatio = treeWidth / 200; // 基准宽度适配
                leaf.style.left = `${leafPositions[index].x * scaleRatio}px`;
                leaf.style.bottom = `${leafPositions[index].y * scaleRatio}px`;
                // 对称旋转（左叶右偏，右叶左偏）
                const rotateAngle = index < 3 ? Math.random() * 20 : -Math.random() * 20;
                leaf.style.transform = `rotate(${rotateAngle}deg)`;
                treeWrapper.appendChild(leaf);
            });
        }

        // 添加心愿（限制6个）
        function addWish() {
            const wishInput = document.getElementById('wishInput');
            const wishText = wishInput.value.trim();
            if (!wishText) {
                showTip('请输入心愿内容～');
                return;
            }

            const wishes = JSON.parse(localStorage.getItem('loveWishes')) || [];
            if (wishes.length >= 6) {
                showTip('心愿树已满啦❤️ 最多可添加6个心愿哦～');
                wishInput.value = '';
                return;
            }

            wishes.push({
                text: wishText,
                time: new Date().toLocaleString('zh-CN', { 
                    year: 'numeric', month: 'short', day: 'numeric', 
                    hour: '2-digit', minute: '2-digit' 
                })
            });
            localStorage.setItem('loveWishes', JSON.stringify(wishes));
            wishInput.value = '';
            loadWishes();
            showTip('心愿已种下✨');
        }

        // 删除心愿
        function deleteWish(index) {
            const wishes = JSON.parse(localStorage.getItem('loveWishes')) || [];
            wishes.splice(index, 1);
            localStorage.setItem('loveWishes', JSON.stringify(wishes));
            loadWishes();
            showTip('心愿已移除💧');
        }

        // 显示提示
        function showTip(text) {
            const tip = document.createElement('div');
            tip.className = 'wish-tip';
            tip.textContent = text;
            document.body.appendChild(tip);
            // 1.5秒后移除提示
            setTimeout(() => {
                document.body.removeChild(tip);
            }, 1500);
        }

        // 初始化所有功能
        function init() {
            createHearts();       // 生成爱心背景
            updateTimer();        // 初始化计时
            setInterval(updateTimer, 1000); // 每秒更新计时
            showRandomMsg();      // 初始化情话
            setInterval(showRandomMsg, 30000); // 30秒换一次情话
            loadWishes();         // 加载心愿
        }

        // 页面加载完成后初始化
        window.onload = init;
