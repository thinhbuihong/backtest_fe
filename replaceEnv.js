const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

// Hàm để thay thế các biến dạng ${VAR_NAME} trong template
function replaceEnvVariables(template) {
	return template.replace(/\${(.*?)}/g, (match, variable) => {
		return process.env[variable] || match;  // Thay thế bằng giá trị từ .env hoặc giữ nguyên nếu không tìm thấy
	});
}

// Đọc file template
const template = fs.readFileSync('codegen.sample.yml', 'utf8');

// Thay thế các biến bằng giá trị từ file .env
const output = replaceEnvVariables(template);

// Ghi kết quả ra file mới
fs.writeFileSync('codegen.yml', output);

console.log("Các biến môi trường đã được thay thế thành công ");
