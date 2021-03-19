import { HttpStatus } from '@nestjs/common';

export const AppHttpExceptions = {
  USER_NOT_FOUND: {
    statusCode: HttpStatus.NOT_FOUND,
    code: 'USER_NOT_FOUND',
    message: 'Không tìm thấy người dùng',
  },
  VERIFY_TRANSPORTER_ERROR: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'VERIFY_TRANSPORTER_ERROR',
    message: 'Không thể xác thực transporter. Vui lòng thử lại',
  },
  ORDER_ALREADY_CONFIRM: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'ORDER_ALREADY_CONFIRM',
    message: 'Đơn hàng đã được xác nhận.',
  },
  USER_NOT_ENROLL_COURSE: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'USER_NOT_ENROLL_COURSE',
    message: 'Người dùng chưa tham gia khoá học',
  },
  USER_ALREADY_ENROLL_COURSE: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'USER_ALREADY_ENROLL_COURSE',
    message: 'Người dùng đã tham gia khoá học',
  },
  EMAIL_ALREADY_EXIST: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'EMAIL_ALREADY_EXIST',
    message: 'Email đã được sử dụng',
  },
  INCORRECT_CREDENTIAL: {
    statusCode: HttpStatus.UNAUTHORIZED,
    code: 'INCORRECT_CREDENTIAL',
    message: 'Tên đăng nhập hoặc mật khẩu không đúng',
  },
  SESSION_QUIZ_NOT_FOUND: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'SESSION_QUIZ_NOT_FOUND',
    message: 'Không tìm thấy bài quiz',
  },
  ALREADY_PASS_QUIZ: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'ALREADY_PASS_QUIZ',
    message: 'Bạn đã vượt qua bài quiz này',
  },
  SECTION_ITEM_NOT_QUIZ: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'SECTION_ITEM_NOT_QUIZ',
    message: 'Bài học không phải dạng quiz',
  },
  SECTION_ITEM_NOT_FOUND: {
    statusCode: HttpStatus.NOT_FOUND,
    code: 'SECTION_ITEM_NOT_FOUND',
    message: 'Không tìm thấy bài học',
  },
  SESSION_EXAM_NOT_FOUND: {
    statusCode: HttpStatus.NOT_FOUND,
    code: 'SESSION_EXAM_NOT_FOUND',
    message: 'Không tìm thấy bài kiểm tra',
  },
  SESSION_EXAM_IS_SUBMITTED: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'SESSION_EXAM_IS_SUBMITTED',
    message: 'Bài kiểm tra đã được nộp',
  },
  SUBMIT_LIMITED: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'SUBMIT_LIMITED',
    message: 'Số lần nộp đã đạt giới hạn',
  },
  INVALID_SECTION_TYPE: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'INVALID_SECTION_TYPE',
    message: 'Loại bài học không hợp lệ',
  },
  USER_SECTION_NOT_FOUND: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'USER_SECTION_NOT_FOUND',
    message: 'Không tìm thấy bài học của người dùng',
  },
  LESSON_NOT_FOUND: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'LESSON_NOT_FOUND',
    message: 'Không tìm thấy bài học',
  },
  EXAM_QUESTION_CATEGORY_EXIST: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'EXAM_QUESTION_CATEGORY_EXIST',
    message: 'Danh mục câu hỏi đã tồn tại',
  },
  NOT_ENOUGH_QUESTION: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'NOT_ENOUGH_QUESTION',
    message: 'Số lượng câu hỏi trong kho không đủ',
  },
  CANNOT_DELETE_SECTION: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'CANNOT_DELETE_SECTION',
    message: 'Không thể xóa bài học này',
  },
  NO_LAST_SESSION_EXAM_FOUND: {
    statusCode: HttpStatus.NOT_FOUND,
    code: 'NO_LAST_SESSION_EXAM_FOUND',
    message: 'Không tìm thấy bài kiểm tra cuối cùng của user',
  },
  COURSE_EXAM_EXIST: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'COURSE_EXAM_EXIST',
    message: 'Đề thi đã tồn tại trong khóa học',
  },
  INCORRECT_CURRENT_PASSWORD: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'INCORRECT_CURRENT_PASSWORD',
    message: 'Mật khẩu hiện tại không đúng',
  },
  RESET_REQUEST_EXPIRED: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'RESET_REQUEST_EXPIRED',
    message: 'Yêu cầu đặt lại mật khẩu đã hết hạn',
  },
  PROGRESS_RANGE_IS_NOT_DEFINED: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'PROGRESS_RANGE_IS_NOT_DEFINED',
    message: 'Khoảng thống kê chưa xác định',
  },
  ACCESS_DENIED: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'ACCESS_DENIED',
    message: 'Không có quyền truy cập',
  },
  USER_HAS_UPDATED_THE_EXAM: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'USER_HAS_UPDATED_THE_EXAM',
    message: 'Nhân viên đã sửa bài làm, vui lòng kiểm tra lại.',
  },
  SESSION_EXAM_IS_REVIEWED: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'SESSION_EXAM_IS_REVIEWED',
    message: 'Bài kiểm tra đã được chấm',
  },
  COMPANY_NOT_HAS_ACADEMY_ADMIN: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'COMPANY_NOT_HAS_ACADEMY_ADMIN',
    message: 'Doanh nghiệp này không có academy admin',
  },
  FORUM_SEEN_ALREADY_EXIST: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'FORUM_SEEN_ALREADY_EXIST',
    message: 'Người dùng đã xem bài viết',
  },
  FORUM_LIKE_ALREADY_EXIST: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'FORUM_LIKE_ALREADY_EXIST',
    message: 'Người dùng đã like bài viết',
  },
};
