-- Trigger cập nhật trường updateAt là thời gian hiện tại mỗi khi một bản ghi được cập nhật trong bảng
CREATE FUNCTION update_updateAt_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updateAt" := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- User
CREATE TRIGGER User_updateAt
BEFORE UPDATE ON "User"
FOR EACH ROW
EXECUTE FUNCTION update_updateAt_column();

-- CV
CREATE TRIGGER CV_updateAt
BEFORE UPDATE ON "CV"
FOR EACH ROW
EXECUTE FUNCTION update_updateAt_column();

-- Company
CREATE TRIGGER Company_updateAt
BEFORE UPDATE ON "Company"
FOR EACH ROW
EXECUTE FUNCTION update_updateAt_column();

-- Recruitment
CREATE TRIGGER Recruitment_updateAt
BEFORE UPDATE ON "Recruitment"
FOR EACH ROW
EXECUTE FUNCTION update_updateAt_column();

-- Recruitment_Information
CREATE TRIGGER Recruitment_Information_updateAt
BEFORE UPDATE ON "Recruitment_Information"
FOR EACH ROW
EXECUTE FUNCTION update_updateAt_column();

-- Conversation
CREATE TRIGGER Conversation_updateAt
BEFORE UPDATE ON "Conversation"
FOR EACH ROW
EXECUTE FUNCTION update_updateAt_column();

-- Conversation_Messages
CREATE TRIGGER Conversation_Messages_updateAt
BEFORE UPDATE ON "Conversation_Messages"
FOR EACH ROW
EXECUTE FUNCTION update_updateAt_column();

-- CV_Services
CREATE TRIGGER CV_Services_updateAt
BEFORE UPDATE ON "CV_Services"
FOR EACH ROW
EXECUTE FUNCTION update_updateAt_column();

-- Recruitment_Services
CREATE TRIGGER Recruitment_Services_updateAt
BEFORE UPDATE ON "Recruitment_Services"
FOR EACH ROW
EXECUTE FUNCTION update_updateAt_column();

-- Order
CREATE TRIGGER Order_updateAt
BEFORE UPDATE ON "Order"
FOR EACH ROW
EXECUTE FUNCTION update_updateAt_column();