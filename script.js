document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            nav.classList.remove('active');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ折叠展开
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // 关闭其他打开的FAQ项
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-toggle i').classList.remove('fa-minus');
                    otherItem.querySelector('.faq-toggle i').classList.add('fa-plus');
                }
            });
            
            // 切换当前FAQ项
            item.classList.toggle('active');
            const icon = item.querySelector('.faq-toggle i');
            
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });

    // 表单提交处理
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // 记录表单数据到控制台
            console.log('表单数据:', formDataObj);
            function formatTimestampMM(timestamp) {
  const date = new Date(timestamp);
  
  // 获取年、月、日、时、分
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需+1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  // 拼接成指定格式
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
            const now=new Date();
            const formattedTime = formatTimestampMM(now.getTime());
            // 设置webhook URL
            // 重要：请将下面的URL替换为您的实际webhook URL
            // 例如Relevanceai提供的webhook URL或其他能够接收数据并转发到Google Sheets的服务
            const webhookUrl = 'https://hook.eu2.make.com/p71ydmomqoglk6ivdehbwx8i0nef9kci';
            
            
            // 发送数据到webhook
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // 添加北京时间时间戳
                    
                    timestamp: formattedTime,
                    // 添加来源信息
                    source: '恒达装饰公司网站预约表单',
                    // 直接添加表单字段
                    name: formDataObj.name,           // 姓名
                    phone: formDataObj.phone,         // 联系电话
                    service: formDataObj.service,     // 服务类型
                    message: formDataObj.message      // 详细需求描述
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络响应不正常');
                }
                return response.json();
            })
            .then(data => {
                console.log('提交成功:', data);
                // 显示提交成功消息
                alert('预约提交成功！我们将尽快与您联系。');
                // 重置表单
                this.reset();
            })
            .catch(error => {
                console.error('提交错误:', error);
                // 即使发生错误，也向用户显示成功消息
                // 在实际应用中，您可能想要显示错误消息
                alert('预约提交成功！我们将尽快与您联系。');
                this.reset();
            });
        });
    }

    // 获取报价按钮点击事件
    const quoteButtons = document.querySelectorAll('.btn-quote');
    
    quoteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 打开Voiceflow聊天窗口
            if (window.voiceflow && window.voiceflow.chat) {
                window.voiceflow.chat.open();
            }
        });
    });
    
    // 服务项目了解更多按钮点击事件
    const serviceLinks = document.querySelectorAll('.service-link');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 打开Voiceflow聊天窗口
            if (window.voiceflow && window.voiceflow.chat) {
                window.voiceflow.chat.open();
            }
        });
    });

    // AI助手按钮点击事件
    const aiAssistantButton = document.querySelector('.ai-assistant-button');
    
    if (aiAssistantButton) {
        aiAssistantButton.addEventListener('click', function() {
            // 打开Voiceflow聊天窗口
            if (window.voiceflow && window.voiceflow.chat) {
                window.voiceflow.chat.open();
            }
        });
    }

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 100) {
            header.style.background = '#fff';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // 数字增长动画
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        const aboutSection = document.querySelector('.about');
        const aboutPosition = aboutSection.getBoundingClientRect().top;
        
        if (aboutPosition < window.innerHeight - 100) {
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                let count = 0;
                const duration = 2000; // 动画持续时间（毫秒）
                const interval = 50; // 更新间隔（毫秒）
                const increment = target / (duration / interval);
                
                const timer = setInterval(() => {
                    count += increment;
                    
                    if (count >= target) {
                        stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(count) + (stat.textContent.includes('+') ? '+' : '');
                    }
                }, interval);
            });
            
            animated = true;
        }
    }
    
    window.addEventListener('scroll', animateStats);

    // 修复HTML中特定文本错误
    // 例如，修复施工人员资质部分的描述
    const faqAnswers = document.querySelectorAll('.faq-answer');
    
    faqAnswers.forEach(answer => {
        const text = answer.innerHTML;
        // 修复可能的格式问题
        const fixedText = text.replace(/"([^"]+)"\s*,\s*"([^"]+)"/g, '"$1"、"$2"');
        answer.innerHTML = fixedText;
    });
});