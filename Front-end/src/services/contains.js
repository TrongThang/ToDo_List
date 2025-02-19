const ERROR_CODES = {
    SUCCESS: 0,
    TODO: {
        TODO_NOT_FOUND: -1,
        TITLE_REQUIRED: 1,
        CATEGORY_REQUIRED: 2,
        DEADLINE_OUT_RANGE: 3
    },
    CATEGORIES: {
        NAME_REQUIRED: 1,
        NAME_EXISTED: 2
    }
}

const ERROR_MESSAGES = {
    TODO: {
        [ERROR_CODES.TODO_NOT_FOUND]: "Không tìm thấy ghi chú việc cần làm",
        [ERROR_CODES.TITLE_REQUIRED]: "Tiêu đề của việc cần làm là bắt buộc",
        [ERROR_CODES.CATEGORY_REQUIRED]: "Danh mục là bắt buộc",
        [ERROR_CODES.DEADLINE_OUT_RANGE]: "Thời gian hẹn giờ phải lớn hơn ngày hôm nay!"
    },
    CATEGORIES: {
        [ERROR_CODES.NAME_REQUIRED]: "Tên danh mục là bắt buộc",
        [ERROR_CODES.NAME_EXISTED]: "Tên danh mục đã tồn tại"
    }
}

module.exports = {
    ERROR_CODES,
    ERROR_MESSAGES
};