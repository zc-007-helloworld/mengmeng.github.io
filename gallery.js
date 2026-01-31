
        // 1. 动态生成普通爱心背景（原有）
        function createHearts() {
            const heartsContainer = document.getElementById('hearts');
            const heartCount = 50;
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

        // 2. 移动端触摸事件适配（替代hover）（原有）
        function initTouchEvents() {
            const items = document.querySelectorAll('.gallery-3d-item');
            items.forEach(item => {
                // 触摸开始：添加touched类（触发放大+显示备注）
                item.addEventListener('touchstart', () => {
                    item.classList.add('touched');
                });
                // 触摸结束/离开：移除touched类
                item.addEventListener('touchend', () => {
                    item.classList.remove('touched');
                });
                item.addEventListener('touchmove', (e) => {
                    // 防止触摸滑动时误触发
                    e.preventDefault();
                    item.classList.remove('touched');
                });
            });
        }

        // 3. 3D卡片点击预览功能（原有）
        function initPreview() {
            const carousel = document.getElementById('carousel');
            const previewModal = document.getElementById('previewModal');
            const previewImg = document.getElementById('previewImg');
            const closePreview = document.getElementById('closePreview');

            // 点击3D卡片预览
            carousel.addEventListener('click', (e) => {
                const item = e.target.closest('.gallery-3d-item');
                if (item) {
                    const imgSrc = item.getAttribute('data-img');
                    previewImg.src = imgSrc;
                    previewModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });

            // 关闭预览
            closePreview.addEventListener('click', () => {
                previewModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            // 点击空白处关闭预览
            previewModal.addEventListener('click', (e) => {
                if (e.target === previewModal) {
                    previewModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }

        // 4. 随机情话功能（原有）
        const loveMsgs = [
            "今天比昨天更爱梦梦一点！❤️",
            "你的笑容是我的小太阳～",
            "和你在一起的每一天都很甜",
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

        // 新增：5. 点击生成专属大爱心功能
        function initBigHeart() {
            // 监听页面点击事件
            document.addEventListener('click', (e) => {
                // 避免点击预览弹窗时生成大爱心
                if (e.target.closest('.preview-modal')) return;
                
                // 创建大爱心元素
                const bigHeart = document.createElement('div');
                bigHeart.classList.add('big-heart');
                // 定位到点击坐标（居中：偏移值改为新尺寸的一半，120px/2=60px）
                bigHeart.style.left = `${e.clientX - 60}px`;
                bigHeart.style.top = `${e.clientY - 60}px`;
                
                // 创建爱心文案元素
                const heartText = document.createElement('div');
                heartText.classList.add('heart-text');
                // 随机选一句情话
                const randomText = loveMsgs[Math.floor(Math.random() * loveMsgs.length)];
                heartText.textContent = randomText;
                
                // 组合元素并添加到页面
                const heartsContainer = document.getElementById('hearts');
                heartsContainer.appendChild(bigHeart);
                heartsContainer.appendChild(heartText);
                // 文案跟随大爱心定位
                heartText.style.left = `${e.clientX}px`;
                heartText.style.top = `${e.clientY}px`;
                
                // 3. 延长元素移除时间：从2000ms改为4000ms（和动画时长一致）
                setTimeout(() => {
                    bigHeart.remove();
                    heartText.remove();
                }, 4000);
            });
        }

        // 页面加载后执行（原有+新增）
        window.onload = function() {
            createHearts(); // 原有：普通爱心背景
            initTouchEvents(); // 原有：移动端触摸适配
            initPreview(); // 原有：照片预览
            showRandomMsg(); // 原有：随机情话
            setInterval(showRandomMsg, 30000); // 原有：定时切换情话
            initBigHeart(); // 新增：初始化大爱心功能
        };
