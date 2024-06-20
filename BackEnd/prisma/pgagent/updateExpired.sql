-- Update Recruitment and User_ServiceUsing when expired time < present time

-- Step
CALL public.update_expired_time()

-- Schedule
Every Month, Date, Hours, Minutes