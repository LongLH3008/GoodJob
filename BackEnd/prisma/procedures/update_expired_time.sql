CREATE OR REPLACE PROCEDURE update_expired_time()
LANGUAGE plpgsql
AS $$
BEGIN
    -- Cập nhật trạng thái hồ sơ tuyển dụng thành 'Expired' nếu ngày kết thúc đã qua hiện tại
    UPDATE "Recruitment" SET recr_status = 'Expired' WHERE "end" < NOW();

    -- Cập nhật bản ghi trong bảng "User_ServiceUsing"
    UPDATE "User_ServiceUsing"  SET "expiredTime" = NULL,
        recr_service_id = CASE WHEN cv_service_id IS NOT NULL THEN recr_service_id ELSE 1 END,
        cv_service_id = CASE WHEN recr_service_id IS NOT NULL THEN cv_service_id ELSE 1 END
    WHERE "expiredTime" < NOW();
END $$;
