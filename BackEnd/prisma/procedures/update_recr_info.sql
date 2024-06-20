CREATE OR REPLACE PROCEDURE update_recruitment_information(
    p_employer_id text,
    p_recr_info_id bigInt,
    p_action recr_info_status_t -- assuming recr_info_status_t is a string type
)
LANGUAGE plpgsql
AS $$
DECLARE
    recr_info_record RECORD;
    employer_record RECORD;
    recr_id text;
    recr_list text[];
	notif text;
	status notif_status_t;
	applicant text;
BEGIN
    -- Query recruitment information record
    SELECT ri.*, u_cv.id AS user_cv, u_cvi.id AS user_cvi
	INTO recr_info_record
	FROM "Recruitment_Information" ri
	LEFT JOIN "CV" cv ON ri.cv_id = cv.id
	LEFT JOIN "User" u_cv ON cv.applicant_id = u_cv.id
	LEFT JOIN "CV_import" cvi ON ri.file_id = cvi.id
	LEFT JOIN "User" u_cvi ON cvi.applicant_id = u_cvi.id
	WHERE ri.id = p_recr_info_id;

    -- Throw error if recruitment information record not found
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Recr info not found';
    END IF;

    -- Query employer record
    SELECT * , c.name AS company INTO employer_record FROM "User" u
    JOIN "Company" c ON u.id = c.employer_id
    JOIN "Recruitment" r ON c.id = r.company_id
    WHERE u.id = p_employer_id AND u.user_role = 'Employer';

    -- Throw error if employer not found
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Employer not found';
    END IF;

    -- Extract recr_id from recr_info_record
    recr_id := recr_info_record.recr_id;

    -- Extract recr_list from employer_record
    SELECT ARRAY(SELECT id FROM "Recruitment" WHERE company_id = employer_record.company_id) INTO recr_list;

    -- Check permission
    IF NOT recr_id = ANY(recr_list) THEN
        RAISE EXCEPTION 'You don''t have permission to another company''s recruitment';
    END IF;

    -- Update recruitment information status
    UPDATE "Recruitment_Information"
    SET recr_info_status = p_action
    WHERE id = p_recr_info_id;

	-- Define Notification message
	notif := CONCAT(employer_record.company, ' company has',
			CASE
				WHEN p_action = 'approve'  THEN ' approved your Cv'
				WHEN p_action = 'reject'  THEN ' rejected your Cv'
				ELSE ' changed your Cv status to ' || p_action
			END);

	-- Define Notification status
	status := CASE
		            WHEN p_action = 'approve' THEN 'approve'
		            WHEN p_action = 'reject' THEN 'reject'
		            ELSE 'new'
	          END;


	applicant := CASE 
					WHEN recr_info_record.user_cv IS NOT NULL THEN recr_info_record.user_cv
					ELSE recr_info_record.user_cvi
				 END;

	-- Send Notification to applicant
    INSERT INTO public."Notification"(
	user_id, notif_status, content)
	VALUES (applicant, status , notif);   
END;


$$;
