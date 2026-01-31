
        // 1. 动态生成爱心背景
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

        // 2. 问答核心逻辑
        const quizQuestions = [
            {
                question: "我们第一次约会的地方是哪里？",
                options: [
                    { text: "电影院", answer: true  },
                    { text: "公园湖边", answer: false },
                    { text: "图书馆", answer: false }
                ]
            },
            {
                question: "我们最早怎么称呼对方的？",
                options: [
                    { text: "主播", answer: true },
                    { text: "同学", answer: false },
                    { text: "oi，小鬼！", answer: false }
                ]
            },
            {
                question: "我最喜欢和梦梦做什么",
                options: [
                    { text: "一起散步", answer: false },
                    { text: "亲亲抱抱", answer: true },
                    { text: "一起学习", answer: false }
                ]
            }
        ];

        let currentQuestionIndex = 0;
        let correctCount = 0;
        const totalQuestions = quizQuestions.length;

        // 初始化题目
        function initQuestion() {
            const currentQuestion = quizQuestions[currentQuestionIndex];
            document.getElementById('question').textContent = currentQuestion.question;
            
            const optionsContainer = document.getElementById('options');
            optionsContainer.innerHTML = '';
            currentQuestion.options.forEach(option => {
                const btn = document.createElement('button');
                btn.classList.add('option-btn');
                btn.textContent = option.text;
                btn.setAttribute('data-answer', option.answer);
                btn.onclick = checkAnswer;
                btn.disabled = false;
                optionsContainer.appendChild(btn);
            });

            document.getElementById('feedback').textContent = '';
            document.getElementById('nextBtn').style.display = 'none';
        }

        // 3. 彩蛋核心功能
        // 彩蛋1：爱心雨（优化数量+全屏覆盖）
        function showHeartRain() {
            const heartCount = 80; // 爱心数量，可根据需求调整（比如100/120）
            for (let i = 0; i < heartCount; i++) {
                const heart = document.createElement('div');
                heart.classList.add('egg-heart');
                // 随机横向位置（0~100%），确保全屏覆盖
                heart.style.setProperty('--random-left', Math.random());
                // 随机大小（0.3~1.2倍），增加层次感
                heart.style.scale = `${0.3 + Math.random() * 0.9}`;
                // 随机动画延迟（0~1s），让爱心分批下落，更自然
                heart.style.animationDelay = `${Math.random() * 1}s`;
                document.body.appendChild(heart);

                // 动画结束后移除（2s动画+0.2s缓冲，避免DOM堆积）
                setTimeout(() => {
                    heart.remove();
                }, 2200);
            }

            // 随机文字提示
            const tips = ['默契满分💓', '宝贝好棒！', '太懂我啦～', '心有灵犀✨'];
            const randomTip = tips[Math.floor(Math.random() * tips.length)];
            document.getElementById('feedback').textContent = randomTip;

            // 播放彩蛋音效（可选）
            const sound = document.getElementById('eggSound1');
            sound.volume = 0.5;
            sound.play().catch(err => {});
        }

        // 彩蛋2：文字烟花
        function showFirework() {
            const text = '默契升级！🎉';
            const firework = document.createElement('div');
            firework.classList.add('egg-firework');
            firework.textContent = text;
            document.body.appendChild(firework);

            // 1.5秒后移除
            setTimeout(() => {
                firework.remove();
            }, 1500);

            // 移动端震动（100ms）
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }
        }

        // 彩蛋3：终极爱心爆炸+弹窗
        function showFinalEgg() {
            // 1. 爱心爆炸动画
            const burst = document.createElement('div');
            burst.classList.add('egg-final-burst');
            document.body.appendChild(burst);

            // 2. 弹窗
            const modal = document.createElement('div');
            modal.classList.add('final-modal');
            modal.innerHTML = `
                <h2>默契天花板✨</h2>
                <p>我的宝贝也太懂我啦！</p>
                <p>奖励一万个亲亲！</p>
                <button onclick="goToGallery()">查看我们的回忆</button>
            `;
            document.body.appendChild(modal);

            // 3. 音效+震动
            const finalSound = document.getElementById('eggSoundFinal');
            finalSound.volume = 0.5;
            finalSound.play().catch(err => {});

            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100, 50, 100]); // 三次短震动
            }

            // 2秒后自动跳转（也可保留弹窗让用户点击）
            setTimeout(() => {
                goToGallery();
            }, 30000);
        }

        // 跳转至相册页
        function goToGallery() {
            window.location.href = 'gallery.html';
        }

        // 4. 答题判断+彩蛋触发
        function checkAnswer(e) {
            const isCorrect = e.target.getAttribute('data-answer') === 'true';
            const feedback = document.getElementById('feedback');
            
            if (isCorrect) {
                // 避免重复计数
                if (!e.target.classList.contains('correct')) {
                    correctCount++;
                    e.target.classList.add('correct');

                    // 更新进度条
                    const progress = (correctCount / totalQuestions) * 100;
                    document.getElementById('progressBar').style.width = `${progress}%`;
                    document.getElementById('tacitValue').textContent = `${correctCount}/${totalQuestions}题正确`;

                    // 触发彩蛋
                    if (correctCount === 1) {
                        // 第1题答对：爱心雨
                        showHeartRain();
                    } else if (correctCount === 2) {
                        // 第2题答对：爱心雨+文字烟花
                        showHeartRain();
                        setTimeout(() => {
                            showFirework();
                        }, 500);
                    } else if (correctCount === totalQuestions) {
                        // 全答对：终极彩蛋
                        showHeartRain();
                        setTimeout(() => {
                            showFinalEgg();
                        }, 800);
                    }
                }

                // 禁用选项+显示下一题（全答对时不显示，直接触发终极彩蛋）
                if (correctCount < totalQuestions) {
                    const options = document.querySelectorAll('.option-btn');
                    options.forEach(btn => btn.disabled = true);
                    document.getElementById('nextBtn').style.display = 'block';
                }
            } else {
                feedback.textContent = '答错啦～再想想 💓';
                // 答错抖动动画
                e.target.style.animation = 'shake 0.3s ease';
                setTimeout(() => {
                    e.target.style.animation = '';
                }, 300);
            }
        }

        // 下一题
        function nextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                initQuestion();
            } else {
                document.getElementById('quiz').style.display = 'none';
                document.getElementById('blessing').style.display = 'block';
            }
        }

        // 5. 随机情话功能
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

        // 页面加载后执行
        window.onload = function() {
            createHearts();
            initQuestion();
            showRandomMsg();
            setInterval(showRandomMsg, 30000);
        };
