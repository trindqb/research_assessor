// --- LOGIC MỚI: Xử lý sự kiện click nút ---
document.addEventListener('DOMContentLoaded', function() {
    const scoreButtons = document.querySelectorAll('.score-btn');
    
    scoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const questionId = this.getAttribute('data-question'); 
            const scoreValue = parseInt(this.getAttribute('data-value')); 
            
            // 1. Cập nhật trạng thái "selected" (tạo phản hồi trực quan)
            const parentDiv = document.getElementById(questionId + '_buttons');
            parentDiv.querySelectorAll('.score-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected'); // Dấu vết đã chọn

            // 2. Cập nhật giá trị vào ô ẩn tương ứng
            document.getElementById(questionId + '_score').value = scoreValue;
        });
    });

    // --- LOGIC CŨ ĐƯỢC CHỈNH SỬA: Xử lý Submit Form ---
    document.getElementById('assessmentForm').addEventListener('submit', function(e) {
        e.preventDefault(); 

        const scoreInputs = document.querySelectorAll('#scoresStore input[type="hidden"]');
        let totalScore = 0;

        // 1. Tính Tổng điểm từ các ô ẩn
        scoreInputs.forEach(input => {
            let score = parseInt(input.value);
            // Đảm bảo điểm hợp lệ và cộng vào tổng
            if (!isNaN(score) && score >= 0 && score <= 4) {
                 totalScore += score;
            }
        });

        // 2. Phân loại Cấp độ và Định hướng (Logic này giữ nguyên)
        let levelName = "";
        let guidance = "";

        // Phân loại dựa trên Tổng điểm (Max 40)
        if (totalScore < 10) {
            levelName = "0 - Người Bắt Đầu (The Novice)";
            guidance = "Tập trung vào <strong>Kiến thức Cơ bản</strong> (Phân biệt tạp chí, chỉ số IF/Q) và tìm kiếm <strong>Mentor</strong> cá nhân.";
        } else if (totalScore <= 20) {
            levelName = "1 - Người Học Việc (The Apprentice)";
            guidance = "Tập trung vào <strong>Viết và Công bố Trong nước</strong> (Tạp chí chuyên ngành). Tham gia <strong>Nhóm Viết Bài (Writing Group)</strong>.";
        } else if (totalScore <= 30) {
            levelName = "2 - Người Hành Nghề (The Practitioner)";
            guidance = "Tập trung vào <strong>Chiến lược Công bố Quốc tế (Q4/Q3)</strong> và rèn luyện kỹ năng <strong>phản hồi phản biện</strong> chuyên sâu.";
        } else { // totalScore > 30
            levelName = "3 & 4 - Nhà Lãnh Đạo Nghiên Cứu (The Leader)";
            guidance = "Tập trung vào công bố <strong>Q2/Q1</strong> và <strong>dẫn dắt nhóm nghiên cứu</strong> trẻ hơn, tìm kiếm các dự án/tài trợ lớn.";
        }

        // 3. Hiển thị Kết quả
        document.getElementById('totalScore').textContent = totalScore;
        document.getElementById('levelName').textContent = levelName;
        document.getElementById('guidance').innerHTML = guidance;
        
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.classList.remove('result-hidden');
        
        // Cuộn đến phần kết quả
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    });
});

