
        const bgm = document.getElementById('bgm');
        const audioBtn = document.getElementById('audioBtn');
        let isPlaying = false;

        // 页面加载时：恢复播放状态 + 恢复播放进度
        window.addEventListener('load', () => {
            // 1. 恢复播放进度（关键：从上次的位置继续播放）
            const lastTime = localStorage.getItem('bgmCurrentTime');
            if (lastTime) {
                bgm.currentTime = parseFloat(lastTime); // 恢复到上次播放的秒数
            }

            // 2. 恢复播放状态
            const playState = localStorage.getItem('bgmPlaying');
            if (playState === 'true') {
                playAudio();
            }
        });

        // 实时记录播放进度（每1秒记录一次，减少性能消耗）
        setInterval(() => {
            if (isPlaying) {
                localStorage.setItem('bgmCurrentTime', bgm.currentTime);
            }
        }, 1000);

        // 播放/暂停逻辑
        audioBtn.addEventListener('click', async () => {
            if (isPlaying) {
                pauseAudio();
            } else {
                await playAudio();
            }
        });

        // 播放函数（优化错误提示）
        async function playAudio() {
            try {
                await bgm.play();
                isPlaying = true;
                audioBtn.textContent = '⏸️';
                localStorage.setItem('bgmPlaying', 'true');
            } catch (err) {
                // 更友好的提示
                audioBtn.textContent = '🔊';
                setTimeout(() => {
                    alert('需要手动允许音频播放哦～点击右上角的音频按钮即可❤️');
                }, 500);
            }
        }

        // 暂停函数
        function pauseAudio() {
            bgm.pause();
            isPlaying = false;
            audioBtn.textContent = '🎵';
            localStorage.setItem('bgmPlaying', 'false');
            // 暂停时也记录最后进度
            localStorage.setItem('bgmCurrentTime', bgm.currentTime);
        }

        // 页面卸载前：记录最终进度和状态
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('bgmPlaying', isPlaying);
            localStorage.setItem('bgmCurrentTime', bgm.currentTime);
        });

        // 监听音频播放结束（循环播放兜底）
        bgm.addEventListener('ended', () => {
            if (isPlaying) {
                bgm.currentTime = 0;
                bgm.play();
            }
        });
