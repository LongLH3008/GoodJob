CREATE TYPE "user_type_t" AS ENUM ('Local', 'Google');

CREATE TYPE "user_role_t" AS ENUM ('Administrator', 'Applicant', 'Employer');

CREATE TYPE "user_status_t" AS ENUM ('online', 'offline');

CREATE TABLE "User" (
	"id" uuid NOT NULL,
	"email" varchar(40) NOT NULL,
	"password" varchar(255) NOT NULL,
	"user_type" user_type_t DEFAULT 'Local',
	"user_role" user_role_t DEFAULT 'Applicant',
	"user_status" user_status_t DEFAULT 'offline',
	"check" bit(1) DEFAULT '1',
	"createAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	"updateAt" TIMESTAMPTZ,
	PRIMARY KEY("id")
);

CREATE INDEX "id_email_index"
ON "User" ("id", "email");
CREATE TYPE "social_type_t" AS ENUM ('LinkedIn', 'Facebook', 'Twitter', 'Insta');

CREATE TABLE "User_Social" (
	"id" int NOT NULL DEFAULT AUTOINCREMENT,
	"user_id" uuid NOT NULL,
	"link" varchar(255) NOT NULL,
	"social_type" social_type_t NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "User_Contact" (
	"id" int NOT NULL DEFAULT AUTOINCREMENT,
	"user_id" uuid NOT NULL,
	"city" varchar(255) NOT NULL,
	"district" varchar(255) NOT NULL,
	"detail_address" varchar(255) NOT NULL,
	"phone" varchar(14),
	PRIMARY KEY("id")
);

CREATE TABLE "CV" (
	"id" uuid NOT NULL,
	-- applicant_id = user_id ( người xin việc )
	"applicant_id" uuid NOT NULL,
	"name" varchar(30) NOT NULL,
	"avatar" varchar(255),
	"recommended" bit(1) DEFAULT '0',
	"createAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	"updateAt" TIMESTAMPTZ,
	PRIMARY KEY("id")
);

CREATE INDEX "id_index"
ON "CV" ("id");
CREATE INDEX "applicant_id_index"
ON "CV" ("applicant_id");
CREATE TABLE "Company" (
	"id" uuid NOT NULL,
	-- employer_id = user_id ( người tuyển dụng )
	"employer_id" uuid NOT NULL,
	"name" varchar(40) NOT NULL,
	"establish" varchar(4) NOT NULL,
	"size" int NOT NULL,
	"business" varchar(30) NOT NULL,
	"introduce" varchar(300),
	"taxcode" varchar(255) NOT NULL,
	"license" varchar(255) NOT NULL,
	"check" bit(1) DEFAULT '0',
	"createAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	"updateAt" TIMESTAMPTZ,
	PRIMARY KEY("id")
);

CREATE INDEX "name_id_employer_id_index"
ON "Company" ("name", "id", "employer_id");
CREATE TYPE "gender_t" AS ENUM ('Male', 'Female');

CREATE TYPE "company_role_t" AS ENUM ('Employee', 'Department Manager', 'Director', 'CEO');

CREATE TABLE "User_Information" (
	"id" int NOT NULL DEFAULT AUTOINCREMENT,
	"user_id" uuid NOT NULL,
	"avatar" varchar(255),
	"name" varchar(40) NOT NULL,
	"birth" date NOT NULL,
	"gender" gender_t NOT NULL,
	"company_role" company_role_t DEFAULT 'Employee',
	PRIMARY KEY("id")
);

CREATE TYPE "recr_status_t" AS ENUM ('Expired', 'Recruiting');

CREATE TABLE "Recruitment" (
	"id" uuid NOT NULL,
	"company_id" uuid NOT NULL,
	"job" varchar(14) NOT NULL,
	"position" varchar(14) NOT NULL DEFAULT 'Employee',
	"exp" int NOT NULL,
	"salary" varchar(30) NOT NULL,
	"benefits" varchar(300),
	"describe" varchar(300),
	"require" varchar(300),
	"end" date NOT NULL,
	"workform" varchar(15) NOT NULL,
	"recr_status" recr_status_t DEFAULT 'Recruiting',
	"createAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	"updateAt" TIMESTAMPTZ,
	"recommended" bit(1) DEFAULT '0',
	PRIMARY KEY("id")
);

CREATE INDEX "company_id_id_index"
ON "Recruitment" ("company_id", "id");
CREATE TYPE "edu_level_t" AS ENUM ('Banchelor', 'Master', 'Doctorate', 'Dilopma');

CREATE TABLE "CV_Education" (
	"id" serial NOT NULL,
	"cv_id" uuid,
	"school" varchar(30) NOT NULL,
	"time_from" varchar(7) NOT NULL,
	"time_to" varchar(7) NOT NULL,
	"GPA" float,
	"edu_level" edu_level_t DEFAULT 'Dilopma',
	PRIMARY KEY("id")
);

CREATE TYPE "exp_role_t" AS ENUM ('Employee', 'Manager');

CREATE TABLE "CV_Experience" (
	"id" serial NOT NULL,
	"cv_id" uuid NOT NULL,
	"company" varchar(30) NOT NULL,
	"time_from" varchar(7) NOT NULL,
	"time_to" varchar(7) NOT NULL,
	"exp_role" exp_role_t NOT NULL,
	"describe" varchar(255),
	PRIMARY KEY("id")
);

CREATE TABLE "CV_Skills" (
	"id" serial NOT NULL,
	"cv_id" uuid,
	"name" varchar(15) NOT NULL,
	"describe" varchar(100) NOT NULL,
	PRIMARY KEY("id")
);

CREATE TYPE "recr_info_status_t" AS ENUM ('apporve', 'reject', 'under review');

CREATE TABLE "Recruitment_Information" (
	"id" serial NOT NULL,
	"cv_id" uuid,
	"file_id" uuid,
	"recr_id" uuid NOT NULL,
	"createAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	"updateAt" TIMESTAMPTZ,
	"recr_info_status" recr_info_status_t NOT NULL DEFAULT 'under review',
	PRIMARY KEY("id")
);

CREATE INDEX "cv_id_file_id_recr_id_index"
ON "Recruitment_Information" ("cv_id", "file_id", "recr_id");
CREATE TYPE "ref_role_t" AS ENUM ('Manager', 'Employee', 'CEO', 'Director');

CREATE TABLE "CV_Reference" (
	"id" serial NOT NULL,
	"cv_id" uuid,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"company" varchar(255) NOT NULL,
	"ref_role" ref_role_t NOT NULL DEFAULT 'Manager',
	PRIMARY KEY("id")
);

CREATE TABLE "CV_More" (
	"id" serial NOT NULL,
	"cv_id" uuid NOT NULL,
	"name" varchar(14) NOT NULL,
	"describe" varchar(255) NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "Conversation" (
	"id" serial NOT NULL,
	"starter_userid" uuid NOT NULL,
	"partner_userid" uuid NOT NULL,
	"createAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	"updateAt" TIMESTAMPTZ,
	PRIMARY KEY("id")
);

CREATE INDEX "starter_userid_partner_userid_index"
ON "Conversation" ("starter_userid", "partner_userid");
CREATE TYPE "vote_t" AS ENUM ('Terrible', 'Poor', 'Average','Good', 'Very Good');

CREATE TABLE "Reviews" (
	"id" serial NOT NULL,
	"applicant_id" uuid NOT NULL,
	"company_id" uuid NOT NULL,
	"content" varchar(500),
	"vote" vote_t NOT NULL DEFAULT 'Very Good',
	"createAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	"updateAt" TIMESTAMPTZ NOT NULL,
	PRIMARY KEY("id")
);

CREATE INDEX "applicant_id_company_id_index"
ON "Reviews" ("applicant_id", "company_id");
CREATE TYPE "message_status_t" AS ENUM ('Seen', 'Sended');

CREATE TABLE "Conversation_Messages" (
	"id" serial NOT NULL,
	"conversation_id" int NOT NULL,
	"content" varchar(1000) NOT NULL,
	"sender_id" uuid NOT NULL,
	"message_status" message_status_t NOT NULL DEFAULT 'Sended',
	"createAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	"updateAt" TIMESTAMPTZ,
	PRIMARY KEY("id")
);

CREATE INDEX "conversation_id_sender_id_index"
ON "Conversation_Messages" ("conversation_id", "sender_id");
CREATE TABLE "CV_import" (
	"id" uuid NOT NULL,
	"applicant_id" uuid,
	"file" varchar(255) NOT NULL,
	PRIMARY KEY("id")
);

CREATE INDEX "applicant_id_id_index"
ON "CV_import" ("applicant_id", "id");
CREATE TYPE "cv_service_expired_t" AS ENUM ('One Week', 'Two Week', 'One month', 'Three month', 'No limit');

CREATE TABLE "CV_Services" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" float NOT NULL,
	"discount" int,
	-- Tính theo tuần
	"cv_service_expired" cv_service_expired_t DEFAULT 'No limit',
	"describe" varchar(255) NOT NULL,
	"recommended" int NOT NULL DEFAULT 0,
	"totalCv" int NOT NULL,
	"createAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	"updateAt" TIMESTAMPTZ,
	PRIMARY KEY("id")
);

CREATE TYPE "recr_service_expired_t" AS ENUM ('One Month', 'Three Month', 'Six Month', 'No limit');

CREATE TABLE "Recruitment_Services" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" int NOT NULL,
	"discount" int NOT NULL,
	-- Tính théo tháng
	"recr_service_expired" recr_service_expired_t DEFAULT 'No limit',
	"describe" varchar(255) NOT NULL,
	"recommended" int NOT NULL,
	"totalRecr" int NOT NULL,
	"createAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	"updateAt" TIMESTAMPTZ,
	PRIMARY KEY("id")
);

CREATE TABLE "User_ServiceUsing" (
	"id" serial NOT NULL,
	"recr_service_id" int,
	"cv_service_id" int,
	"expiredAt" TIMESTAMPTZ,
	"user_id" uuid NOT NULL,
	PRIMARY KEY("id")
);

CREATE TYPE "order_status_t" AS ENUM ('Canceled', 'Complete', 'Waiting');

CREATE TABLE "Order" (
	"id" serial NOT NULL,
	"user_id" uuid,
	"order_status" order_status_t DEFAULT 'Waiting',
	"cost" int,
	"createAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	"updateAt" TIMESTAMPTZ,
	"recr_service_id" int,
	"cv_service_id" int,
	PRIMARY KEY("id")
);

CREATE INDEX "user_id_index"
ON "Order" ("user_id");

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

-- User_ServiceUsing
CREATE TRIGGER User_ServiceUsing_updateAt
BEFORE UPDATE ON "User_ServiceUsing"
FOR EACH ROW
EXECUTE FUNCTION update_updateAt_column();

-- Order
CREATE TRIGGER Order_updateAt
BEFORE UPDATE ON "Order"
FOR EACH ROW
EXECUTE FUNCTION update_updateAt_column();

ALTER TABLE "User_Social"
ADD FOREIGN KEY("user_id") REFERENCES "User"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Company"
ADD FOREIGN KEY("employer_id") REFERENCES "User"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "CV"
ADD FOREIGN KEY("applicant_id") REFERENCES "User"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "User_Information"
ADD FOREIGN KEY("user_id") REFERENCES "User"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Recruitment"
ADD FOREIGN KEY("company_id") REFERENCES "Company"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "CV_Education"
ADD FOREIGN KEY("cv_id") REFERENCES "CV"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "CV_Experience"
ADD FOREIGN KEY("cv_id") REFERENCES "CV"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "CV_Skills"
ADD FOREIGN KEY("cv_id") REFERENCES "CV"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "User_Contact"
ADD FOREIGN KEY("user_id") REFERENCES "User"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "CV_Reference"
ADD FOREIGN KEY("cv_id") REFERENCES "CV"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Recruitment_Information"
ADD FOREIGN KEY("cv_id") REFERENCES "CV"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Recruitment_Information"
ADD FOREIGN KEY("recr_id") REFERENCES "Recruitment"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "CV_More"
ADD FOREIGN KEY("cv_id") REFERENCES "CV"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Conversation_Messages"
ADD FOREIGN KEY("conversation_id") REFERENCES "Conversation"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Reviews"
ADD FOREIGN KEY("applicant_id") REFERENCES "User"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Reviews"
ADD FOREIGN KEY("company_id") REFERENCES "Company"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Conversation"
ADD FOREIGN KEY("starter_userid") REFERENCES "User"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Conversation"
ADD FOREIGN KEY("partner_userid") REFERENCES "User"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Conversation_Messages"
ADD FOREIGN KEY("sender_id") REFERENCES "User"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "CV_import"
ADD FOREIGN KEY("applicant_id") REFERENCES "User"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Recruitment_Information"
ADD FOREIGN KEY("file_id") REFERENCES "CV_import"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "User_ServiceUsing"
ADD FOREIGN KEY("recr_service_id") REFERENCES "Recruitment_Services"("id")
ON UPDATE NO ACTION ON DELETE CASCADE;
ALTER TABLE "User_ServiceUsing"
ADD FOREIGN KEY("cv_service_id") REFERENCES "CV_Services"("id")
ON UPDATE NO ACTION ON DELETE CASCADE;
ALTER TABLE "User_ServiceUsing"
ADD FOREIGN KEY("user_id") REFERENCES "User"("id")
ON UPDATE NO ACTION ON DELETE CASCADE;
ALTER TABLE "Order"
ADD FOREIGN KEY("user_id") REFERENCES "User"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Order"
ADD FOREIGN KEY("recr_service_id") REFERENCES "Recruitment_Services"("id")
ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Order"
ADD FOREIGN KEY("cv_service_id") REFERENCES "CV_Services"("id")
ON UPDATE CASCADE ON DELETE CASCADE;